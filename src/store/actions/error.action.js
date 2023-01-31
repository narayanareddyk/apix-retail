import { SET_ERROR_MESSAGE } from "../constants";

export const setErrorMessage = (payload) => ({
  type: SET_ERROR_MESSAGE,
  payload,
});
