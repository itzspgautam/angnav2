import { CLEAR_ERROR, CLEAR_SUCCESS } from "../Constants/Constants";
import {
  MEET_REGISTER_FAIL,
  MEET_REGISTER_REQUEST,
  MEET_REGISTER_SUCCESS,
} from "../Constants/ModsConstants";

const initialState = {
  meetLoading: false,
  registered: null,
  error: null,
  success: null,
};

export const MeetReducers = (state = initialState, action) => {
  switch (action.type) {
    case MEET_REGISTER_REQUEST:
      return {
        ...state,
        meetLoading: true,
      };
    case MEET_REGISTER_SUCCESS:
      return {
        ...state,
        meetLoading: false,
        registered: action.payload.registered,
        success: "Registered successfully!",
      };

    case MEET_REGISTER_FAIL:
      return {
        ...state,
        meetLoading: false,
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
