import axios from "axios";
import { CLEAR_ERROR, CLEAR_SUCCESS } from "../Constants/Constants";
import {
  MEET_REGISTER_FAIL,
  MEET_REGISTER_REQUEST,
  MEET_REGISTER_SUCCESS,
} from "../Constants/ModsConstants";

//load all event
export const registerMeetAlumni = (alumniData) => async (dispatch) => {
  dispatch({ type: MEET_REGISTER_REQUEST });

  try {
    const { data } = await axios.post("/api/v1/meets", alumniData);
    dispatch({
      type: MEET_REGISTER_SUCCESS,
      payload: { registered: data.registered },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: MEET_REGISTER_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

export const clearMeetErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
export const clearMeetSuccess = () => async (dispatch) => {
  dispatch({ type: CLEAR_SUCCESS });
};
