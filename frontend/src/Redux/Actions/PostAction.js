import axios from "axios";
import {
  CLEAR_POST_ERROR,
  CLEAR_POST_SUCCESS,
  CREATE_PCAT_FAIL,
  CREATE_PCAT_REQUEST,
  CREATE_PCAT_SUCCESS,
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  DELETE_EVENT_FAIL,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
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

//load all category
export const loadPostCategory = () => async (dispatch) => {
  dispatch({ type: LOAD_POST_CATEGORY_REQUEST });
  try {
    const { data } = await axios.get(`/api/v1/posts/category`);
    dispatch({
      type: LOAD_POST_CATEGORY_SUCCESS,
      payload: { categories: data.postCategories },
    });
  } catch (error) {
    dispatch({
      type: LOAD_POST_CATEGORY_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//load all posts
export const loadPosts = () => async (dispatch) => {
  dispatch({ type: LOAD_POST_REQUEST });
  try {
    const { data } = await axios.get("/api/v1/post");
    dispatch({
      type: LOAD_POST_SUCCESS,
      payload: { posts: data.posts },
    });
  } catch (error) {
    dispatch({
      type: LOAD_POST_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};
//load single ppst
export const loadSinglePost = (id) => async (dispatch) => {
  dispatch({ type: SINGLE_POST_REQUEST });
  try {
    const { data } = await axios.get(`/api/v1/post/${id}`);
    dispatch({
      type: SINGLE_POST_SUCCESS,
      payload: { post: data.post },
    });
  } catch (error) {
    dispatch({
      type: SINGLE_POST_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//create post category
export const createPostCategory = (icon, name) => async (dispatch) => {
  dispatch({ type: CREATE_PCAT_REQUEST });

  if (!name) {
    dispatch({
      type: CREATE_PCAT_FAIL,
      payload: { error: "Please specify category name." },
    });
    return;
  }

  if (!icon) {
    dispatch({
      type: CREATE_PCAT_FAIL,
      payload: { error: "Please upload icon." },
    });
    return;
  }

  try {
    const formData = new FormData();
    formData.append("file", icon);
    formData.append("public_id", "Post_Icon/" + name + "_" + Date.now());
    formData.append("upload_preset", "angna_uploads");

    const imageUpload = await axios.post(
      "https://api.cloudinary.com/v1_1/itzspgautam/upload",
      formData
    );
    const createCategory = await axios.post("/api/v1/posts/category", {
      name,
      icon: {
        public_id: imageUpload.data.public_id,
        url: imageUpload.data.secure_url,
      },
    });

    if (createCategory) {
      const { data } = await axios.get(`/api/v1/posts/category`);
      dispatch({
        type: CREATE_PCAT_SUCCESS,
        payload: { categories: data.postCategories.reverse() },
      });
    }
  } catch (error) {
    dispatch({
      type: CREATE_PCAT_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//create new Post
export const createNewPost = (poster, postData) => async (dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST });

  if (!postData.title) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload: { error: "Please enter post title." },
    });
    return;
  }

  if (!postData.description) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload: { error: "Please enter post Description." },
    });
    return;
  }

  if (postData.categories.length < 1) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload: { error: "Please select atleast one category." },
    });
    return;
  }

  if (!postData.content.length) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload: { error: "Please enter post content." },
    });
    return;
  }

  if (!poster) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload: { error: "Please select thumbnail file." },
    });
    return;
  }
  try {
    const formData = new FormData();
    formData.append("file", poster);
    formData.append(
      "public_id",
      "Post_Thumnail/" + postData.title.replace(" ", "_") + "_" + Date.now()
    );
    formData.append("upload_preset", "angna_uploads");

    const imageUpload = await axios.post(
      "https://api.cloudinary.com/v1_1/itzspgautam/upload",
      formData
    );
    const createPost = await axios.post("/api/v1/post", {
      ...postData,
      poster: {
        public_id: imageUpload.data.public_id,
        url: imageUpload.data.secure_url,
      },
    });

    if (createPost) {
      const { data } = await axios.get(`/api/v1/post`);
      dispatch({
        type: CREATE_POST_SUCCESS,
        payload: { posts: data.posts },
      });
    }
  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//update post
export const updatePost = (poster, postData, id) => async (dispatch) => {
  dispatch({ type: UPDATE_POST_REQUEST });

  if (!postData.title) {
    dispatch({
      type: UPDATE_POST_FAIL,
      payload: { error: "Please enter post title." },
    });
    return;
  }

  if (!postData.description) {
    dispatch({
      type: UPDATE_POST_FAIL,
      payload: { error: "Please enter post Description." },
    });
    return;
  }

  if (postData.categories.length < 1) {
    dispatch({
      type: UPDATE_POST_FAIL,
      payload: { error: "Please select atleat one category." },
    });
    return;
  }

  if (!postData.content.length) {
    dispatch({
      type: UPDATE_POST_FAIL,
      payload: { error: "Please enter post content." },
    });
    return;
  }

  try {
    var posterData = {
      public_id: postData.poster.public_id,
      url: postData.poster.url,
    };
    if (poster) {
      const formData = new FormData();
      formData.append("file", poster);
      formData.append(
        "public_id",
        "Post_Thumnail/" + postData.title.replace(" ", "_") + "_" + Date.now()
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

    const updatePost = await axios.put(`/api/v1/post/${id}`, {
      ...postData,
      poster: { ...posterData },
    });

    if (updatePost) {
      const { data } = await axios.get(`/api/v1/post`);
      dispatch({
        type: UPDATE_POST_SUCCESS,
        payload: { posts: data.posts, post: updatePost.data.post },
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_POST_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//Delete Post
export const deletePost = (id) => async (dispatch) => {
  dispatch({ type: DELETE_POST_REQUEST });
  try {
    const { data } = await axios.delete(`/api/v1/post/${id}`);
    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: { posts: data.posts },
    });
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//load posts filtered by category
export const loadPostsByCategory = (categoryId) => async (dispatch) => {
  dispatch({ type: LOAD_POST_REQUEST });
  try {
    const { data } = await axios.get(
      `/api/v1/post/filter/category/${categoryId}`
    );
    dispatch({
      type: LOAD_POST_SUCCESS,
      payload: { posts: data.posts },
    });
  } catch (error) {
    dispatch({
      type: LOAD_POST_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

export const clearPostError = () => async (dispatch) => {
  dispatch({ type: CLEAR_POST_ERROR });
};
export const clearPostSuccess = () => async (dispatch) => {
  dispatch({ type: CLEAR_POST_SUCCESS });
};
