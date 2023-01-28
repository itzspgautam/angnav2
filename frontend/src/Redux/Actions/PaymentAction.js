import axios from "axios";
import {
  GET_DONATOIN_FAIL,
  GET_DONATOIN_REQUEST,
  GET_DONATOIN_SUCCESS,
} from "../Constants/AdminConstants";
import {
  PAYMENT_FAIL,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
  PAYMENT_VERIFY,
} from "../Constants/Constants";
export const makePayment = (donatorData) => async (dispatch) => {
  dispatch({ type: PAYMENT_REQUEST });
  try {
    const checkoutRazorpay = async (order) => {
      var options = {
        key: "rzp_live_7nh1bbUkC4z9JQ",
        amount: order.amount * 100,
        currency: "INR",
        name: "ANGNA",
        description: donatorData.description,
        prefill: {
          name: donatorData.name,
          email: donatorData.email,
          contact: donatorData.phone,
        },
        order_id: order.id,
        image:
          "https://www.jnvangna.com/static/media/angnaCircleLogo.acb21da1d5df37f63927.png",
        theme: {
          color: "#FF868D",
        },
        handler: async (response) => {
          const payment = {
            ...response,
            payer: donatorData,
            amount: order.amount / 100,
          };

          dispatch({
            type: PAYMENT_VERIFY,
            payload: {
              payment: payment,
            },
          });
          const { data } = await axios.post("/api/v1/payment/save", {
            payment: payment,
          });
          dispatch({
            type: PAYMENT_SUCCESS,
            payload: {
              success: true,
              payment: data.payment,
            },
          });
        },
      };

      let rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        dispatch({
          type: PAYMENT_FAIL,
          payload: {
            success: false,
            payment: response.error.description,
          },
        });
      });
      rzp1.open();
    };

    const { data } = await axios.post("/api/v1/payment", {
      amount: donatorData.amount,
    });
    await checkoutRazorpay({
      ...data.order,
      donator: donatorData,
    });
  } catch (error) {
    alert("Something went wrong");
  }
};

export const getAllPayments = () => async (dispatch) => {
  dispatch({ type: GET_DONATOIN_REQUEST });
  try {
    const { data } = await axios.get("/api/v1/payments");
    dispatch({
      type: GET_DONATOIN_SUCCESS,
      payload: { payments: data.payments },
    });
  } catch (error) {
    dispatch({
      type: GET_DONATOIN_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};
