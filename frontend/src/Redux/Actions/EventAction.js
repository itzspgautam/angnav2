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

const { default: axios } = require("axios");
const {
  LOAD_EVENT_REQUEST,
  LOAD_EVENT_FAIL,
  LOAD_EVENT_SUCCESS,
  LOAD_CATEGORY_REQUEST,
  LOAD_CATEGORY_FAIL,
  LOAD_CATEGORY_SUCCESS,
  SINGLE_EVENT_REQUEST,
  SINGLE_EVENT_SUCCESS,
  SINGLE_EVENT_FAIL,
} = require("../Constants/Constants");

//load all event
export const loadEvent = () => async (dispatch) => {
  dispatch({ type: LOAD_EVENT_REQUEST });
  try {
    const { data } = await axios.get("/api/v1/events");
    dispatch({
      type: LOAD_EVENT_SUCCESS,
      payload: { events: data.events },
    });
  } catch (error) {
    dispatch({
      type: LOAD_EVENT_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//load single event
export const loadSingleEvent = (id) => async (dispatch) => {
  dispatch({ type: SINGLE_EVENT_REQUEST });
  try {
    const { data } = await axios.get(`/api/v1/events/${id}`);
    dispatch({
      type: SINGLE_EVENT_SUCCESS,
      payload: { event: data.event },
    });
  } catch (error) {
    dispatch({
      type: SINGLE_EVENT_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//load events filtered by category
export const loadEventByCategory = (categoryId) => async (dispatch) => {
  dispatch({ type: LOAD_EVENT_REQUEST });
  try {
    const { data } = await axios.get(`/api/v1/events/category/${categoryId}`);
    dispatch({
      type: LOAD_EVENT_SUCCESS,
      payload: { events: data.events },
    });
  } catch (error) {
    dispatch({
      type: LOAD_EVENT_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//load all category
export const loadCategory = () => async (dispatch) => {
  dispatch({ type: LOAD_CATEGORY_REQUEST });

  try {
    const { data } = await axios.get(`/api/v1/category`);
    dispatch({
      type: LOAD_CATEGORY_SUCCESS,
      payload: { categories: data.categories.reverse() },
    });
  } catch (error) {
    dispatch({
      type: LOAD_CATEGORY_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//create new category
export const createCategory = (icon, name) => async (dispatch) => {
  dispatch({ type: CREATE_CATEGORY_REQUEST });

  if (!name) {
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload: { error: "Please specify category name." },
    });
    return;
  }

  if (!icon) {
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload: { error: "Please upload icon." },
    });
    return;
  }

  try {
    const formData = new FormData();
    formData.append("file", icon);
    formData.append("public_id", "Event_Icon/" + name + "_" + Date.now());
    formData.append("upload_preset", "angna_uploads");

    const imageUpload = await axios.post(
      "https://api.cloudinary.com/v1_1/itzspgautam/upload",
      formData
    );
    const createCategory = await axios.post("/api/v1/category", {
      name,
      icon: {
        public_id: imageUpload.data.public_id,
        url: imageUpload.data.secure_url,
      },
    });

    if (createCategory) {
      const { data } = await axios.get(`/api/v1/category`);
      dispatch({
        type: CREATE_CATEGORY_SUCCESS,
        payload: { categories: data.categories.reverse() },
      });
    }
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//create new event
export const createNewEvent = (poster, eventData) => async (dispatch) => {
  dispatch({ type: CREATE_EVENT_REQUEST });

  if (!eventData.title) {
    dispatch({
      type: CREATE_EVENT_FAIL,
      payload: { error: "Please enter event title." },
    });
    return;
  }

  if (!eventData.guestSpeaker) {
    dispatch({
      type: CREATE_EVENT_FAIL,
      payload: { error: "Please enter Speaker Name." },
    });
    return;
  }

  if (!eventData.guestSpeakerDes) {
    dispatch({
      type: CREATE_EVENT_FAIL,
      payload: { error: "Please enter Speaker Designation." },
    });
    return;
  }
  if (!eventData.description) {
    dispatch({
      type: CREATE_EVENT_FAIL,
      payload: { error: "Please enter event Description." },
    });
    return;
  }
  if (!eventData.videoUrl) {
    dispatch({
      type: CREATE_EVENT_FAIL,
      payload: { error: "Please enter Video URL." },
    });
    return;
  }

  if (eventData.categories.length < 1) {
    dispatch({
      type: CREATE_EVENT_FAIL,
      payload: { error: "Please select atleat one category." },
    });
    return;
  }

  if (!eventData.content.length) {
    dispatch({
      type: CREATE_EVENT_FAIL,
      payload: { error: "Please enter event content." },
    });
    return;
  }

  if (!poster) {
    dispatch({
      type: CREATE_EVENT_FAIL,
      payload: { error: "Please select poster file." },
    });
    return;
  }
  try {
    const formData = new FormData();
    formData.append("file", poster);
    formData.append(
      "public_id",
      "Event_poster/" + eventData.title.replace(" ", "_") + "_" + Date.now()
    );
    formData.append("upload_preset", "angna_uploads");

    const imageUpload = await axios.post(
      "https://api.cloudinary.com/v1_1/itzspgautam/upload",
      formData
    );
    const createEvent = await axios.post("/api/v1/events/new", {
      ...eventData,
      poster: {
        public_id: imageUpload.data.public_id,
        url: imageUpload.data.secure_url,
      },
    });

    if (createEvent) {
      const { data } = await axios.get(`/api/v1/events`);
      dispatch({
        type: CREATE_EVENT_SUCCESS,
        payload: { events: data.events },
      });
    }
  } catch (error) {
    dispatch({
      type: CREATE_EVENT_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//update event
export const updateEvent = (poster, eventData, id) => async (dispatch) => {
  dispatch({ type: UPDATE_EVENT_REQUEST });

  if (!eventData.title) {
    dispatch({
      type: UPDATE_EVENT_FAIL,
      payload: { error: "Please enter event title." },
    });
    return;
  }

  if (!eventData.guestSpeaker) {
    dispatch({
      type: UPDATE_EVENT_FAIL,
      payload: { error: "Please enter Speaker Name." },
    });
    return;
  }

  if (!eventData.guestSpeakerDes) {
    dispatch({
      type: UPDATE_EVENT_FAIL,
      payload: { error: "Please enter Speaker Designation." },
    });
    return;
  }
  if (!eventData.description) {
    dispatch({
      type: UPDATE_EVENT_FAIL,
      payload: { error: "Please enter event Description." },
    });
    return;
  }
  if (!eventData.videoUrl) {
    dispatch({
      type: UPDATE_EVENT_FAIL,
      payload: { error: "Please enter Video URL." },
    });
    return;
  }

  if (eventData.categories.length < 1) {
    dispatch({
      type: UPDATE_EVENT_FAIL,
      payload: { error: "Please select atleat one category." },
    });
    return;
  }

  if (!eventData.content.length) {
    dispatch({
      type: UPDATE_EVENT_FAIL,
      payload: { error: "Please enter event content." },
    });
    return;
  }

  try {
    var posterData = {
      public_id: eventData.poster.public_id,
      url: eventData.poster.url,
    };
    if (poster) {
      const formData = new FormData();
      formData.append("file", poster);
      formData.append(
        "public_id",
        "Event_poster/" + eventData.title.replace(" ", "_") + "_" + Date.now()
      );
      formData.append("upload_preset", "angna_uploads");

      const imageUpload = await axios.post(
        "https://api.cloudinary.com/v1_1/itzspgautam/upload",
        formData
      );
      posterData = {
        public_id: imageUpload.data.public_id,
        url: imageUpload.data.secure_url,
      };
    }

    const updateEvent = await axios.put(`/api/v1/events/${id}`, {
      ...eventData,
      poster: { ...posterData },
    });

    if (updateEvent) {
      const { data } = await axios.get(`/api/v1/events`);
      dispatch({
        type: UPDATE_EVENT_SUCCESS,
        payload: { events: data.events, event: updateEvent.data.event },
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_EVENT_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//Delete events
export const deleteEvent = (id) => async (dispatch) => {
  dispatch({ type: DELETE_EVENT_REQUEST });
  try {
    const { data } = await axios.delete(`/api/v1/events/${id}`);
    dispatch({
      type: DELETE_EVENT_SUCCESS,
      payload: { events: data.events },
    });
  } catch (error) {
    dispatch({
      type: DELETE_EVENT_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

export const clearEventErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_EVENT_ERROR });
};
export const clearEventSuccess = () => async (dispatch) => {
  dispatch({ type: CLEAR_EVENT_SUCCESS });
};
