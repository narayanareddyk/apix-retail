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
  SET_EMAIL,
} from '../constants'

const initialState = {
  mobileNumber: '',
  emailId: '',
  accountInfo: {},
  identityInfo: {},
  selfieImage: '',
  frontImage: '',
  backImage: '',
  basicInfo: {},
  addressInfo: {},
  familyInfo: {},
  signature: '',
  additionalInfo: {},
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ACCOUNT_INFO:
      return { ...state, accountInfo: payload }
    case SET_IDENTITY_INFO:
      return { ...state, identityInfo: payload }
    case SET_SELFIE_IMAGE:
      return { ...state, selfieImage: payload }
    case SET_FRONT_IMAGE:
      return { ...state, frontImage: payload }
    case SET_BACK_IMAGE:
      return { ...state, backImage: payload }
    case SET_SIGNATURE:
      return { ...state, signature: payload }
    case SET_ADDRESS_INFO:
      return { ...state, addressInfo: payload }
    case SET_BASIC_INFO:
      return { ...state, basicInfo: payload }
    case SET_ADDITIONAL_INFO:
      return { ...state, additionalInfo: payload }
    case SET_FAMILY_INFO:
      return { ...state, familyInfo: payload }
    case SET_MOBILE_NUMBER:
      return { ...state, mobileNumber: payload }
    case SET_EMAIL:
      return { ...state, emailId: payload }
    default:
      return state
  }
}
