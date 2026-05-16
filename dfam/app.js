// DfAM Course Platform — mockup interactivity

// ===== View routing =====
const views = document.querySelectorAll('.view');
const navBtns = document.querySelectorAll('.nav-btn');

function showView(name) {
  views.forEach(v => v.classList.toggle('active', v.id === 'view-' + name));
  navBtns.forEach(b => b.classList.toggle('active', b.dataset.view === name));
  window.scrollTo({ top: 0, behavior: 'instant' });
}

navBtns.forEach(b => b.addEventListener('click', () => showView(b.dataset.view)));
document.querySelectorAll('[data-jump]').forEach(el => {
  el.addEventListener('click', () => showView(el.dataset.jump));
});

// ===== Curriculum data (landing) =====
const modules = [
  { n: '01', title: 'The DfAM Mindset',
    q: 'What changes when we design for additive instead of simply printing existing parts?',
    h: '1.5h', deliv: 'Mindset worksheet' },
  { n: '02', title: 'Finding the Right Applications',
    q: 'Where does AM create real industrial value?',
    h: '2h', deliv: 'Opportunity scorecard' },
  { n: '03', title: 'AM Processes and Materials',
    q: 'Which process / material combination fits the application?',
    h: '2.5h', deliv: 'Selection matrix' },
  { n: '04', title: 'Designing for AM Performance',
    q: 'How do we design the part so material and process can perform?',
    h: '2.5h', deliv: 'Design checklist' },
  { n: '05', title: 'Designing for Industrial Use Cases',
    q: 'How does DfAM apply inside a manufacturing company?',
    h: '1.5h', deliv: 'Factory opportunity map' },
  { n: '06', title: 'Testing, Validation, and Risk',
    q: 'What needs to be proven before this part can be used?',
    h: '2h', deliv: 'Validation plan' },
  { n: '07', title: 'Costing and Business Case',
    q: 'Why would the company approve this?',
    h: '1.5h', deliv: 'Business case' },
  { n: '08', title: 'Capstone: From Part to Proposal',
    q: 'Can you identify, redesign, validate, and justify an AM opportunity?',
    h: '4h+', deliv: 'Capstone proposal' }
];

const modList = document.getElementById('mod-list');
if (modList) {
  modList.innerHTML = modules.map(m => `
    <li class="mod-row">
      <span class="num">MODULE ${m.n}</span>
      <span class="title">${m.title}</span>
      <span class="qq">${m.q}</span>
      <span class="meta">${m.h}</span>
      <span class="deliv">${m.deliv}</span>
    </li>
  `).join('');
}

// ===== Dashboard path list =====
const pathList = document.getElementById('path-list');
if (pathList) {
  pathList.innerHTML = modules.map((m, i) => {
    const cls = i < 2 ? 'done' : i === 2 ? 'active' : '';
    return `<li class="${cls}">M${m.n} — ${m.title}</li>`;
  }).join('');
}

// ===== Capstone tree =====
const capStages = [
  ['01','Part / application',          'done',   '10%'],
  ['02','Current problem',             'done',   '5%'],
  ['03','AM opportunity',              'done',   '10%'],
  ['04','Process / material',          'done',   '15%'],
  ['05','DfAM redesign',               'done',   '20%'],
  ['06','Expected benefits',           'active', '10%'],
  ['07','Risks',                        '',      '10%'],
  ['08','Validation plan',              '',      '10%'],
  ['09','Business case',                '',      '5%'],
  ['10','Implementation recommendation','',      '5%']
];
const capTree = document.getElementById('cap-tree');
if (capTree) {
  capTree.innerHTML = capStages.map(([n,t,c,w]) => `
    <li class="${c}"><span class="n">${n}</span><span>${t}</span><span class="w">${w}</span></li>
  `).join('');
}

// ===== Module 2 sorter =====
const candidates = [
  { id: 'p1', t: 'Weld fixture B7',       m: 'Plant 4 · 4 changeovers/yr',  e: 'Long lead time · downtime risk',     score: 88, ideal: 'strategic' },
  { id: 'p2', t: 'Door handle',           m: 'Plant 2 · 50k/yr injection',  e: 'Cheap to mold · standard tolerance', score: 18, ideal: 'poor' },
  { id: 'p3', t: 'Coolant manifold',      m: 'Plant 2 · low volume',        e: 'Complex internal channels',          score: 92, ideal: 'strategic' },
  { id: 'p4', t: 'EOAT gripper',          m: 'Plant 1 · cycle critical',    e: 'Weight-sensitive · customized',      score: 78, ideal: 'strong' },
  { id: 'p5', t: 'Storage bin',           m: 'Cafeteria',                    e: 'No engineering function',            score: 6,  ideal: 'poor' },
  { id: 'p6', t: 'Sensor jig',            m: 'Plant 1 · low volume',         e: 'Custom · short lead time',           score: 70, ideal: 'strong' },
  { id: 'p7', t: 'Cable comb',            m: 'Plant 3 · 200/yr',             e: 'Low complexity · low criticality',   score: 32, ideal: 'possible' },
  { id: 'p8', t: 'Heat exchanger insert', m: 'Plant 4 · pilot',              e: 'Performance gain potential',         score: 84, ideal: 'strategic' }
];

const tray = document.getElementById('tray');
if (tray) {
  // sorter state
  const placed = {}; // id -> bin

  function renderTray() {
    tray.innerHTML = '';
    candidates.forEach(c => {
      if (placed[c.id]) return;
      tray.appendChild(makeCard(c));
    });
    updateStatus();
    updateRadar();
    updateTop3();
  }

  function makeCard(c) {
    const el = document.createElement('div');
    el.className = 'card';
    el.draggable = true;
    el.dataset.id = c.id;
    el.innerHTML = `<div class="ct">${c.t}</div><div class="cm">${c.m}</div><div class="ce">${c.e}</div>`;
    el.addEventListener('dragstart', e => {
      el.classList.add('dragging');
      e.dataTransfer.setData('text/plain', c.id);
      e.dataTransfer.effectAllowed = 'move';
    });
    el.addEventListener('dragend', () => el.classList.remove('dragging'));
    return el;
  }

  const bins = document.querySelectorAll('#bins .bin');
  bins.forEach(bin => {
    bin.addEventListener('dragover', e => { e.preventDefault(); bin.classList.add('over'); });
    bin.addEventListener('dragleave', () => bin.classList.remove('over'));
    bin.addEventListener('drop', e => {
      e.preventDefault();
      bin.classList.remove('over');
      const id = e.dataTransfer.getData('text/plain');
      placed[id] = bin.dataset.bin;
      // remove from wherever it was
      document.querySelectorAll(`[data-id="${id}"]`).forEach(n => n.remove());
      // add to this bin
      const c = candidates.find(x => x.id === id);
      const node = makeCard(c);
      bin.appendChild(node);
      updateStatus();
      updateRadar();
      updateTop3();
    });
  });

  // also allow drop back to tray
  tray.addEventListener('dragover', e => e.preventDefault());
  tray.addEventListener('drop', e => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    delete placed[id];
    document.querySelectorAll(`[data-id="${id}"]`).forEach(n => n.remove());
    const c = candidates.find(x => x.id === id);
    tray.appendChild(makeCard(c));
    updateStatus();
    updateRadar();
    updateTop3();
  });

  function updateStatus() {
    const n = Object.keys(placed).length;
    document.getElementById('sort-status').textContent = `${n} of ${candidates.length} sorted`;
  }

  document.getElementById('reset-sorter').addEventListener('click', () => {
    Object.keys(placed).forEach(k => delete placed[k]);
    bins.forEach(b => b.querySelectorAll('.card').forEach(c => c.remove()));
    renderTray();
  });

  document.getElementById('submit-sorter').addEventListener('click', () => {
    // simple expert match
    const sorted = Object.entries(placed);
    let correct = 0;
    sorted.forEach(([id, bin]) => {
      const c = candidates.find(x => x.id === id);
      if (c.ideal === bin) correct++;
    });
    alert(`Expert ranking unlocked.\n\nYou matched ${correct} of ${sorted.length} placements to the expert ranking.\n\nTop opportunity: Coolant manifold · score 92\nMust-reject: Storage bin · score 6\n\nResults sent to Capstone Step 1.`);
  });

  renderTray();
}

// ===== Module 2 radar =====
function updateRadar() {
  const svg = document.getElementById('radar2');
  if (!svg) return;
  const axes = [
    'Lead time', 'Complexity', 'Volume fit', 'Customization',
    'Assembly', 'Tooling', 'Downtime', 'Material'
  ];
  const center = { x: 110, y: 110 };
  const radius = 80;
  const N = axes.length;

  // aggregate scores from placed bins
  // bonus weights per bin
  const wMap = { poor: 0.2, possible: 0.5, strong: 0.8, strategic: 1.0 };
  const placedCards = document.querySelectorAll('.bin .card');
  let agg = new Array(N).fill(0);
  let count = 0;
  placedCards.forEach(card => {
    const id = card.dataset.id;
    const bin = card.parentElement.dataset.bin;
    const c = candidates.find(x => x.id === id);
    if (!c) return;
    const w = wMap[bin] || 0.5;
    // pseudo-spread the candidate's score over axes deterministically
    for (let i = 0; i < N; i++) {
      const seed = (c.score + i * 7 + id.charCodeAt(1)) % 100;
      agg[i] += (seed / 100) * w;
    }
    count++;
  });
  if (count === 0) agg = new Array(N).fill(0.05);
  else agg = agg.map(v => Math.min(1, v / count));

  function ring(r, color) {
    let pts = '';
    for (let i = 0; i < N; i++) {
      const a = -Math.PI / 2 + (i / N) * Math.PI * 2;
      const x = center.x + Math.cos(a) * r;
      const y = center.y + Math.sin(a) * r;
      pts += `${x},${y} `;
    }
    return `<polygon points="${pts.trim()}" fill="none" stroke="${color}" stroke-width="1"/>`;
  }

  let svgInner = '';
  // rings
  [0.33, 0.66, 1].forEach(s => { svgInner += ring(radius * s, '#2a323d'); });
  // axes
  for (let i = 0; i < N; i++) {
    const a = -Math.PI / 2 + (i / N) * Math.PI * 2;
    const x = center.x + Math.cos(a) * radius;
    const y = center.y + Math.sin(a) * radius;
    svgInner += `<line x1="${center.x}" y1="${center.y}" x2="${x}" y2="${y}" stroke="#232a34" stroke-width="1"/>`;
    const lx = center.x + Math.cos(a) * (radius + 16);
    const ly = center.y + Math.sin(a) * (radius + 16);
    svgInner += `<text x="${lx}" y="${ly}" font-family="ui-monospace, monospace" font-size="9"
      fill="#6b7787" text-anchor="middle" dominant-baseline="middle">${axes[i]}</text>`;
  }
  // data polygon
  let dpts = '';
  for (let i = 0; i < N; i++) {
    const a = -Math.PI / 2 + (i / N) * Math.PI * 2;
    const r = radius * agg[i];
    const x = center.x + Math.cos(a) * r;
    const y = center.y + Math.sin(a) * r;
    dpts += `${x},${y} `;
  }
  svgInner += `<polygon points="${dpts.trim()}" fill="rgba(58,141,255,.22)" stroke="#3a8dff" stroke-width="1.8"/>`;

  svg.innerHTML = svgInner;
}

// ===== Top 3 strongest =====
function updateTop3() {
  const el = document.getElementById('top3');
  if (!el) return;
  const placedCards = document.querySelectorAll('.bin .card');
  const wMap = { poor: 5, possible: 30, strong: 70, strategic: 100 };
  const list = [];
  placedCards.forEach(card => {
    const id = card.dataset.id;
    const bin = card.parentElement.dataset.bin;
    const c = candidates.find(x => x.id === id);
    if (!c) return;
    const finalScore = Math.round((c.score * 0.6) + (wMap[bin] || 0) * 0.4);
    list.push({ t: c.t, score: finalScore });
  });
  list.sort((a, b) => b.score - a.score);
  const top = list.slice(0, 3);
  if (top.length === 0) {
    el.innerHTML = `<li style="color:#6b7787;justify-content:center">Drag candidates into bins to populate</li>`;
    return;
  }
  el.innerHTML = top.map((x, i) => `
    <li><span>${i+1}. ${x.t}</span><span class="score">${x.score}</span></li>
  `).join('');
}

// init radar empty state
updateRadar();
updateTop3();

// ============================================================
// Module tab switching
// ============================================================
const modTabs = document.querySelectorAll('.mtab');
const modBodies = document.querySelectorAll('.mod-body');
modTabs.forEach(t => t.addEventListener('click', () => {
  const id = t.dataset.mod;
  modTabs.forEach(x => x.classList.toggle('active', x === t));
  modBodies.forEach(b => b.hidden = b.dataset.mod !== id);
  window.scrollTo({ top: 0, behavior: 'instant' });
}));

// ============================================================
// MODULE 1 — Mindset slider
// ============================================================
(function module1() {
  const slider = document.getElementById('mindset-slider');
  if (!slider) return;

  const title    = document.getElementById('ms-approach-title');
  const body     = document.getElementById('ms-approach-body');
  const attrList = document.getElementById('ms-attr-list');
  const resultN  = document.getElementById('ms-result-num');
  const resultL  = document.getElementById('ms-result-lbl');
  const verdict  = document.getElementById('ms-verdict');
  const caption  = document.getElementById('ms-caption');
  const partG    = document.getElementById('ms-part');

  function render() {
    const v = +slider.value; // 0..100

    // Performance curve: 0 = material-first failure, 100 = function-first success
    const perf = Math.round(18 + (v / 100) * 108);  // 18% → 126%
    const kt   = (3.2 - (v / 100) * 1.8).toFixed(2);

    if (v < 35) {
      title.textContent = 'Premium material · same legacy geometry';
      body.textContent  = 'The team upgrades to PEEK and prints the original bracket as-drawn. Load runs perpendicular to layers. Sharp corners remain. No supports planned.';
      attrList.innerHTML = attrs(['PEEK · 90 MPa rated', 'Orientation: as-drawn', 'Sharp internal corners', 'No support strategy', 'No load-path analysis']);
      caption.textContent = `Load ⟂ layer plane · Kt = ${kt}`;
      drawPart('bad');
    } else if (v < 65) {
      title.textContent = 'Material upgrade · partial design adaptation';
      body.textContent  = 'Some adjustments — orientation rotated, fillets added — but load path still crosses critical layer interfaces.';
      attrList.innerHTML = attrs(['PA-CF · 70 MPa rated', 'Orientation: 30° tilt', 'Fillets added', 'Partial supports', 'Load path partially aligned']);
      caption.textContent = `Load 60° from layer plane · Kt = ${kt}`;
      drawPart('mid');
    } else {
      title.textContent = 'Basic material · full DfAM redesign';
      body.textContent  = 'Same envelope, completely re-designed. Orientation aligns load with layer plane. Stress concentrations removed. Ribbed, consolidated, supported.';
      attrList.innerHTML = attrs(['PA12 · 48 MPa rated', 'Orientation: load ∥ layers', 'Generous fillets', 'Self-supporting features', 'Consolidated 4 → 1 part']);
      caption.textContent = `Load ∥ layer plane · Kt = ${kt}`;
      drawPart('good');
    }

    if (perf < 60) {
      resultN.className = 'result-num';
      resultN.innerHTML = `${perf}<span>%</span>`;
      resultL.textContent = 'of rated load before failure · cracked at layer interface';
      verdict.innerHTML = `<span class="tag tag-red">Failed</span> material was upgraded · design was not`;
    } else if (perf < 100) {
      resultN.className = 'result-num';
      resultN.style.color = 'var(--amber)';
      resultN.innerHTML = `${perf}<span>%</span>`;
      resultL.textContent = 'of rated load before failure · marginal margin';
      verdict.innerHTML = `<span class="tag tag-amber">Marginal</span> halfway thinking · halfway result`;
    } else {
      resultN.className = 'result-num good';
      resultN.style.color = 'var(--green)';
      resultN.innerHTML = `${perf}<span>%</span>`;
      resultL.textContent = 'of rated load before failure · holds with safety margin';
      verdict.innerHTML = `<span class="tag tag-green">Passed</span> material became performance because design made it so`;
    }
  }

  function attrs(list) {
    return list.map(a => `<li><span>•</span><span>${a}</span></li>`).join('');
  }

  function drawPart(mode) {
    if (mode === 'bad') {
      partG.innerHTML = `
        <rect x="60" y="100" width="240" height="60" fill="none" stroke="#e5484d" stroke-width="1.5"/>
        <rect x="60" y="100" width="240" height="60" fill="url(#layers)"/>
        <line x1="100" y1="100" x2="100" y2="160" stroke="#e5484d" stroke-dasharray="2 3"/>
        <line x1="160" y1="100" x2="160" y2="160" stroke="#e5484d" stroke-dasharray="2 3"/>
        <line x1="220" y1="100" x2="220" y2="160" stroke="#e5484d" stroke-dasharray="2 3"/>
        <path d="M130 100 q4 30 -4 60" stroke="#e5484d" stroke-width="2.5" fill="none"/>
        <text x="135" y="92" font-family="ui-monospace, monospace" font-size="10" fill="#e5484d">CRACK</text>`;
    } else if (mode === 'mid') {
      partG.innerHTML = `
        <g transform="translate(180 130) rotate(-22)">
          <rect x="-120" y="-30" width="240" height="60" fill="none" stroke="#f7b500" stroke-width="1.5"/>
          <rect x="-120" y="-30" width="240" height="60" fill="url(#layers)"/>
          <path d="M-120 -30 q10 8 0 16" stroke="#f7b500" stroke-width="1" fill="none"/>
        </g>`;
    } else {
      partG.innerHTML = `
        <g transform="translate(180 130)">
          <path d="M-130 30 L-110 -30 L110 -30 L130 30 Z" fill="none" stroke="#3dd68c" stroke-width="1.5"/>
          <path d="M-130 30 L-110 -30 L110 -30 L130 30 Z" fill="url(#layers)"/>
          <line x1="-60" y1="-30" x2="-60" y2="30" stroke="#3dd68c" stroke-width="0.8" stroke-dasharray="2 3"/>
          <line x1="60"  y1="-30" x2="60"  y2="30" stroke="#3dd68c" stroke-width="0.8" stroke-dasharray="2 3"/>
          <line x1="0"   y1="-30" x2="0"   y2="30" stroke="#3a8dff" stroke-width="1.5"/>
        </g>`;
    }
  }

  slider.addEventListener('input', render);
  render();
})();

// ============================================================
// MODULE 3 — Selection matrix + anisotropy
// ============================================================
(function module3() {
  const inputs = {
    temp: document.getElementById('r-temp'),
    uts:  document.getElementById('r-uts'),
    tol:  document.getElementById('r-tol'),
    sur:  document.getElementById('r-sur'),
    vol:  document.getElementById('r-vol'),
    qual: document.getElementById('r-qual')
  };
  if (!inputs.temp) return;

  const outs = {
    temp: document.getElementById('r-temp-out'),
    uts:  document.getElementById('r-uts-out'),
    tol:  document.getElementById('r-tol-out'),
    sur:  document.getElementById('r-sur-out'),
    vol:  document.getElementById('r-vol-out'),
    qual: document.getElementById('r-qual-out')
  };

  // Process capability table — each cell is a function (req) -> 0..1 score
  // 1.0 = great fit, 0.5 = marginal, 0 = bad fit
  const procs = [
    {name:'FDM',     temp:120, uts:55,  tol:0.20, sur:1.0, vol:1000,  qual:1.5},
    {name:'SLA',     temp:80,  uts:65,  tol:0.05, sur:3.0, vol:500,   qual:1.0},
    {name:'SLS',     temp:160, uts:48,  tol:0.15, sur:2.0, vol:5000,  qual:2.0},
    {name:'MJF',     temp:170, uts:50,  tol:0.12, sur:2.5, vol:10000, qual:2.5},
    {name:'LPBF',    temp:600, uts:600, tol:0.08, sur:1.5, vol:1000,  qual:3.0},
    {name:'BinderJ', temp:500, uts:200, tol:0.15, sur:1.5, vol:5000,  qual:2.0},
    {name:'CNC',     temp:300, uts:500, tol:0.025,sur:3.0, vol:50000, qual:3.0},
    {name:'InjMold', temp:140, uts:60,  tol:0.10, sur:3.0, vol:100000,qual:3.0}
  ];
  const criteria = [
    {key:'temp', label:'Max service temp'},
    {key:'uts',  label:'Min UTS'},
    {key:'tol',  label:'Tolerance band'},
    {key:'sur',  label:'Surface finish'},
    {key:'vol',  label:'Annual volume'},
    {key:'qual', label:'Qualification fit'}
  ];

  function fmtTol(v){ return (v/100).toFixed(2) + ' mm'; }
  const surLbl  = ['Rough','Functional','Fine','Cosmetic'];
  const qualLbl = ['Prototype','Internal','Tier B','Tier A'];

  function updateOutputs() {
    outs.temp.textContent = inputs.temp.value + '°C';
    outs.uts.textContent  = inputs.uts.value + ' MPa';
    outs.tol.textContent  = '±' + fmtTol(+inputs.tol.value);
    outs.sur.textContent  = surLbl[+inputs.sur.value];
    outs.vol.textContent  = (+inputs.vol.value).toLocaleString() + ' units/yr';
    outs.qual.textContent = qualLbl[+inputs.qual.value];
  }

  function score(proc) {
    const req = {
      temp: +inputs.temp.value,
      uts:  +inputs.uts.value,
      tol:  +inputs.tol.value / 100,
      sur:  +inputs.sur.value,
      vol:  +inputs.vol.value,
      qual: +inputs.qual.value
    };
    const s = {};
    // temp: ratio of process / req
    s.temp = clamp((proc.temp - req.temp + 60) / 120);
    // uts:  ratio
    s.uts  = clamp((proc.uts - req.uts + 30) / 60);
    // tolerance: smaller proc tol is better
    s.tol  = clamp((req.tol - proc.tol + 0.1) / 0.2);
    // surface: proc sur >= req sur
    s.sur  = clamp((proc.sur - req.sur + 1.5) / 2);
    // volume: proc upper limit vs req volume — logarithmic
    s.vol  = clamp((Math.log10(proc.vol) - Math.log10(req.vol) + 1) / 2);
    // qual:  qual capability >= req
    s.qual = clamp((proc.qual - req.qual + 1.5) / 2);
    return s;
  }
  function clamp(x){ return Math.max(0, Math.min(1, x)); }
  function colorClass(v){
    if (v >= 0.7) return 'green';
    if (v >= 0.4) return 'amber';
    return 'red';
  }

  function render() {
    updateOutputs();
    const body = document.getElementById('matrix-body');
    let html = '';
    const totals = procs.map(p => {
      const s = score(p);
      const sum = Object.values(s).reduce((a,b)=>a+b,0) / 6;
      return { name: p.name, sum, s };
    });
    const best = totals.reduce((b,x) => x.sum > b.sum ? x : b, totals[0]);

    criteria.forEach(c => {
      html += `<tr><th>${c.label}</th>`;
      totals.forEach(t => {
        const v = t.s[c.key];
        html += `<td class="${colorClass(v)}">${(v*100).toFixed(0)}</td>`;
      });
      html += `</tr>`;
    });
    html += `<tr><th>Overall</th>`;
    totals.forEach(t => {
      const cls = colorClass(t.sum) + (t === best ? ' best' : '');
      html += `<td class="${cls}">${(t.sum*100).toFixed(0)}</td>`;
    });
    html += `</tr>`;
    body.innerHTML = html;

    const pairs = {
      'FDM':    {pair:'FDM · PA-CF',    why:'Cost-effective for low-volume functional parts where lead time wins.'},
      'SLA':    {pair:'SLA · Tough 2000', why:'Sharp features, fine surface — best when accuracy and finish matter.'},
      'SLS':    {pair:'SLS · PA11',     why:'Tough, support-free, ideal for end-use plastics at production tolerance.'},
      'MJF':    {pair:'MJF · PA12-GB',  why:'Best balance of strength, accuracy, and small-batch economics for your spec.'},
      'LPBF':   {pair:'Metal LPBF · 316L', why:'High UTS and temperature — justified when the geometry needs metal.'},
      'BinderJ':{pair:'Binder Jet · 17-4PH', why:'Metal at higher volume — when LPBF is too slow for the run size.'},
      'CNC':    {pair:'CNC machining',  why:'Strongest spec, but reconsider when geometry is print-only or volume is low.'},
      'InjMold':{pair:'Injection molding', why:'Best per-unit cost at scale — but tooling kills the lead-time story.'}
    };
    document.getElementById('rec-title').textContent = pairs[best.name].pair;
    document.getElementById('rec-rationale').textContent = pairs[best.name].why;
  }

  Object.values(inputs).forEach(i => i.addEventListener('input', render));
  render();

  // anisotropy explorer
  const angIn  = document.getElementById('aniso-ang');
  const angOut = document.getElementById('aniso-ang-out');
  const coupon = document.getElementById('aniso-coupon');
  const utsOut = document.getElementById('aniso-uts');
  const riskOut= document.getElementById('aniso-risk');

  function renderAniso() {
    const a = +angIn.value;
    angOut.textContent = a + '°';
    coupon.setAttribute('transform', `rotate(${a} 100 80)`);
    const uts = Math.round(100 - (a/90) * 38);
    utsOut.textContent = uts + '%';
    if (a < 30)      { riskOut.textContent = 'Low';      riskOut.style.color = 'var(--green)'; }
    else if (a < 60) { riskOut.textContent = 'Moderate'; riskOut.style.color = 'var(--amber)'; }
    else             { riskOut.textContent = 'High';     riskOut.style.color = 'var(--red)';   }
  }
  angIn.addEventListener('input', renderAniso);
  renderAniso();
})();

// ============================================================
// MODULE 4 — Orientation studio
// ============================================================
(function module4() {
  const ang  = document.getElementById('o-ang');
  const fil  = document.getElementById('o-fil');
  const wall = document.getElementById('o-wall');
  if (!ang) return;

  const angOut  = document.getElementById('o-ang-out');
  const filOut  = document.getElementById('o-fil-out');
  const wallOut = document.getElementById('o-wall-out');

  const part      = document.getElementById('chamber-part');
  const supports  = document.getElementById('chamber-supports');
  const layers    = document.getElementById('chamber-layers');

  const wallLabels = ['1 perim · 15% infill', '2 perim · 22% gyroid', '3 perim · 30% gyroid', '4 perim · 40% gyroid', '5 perim · solid'];

  function render() {
    const a   = +ang.value;            // 0..90
    const fmm = (+fil.value / 10).toFixed(1);
    const w   = +wall.value;
    angOut.textContent  = a + '°';
    filOut.textContent  = fmm + ' mm';
    wallOut.textContent = wallLabels[w];

    part.setAttribute('transform', `translate(180 160) rotate(${a})`);

    // anisotropy risk — peaks when load (vertical) is perpendicular to layers
    // layers are horizontal in chamber; rotated part means load aligns with layers when angle approaches 90°
    const aniRisk = Math.abs(Math.cos((a * Math.PI) / 180));   // 1 at 0°, 0 at 90°
    setReadout('ro-aniso','ro-aniso-bar', aniRisk, riskLbl(aniRisk));

    // support volume: rises with rotation away from flat
    const sup = 0.6 + Math.sin((a * Math.PI) / 180) * 7.2 + (w > 2 ? 0.5 : 0);
    document.getElementById('ro-sup').textContent = sup.toFixed(1) + ' cm³';
    setBar('ro-sup-bar', clamp(sup / 8));

    // critical-face surface — degrades when layer steps hit the load face
    const surScore = 1 - Math.abs(Math.sin((a * Math.PI) / 180) * 0.8);
    setReadout('ro-sur','ro-sur-bar', surScore, surScore > 0.7 ? 'Excellent' : surScore > 0.4 ? 'Acceptable' : 'Poor', true);

    // build time: rises with wall + rotation
    const t = 4.2 + sup * 0.4 + w * 0.6;
    document.getElementById('ro-time').textContent = t.toFixed(1) + ' h';
    setBar('ro-time-bar', clamp(t / 12));

    // draw supports as red ticks when sup > 1
    let supSvg = '';
    if (sup > 1.5) {
      for (let i = 0; i < Math.min(20, sup * 2); i++) {
        const x = 110 + i * 8;
        supSvg += `<line x1="${x}" y1="240" x2="${x}" y2="${240 - 6 - sup * 1.5}" stroke="#e5484d" stroke-width="0.7"/>`;
      }
    }
    supports.innerHTML = supSvg;

    // layer lines in the chamber (subtle horizontal stripes)
    let layerSvg = '';
    const lh = 4;
    for (let y = 60; y < 240; y += lh) {
      layerSvg += `<line x1="40" y1="${y}" x2="320" y2="${y}" stroke="#3a8dff" stroke-width="0.15" stroke-opacity="0.35"/>`;
    }
    layers.innerHTML = layerSvg;

    // checklist
    const checks = [
      { ok: aniRisk < 0.6,        txt: 'Load aligned with layer plane' },
      { ok: +fil.value >= 30,      txt: `Critical fillets ≥ 3 mm (current ${fmm} mm)` },
      { ok: sup < 4,              txt: 'Support volume kept low' },
      { ok: surScore > 0.6,       txt: 'Critical face surface protected' },
      { ok: w >= 2 && w <= 3,     txt: 'Wall strategy balanced (not over-built)' },
      { ok: t < 9,                txt: 'Build time within shift budget' }
    ];
    const passed = checks.filter(c => c.ok).length;
    document.getElementById('checks').innerHTML = checks.map(c => `<li class="${c.ok ? 'ok' : 'bad'}">${c.txt}</li>`).join('');

    // stress concentration sub-widget (Module 4 right rail)
    const filMm = +fil.value / 10;
    const kt = (3.4 / (1 + filMm * 0.7)).toFixed(2);
    document.getElementById('sc-kt').textContent = kt;
    const life = Math.round(1500 * Math.pow(filMm, 2.1));
    document.getElementById('sc-life').textContent = life.toLocaleString() + ' cycles';
    // fillet path
    const r = Math.min(20, filMm * 6);
    document.getElementById('sc-fillet').setAttribute('d', `M${30 + r} 60 Q30 60 30 ${60 + r}`);
    // hot spot intensity inversely correlated
    const hot = document.getElementById('sc-hot');
    hot.setAttribute('r', Math.max(3, 12 - filMm * 1.6));
    hot.setAttribute('fill', `rgba(229,72,77,${0.7 - filMm * 0.08})`);
  }
  function clamp(x){ return Math.max(0, Math.min(1, x)); }
  function setReadout(valId, barId, val01, label, invert) {
    const v = invert ? val01 : (1 - val01);
    document.getElementById(valId).textContent = label;
    setBar(barId, v, invert);
  }
  function setBar(id, v01) {
    const el = document.getElementById(id);
    el.style.width = (v01 * 100).toFixed(0) + '%';
    el.classList.remove('warn','bad');
    if (v01 < 0.35) el.classList.add('bad');
    else if (v01 < 0.65) el.classList.add('warn');
  }
  function riskLbl(v){ if (v < 0.35) return 'Low'; if (v < 0.65) return 'Moderate'; return 'High'; }

  [ang, fil, wall].forEach(i => i.addEventListener('input', render));
  render();
})();

// ============================================================
// MODULE 5 — Factory opportunity map
// ============================================================
(function module5() {
  const tray = document.getElementById('pin-tray');
  if (!tray) return;

  const pins = [
    { id: 'wf',  name: 'Weld fixture B7',       zone: 'fixture', val: 184000 },
    { id: 'eg',  name: 'EOAT gripper',          zone: 'eoat',    val: 96000  },
    { id: 'cm',  name: 'Coolant manifold',      zone: 'mro',     val: 240000 },
    { id: 'sj',  name: 'Sensor jig',            zone: 'jig',     val: 58000  },
    { id: 'eb',  name: 'Ergo back-support',     zone: 'ergo',    val: 22000  },
    { id: 'br',  name: 'Bracket pre-tooling',   zone: 'bridge',  val: 112000 },
    { id: 'ms',  name: 'Mold-shop spare',       zone: 'mro',     val: 71000  },
    { id: 'ag',  name: 'Assembly guide',        zone: 'jig',     val: 34000  }
  ];
  const placed = {};   // id -> zoneKey

  function renderTray() {
    tray.innerHTML = '';
    pins.forEach(p => { if (!placed[p.id]) tray.appendChild(makePin(p)); });
    updateSummary();
  }
  function makePin(p) {
    const el = document.createElement('div');
    el.className = 'pin';
    el.draggable = true;
    el.dataset.id = p.id;
    el.innerHTML = `<span class="pn">${p.name}</span><span class="pv">$${(p.val/1000).toFixed(0)}k/yr</span>`;
    el.addEventListener('dragstart', e => {
      el.classList.add('dragging');
      e.dataTransfer.setData('text/plain', p.id);
      e.dataTransfer.effectAllowed = 'move';
    });
    el.addEventListener('dragend', () => el.classList.remove('dragging'));
    return el;
  }

  document.querySelectorAll('#floor .zone').forEach(z => {
    z.addEventListener('dragover', e => { e.preventDefault(); z.classList.add('over'); });
    z.addEventListener('dragleave', () => z.classList.remove('over'));
    z.addEventListener('drop', e => {
      e.preventDefault();
      z.classList.remove('over');
      const id = e.dataTransfer.getData('text/plain');
      placed[id] = z.dataset.zone;
      renderAll();
    });
  });
  tray.addEventListener('dragover', e => e.preventDefault());
  tray.addEventListener('drop', e => {
    const id = e.dataTransfer.getData('text/plain');
    delete placed[id];
    renderAll();
  });

  function renderAll() {
    document.querySelectorAll('#floor .zone').forEach(z => {
      const key = z.dataset.zone;
      const here = pins.filter(p => placed[p.id] === key);
      const sum = here.reduce((a, p) => a + p.val, 0);
      z.querySelector('.z-val').textContent = sum ? '$' + (sum/1000).toFixed(0) + 'k' : '$0';
      z.classList.toggle('has', sum > 0);
      const existing = z.querySelector('.placed');
      if (existing) existing.remove();
      if (here.length) {
        const div = document.createElement('div');
        div.className = 'placed';
        div.innerHTML = here.map(h => `<span class="pchip">${h.name}</span>`).join('');
        z.appendChild(div);
      }
    });
    renderTray();
  }

  function updateSummary() {
    const placedIds = Object.keys(placed);
    const total = placedIds.reduce((a, id) => a + pins.find(p => p.id === id).val, 0);
    document.getElementById('fp-count').textContent = `${placedIds.length} / ${pins.length}`;
    document.getElementById('fp-total').textContent = '$' + (total/1000).toFixed(0) + 'k';
    if (placedIds.length === 0) {
      document.getElementById('fp-pick').textContent = '—';
    } else {
      const best = placedIds
        .map(id => pins.find(p => p.id === id))
        .sort((a,b) => b.val - a.val)[0];
      document.getElementById('fp-pick').textContent = best.name;
    }
  }

  renderTray();
})();

// ============================================================
// MODULE 6 — Validation plan builder
// ============================================================
(function module6() {
  const list = document.getElementById('vmode-list');
  if (!list) return;

  const modes = [
    { id: 'm1', name: 'Layer delamination',  sev: 5, inspect: 'CT scan',         test: 'Tensile fatigue', accept: 'Cycles ≥ 100k @ 80% UTS' },
    { id: 'm2', name: 'Porosity',            sev: 4, inspect: 'CT scan',         test: 'Density check',   accept: 'Density ≥ 99.6%' },
    { id: 'm3', name: 'Residual warpage',    sev: 4, inspect: 'CMM',             test: 'Dimensional run', accept: 'GD&T ≤ 0.15 mm' },
    { id: 'm4', name: 'Internal leak',       sev: 5, inspect: 'Dye penetrant',   test: 'Pressure decay',  accept: '≤ 0.05 mbar/min' },
    { id: 'm5', name: 'Surface roughness',   sev: 2, inspect: 'Profilometer',    test: 'Ra measurement',  accept: 'Ra ≤ 6.3 μm' },
    { id: 'm6', name: 'Thermal cycling',     sev: 4, inspect: 'Visual',          test: 'Thermal cycle',   accept: '500 cycles · no crack' }
  ];
  const slots = {}; // id -> { inspect:bool, test:bool, accept:bool }

  function render() {
    list.innerHTML = '';
    modes.forEach(m => {
      const node = document.createElement('div');
      const placedAll = slots[m.id] && slots[m.id].inspect && slots[m.id].test && slots[m.id].accept;
      node.className = 'vmode' + (placedAll ? ' placed-all' : '');
      node.draggable = true;
      node.dataset.id = m.id;
      node.innerHTML = `
        <span class="vt">${m.name}</span>
        <span class="vs"><span class="vsev">Sev ${m.sev}</span><span>${chipState(m.id)}</span></span>`;
      node.addEventListener('dragstart', e => {
        node.classList.add('dragging');
        e.dataTransfer.setData('text/plain', m.id);
        e.dataTransfer.effectAllowed = 'copy';
      });
      node.addEventListener('dragend', () => node.classList.remove('dragging'));
      list.appendChild(node);
    });
    renderCols();
    renderCov();
  }

  function chipState(id) {
    const s = slots[id] || {};
    const arr = [];
    if (s.inspect) arr.push('✓Insp');
    if (s.test)    arr.push('✓Test');
    if (s.accept)  arr.push('✓Acc');
    return arr.join(' · ') || 'unplaced';
  }

  function renderCols() {
    document.querySelectorAll('.vcol').forEach(col => {
      const key = col.dataset.col;
      const body = col.querySelector('.vcol-body');
      body.innerHTML = '';
      modes.forEach(m => {
        if (slots[m.id] && slots[m.id][key]) {
          const txt = key === 'inspect' ? m.inspect : key === 'test' ? m.test : m.accept;
          const chip = document.createElement('div');
          chip.className = 'vchip';
          chip.draggable = true;
          chip.dataset.id = m.id;
          chip.dataset.col = key;
          chip.innerHTML = `<span class="vct">${m.name}</span><span class="vcm">${txt}</span>`;
          chip.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', JSON.stringify({id: m.id, from: key}));
            e.dataTransfer.effectAllowed = 'move';
          });
          body.appendChild(chip);
        }
      });
    });
  }

  function renderCov() {
    // coverage: each Sev≥4 mode contributes 3 slots; Sev<4 contributes 1
    let need = 0, got = 0;
    const missing = [];
    modes.forEach(m => {
      const slotsForMode = m.sev >= 4 ? ['inspect','test','accept'] : ['inspect'];
      slotsForMode.forEach(s => {
        need++;
        if (slots[m.id] && slots[m.id][s]) got++;
        else missing.push(`${m.name} → ${s}`);
      });
    });
    const pct = Math.round((got / need) * 100);
    document.getElementById('cov-fill').style.width = pct + '%';
    document.getElementById('cov-num').textContent = pct + '%';
    document.getElementById('missing-list').innerHTML = missing.length
      ? missing.slice(0, 6).map(x => `<span class="missing-list-item">${x}</span>`).join('')
      : '<span style="color:var(--green)">All coverage requirements met.</span>';
  }

  document.querySelectorAll('.vcol .vcol-body').forEach(body => {
    body.addEventListener('dragover', e => { e.preventDefault(); body.classList.add('over'); });
    body.addEventListener('dragleave', () => body.classList.remove('over'));
    body.addEventListener('drop', e => {
      e.preventDefault();
      body.classList.remove('over');
      const data = e.dataTransfer.getData('text/plain');
      let id = data, fromCol = null;
      try { const parsed = JSON.parse(data); id = parsed.id; fromCol = parsed.from; } catch (_) {}
      const col = body.parentElement.dataset.col;
      if (!slots[id]) slots[id] = {};
      slots[id][col] = true;
      if (fromCol && fromCol !== col) delete slots[id][fromCol];
      render();
    });
  });
  // drag back to deck removes
  document.getElementById('vmode-deck').addEventListener('dragover', e => e.preventDefault());
  document.getElementById('vmode-deck').addEventListener('drop', e => {
    const data = e.dataTransfer.getData('text/plain');
    try {
      const parsed = JSON.parse(data);
      if (slots[parsed.id]) delete slots[parsed.id][parsed.from];
      render();
    } catch (_) { /* deck card dropped on deck — noop */ }
  });

  render();
})();

// ============================================================
// MODULE 7 — Business case calculator
// ============================================================
(function module7() {
  const ids = ['bc-cur-cost','bc-cur-lt','bc-vol','bc-am-cost','bc-am-lt','bc-dt-hrs','bc-dt-cost','bc-tool','bc-inv','bc-impl'];
  const inputs = ids.map(id => document.getElementById(id));
  if (!inputs[0]) return;

  function fmt(n) { return '$' + Math.round(n).toLocaleString(); }

  function calc() {
    const v = Object.fromEntries(inputs.map(i => [i.id, +i.value || 0]));
    const unitSavings = v['bc-cur-cost'] - v['bc-am-cost'];
    const annualCost  = unitSavings * v['bc-vol'];
    const downtime    = v['bc-dt-hrs'] * v['bc-dt-cost'];
    const tooling     = v['bc-tool'];
    const inventory   = v['bc-inv'];
    const total       = annualCost + downtime + tooling + inventory;
    const months      = total > 0 ? Math.max(1, Math.round((v['bc-impl'] / total) * 12)) : 0;

    document.getElementById('bc-total').textContent = fmt(total);
    document.getElementById('bc-roi').textContent   = months + ' months';

    // bars (normalized to total absolute)
    const items = [
      { lbl: 'Per-unit savings',  val: annualCost,   neg: false },
      { lbl: 'Downtime avoided',  val: downtime,     neg: false },
      { lbl: 'Tooling avoided',   val: tooling,      neg: false },
      { lbl: 'Inventory carry',   val: inventory,    neg: false },
      { lbl: 'Implementation',    val: -v['bc-impl'], neg: true }
    ];
    const max = Math.max(...items.map(x => Math.abs(x.val)), 1);
    const ul = document.getElementById('bc-bars');
    ul.innerHTML = items.map(x => {
      const pct = (Math.abs(x.val) / max) * 100;
      return `<li><span>${x.lbl}</span><span class="bcb${x.neg ? ' neg' : ''}" style="width:${pct}%"></span><b>${x.neg ? '–' : ''}${fmt(Math.abs(x.val))}</b></li>`;
    }).join('');

    document.getElementById('es-unit').textContent = fmt(unitSavings);
    document.getElementById('es-cost').textContent = fmt(annualCost);
    document.getElementById('es-dt').textContent   = fmt(downtime);
    document.getElementById('es-tool').textContent = fmt(tooling);
    document.getElementById('es-inv').textContent  = fmt(inventory);
  }

  inputs.forEach(i => i.addEventListener('input', calc));
  calc();
})();

// ===== keyboard ⌘K placeholder =====
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    const order = ['landing', 'dashboard', 'module', 'capstone', 'admin'];
    const cur = order.findIndex(n => document.getElementById('view-' + n).classList.contains('active'));
    showView(order[(cur + 1) % order.length]);
  }
});
