const SITE_CONTENT = {
  "navigation": {
    "logo": {
      "name": "GODEL",
      "sub": "Technologies"
    },
    "links": [
      { "label": "Platform", "target": "product", "active": true },
      { "label": "Analyzer", "target": "upload" },
      { "label": "API", "target": "#" },
      { "label": "Pricing", "target": "#" }
    ],
    "cta": "Launch App"
  },
  "hero": {
    "pill": "Engineering Edition",
    "headline": "Know if a PDF is <em>worth vectorizing</em> before you spend a cycle.",
    "subheadline": "Our structural analysis engine classifies documents based on vector density, raster fragmentation, and semantic layers—giving you the 'go/no-go' signal for your geometry pipeline.",
    "cta_primary": "Analyze your document",
    "cta_secondary": "Read Whitepaper"
  },
  "how_it_works": {
    "title": "How it works",
    "label": "Proprietary Pipeline",
    "steps": [
      {
        "n": "01",
        "title": "Ingest",
        "desc": "Multi-threaded stream processing of PDF primitives."
      },
      {
        "n": "02",
        "title": "Measure",
        "desc": "Quantifying line types, hatches and curves."
      },
      {
        "n": "03",
        "title": "Normalize",
        "desc": "Density assessment against relative page area."
      },
      {
        "n": "04",
        "title": "Classify",
        "desc": "Heuristic-based suitability determination."
      }
    ]
  },
  "specs": {
    "title": "Technical Specs",
    "desc": "Built for high-fidelity geometric extraction at scale.",
    "items": [
      {
        "label": "Resolution",
        "title": "Sub-pixel Precision",
        "desc": "Coordinates tracked to 1/100th of a point."
      },
      {
        "label": "Engine",
        "title": "PyMuPDF Core",
        "desc": "High-performance C++ backend for lightning analysis."
      },
      {
        "label": "Scale",
        "title": "Unlimited Pages",
        "desc": "Stream-processing handles documents of any size."
      }
    ]
  },
  "cta_strip": {
    "title": "Ready to optimize your geometry pipeline?",
    "desc": "Stop guessing. Start measuring document quality before you commit to vectorization.",
    "button": "Start Analyzing Now"
  },
  "samples": {
    "vector": {
      "name": "Floor-Plan-Block-B.pdf",
      "meta": "12 PAGES · 8.4 MB · VECTOR",
      "pages": 12,
      "verdict": "good",
      "label": "Vector-Rich Asset",
      "title": "Structured Geometry Detected",
      "headline": "Structured Geometry Detected",
      "accent": "→ SUITABLE",
      "sub": "Found 12,410 lines and 4,120 curves across 12 pages. With a 66.0% vector density and 124 hatch patterns, this file is fully suitable for parametric extraction.",
      "confidence": 98,
      "composition": { "vector": 54, "hatch": 12, "image": 4, "text": 30 },
      "routing": "Suitable",
      "nextStep": "Classification: VECTOR RICH PDF → SUITABLE",
      "metrics": [
        ["Lines",           "12,410",     "line_count"],
        ["Curves",          "4,120",      "curve_count (c + qu)"],
        ["Quads",           "812",        "quad_count"],
        ["Hatch count",     "124",        "shade_fill_count"],
        ["Vector %",        "54.00",      "v_pct"],
        ["Hatch area %",    "12.00",      "h_pct"],
        ["Image %",         "4.00",       "i_pct"],
        ["Selectable text %","30.00",     "t_pct"],
        ["Char count",      "2,108",      "char_count"],
        ["Vector length",   "84,102.50",  "vector_length (pt)"],
        ["v_total",         "66.00",      "v_pct + h_pct"],
        ["Pages",           "12",         "doc.page_count"]
      ],
      "perPage": [
        [52,10,2,36,"v"], [61,12,1,26,"v"], [48,15,5,32,"v"], [55,11,4,30,"v"],
        [66,8,2,24,"v"], [50,14,3,33,"v"], [58,10,2,30,"v"], [54,12,4,30,"v"]
      ]
    },
    "image": {
      "name": "Site-Survey-Scan.pdf",
      "meta": "6 PAGES · 22.1 MB · SCAN",
      "pages": 6,
      "verdict": "bad",
      "label": "Raster Document",
      "title": "Image-Heavy Layout",
      "headline": "Image-Heavy Layout",
      "accent": "→ NOT SUITABLE",
      "sub": "The file is dominated by raster data (88.4% coverage). No significant vector primitives were detected. This will require optical reconstruction before further processing.",
      "confidence": 94,
      "composition": { "vector": 2, "hatch": 0, "image": 88, "text": 10 },
      "routing": "Not suitable",
      "nextStep": "Classification: RASTER HEAVY PDF → NOT SUITABLE",
      "metrics": [
        ["Lines",           "42",         "line_count"],
        ["Curves",          "12",         "curve_count (c + qu)"],
        ["Quads",           "0",          "quad_count"],
        ["Hatch count",     "0",          "shade_fill_count"],
        ["Vector %",        "2.00",       "v_pct"],
        ["Hatch area %",    "0.00",       "h_pct"],
        ["Image %",         "88.00",      "i_pct"],
        ["Selectable text %","10.00",      "t_pct"],
        ["Char count",      "156",        "char_count"],
        ["Vector length",   "102.10",     "vector_length (pt)"],
        ["v_total",         "2.00",       "v_pct + h_pct"],
        ["Pages",           "6",          "doc.page_count"]
      ],
      "perPage": [
        [1,0,94,5,"i"], [2,0,90,8,"i"], [3,0,88,9,"i"], [2,0,85,13,"i"],
        [1,0,92,7,"i"], [2,0,91,7,"i"]
      ]
    },
    "text": {
      "name": "Spec-Document.pdf",
      "meta": "24 PAGES · 1.2 MB · TEXT",
      "pages": 24,
      "verdict": "bad",
      "label": "TEXT RICH PDF",
      "title": "Text-rich PDF — not suitable.",
      "headline": "TEXT RICH PDF",
      "accent": "→ NOT SUITABLE",
      "sub": "Dominant signal is TEXT. Selectable text % exceeds v_total (Vector % + Hatch area %) and Image %.",
      "confidence": 91,
      "composition": { "vector": 8, "hatch": 0, "image": 6, "text": 86 },
      "routing": "Not suitable",
      "nextStep": "Classification: TEXT RICH PDF → NOT SUITABLE",
      "metrics": [
        ["Lines",           "412",        "line_count"],
        ["Curves",          "88",         "curve_count (c + qu)"],
        ["Quads",           "0",          "quad_count"],
        ["Hatch count",     "0",          "shade_fill_count"],
        ["Vector %",        "8.00",       "v_pct"],
        ["Hatch area %",    "0.00",       "h_pct"],
        ["Image %",         "6.00",       "i_pct"],
        ["Selectable text %","86.00",     "t_pct"],
        ["Char count",      "64,128",     "char_count"],
        ["Vector length",   "3,108.40",   "vector_length (pt)"],
        ["v_total",         "8.00",       "v_pct + h_pct"],
        ["Pages",           "24",         "doc.page_count"]
      ],
      "perPage": [
        [8,0,4,88,"t"], [6,0,3,91,"t"], [9,0,8,83,"t"], [7,0,5,88,"t"],
        [10,0,6,84,"t"], [8,1,7,84,"t"], [9,0,4,87,"t"], [7,0,6,87,"t"]
      ]
    }
  }
};
