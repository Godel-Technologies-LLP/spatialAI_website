/* ───────── Configuration ───────── */
const SAMPLES = SITE_CONTENT.samples;

const FLOOR_PLAN_HERO = `
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

function pdfSVG(kind, page) {
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
}

/* ───────── Content Injection ───────── */
function injectContent() {
  const c = SITE_CONTENT;
  if (!c) return;

  // Nav
  if ($('.logo-name b')) $('.logo-name b').textContent = c.navigation.logo.name;
  if ($('.logo-name span')) $('.logo-name span').textContent = c.navigation.logo.sub;
  if ($('.nav-cta')) $('.nav-cta').childNodes[0].textContent = c.navigation.cta + ' ';
  
  // Hero
  if ($('.hero .pill')) $('.hero .pill').textContent = c.hero.pill;
  if ($('.hero h1')) $('.hero h1').innerHTML = c.hero.headline;
  if ($('.hero p.lead')) $('.hero p.lead').textContent = c.hero.subheadline;
  if ($('.hero .btn-dark')) $('.hero .btn-dark').childNodes[0].textContent = c.hero.cta_primary + ' ';
  if ($('.hero .btn-line')) $('.hero .btn-line').textContent = c.hero.cta_secondary;

  // How it works
  if ($('.how-head h3')) $('.how-head h3').textContent = c.how_it_works.title;
  if ($('.how-head .step-label')) $('.how-head .step-label').textContent = c.how_it_works.label;
  
  const steps = $$('.step');
  c.how_it_works.steps.forEach((s, i) => {
    if (steps[i]) {
      $('.n', steps[i]).textContent = s.n;
      $('h4', steps[i]).textContent = s.title;
      $('p', steps[i]).textContent = s.desc;
    }
  });

  // Specs
  if ($('.specs-head h2')) $('.specs-head h2').textContent = c.specs.title;
  if ($('.specs-head p')) $('.specs-head p').textContent = c.specs.desc;
  
  const specs = $$('.spec');
  c.specs.items.forEach((s, i) => {
    if (specs[i]) {
      $('.l', specs[i]).textContent = s.label;
      $('h5', specs[i]).textContent = s.title;
      $('p', specs[i]).textContent = s.desc;
    }
  });

  // CTA Strip
  if ($('.cta-strip h3')) $('.cta-strip h3').textContent = c.cta_strip.title;
  if ($('.cta-strip p')) $('.cta-strip p').textContent = c.cta_strip.desc;
  if ($('.cta-strip .btn-light')) $('.cta-strip .btn-light').textContent = c.cta_strip.button;
}

document.addEventListener('DOMContentLoaded', injectContent);

/* ───────── Routing ───────── */
const $ = (s, r=document.getElementById('ga-root')||document) => r.querySelector(s);
const $$ = (s, r=document.getElementById('ga-root')||document) => Array.from(r.querySelectorAll(s));

function go(page) {
  $$('.page').forEach(p => { p.classList.remove('on','entering'); });
  const el = $('#page-' + page);
  if (el) {
    el.classList.add('on','entering');
    setTimeout(() => el.classList.remove('entering'), 400);
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
}

document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-go]');
  if (t) { go(t.dataset.go); }
});

/* ───────── Upload Logic ───────── */
let CURRENT, CURRENT_KIND, CURRENT_PG = 1;
let anlTimer;

const drop = $('#drop');
const realFileInput = $('#realFileInput');

if (drop) {
    ['dragenter','dragover'].forEach(ev =>
      drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('drag'); }));
    ['dragleave','drop'].forEach(ev =>
      drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('drag'); }));
    
    drop.addEventListener('drop', (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type === 'application/pdf') {
        handleRealUpload(file);
      } else {
        alert('Please drop a valid PDF file.');
      }
    });
}

if ($('#browseBtn')) {
    $('#browseBtn').addEventListener('click', () => realFileInput.click());
}

if (realFileInput) {
    realFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) handleRealUpload(file);
    });
}

$$('.sample').forEach(el => el.addEventListener('click', () => startAnalyze(el.dataset.sample)));

async function handleRealUpload(file) {
  const formData = new FormData();
  formData.append('file', file);

  $('#anlFile').textContent = file.name;
  $('#anlPct').textContent = '0%';
  $('#anlRing').setAttribute('stroke-dashoffset', '276.46');
  $$('.stage').forEach(s => s.classList.remove('done','run'));
  $$('.stage')[0].classList.add('run');
  $('#anlStatus').textContent = 'Uploading to engine…';
  
  go('analyzing');

  let pct = 0;
  if (anlTimer) clearInterval(anlTimer);
  anlTimer = setInterval(() => {
    pct = Math.min(98, pct + (100 - pct) * 0.05);
    $('#anlPct').textContent = Math.round(pct) + '%';
    $('#anlRing').setAttribute('stroke-dashoffset', String(276.46 * (1 - pct / 100)));
    
    const stageIdx = Math.min(3, Math.floor(pct / 25));
    $$('.stage').forEach((s, i) => {
      s.classList.remove('run','done');
      if (i < stageIdx) s.classList.add('done');
      else if (i === stageIdx) s.classList.add('run');
    });
  }, 150);

  try {
    const response = await fetch('/analyze', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) throw new Error('Analysis failed');
    
    const result = await response.json();
    clearInterval(anlTimer);
    $('#anlPct').textContent = '100%';
    $('#anlRing').setAttribute('stroke-dashoffset', '0');
    $$('.stage').forEach(s => { s.classList.remove('run'); s.classList.add('done'); });
    
    CURRENT = result;
    CURRENT.isReal = true;
    CURRENT_KIND = result.verdict === 'good' ? 'vector' : (result.composition.image > result.composition.text ? 'image' : 'text');
    CURRENT_PG = 1;
    
    setTimeout(() => {
      renderResults();
      go('results');
    }, 600);

  } catch (err) {
    clearInterval(anlTimer);
    alert('Error connecting to backend.');
    go('upload');
  }
}

function startAnalyze(kind) {
  CURRENT = SAMPLES[kind];
  CURRENT_KIND = kind;
  CURRENT_PG = 1;
  $('#anlFile').textContent = CURRENT.name;
  $('#anlPct').textContent = '0%';
  $('#anlRing').setAttribute('stroke-dashoffset', '276.46');
  $$('.stage').forEach(s => s.classList.remove('done','run'));
  $$('.stage')[0].classList.add('run');
  $('#anlStatus').textContent = 'Parsing pages…';

  go('analyzing');

  let pct = 0;
  if (anlTimer) clearInterval(anlTimer);
  const stageMsgs = ['Parsing primitives…','Measuring geometry…','Normalizing scores…','Classifying file…'];
  
  anlTimer = setInterval(() => {
    pct = Math.min(100, pct + Math.random() * 8 + 4);
    const stageIdx = Math.min(3, Math.floor(pct / 26));
    $$('.stage').forEach((s, i) => {
      s.classList.remove('run','done');
      if (i < stageIdx) s.classList.add('done');
      else if (i === stageIdx) s.classList.add('run');
    });
    $('#anlStatus').textContent = stageMsgs[stageIdx];
    $('#anlPct').textContent = Math.round(pct) + '%';
    $('#anlRing').setAttribute('stroke-dashoffset', String(276.46 * (1 - pct / 100)));

    if (pct >= 100) {
      clearInterval(anlTimer);
      setTimeout(() => { renderResults(); go('results'); }, 380);
    }
  }, 140);
}

/* ───────── UI Rendering ───────── */
function renderResults() {
  const s = CURRENT;
  $('#resTitle').textContent = s.headline;
  $('#resFile').textContent = s.name.toUpperCase() + ' · ' + s.meta;
  
  const vsR = $('#vsR');
  vsR.textContent = s.verdict === 'good' ? 'SUITABLE' : 'NOT SUITABLE';
  vsR.className = 'v-tag ' + (s.verdict === 'good' ? 'good' : 'bad');
  
  $('#vP').textContent = s.sub;
  $('#vsDom').textContent = s.verdict === 'good' ? 'VECTOR' : (CURRENT_KIND.toUpperCase());
  $('#vsV').textContent = (s.composition.vector + s.composition.hatch).toFixed(2);
  $('#confPct').textContent = s.confidence + '%';
  
  // Donut
  const c = s.composition;
  const segs = [
    { k: 'v', val: c.vector, color: 'var(--vec)' },
    { k: 'h', val: c.hatch,  color: 'var(--hch)' },
    { k: 'i', val: c.image,  color: 'var(--img)' },
    { k: 't', val: c.text,   color: 'var(--txt)' },
  ];
  const Circ = 2 * Math.PI * 44;
  let off = 0;
  $('#donutSegs').innerHTML = segs.map(seg => {
    const len = (seg.val / 100) * Circ;
    const dash = `${len} ${Circ - len}`;
    const offset = -off;
    off += len;
    return `<circle cx="60" cy="60" r="44" fill="none" stroke="${seg.color}" stroke-width="14" stroke-dasharray="${dash}" stroke-dashoffset="${offset}" />`;
  }).join('');
  
  const domV = c.vector + c.hatch >= Math.max(c.image, c.text) ? (c.vector + c.hatch) : Math.max(c.image, c.text);
  $('#donutV').innerHTML = domV.toFixed(2) + '<small>%</small>';

  $('#legend').innerHTML = `
    <div class="lg-row"><span class="lg-sw v"></span><span class="lg-l">Vector %</span><span class="lg-v">${c.vector.toFixed(2)}</span></div>
    <div class="lg-row"><span class="lg-sw h"></span><span class="lg-l">Hatch area %</span><span class="lg-v">${c.hatch.toFixed(2)}</span></div>
    <div class="lg-row"><span class="lg-sw i"></span><span class="lg-l">Image %</span><span class="lg-v">${c.image.toFixed(2)}</span></div>
    <div class="lg-row"><span class="lg-sw t"></span><span class="lg-l">Selectable text %</span><span class="lg-v">${c.text.toFixed(2)}</span></div>
  `;

  $('#pgRows').innerHTML = s.perPage.map((p, idx) => `
    <div class="pg-row">
      <span class="pg-num">P.${String(idx+1).padStart(2,'0')}</span>
      <div class="pg-bar">
        <i style="width:${p[0]}%;background:var(--vec);"></i>
        <i style="width:${p[1]}%;background:var(--hch);"></i>
        <i style="width:${p[2]}%;background:var(--img);"></i>
        <i style="width:${p[3]}%;background:var(--txt);"></i>
      </div>
      <span class="pg-tag ${p[4]}">${p[4].toUpperCase()}</span>
    </div>
  `).join('');

  renderMetrics(s.metrics, false);
  
  $('#prFile').textContent = s.name;
  $('#prMeta').textContent = s.meta;
  $('#prClass').textContent = `Dominant: ${s.verdict === 'good' ? 'VECTOR' : CURRENT_KIND.toUpperCase()}`;
  renderPdf();
}

function renderMetrics(metrics, isPage = false) {
  $('#metricsHint').textContent = isPage ? `Page ${CURRENT_PG} details` : 'Document totals';
  $('#metrics').innerHTML = metrics.map(([l,v,f]) =>
    `<div class="met"><div class="l">${l}</div><div class="v">${v}</div><div class="f">${f}</div></div>`
  ).join('');
}

function renderPdf() {
  if (CURRENT.isReal) {
    const url = `/thumbnail/${encodeURIComponent(CURRENT.name)}/${CURRENT_PG}`;
    $('#pdfPage').innerHTML = `<img src="${url}" style="width:100%;height:100%;object-fit:contain;display:block;" />`;
  } else if (CURRENT.thumbnail) {
    $('#pdfPage').innerHTML = `<img src="${CURRENT.thumbnail}" style="width:100%;height:100%;object-fit:contain;display:block;" />`;
  } else {
    $('#pdfPage').innerHTML = pdfSVG(CURRENT_KIND, CURRENT_PG);
  }
  $('#pgLbl').textContent = `Page ${CURRENT_PG} / ${CURRENT.pages}`;
  
  if (CURRENT.perPage && CURRENT.perPage[CURRENT_PG-1] && CURRENT.perPage[CURRENT_PG-1].metrics) {
    renderMetrics(CURRENT.perPage[CURRENT_PG-1].metrics, true);
  }
  $('#pgPrev').disabled = CURRENT_PG <= 1;
  $('#pgNext').disabled = CURRENT_PG >= CURRENT.pages;
}

$('#pgPrev').addEventListener('click', () => { if (CURRENT_PG > 1) { CURRENT_PG--; renderPdf(); }});
$('#pgNext').addEventListener('click', () => { if (CURRENT_PG < CURRENT.pages) { CURRENT_PG++; renderPdf(); }});

/* ───────── Theme ───────── */
const SUN = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>';
const MOON = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
function applyTheme(dark) {
  document.documentElement.classList.toggle('dark', dark);
  $('#themeIcon').innerHTML = dark ? SUN : MOON;
  try { localStorage.setItem('godel.dark', dark ? '1' : '0'); } catch(e){}
}
applyTheme(localStorage.getItem('godel.dark') === '1');
$('#themeBtn').addEventListener('click', () => applyTheme(!document.documentElement.classList.contains('dark')));
