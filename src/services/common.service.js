import http from "./http.service";
import config from "../config/constant";
import Axios from "axios";

const getAllBanks = async () => {
  try {
    const reqParams = {
      requestId: "OTHERBANKSLIST",
    };
    const response = await http.get(config.common.otherBanksList, reqParams);
    return { status: response.status, data: response.data }; //.bankList
  } catch (err) {
    return Promise.reject(err);
  }
};

const getAllCountries = async () => {
  try {
    const reqParams = {
      requestId: "BENE_ADDINTBEN",
      module: "Beneficary",
    };
    const response = await http.get(config.common.countryList, reqParams);
    return { status: response.status, data: response.data }; //.bankList
  } catch (err) {
    return Promise.reject(err);
  }
};

const getRemarksCategory = async () => {
  try {
    const reqParams = {
      requestId: "REMARKLIST",
    };
    const response = await http.post(
      config.common.getRemarksCategory,
      reqParams
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const getallExchangeRates = async () => {
  try {
    const reqParams = {
      requestId: "CROSSCURRENCYRATES",
      userName: "DEFAULT",
      module: "Information",
      channelType: "RETAIL",
      language: "EN",
      ipAddress: "0.0.0.0",
    };
    const response = await Axios.post(
      "https://ebanking.izb.co.zm:7004/apigateway/bankingservices/public/information/getCrossCurrencyRates",
      reqParams
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const calculateLoanDetails = async (params) => {
  try {
    const reqParams = {
      requestId: "LOANSCALCULATOR",
      ...params,
    };
    const response = await http.get(config.calLoanDep, reqParams);
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const CommonService = {
  getAllBanks,
  getAllCountries,
  getRemarksCategory,
  getallExchangeRates,
  calculateLoanDetails,
};

export default CommonService;
