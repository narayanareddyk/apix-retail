import {
  SET_ACCOUNTS,
  SET_REMARKS,
  SET_CURRENT_ITEM,
  SET_ACCOUNT_REFRESH,
  SET_DEBITS
} from "../constants";

export const setAccounts = (payload) => ({ type: SET_ACCOUNTS, payload });
export const setDebits = (payload) => ({ type: SET_DEBITS, payload });
export const setRemarks = (payload) => ({ type: SET_REMARKS, payload });
export const setCurrentAccountDetails = (payload) => ({
  type: SET_CURRENT_ITEM,
  payload,
});
export const setAccRefresh = (payload) => ({
  type: SET_ACCOUNT_REFRESH,
  payload,
});
