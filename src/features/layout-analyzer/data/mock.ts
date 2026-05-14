// --- Seeded Random Helper for Distinct Pages ---
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const getPdfSVG = (kind: string, page: number) => {
  // 1. Vector: Industrial MEP (HVAC Zoning)
  if (kind === 'vector') {
    const seed = page * 133.5;
    const zone = ['A', 'B', 'C', 'D', 'E', 'F'][page - 1] || 'A';
    
    return `
<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">
  <rect width="360" height="480" fill="#fdfcf9"/>
  <g stroke="#0c0c0d" stroke-width="0.3" fill="none" font-family="Inter, system-ui, sans-serif">
    <!-- CAD Frame -->
    <rect x="5" y="5" width="350" height="470" stroke-width="0.6"/>
    <rect x="310" y="5" width="45" height="470" stroke-width="0.6" fill="#f8f9fa"/>
    <g transform="rotate(90 332 240)" font-size="4.5" font-weight="800">
      <text x="50" y="240" fill="#000">INDUSTRIAL MEP RECONSTRUCTION · ZONE ${zone}</text>
      <text x="350" y="240" fill="#000">SHEET M-0${page}</text>
    </g>

    <!-- HVAC Ductwork (Zonal Geometry) -->
    <path d="M 30 50 L 280 50 L 280 430 L 30 430 Z" stroke-width="1.2" stroke-dasharray="2,1"/>
    <g stroke="#0047AB" stroke-width="1.8">
      <path d="M ${40 + seededRandom(seed)*20} 50 L ${40 + seededRandom(seed)*20} 430 M ${140 + seededRandom(seed+1)*20} 50 L ${140 + seededRandom(seed+1)*20} 430" />
      <path d="M 30 ${100 + seededRandom(seed+2)*20} L 280 ${100 + seededRandom(seed+2)*20} M 30 ${300 + seededRandom(seed+3)*20} L 280 ${300 + seededRandom(seed+3)*20}" />
    </g>

    <!-- Point Extraction Challenge -->
    <g fill="#fff" stroke="#000" stroke-width="0.5">
      ${Array.from({length: 30}).map((_, i) => {
        const x = 35 + seededRandom(seed + i) * 240;
        const y = 55 + seededRandom(seed + i + 1) * 370;
        return `<circle cx="${x}" cy="${y}" r="2.5" />`;
      }).join('')}
    </g>

    <!-- Zonal Annotations -->
    <g font-size="3.5" font-weight="600" fill="#444" stroke="none">
      <text x="40" y="45">SYSTEM: HIGH-PRESSURE AIR (ZONE ${zone})</text>
      ${Array.from({length: 12}).map((_, i) => {
        const x = 40 + seededRandom(seed + i * 2) * 200;
        const y = 60 + seededRandom(seed + i * 2 + 1) * 340;
        return `<text x="${x}" y="${y}">REF-Z${page}-${i+10}</text>`;
      }).join('')}
    </g>

    <!-- Tolerance Dimension -->
    <g stroke="#D0021B" stroke-width="0.5">
      <line x1="30" y1="445" x2="280" y2="445" />
      <text x="155" y="455" text-anchor="middle" fill="#D0021B" stroke="none" font-size="5" font-weight="800">PRECISION THRESHOLD ±0.005mm</text>
    </g>
  </g>
</svg>`;
  }
  
  // 2. Image: Legacy Blueprint Scan (Historical Accuracy)
  if (kind === 'image') {
    const seed = page * 888.8;
    return `
<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="noise${page}"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" result="n"/><feColorMatrix in="n" type="saturate" values="0"/><feBlend mode="multiply"/></filter>
  </defs>
  <rect width="360" height="480" fill="#1A3A6C"/>
  <rect width="360" height="480" fill="url(#noise${page})" opacity="0.4"/>
  <g opacity="0.7" stroke="#fff" stroke-width="1.2" stroke-linecap="round">
    <path d="M ${30 + seededRandom(seed)*20} ${80 + seededRandom(seed+1)*20} Q 180 ${60 + seededRandom(seed+2)*40} 320 120 L 300 420 Q 150 440 40 380 Z" fill="none" stroke-opacity="0.6" />
    <g stroke-opacity="0.3">
      ${Array.from({length: 40}).map((_, i) => {
        const x = seededRandom(seed+i)*360;
        const y = seededRandom(seed+i+1)*480;
        return `<line x1="${x}" y1="${y}" x2="${x+8}" y2="${y+8}" />`;
      }).join('')}
    </g>
    <text x="40" y="30" font-family="serif" font-size="10" fill="#fff" fill-opacity="0.5">LEGACY SURVEY · PLOT 0${page} · 1954</text>
  </g>
  <rect x="230" y="400" width="115" height="65" fill="none" stroke="#fff" stroke-width="0.8" stroke-opacity="0.4" />
  <text x="240" y="420" font-family="serif" font-size="6" fill="#fff" fill-opacity="0.5">HISTORICAL RECORD 0${page}</text>
</svg>`;
  }

  // 3. Text: Assembly BOM (Material Categorization)
  const seed = page * 123.4;
  const category = ['Foundation Systems', 'Structural Steel', 'Primary Bracing', 'Facade Anchors', 'Roof Trusses', 'Secondary Supports'][page - 1] || 'General';
  
  return `
<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">
  <rect width="360" height="480" fill="#fff"/>
  <g font-family="Inter, sans-serif" fill="#000">
    <rect x="15" y="15" width="330" height="40" fill="#000" rx="4"/>
    <text x="30" y="40" font-size="11" font-weight="900" fill="#fff">ASSEMBLY BOM: ${category.toUpperCase()}</text>
    
    <rect x="15" y="70" width="330" height="395" fill="none" stroke="#000" stroke-width="0.6"/>
    <g font-size="4.5" font-weight="800">
      <rect x="15" y="70" width="330" height="12" fill="#333" />
      <text x="20" y="78" fill="#fff">TAG</text>
      <text x="55" y="78" fill="#fff">SPECIFICATION · ${category}</text>
      <text x="290" y="78" fill="#fff">QTY</text>
    </g>
    
    ${Array.from({length: 30}).map((_, i) => {
      const q = Math.floor(seededRandom(seed+i)*250) + 1;
      return `
      <line x1="15" y1="${82 + i * 12.5}" x2="345" y2="${82 + i * 12.5}" stroke="#f4f4f4" />
      <g font-size="4.2">
        <text x="20" y="${91 + i * 12.5}" font-family="monospace">P${page}-${100+i}</text>
        <text x="55" y="${91 + i * 12.5}">Ind. Grade ${seededRandom(seed+i)>0.5 ? 'A572-50' : 'A36'} Component L=${500 + i*50}mm</text>
        <text x="295" y="${91 + i * 12.5}" font-weight="800">${q}</text>
      </g>
    `}).join('')}
    <text x="30" y="455" font-size="5" fill="#999">Sheet 0${page} / 06 · Structural Audit Path</text>
  </g>
</svg>`;
};

export const SAMPLES = {
  "vector": {
    "name": "Industrial-MEP-HVAC-Reconstruction.pdf",
    "meta": "6 PAGES · 18.2 MB · HYBRID DATA",
    "pages": 6,
    "verdict": "good",
    "headline": "High-Density Zonal MEP",
    "sub": "Handles Mechanical and Electrical overlays across 6 technical zones. Proves precision in automated CAD digitizing.",
    "confidence": 99.4,
    "composition": { "vector": 68, "hatch": 12, "image": 2, "text": 18 },
    "metrics": [
      ["Precision", "±0.005mm", "precision_threshold"],
      ["Nodes", "4,210", "node_extraction_count"],
      ["Layers", "Multi-Layer", "cad_zoning_detected"],
      ["Metadata", "High", "interleaved_tags"],
      ["Vector %", "68.00", "avg v_pct"],
      ["Hatch %", "12.00", "avg h_pct"],
      ["Image %", "2.00", "avg i_pct"],
      ["Text %", "18.00", "avg t_pct"]
    ],
    "perPage": Array.from({length: 6}).map((_, i) => [65 + (i % 5), 12 + (i % 3), 2, 21 - (i % 4), "v"])
  },
  "image": {
    "name": "Legacy-Ammonia-Blueprint-Scan.pdf",
    "meta": "6 PAGES · 32.4 MB · REPRO SCAN",
    "pages": 6,
    "verdict": "bad",
    "headline": "Legacy Blueprint Recovery",
    "sub": "Simulates 1950s ammonia-process degradation. Proves geometry recovery from high-noise, low-contrast sources.",
    "confidence": 76,
    "composition": { "vector": 2, "hatch": 0, "image": 94, "text": 4 },
    "metrics": [
      ["Noise Index", "92%", "raster_noise_evaluation"],
      ["Media Type", "Ammonia", "blueprint_process"],
      ["Edge Fuzz", "High", "ink_bleed_index"],
      ["Legacy OCR", "Active", "faded_text_recovery"],
      ["Vector %", "2.00", "avg v_pct"],
      ["Hatch %", "0.00", "avg h_pct"],
      ["Image %", "94.00", "avg i_pct"],
      ["Text %", "4.00", "avg t_pct"]
    ],
    "perPage": Array.from({length: 6}).map((_, i) => [2 + (i % 2), 0, 94 - (i % 2), 4, "i"])
  },
  "text": {
    "name": "Structural-Steel-Assembly-BOM.pdf",
    "meta": "6 PAGES · 1.2 MB · DATA GRID",
    "pages": 6,
    "verdict": "bad",
    "headline": "Zonal Assembly Schedule",
    "sub": "Dense structural steel quantities across 6 project phases. Stress-test for precision tabular data extraction.",
    "confidence": 98.2,
    "composition": { "vector": 8, "hatch": 2, "image": 1, "text": 89 },
    "metrics": [
      ["Row Density", "High", "tabular_complexity"],
      ["Spec Range", "Foundation-Roof", "zonal_coverage"],
      ["Validation", "99.8%", "data_accuracy_threshold"],
      ["ISO/ASTM", "Detected", "standard_compliance"],
      ["Vector %", "8.00", "avg v_pct"],
      ["Hatch %", "2.00", "avg h_pct"],
      ["Image %", "1.00", "avg i_pct"],
      ["Text %", "89.00", "avg t_pct"]
    ],
    "perPage": Array.from({length: 6}).map((_, i) => [8 + (i % 2), 2, 1, 89 - (i % 2), "t"])
  }
};
