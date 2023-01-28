import {
  GET_USERS_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
} from "../Constants/AdminConstants";
import {
  OTP_SENT_REQUEST,
  OTP_SENT_SUCCESS,
  OTP_SENT_FAIL,
  OTP_VERIFY_REQUEST,
  OTP_VERIFY_SUCCESS,
  OTP_VERIFY_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  CLEAR_ERROR,
  LOGOUT_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  CLEAR_SUCCESS,
  UPDATE_AVATAR_REQUEST,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_FAIL,
  SOCIAL_LOGIN_REQUEST,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_FAIL,
} from "../Constants/Constants";

const initialState = {
  loading: true,
  loginStep: { step: "PhoneInput", phoneNumber: null, verificationHash: null },
  isAuthenticated: false,
  authProvider: null,
  user: null,
  users: null,
  error: null,
  success: null,
  avatarUpload: null,
  socialLoginLoading: false,
};

export const UserReducers = (state = initialState, action) => {
  switch (action.type) {
    //OTP Request
    case OTP_SENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OTP_SENT_SUCCESS:
      return {
        ...state,
        loading: false,
        loginStep: {
          step: "OtpInput",
          phoneNumber: action.payload.phone,
          verificationHash: action.payload.confirmation,
        },
      };
    case OTP_SENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    //otp verify
    case OTP_VERIFY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OTP_VERIFY_SUCCESS:
      return {
        loading: false,
        loginStep: {
          step: "completed",
          phoneNumber: null,
          verificationHash: null,
        },
        user: action.payload.user,
        isAuthenticated: true,
      };
    case OTP_VERIFY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    //Social Login
    case SOCIAL_LOGIN_REQUEST:
      return {
        ...state,
        socialLoginLoading: true,
      };
    case SOCIAL_LOGIN_SUCCESS:
      return {
        ...state,
        socialLoginLoading: false,
        loginStep: {
          step: "completed",
          phoneNumber: null,
          verificationHash: null,
        },
        user: action.payload.user,
        isAuthenticated: true,
      };
    case SOCIAL_LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: true,
        error: action.payload.error,
      };

    //Load User
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loginStep: {
          step: "completed",
          phoneNumber: null,
          verificationHash: null,
        },
        user: action.payload.user,
        isAuthenticated: true,
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
      };

    //Logout user
    case LOGOUT_USER_SUCCESS:
      return {
        loading: false,
        loginStep: {
          step: "PhoneInput",
          phoneNumber: null,
          verificationHash: null,
        },
        user: null,
        isAuthenticated: false,
      };
    case LOGOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    //update user
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        success: action.payload.success,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    //update avatar
    case UPDATE_AVATAR_REQUEST:
      return {
        ...state,
        avatarUpload: action.payload.status,
        // uploadPercentage: action.payload.uploadPerc,
      };
    case UPDATE_AVATAR_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        avatarUpload: null,

        success: action.payload.success,
      };
    case UPDATE_AVATAR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    //get Users => admin
    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        loading: false,
      };

    //clear error
    case CLEAR_ERROR:
      return {
        ...state,
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
