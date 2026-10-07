async function startPayment(orderPayload) {

  if (processingModal) {
    processingModal.classList.add("open");
  }

  try {

    console.log(
      "Creating Dhaan order...",
      orderPayload
    );


    /* =====================================================
       CREATE BACKEND ORDER
       ===================================================== */

    const controller =
      new AbortController();

    const timeout =
      setTimeout(() => {
        controller.abort();
      }, 30000);


    let response;

    try {

      response =
        await fetch(
          `${API_URL}/api/create-order`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify(
                orderPayload
              ),

            signal:
              controller.signal,

            cache:
              "no-store"

          }
        );

    } finally {

      clearTimeout(timeout);

    }


    /* =====================================================
       READ RESPONSE
       ===================================================== */

    let order;

    try {

      order =
        await response.json();

    } catch (jsonError) {

      throw new Error(
        "Invalid response from Dhaan server."
      );

    }


    console.log(
      "Backend order response:",
      order
    );


    /* =====================================================
       SERVER ERROR
       ===================================================== */

    if (!response.ok) {

      throw new Error(
        order.error ||
        "Could not create order."
      );

    }


    /* =====================================================
       RAZORPAY ENABLED CHECK
       ===================================================== */

    if (!order.paymentEnabled) {

      throw new Error(
        order.message ||
        "Online payment is currently unavailable."
      );

    }


    /* =====================================================
       VALID RAZORPAY ORDER CHECK
       ===================================================== */

    if (
      !order.id ||
      !order.amount ||
      !order.key
    ) {

      throw new Error(
        "Invalid Razorpay order response."
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
      typeof window.Razorpay ===
      "undefined"
    ) {

      throw new Error(
        "Razorpay Checkout script is not loaded."
      );

    }


    /* =====================================================
       CLOSE PROCESSING MODAL
       ===================================================== */

    if (processingModal) {

      processingModal.classList.remove(
        "open"
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
        order.currency || "INR",

      name:
        "Dhaan Foods",

      description:
        "Dhaan Smart Start Health Mix",

      order_id:
        order.id,


      /* ---------------------------------------------------
         CUSTOMER PREFILL
         --------------------------------------------------- */

      prefill: {

        name:
          orderPayload.fullName,

        contact:
          orderPayload.mobile,

        email:
          orderPayload.email || ""

      },


      /* ---------------------------------------------------
         NOTES
         --------------------------------------------------- */

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


      /* ---------------------------------------------------
         THEME
         --------------------------------------------------- */

      theme: {

        color:
          "#6B1420"

      },


      /* ===================================================
         PAYMENT SUCCESS
         =================================================== */

      handler:
        async function (
          paymentResponse
        ) {

          console.log(
            "Razorpay payment response:",
            paymentResponse
          );


          try {

            if (processingModal) {

              processingModal.classList.add(
                "open"
              );

            }


            /* =============================================
               VERIFY PAYMENT
               ============================================= */

            const verifyResponse =
              await fetch(
                `${API_URL}/api/verify-payment`,
                {

                  method:
                    "POST",

                  headers: {
                    "Content-Type":
                      "application/json"
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

                    }),

                  cache:
                    "no-store"

                }
              );


            let verifyData;

            try {

              verifyData =
                await verifyResponse.json();

            } catch (jsonError) {

              throw new Error(
                "Invalid payment verification response."
              );

            }


            console.log(
              "Payment verification response:",
              verifyData
            );


            /* =============================================
               CHECK VERIFICATION
               ============================================= */

            if (
              !verifyResponse.ok ||
              !verifyData.success
            ) {

              throw new Error(
                verifyData.error ||
                "Payment verification failed."
              );

            }


            /* =============================================
               PAYMENT VERIFIED
               ============================================= */

            if (processingModal) {

              processingModal.classList.remove(
                "open"
              );

            }


            /* =============================================
               CONFIRMED ORDER ID
               ============================================= */

            const confirmedOrderId =
              verifyData.orderId ||
              order.orderId;


            /* =============================================
               CONFIRMED AMOUNT
               ============================================= */

            const confirmedAmount =
              Number(
                order.amount || 0
              ) / 100 ||
              Number(
                orderPayload.total || 0
              );


            /* =============================================
               THANK YOU PAGE DATA
               ============================================= */

            const thankYouParams =
              new URLSearchParams({

                orderId:
                  confirmedOrderId || "",

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
                  "",

                email:
                  orderPayload.email ||
                  "",

                mobile:
                  orderPayload.mobile ||
                  "",

                address:
                  orderPayload.address ||
                  "",

                city:
                  orderPayload.city ||
                  "",

                state:
                  orderPayload.state ||
                  "",

                pincode:
                  orderPayload.pincode ||
                  "",

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


            /* =============================================
               REDIRECT
               ============================================= */

            window.location.href =
              `thank-you.html?${thankYouParams.toString()}`;


          } catch (error) {

            if (processingModal) {

              processingModal.classList.remove(
                "open"
              );

            }


            console.error(
              "Payment verification error:",
              error
            );


            alert(
              error.message ||
              "Payment verification failed. Please contact Dhaan Foods if money was deducted."
            );

          }

        },


      /* ===================================================
         PAYMENT WINDOW CLOSED
         =================================================== */

      modal: {

        ondismiss:
          function () {

            if (processingModal) {

              processingModal.classList.remove(
                "open"
              );

            }

            console.log(
              "Razorpay checkout closed."
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
      "payment.failed",
      function (response) {

        console.error(
          "Razorpay payment failed:",
          response.error
        );


        if (processingModal) {

          processingModal.classList.remove(
            "open"
          );

        }


        alert(
          response.error?.description ||
          "Payment failed. Please try again."
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
        "open"
      );

    }


    console.error(
      "Payment initialization error:",
      error
    );


    if (
      error.name ===
      "AbortError"
    ) {

      alert(
        "The payment server is taking too long to respond. Please try again."
      );

      return;

    }


    alert(
      error.message ||
      "Could not start payment. Please try again."
    );

  }

}
