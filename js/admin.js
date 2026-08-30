/* =========================================================
   DHAAN ADMIN — REAL BACKEND VERSION
   Uses Render API + MongoDB
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     CONFIGURATION
     ========================================================= */

  const API_URL =
    'https://dhaan-backend.onrender.com';

  const TOKEN_KEY =
    'dhaan_admin_token';


  const STATUS_OPTIONS = [
    'Pending',
    'Confirmed',
    'Shipped',
    'Out for Delivery',
    'Delivered',
    'Cancelled'
  ];


  let currentFilter = 'All';
  let currentSearch = '';

  let toastTimer = null;


  /* =========================================================
     ELEMENTS
     ========================================================= */

  const loginScreen =
    document.getElementById('loginScreen');

  const adminShell =
    document.getElementById('adminShell');

  const loginForm =
    document.getElementById('loginForm');

  const loginError =
    document.getElementById('loginError');

  const logoutBtn =
    document.getElementById('logoutBtn');

  const ordersBody =
    document.getElementById('ordersBody');

  const filterChips =
    document.getElementById('filterChips');

  const searchInput =
    document.getElementById('searchInput');


  /* =========================================================
     AUTH HELPERS
     ========================================================= */

  function getToken() {

    return sessionStorage.getItem(
      TOKEN_KEY
    );

  }


  function setToken(token) {

    sessionStorage.setItem(
      TOKEN_KEY,
      token
    );

  }


  function clearToken() {

    sessionStorage.removeItem(
      TOKEN_KEY
    );

  }


  function showLogin() {

    if (adminShell) {

      adminShell.classList.remove(
        'show'
      );

    }


    if (loginScreen) {

      loginScreen.style.display =
        'flex';

    }

  }


  function showDashboard() {

    if (loginScreen) {

      loginScreen.style.display =
        'none';

    }


    if (adminShell) {

      adminShell.classList.add(
        'show'
      );

    }


    loadOrders();

  }


  /* =========================================================
     HTML ESCAPE
     Prevents customer data from becoming HTML.
     ========================================================= */

  function escapeHtml(value) {

    return String(
      value ?? ''
    )
      .replace(
        /&/g,
        '&amp;'
      )
      .replace(
        /</g,
        '&lt;'
      )
      .replace(
        />/g,
        '&gt;'
      )
      .replace(
        /"/g,
        '&quot;'
      )
      .replace(
        /'/g,
        '&#039;'
      );

  }


  /* =========================================================
     STATUS CLASS
     ========================================================= */

  function statusSlug(status) {

    return String(
      status || ''
    )
      .toLowerCase()
      .replace(
        /\s+/g,
        '-'
      );

  }


  /* =========================================================
     DATE FORMAT
     ========================================================= */

  function formatDate(iso) {

    if (!iso) {
      return '';
    }


    const d =
      new Date(iso);


    if (
      Number.isNaN(
        d.getTime()
      )
    ) {

      return '';

    }


    return (

      d.toLocaleDateString(
        'en-IN',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }
      )

      +

      ' · '

      +

      d.toLocaleTimeString(
        'en-IN',
        {
          hour: '2-digit',
          minute: '2-digit'
        }
      )

    );

  }


  /* =========================================================
     TOAST
     ========================================================= */

  function showToast(message) {

    const toast =
      document.getElementById(
        'toast'
      );


    if (!toast) {
      return;
    }


    toast.textContent =
      message;


    toast.classList.add(
      'show'
    );


    clearTimeout(
      toastTimer
    );


    toastTimer =
      setTimeout(
        () => {

          toast.classList.remove(
            'show'
          );

        },
        3200
      );

  }


  /* =========================================================
     API REQUEST
     ========================================================= */

  async function apiRequest(
    endpoint,
    options = {}
  ) {

    const token =
      getToken();


    const headers = {

      'Content-Type':
        'application/json',

      ...(options.headers || {})

    };


    if (token) {

      headers.Authorization =
        `Bearer ${token}`;

    }


    let response;


    try {

      response =
        await fetch(
          `${API_URL}${endpoint}`,
          {
            ...options,
            headers
          }
        );

    } catch (networkError) {

      throw new Error(
        'Could not connect to Dhaan server. Please try again.'
      );

    }


    let data = {};


    try {

      data =
        await response.json();

    } catch {

      data = {};

    }


    /* -------------------------------------------------------
       JWT EXPIRED / INVALID
       ------------------------------------------------------- */

    if (
      response.status === 401
    ) {

      clearToken();

      showLogin();

      throw new Error(
        data.error ||
        'Your session has expired. Please login again.'
      );

    }


    /* -------------------------------------------------------
       OTHER API ERROR
       ------------------------------------------------------- */

    if (!response.ok) {

      throw new Error(

        data.error ||

        data.message ||

        `Request failed (${response.status})`

      );

    }


    return data;

  }


  /* =========================================================
     ADMIN LOGIN
     POST /api/admin/login
     ========================================================= */

  if (loginForm) {

    loginForm.addEventListener(
      'submit',
      async (e) => {

        e.preventDefault();


        const username =
          document
            .getElementById(
              'loginUser'
            )
            ?.value
            .trim();


        const password =
          document
            .getElementById(
              'loginPass'
            )
            ?.value ||
          '';


        if (
          !username ||
          !password
        ) {

          if (loginError) {

            loginError.textContent =
              'Enter username and password.';

          }

          return;

        }


        if (loginError) {

          loginError.textContent =
            'Logging in...';

        }


        try {

          const data =
            await apiRequest(
              '/api/admin/login',
              {

                method:
                  'POST',

                body:
                  JSON.stringify({

                    username,

                    password

                  })

              }
            );


          if (!data.token) {

            throw new Error(
              'Login succeeded but no authentication token was returned.'
            );

          }


          setToken(
            data.token
          );


          if (loginError) {

            loginError.textContent =
              '';

          }


          showDashboard();


        } catch (error) {

          console.error(
            'Admin login error:',
            error
          );


          if (loginError) {

            loginError.textContent =
              error.message ||
              'Login failed.';

          }

        }

      }
    );

  }


  /* =========================================================
     LOGOUT
     ========================================================= */

  if (logoutBtn) {

    logoutBtn.addEventListener(
      'click',
      () => {

        clearToken();

        showLogin();


        const password =
          document.getElementById(
            'loginPass'
          );


        if (password) {

          password.value =
            '';

        }

      }
    );

  }


  /* =========================================================
     VERIFY ADMIN SESSION
     GET /api/admin/me
     ========================================================= */

  async function checkAuthentication() {

    const token =
      getToken();


    if (!token) {

      showLogin();

      return;

    }


    try {

      await apiRequest(
        '/api/admin/me'
      );


      showDashboard();


    } catch (error) {

      console.error(
        'Authentication check failed:',
        error
      );


      clearToken();

      showLogin();

    }

  }


  /* =========================================================
     GET ORDERS
     GET /api/orders
     ========================================================= */

  async function getOrders() {

    const params =
      new URLSearchParams();


    if (
      currentFilter &&
      currentFilter !== 'All'
    ) {

      params.set(
        'status',
        currentFilter
      );

    }


    if (currentSearch) {

      params.set(
        'search',
        currentSearch
      );

    }


    const query =
      params.toString();


    const endpoint =
      query
        ? `/api/orders?${query}`
        : '/api/orders';


    const data =
      await apiRequest(
        endpoint
      );


    /*
     * Your backend currently returns:
     *
     * [
     *   { orderId: "...", ... }
     * ]
     *
     * This also supports:
     *
     * { orders: [...] }
     */

    if (Array.isArray(data)) {

      return data;

    }


    if (
      data &&
      Array.isArray(data.orders)
    ) {

      return data.orders;

    }


    return [];

  }


  /* =========================================================
     LOAD ORDERS
     ========================================================= */

  async function loadOrders() {

    try {

      const orders =
        await getOrders();


      renderOrders(
        orders
      );


    } catch (error) {

      console.error(
        'Could not load orders:',
        error
      );


      showToast(
        error.message ||
        'Could not load orders.'
      );

    }

  }


  /* =========================================================
     STATS
     ========================================================= */

  function computeStats(
    orders
  ) {

    const total =
      orders.length;


    const pending =
      orders.filter(
        order =>
          order.status ===
          'Pending'
      ).length;


    const shipped =
      orders.filter(
        order =>
          order.status ===
            'Shipped' ||

          order.status ===
            'Out for Delivery'
      ).length;


    const delivered =
      orders.filter(
        order =>
          order.status ===
          'Delivered'
      ).length;


    const statTotal =
      document.getElementById(
        'statTotal'
      );


    const statPending =
      document.getElementById(
        'statPending'
      );


    const statShipped =
      document.getElementById(
        'statShipped'
      );


    const statDelivered =
      document.getElementById(
        'statDelivered'
      );


    if (statTotal) {

      statTotal.textContent =
        total;

    }


    if (statPending) {

      statPending.textContent =
        pending;

    }


    if (statShipped) {

      statShipped.textContent =
        shipped;

    }


    if (statDelivered) {

      statDelivered.textContent =
        delivered;

    }

  }


  /* =========================================================
     RENDER ORDERS
     ========================================================= */

  function renderOrders(
    orders
  ) {

    computeStats(
      orders
    );


    const tbody =
      document.getElementById(
        'ordersBody'
      );


    const emptyState =
      document.getElementById(
        'emptyState'
      );


    const table =
      document.getElementById(
        'ordersTable'
      );


    if (
      !tbody ||
      !emptyState ||
      !table
    ) {

      console.error(
        'Admin table elements are missing from admin.html'
      );

      return;

    }


    if (
      orders.length === 0
    ) {

      table.style.display =
        'none';


      emptyState.style.display =
        'block';


      return;

    }


    table.style.display =
      'table';


    emptyState.style.display =
      'none';


    tbody.innerHTML =
      orders.map(
        order => {


          /*
           * IMPORTANT:
           *
           * Your MongoDB/backend uses:
           *
           * order.orderId
           *
           * NOT:
           *
           * order.id
           */

          const orderId =
            escapeHtml(
              order.orderId ||
              ''
            );


          const fullName =
            escapeHtml(
              order.fullName ||
              '—'
            );


          const mobile =
            escapeHtml(
              order.mobile ||
              ''
            );


          const email =
            escapeHtml(
              order.email ||
              ''
            );


          const address =
            escapeHtml(
              order.address ||
              ''
            );


          const city =
            escapeHtml(
              order.city ||
              ''
            );


          const state =
            escapeHtml(
              order.state ||
              ''
            );


          const pincode =
            escapeHtml(
              order.pincode ||
              ''
            );


          const trackingId =
            escapeHtml(
              order.trackingId ||
              ''
            );


          const courier =
            escapeHtml(
              order.courier ||
              ''
            );


          const quantity =
            Number(
              order.quantity || 1
            );


          const total =
            Number(
              order.total || 0
            );


          const paymentStatus =
            escapeHtml(
              order.paymentStatus ||
              'Unpaid'
            );


          const currentStatus =
            order.status ||
            'Pending';


          return `

            <tr
              data-id="${orderId}"
            >

              <!-- ORDER ID -->

              <td>

                <div
                  class="order-id-cell"
                >
                  ${orderId}
                </div>

                <div
                  class="order-date"
                >
                  ${escapeHtml(
                    formatDate(
                      order.createdAt
                    )
                  )}
                </div>

              </td>


              <!-- CUSTOMER -->

              <td>

                <div
                  class="cust-name"
                >
                  ${fullName}
                </div>

                <div
                  class="cust-sub"
                >
                  ${mobile}
                </div>

                <div
                  class="cust-sub"
                >
                  ${email}
                </div>

              </td>


              <!-- ADDRESS -->

              <td>

                <div
                  class="addr-cell"
                >
                  ${address},
                  ${city},
                  ${state}
                  – ${pincode}
                </div>

              </td>


              <!-- QUANTITY -->

              <td>
                ${quantity}
              </td>


              <!-- TOTAL -->

              <td>

                <strong>
                  ₹${total.toLocaleString(
                    'en-IN'
                  )}
                </strong>

              </td>


              <!-- PAYMENT -->

              <td>

                <span
                  class="badge ${statusSlug(
                    paymentStatus
                  )}"
                >
                  ${paymentStatus}
                </span>

              </td>


              <!-- STATUS -->

              <td>

                <select
                  class="status-select"
                  data-field="status"
                >

                  ${STATUS_OPTIONS
                    .map(
                      status => `

                        <option
                          value="${escapeHtml(
                            status
                          )}"
                          ${
                            status ===
                            currentStatus
                              ? 'selected'
                              : ''
                          }
                        >
                          ${escapeHtml(
                            status
                          )}
                        </option>

                      `
                    )
                    .join('')}

                </select>

              </td>


              <!-- TRACKING -->

              <td>

                <div
                  class="tracking-fields"
                >

                  <input
                    type="text"
                    class="mini-input"
                    data-field="trackingId"
                    placeholder="Tracking ID"
                    value="${trackingId}"
                  >

                  <input
                    type="text"
                    class="mini-input"
                    data-field="courier"
                    placeholder="Courier name"
                    value="${courier}"
                  >

                </div>

              </td>


              <!-- ACTIONS -->

              <td>

                <div
                  class="row-actions"
                >

                  <button
                    class="btn btn-save"
                    data-action="save"
                  >
                    Save Changes
                  </button>


                  <button
                    class="btn btn-notify"
                    data-action="notify"
                  >
                    Notify Customer
                  </button>


                  <span
                    class="save-msg"
                  ></span>

                </div>

              </td>

            </tr>

          `;

        }
      )
      .join('');

  }


  /* =========================================================
     SAVE / NOTIFY BUTTONS
     ========================================================= */

  if (ordersBody) {

    ordersBody.addEventListener(
      'click',
      async (e) => {

        const button =
          e.target.closest(
            'button[data-action]'
          );


        if (!button) {
          return;
        }


        const row =
          e.target.closest(
            'tr'
          );


        if (!row) {
          return;
        }


        /*
         * IMPORTANT:
         *
         * data-id contains orderId.
         */

        const orderId =
          row.dataset.id;


        if (!orderId) {

          alert(
            'Order ID is missing.'
          );

          return;

        }


        const status =
          row.querySelector(
            '[data-field="status"]'
          )?.value ||
          'Pending';


        const trackingId =
          row.querySelector(
            '[data-field="trackingId"]'
          )?.value
            .trim() ||
          '';


        const courier =
          row.querySelector(
            '[data-field="courier"]'
          )?.value
            .trim() ||
          '';


        /* =================================================
           SAVE CHANGES
           ================================================= */

        if (
          button.dataset.action ===
          'save'
        ) {

          button.disabled =
            true;


          button.textContent =
            'Saving...';


          try {

            await apiRequest(

              `/api/orders/${encodeURIComponent(
                orderId
              )}`,

              {

                method:
                  'PATCH',

                body:
                  JSON.stringify({

                    status,

                    trackingId,

                    courier

                  })

              }

            );


            const msg =
              row.querySelector(
                '.save-msg'
              );


            if (msg) {

              msg.textContent =
                'Saved ✓';


              setTimeout(
                () => {

                  msg.textContent =
                    '';

                },
                2500
              );

            }


            /*
             * Reload real MongoDB data
             */

            await loadOrders();


          } catch (error) {

            console.error(
              'Save order error:',
              error
            );


            alert(
              error.message ||
              'Could not save order.'
            );


          } finally {

            button.disabled =
              false;


            button.textContent =
              'Save Changes';

          }

        }


        /* =================================================
           MANUAL NOTIFICATION
           ================================================= */

        if (
          button.dataset.action ===
          'notify'
        ) {

          button.disabled =
            true;


          button.textContent =
            'Sending...';


          try {

            await apiRequest(

              `/api/orders/${encodeURIComponent(
                orderId
              )}/notify`,

              {

                method:
                  'POST'

              }

            );


            showToast(
              'Customer notification sent.'
            );


          } catch (error) {

            console.error(
              'Notification error:',
              error
            );


            alert(
              error.message ||
              'Could not send notification.'
            );


          } finally {

            button.disabled =
              false;


            button.textContent =
              'Notify Customer';

          }

        }

      }
    );

  }


  /* =========================================================
     FILTER CHIPS
     ========================================================= */

  if (filterChips) {

    filterChips.addEventListener(
      'click',
      async (e) => {

        const chip =
          e.target.closest(
            '.filter-chip'
          );


        if (!chip) {
          return;
        }


        document
          .querySelectorAll(
            '.filter-chip'
          )
          .forEach(
            item => {

              item.classList.remove(
                'active'
              );

            }
          );


        chip.classList.add(
          'active'
        );


        currentFilter =
          chip.dataset.filter ||
          'All';


        await loadOrders();

      }
    );

  }


  /* =========================================================
     SEARCH
     ========================================================= */

  if (searchInput) {

    let searchTimer = null;


    searchInput.addEventListener(
      'input',
      () => {

        currentSearch =
          searchInput.value.trim();


        clearTimeout(
          searchTimer
        );


        /*
         * Small delay so we don't
         * request the backend on
         * every single keystroke.
         */

        searchTimer =
          setTimeout(
            () => {

              loadOrders();

            },
            300
          );

      }
    );

  }


  /* =========================================================
     START ADMIN
     ========================================================= */

  checkAuthentication();

});