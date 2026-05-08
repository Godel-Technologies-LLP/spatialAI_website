import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import PdfWorker from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?worker";

pdfjsLib.GlobalWorkerOptions.workerPort = new PdfWorker();

const OPS = pdfjsLib.OPS;

// PDF.js v5 introduced a separate enum for path-construction sub-ops,
// stored as a flat array inside constructPath's args.
const DRAW_OPS = {
  moveTo: 0,
  lineTo: 1,
  curveTo: 2,
  quadraticCurveTo: 3,
  closePath: 4,
} as const;

export type ProgressFn = (pct: number, status: string) => void;

export interface PageMetric {
  composition: [number, number, number, number, "v" | "i" | "t"];
  metrics: [string, string, string][];
  raw: { vector: number; hatch: number; image: number; text: number };
}

export interface AnalysisResult {
  name: string;
  thumbnail: string;
  thumbnails: string[];
  meta: string;
  pages: number;
  verdict: "good" | "bad";
  label: string;
  title: string;
  headline: string;
  accent: string;
  sub: string;
  confidence: number;
  composition: { vector: number; hatch: number; image: number; text: number };
  routing: string;
  nextStep: string;
  metrics: [string, string, string][];
  perPage: PageMetric[];
}

interface PageCounts {
  lineCount: number;
  curveCount: number;
  quadCount: number;
  vectorLength: number;
  shadeFillCount: number;
  shadeFillArea: number;
  imageArea: number;
  charCount: number;
}

function multiplyCTM(m: number[], t: number[]): number[] {
  const [a1, b1, c1, d1, e1, f1] = m;
  const [a2, b2, c2, d2, e2, f2] = t;
  return [
    a1 * a2 + c1 * b2,
    b1 * a2 + d1 * b2,
    a1 * c2 + c1 * d2,
    b1 * c2 + d1 * d2,
    a1 * e2 + c1 * f2 + e1,
    b1 * e2 + d1 * f2 + f1,
  ];
}

function walkOperatorList(
  fnArray: number[],
  argsArray: any[],
): Omit<PageCounts, "charCount"> {
  let lineCount = 0;
  let curveCount = 0;
  let quadCount = 0;
  let vectorLength = 0;
  let shadeFillCount = 0;
  let shadeFillArea = 0;
  let imageArea = 0;

  let ctm = [1, 0, 0, 1, 0, 0];
  const ctmStack: number[][] = [];

  for (let i = 0; i < fnArray.length; i++) {
    const fn = fnArray[i];
    const args = argsArray[i];

    if (fn === OPS.save) {
      ctmStack.push(ctm.slice());
    } else if (fn === OPS.restore) {
      ctm = ctmStack.pop() ?? [1, 0, 0, 1, 0, 0];
    } else if (fn === OPS.transform) {
      if (Array.isArray(args)) ctm = multiplyCTM(ctm, args as number[]);
    } else if (fn === OPS.constructPath) {
      // PDF.js v5: argsArray[i] = [paintOp, [pathData], minMax]
      // pathData is a flat array using DRAW_OPS values interleaved with coords.
      const paintOp = args?.[0] as number | undefined;
      const dataWrap = args?.[1];
      const minMax = args?.[2] as
        | [number, number, number, number]
        | undefined;
      const pathData = Array.isArray(dataWrap) ? dataWrap[0] : dataWrap;

      if (Array.isArray(pathData)) {
        let idx = 0;
        let lastX = 0;
        let lastY = 0;
        let startX = 0;
        let startY = 0;

        while (idx < pathData.length) {
          const op = pathData[idx++];
          if (op === DRAW_OPS.moveTo) {
            lastX = pathData[idx++];
            lastY = pathData[idx++];
            startX = lastX;
            startY = lastY;
          } else if (op === DRAW_OPS.lineTo) {
            const x = pathData[idx++];
            const y = pathData[idx++];
            vectorLength += Math.hypot(x - lastX, y - lastY);
            lineCount++;
            lastX = x;
            lastY = y;
          } else if (op === DRAW_OPS.curveTo) {
            const c1x = pathData[idx++];
            const c1y = pathData[idx++];
            const c2x = pathData[idx++];
            const c2y = pathData[idx++];
            const x = pathData[idx++];
            const y = pathData[idx++];
            vectorLength +=
              Math.hypot(c1x - lastX, c1y - lastY) +
              Math.hypot(c2x - c1x, c2y - c1y) +
              Math.hypot(x - c2x, y - c2y);
            curveCount++;
            lastX = x;
            lastY = y;
          } else if (op === DRAW_OPS.quadraticCurveTo) {
            const c1x = pathData[idx++];
            const c1y = pathData[idx++];
            const x = pathData[idx++];
            const y = pathData[idx++];
            vectorLength +=
              Math.hypot(c1x - lastX, c1y - lastY) +
              Math.hypot(x - c1x, y - c1y);
            quadCount++;
            lastX = x;
            lastY = y;
          } else if (op === DRAW_OPS.closePath) {
            vectorLength += Math.hypot(startX - lastX, startY - lastY);
            lastX = startX;
            lastY = startY;
          } else {
            // Unknown sub-op — bail to avoid an infinite loop on malformed data.
            break;
          }
        }
      }

      const isFill =
        paintOp === OPS.fill ||
        paintOp === OPS.eoFill ||
        paintOp === OPS.fillStroke ||
        paintOp === OPS.eoFillStroke ||
        paintOp === OPS.closeFillStroke ||
        paintOp === OPS.closeEOFillStroke;

      if (isFill && minMax && minMax.length >= 4) {
        const w = minMax[2] - minMax[0];
        const h = minMax[3] - minMax[1];
        if (Number.isFinite(w) && Number.isFinite(h)) {
          shadeFillArea += Math.abs(w * h);
        }
        shadeFillCount++;
      }
    } else if (
      fn === OPS.paintImageXObject ||
      fn === OPS.paintInlineImageXObject ||
      fn === OPS.paintImageMaskXObject
    ) {
      const [a, b, c, d] = ctm;
      imageArea += Math.abs(a * d - b * c);
    }
  }

  return {
    lineCount,
    curveCount,
    quadCount,
    vectorLength,
    shadeFillCount,
    shadeFillArea,
    imageArea,
  };
}

async function renderPageThumbnail(
  page: pdfjsLib.PDFPageProxy,
  scale = 1.5,
): Promise<string> {
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas context");

  await page.render({
    canvasContext: ctx,
    viewport,
    canvas,
  } as any).promise;

  return canvas.toDataURL("image/png");
}

export async function analyzePdf(
  file: File,
  onProgress?: ProgressFn,
): Promise<AnalysisResult> {
  if (!file.name.toLowerCase().endsWith(".pdf")) {
    throw new Error("Only PDF files are allowed");
  }

  const buf = await file.arrayBuffer();

  onProgress?.(8, "Loading document…");
  const doc = await pdfjsLib
    .getDocument({ data: new Uint8Array(buf) })
    .promise.catch((err) => {
      console.error("[pdfAnalyzer] getDocument failed:", err);
      throw err;
    });
  const pageCount = doc.numPages;

  let totalLine = 0;
  let totalCurve = 0;
  let totalQuad = 0;
  let totalShadeFill = 0;
  let totalChar = 0;
  let totalVectorLen = 0;

  const pageRaws: { vp: number; hp: number; ip: number; tp: number }[] = [];
  const perPage: PageMetric[] = [];
  const thumbnails: string[] = [];

  for (let p = 1; p <= pageCount; p++) {
    const stagePct = 10 + Math.floor(((p - 1) / pageCount) * 80);
    onProgress?.(stagePct, `Analyzing page ${p} of ${pageCount}…`);

    let page: pdfjsLib.PDFPageProxy;
    try {
      page = await doc.getPage(p);
    } catch (e) {
      console.error(`[pdfAnalyzer] getPage(${p}) failed:`, e);
      throw e;
    }
    const viewport = page.getViewport({ scale: 1 });
    const pageArea = viewport.width * viewport.height;
    const pageDiag = Math.hypot(viewport.width, viewport.height);

    let charCount = 0;
    try {
      const textContent = await page.getTextContent();
      for (const item of textContent.items as any[]) {
        if (typeof item.str === "string") charCount += item.str.length;
      }
    } catch (e) {
      console.warn(`[pdfAnalyzer] getTextContent(p=${p}) failed, continuing without text count:`, e);
    }

    let counts: Omit<PageCounts, "charCount">;
    try {
      const opList = await page.getOperatorList();
      counts = walkOperatorList(
        opList.fnArray as unknown as number[],
        opList.argsArray as unknown as any[],
      );
    } catch (e) {
      console.error(`[pdfAnalyzer] getOperatorList/walk(p=${p}) failed:`, e);
      throw e;
    }

    const vectorAreaProxy = counts.vectorLength * pageDiag * 0.001;
    const textAreaProxy = charCount * pageDiag * 0.001;

    const pct = (x: number) => (pageArea ? (x / pageArea) * 100 : 0);
    const vPct = pct(vectorAreaProxy);
    const hPct = pct(counts.shadeFillArea);
    const iPct = pct(counts.imageArea);
    const tPct = pct(textAreaProxy);

    const vTotal = vPct + hPct;

    let dominantPage: "v" | "i" | "t" = "v";
    if (iPct > vTotal && iPct >= tPct) dominantPage = "i";
    else if (tPct > vTotal && tPct >= iPct) dominantPage = "t";

    const raw: [number, number, number, number] = [vPct, hPct, iPct, tPct];
    const sumRaw = raw[0] + raw[1] + raw[2] + raw[3];
    const norm: [number, number, number, number] =
      sumRaw === 0
        ? [25, 25, 25, 25]
        : [
            +((raw[0] / sumRaw) * 100).toFixed(2),
            +((raw[1] / sumRaw) * 100).toFixed(2),
            +((raw[2] / sumRaw) * 100).toFixed(2),
            +((raw[3] / sumRaw) * 100).toFixed(2),
          ];

    perPage.push({
      composition: [norm[0], norm[1], norm[2], norm[3], dominantPage],
      metrics: [
        ["Lines", String(counts.lineCount), "line_count"],
        ["Curves", String(counts.curveCount), "curve_count"],
        ["Quads", String(counts.quadCount), "quad_count"],
        ["Hatch", String(counts.shadeFillCount), "shade_fill_count"],
        ["Vector %", vPct.toFixed(2), "v_pct"],
        ["Hatch %", hPct.toFixed(2), "h_pct"],
        ["Image %", iPct.toFixed(2), "i_pct"],
        ["Text %", tPct.toFixed(2), "t_pct"],
      ],
      raw: {
        vector: +vPct.toFixed(2),
        hatch: +hPct.toFixed(2),
        image: +iPct.toFixed(2),
        text: +tPct.toFixed(2),
      },
    });

    pageRaws.push({ vp: vPct, hp: hPct, ip: iPct, tp: tPct });

    totalLine += counts.lineCount;
    totalCurve += counts.curveCount;
    totalQuad += counts.quadCount;
    totalShadeFill += counts.shadeFillCount;
    totalChar += charCount;
    totalVectorLen += counts.vectorLength;

    const thumb = await renderPageThumbnail(page);
    thumbnails.push(thumb);

    page.cleanup();
    await new Promise((r) => setTimeout(r, 0));
  }

  onProgress?.(95, "Aggregating…");

  const avgVp = pageRaws.reduce((s, p) => s + p.vp, 0) / pageCount;
  const avgHp = pageRaws.reduce((s, p) => s + p.hp, 0) / pageCount;
  const avgIp = pageRaws.reduce((s, p) => s + p.ip, 0) / pageCount;
  const avgTp = pageRaws.reduce((s, p) => s + p.tp, 0) / pageCount;
  const vTotal = avgVp + avgHp;

  let dominant: "VECTOR" | "IMAGE" | "TEXT" = "VECTOR";
  if (avgIp > vTotal && avgIp >= avgTp) dominant = "IMAGE";
  else if (avgTp > vTotal && avgTp >= avgIp) dominant = "TEXT";

  const sizeMb = file.size / (1024 * 1024);

  let label: string;
  let sub: string;
  let verdict: "good" | "bad";
  let sizeTag: string;
  let resultText: string;

  if (dominant === "VECTOR") {
    label = "Structured Geometry Detected";
    sub = `Found ${totalLine.toLocaleString()} lines and ${totalCurve.toLocaleString()} curves across ${pageCount} pages. With a ${vTotal.toFixed(1)}% vector+hatch density and ${totalShadeFill} hatch patterns, this file is fully suitable for parametric extraction.`;
    verdict = "good";
    sizeTag = "VECTOR";
    resultText = "VECTOR RICH PDF → SUITABLE";
  } else if (dominant === "IMAGE") {
    label = "Image-Heavy Layout";
    sub = `Dominant signal is IMAGE (${avgIp.toFixed(1)}%). This document contains scanned or rasterized content. Not recommended for direct vectorization.`;
    verdict = "bad";
    sizeTag = "SCAN";
    resultText = "IMAGE RICH PDF → NOT SUITABLE";
  } else {
    label = "Text-Rich Document";
    sub = `Dominant signal is TEXT (${avgTp.toFixed(1)}%). This is primarily a text document with ${totalChar.toLocaleString()} characters. Not recommended for direct vectorization.`;
    verdict = "bad";
    sizeTag = "TEXT";
    resultText = "TEXT RICH PDF → NOT SUITABLE";
  }

  const rawTotal = avgVp + avgHp + avgIp + avgTp;
  let compVector = 25;
  let compHatch = 25;
  let compImage = 25;
  let compText = 25;
  if (rawTotal > 0) {
    compVector = +((avgVp / rawTotal) * 100).toFixed(2);
    compHatch = +((avgHp / rawTotal) * 100).toFixed(2);
    compImage = +((avgIp / rawTotal) * 100).toFixed(2);
    compText = +((avgTp / rawTotal) * 100).toFixed(2);
  }

  const confidence = Math.min(
    99,
    Math.floor(
      (Math.max(vTotal, avgIp, avgTp) / (vTotal + avgIp + avgTp + 0.01)) * 100,
    ),
  );

  await doc.cleanup();
  await doc.destroy();

  onProgress?.(100, "Analysis complete");

  return {
    name: file.name,
    thumbnail: thumbnails[0],
    thumbnails,
    meta: `${pageCount} PAGES · ${sizeMb.toFixed(1)} MB · ${sizeTag}`,
    pages: pageCount,
    verdict,
    label,
    title: `${file.name} — ${label}`,
    headline: label,
    accent: verdict === "good" ? "→ SUITABLE" : "→ NOT SUITABLE",
    sub,
    confidence,
    composition: {
      vector: compVector,
      hatch: compHatch,
      image: compImage,
      text: compText,
    },
    routing: verdict === "good" ? "Suitable" : "Not suitable",
    nextStep: `Classification: ${resultText}`,
    metrics: [
      ["Lines", totalLine.toLocaleString(), "line_count"],
      ["Curves", totalCurve.toLocaleString(), "curve_count"],
      ["Quads", String(totalQuad), "quad_count"],
      ["Hatch count", String(totalShadeFill), "shade_fill_count"],
      ["Char count", totalChar.toLocaleString(), "char_count"],
      ["Vector %", avgVp.toFixed(2), "avg v_pct"],
      ["Hatch %", avgHp.toFixed(2), "avg h_pct"],
      ["Image %", avgIp.toFixed(2), "avg i_pct"],
      ["Text %", avgTp.toFixed(2), "avg t_pct"],
      ["v_total", vTotal.toFixed(2), "v_pct + h_pct"],
      ["Pages", String(pageCount), "doc.page_count"],
      ["Vector len", totalVectorLen.toFixed(1), "vector_length (pt)"],
    ],
    perPage,
  };
}
