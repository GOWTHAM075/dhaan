/* =========================================================
   DHAAN FOODS — MAIN.JS
   Complete Production Version
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     CONFIGURATION
     ========================================================= */

  const API_URL = 'https://dhaan-backend.onrender.com';

  const UNIT_PRICE = 349;

  /*
    BUY 2 OFFER

    1 Pack  = ₹349
    2 Packs = ₹598
    3 Packs = ₹947
    4 Packs = ₹1196

    Delivery = FREE
  */

  const TWO_PACK_ORIGINAL = 700;
  const TWO_PACK_OFFER = 598;
  const DELIVERY = 0;


  /* =========================================================
     PROMO VIDEO
     ========================================================= */

  const promoVideo =
    document.getElementById('promoVideo');

  const playOverlay =
    document.getElementById('playOverlay');

  const promoMuteToggle =
    document.getElementById('promoMuteToggle');

  const promoIconMuted =
    document.getElementById('promoIconMuted');

  const promoIconUnmuted =
    document.getElementById('promoIconUnmuted');


  if (promoVideo && playOverlay) {

    playOverlay.addEventListener('click', () => {

      promoVideo.muted = false;

      const playPromise =
        promoVideo.play();

      if (playPromise) {
        playPromise.catch(() => {});
      }

      playOverlay.classList.add('hidden');

      if (promoMuteToggle) {
        promoMuteToggle.style.display = 'flex';
      }

      if (promoIconMuted) {
        promoIconMuted.style.display = 'none';
      }

      if (promoIconUnmuted) {
        promoIconUnmuted.style.display = 'block';
      }

    });


    promoVideo.addEventListener('click', () => {

      if (promoVideo.paused) {

        promoVideo.play().catch(() => {});

      } else {

        promoVideo.pause();

      }

    });


    promoVideo.addEventListener('ended', () => {

      playOverlay.classList.remove('hidden');

      if (promoMuteToggle) {
        promoMuteToggle.style.display = 'none';
      }

    });


    if (promoMuteToggle) {

      promoMuteToggle.addEventListener('click', () => {

        promoVideo.muted =
          !promoVideo.muted;

        if (promoIconMuted) {
          promoIconMuted.style.display =
            promoVideo.muted
              ? 'block'
              : 'none';
        }

        if (promoIconUnmuted) {
          promoIconUnmuted.style.display =
            promoVideo.muted
              ? 'none'
              : 'block';
        }

      });

    }

  }


  /* =========================================================
     HERO VIDEO
     ========================================================= */

  const heroVideo =
    document.getElementById('heroVideo');

  const muteToggle =
    document.getElementById('muteToggle');

  const iconMuted =
    document.getElementById('iconMuted');

  const iconUnmuted =
    document.getElementById('iconUnmuted');


  if (heroVideo && muteToggle) {

    muteToggle.addEventListener('click', () => {

      heroVideo.muted =
        !heroVideo.muted;

      if (iconMuted) {
        iconMuted.style.display =
          heroVideo.muted
            ? 'block'
            : 'none';
      }

      if (iconUnmuted) {
        iconUnmuted.style.display =
          heroVideo.muted
            ? 'none'
            : 'block';
      }

      muteToggle.setAttribute(
        'aria-label',
        heroVideo.muted
          ? 'Unmute video'
          : 'Mute video'
      );

    });


    /*
      Start muted.
      This avoids browser autoplay restrictions.
    */

    heroVideo.muted = true;

    heroVideo.play().catch(() => {});

  }


  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */

  const navToggle =
    document.getElementById('navToggle');

  const header =
    document.getElementById('siteHeader');


  if (navToggle && header) {

    navToggle.addEventListener('click', () => {

      header.classList.toggle(
        'menu-open'
      );

    });

  }


  document
    .querySelectorAll('.mobile-menu a')
    .forEach(anchor => {

      anchor.addEventListener('click', () => {

        if (header) {
          header.classList.remove(
            'menu-open'
          );
        }

      });

    });


  /* =========================================================
     ACTIVE NAV LINK
     ========================================================= */

  const sections =
    document.querySelectorAll(
      'section[id]'
    );

  const navAnchors =
    document.querySelectorAll(
      '.nav-links a'
    );


  if (
    sections.length &&
    navAnchors.length &&
    'IntersectionObserver' in window
  ) {

    const spy =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            navAnchors.forEach(anchor => {

              anchor.classList.remove(
                'active'
              );

            });


            const match =
              document.querySelector(
                `.nav-links a[href="#${entry.target.id}"]`
              );


            if (match) {
              match.classList.add(
                'active'
              );
            }

          });

        },
        {
          rootMargin:
            '-40% 0px -50% 0px'
        }
      );


    sections.forEach(section => {

      spy.observe(section);

    });

  }


  /* =========================================================
     SCROLL REVEAL
     ========================================================= */

  const revealEls =
    document.querySelectorAll(
      '.reveal'
    );


  /*
    Important:
    If IntersectionObserver is unavailable,
    immediately show all reveal elements.
  */

  if (
    'IntersectionObserver' in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              'in'
            );

            revealObserver.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.08
        }
      );


    revealEls.forEach(element => {

      revealObserver.observe(element);

    });

  } else {

    revealEls.forEach(element => {

      element.classList.add('in');

    });

  }


  /*
    Safety fallback.

    If CSS has .reveal hidden and something
    prevents the observer from firing, make
    everything visible after a short delay.
  */

  setTimeout(() => {

    document
      .querySelectorAll('.reveal')
      .forEach(element => {

        element.classList.add('in');

      });

  }, 2500);


  /* =========================================================
     COUNT-UP STATS
     ========================================================= */

  const counters =
    document.querySelectorAll(
      '[data-count]'
    );


  if (
    counters.length &&
    'IntersectionObserver' in window
  ) {

    const countObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }


            const element =
              entry.target;

            const target =
              parseInt(
                element.dataset.count,
                10
              );


            if (
              Number.isNaN(target)
            ) {
              return;
            }


            const duration = 1400;

            const start =
              performance.now();


            function tick(now) {

              const progress =
                Math.min(
                  (now - start) /
                  duration,
                  1
                );


              const value =
                Math.floor(
                  progress * target
                );


              element.textContent =
                value.toLocaleString(
                  'en-IN'
                ) +
                (
                  progress >= 1
                    ? '+'
                    : ''
                );


              if (progress < 1) {

                requestAnimationFrame(
                  tick
                );

              }

            }


            requestAnimationFrame(
              tick
            );


            countObserver.unobserve(
              element
            );

          });

        },
        {
          threshold: 0.6
        }
      );


    counters.forEach(element => {

      countObserver.observe(element);

    });

  } else {

    counters.forEach(element => {

      const target =
        parseInt(
          element.dataset.count,
          10
        );

      if (!Number.isNaN(target)) {

        element.textContent =
          target.toLocaleString(
            'en-IN'
          ) + '+';

      }

    });

  }


  /* =========================================================
     INGREDIENTS
     ========================================================= */

  const ingredients = [

    ['01-badam', 'Badam'],
    ['02-pista', 'Pista'],
    ['03-cashewnut', 'Cashewnut'],
    ['04-walnut', 'Walnut'],

    ['05-sprouted-ragi', 'Sprouted Ragi'],
    [
      '06-sprouted-pearl-millet',
      'Sprouted Pearl Millet'
    ],

    [
      '07-sprouted-horse-gram',
      'Sprouted Horse Gram'
    ],

    [
      '08-sprouted-green-gram',
      'Sprouted Green Gram'
    ],

    [
      '09-sprouted-black-chickpea',
      'Sprouted Black Chickpea'
    ],

    [
      '10-sprouted-black-grams',
      'Sprouted Black Grams'
    ],

    ['11-soy-beans', 'Soy Beans'],
    ['12-groundnut', 'Groundnut'],
    ['13-kidney-beans', 'Kidney Beans'],
    ['14-bengal-gram', 'Bengal Gram'],
    ['15-cardamom', 'Cardamom'],
    ['16-foxtail-millet', 'Foxtail Millet'],
    ['17-dry-ginger', 'Dry Ginger'],
    ['18-white-sorghum', 'White Sorghum'],
    ['19-red-rice', 'Red Rice'],
    ['20-corn', 'Corn'],
    ['21-black-rice', 'Black Rice'],
    ['22-pumpkin-seeds', 'Pumpkin Seeds'],
    ['23-sago', 'Sago'],
    ['24-blackeyed-pea', 'Blackeyed Pea'],
    ['25-rice', 'Rice'],
    ['26-dry-dates', 'Dry Dates']

  ];


  const ingGrid =
    document.getElementById(
      'ingGrid'
    );


  if (ingGrid) {

    ingGrid.innerHTML =
      ingredients
        .map(
          ([file, name], index) => {

            return `

              <div class="ing-card">

                <div class="thumb">

                  <span class="num">
                    ${index + 1}
                  </span>

                  <img
                    src="assets/ingredients/${file}.jpg"
                    alt="${name}"
                    loading="lazy"
                    onerror="this.style.display='none'"
                  >

                </div>

                <p>
                  ${name}
                </p>

              </div>

            `;

          }
        )
        .join('');

  }


  /* =========================================================
     REVIEWS
     ========================================================= */

  const reviews = [

    {
      name: 'Priya Ramesh',
      city: 'Chennai',
      rating: 5,
      text:
        'My son actually looks forward to breakfast now. The porridge is filling and I love that it has no added preservatives.'
    },

    {
      name: 'Arun Kumar',
      city: 'Coimbatore',
      rating: 5,
      text:
        'Been using it for 3 months as a pre-workout meal. High protein, easy to digest, and genuinely tasty with warm milk.'
    },

    {
      name: 'Divya Sundar',
      city: 'Bengaluru',
      rating: 4,
      text:
        'Great for my toddler — I mix it into her regular cereal. Noticed better appetite and energy through the day.'
    },

    {
      name: 'Karthik Raja',
      city: 'Madurai',
      rating: 5,
      text:
        'Switched from a market brand to Dhaan and the difference in taste and texture is clear. 26 ingredients really shows.'
    },

    {
      name: 'Meena Iyer',
      city: 'Salem',
      rating: 5,
      text:
        'Whole family drinks it now, from my father to my daughter. Simple to prepare and doesn’t feel like health food.'
    },

    {
      name: 'Suresh Babu',
      city: 'Trichy',
      rating: 4,
      text:
        'Good fibre content, kept me full till lunch. Packaging is sturdy and delivery was quicker than expected.'
    }

  ];


  const reviewGrid =
    document.getElementById(
      'reviewGrid'
    );


  if (reviewGrid) {

    reviewGrid.innerHTML =
      reviews
        .map(review => {

          return `

            <div class="review-card">

              <div class="stars">

                ${'★'.repeat(review.rating)}

                ${'☆'.repeat(
                  5 - review.rating
                )}

              </div>

              <p class="quote">
                "${review.text}"
              </p>

              <div class="review-who">

                <span class="avatar">
                  ${review.name.charAt(0)}
                </span>

                <div>

                  <strong>
                    ${review.name}
                  </strong>

                  <span>
                    ${review.city} · Verified Buyer
                  </span>

                </div>

              </div>

            </div>

          `;

        })
        .join('');

  }


  /* =========================================================
     ORDER ELEMENTS
     ========================================================= */

  let qty = 1;


  const qtyInput =
    document.getElementById(
      'qtyInput'
    );

  const qtyMinus =
    document.getElementById(
      'qtyMinus'
    );

  const qtyPlus =
    document.getElementById(
      'qtyPlus'
    );

  const sumQty =
    document.getElementById(
      'sumQty'
    );

  const sumProduct =
    document.getElementById(
      'sumProduct'
    );

  const sumDelivery =
    document.getElementById(
      'sumDelivery'
    );

  const sumTotal =
    document.getElementById(
      'sumTotal'
    );

  const mobilePrice =
    document.querySelector(
      '.mobile-order-bar .price'
    );


  /* =========================================================
     GET PRICING
     ========================================================= */

  function getPricing(quantity) {

    quantity =
      Number(quantity) || 1;


    if (quantity < 1) {
      quantity = 1;
    }


    /*
      1 PACK

      ₹349
    */

    if (quantity === 1) {

      return {

        regularTotal:
          UNIT_PRICE,

        discount:
          0,

        offerTotal:
          UNIT_PRICE,

        delivery:
          DELIVERY

      };

    }


    /*
      2 OR MORE

      Every 2 packs = ₹598
      Remaining 1 pack = ₹349
    */

    const pairs =
      Math.floor(
        quantity / 2
      );

    const remaining =
      quantity % 2;


    const offerTotal =
      (
        pairs *
        TWO_PACK_OFFER
      ) +
      (
        remaining *
        UNIT_PRICE
      );


    const regularTotal =
      quantity *
      UNIT_PRICE;


    const discount =
      regularTotal -
      offerTotal;


    return {

      regularTotal:
        regularTotal,

      discount:
        discount,

      offerTotal:
        offerTotal,

      delivery:
        DELIVERY

    };

  }


  /* =========================================================
     OFFER DISPLAY
     ========================================================= */

  function updateOfferDisplay(
    pricing
  ) {

    if (!sumProduct) {
      return;
    }


    const productRow =
      sumProduct.closest(
        '.row'
      );


    /*
      Product row may not exist in
      older HTML versions.
    */

    if (productRow) {

      sumProduct.textContent =
        `₹${pricing.offerTotal.toLocaleString('en-IN')}`;

    }


    /*
      Discount row
    */

    let discountRow =
      document.getElementById(
        'discountRow'
      );


    if (
      pricing.discount > 0 &&
      productRow
    ) {

      if (!discountRow) {

        discountRow =
          document.createElement(
            'div'
          );

        discountRow.id =
          'discountRow';

        discountRow.className =
          'row discount-row';


        productRow.parentNode.insertBefore(
          discountRow,
          productRow.nextSibling
        );

      }


      discountRow.innerHTML = `

        <span>
          You Save
        </span>

        <strong>
          -₹${pricing.discount.toLocaleString('en-IN')}
        </strong>

      `;

    }


    if (
      pricing.discount <= 0 &&
      discountRow
    ) {

      discountRow.remove();

    }


    /*
      Add original price display
      for 2+ packs.
    */

    const existingOriginal =
      document.getElementById(
        'originalPriceDisplay'
      );


    if (
      pricing.discount > 0 &&
      productRow
    ) {

      if (!existingOriginal) {

        const original =
          document.createElement(
            'span'
          );

        original.id =
          'originalPriceDisplay';

        original.style.cssText = `
          margin-left:8px;
          color:#999;
          text-decoration:line-through;
          font-size:13px;
        `;

        original.textContent =
          `₹${pricing.regularTotal.toLocaleString('en-IN')}`;


        sumProduct.appendChild(
          original
        );

      } else {

        existingOriginal.textContent =
          `₹${pricing.regularTotal.toLocaleString('en-IN')}`;

      }

    } else if (existingOriginal) {

      existingOriginal.remove();

    }

  }


  /* =========================================================
     RENDER SUMMARY
     ========================================================= */

  function renderSummary() {

    const pricing =
      getPricing(qty);


    if (qtyInput) {

      qtyInput.value =
        String(qty);

    }


    if (sumQty) {

      sumQty.textContent =
        String(qty);

    }


    if (sumProduct) {

      sumProduct.textContent =
        `₹${pricing.offerTotal.toLocaleString('en-IN')}`;

    }


    if (sumDelivery) {

      sumDelivery.textContent =
        'FREE';

    }


    if (sumTotal) {

      sumTotal.textContent =
        `₹${pricing.offerTotal.toLocaleString('en-IN')}`;

    }


    if (mobilePrice) {

      mobilePrice.textContent =
        `₹${pricing.offerTotal.toLocaleString('en-IN')}`;

    }


    updateOfferDisplay(
      pricing
    );

  }


  /* =========================================================
     QUANTITY INPUT
     ========================================================= */

  if (qtyInput) {

    qtyInput.addEventListener(
      'input',
      () => {

        let value =
          parseInt(
            qtyInput.value,
            10
          );


        if (
          Number.isNaN(value) ||
          value < 1
        ) {

          value = 1;

        }


        if (value > 10) {

          value = 10;

        }


        qty = value;

        renderSummary();

      }
    );


    qtyInput.addEventListener(
      'blur',
      () => {

        if (!qtyInput.value) {

          qty = 1;

          renderSummary();

        }

      }
    );

  }


  /* =========================================================
     PLUS
     ========================================================= */

  if (qtyPlus) {

    qtyPlus.type =
      'button';


    qtyPlus.addEventListener(
      'click',
      event => {

        event.preventDefault();

        event.stopPropagation();


        if (qty < 10) {

          qty += 1;

          renderSummary();

        }

      }
    );

  }


  /* =========================================================
     MINUS
     ========================================================= */

  if (qtyMinus) {

    qtyMinus.type =
      'button';


    qtyMinus.addEventListener(
      'click',
      event => {

        event.preventDefault();

        event.stopPropagation();


        if (qty > 1) {

          qty -= 1;

          renderSummary();

        }

      }
    );

  }


  /* =========================================================
     INITIAL SUMMARY
     ========================================================= */

  renderSummary();


  /* =========================================================
     ORDER FORM
     ========================================================= */

  const form =
    document.getElementById(
      'orderForm'
    );


  const processingModal =
    document.getElementById(
      'processingModal'
    );


  const confirmModal =
    document.getElementById(
      'confirmModal'
    );


  const orderIdDisplay =
    document.getElementById(
      'orderIdDisplay'
    );


  const closeConfirm =
    document.getElementById(
      'closeConfirm'
    );


  /* =========================================================
     FIELD ERROR
     ========================================================= */

  function setError(
    fieldEl,
    message
  ) {

    if (!fieldEl) {
      return;
    }


    const wrap =
      fieldEl.closest(
        '.field'
      );


    if (!wrap) {
      return;
    }


    wrap.classList.toggle(
      'error',
      Boolean(message)
    );


    const msg =
      wrap.querySelector(
        '.err-msg'
      );


    if (msg) {

      msg.textContent =
        message || '';

    }

  }


  /* =========================================================
     FORM VALIDATION
     ========================================================= */

  function validateForm() {

    if (!form) {
      return false;
    }


    let valid = true;


    const name =
      document.getElementById(
        'fullName'
      );

    const mobile =
      document.getElementById(
        'mobile'
      );

    const email =
      document.getElementById(
        'email'
      );

    const address =
      document.getElementById(
        'address'
      );

    const city =
      document.getElementById(
        'city'
      );

    const state =
      document.getElementById(
        'state'
      );

    const pincode =
      document.getElementById(
        'pincode'
      );


    if (
      name &&
      !name.value.trim()
    ) {

      setError(
        name,
        'Please enter your name'
      );

      valid = false;

    } else {

      setError(
        name,
        ''
      );

    }


    if (
      mobile &&
      !/^[6-9]\d{9}$/.test(
        mobile.value.trim()
      )
    ) {

      setError(
        mobile,
        'Enter a valid 10-digit mobile number'
      );

      valid = false;

    } else {

      setError(
        mobile,
        ''
      );

    }


    if (
      email &&
      email.value.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.value.trim()
      )
    ) {

      setError(
        email,
        'Enter a valid email'
      );

      valid = false;

    } else {

      setError(
        email,
        ''
      );

    }


    if (
      address &&
      !address.value.trim()
    ) {

      setError(
        address,
        'Please enter your address'
      );

      valid = false;

    } else {

      setError(
        address,
        ''
      );

    }


    if (
      city &&
      !city.value.trim()
    ) {

      setError(
        city,
        'Please enter your city'
      );

      valid = false;

    } else {

      setError(
        city,
        ''
      );

    }


    if (
      state &&
      !state.value.trim()
    ) {

      setError(
        state,
        'Please enter your state'
      );

      valid = false;

    } else {

      setError(
        state,
        ''
      );

    }


    if (
      pincode &&
      !/^\d{6}$/.test(
        pincode.value.trim()
      )
    ) {

      setError(
        pincode,
        'Enter a valid 6-digit pincode'
      );

      valid = false;

    } else {

      setError(
        pincode,
        ''
      );

    }


    return valid;

  }


  /* =========================================================
     PROCESSING MODAL
     ========================================================= */

  function openProcessing() {

    if (processingModal) {

      processingModal.classList.add(
        'open'
      );

    }

  }


  function closeProcessing() {

    if (processingModal) {

      processingModal.classList.remove(
        'open'
      );

    }

  }


  /* =========================================================
     CONFIRMATION
     ========================================================= */

  function showConfirmation(
    orderId
  ) {

    if (orderIdDisplay) {

      orderIdDisplay.textContent =
        `Order ID: ${orderId}`;

    }


    if (confirmModal) {

      confirmModal.classList.add(
        'open'
      );

    }

  }


  /* =========================================================
     LIVE RAZORPAY PAYMENT
     ========================================================= */

  async function startPayment(
    orderPayload
  ) {

    openProcessing();


    try {

      console.log(
        'Creating Dhaan order...',
        orderPayload
      );


      /*
        Create Razorpay order
      */

      const controller =
        new AbortController();


      const timeout =
        setTimeout(
          () => controller.abort(),
          30000
        );


      const response =
        await fetch(
          `${API_URL}/api/create-order`,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body:
              JSON.stringify(
                orderPayload
              ),

            signal:
              controller.signal
          }
        );


      clearTimeout(timeout);


      let order;


      try {

        order =
          await response.json();

      } catch (jsonError) {

        throw new Error(
          'Invalid response from Dhaan payment server.'
        );

      }


      console.log(
        'Backend order response:',
        order
      );


      if (!response.ok) {

        throw new Error(
          order.error ||
          order.message ||
          'Could not create payment order.'
        );

      }


      if (
        order.paymentEnabled === false
      ) {

        throw new Error(
          order.message ||
          'Razorpay payment is currently unavailable.'
        );

      }


      if (
        !order.id ||
        !order.amount ||
        !order.key
      ) {

        throw new Error(
          'Invalid Razorpay order response from server.'
        );

      }


      /* =====================================================
         AMOUNT SAFETY CHECK
         ===================================================== */

      const expectedAmountPaise =
        Math.round(
          Number(
            orderPayload.total
          ) * 100
        );


      const backendAmountPaise =
        Number(
          order.amount
        );


      console.log(
        'Expected amount:',
        expectedAmountPaise
      );

      console.log(
        'Backend amount:',
        backendAmountPaise
      );


      if (
        backendAmountPaise !==
        expectedAmountPaise
      ) {

        throw new Error(
          `Payment amount mismatch. Expected ₹${orderPayload.total}, but backend created ₹${(
            backendAmountPaise / 100
          ).toFixed(2)}.`
        );

      }


      /* =====================================================
         CHECK RAZORPAY SCRIPT
         ===================================================== */

      if (
        typeof window.Razorpay !==
        'function'
      ) {

        throw new Error(
          'Razorpay checkout could not be loaded. Please refresh and try again.'
        );

      }


      /* =====================================================
         RAZORPAY OPTIONS
         ===================================================== */

      const options = {

        key:
          order.key,

        amount:
          order.amount,

        currency:
          order.currency ||
          'INR',

        name:
          'Dhaan Foods',

        description:
          'Dhaan Smart Start Health Mix',

        image:
          'assets/img/logo.png',

        order_id:
          order.id,


        prefill: {

          name:
            orderPayload.fullName,

          contact:
            orderPayload.mobile,

          email:
            orderPayload.email || ''

        },


        notes: {

          product:
            orderPayload.product,

          quantity:
            String(
              orderPayload.quantity
            )

        },


        theme: {

          color:
            '#83182A'

        },


        modal: {

          ondismiss:
            function () {

              closeProcessing();

              console.log(
                'Razorpay checkout closed.'
              );

            }

        },


        handler:
          async function (
            razorpayResponse
          ) {

            try {

              console.log(
                'Payment successful:',
                razorpayResponse
              );


              /*
                Verify payment on backend
              */

              const verifyResponse =
                await fetch(
                  `${API_URL}/api/verify-payment`,
                  {
                    method: 'POST',

                    headers: {
                      'Content-Type':
                        'application/json'
                    },

                    body:
                      JSON.stringify({

                        razorpay_order_id:
                          razorpayResponse.razorpay_order_id,

                        razorpay_payment_id:
                          razorpayResponse.razorpay_payment_id,

                        razorpay_signature:
                          razorpayResponse.razorpay_signature,

                        orderPayload:
                          orderPayload

                      })

                  }
                );


              let verifyData;


              try {

                verifyData =
                  await verifyResponse.json();

              } catch (jsonError) {

                throw new Error(
                  'Invalid payment verification response.'
                );

              }


              console.log(
                'Payment verification:',
                verifyData
              );


              if (
                !verifyResponse.ok ||
                verifyData.success === false
              ) {

                throw new Error(
                  verifyData.error ||
                  verifyData.message ||
                  'Payment verification failed.'
                );

              }


              closeProcessing();


              /*
                Send customer to thank-you page
              */

              const params =
                new URLSearchParams({

                  order_id:
                    razorpayResponse.razorpay_order_id,

                  payment_id:
                    razorpayResponse.razorpay_payment_id

                });


              window.location.href =
                `thank-you.html?${params.toString()}`;

            } catch (error) {

              closeProcessing();


              console.error(
                'Payment verification error:',
                error
              );


              alert(
                error.message ||
                'Payment verification failed. Please contact Dhaan Foods if money was deducted.'
              );

            }

          }

      };


      /* =====================================================
         CREATE RAZORPAY INSTANCE
         ===================================================== */

      const razorpay =
        new window.Razorpay(
          options
        );


      /* =====================================================
         PAYMENT FAILED
         ===================================================== */

      razorpay.on(
        'payment.failed',
        function (response) {

          closeProcessing();


          console.error(
            'Razorpay payment failed:',
            response
          );


          alert(
            response.error?.description ||
            'Payment failed. Please try again.'
          );

        }
      );


      /* =====================================================
         OPEN RAZORPAY
         ===================================================== */

      closeProcessing();

      razorpay.open();


    } catch (error) {

      closeProcessing();


      console.error(
        'Payment initialization error:',
        error
      );


      if (
        error.name ===
        'AbortError'
      ) {

        alert(
          'The payment server is taking too long to respond. Please try again.'
        );

        return;

      }


      alert(
        error.message ||
        'Could not start payment. Please try again.'
      );

    }

  }


  /* =========================================================
     ORDER FORM SUBMIT
     ========================================================= */

  if (form) {

    form.addEventListener(
      'submit',
      event => {

        event.preventDefault();


        if (!validateForm()) {

          const firstError =
            form.querySelector(
              '.field.error input, .field.error textarea, .field.error select'
            );


          if (firstError) {

            firstError.focus();

          }


          return;

        }


        const pricing =
          getPricing(qty);


        const payload = {

          product:
            'Dhaan Smart Start Health Mix (500g)',

          quantity:
            qty,

          unitPrice:
            UNIT_PRICE,

          regularTotal:
            pricing.regularTotal,

          discount:
            pricing.discount,

          delivery:
            pricing.delivery,

          total:
            pricing.offerTotal,

          fullName:
            document
              .getElementById('fullName')
              .value
              .trim(),

          mobile:
            document
              .getElementById('mobile')
              .value
              .trim(),

          email:
            document
              .getElementById('email')
              .value
              .trim(),

          address:
            document
              .getElementById('address')
              .value
              .trim(),

          city:
            document
              .getElementById('city')
              .value
              .trim(),

          state:
            document
              .getElementById('state')
              .value
              .trim(),

          pincode:
            document
              .getElementById('pincode')
              .value
              .trim()

        };


        console.log(
          'Dhaan order payload:',
          payload
        );


        console.log(
          `Quantity: ${qty}`
        );


        console.log(
          `Original price: ₹${pricing.regularTotal}`
        );


        console.log(
          `Discount: ₹${pricing.discount}`
        );


        console.log(
          `Final payment: ₹${pricing.offerTotal}`
        );


        startPayment(
          payload
        );

      }
    );

  }


  /* =========================================================
     CLOSE CONFIRMATION
     ========================================================= */

  if (closeConfirm) {

    closeConfirm.addEventListener(
      'click',
      () => {

        if (confirmModal) {

          confirmModal.classList.remove(
            'open'
          );

        }


        if (form) {

          form.reset();

        }


        const state =
          document.getElementById(
            'state'
          );


        if (state) {

          state.value =
            'Tamil Nadu';

        }


        qty = 1;

        renderSummary();


        window.scrollTo({

          top: 0,

          behavior: 'smooth'

        });

      }
    );

  }


  /* =========================================================
     NEWSLETTER
     ========================================================= */

  const newsletterForm =
    document.getElementById(
      'newsletterForm'
    );


  if (newsletterForm) {

    newsletterForm.addEventListener(
      'submit',
      event => {

        event.preventDefault();


        const input =
          newsletterForm.querySelector(
            'input'
          );


        if (input) {

          input.value = '';

          input.placeholder =
            'Thanks for subscribing!';

        }

      }
    );

  }


  /* =========================================================
     BACKEND HEALTH CHECK
     ========================================================= */

  /*
    This runs AFTER API_URL is declared.
    It will NOT block the website from loading.
  */

  fetch(
    `${API_URL}/api/health`,
    {
      method: 'GET',
      cache: 'no-store'
    }
  )
    .then(response => {

      console.log(
        'Dhaan backend status:',
        response.ok
          ? 'ONLINE'
          : 'UNAVAILABLE'
      );

    })
    .catch(error => {

      console.warn(
        'Dhaan backend health check failed:',
        error.message
      );

    });


  /* =========================================================
     FINAL INITIALIZATION MESSAGE
     ========================================================= */

  console.log(
    'Dhaan Foods main.js loaded successfully.'
  );

});
