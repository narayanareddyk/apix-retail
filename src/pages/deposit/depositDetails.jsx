import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import NumberFormat from "react-number-format";

export default function DepositDetails({ details = {} }) {
  return (
    <div className="row render-confirmation sub-layout-render-secton">
      <div className="col-4">
        <label>Account Number</label>
        <span>{details["accountNo"] || "-"}</span>
      </div>
      <div className="col-4">
        <label>Account Description</label>
        <span>{details["accDesc"] || "-"}</span>
      </div>
      <div className="col-4">
        <label>Account Open Date</label>
        <span>
          {moment(details["accountOpenDate"]).format("DD-MM-YYYY") || "-"}
        </span>
      </div>
      <div className="col-4">
        <label>Branch Code</label>
        <span>{details["brnCode"] || "-"}</span>
      </div>
      <div className="col-4">
        <label>Debit Account Number</label>
        <span>{details["debitAcc"] || "-"}</span>
      </div>

      <div className="col-4">
        <label>Rate of Interest</label>
        <span>{details["interestRate"] || "0"}%</span>
      </div>

      <div className="col-4">
        <label>Maturity Amount</label>
        <span className="d-flex">
          <span style={{ marginRight: 5 }}>{details["currency"]} </span>
          <NumberFormat
            value={details["maturityAmt"] || 0}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            allowedDecimalSeparators={true}
            decimalSeparator={"."}
            fixedDecimalScale={true}
            prefix={""}
          />
        </span>
      </div>

      <div className="col-4">
        <label>Maturity Date</label>
        <span>
          {moment(details["maturityDate"]).format("DD-MM-YYYY") || "-"}
        </span>
      </div>

      <div className="col-4">
        <label>Deposited Amount</label>
        <span className="d-flex">
          <span style={{ marginRight: 5 }}>{details["currency"]} </span>
          <NumberFormat
            value={details["tdAmt"]}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            allowedDecimalSeparators={true}
            decimalSeparator={"."}
            fixedDecimalScale={true}
            prefix={""}
          />
        </span>
      </div>
    </div>
  );
}
