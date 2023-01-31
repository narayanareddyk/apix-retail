import http from "./http.service";
import config from "../config/constant";
import { store } from "../store";

const data = {
  data: {
    ADDRESSPROOFTYPE: [
      { id: 1, name: "Passport" },
      { id: 2, name: "Driving Licence" },
      { id: 3, name: "UID (Aadhaar)" },
      { id: 4, name: "Voter ID Card" },
      { id: 5, name: "NERGA Job Card" },
      { id: 6, name: "Others" },
    ],
    ADDRESSTYPE: [
      { id: 1, name: "Residential / Business" },
      { id: 2, name: "Residential" },
      { id: 3, name: "Business" },
      { id: 4, name: "Registered Office" },
      { id: 5, name: "Unspecified" },
    ],
    GENDER: [
      { id: 1, name: "M - Male" },
      { id: 2, name: "F - Female" },
      { id: 3, name: "T - Transgender" },
      { id: 4, name: "N- Non Individuals" },
    ],
    IDPROOFTYPE: [
      { id: 1, name: "A - Passport Number" },
      { id: 2, name: "B - Voter ID Card" },
      { id: 3, name: "C - PAN Card" },
      { id: 4, name: "D - Driving Licence" },
      { id: 5, name: "E - UID (Aadhaar)" },
      { id: 6, name: "F - NREGA Job Card" },
      {
        id: 7,
        name: "Z - Other State or Central Government Notified Documents",
      },
      { id: 8, name: "Photo" },
      { id: 9, name: "Signature" },
      { id: 10, name: "No ID Proof" },
    ],
    OCCUPATION: [
      { id: 1, name: "S - Service Private Sector" },
      { id: 2, name: "S - Service Public Sector" },
      { id: 3, name: "S - Service Government Sector" },
      { id: 4, name: "O - Professional" },
      { id: 5, name: "O - Self Employed" },
      { id: 6, name: "O - Retired" },
      { id: 7, name: "O - House wife" },
      { id: 8, name: "O - Student" },
      { id: 9, name: "B - Business" },
      { id: 10, name: "X - Not Categorised" },
    ],

    CITIZENSHIP: [
      { id: 1, name: "IN - Indian" },
      { id: 2, name: "Others" },
      { id: 3, name: "Foreigner" },
    ],
    CASTECATEGORY: [
      { id: 1, name: "General" },
      { id: 2, name: "SC" },
      { id: 3, name: "ST" },
      { id: 4, name: "OBC" },
    ],
    MARITALSTATUS: [
      { id: 1, name: "Married" },
      { id: 2, name: "Unmarried" },
      { id: 3, name: "Others" },
    ],
    NAMEPREFIX: [
      { id: 1, name: "Mr" },
      { id: 2, name: "Mrs" },
      { id: 3, name: "Ms" },
      { id: 4, name: "Dr" },
    ],
    BRANCH: [
      { id: 1, name: "1001 JP Nagar" },
      { id: 2, name: "1002 Vijay Nagar" },
      { id: 3, name: "1003 Rajaji Nagar" },
    ],
    ACCOUNTHOLDERTYPE: [
      { id: 1, name: "Guardian of Minor" },
      { id: 2, name: "Assignee" },
      { id: 3, name: "Authorised Representative" },
      { id: 4, name: "Joint Signatory" },
      { id: 5, name: "Non-Individual A/c Operator" },
      { id: 6, name: "Not Required" },
    ],
    CASASCHEME: [
      { id: 1, name: "2012001 Savings Account" },
      { id: 2, name: "2010002 Regular Member Shares " },
      { id: 3, name: "2013003 CurrentAccounts" },
    ],
  },
};
const getRegistrationRequiredValues = async () => {
  try {
    const reqParams = {
      requestId: "GETDATALIST",
      userName: "Dummy",
      module: "Information",
      dataList: [
        "ADDRESSPROOFTYPE",
        "ADDRESSTYPE",
        "GENDER",
        "IDPROOFTYPE",
        "OCCUPATION",
        "ACCOUNTTYPE",
        "RELIGION",
        "CITIZENSHIP",
        "CASTECATEGORY",
        "MARITALSTATUS",
        "NAMEPREFIX",
        "BRANCH",
        "ACCOUNTHOLDERTYPE",
        "ADDRESSTYPE",
        "APPLICATIONMODULE",
        "CASASCHEME",
      ],
    };
    // const response = await http.post(config.newCustomer.getDataList, reqParams);
    return { status: 200, data: data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const getNewCustomerTerms = async () => {
  try {
    const reqParams = {
      module: "REG",
      requestId: "TERMS",
    };
    const response = await http.get(
      config.newCustomer.termsAndConditions,
      reqParams
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const verifyFacematch = async (image1, image2) => {
  try {
    const reqParams = {
      image1: image1,
      image2: image2,
      module: "LOGIN",
    };
    const response = await http.post(config.newCustomer.faceMatch, reqParams);
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const verifyLiveness = async (image) => {
  try {
    const reqParams = {
      image: image,
      module: "LOGIN",
    };
    const response = await http.post(
      config.newCustomer.verifyLiveness,
      reqParams
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const getKycDetails = async (image1, image2) => {
  try {
    const reqParams = {
      image1: image1,
      image2: image2,
      module: "LOGIN",
    };
    const response = await http.post(
      config.newCustomer.getKycDetails,
      reqParams
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const validateId = async (params) => {
  try {
    const reqParams = {
      ...params,
      module: "FTVERIFYIAT",
    };
    const response = await http.get(config.newCustomer.validateId, reqParams);
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const getBranchList = async () => {
  try {
    const reqParams = {
      module: "GETBRANCHDETAILS",
      requestId: "REGISTUSER",
    };
    const response = await http.post(config.newCustomer.branchList, reqParams);
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const customerCreateOtpGenerate = async (params) => {
  try {
    const reqParams = {
      ...params,
      requestId: "REGISTUSER",
    };
    const response = await http.get(
      config.newCustomer.customerCreateOtpGenerate,
      reqParams
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const postCreateNewCustomer = async (params) => {
  try {
    const reqParams = {
      ...params,
      requestId: "CREATECUSTOMER",
      module: "Information",
    };
    const response = await http.post(
      config.newCustomer.createNewCustomer,
      reqParams
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const verifyMobileNo = async (data) => {
  try {
    const reqParams = {
      ...data,
      requestId: "REGISTUSER",
    };
    const response = await http.get(config.newCustomer.generateOtp, reqParams);
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const validateMobileNoOtp = async (data) => {
  try {
    const reqParams = {
      ...data,
      requestId: "REGISTUSER",
      randomKey: "",
    };
    const response = await http.get(config.newCustomer.validateOtp, reqParams);
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const verifyEmail = async (data) => {
  try {
    const { customer } = store.getState();
    const reqParams = {
      ...data,
      requestId: "REGISTUSER",
      mobileNumber: customer?.mobileNumber,
    };
    const response = await http.get(config.newCustomer.generateOtp, reqParams);
    return { status: response.status, data: response.data };
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

const validateEmailOtp = async (data) => {
  try {
    const reqParams = {
      ...data,
      requestId: "REGISTUSER",
      randomKey: "",
    };
    const response = await http.get(config.newCustomer.validateOtp, reqParams);
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const getTermsAndConditions = async (data) => {
  try {
    const reqParams = {
      requestId: "TERMS",
      type: "RETAIL",
      ...data,
    };
    const response = await http.get(
      config.newCustomer.termsAndConditions,
      reqParams
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const validateIdcheck = async (data) => {
  try {
    const reqParams = {
      ...data,
      requestId: "IDCHECK",
      randomKey: "",
    };
    const response = await http.get(
      config.newCustomer.validateIdCheck,
      reqParams
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};

const NewCustomerService = {
  getRegistrationRequiredValues,
  getNewCustomerTerms,
  verifyFacematch,
  getKycDetails,
  verifyLiveness,
  validateId,
  getBranchList,
  customerCreateOtpGenerate,
  postCreateNewCustomer,
  verifyMobileNo,
  validateMobileNoOtp,
  verifyEmail,
  validateEmailOtp,
  getTermsAndConditions,
  validateIdcheck,
};

export default NewCustomerService;
