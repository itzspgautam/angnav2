import {
  CLEAR_POST_ERROR,
  CLEAR_POST_SUCCESS,
  CREATE_PCAT_FAIL,
  CREATE_PCAT_REQUEST,
  CREATE_PCAT_SUCCESS,
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  UPDATE_POST_FAIL,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
} from "../Constants/AdminConstants";
import {
  LOAD_POST_CATEGORY_FAIL,
  LOAD_POST_CATEGORY_REQUEST,
  LOAD_POST_CATEGORY_SUCCESS,
  LOAD_POST_FAIL,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  SINGLE_POST_FAIL,
  SINGLE_POST_REQUEST,
  SINGLE_POST_SUCCESS,
} from "../Constants/Constants";

const initialState = {
  postLoading: false,
  posts: null,
  selectedPost: null,
  postCategories: null,
  error: null,
  success: null,
  deleteLoading: false,
};

export const PostReducers = (state = initialState, action) => {
  switch (action.type) {
    //post Category Load
    case LOAD_POST_CATEGORY_REQUEST:
      return {
        ...state,
        postLoading: true,
      };
    case LOAD_POST_CATEGORY_SUCCESS:
      return {
        ...state,
        postLoading: false,
        postCategories: action.payload.categories,
      };
    case LOAD_POST_CATEGORY_FAIL:
      return {
        ...state,
        postLoading: false,
        error: action.payload.error,
      };

    //post category create
    case CREATE_PCAT_REQUEST:
      return {
        ...state,
        postLoading: true,
      };
    case CREATE_PCAT_SUCCESS:
      return {
        ...state,
        postLoading: false,
        success: "Category Created successfully!",
        postCategories: action.payload.categories,
      };
    case CREATE_PCAT_FAIL:
      return {
        ...state,
        postLoading: false,
        error: action.payload.error,
      };

    //create post
    case CREATE_POST_REQUEST:
      return {
        ...state,
        postLoading: true,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        success: "Post Created successfully!",
        posts: action.payload.posts,
      };
    case CREATE_POST_FAIL:
      return {
        ...state,
        postLoading: false,
        error: action.payload.error,
      };

    //Update post
    case UPDATE_POST_REQUEST:
      return {
        ...state,
        postLoading: true,
      };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        success: "Post Updated successfully!",
        selectedPost: action.payload.post,
        posts: action.payload.posts,
      };
    case UPDATE_POST_FAIL:
      return {
        ...state,
        postLoading: false,
        error: action.payload.error,
      };

    //load all post
    case LOAD_POST_REQUEST:
      return {
        ...state,
        postLoading: true,
      };
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        posts: action.payload.posts,
      };
    case LOAD_POST_FAIL:
      return {
        ...state,
        postLoading: false,
        error: action.payload.error,
      };

    //single post load
    case SINGLE_POST_REQUEST:
      return {
        ...state,
        postLoading: true,
      };
    case SINGLE_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        selectedPost: action.payload.post,
      };
    case SINGLE_POST_FAIL:
      return {
        ...state,
        postLoading: false,
        error: action.payload.error,
      };

    //delete post
    case DELETE_POST_REQUEST:
      return {
        ...state,
        deleteLoading: true,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        success: "Post Deleted successfully!",
        posts: action.payload.posts,
      };
    case DELETE_POST_FAIL:
      return {
        ...state,
        deleteLoading: false,
        error: action.payload.error,
      };

    //clear error
    case CLEAR_POST_ERROR:
      return {
        ...state,
        error: null,
      };

    //clear success
    case CLEAR_POST_SUCCESS:
      return {
        ...state,
        success: null,
      };

    default:
      return state;
  }
};
