import { SET_AUTH_TOKEN, SET_AUTH_REFRESH_TOKEN } from "../constants";

const initialState = {
  authToken: null,
  refreshToken: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_AUTH_TOKEN:
      return { ...state, authToken: payload };

    case SET_AUTH_REFRESH_TOKEN:
      return { ...state, refreshToken: payload };

    default:
      return state;
  }
};
