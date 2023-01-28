import {
  LOAD_AOY_FAIL,
  LOAD_AOY_REQUEST,
  LOAD_AOY_SUCCESS,
  LOAD_HERO_FAIL,
  LOAD_HERO_REQUEST,
  LOAD_HERO_SUCCESS,
} from "../Constants/Constants";

const initialState = {
  aoy: null,
  hero: null,
};

export const SliderReducers = (state = initialState, action) => {
  switch (action.type) {
    //Hero Load
    case LOAD_HERO_REQUEST:
      return {
        ...state,
        hero: { heroLoading: true, hero: null },
      };
    case LOAD_HERO_SUCCESS:
      return {
        ...state,
        hero: { heroLoading: false, hero: action.payload.hero },
      };
    case LOAD_HERO_FAIL:
      return {
        ...state,
        hero: { heroLoading: false, hero: null },
        error: action.payload.error,
      };

    //aoy Load
    case LOAD_AOY_REQUEST:
      return {
        ...state,
        aoy: { aoyLoading: true, aoy: null },
      };
    case LOAD_AOY_SUCCESS:
      return {
        ...state,
        aoy: { aoyLoading: false, aoy: action.payload.aoy },
      };
    case LOAD_AOY_FAIL:
      return {
        ...state,
        aoy: { aoyLoading: false, aoy: null },
        error: action.payload.error,
      };

    default:
      return state;
  }
};
