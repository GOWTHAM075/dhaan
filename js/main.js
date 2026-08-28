/* =========================================================
   DHAAN — main.js
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Promo video (click to play) ---------- */
  const promoVideo = document.getElementById('promoVideo');
  const playOverlay = document.getElementById('playOverlay');
  const promoMuteToggle = document.getElementById('promoMuteToggle');
  const promoIconMuted = document.getElementById('promoIconMuted');
  const promoIconUnmuted = document.getElementById('promoIconUnmuted');

  if (promoVideo && playOverlay) {
    playOverlay.addEventListener('click', () => {
      promoVideo.muted = false;
      promoVideo.play();
      playOverlay.classList.add('hidden');
      promoMuteToggle.style.display = 'flex';
      promoIconMuted.style.display = 'none';
      promoIconUnmuted.style.display = 'block';
    });
    promoVideo.addEventListener('click', () => {
      if (promoVideo.paused) { promoVideo.play(); } else { promoVideo.pause(); }
    });
    promoVideo.addEventListener('ended', () => {
      playOverlay.classList.remove('hidden');
      promoMuteToggle.style.display = 'none';
    });
    promoMuteToggle.addEventListener('click', () => {
      promoVideo.muted = !promoVideo.muted;
      promoIconMuted.style.display = promoVideo.muted ? 'block' : 'none';
      promoIconUnmuted.style.display = promoVideo.muted ? 'none' : 'block';
    });
  }

  /* ---------- Hero video mute toggle ---------- */
  const heroVideo = document.getElementById('heroVideo');
  const muteToggle = document.getElementById('muteToggle');
  const iconMuted = document.getElementById('iconMuted');
  const iconUnmuted = document.getElementById('iconUnmuted');
  if (heroVideo && muteToggle) {
    muteToggle.addEventListener('click', () => {
      heroVideo.muted = !heroVideo.muted;
      iconMuted.style.display = heroVideo.muted ? 'block' : 'none';
      iconUnmuted.style.display = heroVideo.muted ? 'none' : 'block';
      muteToggle.setAttribute('aria-label', heroVideo.muted ? 'Unmute video' : 'Mute video');
    });
    // Browsers may block autoplay with sound; ensure it starts muted+playing
    heroVideo.play().catch(() => {});
  }

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById('navToggle');
  const header = document.getElementById('siteHeader');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      header.classList.toggle('menu-open');
    });
  }
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => header.classList.remove('menu-open'));
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  if (sections.length && navAnchors.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => a.classList.remove('active'));
          const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (match) match.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Count-up stats ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = value.toLocaleString('en-IN') + (progress >= 1 ? '+' : '');
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(el => countObserver.observe(el));

  /* ---------- Ingredients grid ---------- */
  const ingredients = [
    ['01-badam','Badam'],['02-pista','Pista'],['03-cashewnut','Cashewnut'],['04-walnut','Walnut'],
    ['05-sprouted-ragi','Sprouted Ragi'],['06-sprouted-pearl-millet','Sprouted Pearl Millet'],
    ['07-sprouted-horse-gram','Sprouted Horse Gram'],['08-sprouted-green-gram','Sprouted Green Gram'],
    ['09-sprouted-black-chickpea','Sprouted Black Chickpea'],['10-sprouted-black-grams','Sprouted Black Grams'],
    ['11-soy-beans','Soy Beans'],['12-groundnut','Groundnut'],['13-kidney-beans','Kidney Beans'],
    ['14-bengal-gram','Bengal Gram'],['15-cardamom','Cardamom'],['16-foxtail-millet','Foxtail Millet'],
    ['17-dry-ginger','Dry Ginger'],['18-white-sorghum','White Sorghum'],['19-red-rice','Red Rice'],
    ['20-corn','Corn'],['21-black-rice','Black Rice'],['22-pumpkin-seeds','Pumpkin Seeds'],
    ['23-sago','Sago'],['24-blackeyed-pea','Blackeyed Pea'],['25-rice','Rice'],['26-dry-dates','Dry Dates']
  ];
  const ingGrid = document.getElementById('ingGrid');
  if (ingGrid) {
    ingGrid.innerHTML = ingredients.map(([file, name], i) => `
      <div class="ing-card">
        <div class="thumb">
          <span class="num">${i + 1}</span>
          <img src="assets/ingredients/${file}.jpg" alt="${name}" loading="lazy">
        </div>
        <p>${name}</p>
      </div>
    `).join('');
  }

  /* ---------- Reviews ---------- */
  const reviews = [
    { name: 'Priya Ramesh', city: 'Chennai', rating: 5, text: 'My son actually looks forward to breakfast now. The porridge is filling and I love that it has no added preservatives.' },
    { name: 'Arun Kumar', city: 'Coimbatore', rating: 5, text: 'Been using it for 3 months as a pre-workout meal. High protein, easy to digest, and genuinely tasty with warm milk.' },
    { name: 'Divya Sundar', city: 'Bengaluru', rating: 4, text: 'Great for my toddler — I mix it into her regular cereal. Noticed better appetite and energy through the day.' },
    { name: 'Karthik Raja', city: 'Madurai', rating: 5, text: 'Switched from a market brand to Dhaan and the difference in taste and texture is clear. 26 ingredients really shows.' },
    { name: 'Meena Iyer', city: 'Salem', rating: 5, text: 'Whole family drinks it now, from my father to my daughter. Simple to prepare and doesn\'t feel like "health food".' },
    { name: 'Suresh Babu', city: 'Trichy', rating: 4, text: 'Good fibre content, kept me full till lunch. Packaging is sturdy and delivery was quicker than expected.' }
  ];
  const reviewGrid = document.getElementById('reviewGrid');
  if (reviewGrid) {
    reviewGrid.innerHTML = reviews.map(r => `
      <div class="review-card">
        <div class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
        <p class="quote">"${r.text}"</p>
        <div class="review-who">
          <span class="avatar">${r.name.charAt(0)}</span>
          <div>
            <strong>${r.name}</strong>
            <span>${r.city} · Verified Buyer</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  /* ---------- Order form logic ---------- */
  const UNIT_PRICE = 299;
  const DELIVERY = 40;
  let qty = 1;

  const qtyInput = document.getElementById('qtyInput');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const sumQty = document.getElementById('sumQty');
  const sumProduct = document.getElementById('sumProduct');
  const sumDelivery = document.getElementById('sumDelivery');
  const sumTotal = document.getElementById('sumTotal');
  const mobilePrice = document.querySelector('.mobile-order-bar .price');

  function renderSummary() {
    const productTotal = UNIT_PRICE * qty;
    const total = productTotal + DELIVERY;
    if (sumQty) sumQty.textContent = qty;
    if (sumProduct) sumProduct.textContent = `₹${productTotal}`;
    if (sumDelivery) sumDelivery.textContent = `₹${DELIVERY}`;
    if (sumTotal) sumTotal.textContent = `₹${total}`;
    if (qtyInput) qtyInput.value = qty;
  }
  renderSummary();

  if (qtyMinus) qtyMinus.addEventListener('click', () => {
    qty = Math.max(1, qty - 1);
    renderSummary();
  });
  if (qtyPlus) qtyPlus.addEventListener('click', () => {
    qty = Math.min(10, qty + 1);
    renderSummary();
  });

  /* ---------- Validation ---------- */
  const form = document.getElementById('orderForm');
  const processingModal = document.getElementById('processingModal');
  const confirmModal = document.getElementById('confirmModal');
  const orderIdDisplay = document.getElementById('orderIdDisplay');
  const closeConfirm = document.getElementById('closeConfirm');

  function setError(fieldEl, message) {
    const wrap = fieldEl.closest('.field');
    wrap.classList.toggle('error', !!message);
    const msg = wrap.querySelector('.err-msg');
    if (msg) msg.textContent = message || '';
  }

  function validateForm() {
    let valid = true;
    const name = document.getElementById('fullName');
    const mobile = document.getElementById('mobile');
    const email = document.getElementById('email');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    const pincode = document.getElementById('pincode');

    if (!name.value.trim()) { setError(name, 'Please enter your name'); valid = false; } else setError(name, '');

    if (!/^[6-9]\d{9}$/.test(mobile.value.trim())) { setError(mobile, 'Enter a valid 10-digit mobile number'); valid = false; } else setError(mobile, '');

    if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { setError(email, 'Enter a valid email'); valid = false; } else setError(email, '');

    if (!address.value.trim()) { setError(address, 'Please enter your address'); valid = false; } else setError(address, '');
    if (!city.value.trim()) { setError(city, 'Please enter your city'); valid = false; } else setError(city, '');
    if (!state.value.trim()) { setError(state, 'Please enter your state'); valid = false; } else setError(state, '');
    if (!/^\d{6}$/.test(pincode.value.trim())) { setError(pincode, 'Enter a valid 6-digit pincode'); valid = false; } else setError(pincode, '');

    return valid;
  }

  /* ---------- Orders "mock backend" (localStorage) ----------
     Until the real backend is connected, submitted orders are saved
     here so the Admin dashboard (admin.html) has real data to show.
     Replace saveOrderRecord() with a POST to your orders API later.
  ------------------------------------------------------------- */
  function saveOrderRecord(payload, orderId) {
    const record = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: 'Pending',
      paymentStatus: 'Paid',
      trackingId: '',
      courier: '',
      ...payload
    };
    try {
      const existing = JSON.parse(localStorage.getItem('dhaan_orders') || '[]');
      existing.unshift(record);
      localStorage.setItem('dhaan_orders', JSON.stringify(existing));
    } catch (e) {
      console.error('Could not save order locally', e);
    }
  }

  /* ---------- Razorpay-ready checkout ----------
     This structures the full payment flow. To go live:
     1. Create an order on your backend (POST /api/create-order) which
        calls Razorpay Orders API with the amount below and returns
        { id: order_id, amount, currency, key }.
     2. Replace the mock block below with the fetch() call (commented)
        and pass the returned order_id into Razorpay options.
     3. On payment success, verify the signature server-side before
        showing the confirmation screen.
  ------------------------------------------------- */
  function startPayment(orderPayload) {
    processingModal.classList.add('open');

    /* ---- LIVE INTEGRATION (uncomment when backend is ready) ----
    fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    })
      .then(res => res.json())
      .then(order => {
        processingModal.classList.remove('open');
        const options = {
          key: order.key,                 // Razorpay key_id from backend
          amount: order.amount,           // in paise
          currency: order.currency || 'INR',
          name: 'Dhaan Foods',
          description: 'Smart Start Health Mix',
          image: 'assets/img/logo.png',
          order_id: order.id,
          prefill: {
            name: orderPayload.fullName,
            contact: orderPayload.mobile,
            email: orderPayload.email
          },
          theme: { color: '#6B1420' },
          handler: function (response) {
            // response.razorpay_payment_id, razorpay_order_id, razorpay_signature
            // verify signature server-side, then:
            saveOrderRecord(orderPayload, response.razorpay_order_id);
            showConfirmation(response.razorpay_order_id);
          }
        };
        const rzp = new Razorpay(options);
        rzp.open();
      })
      .catch(() => {
        processingModal.classList.remove('open');
        alert('Could not start payment. Please try again.');
      });
    ------------------------------------------------------------ */

    /* ---- DEMO MODE (no backend connected yet) ---- */
    setTimeout(() => {
      processingModal.classList.remove('open');
      const mockOrderId = 'DHN' + Math.floor(100000 + Math.random() * 900000);
      saveOrderRecord(orderPayload, mockOrderId);
      showConfirmation(mockOrderId);
    }, 1400);
  }

  function showConfirmation(orderId) {
    orderIdDisplay.textContent = `Order ID: ${orderId}`;
    confirmModal.classList.add('open');
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateForm()) {
        const firstError = form.querySelector('.field.error input');
        if (firstError) firstError.focus();
        return;
      }
      const payload = {
        product: 'Dhaan Smart Start Health Mix (500g)',
        quantity: qty,
        unitPrice: UNIT_PRICE,
        delivery: DELIVERY,
        total: UNIT_PRICE * qty + DELIVERY,
        fullName: document.getElementById('fullName').value.trim(),
        mobile: document.getElementById('mobile').value.trim(),
        email: document.getElementById('email').value.trim(),
        address: document.getElementById('address').value.trim(),
        city: document.getElementById('city').value.trim(),
        state: document.getElementById('state').value.trim(),
        pincode: document.getElementById('pincode').value.trim()
      };
      startPayment(payload);
    });
  }

  if (closeConfirm) {
    closeConfirm.addEventListener('click', () => {
      confirmModal.classList.remove('open');
      form.reset();
      document.getElementById('state').value = 'Tamil Nadu';
      qty = 1;
      renderSummary();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Newsletter (placeholder) ---------- */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      input.value = '';
      input.placeholder = 'Thanks for subscribing!';
    });
  }

});
