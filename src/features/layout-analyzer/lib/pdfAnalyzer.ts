import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

const OPS = pdfjsLib.OPS;

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

  let pendingPathBBox: [number, number, number, number] | null = null;

  for (let i = 0; i < fnArray.length; i++) {
    const fn = fnArray[i];
    const args = argsArray[i];

    if (fn === OPS.save) {
      ctmStack.push(ctm.slice());
    } else if (fn === OPS.restore) {
      ctm = ctmStack.pop() ?? [1, 0, 0, 1, 0, 0];
    } else if (fn === OPS.transform) {
      ctm = multiplyCTM(ctm, args as number[]);
    } else if (fn === OPS.constructPath) {
      const [subOps, subArgs, minMax] = args as [
        number[],
        number[],
        [number, number, number, number],
      ];
      pendingPathBBox = minMax;

      let idx = 0;
      let lastX = 0;
      let lastY = 0;
      let startX = 0;
      let startY = 0;

      for (const sub of subOps) {
        if (sub === OPS.moveTo) {
          lastX = subArgs[idx++];
          lastY = subArgs[idx++];
          startX = lastX;
          startY = lastY;
        } else if (sub === OPS.lineTo) {
          const x = subArgs[idx++];
          const y = subArgs[idx++];
          vectorLength += Math.hypot(x - lastX, y - lastY);
          lineCount++;
          lastX = x;
          lastY = y;
        } else if (sub === OPS.curveTo) {
          const c1x = subArgs[idx++];
          const c1y = subArgs[idx++];
          const c2x = subArgs[idx++];
          const c2y = subArgs[idx++];
          const x = subArgs[idx++];
          const y = subArgs[idx++];
          vectorLength +=
            Math.hypot(c1x - lastX, c1y - lastY) +
            Math.hypot(c2x - c1x, c2y - c1y) +
            Math.hypot(x - c2x, y - c2y);
          curveCount++;
          lastX = x;
          lastY = y;
        } else if (sub === OPS.curveTo2) {
          const c2x = subArgs[idx++];
          const c2y = subArgs[idx++];
          const x = subArgs[idx++];
          const y = subArgs[idx++];
          vectorLength +=
            Math.hypot(c2x - lastX, c2y - lastY) +
            Math.hypot(x - c2x, y - c2y);
          curveCount++;
          lastX = x;
          lastY = y;
        } else if (sub === OPS.curveTo3) {
          const c1x = subArgs[idx++];
          const c1y = subArgs[idx++];
          const x = subArgs[idx++];
          const y = subArgs[idx++];
          vectorLength +=
            Math.hypot(c1x - lastX, c1y - lastY) +
            Math.hypot(x - c1x, y - c1y);
          curveCount++;
          lastX = x;
          lastY = y;
        } else if (sub === OPS.closePath) {
          vectorLength += Math.hypot(startX - lastX, startY - lastY);
          lastX = startX;
          lastY = startY;
        } else if (sub === OPS.rectangle) {
          const x = subArgs[idx++];
          const y = subArgs[idx++];
          const w = subArgs[idx++];
          const h = subArgs[idx++];
          vectorLength += 2 * (Math.abs(w) + Math.abs(h));
          quadCount++;
          lastX = x;
          lastY = y;
        }
      }
    } else if (
      fn === OPS.fill ||
      fn === OPS.eoFill ||
      fn === OPS.fillStroke ||
      fn === OPS.eoFillStroke ||
      fn === OPS.closeFillStroke ||
      fn === OPS.closeEOFillStroke
    ) {
      if (pendingPathBBox) {
        const [x0, y0, x1, y1] = pendingPathBBox;
        const w = x1 - x0;
        const h = y1 - y0;
        if (Number.isFinite(w) && Number.isFinite(h)) {
          shadeFillArea += Math.abs(w * h);
        }
        shadeFillCount++;
      }
      pendingPathBBox = null;
    } else if (
      fn === OPS.stroke ||
      fn === OPS.closeStroke ||
      fn === OPS.endPath
    ) {
      pendingPathBBox = null;
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
  const doc = await pdfjsLib.getDocument({ data: buf }).promise;
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

    const page = await doc.getPage(p);
    const viewport = page.getViewport({ scale: 1 });
    const pageArea = viewport.width * viewport.height;
    const pageDiag = Math.hypot(viewport.width, viewport.height);

    const textContent = await page.getTextContent();
    let charCount = 0;
    for (const item of textContent.items as any[]) {
      if (typeof item.str === "string") charCount += item.str.length;
    }

    const opList = await page.getOperatorList();
    const counts = walkOperatorList(
      opList.fnArray as unknown as number[],
      opList.argsArray as unknown as any[],
    );

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
