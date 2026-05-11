// MuPDF.js exposes the same engine as PyMuPDF (compiled to WASM). We process
// each page through a custom Device whose callbacks tally up the same path /
// fill / image primitives that the Python `get_drawings()` walk produces, so
// the classification numbers track the Python implementation closely.
//
// mupdf-wasm is heavy (~3.5 MB compressed) and uses top-level await; loading
// it eagerly blocks the whole module graph (and breaks Vite's dev pre-bundle).
// Use a type-only import for the namespace so type annotations cost nothing
// at runtime, then dynamic-import the module on first analyze.
import type * as mupdf from "mupdf";

type Mupdf = typeof import("mupdf");
let mupdfPromise: Promise<Mupdf> | null = null;
function loadMupdf(): Promise<Mupdf> {
  if (!mupdfPromise) {
    mupdfPromise = import("mupdf");
  }
  return mupdfPromise;
}

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
  shadeFillCount: number;
  shadeFillArea: number;
  imageArea: number;
  vectorLength: number;
}

function makeStatsDevice(
  mupdfLib: Mupdf,
): { stats: PageCounts; device: mupdf.Device } {
  const stats: PageCounts = {
    lineCount: 0,
    curveCount: 0,
    shadeFillCount: 0,
    shadeFillArea: 0,
    imageArea: 0,
    vectorLength: 0,
  };

  function walkPath(
    path: mupdf.Path,
    isFilled: boolean,
  ): void {
    let lastX = 0;
    let lastY = 0;
    let startX = 0;
    let startY = 0;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    const touch = (x: number, y: number) => {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    };

    path.walk({
      moveTo(x, y) {
        lastX = x;
        lastY = y;
        startX = x;
        startY = y;
        touch(x, y);
      },
      lineTo(x, y) {
        stats.lineCount++;
        stats.vectorLength += Math.hypot(x - lastX, y - lastY);
        lastX = x;
        lastY = y;
        touch(x, y);
      },
      curveTo(x1, y1, x2, y2, x3, y3) {
        stats.curveCount++;
        stats.vectorLength +=
          Math.hypot(x1 - lastX, y1 - lastY) +
          Math.hypot(x2 - x1, y2 - y1) +
          Math.hypot(x3 - x2, y3 - y2);
        lastX = x3;
        lastY = y3;
        touch(x3, y3);
      },
      closePath() {
        stats.vectorLength += Math.hypot(startX - lastX, startY - lastY);
        lastX = startX;
        lastY = startY;
      },
    });

    if (isFilled) {
      stats.shadeFillCount++;
      if (Number.isFinite(maxX - minX) && Number.isFinite(maxY - minY)) {
        stats.shadeFillArea += Math.abs((maxX - minX) * (maxY - minY));
      }
    }
  }

  // Count only visible drawings (fill/stroke/image). Clip paths are
  // rendering-pipeline plumbing (page-bounds clips, glyph clips) and
  // should not be counted as line/curve geometry — PyMuPDF's
  // get_drawings() ignores them too.
  const device = new mupdfLib.Device({
    fillPath(path) {
      walkPath(path, true);
    },
    strokePath(path) {
      walkPath(path, false);
    },
    fillImage(_image, ctm) {
      // Image is drawn in the unit square then transformed by ctm.
      // Rendered area = |a·d − b·c|.
      stats.imageArea += Math.abs(ctm[0] * ctm[3] - ctm[1] * ctm[2]);
    },
    fillImageMask(_image, ctm) {
      stats.imageArea += Math.abs(ctm[0] * ctm[3] - ctm[1] * ctm[2]);
    },
  });

  return { stats, device };
}

function pixmapToDataUrl(pixmap: mupdf.Pixmap): string {
  const png = pixmap.asPNG();
  let binary = "";
  for (let i = 0; i < png.length; i++) binary += String.fromCharCode(png[i]);
  return `data:image/png;base64,${btoa(binary)}`;
}

export async function analyzePdf(
  file: File,
  onProgress?: ProgressFn,
): Promise<AnalysisResult> {
  if (!file.name.toLowerCase().endsWith(".pdf")) {
    throw new Error("Only PDF files are allowed");
  }

  const buf = await file.arrayBuffer();

  onProgress?.(4, "Loading PDF engine…");
  const mupdfLib = await loadMupdf();

  onProgress?.(10, "Loading document…");
  const doc = mupdfLib.Document.openDocument(
    new Uint8Array(buf),
    "application/pdf",
  );
  const pageCount = doc.countPages();

  let totalLine = 0;
  let totalCurve = 0;
  let totalShadeFill = 0;
  let totalChar = 0;
  let totalVectorLen = 0;

  const pageRaws: { vp: number; hp: number; ip: number; tp: number }[] = [];
  const perPage: PageMetric[] = [];
  const thumbnails: string[] = [];

  const thumbMatrix = mupdfLib.Matrix.scale(1.5, 1.5);

  for (let p = 0; p < pageCount; p++) {
    const stagePct = 10 + Math.floor((p / pageCount) * 80);
    onProgress?.(stagePct, `Analyzing page ${p + 1} of ${pageCount}…`);

    const page = doc.loadPage(p);
    const bounds = page.getBounds();
    const pageWidth = bounds[2] - bounds[0];
    const pageHeight = bounds[3] - bounds[1];
    const pageArea = pageWidth * pageHeight;
    const pageDiag = Math.hypot(pageWidth, pageHeight);

    let charCount = 0;
    try {
      const stxt = page.toStructuredText();
      charCount = stxt.asText().replace(/\s+/g, "").length;
    } catch (e) {
      console.warn(
        `[pdfAnalyzer] toStructuredText(p=${p + 1}) failed, continuing:`,
        e,
      );
    }

    const { stats, device } = makeStatsDevice(mupdfLib);
    try {
      // runPageContents (not run) restricts to the explicit drawing
      // commands in the PDF content stream — same scope as PyMuPDF's
      // page.get_drawings(). Excludes annotations and widgets.
      page.runPageContents(device, mupdfLib.Matrix.identity);
    } catch (e) {
      console.error(
        `[pdfAnalyzer] runPageContents(p=${p + 1}) failed:`,
        e,
      );
      throw e;
    }

    const vectorAreaProxy = stats.vectorLength * pageDiag * 0.001;
    const textAreaProxy = charCount * pageDiag * 0.001;

    const pct = (x: number) => (pageArea ? (x / pageArea) * 100 : 0);
    const vPct = pct(vectorAreaProxy);
    const hPct = pct(stats.shadeFillArea);
    const iPct = pct(stats.imageArea);
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
        ["Lines", String(stats.lineCount), "line_count"],
        ["Curves", String(stats.curveCount), "curve_count"],
        ["Hatch", String(stats.shadeFillCount), "shade_fill_count"],
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

    totalLine += stats.lineCount;
    totalCurve += stats.curveCount;
    totalShadeFill += stats.shadeFillCount;
    totalChar += charCount;
    totalVectorLen += stats.vectorLength;

    try {
      const pixmap = page.toPixmap(
        thumbMatrix,
        mupdfLib.ColorSpace.DeviceRGB,
        false,
      );
      thumbnails.push(pixmapToDataUrl(pixmap));
    } catch (e) {
      console.warn(`[pdfAnalyzer] toPixmap(p=${p + 1}) failed:`, e);
      thumbnails.push("");
    }

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

  onProgress?.(100, "Analysis complete");

  return {
    name: file.name,
    thumbnail: thumbnails[0] ?? "",
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
