import axios from "axios";
import {
  ALL_CONTEST_FAIL,
  ALL_CONTEST_REQUEST,
  ALL_CONTEST_SUCCESS,
  CLEAR_ERROR,
  SELECT_CONTEST_FAIL,
  SELECT_CONTEST_REQUEST,
  SELECT_CONTEST_SUCCESS,
} from "../Constants/Constants";

//get all contest
export const getAllContest = () => async (dispatch) => {
  dispatch({ type: ALL_CONTEST_REQUEST });
  try {
    const { data } = await axios.get("/api/v1/contests");
    dispatch({
      type: ALL_CONTEST_SUCCESS,
      payload: { contests: data.contest },
    });
  } catch (error) {
    dispatch({
      type: ALL_CONTEST_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//single contest details
export const contestDetails = (id) => async (dispatch) => {
  dispatch({ type: SELECT_CONTEST_REQUEST });
  try {
    const { data } = await axios.get(`/api/v1/contest/${id}`);
    dispatch({
      type: SELECT_CONTEST_SUCCESS,
      payload: { contest: data.contest },
    });
  } catch (error) {
    dispatch({
      type: SELECT_CONTEST_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

export const clearContestErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
