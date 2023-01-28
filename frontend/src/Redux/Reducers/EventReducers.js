import {
  CLEAR_EVENT_ERROR,
  CLEAR_EVENT_SUCCESS,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_EVENT_FAIL,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
} from "../Constants/AdminConstants";
import {
  LOAD_CATEGORY_FAIL,
  LOAD_CATEGORY_REQUEST,
  LOAD_CATEGORY_SUCCESS,
  LOAD_EVENT_FAIL,
  LOAD_EVENT_REQUEST,
  LOAD_EVENT_SUCCESS,
  SINGLE_EVENT_FAIL,
  SINGLE_EVENT_REQUEST,
  SINGLE_EVENT_SUCCESS,
} from "../Constants/Constants";

const initialState = {
  eventLoading: false,
  events: null,
  selectedEvent: null,
  categories: null,
  success: null,
  error: null,
  deleteLoading: false,
};

export const EventReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EVENT_REQUEST:
      return {
        ...state,
        eventLoading: true,
      };
    case LOAD_EVENT_SUCCESS:
      return {
        ...state,
        eventLoading: false,
        events: action.payload.events,
      };
    case LOAD_EVENT_FAIL:
      return {
        ...state,
        eventLoading: false,
        error: action.payload.error,
      };

    //single event Load
    case SINGLE_EVENT_REQUEST:
      return {
        ...state,
        eventLoading: true,
      };
    case SINGLE_EVENT_SUCCESS:
      return {
        ...state,
        eventLoading: false,
        selectedEvent: action.payload.event,
      };
    case SINGLE_EVENT_FAIL:
      return {
        ...state,
        eventLoading: false,
        error: action.payload.error,
      };

    //event Category Load
    case LOAD_CATEGORY_REQUEST:
      return {
        ...state,
        eventLoading: true,
      };
    case LOAD_CATEGORY_SUCCESS:
      return {
        ...state,
        eventLoading: false,
        categories: action.payload.categories,
      };
    case LOAD_CATEGORY_FAIL:
      return {
        ...state,
        eventLoading: false,
        error: action.payload.error,
      };

    //event Category create
    case CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        eventLoading: true,
      };
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        eventLoading: false,
        success: "Category Created successfully!",
        categories: action.payload.categories,
      };
    case CREATE_CATEGORY_FAIL:
      return {
        ...state,
        eventLoading: false,
        error: action.payload.error,
      };

    //create event
    case CREATE_EVENT_REQUEST:
      return {
        ...state,
        eventLoading: true,
      };
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        eventLoading: false,
        success: "Event Created successfully!",
        events: action.payload.events,
      };
    case CREATE_EVENT_FAIL:
      return {
        ...state,
        eventLoading: false,
        error: action.payload.error,
      };

    //Update event
    case UPDATE_EVENT_REQUEST:
      return {
        ...state,
        eventLoading: true,
      };
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        eventLoading: false,
        success: "Event Updated successfully!",
        selectedEvent: action.payload.event,
        events: action.payload.events,
      };
    case UPDATE_EVENT_FAIL:
      return {
        ...state,
        eventLoading: false,
        error: action.payload.error,
      };

    //delete event
    case DELETE_EVENT_REQUEST:
      return {
        ...state,
        deleteLoading: true,
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        success: "Event Deleted successfully!",
        events: action.payload.events,
      };
    case DELETE_EVENT_FAIL:
      return {
        ...state,
        deleteLoading: false,
        error: action.payload.error,
      };

    //clear error
    case CLEAR_EVENT_ERROR:
      return {
        ...state,
        error: null,
      };

    //clear success
    case CLEAR_EVENT_SUCCESS:
      return {
        ...state,
        success: null,
      };
    default:
      return state;
  }
};
