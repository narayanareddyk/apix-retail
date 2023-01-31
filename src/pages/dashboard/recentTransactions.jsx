import { Empty } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import AccountService from "../../services/account.service";
import { selectedAccountDetailsSelector } from "../../store/selectors/account.selector";
import statementIcon from "../../assests/images/common/statementIcon.svg";


export default function RecentTransaction() {
  const selectedAccountDetails = useSelector(selectedAccountDetailsSelector);
  const [statementList, setStatementList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(selectedAccountDetails).length > 0) {
      getAccountMiniStatement(selectedAccountDetails?.accountNo);
    }
  }, [selectedAccountDetails]);

  const getAccountMiniStatement = useCallback(async (selected) => {
    try {
      setStatementList([]);
      setLoading(true);
      const response = await AccountService.getLast10Transactions(selected);
      if (response.status === 200) {
        setLoading(false);
        setStatementList(response.data["miniStatement"].slice(0, 5));
      }
    } catch (err) {
      setLoading(false);
    }
  }, []);
  return (
    <>
      {statementList.length === 0 && <Empty style={{ marginTop: 50 }} />}

      {statementList.map((option, idx) => (
        <div key={idx} className="statement-card">
          <div className="d-flex" style={{ alignItems: "center" }}>
            <div className="img-wrapper image-bg-color-2">
              <img height={30} src={statementIcon} />
            </div>
            <div>
              <h5>{option.narration}</h5>
              <span className="txnValuedDate">{option.txnValuedDate}</span>
            </div>
          </div>
          <span className="d-flex">
            <span
              className={
                option["debitOrCredit"] === "C"
                  ? "d-flex credit-style"
                  : "d-flex debit-style"
              }
            >
              <span>
                {option["debitOrCredit"] === "C" ? "+" : "-"}
                {option["currency"]}{" "}
              </span>
              <NumberFormat
                value={option["amount"]}
                displayType={"text"}
                thousandSeparator={true}
                prefix={""}
                decimalScale={2}
                fixedDecimalScale={true}
                allowedDecimalSeparators={true}
              />
            </span>
          </span>
        </div>
      ))}
    </>
  );
}
