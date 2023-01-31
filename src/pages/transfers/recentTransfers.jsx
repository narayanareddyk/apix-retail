import { Button, Empty } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import TransferService from "../../services/transfers.service";

export default function RecentTransfers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    repeatTransactions();
  }, []);

  const repeatTransactions = useCallback(async () => {
    try {
      const response = await TransferService.repeatTransactions();
      if (response.status === 200) {
        response.data["receiptDetails"].forEach((element) => {
          element.beneName = element?.reqObj?.nfin?.beneficiaryName;
          element.destAccount = element?.reqObj?.fin?.destAccount;
          element.txnCurrency = element?.reqObj?.fin?.txnCurrency;
          element.amount = element?.reqObj?.fin?.amount;
        });
        setDataSource(response.data["receiptDetails"]);
      }
    } catch (err) {}
  }, []);

  return (
    <>
      {dataSource.length === 0 && <Empty style={{ marginTop: 50 }} />}

      {dataSource.map((option, idx) => (
        <div className="d-flex transfer-record" key={idx}>
          <div
            className="d-flex"
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <p>{option.beneName}</p>
            <p>
              <NumberFormat
                value={option.destAccount}
                displayType={"text"}
                format="#### #### #### ####"
              />
            </p>
            <p className="d-flex" style={{ fontWeight: "600" }}>
              <span style={{ marginRight: 3, paddingRight: 0 }}>
                {option["txnCurrency"]}{" "}
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
            </p>
          </div>
          <Button className="round-corner" style={{ height: "inherit" }}>
            Pay Again
          </Button>
        </div>
      ))}
    </>
  );
}
