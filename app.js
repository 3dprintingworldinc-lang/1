(function () {
  'use strict';

  const STORAGE_KEY = 'workHoursEntries.v1';
  const SETTINGS_KEY = 'workHoursSettings.v1';

  const $ = (id) => document.getElementById(id);

  const form = $('entryForm');
  const entriesList = $('entries');
  const emptyState = $('emptyState');
  const outstandingTotal = $('outstandingTotal');
  const paidTotal = $('paidTotal');
  const formTitle = $('formTitle');
  const saveBtn = $('saveBtn');
  const cancelBtn = $('cancelBtn');
  const invoiceModal = $('invoiceModal');
  const invoiceContent = $('invoiceContent');

  let entries = loadEntries();
  let settings = loadSettings();
  let activeFilter = 'all';

  init();

  function init() {
    $('date').valueAsDate = new Date();
    $('invoiceFrom').value = settings.invoiceFrom || '';
    $('invoiceTo').value = settings.invoiceTo || '';

    form.addEventListener('submit', onSubmit);
    cancelBtn.addEventListener('click', resetForm);

    document.querySelectorAll('.filter').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        renderEntries();
      });
    });

    ['startTime', 'endTime'].forEach((id) => {
      $(id).addEventListener('change', autoFillHours);
    });

    $('invoiceBtn').addEventListener('click', generateInvoice);
    $('markAllPaidBtn').addEventListener('click', markAllOutstandingPaid);
    $('closeInvoiceBtn').addEventListener('click', closeInvoice);
    $('shareInvoiceBtn').addEventListener('click', shareInvoice);

    ['invoiceFrom', 'invoiceTo'].forEach((id) => {
      $(id).addEventListener('input', (e) => {
        settings[id] = e.target.value;
        saveSettings();
      });
    });

    renderEntries();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  }

  function loadEntries() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveEntries() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }

  function loadSettings() {
    try {
      return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  function autoFillHours() {
    const start = $('startTime').value;
    const end = $('endTime').value;
    if (!start || !end) return;
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    let minutes = (eh * 60 + em) - (sh * 60 + sm);
    if (minutes < 0) minutes += 24 * 60;
    const hours = (minutes / 60).toFixed(2);
    if (!$('hours').value || $('hours').dataset.auto === '1') {
      $('hours').value = hours;
      $('hours').dataset.auto = '1';
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    const id = $('entryId').value || cryptoRandomId();
    const entry = {
      id,
      date: $('date').value,
      startTime: $('startTime').value || null,
      endTime: $('endTime').value || null,
      hours: parseFloat($('hours').value) || 0,
      rate: parseFloat($('rate').value) || 0,
      description: $('description').value.trim(),
      paid: $('paid').checked,
      createdAt: Date.now(),
    };

    const existingIndex = entries.findIndex((x) => x.id === id);
    if (existingIndex >= 0) {
      entry.createdAt = entries[existingIndex].createdAt;
      entries[existingIndex] = entry;
    } else {
      entries.unshift(entry);
    }

    saveEntries();
    resetForm();
    renderEntries();
  }

  function resetForm() {
    form.reset();
    $('entryId').value = '';
    $('date').valueAsDate = new Date();
    $('hours').dataset.auto = '';
    formTitle.textContent = 'Add work entry';
    saveBtn.textContent = 'Save entry';
    cancelBtn.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function editEntry(id) {
    const entry = entries.find((x) => x.id === id);
    if (!entry) return;
    $('entryId').value = entry.id;
    $('date').value = entry.date;
    $('startTime').value = entry.startTime || '';
    $('endTime').value = entry.endTime || '';
    $('hours').value = entry.hours;
    $('rate').value = entry.rate;
    $('description').value = entry.description || '';
    $('paid').checked = !!entry.paid;
    formTitle.textContent = 'Edit entry';
    saveBtn.textContent = 'Update entry';
    cancelBtn.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function deleteEntry(id) {
    if (!confirm('Delete this entry?')) return;
    entries = entries.filter((x) => x.id !== id);
    saveEntries();
    renderEntries();
  }

  function togglePaid(id) {
    const entry = entries.find((x) => x.id === id);
    if (!entry) return;
    entry.paid = !entry.paid;
    saveEntries();
    renderEntries();
  }

  function renderEntries() {
    const sorted = [...entries].sort((a, b) => (b.date || '').localeCompare(a.date || '') || b.createdAt - a.createdAt);

    const filtered = sorted.filter((e) => {
      if (activeFilter === 'paid') return e.paid;
      if (activeFilter === 'unpaid') return !e.paid;
      return true;
    });

    entriesList.innerHTML = '';
    filtered.forEach((entry) => entriesList.appendChild(renderEntry(entry)));

    emptyState.classList.toggle('hidden', filtered.length > 0);
    if (filtered.length === 0 && entries.length > 0) {
      emptyState.textContent = activeFilter === 'paid'
        ? 'No paid entries yet.'
        : 'No outstanding entries. Nice work.';
    } else {
      emptyState.textContent = 'No entries yet. Add your first one above.';
    }

    const unpaid = entries.filter((e) => !e.paid).reduce((sum, e) => sum + e.hours * e.rate, 0);
    const paid = entries.filter((e) => e.paid).reduce((sum, e) => sum + e.hours * e.rate, 0);
    outstandingTotal.textContent = formatMoney(unpaid);
    paidTotal.textContent = formatMoney(paid);
  }

  function renderEntry(entry) {
    const li = document.createElement('li');
    li.className = 'entry' + (entry.paid ? ' paid' : '');

    const main = document.createElement('div');
    main.className = 'entry-main';

    const dateEl = document.createElement('div');
    dateEl.className = 'entry-date';
    dateEl.textContent = formatDate(entry.date);
    main.appendChild(dateEl);

    const lineEl = document.createElement('div');
    lineEl.className = 'entry-line';
    const left = document.createElement('span');
    left.textContent = `${formatHours(entry.hours)} × ${formatMoney(entry.rate)}/hr`;
    const right = document.createElement('span');
    right.className = 'entry-amount';
    right.textContent = formatMoney(entry.hours * entry.rate);
    lineEl.appendChild(left);
    lineEl.appendChild(right);
    main.appendChild(lineEl);

    if (entry.startTime && entry.endTime) {
      const timeEl = document.createElement('div');
      timeEl.className = 'entry-time';
      timeEl.textContent = `${formatTime(entry.startTime)} – ${formatTime(entry.endTime)}`;
      main.appendChild(timeEl);
    }

    if (entry.description) {
      const descEl = document.createElement('div');
      descEl.className = 'entry-desc';
      descEl.textContent = entry.description;
      main.appendChild(descEl);
    }

    const badge = document.createElement('span');
    badge.className = 'badge ' + (entry.paid ? 'paid' : 'unpaid');
    badge.textContent = entry.paid ? 'Paid' : 'Unpaid';
    main.appendChild(badge);

    const actions = document.createElement('div');
    actions.className = 'entry-actions';

    const togglePaidBtn = document.createElement('button');
    togglePaidBtn.type = 'button';
    togglePaidBtn.className = 'toggle-paid';
    togglePaidBtn.textContent = entry.paid ? 'Unpay' : 'Mark paid';
    togglePaidBtn.addEventListener('click', () => togglePaid(entry.id));

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editEntry(entry.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteEntry(entry.id));

    actions.appendChild(togglePaidBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(main);
    li.appendChild(actions);
    return li;
  }

  function generateInvoice() {
    const outstanding = entries
      .filter((e) => !e.paid)
      .sort((a, b) => (a.date || '').localeCompare(b.date || ''));

    if (outstanding.length === 0) {
      alert('No outstanding work to invoice.');
      return;
    }

    const from = settings.invoiceFrom || 'Your name';
    const to = settings.invoiceTo || 'Client';
    const today = new Date();
    const invoiceNumber = `INV-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}-${String(today.getHours()).padStart(2, '0')}${String(today.getMinutes()).padStart(2, '0')}`;
    const total = outstanding.reduce((sum, e) => sum + e.hours * e.rate, 0);

    const rows = outstanding.map((e) => {
      const amount = e.hours * e.rate;
      const desc = [
        e.description || 'Work performed',
        e.startTime && e.endTime ? `(${formatTime(e.startTime)}–${formatTime(e.endTime)})` : '',
      ].filter(Boolean).join(' ');
      return `
        <tr>
          <td>${formatDate(e.date)}</td>
          <td>${escapeHtml(desc)}</td>
          <td class="num">${formatHours(e.hours)}</td>
          <td class="num">${formatMoney(e.rate)}</td>
          <td class="num">${formatMoney(amount)}</td>
        </tr>
      `;
    }).join('');

    invoiceContent.innerHTML = `
      <h1>Invoice</h1>
      <div class="muted small">${escapeHtml(invoiceNumber)} · ${formatDate(today.toISOString().slice(0, 10))}</div>
      <div class="meta">
        <div>
          <h3>From</h3>
          <div>${escapeHtml(from)}</div>
        </div>
        <div>
          <h3>Bill to</h3>
          <div>${escapeHtml(to)}</div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th class="num">Hours</th>
            <th class="num">Rate</th>
            <th class="num">Amount</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="totals">
        <table>
          <tr><td>Subtotal</td><td class="num">${formatMoney(total)}</td></tr>
          <tr class="total-row"><td>Total due</td><td class="num">${formatMoney(total)}</td></tr>
        </table>
      </div>
    `;

    invoiceModal.dataset.invoiceNumber = invoiceNumber;
    invoiceModal.dataset.total = String(total);
    invoiceModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeInvoice() {
    invoiceModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  async function shareInvoice() {
    const invoiceNumber = invoiceModal.dataset.invoiceNumber || 'invoice';
    const total = parseFloat(invoiceModal.dataset.total || '0');
    const text = `${invoiceNumber} — Total due: ${formatMoney(total)}\n\n${invoiceContent.innerText}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: invoiceNumber, text });
        return;
      } catch {
        // user cancelled or share failed; fall through to print
      }
    }
    window.print();
  }

  function markAllOutstandingPaid() {
    const count = entries.filter((e) => !e.paid).length;
    if (count === 0) {
      alert('Nothing outstanding to mark paid.');
      return;
    }
    if (!confirm(`Mark all ${count} outstanding entries as paid?`)) return;
    entries.forEach((e) => { e.paid = true; });
    saveEntries();
    renderEntries();
  }

  function formatMoney(n) {
    return '$' + (Number(n) || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function formatHours(n) {
    const v = Number(n) || 0;
    return (v % 1 === 0 ? v.toFixed(0) : v.toFixed(2)) + ' hr' + (v === 1 ? '' : 's');
  }

  function formatDate(iso) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  }

  function formatTime(t) {
    if (!t) return '';
    const [h, m] = t.split(':').map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function cryptoRandomId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }
})();
