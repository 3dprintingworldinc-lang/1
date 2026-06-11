(function () {
  'use strict';

  const STORAGE_KEY = 'rbcExpenses.v1';

  // --- Categories with colors and keyword matchers ---
  const CATEGORIES = [
    { id: 'groceries',    label: 'Groceries',       color: '#34c759', keywords: ['loblaws','sobeys','metro','no frills','food basics','freshco','walmart','costco','superstore','wholefood','grocery','iga','save on food','safeway'] },
    { id: 'dining',       label: 'Dining & Bars',   color: '#ff9500', keywords: ['tim hortons','starbucks','mcdonalds','subway','pizza','restaurant','cafe','coffee','donut','burger','sushi','taco','popeyes','kfc','wendy','dairy queen','a&w','harvey','swiss chalet','boston pizza','moxie','earls','cactus','the keg','bar ','pub ','grill','diner','eatery','kitchen','bistro','brasserie'] },
    { id: 'transport',    label: 'Transport',        color: '#007aff', keywords: ['uber','lyft','taxi','ttc','presto','oc transpo','translink','via rail','go transit','parking','fuel','gas station','shell','petro','esso','husky','circle k','canadian tire gas','fas gas','esso','couche-tard'] },
    { id: 'shopping',     label: 'Shopping',         color: '#af52de', keywords: ['amazon','ebay','etsy','the bay','hudson\'s bay','winners','homesense','marshalls','simons','zara','h&m','gap','old navy','forever 21','roots','uniqlo','sport chek','rei','best buy','staples','ikea','home depot','canadian tire','rona','lowes','dollar'] },
    { id: 'health',       label: 'Health & Pharmacy',color: '#ff2d55', keywords: ['shoppers','pharma','pharmacy','drug mart','rexall','medical','clinic','hospital','dentist','optome','vision','health','physio','massage','chiro'] },
    { id: 'entertainment',label: 'Entertainment',    color: '#ff6b35', keywords: ['netflix','spotify','apple','google play','steam','playstation','xbox','cinema','theatre','museum','concert','ticket','event','amc','cineplex','landmark','disney','youtube premium','prime video','crave','tidal','prime','hbo'] },
    { id: 'utilities',    label: 'Utilities & Bills',color: '#5856d6', keywords: ['hydro','ontario hydro','enbridge','bell','rogers','telus','fido','koodo','chatr','virgin','wind','freedom','shaw','videotron','cogeco','hydro one','toronto hydro','natural gas','electric','internet','phone','wireless'] },
    { id: 'housing',      label: 'Housing & Rent',   color: '#30b0c7', keywords: ['rent','mortgage','condo','property','landlord','lease'] },
    { id: 'travel',       label: 'Travel',           color: '#ff3b30', keywords: ['airbnb','hotel','inn','resort','expedia','booking','flight','air canada','westjet','porter','trivago','kayak','hertz','enterprise','budget rent','avis','marriott','hilton','hyatt','fairmont','sheraton'] },
    { id: 'education',    label: 'Education',        color: '#6c757d', keywords: ['tuition','university','college','school','udemy','coursera','book','textbook','education','library'] },
    { id: 'insurance',    label: 'Insurance',        color: '#8e8e93', keywords: ['insurance','assurance','intact','aviva','td insurance','rbc insurance','belairdirect','cooperators','manulife','sun life','desjardins insurance'] },
    { id: 'savings',      label: 'Savings & Invest', color: '#00c7be', keywords: ['transfer','e-transfer','investment','questrade','wealthsimple','rbc direct','td direct','cibc investor','bmo investor','rsp','rrsp','tfsa','fhsa'] },
    { id: 'income',       label: 'Income',           color: '#34c759', keywords: ['payroll','salary','deposit','direct deposit','e-transfer received','interest','dividend','refund','rebate','tax refund'] },
    { id: 'other',        label: 'Other',            color: '#aeaeb2', keywords: [] },
  ];

  const CAT_MAP = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

  function autoCategory(desc) {
    const d = desc.toLowerCase();
    for (const cat of CATEGORIES) {
      if (cat.id === 'other') continue;
      for (const kw of cat.keywords) {
        if (d.includes(kw)) return cat.id;
      }
    }
    return 'other';
  }

  // --- Storage ---
  let transactions = load();

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }

  // --- DOM helpers ---
  const $ = id => document.getElementById(id);
  const fmtMoney = n => '$' + Math.abs(Number(n) || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const fmtDate = iso => {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // --- Period filtering ---
  function periodRange(period) {
    const now = new Date();
    const y = now.getFullYear(), mo = now.getMonth();
    if (period === 'month') return [new Date(y, mo, 1).toISOString().slice(0,10), new Date(y, mo+1, 0).toISOString().slice(0,10)];
    if (period === 'last_month') return [new Date(y, mo-1, 1).toISOString().slice(0,10), new Date(y, mo, 0).toISOString().slice(0,10)];
    if (period === '3months') return [new Date(y, mo-2, 1).toISOString().slice(0,10), new Date(y, mo+1, 0).toISOString().slice(0,10)];
    if (period === 'year') return [new Date(y, 0, 1).toISOString().slice(0,10), new Date(y, 11, 31).toISOString().slice(0,10)];
    return [null, null];
  }

  function filterByPeriod(txs, period) {
    const [from, to] = periodRange(period);
    if (!from) return txs;
    return txs.filter(t => t.date >= from && t.date <= to);
  }

  // --- Tab management ---
  let activeTab = 'dashboard';
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab;
      document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(s => s.classList.add('hidden'));
      $('tab-' + activeTab).classList.remove('hidden');
      if (activeTab === 'dashboard') renderDashboard();
      if (activeTab === 'transactions') renderTransactions();
    });
  });

  // --- Summary bar ---
  function updateSummary() {
    const now = new Date();
    const y = now.getFullYear(), mo = now.getMonth();
    const monthFrom = new Date(y, mo, 1).toISOString().slice(0,10);
    const monthTo   = new Date(y, mo+1, 0).toISOString().slice(0,10);
    const yearFrom  = new Date(y, 0, 1).toISOString().slice(0,10);

    const expenses = transactions.filter(t => t.type === 'expense');
    const monthSpend = expenses.filter(t => t.date >= monthFrom && t.date <= monthTo).reduce((s,t) => s + t.amount, 0);
    const yearSpend  = expenses.filter(t => t.date >= yearFrom).reduce((s,t) => s + t.amount, 0);

    $('sumMonth').textContent = fmtMoney(monthSpend);
    $('sumYear').textContent  = fmtMoney(yearSpend);
    $('sumCount').textContent = transactions.length.toLocaleString();
  }

  // --- Dashboard ---
  let categoryChart = null, trendChart = null;

  function renderDashboard() {
    const period = $('periodPicker').value;
    const txs = filterByPeriod(transactions, period).filter(t => t.type === 'expense');

    // Category totals
    const catTotals = {};
    txs.forEach(t => {
      catTotals[t.category] = (catTotals[t.category] || 0) + t.amount;
    });
    const sorted = Object.entries(catTotals).sort((a,b) => b[1] - a[1]);
    const total = sorted.reduce((s,[,v]) => s+v, 0);

    // Doughnut chart
    const ctx1 = $('categoryChart').getContext('2d');
    if (categoryChart) categoryChart.destroy();
    if (sorted.length === 0) {
      $('categoryList').innerHTML = '<p class="empty">No expense data for this period.</p>';
    } else {
      categoryChart = new Chart(ctx1, {
        type: 'doughnut',
        data: {
          labels: sorted.map(([id]) => CAT_MAP[id]?.label || id),
          datasets: [{
            data: sorted.map(([,v]) => v.toFixed(2)),
            backgroundColor: sorted.map(([id]) => CAT_MAP[id]?.color || '#aeaeb2'),
            borderWidth: 2,
            borderColor: getComputedStyle(document.documentElement).getPropertyValue('--card').trim() || '#fff',
          }]
        },
        options: {
          cutout: '60%',
          plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${fmtMoney(ctx.raw)}` } } },
        }
      });

      $('categoryList').innerHTML = sorted.map(([id, amt]) => {
        const cat = CAT_MAP[id] || CAT_MAP['other'];
        const pct = total > 0 ? (amt / total * 100).toFixed(0) : 0;
        return `<div class="cat-row">
          <div class="cat-dot" style="background:${cat.color}"></div>
          <div class="cat-name">${cat.label}</div>
          <div class="cat-bar-wrap"><div class="cat-bar" style="width:${pct}%;background:${cat.color}"></div></div>
          <div class="cat-amount">${fmtMoney(amt)}</div>
        </div>`;
      }).join('');
    }

    // Monthly trend — last 6 months
    const now = new Date();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ label: d.toLocaleDateString(undefined, { month: 'short' }), from: d.toISOString().slice(0,10), to: new Date(d.getFullYear(), d.getMonth()+1, 0).toISOString().slice(0,10) });
    }
    const monthlyTotals = months.map(m => transactions.filter(t => t.type === 'expense' && t.date >= m.from && t.date <= m.to).reduce((s,t) => s+t.amount, 0));

    const ctx2 = $('trendChart').getContext('2d');
    if (trendChart) trendChart.destroy();
    trendChart = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: months.map(m => m.label),
        datasets: [{
          data: monthlyTotals.map(v => v.toFixed(2)),
          backgroundColor: 'rgba(10,132,255,0.7)',
          borderRadius: 6,
        }]
      },
      options: {
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${fmtMoney(ctx.raw)}` } } },
        scales: {
          y: { ticks: { callback: v => '$' + v, font: { size: 11 } }, grid: { color: 'rgba(128,128,128,0.1)' } },
          x: { ticks: { font: { size: 12 } }, grid: { display: false } }
        }
      }
    });

    // Top merchants
    const merchants = {};
    txs.forEach(t => {
      const key = t.description.slice(0, 40);
      if (!merchants[key]) merchants[key] = { amount: 0, count: 0 };
      merchants[key].amount += t.amount;
      merchants[key].count++;
    });
    const topM = Object.entries(merchants).sort((a,b) => b[1].amount - a[1].amount).slice(0, 8);
    $('topMerchants').innerHTML = topM.length === 0
      ? '<p class="empty">No data.</p>'
      : topM.map(([name, {amount, count}]) =>
          `<div class="merchant-row"><span class="merchant-name">${escHtml(name)}</span><span class="merchant-count">${count}×</span><span class="merchant-amount">${fmtMoney(amount)}</span></div>`
        ).join('');
  }

  $('periodPicker').addEventListener('change', renderDashboard);

  // --- Transactions tab ---
  let txTypeFilter = 'expense';
  document.querySelectorAll('[data-txfilter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-txfilter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      txTypeFilter = btn.dataset.txfilter;
      renderTransactions();
    });
  });

  $('searchInput').addEventListener('input', renderTransactions);
  $('catFilter').addEventListener('change', renderTransactions);

  function populateCatFilter() {
    const sel = $('catFilter');
    const current = sel.value;
    sel.innerHTML = '<option value="">All categories</option>' +
      CATEGORIES.map(c => `<option value="${c.id}">${c.label}</option>`).join('');
    sel.value = current;
  }

  function renderTransactions() {
    const search = $('searchInput').value.toLowerCase();
    const catF   = $('catFilter').value;

    let txs = [...transactions].sort((a,b) => b.date.localeCompare(a.date) || b.id - a.id);
    if (txTypeFilter !== 'all') txs = txs.filter(t => t.type === txTypeFilter);
    if (search) txs = txs.filter(t => t.description.toLowerCase().includes(search) || (t.notes||'').toLowerCase().includes(search));
    if (catF) txs = txs.filter(t => t.category === catF);

    $('txCount').textContent = `${txs.length} transaction${txs.length !== 1 ? 's' : ''}`;
    const list = $('txList');
    list.innerHTML = '';
    $('txEmpty').classList.toggle('hidden', txs.length > 0);

    txs.forEach(tx => {
      const cat = CAT_MAP[tx.category] || CAT_MAP['other'];
      const li = document.createElement('li');
      li.className = 'entry';
      li.innerHTML = `
        <div class="entry-cat-dot" style="background:${cat.color}"></div>
        <div class="entry-main">
          <div class="entry-date">${fmtDate(tx.date)}</div>
          <div class="entry-desc">${escHtml(tx.description)}</div>
          <div class="entry-cat-label">${cat.label}${tx.notes ? ' · ' + escHtml(tx.notes) : ''}</div>
        </div>
        <div class="entry-right">
          <div class="entry-amount ${tx.type}">${tx.type === 'income' ? '+' : '-'}${fmtMoney(tx.amount)}</div>
        </div>
        <button class="entry-actions-btn" data-id="${tx.id}" title="Edit / Delete">⋯</button>
      `;
      list.appendChild(li);
    });

    list.querySelectorAll('.entry-actions-btn').forEach(btn => {
      btn.addEventListener('click', () => showTxMenu(btn.dataset.id));
    });
  }

  function showTxMenu(id) {
    const tx = transactions.find(t => t.id == id);
    if (!tx) return;
    const choice = prompt(`Transaction: ${tx.description}\n\nType:\n1 — Edit category\n2 — Edit transaction\n3 — Delete\n\nEnter number:`);
    if (choice === '1') openCatModal(id);
    else if (choice === '2') openEditForm(id);
    else if (choice === '3') deleteTx(id);
  }

  function deleteTx(id) {
    if (!confirm('Delete this transaction?')) return;
    transactions = transactions.filter(t => t.id != id);
    save();
    renderTransactions();
    updateSummary();
  }

  // --- Category modal ---
  function openCatModal(id) {
    const tx = transactions.find(t => t.id == id);
    if (!tx) return;
    const sel = $('catModalSelect');
    sel.innerHTML = CATEGORIES.map(c => `<option value="${c.id}"${c.id===tx.category?' selected':''}>${c.label}</option>`).join('');
    $('catModalDesc').textContent = tx.description;
    $('catModal').classList.remove('hidden');

    $('catModalSave').onclick = () => {
      tx.category = sel.value;
      save();
      $('catModal').classList.add('hidden');
      renderTransactions();
      if (activeTab === 'dashboard') renderDashboard();
    };
    $('catModalCancel').onclick = () => $('catModal').classList.add('hidden');
  }

  // --- Add/edit form ---
  function populateCatSelects() {
    const txCat = $('txCat');
    txCat.innerHTML = CATEGORIES.map(c => `<option value="${c.id}">${c.label}</option>`).join('');
  }

  $('addForm').addEventListener('submit', onAddSubmit);
  $('addCancelBtn').addEventListener('click', resetAddForm);

  function onAddSubmit(e) {
    e.preventDefault();
    const editId = $('editId').value;
    const tx = {
      id: editId || Date.now(),
      date: $('txDate').value,
      description: $('txDesc').value.trim(),
      amount: Math.abs(parseFloat($('txAmount').value) || 0),
      type: $('txType').value,
      category: $('txCat').value,
      notes: $('txNotes').value.trim(),
    };
    if (editId) {
      const idx = transactions.findIndex(t => t.id == editId);
      if (idx >= 0) transactions[idx] = tx;
    } else {
      transactions.unshift(tx);
    }
    save();
    resetAddForm();
    updateSummary();
    if (activeTab === 'dashboard') renderDashboard();
    if (activeTab === 'transactions') renderTransactions();
    // switch to transactions
    document.querySelector('[data-tab="transactions"]').click();
  }

  function resetAddForm() {
    $('addForm').reset();
    $('editId').value = '';
    $('txDate').valueAsDate = new Date();
    $('addFormTitle').textContent = 'Add transaction';
    $('addSaveBtn').textContent = 'Save';
    $('addCancelBtn').classList.add('hidden');
  }

  function openEditForm(id) {
    const tx = transactions.find(t => t.id == id);
    if (!tx) return;
    $('editId').value = tx.id;
    $('txDate').value = tx.date;
    $('txDesc').value = tx.description;
    $('txAmount').value = tx.amount;
    $('txType').value = tx.type;
    $('txCat').value = tx.category;
    $('txNotes').value = tx.notes || '';
    $('addFormTitle').textContent = 'Edit transaction';
    $('addSaveBtn').textContent = 'Update';
    $('addCancelBtn').classList.remove('hidden');
    document.querySelector('[data-tab="add"]').click();
  }

  // --- RBC CSV Import ---
  // RBC CSV format:
  // Account Type,Account Number,Transaction Date,Cheque Number,Description 1,Description 2,CAD$,USD$
  // Dates are MM/DD/YYYY, negative CAD$ = debit (expense), positive = credit (income)

  let pendingImport = [];

  const dropZone = $('dropZone');
  const csvFile  = $('csvFile');

  dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragging'); });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragging'));
  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('dragging');
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  });
  csvFile.addEventListener('change', () => {
    if (csvFile.files[0]) processFile(csvFile.files[0]);
    csvFile.value = '';
  });

  function processFile(file) {
    const reader = new FileReader();
    reader.onload = e => parseRBCCsv(e.target.result);
    reader.readAsText(file);
  }

  function parseRBCCsv(text) {
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    pendingImport = [];
    let skipped = 0, duplicates = 0;

    // Find header row (contains "Transaction Date")
    let dataStart = 0;
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      if (lines[i].toLowerCase().includes('transaction date') || lines[i].toLowerCase().includes('date')) {
        dataStart = i + 1;
        break;
      }
    }

    for (let i = dataStart; i < lines.length; i++) {
      const cols = parseCsvLine(lines[i]);
      if (cols.length < 5) { skipped++; continue; }

      // Detect format: with or without account columns
      // Format A (RBC standard): Account Type, Account Number, Transaction Date, Cheque#, Desc1, Desc2, CAD$, USD$
      // Format B (simplified): Date, Description, Amount
      let dateStr, desc1, desc2, cadRaw;

      if (cols.length >= 7 && /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(cols[2].trim())) {
        // Format A
        dateStr = cols[2].trim();
        desc1   = cols[4].trim();
        desc2   = cols[5].trim();
        cadRaw  = cols[6].replace(/[$,"]/g, '').trim();
      } else if (cols.length >= 3 && /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(cols[0].trim())) {
        // Format B
        dateStr = cols[0].trim();
        desc1   = cols[1].trim();
        desc2   = '';
        cadRaw  = cols[2].replace(/[$,"]/g, '').trim();
      } else {
        skipped++;
        continue;
      }

      const amount = parseFloat(cadRaw);
      if (isNaN(amount) || amount === 0) { skipped++; continue; }

      // Convert MM/DD/YYYY → YYYY-MM-DD
      const [mo, day, yr] = dateStr.split('/');
      const isoDate = `${yr}-${mo.padStart(2,'0')}-${day.padStart(2,'0')}`;

      const description = [desc1, desc2].filter(Boolean).join(' ').trim() || 'Unknown';
      const type = amount < 0 ? 'expense' : 'income';
      const absAmount = Math.abs(amount);
      const category = autoCategory(description);

      // Dedup: same date + description + amount already exists
      const isDup = transactions.some(t => t.date === isoDate && Math.abs(t.amount - absAmount) < 0.01 && t.description === description);
      if (isDup) { duplicates++; continue; }

      pendingImport.push({ id: Date.now() + i, date: isoDate, description, amount: absAmount, type, category, notes: '' });
    }

    if (pendingImport.length === 0 && skipped + duplicates === 0) {
      alert('Could not read transactions. Make sure you exported an RBC CSV file.');
      return;
    }

    const income  = pendingImport.filter(t => t.type === 'income').reduce((s,t) => s+t.amount, 0);
    const expense = pendingImport.filter(t => t.type === 'expense').reduce((s,t) => s+t.amount, 0);

    $('importSummary').innerHTML = `
      <strong>${pendingImport.length}</strong> transaction${pendingImport.length !== 1 ? 's' : ''} ready to import<br>
      ${expense > 0 ? `Expenses: <strong>${fmtMoney(expense)}</strong><br>` : ''}
      ${income  > 0 ? `Income: <strong>${fmtMoney(income)}</strong><br>` : ''}
      ${duplicates ? `<span class="muted">${duplicates} duplicate${duplicates !== 1 ? 's' : ''} skipped</span><br>` : ''}
      ${skipped ? `<span class="muted">${skipped} row${skipped !== 1 ? 's' : ''} could not be parsed</span>` : ''}
    `;
    $('importPreview').classList.remove('hidden');
  }

  $('confirmImportBtn').addEventListener('click', () => {
    transactions = [...pendingImport, ...transactions].sort((a,b) => b.date.localeCompare(a.date));
    save();
    pendingImport = [];
    $('importPreview').classList.add('hidden');
    updateSummary();
    alert('Import complete!');
    document.querySelector('[data-tab="transactions"]').click();
  });

  $('cancelImportBtn').addEventListener('click', () => {
    pendingImport = [];
    $('importPreview').classList.add('hidden');
  });

  // --- Export CSV ---
  $('exportBtn').addEventListener('click', () => {
    const rows = [['Date','Description','Amount','Type','Category','Notes']];
    transactions.forEach(t => rows.push([t.date, t.description, t.type === 'expense' ? -t.amount : t.amount, t.type, CAT_MAP[t.category]?.label || t.category, t.notes || '']));
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = `expenses-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  });

  $('clearAllBtn').addEventListener('click', () => {
    if (!confirm('Delete ALL transactions? This cannot be undone.')) return;
    transactions = [];
    save();
    updateSummary();
    renderTransactions();
    renderDashboard();
  });

  // --- CSV line parser (handles quoted fields) ---
  function parseCsvLine(line) {
    const result = [];
    let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQ && line[i+1] === '"') { cur += '"'; i++; }
        else inQ = !inQ;
      } else if (ch === ',' && !inQ) {
        result.push(cur); cur = '';
      } else {
        cur += ch;
      }
    }
    result.push(cur);
    return result;
  }

  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // --- Init ---
  function init() {
    $('txDate').valueAsDate = new Date();
    populateCatSelects();
    populateCatFilter();
    updateSummary();
    renderDashboard();
  }

  init();
})();
