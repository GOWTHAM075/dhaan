/* =========================================================
   DHAAN — main.js
   Razorpay Payment + Render Backend Integration
   Quantity + Offer Pricing + Thank You Page
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     BACKEND CONFIGURATION
     ========================================================= */

  const API_URL =
    'https://dhaan-backend.onrender.com';


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

    playOverlay.addEventListener(
      'click',
      () => {

        promoVideo.muted = false;

        promoVideo
          .play()
          .catch(() => {});

        playOverlay.classList.add(
          'hidden'
        );


        if (promoMuteToggle) {

          promoMuteToggle.style.display =
            'flex';

        }


        if (promoIconMuted) {

          promoIconMuted.style.display =
            'none';

        }


        if (promoIconUnmuted) {

          promoIconUnmuted.style.display =
            'block';

        }

      }
    );


    promoVideo.addEventListener(
      'click',
      () => {

        if (promoVideo.paused) {

          promoVideo
            .play()
            .catch(() => {});

        } else {

          promoVideo.pause();

        }

      }
    );


    promoVideo.addEventListener(
      'ended',
      () => {

        playOverlay.classList.remove(
          'hidden'
        );


        if (promoMuteToggle) {

          promoMuteToggle.style.display =
            'none';

        }

      }
    );


    if (promoMuteToggle) {

      promoMuteToggle.addEventListener(
        'click',
        () => {

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

        }
      );

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

    muteToggle.addEventListener(
      'click',
      () => {

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

      }
    );


    heroVideo
      .play()
      .catch(() => {});

  }


  /* =========================================================
     MOBILE NAV
     ========================================================= */

  const navToggle =
    document.getElementById('navToggle');

  const header =
    document.getElementById('siteHeader');


  if (navToggle && header) {

    navToggle.addEventListener(
      'click',
      () => {

        header.classList.toggle(
          'menu-open'
        );

      }
    );


    document
      .querySelectorAll(
        '.mobile-menu a'
      )
      .forEach(a => {

        a.addEventListener(
          'click',
          () => {

            header.classList.remove(
              'menu-open'
            );

          }
        );

      });

  }


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
    navAnchors.length
  ) {

    const spy =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            navAnchors.forEach(a => {

              a.classList.remove(
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


  if (revealEls.length) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              !entry.isIntersecting
            ) {

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
          threshold: 0.12
        }
      );


    revealEls.forEach(el => {

      revealObserver.observe(el);

    });

  }


  /* =========================================================
     COUNT-UP STATS
     ========================================================= */

  const counters =
    document.querySelectorAll(
      '[data-count]'
    );


  if (counters.length) {

    const countObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            const el =
              entry.target;


            const target =
              parseInt(
                el.dataset.count,
                10
              );


            const duration =
              1400;


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


              el.textContent =
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
              el
            );

          });

        },
        {
          threshold: 0.6
        }
      );


    counters.forEach(el => {

      countObserver.observe(el);

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

    [
      '05-sprouted-ragi',
      'Sprouted Ragi'
    ],

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

    [
      '11-soy-beans',
      'Soy Beans'
    ],

    [
      '12-groundnut',
      'Groundnut'
    ],

    [
      '13-kidney-beans',
      'Kidney Beans'
    ],

    [
      '14-bengal-gram',
      'Bengal Gram'
    ],

    [
      '15-cardamom',
      'Cardamom'
    ],

    [
      '16-foxtail-millet',
      'Foxtail Millet'
    ],

    [
      '17-dry-ginger',
      'Dry Ginger'
    ],

    [
      '18-white-sorghum',
      'White Sorghum'
    ],

    [
      '19-red-rice',
      'Red Rice'
    ],

    [
      '20-corn',
      'Corn'
    ],

    [
      '21-black-rice',
      'Black Rice'
    ],

    [
      '22-pumpkin-seeds',
      'Pumpkin Seeds'
    ],

    [
      '23-sago',
      'Sago'
    ],

    [
      '24-blackeyed-pea',
      'Blackeyed Pea'
    ],

    [
      '25-rice',
      'Rice'
    ],

    [
      '26-dry-dates',
      'Dry Dates'
    ]

  ];


  const ingGrid =
    document.getElementById(
      'ingGrid'
    );


  if (ingGrid) {

    ingGrid.innerHTML =
      ingredients
        .map(
          ([file, name], i) => `

            <div class="ing-card">

              <div class="thumb">

                <span class="num">
                  ${i + 1}
                </span>

                <img
                  src="assets/ingredients/${file}.jpg"
                  alt="${name}"
                  loading="lazy"
                >

              </div>

              <p>${name}</p>

            </div>

          `
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
        'Very good taste and easy to prepare. The ingredients feel natural and the whole family enjoys it.'
    },

    {
      name: 'Meena S',
      city: 'Bengaluru',
      rating: 5,
      text:
        'I have been using Dhaan regularly and really like the taste. It is convenient for busy mornings.'
    },

    {
      name: 'Karthik R',
      city: 'Madurai',
      rating: 5,
      text:
        'Good quality health mix. Delivery was quick and the packaging was neat.'
    },

    {
      name: 'Divya M',
      city: 'Salem',
      rating: 5,
      text:
        'My kids enjoy it and I feel comfortable giving it to them. The flavour is mild and pleasant.'
    },

    {
      name: 'Suresh P',
      city: 'Erode',
      rating: 5,
      text:
        'A convenient breakfast option with a nice combination of ingredients.'
    }

  ];


  const reviewsGrid =
    document.getElementById(
      'reviewsGrid'
    );


  if (reviewsGrid) {

    reviewsGrid.innerHTML =
      reviews
        .map(
          review => `

            <div class="review-card">

              <div class="review-top">

                <div>

                  <strong>
                    ${review.name}
                  </strong>

                  <span>
                    ${review.city}
                  </span>

                </div>

                <div class="stars">
                  ${'★'.repeat(
                    review.rating
                  )}
                </div>

              </div>

              <p>
                “${review.text}”
              </p>

            </div>

          `
        )
        .join('');

  }


  /* =========================================================
     ORDER / QUANTITY / OFFER PRICING
     ========================================================= */

  let qty = 1;


  /* -----------------------------------------
     NORMAL SINGLE PACK PRICE
     ----------------------------------------- */

  const UNIT_PRICE = 349;


  /* -----------------------------------------
     TWO PACK OFFER
     -----------------------------------------

     1 PACK
     ₹349

     2 PACKS
     Original ₹700
     Offer   ₹598
     Save    ₹102

     3 PACKS
     ₹598 + ₹349 = ₹947

     4 PACKS
     ₹598 + ₹598 = ₹1196
     ----------------------------------------- */

  const TWO_PACK_ORIGINAL =
    700;

  const TWO_PACK_OFFER =
    598;


  const DELIVERY =
    0;


  /* =========================================================
     IMPORTANT IDs
     ========================================================= */

  const qtyMinus =
    document.getElementById(
      'qtyMinus'
    );

  const qtyPlus =
    document.getElementById(
      'qtyPlus'
    );

  const qtyInput =
    document.getElementById(
      'qtyInput'
    );

  const sumQty =
    document.getElementById(
      'sumQty'
    );

  const sumProduct =
    document.getElementById(
      'sumProduct'
    );

  const sumTotal =
    document.getElementById(
      'sumTotal'
    );

  const sumDelivery =
    document.getElementById(
      'sumDelivery'
    );


  /* =========================================================
     GET OFFER PRICING
     ========================================================= */

  function getPricing(quantity) {

    quantity =
      Number(quantity) || 1;


    /* -----------------------------------------
       1 PACK
       ----------------------------------------- */

    if (quantity === 1) {

      return {

        regularTotal:
          349,

        discount:
          0,

        offerTotal:
          349,

        delivery:
          0

      };

    }


    /* -----------------------------------------
       2 OR MORE PACKS

       Every pair = ₹598

       Remaining single pack = ₹349
       ----------------------------------------- */

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
     CREATE / UPDATE OFFER ROW
     ========================================================= */

  function updateOfferDisplay(
    pricing
  ) {

    if (!sumProduct) {
      return;
    }


    /* -----------------------------------------
       FIND PRODUCT SUMMARY ROW
       ----------------------------------------- */

    const productRow =
      sumProduct.closest('.row');


    if (!productRow) {
      return;
    }


    /* -----------------------------------------
       CREATE DISCOUNT ROW
       IF IT DOES NOT EXIST
       ----------------------------------------- */

    let discountRow =
      document.getElementById(
        'discountRow'
      );


    if (
      pricing.discount > 0
    ) {

      if (!discountRow) {

        discountRow =
          document.createElement(
            'div'
          );

        discountRow.id =
          'discountRow';

        discountRow.className =
          'row';


        discountRow.innerHTML = `

          <span>
            Offer Discount
          </span>

          <span
            id="sumDiscount"
          >
            -₹${pricing.discount.toLocaleString('en-IN')}
          </span>

        `;


        productRow.insertAdjacentElement(
          'afterend',
          discountRow
        );

      }


      const discountAmount =
        document.getElementById(
          'sumDiscount'
        );


      if (discountAmount) {

        discountAmount.textContent =
          `-₹${pricing.discount.toLocaleString('en-IN')}`;

      }


      discountRow.style.display =
        'flex';

    } else {

      if (discountRow) {

        discountRow.style.display =
          'none';

      }

    }


    /* -----------------------------------------
       PRODUCT DISPLAY
       ----------------------------------------- */

    if (
      qty === 1
    ) {

      sumProduct.textContent =
        '₹349';

    } else if (
      qty === 2
    ) {

      sumProduct.innerHTML = `

        <del
          style="
            opacity:0.6;
            margin-right:8px;
            font-size:0.9em;
          "
        >
          ₹700
        </del>

        <strong>
          ₹598
        </strong>

      `;

    } else {

      sumProduct.innerHTML = `

        <del
          style="
            opacity:0.6;
            margin-right:8px;
            font-size:0.9em;
          "
        >
          ₹${pricing.regularTotal.toLocaleString('en-IN')}
        </del>

        <strong>
          ₹${pricing.offerTotal.toLocaleString('en-IN')}
        </strong>

      `;

    }

  }


  /* =========================================================
     RENDER ORDER SUMMARY
     ========================================================= */

  function renderSummary() {

    /* -----------------------------------------
       QUANTITY INPUT
       ----------------------------------------- */

    if (qtyInput) {

      qtyInput.value =
        String(qty);

    }


    /* -----------------------------------------
       SUMMARY QUANTITY
       ----------------------------------------- */

    if (sumQty) {

      sumQty.textContent =
        String(qty);

    }


    /* -----------------------------------------
       GET PRICING
       ----------------------------------------- */

    const pricing =
      getPricing(qty);


    /* -----------------------------------------
       UPDATE PRODUCT / OFFER
       ----------------------------------------- */

    updateOfferDisplay(
      pricing
    );


    /* -----------------------------------------
       DELIVERY
       ----------------------------------------- */

    if (sumDelivery) {

      sumDelivery.textContent =
        'FREE';

    }


    /* -----------------------------------------
       FINAL TOTAL
       ----------------------------------------- */

    if (sumTotal) {

      sumTotal.textContent =
        `₹${pricing.offerTotal.toLocaleString('en-IN')}`;

    }

  }


  /* =========================================================
     PLUS BUTTON
     ========================================================= */

  if (qtyPlus) {

    qtyPlus.type =
      'button';


    qtyPlus.addEventListener(
      'click',
      function (event) {

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
     MINUS BUTTON
     ========================================================= */

  if (qtyMinus) {

    qtyMinus.type =
      'button';


    qtyMinus.addEventListener(
      'click',
      function (event) {

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
     INITIAL QUANTITY
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


  const closeConfirm =
    document.getElementById(
      'closeConfirm'
    );


  const orderIdDisplay =
    document.getElementById(
      'orderIdDisplay'
    );


  /* =========================================================
     FORM VALIDATION
     ========================================================= */

  function validateForm() {

    if (!form) {

      return false;

    }


    let valid =
      true;


    const fields = [

      'fullName',

      'mobile',

      'email',

      'address',

      'city',

      'state',

      'pincode'

    ];


    fields.forEach(id => {

      const input =
        document.getElementById(
          id
        );


      if (!input) {

        return;

      }


      const value =
        input.value.trim();


      let fieldValid =
        value.length > 0;


      /* -----------------------------------------
         MOBILE
         ----------------------------------------- */

      if (
        id === 'mobile'
      ) {

        fieldValid =
          /^[6-9]\d{9}$/.test(
            value
          );

      }


      /* -----------------------------------------
         EMAIL

         Email is optional.
         ----------------------------------------- */

      if (
        id === 'email'
      ) {

        if (
          value.length === 0
        ) {

          fieldValid =
            true;

        } else {

          fieldValid =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
              value
            );

        }

      }


      /* -----------------------------------------
         PINCODE
         ----------------------------------------- */

      if (
        id === 'pincode'
      ) {

        fieldValid =
          /^\d{6}$/.test(
            value
          );

      }


      const field =
        input.closest(
          '.field'
        );


      if (field) {

        field.classList.toggle(
          'error',
          !fieldValid
        );

      }


      if (!fieldValid) {

        valid =
          false;

      }

    });


    return valid;

  }


  /* =========================================================
     SHOW CONFIRMATION MODAL
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
     REAL RAZORPAY PAYMENT
     ========================================================= */

  async function startPayment(
    orderPayload
  ) {

    if (processingModal) {

      processingModal.classList.add(
        'open'
      );

    }


    try {

      /* =====================================================
         STEP 1 — CREATE ORDER ON BACKEND
         ===================================================== */

      console.log(
        'Creating Dhaan order...'
      );


      console.log(
        'Payment amount:',
        orderPayload.total
      );


      const response =
        await fetch(
          `${API_URL}/api/create-order`,
          {

            method:
              'POST',

            headers: {

              'Content-Type':
                'application/json'

            },

            body:
              JSON.stringify(
                orderPayload
              )

          }
        );


      let order;


      try {

        order =
          await response.json();

      } catch (jsonError) {

        throw new Error(
          'Invalid response from Dhaan server.'
        );

      }


      console.log(
        'Backend order response:',
        order
      );


      /* =====================================================
         CHECK SERVER RESPONSE
         ===================================================== */

      if (!response.ok) {

        throw new Error(
          order.error ||
          'Could not create order.'
        );

      }


      /* =====================================================
         CHECK RAZORPAY ENABLED
         ===================================================== */

      if (!order.paymentEnabled) {

        throw new Error(
          order.message ||
          'Razorpay payment is not enabled on the server.'
        );

      }


      /* =====================================================
         CHECK ORDER DATA
         ===================================================== */

      if (
        !order.id ||
        !order.amount ||
        !order.key
      ) {

        throw new Error(
          'Invalid Razorpay order response.'
        );

      }


      /* =====================================================
         CHECK AMOUNT

         Frontend expected amount must match
         backend Razorpay order amount.
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
        'Expected Razorpay amount:',
        expectedAmountPaise
      );


      console.log(
        'Backend Razorpay amount:',
        backendAmountPaise
      );


      /*
        Do not allow accidental mismatch.

        Example:

        1 pack:
        expected = 34900

        2 packs:
        expected = 59800
      */

      if (
        backendAmountPaise !==
        expectedAmountPaise
      ) {

        throw new Error(
          `Payment amount mismatch. Expected ₹${orderPayload.total}, but backend created ₹${(backendAmountPaise / 100).toFixed(2)}.`
        );

      }


      /* =====================================================
         CHECK RAZORPAY SCRIPT
         ===================================================== */

      if (
        typeof window.Razorpay ===
        'undefined'
      ) {

        throw new Error(
          'Razorpay Checkout script is not loaded.'
        );

      }


      /* =====================================================
         CLOSE PROCESSING MODAL
         ===================================================== */

      if (processingModal) {

        processingModal.classList.remove(
          'open'
        );

      }


      /* =====================================================
         STEP 2 — RAZORPAY CHECKOUT
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

        order_id:
          order.id,


        /* ===================================================
           CUSTOMER DETAILS
           =================================================== */

        prefill: {

          name:
            orderPayload.fullName,

          contact:
            orderPayload.mobile,

          email:
            orderPayload.email ||
            ''

        },


        /* ===================================================
           RAZORPAY NOTES
           =================================================== */

        notes: {

          customer_name:
            orderPayload.fullName,

          customer_mobile:
            orderPayload.mobile,

          dhaan_order_id:
            order.orderId,

          quantity:
            String(
              orderPayload.quantity
            ),

          regular_total:
            String(
              orderPayload.regularTotal
            ),

          discount:
            String(
              orderPayload.discount
            ),

          offer_total:
            String(
              orderPayload.total
            )

        },


        /* ===================================================
           THEME
           =================================================== */

        theme: {

          color:
            '#6B1420'

        },


        /* ===================================================
           STEP 3 — PAYMENT SUCCESS
           =================================================== */

        handler:
          async function (
            paymentResponse
          ) {

            console.log(
              'Razorpay payment response:',
              paymentResponse
            );


            try {

              if (processingModal) {

                processingModal.classList.add(
                  'open'
                );

              }


              /* =================================================
                 STEP 4 — VERIFY PAYMENT
                 ================================================= */

              const verifyResponse =
                await fetch(
                  `${API_URL}/api/verify-payment`,
                  {

                    method:
                      'POST',

                    headers: {

                      'Content-Type':
                        'application/json'

                    },

                    body:
                      JSON.stringify({

                        razorpay_order_id:
                          paymentResponse
                            .razorpay_order_id,

                        razorpay_payment_id:
                          paymentResponse
                            .razorpay_payment_id,

                        razorpay_signature:
                          paymentResponse
                            .razorpay_signature

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
                'Payment verification response:',
                verifyData
              );


              /* =================================================
                 CHECK PAYMENT VERIFICATION
                 ================================================= */

              if (
                !verifyResponse.ok ||
                !verifyData.success
              ) {

                throw new Error(
                  verifyData.error ||
                  'Payment verification failed.'
                );

              }


              /* =================================================
                 PAYMENT VERIFIED
                 ================================================= */

              if (processingModal) {

                processingModal.classList.remove(
                  'open'
                );

              }


              /* =================================================
                 CONFIRMED ORDER ID
                 ================================================= */

              const confirmedOrderId =
                verifyData.orderId ||
                order.orderId;


              /* =================================================
                 CONFIRMED AMOUNT
                 ================================================= */

              const confirmedAmount =
                Number(
                  order.amount || 0
                ) / 100 ||
                Number(
                  orderPayload.total || 0
                );


              /* =================================================
                 SAVE COMPLETE ORDER DATA

                 Used by thank-you.html
                 ================================================= */

              const thankYouParams =
                new URLSearchParams({

                  orderId:
                    confirmedOrderId ||
                    '',

                  amount:
                    String(
                      confirmedAmount
                    ),

                  quantity:
                    String(
                      orderPayload.quantity ||
                      1
                    ),

                  name:
                    orderPayload.fullName ||
                    '',

                  email:
                    orderPayload.email ||
                    '',

                  mobile:
                    orderPayload.mobile ||
                    '',

                  address:
                    orderPayload.address ||
                    '',

                  city:
                    orderPayload.city ||
                    '',

                  state:
                    orderPayload.state ||
                    '',

                  pincode:
                    orderPayload.pincode ||
                    '',

                  regularTotal:
                    String(
                      orderPayload.regularTotal ||
                      0
                    ),

                  discount:
                    String(
                      orderPayload.discount ||
                      0
                    ),

                  offerTotal:
                    String(
                      orderPayload.total ||
                      0
                    )

                });


              /* =================================================
                 REDIRECT TO THANK YOU PAGE
                 ================================================= */

              window.location.href =
                `thank-you.html?${thankYouParams.toString()}`;

            } catch (error) {

              if (processingModal) {

                processingModal.classList.remove(
                  'open'
                );

              }


              console.error(
                'Payment verification error:',
                error
              );


              alert(
                error.message ||
                'Payment was completed, but verification failed. Please contact Dhaan support.'
              );

            }

          },


        /* =====================================================
           PAYMENT WINDOW CLOSED
           ===================================================== */

        modal: {

          ondismiss:
            function () {

              if (processingModal) {

                processingModal.classList.remove(
                  'open'
                );

              }


              console.log(
                'Razorpay checkout closed.'
              );

            }

        }

      };


      /* =====================================================
         CREATE RAZORPAY INSTANCE
         ===================================================== */

      const rzp =
        new window.Razorpay(
          options
        );


      /* =====================================================
         PAYMENT FAILED
         ===================================================== */

      rzp.on(
        'payment.failed',
        function (response) {

          console.error(
            'Razorpay payment failed:',
            response.error
          );


          if (processingModal) {

            processingModal.classList.remove(
              'open'
            );

          }


          alert(
            response.error?.description ||
            'Payment failed. Please try again.'
          );

        }
      );


      /* =====================================================
         OPEN RAZORPAY
         ===================================================== */

      rzp.open();


    } catch (error) {

      if (processingModal) {

        processingModal.classList.remove(
          'open'
        );

      }


      console.error(
        'Payment initialization error:',
        error
      );


      alert(
        error.message ||
        'Could not start payment. Please try again.'
      );

    }

  }


  /* =========================================================
     FORM SUBMIT
     ========================================================= */

  if (form) {

    form.addEventListener(
      'submit',
      e => {

        e.preventDefault();


        /* ===================================================
           VALIDATE
           =================================================== */

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


        /* ===================================================
           GET CURRENT OFFER PRICING
           =================================================== */

        const pricing =
          getPricing(qty);


        /* ===================================================
           CUSTOMER ORDER PAYLOAD
           =================================================== */

        const payload = {

          product:
            'Dhaan Smart Start Health Mix (500g)',

          quantity:
            qty,

          unitPrice:
            UNIT_PRICE,


          /* -----------------------------------------
             ORIGINAL TOTAL
             ----------------------------------------- */

          regularTotal:
            pricing.regularTotal,


          /* -----------------------------------------
             OFFER DISCOUNT
             ----------------------------------------- */

          discount:
            pricing.discount,


          /* -----------------------------------------
             FREE DELIVERY
             ----------------------------------------- */

          delivery:
            pricing.delivery,


          /* -----------------------------------------
             ACTUAL PAYMENT AMOUNT
             ----------------------------------------- */

          total:
            pricing.offerTotal,


          /* CUSTOMER */

          fullName:
            document
              .getElementById(
                'fullName'
              )
              .value
              .trim(),


          mobile:
            document
              .getElementById(
                'mobile'
              )
              .value
              .trim(),


          email:
            document
              .getElementById(
                'email'
              )
              .value
              .trim(),


          address:
            document
              .getElementById(
                'address'
              )
              .value
              .trim(),


          city:
            document
              .getElementById(
                'city'
              )
              .value
              .trim(),


          state:
            document
              .getElementById(
                'state'
              )
              .value
              .trim(),


          pincode:
            document
              .getElementById(
                'pincode'
              )
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
          `Original: ₹${pricing.regularTotal}`
        );


        console.log(
          `Discount: ₹${pricing.discount}`
        );


        console.log(
          `Final payment: ₹${pricing.offerTotal}`
        );


        /* ===================================================
           START PAYMENT
           =================================================== */

        startPayment(
          payload
        );

      }
    );

  }


  /* =========================================================
     CLOSE CONFIRMATION MODAL
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


        /* Restore default state */

        const state =
          document.getElementById(
            'state'
          );


        if (state) {

          state.value =
            'Tamil Nadu';

        }


        /* Reset quantity */

        qty = 1;


        renderSummary();


        /* Scroll to top */

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
      e => {

        e.preventDefault();


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


});
