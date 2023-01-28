import {
  ALL_CONTEST_FAIL,
  ALL_CONTEST_REQUEST,
  ALL_CONTEST_SUCCESS,
  CLEAR_ERROR,
  SELECT_CONTEST_FAIL,
  SELECT_CONTEST_REQUEST,
  SELECT_CONTEST_SUCCESS,
} from "../Constants/Constants";

const initialState = {
  loading: false,
  contests: [],
  selectedContest: null,
  error: null,
};

export const ContestReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_CONTEST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_CONTEST_SUCCESS:
      return {
        loading: false,
        contests: action.payload.contests,
        selectedContest: null,
      };
    case ALL_CONTEST_FAIL:
      return {
        loading: false,
        error: action.payload.error,
      };

    //single contest
    case SELECT_CONTEST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SELECT_CONTEST_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedContest: action.payload.contest,
      };
    case SELECT_CONTEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    //clear error
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
