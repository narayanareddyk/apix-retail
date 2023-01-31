import http from "./http.service";
import config from "../config/constant";


const getAllBeneficiaries = async () => {
    try {
      const reqParams = {
        requestId: 'BENE_LIST',
        module: 'Beneficary',
      }
      const response = await http.get(config.transfers.getAllBeneficiaries, reqParams)
      const beneficiaries = response.data
      const beneficiaryList = [
        ...beneficiaries.internalBeneficiaries,
        ...beneficiaries.thirdPartyBeneficiaries,
      ]
      const accountList = beneficiaryList.map((v) => v.beneAccNo)
      const params = {
        accountNo: accountList,
        requestId: 'BENE_IMGLIST',
        module: 'Beneficary',
      }
      const imagesResponse = await http.get(config.transfers.getBeneficiaryImages, params)
      const images = imagesResponse.data.imagesList
      beneficiaries.internalBeneficiaries.forEach((ben) => {
        const image = images.find((v) => ben.beneAccNo === v.acctNo)
        ben.image = image === undefined ? null : `data:image/png;base64,${image.imageData}`
      })
      beneficiaries.thirdPartyBeneficiaries.forEach((ben) => {
        const image = images.find((v) => ben.beneAccNo === v.acctNo)
        ben.image = image === undefined ? null : `data:image/png;base64,${image.imageData}`
      })
      return { status: response.status, data: beneficiaries }
    } catch (err) {
        return Promise.reject(err);
    }
  }


  
const verifyFundTransfer = async (reqParams) => {
  try {
    const params = {
      module: 'FUNDTRANSFER',
      ...reqParams,
    }
    const response = await http.get(config.transfers.FUND_TRANSFER_VERIFY, params)
    return { status: response.status, data: response.data }
  } catch (err) {
    throw err.response.data
  }
}

const confirmFundTransfer = async (reqParams) => {
  try {
    const params = {
      module: 'FUNDTRANSFER',
      ...reqParams,
    }
    const response = await http.get(config.transfers.FUND_TRANSFER_CONFIRM, params)
    return { status: response.status, data: response.data }
  } catch (err) {
    throw err.response.data
  }
}


const repeatTransactions = async (reqParams) => {
  try {
    const params = {
      module: 'FUNDTRANSFER',
      requestId: "RECEIPTDOWNLOAD",
      page: 0,
      size: 5,
      ...reqParams,
    }
    const response = await http.get(config.transfers.repeatTransactions, params)
    return { status: response.status, data: response.data }
  } catch (err) {
    throw err.response.data
  }
}


const TransferService = {
  getAllBeneficiaries,
  verifyFundTransfer,
  confirmFundTransfer,
  repeatTransactions
};

export default TransferService;
