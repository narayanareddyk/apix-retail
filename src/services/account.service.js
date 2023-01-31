import http from "./http.service";
import config from "../config/constant";
import moment from "moment";
import { store } from "../store";
import { SET_ACCOUNTS, SET_CURRENT_ITEM } from "../store/constants";

const getLast10Transactions = async (accountNo) => {
  try {
    const reqParams = {
      accountNo: accountNo,
      requestId: "MINISTATEMENT",
    };
    const response = await http.get(
      config.account.getAccountMiniStatement,
      reqParams
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const getCurrentMonthTransactions = async (params) => {
  const { app } = store.getState();
  const toDate = moment().format("YYYY-MM-DD");
  const fromDate = moment().startOf("month").format("YYYY-MM-DD");
  try {
    const reqParams = {
      accountNo: params.accountNo,
      fromDate,
      requestId: "FULLSTATEMENT",
      toDate,
      brnCode: app?.profileDetails?.branchCode,
    };
    const response = await http.get(config.account.fullStatement, reqParams);
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const getCustomTransactions = async (params) => {
  const { app } = store.getState();
  try {
    const reqParams = {
      ...params,
      requestId: "FULLSTATEMENT",
      brnCode: app?.profileDetails?.branchCode,
    };
    const response = await http.get(config.account.fullStatement, reqParams);
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const getLast2MonthTransactions = async (params) => {
  const { app } = store.getState();
  const fromDate = moment()
    .subtract(2, "month")
    .startOf("month")
    .format("YYYY-MM-DD");
  const toDate = moment()
    .subtract(1, "month")
    .endOf("month")
    .format("YYYY-MM-DD");
  try {
    const reqParams = {
      accountNo: params.accountNo,
      fromDate,
      requestId: "FULLSTATEMENT",
      toDate,
      branchCode: app?.profileDetails?.branchCode,
    };
    const response = await http.get(config.account.fullStatement, reqParams);
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const getLast3MonthTransactions = async (params) => {
  const { app } = store.getState();
  const fromDate = moment()
    .subtract(3, "month")
    .startOf("month")
    .format("YYYY-MM-DD");
  const toDate = moment()
    .subtract(1, "month")
    .endOf("month")
    .format("YYYY-MM-DD");
  try {
    const reqParams = {
      accountNo: params.accountNo,
      fromDate,
      requestId: "FULLSTATEMENT",
      toDate,
      branchCode: app?.profileDetails?.branchCode,
    };
    const response = await http.get(config.account.fullStatement, reqParams);
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const getAllAccounts = async () => {
  try {
    const { account } = store.getState();
    const { accounts } = account;

    if (accounts?.length === 0) {
      const reqParams = {
        requestId: "ACCOUNTDETAILS",
        accountType: "S",
      };
      const response = await http.get(config.account.getAccounts, reqParams);

      store.dispatch({
        type: SET_ACCOUNTS,
        payload: response.data["accountSummaryDetails"] || [],
      });
      if (
        response.status === 200 &&
        response.data["accountSummaryDetails"].length > 0
      ) {
        store.dispatch({
          type: SET_CURRENT_ITEM,
          payload: response.data["accountSummaryDetails"][0],
        });
      }
      return {
        status: response.status,
        data: response.data["accountSummaryDetails"],
      };
    } else {
      if (accounts?.length > 0) {
        store.dispatch({
          type: SET_CURRENT_ITEM,
          payload: accounts[0],
        });
      }
      return { status: 200, data: accounts };
    }
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

const getAccountClasses = async () => {
  try {
    const reqParams = {
      requestId: "GETACCOUNTCLASSDETAILS",
    };
    const response = await http.post(
      config.account.getAccountClasses,
      reqParams
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const createCASAAccountVerify = async (params) => {
  try {
    const { app } = store.getState();
    const { profileDetails } = app;
    const reqParams = {
      ...params,
      requestId: "CREATEACCOUNTVERIFY",
      custidnumber: profileDetails["custidnumber"],
      customerNumber: profileDetails["customerNumber"],
    };
    const response = await http.get(
      config.account.createCASAAccountVerify,
      reqParams
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const createCASAAccountConfirm = async (params) => {
  try {
    const { app } = store.getState();
    const { profileDetails } = app;

    const reqParams = {
      ...params,
      requestId: "CREATEACCOUNTCONFIRM",
      custidnumber: profileDetails["custidnumber"],
      customerNumber: profileDetails["customerNumber"],
    };
    const response = await http.get(
      config.account.createCASAAccountConfirm,
      reqParams
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const AccountService = {
  getLast10Transactions,
  getAllAccounts,
  getLast3MonthTransactions,
  getLast2MonthTransactions,
  getCurrentMonthTransactions,
  getCustomTransactions,
  getAccountClasses,
  createCASAAccountVerify,
  createCASAAccountConfirm,
};

export default AccountService;
