import axios from "axios";
import {
  LOAD_AOY_FAIL,
  LOAD_AOY_REQUEST,
  LOAD_AOY_SUCCESS,
  LOAD_HERO_FAIL,
  LOAD_HERO_REQUEST,
  LOAD_HERO_SUCCESS,
} from "../Constants/Constants";

export const getAllHero = () => async (dispatch) => {
  dispatch({ type: LOAD_HERO_REQUEST });
  try {
    const { data } = await axios.get("/api/v1/slider/hero");
    dispatch({
      type: LOAD_HERO_SUCCESS,
      payload: { hero: data.hero },
    });
  } catch (error) {
    dispatch({
      type: LOAD_HERO_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

export const getAllAoy = () => async (dispatch) => {
  dispatch({ type: LOAD_AOY_REQUEST });
  try {
    const { data } = await axios.get("/api/v1/slider/aoy");
    dispatch({
      type: LOAD_AOY_SUCCESS,
      payload: { aoy: data.aoy },
    });
  } catch (error) {
    dispatch({
      type: LOAD_AOY_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};
