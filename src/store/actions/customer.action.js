import {
    SET_ACCOUNT_INFO,
    SET_IDENTITY_INFO,
    SET_SELFIE_IMAGE,
    SET_FRONT_IMAGE,
    SET_BACK_IMAGE,
    SET_SIGNATURE,
    SET_ADDRESS_INFO,
    SET_BASIC_INFO,
    SET_ADDITIONAL_INFO,
    SET_FAMILY_INFO,
    SET_MOBILE_NUMBER,
    SET_EMAIL
  } from '../constants'
  
  export const setAccountInfo = (payload) => ({ type: SET_ACCOUNT_INFO, payload })
  export const setIdentityInfo = (payload) => ({ type: SET_IDENTITY_INFO, payload })
  export const setSelfieImageInfo = (payload) => ({ type: SET_SELFIE_IMAGE, payload })
  export const setFrontImageInfo = (payload) => ({ type: SET_FRONT_IMAGE, payload })
  export const setBackImageInfo = (payload) => ({ type: SET_BACK_IMAGE, payload })
  export const setSignatureInfo = (payload) => ({ type: SET_SIGNATURE, payload })
  export const setAddressInfo = (payload) => ({ type: SET_ADDRESS_INFO, payload })
  export const setBasicInfo = (payload) => ({ type: SET_BASIC_INFO, payload })
  export const setAdditionalInfo = (payload) => ({ type: SET_ADDITIONAL_INFO, payload })
  export const setFamilyInfo = (payload) => ({ type: SET_FAMILY_INFO, payload })
  export const setMobileNo = (payload) => ({ type: SET_MOBILE_NUMBER, payload })
  export const setEmailAddress = (payload) => ({ type: SET_EMAIL, payload })


