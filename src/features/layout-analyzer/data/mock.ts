// --- Constants & Templates ---
export const FLOOR_PLAN_HERO = `
<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">
  <rect width="360" height="480" fill="#fdfcf9"/>
  <g stroke="#0c0c0d" stroke-width="0.6" fill="none" font-family="Space Mono, monospace" font-size="6">
    <rect x="12" y="12" width="336" height="20"/>
    <text x="20" y="25" font-size="7" font-weight="700">FLOOR PLAN — BLOCK B / LEVEL 01</text>
    <text x="280" y="25">SHEET 01/12</text>
    <rect x="30" y="50" width="300" height="380" stroke-width="2"/>
    <rect x="32" y="52" width="296" height="376"/>
    <line x1="160" y1="52" x2="160" y2="220" stroke-width="1.4"/>
    <line x1="160" y1="240" x2="160" y2="428" stroke-width="1.4"/>
    <line x1="32" y1="220" x2="160" y2="220" stroke-width="1.4"/>
    <line x1="160" y1="280" x2="328" y2="280" stroke-width="1.4"/>
    <line x1="240" y1="280" x2="240" y2="428" stroke-width="1.4"/>
    <path d="M 80 220 A 24 24 0 0 1 104 196"/>
    <path d="M 200 280 A 22 22 0 0 1 222 258"/>
    <line x1="80" y1="50" x2="120" y2="50" stroke-width="2.4"/>
    <line x1="200" y1="50" x2="240" y2="50" stroke-width="2.4"/>
    <rect x="44" y="64" width="48" height="28" stroke-width="0.5"/>
    <rect x="100" y="64" width="40" height="22" stroke-width="0.5"/>
    <circle cx="220" cy="120" r="14" stroke-width="0.5"/>
    <circle cx="220" cy="120" r="9" stroke-width="0.4"/>
    <rect x="180" y="170" width="50" height="34" stroke-width="0.5"/>
    <rect x="260" y="170" width="50" height="34" stroke-width="0.5"/>
    <pattern id="hh" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#0c0c0d" stroke-width="0.4"/>
    </pattern>
    <rect x="44" y="240" width="100" height="64" stroke-width="0.6"/>
    <rect x="46" y="242" width="44" height="60" fill="url(#hh)"/>
    <circle cx="118" cy="262" r="8" stroke-width="0.5"/>
    <rect x="105" y="284" width="32" height="14" stroke-width="0.5"/>
    <rect x="180" y="300" width="50" height="100" stroke-width="0.6"/>
    <line x1="180" y1="312" x2="230" y2="312"/><line x1="180" y1="324" x2="230" y2="324"/>
    <line x1="180" y1="336" x2="230" y2="336"/><line x1="180" y1="348" x2="230" y2="348"/>
    <line x1="180" y1="360" x2="230" y2="360"/><line x1="180" y1="372" x2="230" y2="372"/>
    <line x1="180" y1="384" x2="230" y2="384"/>
    <line x1="32" y1="445" x2="328" y2="445" stroke="#ff3b30" stroke-width="0.6"/>
    <text x="180" y="458" text-anchor="middle" fill="#ff3b30" stroke="none">14.80 m</text>
    <circle cx="32" cy="40" r="6" stroke-width="0.5"/><text x="32" y="42" text-anchor="middle">A</text>
    <circle cx="160" cy="40" r="6" stroke-width="0.5"/><text x="160" y="42" text-anchor="middle">B</text>
    <circle cx="328" cy="40" r="6" stroke-width="0.5"/><text x="328" y="42" text-anchor="middle">C</text>
  </g>
</svg>`;

export const getPdfSVG = (kind: string, page: number) => {
  if (kind === 'vector') return FLOOR_PLAN_HERO.replace('SHEET 01/12', `SHEET ${String(page).padStart(2,'0')}/12`).replace('LEVEL 01', `LEVEL 0${page}`);
  if (kind === 'image') return `
<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="noise${page}" width="3" height="3" patternUnits="userSpaceOnUse">
      <rect width="3" height="3" fill="#e8e0d3"/>
      <circle cx="1" cy="1" r="0.4" fill="#b8ad9a" opacity="0.5"/>
    </pattern>
    <linearGradient id="paper${page}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#efe7d7"/><stop offset="1" stop-color="#d8cdb6"/>
    </linearGradient>
  </defs>
  <rect width="360" height="480" fill="url(#paper${page})"/>
  <rect width="360" height="480" fill="url(#noise${page})" opacity="0.6"/>
  <g stroke="#3a352a" stroke-width="0.8" fill="none" opacity="0.55">
    <path d="M 30 60 L 320 60 L 320 90 L 280 110 L 280 200 L 320 220 L 320 380 L 240 410 L 180 380 L 100 410 L 30 390 Z"/>
    <path d="M 60 200 L 200 200 L 200 320 L 60 320 Z"/>
    <path d="M 60 240 L 200 240"/><path d="M 130 200 L 130 320"/>
    <circle cx="260" cy="280" r="22"/>
    <path d="M 240 280 L 280 280 M 260 260 L 260 300"/>
  </g>
  <text x="30" y="35" font-family="serif" font-size="9" fill="#4a4030" opacity="0.7">SITE SURVEY · BLOCK 04 · 1972</text>
  <text x="30" y="455" font-family="serif" font-size="7" fill="#4a4030" opacity="0.7">Drawn by R. Mehta — Sheet ${page}</text>
  <ellipse cx="290" cy="340" rx="28" ry="22" fill="#b89a6a" opacity="0.18"/>
  <ellipse cx="290" cy="340" rx="20" ry="15" fill="none" stroke="#8a6f44" stroke-width="0.6" opacity="0.4"/>
</svg>`;
  return `
<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">
  <rect width="360" height="480" fill="#fdfcf9"/>
  <g font-family="serif" fill="#0c0c0d">
    <text x="40" y="60" font-size="14" font-weight="700">3.${page} SCOPE OF WORK</text>
    <g font-size="6.6">
      ${Array.from({length: 30}).map((_, i) => {
        const wide = i % 9 === 0;
        const len = 220 + Math.random() * 60;
        return `<text x="40" y="${88 + i * 11}" font-weight="${wide ? 700 : 400}">` +
          (wide
            ? `3.${page}.${Math.floor(i/9)+1}  ` + ['Geometry pipeline overview','Parametrization standards','Quality assurance','Deliverables and handoff'][Math.floor(i/9)%4]
            : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.'.slice(0, Math.floor(len/3.4))
          ) + `</text>`;
      }).join('')}
    </g>
    <text x="40" y="450" font-size="6" fill="#888">Spec Document · Page ${page} of 24</text>
  </g>
</svg>`;
};

export const SAMPLES = {
  "vector": {
    "name": "Floor-Plan-Block-B.pdf",
    "meta": "12 PAGES · 8.4 MB · VECTOR",
    "pages": 12,
    "verdict": "good",
    "headline": "Vector-Rich Layout",
    "sub": "",
    "confidence": 98,
    "composition": { "vector": 54, "hatch": 12, "image": 4, "text": 30 },
    "metrics": [
      ["Lines", "12,410", "line_count"],
      ["Curves", "4,120", "curve_count"],
      ["Quads", "812", "quad_count"],
      ["Hatch count", "124", "shade_fill_count"],
      ["Char count", "2,108", "char_count"],
      ["Vector %", "54.00", "avg v_pct"],
      ["Hatch %", "12.00", "avg h_pct"],
      ["Image %", "4.00", "avg i_pct"],
      ["Text %", "30.00", "avg t_pct"],
      ["v_total", "66.00", "v_pct + h_pct"],
      ["Pages", "12", "doc.page_count"],
      ["Vector len", "84,102.50", "vector_length (pt)"]
    ],
    "perPage": [
      [52, 10, 2, 36, "v"], [61, 12, 1, 26, "v"], [48, 15, 5, 32, "v"], [55, 11, 4, 30, "v"],
      [66, 8, 2, 24, "v"], [50, 14, 3, 33, "v"], [58, 10, 2, 30, "v"], [54, 12, 4, 30, "v"],
      [49, 13, 6, 32, "v"], [57, 9, 3, 31, "v"], [60, 11, 2, 27, "v"], [53, 10, 5, 32, "v"]
    ]
  },
  "image": {
    "name": "Site-Survey-Block-04.pdf",
    "meta": "6 PAGES · 14.2 MB · SCAN",
    "pages": 6,
    "verdict": "bad",
    "headline": "Image-Heavy Layout",
    "sub": "",
    "confidence": 85,
    "composition": { "vector": 6, "hatch": 2, "image": 73, "text": 19 },
    "metrics": [
      ["Lines", "340", "line_count"],
      ["Curves", "82", "curve_count"],
      ["Quads", "0", "quad_count"],
      ["Hatch count", "8", "shade_fill_count"],
      ["Char count", "4,210", "char_count"],
      ["Vector %", "5.80", "avg v_pct"],
      ["Hatch %", "1.60", "avg h_pct"],
      ["Image %", "72.50", "avg i_pct"],
      ["Text %", "20.10", "avg t_pct"],
      ["v_total", "7.40", "v_pct + h_pct"],
      ["Pages", "6", "doc.page_count"],
      ["Vector len", "12,480.30", "vector_length (pt)"]
    ],
    "perPage": [
      [5, 2, 78, 15, "i"], [7, 1, 70, 22, "i"], [4, 3, 75, 18, "i"],
      [8, 2, 68, 22, "i"], [6, 1, 74, 19, "i"], [5, 3, 72, 20, "i"]
    ]
  },
  "text": {
    "name": "Spec-Document-v3.pdf",
    "meta": "24 PAGES · 1.2 MB · TEXT",
    "pages": 24,
    "verdict": "bad",
    "headline": "Text-Rich Document",
    "sub": "",
    "confidence": 91,
    "composition": { "vector": 8, "hatch": 1, "image": 3, "text": 88 },
    "metrics": [
      ["Lines", "180", "line_count"],
      ["Curves", "24", "curve_count"],
      ["Quads", "0", "quad_count"],
      ["Hatch count", "2", "shade_fill_count"],
      ["Char count", "42,180", "char_count"],
      ["Vector %", "6.20", "avg v_pct"],
      ["Hatch %", "0.80", "avg h_pct"],
      ["Image %", "4.60", "avg i_pct"],
      ["Text %", "88.40", "avg t_pct"],
      ["v_total", "7.00", "v_pct + h_pct"],
      ["Pages", "24", "doc.page_count"],
      ["Vector len", "3,210.80", "vector_length (pt)"]
    ],
    "perPage": [
      [4, 0, 2, 94, "t"], [6, 1, 3, 90, "t"], [3, 0, 5, 92, "t"], [5, 1, 2, 92, "t"],
      [7, 0, 4, 89, "t"], [4, 1, 3, 92, "t"], [5, 0, 2, 93, "t"], [6, 1, 4, 89, "t"],
      [3, 0, 3, 94, "t"], [5, 1, 2, 92, "t"], [4, 0, 5, 91, "t"], [6, 1, 3, 90, "t"],
      [7, 0, 2, 91, "t"], [4, 1, 4, 91, "t"], [5, 0, 3, 92, "t"], [6, 1, 2, 91, "t"],
      [3, 0, 5, 92, "t"], [5, 1, 3, 91, "t"], [4, 0, 2, 94, "t"], [6, 1, 4, 89, "t"],
      [7, 0, 3, 90, "t"], [4, 1, 2, 93, "t"], [5, 0, 5, 90, "t"], [6, 1, 3, 90, "t"]
    ]
  }
};
