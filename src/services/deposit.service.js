import http from "./http.service";
import config from "../config/constant";

const getCurrencyList = async () => {
  try {
    const reqParams = {
      requestId: "CURRENCYLIST",
    };
    const response = await http.get(config.deposit.currencyList, reqParams);
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};
const getProducts = async () => {
  try {
    const reqParams = {
      requestId: "TERMDEPOSITINTERESTRATES",
    };
    const response = await http.get(config.deposit.getProducts, reqParams);
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const getAll = async () => {
  try {
    const reqParams = {
      requestId: "ACCOUNTSUMMARY",
      accountType: "D",
    };
    const response = await http.get(config.deposit.getAll, reqParams);
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const getDepositAccountDetails = async (params) => {
  try {
    const reqParams = {
      ...params,
      requestId: "DEPOSITACCOUNTDETAILS",
    };
    const response = await http.get(
      config.deposit.getDepositAccountDetails,
      reqParams
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const getDepositAccountStatement = async (reqParams) => {
  try {
    const params = {
      ...reqParams,

      module: "TERM_DEPOSITE",
      requestId: "TERMDEPOSITTENOR",
    };
    const response = await http.get(
      config.deposit.getDepositAccountStatement,
      params
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const createTermDeposit = async (data) => {
  try {
    let autoRollFlag = "";
    let rolloverType = "";
    let totalMonths = 0;
    if (data?.autoRenewal === "CLOSE_ON_MATURITY") {
      autoRollFlag = "Y";
      rolloverType = "N";
    } else {
      autoRollFlag = "N";
      rolloverType = data?.principle ? "Y" : "N";
    }

    if (+data.years > 0) {
      totalMonths = +data.years * 12;
    }
    const reqParams = {
      ...data,
      requestId: "CREATETD",
      module: "TERM_DEPOSITE",
      rolloverType: rolloverType,
      autoRollFlag: autoRollFlag,
      months: +data.years > 0 ? +data.years * 12 + "" : data.months,
      years: '0',
    };
    const response = await http.get(config.deposit.verify, reqParams);
    return { status: response.status, data: response.data };
  } catch (err) {
    throw err.response.data;
  }
};

const confirmTermDeposit = async (data) => {
  try {
    let autoRollFlag = "";
    let rolloverType = "";
    let totalMonths = 0;

    if (data?.autoRenewal === "CLOSE_ON_MATURITY") {
      autoRollFlag = "Y";
      rolloverType = "N";
    } else {
      autoRollFlag = "N";
      rolloverType = data?.principle ? "Y" : "N";
    }

    if (+data.years > 0) {
      totalMonths = +data.years * 12;
    }
    const reqParams = {
      ...data,
      requestId: "CREATETDCONFIRM",
      rolloverType: rolloverType,
      autoRollFlag: autoRollFlag,
      months: +data.years > 0 ? +data.years * 12 + "" : data.months,
      years: '0',
    };

    const response = await http.get(config.deposit.confirm, reqParams);
    return { status: response.status, data: response.data };
  } catch (err) {
    throw err.response.data;
  }
};

const DepositService = {
  getCurrencyList,
  getProducts,
  getAll,
  createTermDeposit,
  confirmTermDeposit,
  getDepositAccountDetails,
  getDepositAccountStatement,
};

export default DepositService;
