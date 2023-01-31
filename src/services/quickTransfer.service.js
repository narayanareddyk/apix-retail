import http from "./http.service";
import config from "../config/constant";

const fundTransferVerify = async (reqParams) => {
  try {
    const response = await http.get(
      config.transfers.FUND_TRANSFER_VERIFY,
      reqParams
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const fundTransferConfirm = async (reqParams) => {
  try {
    const response = await http.get(
      config.transfers.FUND_TRANSFER_CONFIRM,
      reqParams
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const QuickTransferService = {
  fundTransferVerify,
  fundTransferConfirm,
};

export default QuickTransferService;
