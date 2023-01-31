import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Form, Divider, Result, Breadcrumb, Select } from "antd";
import { useSelector } from "react-redux";
import {
  accountListSelector,
  selectedAccountDetailsSelector,
} from "../../store/selectors/account.selector";
import NumberFormat from "react-number-format";
import { setCurrentAccountDetails } from "../../store/actions/account.action";
import { useDispatch } from "react-redux";

export default function SourceaccountField({
  module = "",
  disabled = false,
  beneDetails = {},
}) {
  console.log(beneDetails);
  const dispatch = useDispatch();
  const accountList = useSelector(accountListSelector);
  const [selectedAccount, setSelectedAccount] = useState({});
  const selectedAccountDetails = useSelector(selectedAccountDetailsSelector);

  const handleAccountChange = useCallback((account) => {
    try {
      const selected = accountList.filter((ele) => ele.accountNo == account)[0];
      dispatch(setCurrentAccountDetails(selected));
      //   setSelectedAccount(selected);
    } catch (err) {}
  }, []);

  return (
    <div className="account-number-field">
      <div className="row">
        <div className="col-6">
          <label className="account-field-label">Source Account Number</label>
          <Select
            disabled={disabled}
            style={{ width: "100%" }}
            onChange={handleAccountChange}
            placeholder="Choose Account"
            value={selectedAccountDetails["accountNo"]}
          >
            {accountList.map((account, idx) => (
              <Select.Option key={idx} value={account.accountNo}>
                {account.accountNo} - Saving Account
              </Select.Option>
            ))}
          </Select>

          <span
            className="bal-txt"
            style={{ marginBottom: 20, display: "flex", marginTop: 10 }}
          >
            Available Balance:{" "}
            <span style={{ display: "flex", marginLeft: 10 }}>
              <span style={{ marginRight: 5 }}>
                {selectedAccountDetails["currency"]}{" "}
              </span>
              <NumberFormat
                value={selectedAccountDetails["avlBal"]}
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={2}
                allowedDecimalSeparators={true}
                decimalSeparator={"."}
                fixedDecimalScale={true}
                prefix={""}
              />
            </span>
          </span>
        </div>
        {module === "TRANSFERS" && (
          <div className="col-6">
            <label className="account-field-label">Beneficiary Account</label>
            <Input
              readOnly
              value={`${beneDetails["beneAccNo"]} - ${beneDetails["beneName"]}`}
            />

            {/* <span
              className="bal-txt"
              style={{ marginBottom: 20, display: "flex", marginTop: 10 }}
            >
              Beneficiary Name:{" "}
              <span style={{ display: "flex", marginLeft: 10 }}>
                {beneDetails["beneName"]}
              </span>
            </span> */}
          </div>
        )}
      </div>
    </div>
  );
}
