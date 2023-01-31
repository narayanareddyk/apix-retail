import {
  SET_APP_LANGUAGE,
  SET_LOGIN_DETAILS,
  SET_USER_PROFILE,
  SET_PROFILE_IMAGE,
  SET_FEATURE_LIST,
  SET_THEME,
  SET_COMPANY_LOGO
} from "../constants";

export const setAppLanguage = (payload) => ({
  type: SET_APP_LANGUAGE,
  payload,
});
export const setLoginDetails = (payload) => ({
  type: SET_LOGIN_DETAILS,
  payload,
});
export const setProfileDetails = (payload) => ({
  type: SET_USER_PROFILE,
  payload,
});
export const setProfileImage = (payload) => ({
  type: SET_PROFILE_IMAGE,
  payload,
});

export const setFeatureList = (payload) => ({
  type: SET_FEATURE_LIST,
  payload,
});

export const setTheme = (payload) => ({
  type: SET_THEME,
  payload,
});

export const setCompanyLogo = (payload) => ({
  type: SET_COMPANY_LOGO,
  payload,
});