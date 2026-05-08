from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response, HTMLResponse
from fastapi.staticfiles import StaticFiles
import fitz  # PyMuPDF
import math
import os
import shutil
from typing import List, Dict, Any

app = FastAPI()

# Define directories
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(os.path.dirname(BASE_DIR), "frontend")
UPLOAD_DIR = os.path.join(os.path.dirname(BASE_DIR), "uploads")

os.makedirs(UPLOAD_DIR, exist_ok=True)

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploads and static assets
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
if os.path.exists(os.path.join(FRONTEND_DIR, "css")):
    app.mount("/css", StaticFiles(directory=os.path.join(FRONTEND_DIR, "css")), name="css")
if os.path.exists(os.path.join(FRONTEND_DIR, "js")):
    app.mount("/js", StaticFiles(directory=os.path.join(FRONTEND_DIR, "js")), name="js")

@app.get("/", response_class=HTMLResponse)
async def read_index():
    index_path = os.path.join(FRONTEND_DIR, "index.html")
    if os.path.exists(index_path):
        with open(index_path, "r") as f:
            return f.read()
    return "Frontend not found. Please ensure the 'frontend' directory exists."


def analyze_pdf_content(file_path: str):
    """
    Analyze a PDF using the exact same algorithm as the user's standalone script.
    Measures vector geometry, hatch fills, embedded images, and selectable text
    to classify the document as VECTOR, IMAGE, or TEXT dominant.
    """
    doc = fitz.open(file_path)
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

        # -------------------------
        # TEXT (selectable only)
        # -------------------------
        text       = page.get_text("text")
        char_count = len(text.strip())

        # -------------------------
        # IMAGE
        # -------------------------
        image_area = 0.0
        for img in page.get_images(full=True):
            xref = img[0]
            rects = page.get_image_rects(xref)
            for r in rects:
                image_area += r.width * r.height

        # -------------------------
        # VECTOR (geometry-based)
        # -------------------------
        vector_length = 0.0
        line_count    = 0
        curve_count   = 0
        quad_count    = 0

        # -------------------------
        # HATCH (fill-based)
        # -------------------------
        shade_fill_area  = 0.0
        shade_fill_count = 0

        drawings = page.get_drawings()

        for d in drawings:
            fill      = d.get("fill")
            draw_type = d.get("type", "")

            # -------------------------
            # HATCH DETECTION
            # filled closed shapes like
            # hatched electrical symbols
            # -------------------------
            if fill is not None and "f" in draw_type:
                rect = d.get("rect")
                if rect:
                    shade_fill_area += rect.width * rect.height
                shade_fill_count += 1

            items = d.get("items", [])

            for item in items:
                op = item[0]

                # LINE
                if op == "l":
                    p1, p2 = item[1], item[2]
                    length = math.hypot(p2.x - p1.x, p2.y - p1.y)
                    vector_length += length
                    line_count    += 1

                # CURVE (Bezier cubic)
                elif op == "c":
                    p1, p2, p3 = item[1], item[2], item[3]
                    length = (
                        math.hypot(p2.x - p1.x, p2.y - p1.y) +
                        math.hypot(p3.x - p2.x, p3.y - p2.y)
                    )
                    vector_length += length
                    curve_count   += 1

                # QUAD CURVE
                elif op == "qu":
                    quad_count += 1
                    quad = item[1]
                    pts  = [quad.ul, quad.ur, quad.lr, quad.ll]
                    length = 0.0
                    for i in range(len(pts)):
                        p1 = pts[i]
                        p2 = pts[(i + 1) % len(pts)]
                        length += math.hypot(p2.x - p1.x, p2.y - p1.y)
                    vector_length += length
                    curve_count   += 1

        # -------------------------
        # NORMALIZATION
        # -------------------------
        page_diag   = math.hypot(page.rect.width, page.rect.height)
        vector_area = vector_length * page_diag * 0.001
        text_area   = char_count   * page_diag * 0.001

        # -------------------------
        # PERCENTAGE FUNCTION
        # -------------------------
        def pct(x):
            return (x / page_area) * 100 if page_area else 0

        v_pct = pct(vector_area)
        h_pct = pct(shade_fill_area)
        i_pct = pct(image_area)
        t_pct = pct(text_area)

        # -------------------------
        # HATCH FOLDS INTO VECTOR
        # hatch always lives inside
        # a vector shape, so it
        # contributes to vector score
        # -------------------------
        v_total = v_pct + h_pct

        # -------------------------
        # CLASSIFICATION (per page)
        # -------------------------
        scores = {
            "VECTOR": v_total,
            "IMAGE":  i_pct,
            "TEXT":   t_pct
        }
        dominant_type_page = max(scores, key=scores.get)
        dominant = 'v' if dominant_type_page == "VECTOR" else ('t' if dominant_type_page == "TEXT" else 'i')

        page_metrics = [
            ["Lines",    str(line_count),          "line_count"],
            ["Curves",   str(curve_count),         "curve_count"],
            ["Quads",    str(quad_count),           "quad_count"],
            ["Hatch",    str(shade_fill_count),     "shade_fill_count"],
            ["Vector %", f"{v_pct:.2f}",           "v_pct"],
            ["Hatch %",  f"{h_pct:.2f}",           "h_pct"],
            ["Image %",  f"{i_pct:.2f}",           "i_pct"],
            ["Text %",   f"{t_pct:.2f}",           "t_pct"],
        ]

        all_pages_data.append([v_pct, h_pct, i_pct, t_pct, dominant, page_metrics])

        total_line_count       += line_count
        total_curve_count      += curve_count
        total_quad_count       += quad_count
        total_shade_fill_count += shade_fill_count
        total_char_count       += char_count
        total_vector_length    += vector_length

    # -------------------------
    # AGGREGATE ACROSS PAGES
    # -------------------------
    avg_vp = sum(p[0] for p in all_pages_data) / page_count
    avg_hp = sum(p[1] for p in all_pages_data) / page_count
    avg_ip = sum(p[2] for p in all_pages_data) / page_count
    avg_tp = sum(p[3] for p in all_pages_data) / page_count
    v_total = avg_vp + avg_hp

    # -------------------------
    # OVERALL CLASSIFICATION
    # Uses same logic as user script
    # -------------------------
    scores = {
        "VECTOR": v_total,
        "IMAGE":  avg_ip,
        "TEXT":   avg_tp
    }
    dominant_type = max(scores, key=scores.get)

    size_mb = os.path.getsize(file_path) / (1024 * 1024)

    if dominant_type == "VECTOR":
        label    = "Structured Geometry Detected"
        sub      = f"Found {total_line_count:,} lines and {total_curve_count:,} curves across {page_count} pages. With a {v_total:.1f}% vector+hatch density and {total_shade_fill_count} hatch patterns, this file is fully suitable for parametric extraction."
        verdict  = "good"
        size_tag = "VECTOR"
        result_text = "VECTOR RICH PDF → SUITABLE"
    elif dominant_type == "IMAGE":
        label    = "Image-Heavy Layout"
        sub      = f"Dominant signal is IMAGE ({avg_ip:.1f}%). This document contains scanned or rasterized content. Not recommended for direct vectorization."
        verdict  = "bad"
        size_tag = "SCAN"
        result_text = "IMAGE RICH PDF → NOT SUITABLE"
    else:
        label    = "Text-Rich Document"
        sub      = f"Dominant signal is TEXT ({avg_tp:.1f}%). This is primarily a text document with {total_char_count:,} characters. Not recommended for direct vectorization."
        verdict  = "bad"
        size_tag = "TEXT"
        result_text = "TEXT RICH PDF → NOT SUITABLE"

    # Normalize per-page composition for frontend display (cap at 100 for bar rendering)
    def norm_bar(vals):
        """Normalize 4 values so they sum to 100 for display bars"""
        total = sum(vals)
        if total == 0:
            return [25, 25, 25, 25]
        return [round((v / total) * 100, 2) for v in vals]

    per_page_display = []
    for p in all_pages_data:
        raw = [p[0], p[1], p[2], p[3]]
        normed = norm_bar(raw)
        per_page_display.append({
            "composition": [normed[0], normed[1], normed[2], normed[3], p[4]],
            "metrics": p[5],
            "raw": {"vector": round(p[0], 2), "hatch": round(p[1], 2), "image": round(p[2], 2), "text": round(p[3], 2)}
        })

    # Normalize overall composition for donut chart
    raw_total = avg_vp + avg_hp + avg_ip + avg_tp
    if raw_total > 0:
        comp_vector = round((avg_vp / raw_total) * 100, 2)
        comp_hatch  = round((avg_hp / raw_total) * 100, 2)
        comp_image  = round((avg_ip / raw_total) * 100, 2)
        comp_text   = round((avg_tp / raw_total) * 100, 2)
    else:
        comp_vector = comp_hatch = comp_image = comp_text = 25.0

    confidence = min(99, int((max(v_total, avg_ip, avg_tp) / (v_total + avg_ip + avg_tp + 0.01)) * 100))

    result = {
        "name": os.path.basename(file_path),
        "thumbnail": f"/thumbnail/{os.path.basename(file_path)}/1",
        "meta": f"{page_count} PAGES · {size_mb:.1f} MB · {size_tag}",
        "pages": page_count,
        "verdict": verdict,
        "label": label,
        "title": f"{os.path.basename(file_path)} — {label}",
        "headline": label,
        "accent": "→ SUITABLE" if verdict == "good" else "→ NOT SUITABLE",
        "sub": sub,
        "confidence": confidence,
        "composition": {
            "vector": comp_vector,
            "hatch": comp_hatch,
            "image": comp_image,
            "text": comp_text
        },
        "routing": "Suitable" if verdict == "good" else "Not suitable",
        "nextStep": f"Classification: {result_text}",
        "metrics": [
            ["Lines",      f"{total_line_count:,}",       "line_count"],
            ["Curves",     f"{total_curve_count:,}",      "curve_count"],
            ["Quads",      str(total_quad_count),         "quad_count"],
            ["Hatch count", str(total_shade_fill_count),  "shade_fill_count"],
            ["Char count", f"{total_char_count:,}",       "char_count"],
            ["Vector %",   f"{avg_vp:.2f}",               "avg v_pct"],
            ["Hatch %",    f"{avg_hp:.2f}",               "avg h_pct"],
            ["Image %",    f"{avg_ip:.2f}",               "avg i_pct"],
            ["Text %",     f"{avg_tp:.2f}",               "avg t_pct"],
            ["v_total",    f"{v_total:.2f}",              "v_pct + h_pct"],
            ["Pages",      str(page_count),               "doc.page_count"],
            ["Vector len", f"{total_vector_length:.1f}",  "vector_length (pt)"],
        ],
        "perPage": per_page_display
    }
    return result


@app.get("/thumbnail/{filename}/{page}")
async def get_thumbnail(filename: str, page: int):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        return {"error": f"File not found"}
    
    try:
        doc = fitz.open(file_path)
        if page < 1 or page > len(doc):
            return {"error": "Invalid page"}
        
        pix = doc[page-1].get_pixmap(matrix=fitz.Matrix(1.5, 1.5))
        img_data = pix.tobytes("png")
        return Response(content=img_data, media_type="image/png")
    except Exception as e:
        return {"error": str(e)}

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    temp_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        result = analyze_pdf_content(temp_path)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
