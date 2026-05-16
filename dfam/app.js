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

// ===== keyboard ⌘K placeholder =====
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    const order = ['landing', 'dashboard', 'module', 'capstone', 'admin'];
    const cur = order.findIndex(n => document.getElementById('view-' + n).classList.contains('active'));
    showView(order[(cur + 1) % order.length]);
  }
});
