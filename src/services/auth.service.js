import * as CryptoJS from "crypto-js";
import http from "./http.service";
import Config from "../config/constant";
import envConfig from "../environment";
import { store } from "../store";
import {
  SET_LOGIN_DETAILS,
  SET_USER_PROFILE,
  SET_PROFILE_IMAGE,
  SET_COMPANY_LOGO,
  SET_FEATURE_LIST,
} from "../store/constants";

const AES_SECRET_KEY = CryptoJS.enc.Utf8.parse(envConfig.ENCRYPT_KEY);
const encryptAES = (text) =>
  CryptoJS.AES.encrypt(text, AES_SECRET_KEY, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();

const decryptAES = (text) =>
  CryptoJS.AES.decrypt(text, AES_SECRET_KEY, {
    mode: CryptoJS.mode.ECB,
  });

const postLogin = async (data) => {
  try {
    const encryptedPassword = await encryptAES(data?.password);
    const reqParams = {
      password: encryptedPassword,
      userName: data?.username,
      requestId: "LOGIN",
      module: "LOGIN",
    };
    const response = await http.get(Config.LOGIN, {});
    store.dispatch({ type: SET_LOGIN_DETAILS, payload: response.data });
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const verifyOTP = async (data) => {
  try {
    const reqParams = {
      requestId: "LOGIN",
      module: "LOGIN",
      ...data,
    };
    const response = await http.get(Config.LOGIN_OTP_VERIFY, {});
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const logoutUser = async () => {
  try {
    const reqParams = {
      module: "LOGIN",
      requestId: "LOGOUT",
    };
    const response = await http.get(Config.LOGOUT, {});
    store.dispatch({ type: "USER_LOGOUT" });
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const getUserProfileImage = async () => {
  try {
    const reqParams = {
      requestId: "GETPROFILEIMAGE",
    };
    const response = await http.get(Config.profile.getImage, {});
    store.dispatch({
      type: SET_PROFILE_IMAGE,
      payload: response.data["imageData"],
    });
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const updateUserProfileImage = async (imageData) => {
  try {
    const reqParams = {
      requestId: "GETPROFILEIMAGE",
      imageData,
    };
    const response = await http.post(Config.profile.uploadImage, {});
    store.dispatch({ type: SET_PROFILE_IMAGE, payload: imageData });
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const deleteUserProfileImage = async () => {
  try {
    const reqParams = {
      requestId: "DELETEPROFILEIMAGE",
    };
    const response = await http.post(Config.profile.deleteImage, {});
    if (response.status === 200) {
      store.dispatch({ type: SET_PROFILE_IMAGE, payload: null });
    }
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const getUserProfile = async () => {
  try {
    const reqParams = {
      requestId: "USERPROFILE",
    };
    const response = await http.get(
      Config.profile.getProfileDetails,
      {}
    );
    store.dispatch({
      type: SET_USER_PROFILE,
      payload: response.data.profileDetails,
    });
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const featureCheck = async () => {
  try {
    const response = await http.get(Config.featureCheck, {
      requestId: "FEATURECHECK",
      module: "FEATURE",
    });
    store.dispatch({
      type: SET_FEATURE_LIST,
      payload: response.data["list"] || {},
    });
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const forceChangePassword = async (data) => {
  try {
    const reqParams = {
      oldPassword: await encryptAES(data?.oldPassword),
      newPassword: await encryptAES(data?.newPassword),
      requestId: "GETPROFILEIMAGE",
    };

    const response = await http.get(Config.profile.changePassword, {});
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const kikRefreshToken = async () => {
  try {
    const { auth, app } = store.getState();
    await http.post(Config.REFRESH_TOKEN, {
      requestId: "REFRESHLOGIN",
      module: "LOGIN",
      refreshToken: auth?.refreshToken,
      userName: app?.loginDetails?.userName,
    });
    // if(response.status === 200){

    // }
  } catch (err) {
    // clearStore()
  }
};

const updatecompanyimage = async (imageData) => {
  try {
    const reqParams = {
      requestId: "COMPANYIMAGE",
      companyprofileImage: imageData,
    };
    const response = await http.get(Config.updatecompanyimage, {});
    // store.dispatch({ type: SET_COMPANY_LOGO, payload: imageData });
    await companyprofileimage();
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const companyprofileimage = async () => {
  try {
    const reqParams = {
      requestId: "COMPANYIMAGE",
    };
    const response =await http.get(Config.companyprofileimage, reqParams);
    store.dispatch({
      type: SET_COMPANY_LOGO,
      payload: response.data["companyImageData"],
    });
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const AuthService = {
  postLogin,
  verifyOTP,
  logoutUser,
  getUserProfileImage,
  getUserProfile,
  deleteUserProfileImage,
  updateUserProfileImage,
  featureCheck,
  forceChangePassword,
  kikRefreshToken,
  updatecompanyimage,
  companyprofileimage,
};

export default AuthService;
