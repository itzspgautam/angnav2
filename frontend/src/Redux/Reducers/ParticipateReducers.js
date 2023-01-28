import {
  DELETE_PART_FAIL,
  DELETE_PART_REQUEST,
  DELETE_PART_SUCCESS,
  GET_PARTS_FAIL,
  GET_PARTS_REQUEST,
  GET_PARTS_SUCCESS,
} from "../Constants/AdminConstants";
import {
  GET_PART_REQUEST,
  GET_PART_SUCCESS,
  GET_PART_FAIL,
  NEW_PART_REQUEST,
  NEW_PART_SUCCESS,
  NEW_PART_FAIL,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  MY_PART_REQUEST,
  MY_PART_SUCCESS,
  MY_PART_FAIL,
} from "../Constants/Constants";

const initialState = {
  allParts: null,
  partLoading: false,
  currentParticipation: null,
  newParticipation: {
    fileUpload: null,
    participation: null,
  },
  myParticipation: null,
  participateError: null,
  deleteLoading: false,
  error: null,
};

export const ParticipateReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PART_REQUEST:
      return {
        ...state,
        partLoading: true,
      };
    case GET_PART_SUCCESS:
      return {
        ...state,
        partLoading: false,
        currentParticipation: action.payload.particiation,
      };
    case GET_PART_FAIL:
      return {
        ...state,
        partLoading: false,
        error: action.payload.error,
      };

    //New PArticipation
    case NEW_PART_REQUEST:
      return {
        ...state,
        partLoading: true,
        newParticipation: {
          fileUpload: action.payload.status,
          participation: null,
        },
      };
    case NEW_PART_SUCCESS:
      return {
        ...state,
        partLoading: false,
        newParticipation: {
          fileUpload: null,
          participation: action.payload.participation,
        },
      };
    case NEW_PART_FAIL:
      return {
        ...state,
        partLoading: false,
        newParticipation: {
          fileUpload: null,
          participation: null,
        },
        participateError: action.payload.error,
      };

    //get My participation
    case MY_PART_REQUEST:
      return {
        ...state,
        partLoading: true,
      };
    case MY_PART_SUCCESS:
      return {
        ...state,
        partLoading: false,
        myParticipation: action.payload.myParticiation,
      };
    case MY_PART_FAIL:
      return {
        ...state,
        partLoading: false,
        error: action.payload.error,
      };

    //get all participation => admin
    case GET_PARTS_REQUEST:
      return {
        ...state,
        partLoading: true,
      };
    case GET_PARTS_SUCCESS:
      return {
        ...state,
        partLoading: false,
        allParts: action.payload.participations,
      };
    case GET_PARTS_FAIL:
      return {
        ...state,
        partLoading: false,
        error: action.payload.error,
      };

    //delete Part
    case DELETE_PART_REQUEST:
      return {
        ...state,
        deleteLoading: true,
      };
    case DELETE_PART_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        success: "Participation Deleted successfully!",
        allParts: action.payload.participations,
      };
    case DELETE_PART_FAIL:
      return {
        ...state,
        deleteLoading: false,
        error: action.payload.error,
      };

    //clear error
    case CLEAR_ERROR:
      return {
        ...state,
        participateError: null,
        error: null,
      };

    //clear error
    case CLEAR_SUCCESS:
      return {
        ...state,
        success: null,
      };

    default:
      return state;
  }
};
