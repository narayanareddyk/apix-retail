import Axios from "axios";
import { store } from "../store";
import {
  SET_ERROR_MESSAGE,
} from "../store/constants";
import Config from "../environment";
import AuthService from "./auth.service";

const axios = Axios.create({
  baseURL: Config.SERVICE_URL,
});

axios.interceptors.request.use(
  async (config) => {
    const { auth, app } = store.getState();
    const interceptedConfig = config;
    // interceptedConfig.headers["Content-type"] = "application/json";
    // interceptedConfig.headers["Accept-Language"] = app.language;

    // if (auth.authToken !== null) {
    //   interceptedConfig.headers.Authorization = `Bearer ${auth.authToken}`;
    // }
    // if (interceptedConfig.method === "get") {
    //   interceptedConfig.params.channelType = "RETAIL";
    //   interceptedConfig.params.language = app.language;
    //   interceptedConfig.params.ipAddress = "0.0.0.0";
    // } else if (interceptedConfig.method === "post") {
    //   interceptedConfig.data.channelType = "RETAIL";
    //   interceptedConfig.data.language = app.language;
    //   interceptedConfig.data.ipAddress = "0.0.0.0";
    // }

    // if (interceptedConfig.url.endsWith("/termsAndConditions")) {
    //   interceptedConfig.data.channelType = "INTERNET";
    // }
    // if (
    //   interceptedConfig.url !== "/public/login" &&
    //   interceptedConfig.url !== "/public/passwordReset/verify" &&
    //   interceptedConfig.url !== "/public/passwordReset/confirm" &&
    //   interceptedConfig.url !== "/public/userRegistration/verify" &&
    //   interceptedConfig.url !== "/public/userRegistration/confirm" &&
    //   interceptedConfig.url !== "/public/userRegistration/verifylink"
    // ) {
    //   if (interceptedConfig.method === "post") {
    //     interceptedConfig.data.userName =
    //       app?.loginDetails?.userName || "DEFAULT";
    //   }
    //   if (interceptedConfig.method === "get") {
    //     interceptedConfig.params.userName =
    //       app?.loginDetails?.userName || "DEFAULT";
    //   }
    // }

    // if (interceptedConfig.url.endsWith("/loan/loandocuments")) {
    //   interceptedConfig.data.append("channelType", "RETAIL");
    //   interceptedConfig.data.append("ipAddress", "0.0.0.0");
    //   interceptedConfig.data.append("language", app.language);
    //   interceptedConfig.data.append(
    //     "userName",
    //     app?.loginDetails?.userName || "DEFAULT"
    //   );
    // }

    return interceptedConfig;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    // if (response.headers?.access_token) {
    //   store.dispatch({ type: SET_AUTH_TOKEN, payload: response.headers.access_token })
    // }
    // if (response.headers?.refresh_token) {
    //   store.dispatch({ type: SET_AUTH_REFRESH_TOKEN, payload: response.headers.refresh_token })
    // }
    return response
    // if (response.config.url.endsWith('/refreshtoken')) {
    //   const { auth, app } = store.getState()

    //   auth.reqObj.data = JSON.parse(auth?.reqObj?.data)
    //   return axios.request(auth.reqObj)
    // } else {
    //   return response
    // }
  },
  async (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 440) {
        if (error.response['data']['code'] === 'AGCM-0003') {
          // store.dispatch({ type: SET_CURRENT_REQ_OBJ, payload: error?.config })
          return AuthService.kikRefreshToken().then(() => {
            let config = error.config;
            config.data = JSON.parse(error.config.data);
            return axios.request(config);
          });
        } else {
          store.dispatch({ type: "USER_LOGOUT" });
        }
      } 
      // else if (error.response.status === 400) {
      //   toast(error.response?.data?.message)
      //   await kickUser()
      // }
      return Promise.reject(error)
    }
    // else if (error.request) {
    //   const errResponse={
    //     status:0,
    //     response:{data:{message:"Server down. Please Try Again Later"}},

    //   }
    //   return Promise.reject(errResponse)
    // }
  },
);



export default axios;
