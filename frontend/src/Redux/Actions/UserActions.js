import axios from "axios";
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
  LOGOUT_USER_FAIL,
  CLEAR_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  CLEAR_SUCCESS,
  UPDATE_AVATAR_REQUEST,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_FAIL,
  SOCIAL_LOGIN_REQUEST,
  SOCIAL_LOGIN_FAIL,
  SOCIAL_LOGIN_SUCCESS,
} from "../Constants/Constants";

//send Otp
export const sendOtp =
  (signInWithPhoneNumber, firebaseAuthentication, appVerifier, phone) =>
  async (dispatch) => {
    dispatch({ type: OTP_SENT_REQUEST });

    if (phone.length < 10) {
      dispatch({
        type: OTP_SENT_FAIL,
        payload: { error: "Please enter valid phone number." },
      });
      return;
    }
    try {
      const phoneOtpRequest = await signInWithPhoneNumber(
        firebaseAuthentication,
        "+" + phone,
        appVerifier
      );
      dispatch({
        type: OTP_SENT_SUCCESS,
        payload: { confirmation: phoneOtpRequest, phone: phone },
      });
    } catch (error) {
      let message = "";
      if (error.code === "auth/invalid-phone-number") {
        message = "Please enter valid phone number";
      }
      if (error.code === "auth/too-many-requests") {
        message = "Too many attempts. Please try again later.";
      }

      dispatch({ type: OTP_SENT_FAIL, payload: { error: message } });
    }
  };

//verigy Otp
export const verifyOtp = (verificationHash, enetredOtp) => async (dispatch) => {
  dispatch({ type: OTP_VERIFY_REQUEST });
  try {
    const otpVerification = await verificationHash.confirm(enetredOtp);
    const user = await loginWithToken(otpVerification.user.accessToken);

    if (!user.success) {
      dispatch({ type: OTP_VERIFY_FAIL, payload: { error: user.error } });
      return;
    }

    dispatch({ type: OTP_VERIFY_SUCCESS, payload: { user: user.user } });
  } catch (error) {
    let message = "";
    if (error.code === "auth/invalid-verification-code") {
      message = "Incorrect OTP. Please try again.";
    }
    dispatch({ type: OTP_VERIFY_FAIL, payload: { error: message } });
  }
};

//login with social
export const loginWithSocial =
  (signInWithPopup, firebaseAuthentication, provider) => async (dispatch) => {
    dispatch({ type: SOCIAL_LOGIN_REQUEST });
    try {
      const loginWithSocial = await signInWithPopup(
        firebaseAuthentication,
        provider
      );
      const user = await loginWithToken(loginWithSocial.user.accessToken);
      if (!user.success) {
        dispatch({ type: SOCIAL_LOGIN_FAIL, payload: { error: user.error } });
        return;
      }

      dispatch({ type: SOCIAL_LOGIN_SUCCESS, payload: { user: user.user } });
    } catch (error) {
      dispatch({ type: SOCIAL_LOGIN_FAIL, payload: { error: error } });
    }
  };

//token Send to server for login
export const loginWithToken = async (token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.post("/api/v1/login", {}, config);
    return data;
  } catch (error) {
    return { success: false, error: error.response.data.message };
  }
};

//logout
export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");
    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, payload: { error: error.message } });
  }
};

//profie
export const getuser = () => async (dispatch) => {
  dispatch({ type: LOAD_USER_REQUEST });
  try {
    const { data } = await axios.get("/api/v1/profile");
    dispatch({ type: LOAD_USER_SUCCESS, payload: { user: data.user } });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: { error: error.response } });
  }
};

//update profile
export const updateUser = (dataToUpdate) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  if (dataToUpdate.name.length < 4) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: { error: "Name is too short. Please enter valid name." },
    });
    return;
  }

  if (dataToUpdate.email.length < 5) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: { error: "Please enter valid email." },
    });
    return;
  }

  if (dataToUpdate.gender === "") {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: { error: "Please Select your gender." },
    });
    return;
  }

  if (dataToUpdate.iAm.iAm_type === null) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: { error: "Please Select I am.(Alumni/Student/Teacher/Other)" },
    });
    return;
  }

  if (dataToUpdate.iAm.iAm_designation === "") {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: { error: "Please enter designation/class." },
    });
    return;
  }

  try {
    const { data } = await axios.put("/api/v1/profile", {
      ...dataToUpdate,
    });
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: {
        user: data.user,
        success: { status: "ok", message: "Profile Updated Successfully." },
      },
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//updaye avatar
export const updateAvatar = (cropedAvatar) => async (dispatch) => {
  dispatch({
    type: UPDATE_AVATAR_REQUEST,
    payload: { status: { uploading: true, percent: 0 } },
  });

  try {
    const formData = new FormData();
    formData.append("file", cropedAvatar);
    formData.append("upload_preset", "angna_uploads");

    const config = {
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        dispatch({
          type: UPDATE_AVATAR_REQUEST,
          payload: { status: { uploading: true, percent: percentCompleted } },
        });
      },
    };

    const imageUpload = await axios.post(
      "https://api.cloudinary.com/v1_1/itzspgautam/upload",
      formData,
      config
    );

    const { data } = await axios.put("/api/v1/profile", {
      avatar: {
        public_id: imageUpload.data.public_id,
        url: imageUpload.data.secure_url,
      },
    });
    dispatch({
      type: UPDATE_AVATAR_SUCCESS,
      payload: {
        user: data.user,
        success: { status: "ok", message: "Avatar Updated Successfully." },
      },
    });
  } catch (error) {
    dispatch({
      type: UPDATE_AVATAR_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//get all users =>admin
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: GET_USERS_REQUEST });
  try {
    const { data } = await axios.get("/api/v1/users");
    dispatch({ type: GET_USERS_SUCCESS, payload: { users: data.users } });
  } catch (error) {
    dispatch({ type: GET_USERS_FAIL, payload: { error: error.response } });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
export const clearSuccess = () => async (dispatch) => {
  dispatch({ type: CLEAR_SUCCESS });
};
