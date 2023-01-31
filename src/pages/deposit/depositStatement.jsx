import React, { useCallback, useEffect, useState } from "react";
import { Button, Table, Form, Select, DatePicker, Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import moment from "moment";

export default function DepositStatements({ statementList = [] }) {
  const navigate = useNavigate();
  const columns = [
    {
      title: "Reference Number",
      dataIndex: "refNo",
    },
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      render: (record) => (
        <span>{moment(record.transactionDate).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      title: "Account Number",
      dataIndex: "accNo",
    },

    {
      title: "Rate of Interest",
      dataIndex: "interestRate",
    },

    {
      title: "Amount",
      key: "amount",
      width: 100,
      textWrap: "word-break",
      render: (record) => (
        <span className="d-flex">
          <span>
            <NumberFormat
              value={record["amount"]}
              displayType={"text"}
              thousandSeparator={true}
              prefix={""}
              decimalScale={2}
              fixedDecimalScale={true}
              allowedDecimalSeparators={true}
            />
          </span>
        </span>
      ),
    },
  ];

  return (
    <div className="beneficiary-list-section">
      <Table pagination={false} columns={columns} dataSource={statementList} />
    </div>
  );
}
