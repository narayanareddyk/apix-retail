import http from "./http.service";
import config from "../config/constant";
import { store } from "../store";

const verifyInternalAddBeneficiary = async (reqParams) => {
  try {
    const params = {
      requestId: "BENE_VERIFY",
      module: "Beneficary",
      favorites: "N",
      active: "Y",
      ...reqParams,
    };
    const response = await http.get(
      config.beneficiary.verifyAddInternalBene,
      params
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const confirmInternalAddBeneficiary = async (reqParams) => {
  try {
    const params = {
      requestId: "BENE_VERIFY",
      module: "Beneficary",
      favorites: "N",
      ...reqParams,
    };
    const response = await http.get(
      config.beneficiary.confirmAddInternalBene,
      params
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const verifyAddOtherBeneficiary = async (reqParams) => {
  try {
    const params = {
      requestId: "BENE_OTHVERIFY",
      ...reqParams,
    };
    const response = await http.get(
      config.beneficiary.verifyOtherBene,
      params
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const confirmOtherBeneficiary = async (reqParams) => {
  try {
    const params = {
      requestId: "ADDOTHRBENE",
      ...reqParams,
    };
    const response = await http.get(
      config.beneficiary.confirmOtherBene,
      params
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const BeneficiaryService = {
  verifyInternalAddBeneficiary,
  confirmInternalAddBeneficiary,
  verifyAddOtherBeneficiary,
  confirmOtherBeneficiary,
};

export default BeneficiaryService;
