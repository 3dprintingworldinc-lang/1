/* 3D Printing World — storefront logic
 * Pricing model (see BUSINESS_PLAN.md §3): machine time is the only thing
 * customers pay for. Materials are structurally $0 and shown as such.
 */

const ORDER_EMAIL = '3dprintingworldinc@gmail.com';

const PRICING = {
  ratePerHour: 8,
  minOrder: 15,
  quality: { draft: 0.85, standard: 1.0, fine: 1.35 },
  rush: 1.75,
  qtyBreaks: [
    { min: 20, factor: 0.8, label: '−20%' },
    { min: 5, factor: 0.9, label: '−10%' },
  ],
  shippingFlat: 6,
  freeShippingOver: 60,
};

/* ============ Catalog data ============ */

const CATALOG = [
  {
    name: 'XL Geometric Planter',
    price: 49,
    tag: 'prints in ~22 h',
    icon: '🪴',
    desc: 'A 30 cm faceted planter with drainage insert. Heavy, solid, and satisfying — the kind of piece other shops surcharge by the kilogram.',
  },
  {
    name: 'Giant Articulated Dragon (60 cm)',
    price: 59,
    tag: 'prints in ~14 h',
    icon: '🐉',
    desc: 'Fully articulated, prints assembled, flexes like a living thing. Pick any color when you order.',
  },
  {
    name: 'Cosplay Helmet — Fitted',
    price: 149,
    tag: 'prints in ~35 h',
    icon: '🪖',
    desc: 'Printed to your head measurements, sanded seams, ready for paint. Send a reference image of any design.',
  },
  {
    name: 'Modular Desk Organizer Set',
    price: 29,
    tag: 'prints in ~8 h',
    icon: '🗂️',
    desc: 'Six interlocking trays, pen silo, phone dock, and headphone hook. Reconfigure it as your desk evolves.',
  },
  {
    name: 'Board Game Insert Set',
    price: 44,
    tag: 'prints in ~12 h',
    icon: '🎲',
    desc: 'Custom-fit organizer trays for your game box — tell us the game, we ship the perfect insert.',
  },
  {
    name: 'Wall-Mount Tool Rack System',
    price: 34,
    tag: 'prints in ~10 h',
    icon: '🔧',
    desc: 'French-cleat modular rack for pliers, drivers, and drills. Add modules any time — the cleat spec never changes.',
  },
  {
    name: 'Lithophane Night Light',
    price: 39,
    tag: 'prints in ~6 h',
    icon: '💡',
    desc: 'Your photo, printed in translucent relief with an LED base. Invisible by day, glowing portrait by night.',
  },
  {
    name: 'Replacement Part Service',
    price: 25,
    priceLabel: 'from $25',
    tag: 'usually ~2 h + design',
    icon: '⚙️',
    desc: 'Broken bracket, knob, clip, or gear from any appliance. Photo + measurements in, working part out.',
  },
];

const DIGITAL = [
  {
    name: 'XL Geometric Planter — STL',
    price: 12,
    tag: 'instant email delivery',
    icon: '🪴',
    desc: 'The full planter kit: 3 sizes, drainage inserts, tested print profiles for 0.4/0.6 mm nozzles.',
  },
  {
    name: 'Modular Desk Organizer — STL',
    price: 9,
    tag: 'instant email delivery',
    icon: '🗂️',
    desc: 'All 9 modules plus the interlock spec so you can design your own additions.',
  },
  {
    name: 'French-Cleat Tool Rack — STL',
    price: 9,
    tag: 'instant email delivery',
    icon: '🔧',
    desc: '12 tool modules and the cleat template. The workshop system that grows forever.',
  },
  {
    name: 'Articulated Dragon — STL',
    price: 14,
    tag: 'instant email delivery',
    icon: '🐉',
    desc: 'Prints fully assembled, no supports. Includes 40/60/80 cm scale-tested variants.',
  },
  {
    name: 'Board Game Insert Toolkit — STL',
    price: 19,
    tag: 'instant email delivery',
    icon: '🎲',
    desc: 'Parametric tray system: set your box dimensions, generate perfect-fit inserts for any game.',
  },
  {
    name: 'Lithophane Lamp Base — STL',
    price: 7,
    tag: 'instant email delivery',
    icon: '💡',
    desc: 'The LED lamp base and frame. Pair with any lithophane generator for endless custom gifts.',
  },
];

/* ============ Helpers ============ */

const $ = (id) => document.getElementById(id);
const money = (n) => '$' + n.toFixed(2);

function mailtoLink(subject, body) {
  return (
    'mailto:' + ORDER_EMAIL +
    '?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(body)
  );
}

/* ============ Quote calculator ============ */

function computeQuote({ hours, quality, qty, rush }) {
  const qualityFactor = PRICING.quality[quality] ?? 1;
  const brk = PRICING.qtyBreaks.find((b) => qty >= b.min);
  const qtyFactor = brk ? brk.factor : 1;

  const machineBase = hours * PRICING.ratePerHour * qualityFactor * qty;
  const afterDiscount = machineBase * qtyFactor;
  const afterRush = rush ? afterDiscount * PRICING.rush : afterDiscount;

  const subtotal = Math.max(PRICING.minOrder, afterRush);
  const minApplied = afterRush < PRICING.minOrder;
  const shipping = subtotal >= PRICING.freeShippingOver ? 0 : PRICING.shippingFlat;

  return {
    machine: machineBase,
    discount: brk ? machineBase - afterDiscount : 0,
    discountLabel: brk ? brk.label : null,
    rushSurcharge: rush ? afterRush - afterDiscount : 0,
    subtotal,
    minApplied,
    shipping,
    total: subtotal + shipping,
  };
}

function readQuoteInputs() {
  return {
    hours: Math.min(200, Math.max(0.5, parseFloat($('qHours').value) || 0.5)),
    quality: $('qQuality').value,
    qty: Math.min(500, Math.max(1, parseInt($('qQty').value, 10) || 1)),
    rush: $('qRush').checked,
  };
}

function renderQuote() {
  const inputs = readQuoteInputs();
  const q = computeQuote(inputs);

  $('lineMachine').textContent = money(q.machine);
  $('lineMaterials').textContent = money(0);
  $('lineShipping').textContent = q.shipping === 0 ? 'FREE' : money(q.shipping);
  $('lineTotal').textContent = money(q.total);

  $('lineDiscountRow').classList.toggle('hidden', q.discount === 0);
  if (q.discount > 0) {
    $('lineDiscount').textContent = '−' + money(q.discount).slice(1) + ' (' + q.discountLabel + ')';
  }

  $('lineRushRow').classList.toggle('hidden', q.rushSurcharge === 0);
  if (q.rushSurcharge > 0) {
    $('lineRush').textContent = '+' + money(q.rushSurcharge).slice(1);
  }

  $('quoteNote').textContent = q.minApplied
    ? 'Our order minimum of ' + money(PRICING.minOrder) + ' applies — you can add more parts at no extra cost until you pass it.'
    : q.shipping === 0
      ? 'Free shipping applied (orders over ' + money(PRICING.freeShippingOver) + ').'
      : '';

  const qualityName = $('qQuality').selectedOptions[0].textContent.split('—')[0].trim();
  const body = [
    'Hi 3D Printing World,',
    '',
    'I would like to order the following print job:',
    '',
    '  Estimated print time: ' + inputs.hours + ' h',
    '  Quality: ' + qualityName,
    '  Quantity: ' + inputs.qty,
    '  Rush 48h: ' + (inputs.rush ? 'YES' : 'no'),
    '  Quoted total: ' + money(q.total) + ' (materials: $0.00)',
    '',
    'My model file is attached / described below:',
    '',
  ].join('\n');
  $('orderQuoteBtn').href = mailtoLink('Print order — quoted ' + money(q.total), body);
}

function initQuote() {
  const form = $('quoteForm');
  if (!form) return;

  form.addEventListener('input', renderQuote);
  form.addEventListener('submit', (e) => e.preventDefault());

  document.querySelectorAll('.chip[data-hours]').forEach((chip) => {
    chip.addEventListener('click', () => {
      $('qHours').value = chip.dataset.hours;
      document.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      renderQuote();
    });
  });

  renderQuote();
}

/* ============ Product grids ============ */

function productCard(p, kind) {
  const card = document.createElement('div');
  card.className = 'product';

  const subject = (kind === 'digital' ? 'STL purchase — ' : 'Order — ') + p.name;
  const body = [
    'Hi 3D Printing World,',
    '',
    (kind === 'digital'
      ? 'I would like to buy the digital file: ' + p.name + ' (' + money(p.price) + ').'
      : 'I would like to order: ' + p.name + ' (' + (p.priceLabel || money(p.price)) + ').'),
    '',
    kind === 'digital'
      ? 'Personal license / Commercial license ($49): '
      : 'Color / options / notes: ',
    '',
  ].join('\n');

  card.innerHTML =
    '<div class="product-art" aria-hidden="true">' + p.icon + '</div>' +
    '<div class="product-body">' +
    '<h3></h3><p></p>' +
    '<div class="product-meta"><span class="product-price"></span><span class="product-tag"></span></div>' +
    '<a class="btn btn-primary"></a>' +
    '</div>';

  card.querySelector('h3').textContent = p.name;
  card.querySelector('.product-body p').textContent = p.desc;
  card.querySelector('.product-price').textContent = p.priceLabel || money(p.price).replace('.00', '');
  card.querySelector('.product-tag').textContent = p.tag;

  const btn = card.querySelector('a.btn');
  btn.textContent = kind === 'digital' ? 'Buy file' : 'Order';
  btn.href = mailtoLink(subject, body);

  return card;
}

function initGrids() {
  const catalogGrid = $('catalogGrid');
  const digitalGrid = $('digitalGrid');
  if (catalogGrid) CATALOG.forEach((p) => catalogGrid.appendChild(productCard(p, 'physical')));
  if (digitalGrid) DIGITAL.forEach((p) => digitalGrid.appendChild(productCard(p, 'digital')));
}

/* ============ Stale service-worker cleanup ============
 * An earlier app registered a cache-first service worker at this root scope.
 * Unregister it (but leave tools/ scopes alone) so returning visitors always
 * get the current storefront instead of a stale cached page. */
function cleanupStaleServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((reg) => {
      if (!reg.scope.includes('/tools/')) reg.unregister();
    });
  }).catch(() => {});
  if (window.caches && caches.keys) {
    caches.keys().then((keys) => {
      keys.filter((k) => k === 'work-hours-v1').forEach((k) => caches.delete(k));
    }).catch(() => {});
  }
}

/* ============ Boot ============ */

initQuote();
initGrids();
cleanupStaleServiceWorker();
