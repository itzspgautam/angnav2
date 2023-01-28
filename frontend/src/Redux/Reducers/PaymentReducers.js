import {
  GET_DONATOIN_FAIL,
  GET_DONATOIN_REQUEST,
  GET_DONATOIN_SUCCESS,
} from "../Constants/AdminConstants";
import {
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  PAYMENT_FAIL,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
  PAYMENT_VERIFY,
} from "../Constants/Constants";

const initialState = {
  paymentLoading: false,
  payment: null,
  paymentStatus: null,
  payments: null,
  error: null,
  success: null,
};

export const PaymentReducers = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_REQUEST:
      return {
        ...state,
        paymentStatus: "initial",
        paymentLoading: true,
      };
    case PAYMENT_VERIFY:
      return {
        ...state,
        paymentLoading: true,
        paymentStatus: "verify",
        payment: action.payload.payment,
      };
    case PAYMENT_SUCCESS:
      return {
        ...state,
        paymentLoading: false,
        paymentStatus: "success",
        payment: action.payload.payment,
      };
    case PAYMENT_FAIL:
      return {
        ...state,
        paymentLoading: false,
        paymentStatus: "failed",
        error: action.payload.error,
      };

    //get payments
    case GET_DONATOIN_REQUEST:
      return {
        ...state,
        paymentLoading: true,
      };
    case GET_DONATOIN_SUCCESS:
      return {
        ...state,
        paymentLoading: false,
        payments: action.payload.payments,
      };
    case GET_DONATOIN_FAIL:
      return {
        ...state,
        paymentLoading: false,
        error: action.payload.error,
      };

    //clear error
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    //clear success
    case CLEAR_SUCCESS:
      return {
        ...state,
        success: null,
      };

    default:
      return state;
  }
};
