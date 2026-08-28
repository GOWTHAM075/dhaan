/* =========================================================
   DHAAN Admin — admin.js
   Demo data layer: reads/writes orders in localStorage under
   'dhaan_orders'. Swap the functions marked BACKEND HOOK for
   real API calls once the server is ready.
   ========================================================= */

const ORDERS_KEY = 'dhaan_orders';
const AUTH_KEY = 'dhaan_admin_authed';
const DEMO_USER = 'admin';
const DEMO_PASS = 'dhaan2026';

const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];

/* ---------- BACKEND HOOK: fetch orders ----------
   Replace with: const res = await fetch('/api/orders'); return res.json();
------------------------------------------------- */
function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

/* ---------- BACKEND HOOK: persist an order update ----------
   Replace with: await fetch(`/api/orders/${id}`, { method:'PATCH', body: JSON.stringify(changes) })
---------------------------------------------------------- */
function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function statusSlug(status) {
  return status.toLowerCase().replace(/\s+/g, '-');
}

function formatDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return '';
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

/* ---------- Sample data for first-time preview ---------- */
function seedDemoOrders() {
  const now = Date.now();
  const demo = [
    {
      id: 'DHN284193', createdAt: new Date(now - 3600e3 * 2).toISOString(),
      status: 'Pending', paymentStatus: 'Paid', trackingId: '', courier: '',
      fullName: 'Priya Ramesh', mobile: '9876543210', email: 'priya@example.com',
      address: '12 Lake View Street', city: 'Chennai', state: 'Tamil Nadu', pincode: '600041',
      quantity: 2, unitPrice: 299, delivery: 40, total: 638
    },
    {
      id: 'DHN117582', createdAt: new Date(now - 3600e3 * 30).toISOString(),
      status: 'Shipped', paymentStatus: 'Paid', trackingId: 'SR482910334IN', courier: 'India Post Speed',
      fullName: 'Arun Kumar', mobile: '9123456780', email: '',
      address: '45, Race Course Road', city: 'Coimbatore', state: 'Tamil Nadu', pincode: '641018',
      quantity: 1, unitPrice: 299, delivery: 40, total: 339
    },
    {
      id: 'DHN990213', createdAt: new Date(now - 3600e3 * 96).toISOString(),
      status: 'Delivered', paymentStatus: 'Paid', trackingId: 'DTDC7739021AA', courier: 'DTDC',
      fullName: 'Meena Iyer', mobile: '9988776655', email: 'meena@example.com',
      address: '7B, Fairlands', city: 'Salem', state: 'Tamil Nadu', pincode: '636016',
      quantity: 3, unitPrice: 299, delivery: 40, total: 937
    }
  ];
  saveOrders(demo);
  return demo;
}

/* ================= LOGIN ================= */
const loginScreen = document.getElementById('loginScreen');
const adminShell = document.getElementById('adminShell');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');

function showDashboard() {
  loginScreen.style.display = 'none';
  adminShell.classList.add('show');
  renderOrders();
}

if (sessionStorage.getItem(AUTH_KEY) === 'true') {
  showDashboard();
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  /* ---------- BACKEND HOOK: real authentication ----------
     Replace this check with a call to your login API, e.g.
     fetch('/api/admin/login', { method:'POST', body: JSON.stringify({user,pass}) })
     and store the returned session token instead of a boolean flag.
  --------------------------------------------------------- */
  if (user === DEMO_USER && pass === DEMO_PASS) {
    sessionStorage.setItem(AUTH_KEY, 'true');
    loginError.textContent = '';
    showDashboard();
  } else {
    loginError.textContent = 'Incorrect username or password.';
  }
});

logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem(AUTH_KEY);
  adminShell.classList.remove('show');
  loginScreen.style.display = 'flex';
  document.getElementById('loginPass').value = '';
});

/* ================= TOAST ================= */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ================= NOTIFY CUSTOMER ----------
   BACKEND HOOK: this is where the real automated message goes out.
   Two common approaches once the backend exists:
     1) WhatsApp: Meta WhatsApp Cloud API (or a provider like Twilio's
        WhatsApp Business API) — send a template message such as
        "Your Dhaan order {{id}} is now {{status}}. Track: {{trackingId}}"
        to the customer's `mobile` number.
     2) Email: a transactional service like SendGrid/Postmark/Nodemailer,
        emailing the customer's `email` with the same order update.
   Best practice is to trigger this automatically from the backend the
   moment an order's status changes (e.g. in the PATCH /api/orders/:id
   handler), rather than relying on the admin remembering to click a
   button. The manual button here is kept for the demo / edge cases.
------------------------------------------------------------- */
function notifyCustomer(order) {
  const channel = order.email ? 'WhatsApp + Email' : 'WhatsApp';
  showToast(`(Demo) ${channel} sent to ${order.fullName} — "Order ${order.id} is now ${order.status}."`);
}

/* ================= RENDER ================= */
let currentFilter = 'All';
let currentSearch = '';

function computeStats(orders) {
  const total = orders.length;
  const pending = orders.filter(o => o.status === 'Pending').length;
  const shipped = orders.filter(o => o.status === 'Shipped' || o.status === 'Out for Delivery').length;
  const delivered = orders.filter(o => o.status === 'Delivered').length;
  document.getElementById('statTotal').textContent = total;
  document.getElementById('statPending').textContent = pending;
  document.getElementById('statShipped').textContent = shipped;
  document.getElementById('statDelivered').textContent = delivered;
}

function matchesFilters(order) {
  const filterOk = currentFilter === 'All' || order.status === currentFilter;
  if (!filterOk) return false;
  if (!currentSearch) return true;
  const q = currentSearch.toLowerCase();
  return (
    (order.fullName || '').toLowerCase().includes(q) ||
    (order.mobile || '').includes(q) ||
    (order.id || '').toLowerCase().includes(q)
  );
}

function renderOrders() {
  const orders = getOrders();
  computeStats(orders);

  const tbody = document.getElementById('ordersBody');
  const emptyState = document.getElementById('emptyState');
  const table = document.getElementById('ordersTable');

  const visible = orders.filter(matchesFilters);

  if (orders.length === 0) {
    table.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }
  table.style.display = 'table';
  emptyState.style.display = 'none';

  if (visible.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:30px;color:var(--ink-500);">No orders match this filter/search.</td></tr>`;
    return;
  }

  tbody.innerHTML = visible.map(order => `
    <tr data-id="${order.id}">
      <td>
        <div class="order-id-cell">${order.id}</div>
        <div class="order-date">${formatDate(order.createdAt)}</div>
      </td>
      <td>
        <div class="cust-name">${order.fullName || '—'}</div>
        <div class="cust-sub">${order.mobile || ''}</div>
        <div class="cust-sub">${order.email || ''}</div>
      </td>
      <td>
        <div class="addr-cell">${order.address || ''}, ${order.city || ''}, ${order.state || ''} – ${order.pincode || ''}</div>
      </td>
      <td>${order.quantity || 1}</td>
      <td><strong>₹${order.total || 0}</strong></td>
      <td><span class="badge ${statusSlug(order.paymentStatus || 'Paid')}">${order.paymentStatus || 'Paid'}</span></td>
      <td>
        <select class="status-select" data-field="status">
          ${STATUS_OPTIONS.map(s => `<option value="${s}" ${s === order.status ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
      </td>
      <td>
        <div class="tracking-fields">
          <input type="text" class="mini-input" data-field="trackingId" placeholder="Tracking ID" value="${order.trackingId || ''}">
          <input type="text" class="mini-input" data-field="courier" placeholder="Courier name" value="${order.courier || ''}">
        </div>
      </td>
      <td>
        <div class="row-actions">
          <button class="btn btn-save" data-action="save">Save Changes</button>
          <button class="btn btn-notify" data-action="notify">Notify Customer</button>
          <span class="save-msg"></span>
        </div>
      </td>
    </tr>
  `).join('');
}

/* ================= EVENTS ================= */
document.getElementById('ordersBody').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const row = e.target.closest('tr');
  const id = row.dataset.id;
  const orders = getOrders();
  const idx = orders.findIndex(o => o.id === id);
  if (idx === -1) return;

  const status = row.querySelector('[data-field="status"]').value;
  const trackingId = row.querySelector('[data-field="trackingId"]').value.trim();
  const courier = row.querySelector('[data-field="courier"]').value.trim();

  orders[idx] = { ...orders[idx], status, trackingId, courier };
  saveOrders(orders);

  if (btn.dataset.action === 'save') {
    const msg = row.querySelector('.save-msg');
    msg.textContent = 'Saved ✓';
    setTimeout(() => { msg.textContent = ''; }, 2000);
    computeStats(orders);
  } else if (btn.dataset.action === 'notify') {
    notifyCustomer(orders[idx]);
  }
});

document.getElementById('filterChips').addEventListener('click', (e) => {
  const chip = e.target.closest('.filter-chip');
  if (!chip) return;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  currentFilter = chip.dataset.filter;
  renderOrders();
});

document.getElementById('searchInput').addEventListener('input', (e) => {
  currentSearch = e.target.value.trim();
  renderOrders();
});

const seedBtn = document.getElementById('seedBtn');
if (seedBtn) {
  seedBtn.addEventListener('click', () => {
    seedDemoOrders();
    renderOrders();
  });
}
