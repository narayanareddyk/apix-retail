import http from "./http.service";
import config from "../config/constant";
  import { store } from "../store";

const uploadLoanDocument = async (formData) => {
  try {
    const response = await http.post(config.loans.uploadDocument, formData, {
      "content-type": "multipart/form-data",
    });
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const microloan = async (reqParams) => {
  try {
    const { auth, app } = store.getState();
    const params = {
      ...reqParams,
      requestId: "GETBALANCES",
      customerNo: app?.profileDetails?.customerNumber,
      branch:  app?.loginDetails?.branchCode,
    };
    const response = await http.post(config.loans.microloan, params);
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const LoanService = {
  uploadLoanDocument,
  microloan,
};

export default LoanService;
