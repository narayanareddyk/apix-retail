import {
  SET_ACCOUNTS,
  SET_REMARKS,
  SET_CURRENT_ITEM,
  SET_ACCOUNT_REFRESH,
  SET_DEBITS
} from "../constants";

const initialState = {
  accounts: [],
  remarks: [],
  debitList:[],
  currentItem: {},
  isAccRefresh: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ACCOUNTS:
      return { ...state, accounts: payload };
    case SET_REMARKS:
      return { ...state, remarks: payload };
    case SET_CURRENT_ITEM:
      return { ...state, currentItem: payload };
    case SET_ACCOUNT_REFRESH:
      return { ...state, isAccRefresh: payload };
      case SET_DEBITS:
        return { ...state, debitList: payload };
    default:
      return state;
  }
};
