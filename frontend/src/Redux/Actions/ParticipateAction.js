import axios from "axios";
import {
  DELETE_PART_FAIL,
  DELETE_PART_REQUEST,
  DELETE_PART_SUCCESS,
  GET_PARTS_FAIL,
  GET_PARTS_REQUEST,
  GET_PARTS_SUCCESS,
} from "../Constants/AdminConstants";
import {
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  GET_PART_FAIL,
  GET_PART_REQUEST,
  GET_PART_SUCCESS,
  MY_PART_FAIL,
  MY_PART_REQUEST,
  MY_PART_SUCCESS,
  NEW_PART_FAIL,
  NEW_PART_REQUEST,
  NEW_PART_SUCCESS,
} from "../Constants/Constants";

const successMusic = require("../../Assets/music/success.mp3");
const audio = new Audio(successMusic);

//get single participation
export const getSingleParticipation = (id) => async (disaptch) => {
  disaptch({ type: GET_PART_REQUEST });
  try {
    const { data } = await axios.get(`/api/v1/contests/participation/${id}`);

    disaptch({
      type: GET_PART_SUCCESS,
      payload: { particiation: data.participation },
    });
  } catch (error) {
    disaptch({
      type: GET_PART_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//new participation
export const newParticipationSubmit =
  (uploadedData, file, contestId) => async (dispatch) => {
    dispatch({
      type: NEW_PART_REQUEST,
      payload: { status: { uploading: true, percent: 0 } },
    });

    if (uploadedData.name === "" || uploadedData.name.length < 4) {
      dispatch({
        type: NEW_PART_FAIL,
        payload: { error: "Please enter valid name." },
      });
      return;
    }

    if (uploadedData.email === "" || uploadedData.email.length < 5) {
      dispatch({
        type: NEW_PART_FAIL,
        payload: { error: "Please enter valid email." },
      });
      return;
    }
    if (uploadedData.phone === "" || uploadedData.phone.length < 10) {
      dispatch({
        type: NEW_PART_FAIL,
        payload: { error: "Please enter valid phone number." },
      });
      return;
    }

    if (uploadedData.group === "") {
      dispatch({
        type: NEW_PART_FAIL,
        payload: { error: "Please Select group." },
      });
      return;
    }
    if (uploadedData.group_class === "") {
      dispatch({
        type: NEW_PART_FAIL,
        payload: { error: "Please Select you class." },
      });
      return;
    }

    if (uploadedData.file_required && !file) {
      dispatch({
        type: NEW_PART_FAIL,
        payload: { error: "Please select file to upload." },
      });
      return;
    }

    try {
      if (!uploadedData.file_required) {
        const { data } = await axios.post(
          `/api/v1/contests/${contestId}/participate`,
          {
            ...uploadedData,
            file: { public_id: "na", url: "na" },
          }
        );
        audio.play();
        dispatch({
          type: NEW_PART_SUCCESS,
          payload: {
            participation: data.participation,
          },
        });

        return;
      }
      const formData = new FormData();
      formData.append("uploadedFile", file);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress: function (progressEvent) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          dispatch({
            type: NEW_PART_REQUEST,
            payload: {
              status: { uploading: true, percent: percentCompleted },
            },
          });
        },
      };
      const fileUpload = await axios.post(
        `/api/v1/contests/${contestId}/participate/uploadfile`,
        formData,
        config
      );

      const { data } = await axios.post(
        `/api/v1/contests/${contestId}/participate`,
        {
          ...uploadedData,
          file: fileUpload.data.file,
        }
      );
      audio.play();
      dispatch({
        type: NEW_PART_SUCCESS,
        payload: {
          participation: data.participation,
        },
      });
    } catch (error) {
      dispatch({
        type: NEW_PART_FAIL,
        payload: { error: error.response.data.message },
      });
    }
  };

//get my participation
export const getMyPArticipation = () => async (disaptch) => {
  disaptch({ type: MY_PART_REQUEST });
  try {
    const { data } = await axios.get(`/api/v1/contest/profile/participation`);

    disaptch({
      type: MY_PART_SUCCESS,
      payload: { myParticiation: data.participation },
    });
  } catch (error) {
    disaptch({
      type: MY_PART_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//get all participation => admin
export const getAllParts = () => async (disaptch) => {
  disaptch({ type: GET_PARTS_REQUEST });
  try {
    const { data } = await axios.get(`/api/v1/contest/participations/all`);

    disaptch({
      type: GET_PARTS_SUCCESS,
      payload: { participations: data.participations },
    });
  } catch (error) {
    disaptch({
      type: GET_PARTS_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//delete participation => admin

//Delete events
export const deletePart = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PART_REQUEST });
  try {
    const { data } = await axios.delete(`/api/v1/contests/participation/${id}`);
    dispatch({
      type: DELETE_PART_SUCCESS,
      payload: { participations: data.participations },
    });
  } catch (error) {
    dispatch({
      type: DELETE_PART_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

export const clearParticipateErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
export const clearParticipateSuccess = () => async (dispatch) => {
  dispatch({ type: CLEAR_SUCCESS });
};
