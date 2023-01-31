import {
  SET_APP_LANGUAGE,
  SET_LOGIN_DETAILS,
  SET_USER_PROFILE,
  SET_PROFILE_IMAGE,
  SET_FEATURE_LIST,
  SET_THEME,
  SET_COMPANY_LOGO,
} from "../constants";

const initialState = {
  language: "en",
  loginDetails: {},
  profileDetails: {},
  profileImage: null,
  companyLogo: null,
  featureCheckList: {},
  theme: "light",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_APP_LANGUAGE:
      return { ...state, language: payload };
    case SET_LOGIN_DETAILS:
      return { ...state, loginDetails: payload };
    case SET_USER_PROFILE:
      return { ...state, profileDetails: payload };
    case SET_PROFILE_IMAGE:
      return { ...state, profileImage: payload };
    case SET_FEATURE_LIST:
      return { ...state, featureCheckList: payload };
    case SET_THEME:
      return { ...state, theme: payload };
    case SET_COMPANY_LOGO:
      return { ...state, companyLogo: payload };

    default:
      return state;
  }
};
