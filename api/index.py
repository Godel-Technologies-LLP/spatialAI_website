import math
import os
import uuid
from urllib.parse import quote

import fitz  # PyMuPDF
import requests
from fastapi import FastAPI, File, HTTPException, Query, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

BLOB_TOKEN = os.environ.get("BLOB_READ_WRITE_TOKEN")
BLOB_API = "https://blob.vercel-storage.com"


def _blob_put(pathname: str, data: bytes, content_type: str) -> str:
    if not BLOB_TOKEN:
        raise HTTPException(
            status_code=500,
            detail="BLOB_READ_WRITE_TOKEN is not configured. Create a Vercel Blob store under Project → Storage → Create.",
        )
    r = requests.put(
        f"{BLOB_API}/{quote(pathname)}",
        headers={
            "authorization": f"Bearer {BLOB_TOKEN}",
            "x-api-version": "7",
            "x-content-type": content_type,
        },
        data=data,
        timeout=60,
    )
    if not r.ok:
        raise HTTPException(
            status_code=502,
            detail=f"Blob upload failed ({r.status_code}): {r.text[:200]}",
        )
    return r.json()["url"]


def _blob_get(url: str) -> bytes:
    r = requests.get(url, timeout=60)
    r.raise_for_status()
    return r.content


def analyze_pdf_content(pdf_bytes: bytes, original_name: str, blob_url: str):
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    page_count = len(doc)

    total_line_count = 0
    total_curve_count = 0
    total_quad_count = 0
    total_shade_fill_count = 0
    total_char_count = 0
    total_vector_length = 0.0

    all_pages_data = []

    for page_index in range(page_count):
        page = doc[page_index]
        page_area = page.rect.width * page.rect.height

        text = page.get_text("text")
        char_count = len(text.strip())

        image_area = 0.0
        for img in page.get_images(full=True):
            xref = img[0]
            rects = page.get_image_rects(xref)
            for r in rects:
                image_area += r.width * r.height

        vector_length = 0.0
        line_count = 0
        curve_count = 0
        quad_count = 0

        shade_fill_area = 0.0
        shade_fill_count = 0

        drawings = page.get_drawings()

        for d in drawings:
            fill = d.get("fill")
            draw_type = d.get("type", "")

            if fill is not None and "f" in draw_type:
                rect = d.get("rect")
                if rect:
                    shade_fill_area += rect.width * rect.height
                shade_fill_count += 1

            items = d.get("items", [])

            for item in items:
                op = item[0]

                if op == "l":
                    p1, p2 = item[1], item[2]
                    length = math.hypot(p2.x - p1.x, p2.y - p1.y)
                    vector_length += length
                    line_count += 1

                elif op == "c":
                    p1, p2, p3 = item[1], item[2], item[3]
                    length = (
                        math.hypot(p2.x - p1.x, p2.y - p1.y)
                        + math.hypot(p3.x - p2.x, p3.y - p2.y)
                    )
                    vector_length += length
                    curve_count += 1

                elif op == "qu":
                    quad_count += 1
                    quad = item[1]
                    pts = [quad.ul, quad.ur, quad.lr, quad.ll]
                    length = 0.0
                    for i in range(len(pts)):
                        p1 = pts[i]
                        p2 = pts[(i + 1) % len(pts)]
                        length += math.hypot(p2.x - p1.x, p2.y - p1.y)
                    vector_length += length
                    curve_count += 1

        page_diag = math.hypot(page.rect.width, page.rect.height)
        vector_area = vector_length * page_diag * 0.001
        text_area = char_count * page_diag * 0.001

        def pct(x):
            return (x / page_area) * 100 if page_area else 0

        v_pct = pct(vector_area)
        h_pct = pct(shade_fill_area)
        i_pct = pct(image_area)
        t_pct = pct(text_area)

        v_total = v_pct + h_pct

        scores = {"VECTOR": v_total, "IMAGE": i_pct, "TEXT": t_pct}
        dominant_type_page = max(scores, key=scores.get)
        dominant = (
            "v"
            if dominant_type_page == "VECTOR"
            else ("t" if dominant_type_page == "TEXT" else "i")
        )

        page_metrics = [
            ["Lines", str(line_count), "line_count"],
            ["Curves", str(curve_count), "curve_count"],
            ["Quads", str(quad_count), "quad_count"],
            ["Hatch", str(shade_fill_count), "shade_fill_count"],
            ["Vector %", f"{v_pct:.2f}", "v_pct"],
            ["Hatch %", f"{h_pct:.2f}", "h_pct"],
            ["Image %", f"{i_pct:.2f}", "i_pct"],
            ["Text %", f"{t_pct:.2f}", "t_pct"],
        ]

        all_pages_data.append([v_pct, h_pct, i_pct, t_pct, dominant, page_metrics])

        total_line_count += line_count
        total_curve_count += curve_count
        total_quad_count += quad_count
        total_shade_fill_count += shade_fill_count
        total_char_count += char_count
        total_vector_length += vector_length

    avg_vp = sum(p[0] for p in all_pages_data) / page_count
    avg_hp = sum(p[1] for p in all_pages_data) / page_count
    avg_ip = sum(p[2] for p in all_pages_data) / page_count
    avg_tp = sum(p[3] for p in all_pages_data) / page_count
    v_total = avg_vp + avg_hp

    scores = {"VECTOR": v_total, "IMAGE": avg_ip, "TEXT": avg_tp}
    dominant_type = max(scores, key=scores.get)

    size_mb = len(pdf_bytes) / (1024 * 1024)

    if dominant_type == "VECTOR":
        label = "Structured Geometry Detected"
        sub = (
            f"Found {total_line_count:,} lines and {total_curve_count:,} curves across {page_count} pages. "
            f"With a {v_total:.1f}% vector+hatch density and {total_shade_fill_count} hatch patterns, "
            f"this file is fully suitable for parametric extraction."
        )
        verdict = "good"
        size_tag = "VECTOR"
        result_text = "VECTOR RICH PDF → SUITABLE"
    elif dominant_type == "IMAGE":
        label = "Image-Heavy Layout"
        sub = (
            f"Dominant signal is IMAGE ({avg_ip:.1f}%). "
            f"This document contains scanned or rasterized content. Not recommended for direct vectorization."
        )
        verdict = "bad"
        size_tag = "SCAN"
        result_text = "IMAGE RICH PDF → NOT SUITABLE"
    else:
        label = "Text-Rich Document"
        sub = (
            f"Dominant signal is TEXT ({avg_tp:.1f}%). "
            f"This is primarily a text document with {total_char_count:,} characters. "
            f"Not recommended for direct vectorization."
        )
        verdict = "bad"
        size_tag = "TEXT"
        result_text = "TEXT RICH PDF → NOT SUITABLE"

    def norm_bar(vals):
        total = sum(vals)
        if total == 0:
            return [25, 25, 25, 25]
        return [round((v / total) * 100, 2) for v in vals]

    per_page_display = []
    for p in all_pages_data:
        raw = [p[0], p[1], p[2], p[3]]
        normed = norm_bar(raw)
        per_page_display.append(
            {
                "composition": [normed[0], normed[1], normed[2], normed[3], p[4]],
                "metrics": p[5],
                "raw": {
                    "vector": round(p[0], 2),
                    "hatch": round(p[1], 2),
                    "image": round(p[2], 2),
                    "text": round(p[3], 2),
                },
            }
        )

    raw_total = avg_vp + avg_hp + avg_ip + avg_tp
    if raw_total > 0:
        comp_vector = round((avg_vp / raw_total) * 100, 2)
        comp_hatch = round((avg_hp / raw_total) * 100, 2)
        comp_image = round((avg_ip / raw_total) * 100, 2)
        comp_text = round((avg_tp / raw_total) * 100, 2)
    else:
        comp_vector = comp_hatch = comp_image = comp_text = 25.0

    confidence = min(
        99,
        int((max(v_total, avg_ip, avg_tp) / (v_total + avg_ip + avg_tp + 0.01)) * 100),
    )

    return {
        "name": original_name,
        "blobUrl": blob_url,
        "thumbnail": f"/api/thumbnail?key={quote(blob_url, safe='')}&page=1",
        "meta": f"{page_count} PAGES · {size_mb:.1f} MB · {size_tag}",
        "pages": page_count,
        "verdict": verdict,
        "label": label,
        "title": f"{original_name} — {label}",
        "headline": label,
        "accent": "→ SUITABLE" if verdict == "good" else "→ NOT SUITABLE",
        "sub": sub,
        "confidence": confidence,
        "composition": {
            "vector": comp_vector,
            "hatch": comp_hatch,
            "image": comp_image,
            "text": comp_text,
        },
        "routing": "Suitable" if verdict == "good" else "Not suitable",
        "nextStep": f"Classification: {result_text}",
        "metrics": [
            ["Lines", f"{total_line_count:,}", "line_count"],
            ["Curves", f"{total_curve_count:,}", "curve_count"],
            ["Quads", str(total_quad_count), "quad_count"],
            ["Hatch count", str(total_shade_fill_count), "shade_fill_count"],
            ["Char count", f"{total_char_count:,}", "char_count"],
            ["Vector %", f"{avg_vp:.2f}", "avg v_pct"],
            ["Hatch %", f"{avg_hp:.2f}", "avg h_pct"],
            ["Image %", f"{avg_ip:.2f}", "avg i_pct"],
            ["Text %", f"{avg_tp:.2f}", "avg t_pct"],
            ["v_total", f"{v_total:.2f}", "v_pct + h_pct"],
            ["Pages", str(page_count), "doc.page_count"],
            ["Vector len", f"{total_vector_length:.1f}", "vector_length (pt)"],
        ],
        "perPage": per_page_display,
    }


@app.post("/api/analyze")
async def analyze(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    pdf_bytes = await file.read()

    pathname = f"uploads/{uuid.uuid4().hex[:8]}-{file.filename}"
    blob_url = _blob_put(pathname, pdf_bytes, "application/pdf")

    try:
        return analyze_pdf_content(pdf_bytes, file.filename, blob_url)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/thumbnail")
async def thumbnail(key: str = Query(...), page: int = Query(1)):
    if not key.startswith("https://") or "vercel-storage.com" not in key:
        raise HTTPException(status_code=400, detail="Invalid key")

    try:
        pdf_bytes = _blob_get(key)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Could not fetch blob: {e}")

    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    if page < 1 or page > len(doc):
        raise HTTPException(status_code=400, detail="Invalid page")

    pix = doc[page - 1].get_pixmap(matrix=fitz.Matrix(1.5, 1.5))
    return Response(content=pix.tobytes("png"), media_type="image/png")


@app.get("/api/health")
async def health():
    return {"ok": True, "blob_configured": bool(BLOB_TOKEN)}
