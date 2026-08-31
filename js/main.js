/* =========================================================
   DHAAN — main.js
   Real Razorpay Payment + Render Backend Integration
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     BACKEND CONFIGURATION
     ========================================================= */

  const API_URL = 'https://dhaan-backend.onrender.com';


  /* =========================================================
     PROMO VIDEO
     ========================================================= */

  const promoVideo = document.getElementById('promoVideo');
  const playOverlay = document.getElementById('playOverlay');
  const promoMuteToggle = document.getElementById('promoMuteToggle');
  const promoIconMuted = document.getElementById('promoIconMuted');
  const promoIconUnmuted = document.getElementById('promoIconUnmuted');

  if (promoVideo && playOverlay) {

    playOverlay.addEventListener('click', () => {

      promoVideo.muted = false;

      promoVideo.play().catch(() => {});

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


    heroVideo.play().catch(() => {});

  }


  /* =========================================================
     MOBILE NAV
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


    document
      .querySelectorAll('.mobile-menu a')
      .forEach(a => {

        a.addEventListener('click', () => {

          header.classList.remove(
            'menu-open'
          );

        });

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
        (entries) => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
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
        (entries) => {

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
        (entries) => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
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
        .map(([file, name], i) => `

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

        `)
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
        'Whole family drinks it now, from my father to my daughter. Simple to prepare and doesn\'t feel like "health food".'
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
        .map(r => `

          <div class="review-card">

            <div class="stars">

              ${'★'.repeat(r.rating)}

              ${'☆'.repeat(
                5 - r.rating
              )}

            </div>

            <p class="quote">
              "${r.text}"
            </p>

            <div class="review-who">

              <span class="avatar">
                ${r.name.charAt(0)}
              </span>

              <div>

                <strong>
                  ${r.name}
                </strong>

                <span>
                  ${r.city} · Verified Buyer
                </span>

              </div>

            </div>

          </div>

        `)
        .join('');

  }


  /* =========================================================
     ORDER FORM
     ========================================================= */

  const UNIT_PRICE = 299;

  const DELIVERY = 0;

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


  function renderSummary() {

    const productTotal =
      UNIT_PRICE * qty;


    const total =
      productTotal + DELIVERY;


    if (sumQty) {

      sumQty.textContent =
        qty;

    }


    if (sumProduct) {

      sumProduct.textContent =
        `₹${productTotal}`;

    }


    if (sumDelivery) {

      sumDelivery.textContent =
        `₹${DELIVERY}`;

    }


    if (sumTotal) {

      sumTotal.textContent =
        `₹${total}`;

    }


    if (qtyInput) {

      qtyInput.value =
        qty;

    }

  }


  renderSummary();


  if (qtyMinus) {

    qtyMinus.addEventListener(
      'click',
      () => {

        qty =
          Math.max(
            1,
            qty - 1
          );


        renderSummary();

      }
    );

  }


  if (qtyPlus) {

    qtyPlus.addEventListener(
      'click',
      () => {

        qty =
          Math.min(
            10,
            qty + 1
          );


        renderSummary();

      }
    );

  }


  /* =========================================================
     VALIDATION
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
      !!message
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


  function validateForm() {

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


    if (!name || !name.value.trim()) {

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
      !mobile ||
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
      !address ||
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
      !city ||
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
      !state ||
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
      !pincode ||
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
     SHOW CONFIRMATION
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

      /* -----------------------------------------
         STEP 1 — CREATE ORDER ON BACKEND
         ----------------------------------------- */

      console.log(
        'Creating Dhaan order...'
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


      if (!response.ok) {

        throw new Error(
          order.error ||
          'Could not create order.'
        );

      }


      /* -----------------------------------------
         CHECK RAZORPAY ENABLED
         ----------------------------------------- */

      if (!order.paymentEnabled) {

        throw new Error(
          order.message ||
          'Razorpay payment is not enabled on the server.'
        );

      }


      if (
        !order.id ||
        !order.amount ||
        !order.key
      ) {

        throw new Error(
          'Invalid Razorpay order response.'
        );

      }


      /* -----------------------------------------
         CHECK RAZORPAY SCRIPT
         ----------------------------------------- */

      if (
        typeof window.Razorpay ===
        'undefined'
      ) {

        throw new Error(
          'Razorpay Checkout script is not loaded.'
        );

      }


      /* -----------------------------------------
         CLOSE PROCESSING MODAL
         ----------------------------------------- */

      if (processingModal) {

        processingModal.classList.remove(
          'open'
        );

      }


      /* -----------------------------------------
         STEP 2 — RAZORPAY CHECKOUT
         ----------------------------------------- */

      const options = {

        key:
          order.key,

        amount:
          order.amount,

        currency:
          order.currency || 'INR',

        name:
          'Dhaan Foods',

        description:
          'Dhaan Smart Start Health Mix',

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

          customer_name:
            orderPayload.fullName,

          customer_mobile:
            orderPayload.mobile,

          dhaan_order_id:
            order.orderId

        },

        theme: {

          color:
            '#6B1420'

        },


        /* ---------------------------------------
           STEP 3 — PAYMENT SUCCESS
           --------------------------------------- */

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


              /* -----------------------------------
                 STEP 4 — VERIFY PAYMENT
                 ----------------------------------- */

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


              if (
                !verifyResponse.ok ||
                !verifyData.success
              ) {

                throw new Error(
                  verifyData.error ||
                  'Payment verification failed.'
                );

              }


              /* -----------------------------------
                 PAYMENT VERIFIED
                 ----------------------------------- */

              if (processingModal) {

                processingModal.classList.remove(
                  'open'
                );

              }


              showConfirmation(
                verifyData.orderId ||
                order.orderId
              );


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
                'Payment was completed, but verification failed. Please contact Dhaan support.'
              );

            }

          },


        /* ---------------------------------------
           PAYMENT WINDOW CLOSED
           --------------------------------------- */

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


      /* -----------------------------------------
         CREATE RAZORPAY INSTANCE
         ----------------------------------------- */

      const rzp =
        new window.Razorpay(
          options
        );


      /* -----------------------------------------
         PAYMENT FAILED
         ----------------------------------------- */

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


      /* -----------------------------------------
         OPEN RAZORPAY
         ----------------------------------------- */

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
      (e) => {

        e.preventDefault();


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


        /* -----------------------------------------
           CUSTOMER ORDER PAYLOAD
           ----------------------------------------- */

        const payload = {

          product:
            'Dhaan Smart Start Health Mix (500g)',

          quantity:
            qty,

          unitPrice:
            UNIT_PRICE,

          delivery:
            DELIVERY,

          total:
            UNIT_PRICE * qty +
            DELIVERY,

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
      (e) => {

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