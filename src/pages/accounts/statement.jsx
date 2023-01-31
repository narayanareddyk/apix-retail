import React, { useCallback, useEffect, useState } from "react";
import { Button, Table, Form, Select, DatePicker, Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
import AccountService from "../../services/account.service";
import NumberFormat from "react-number-format";
import {
  accountListSelector,
  selectedAccountDetailsSelector,
} from "../../store/selectors/account.selector";
import { useSelector } from "react-redux";
import moment from "moment";

export default function Statement() {
  const navigate = useNavigate();
  const accountList = useSelector(accountListSelector);
  const [statementList, setStatementList] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectedAccountDetails = useSelector(selectedAccountDetailsSelector);

  const columns = [
    {
      title: "Txn.Date",
      dataIndex: "txnValuedDate",
    },

    {
      title: "Narration",
      dataIndex: "narration2",
    },


    {
      title: "Txn. Description",
      dataIndex: "remarks",
    },
    {
      title: "Amount",
      key: "amount",
      width: 100,
      textWrap: "word-break",
      render: (record) => (
        <span className="d-flex">
          <span
            className={
              record["debitOrCredit"] === "C"
                ? "d-flex credit-style"
                : "d-flex debit-style"
            }
          >
            <span>
              {record["debitOrCredit"] === "C" ? "+" : "-"}
              {record["currency"]}{" "}
            </span>
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
        setStatementList(response.data["miniStatement"].slice(0,10));
      }
    } catch (err) {
      setLoading(false);
    }
  }, []);

  const getCurrentMonthTransactions = useCallback(async (selected) => {
    try {
      setStatementList([]);
      setLoading(true);
      const response = await AccountService.getCurrentMonthTransactions(
        selected
      );
      if (response.status === 200) {
        setLoading(false);
        setStatementList(response.data["items"]);
      }
    } catch (err) {
      setLoading(false);
    }
  }, []);

  const getLast2MonthTransactions = useCallback(async (selected) => {
    try {
      setStatementList([]);
      setLoading(true);
      const response = await AccountService.getLast2MonthTransactions(selected);
      if (response.status === 200) {
        setLoading(false);
        setStatementList(response.data["items"]);
      }
    } catch (err) {
      setLoading(false);
    }
  }, []);

  const getLast3MonthTransactions = useCallback(async (selected) => {
    try {
      setStatementList([]);
      setLoading(true);
      const response = await AccountService.getLast3MonthTransactions(selected);
      if (response.status === 200) {
        setLoading(false);
        setStatementList(response.data["items"]);
      }
    } catch (err) {
      setLoading(false);
    }
  }, []);

  const onVerify = useCallback(
    async (values) => {
      try {
        console.log(values);
        const req = {
          accountNo: selectedAccountDetails?.accountNo,
          fromDate: moment(values.fromDate).format("YYYY-MM-DD"),
          toDate: moment(values.toDate).format("YYYY-MM-DD"),
        };
        setLoading(true);
        const response = await AccountService.getCustomTransactions(req);
        if (response.status === 200) {
          setLoading(false);
          setStatementList(response.data["items"]);
        }
      } catch (err) {}
    },
    [selectedAccountDetails]
  );

  return (
    <div className="statement-section">
      <Breadcrumb className="bread-crumb-section">
        <Breadcrumb.Item>
          <a onClick={() => navigate("/dashboard")}>Dashboard</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a onClick={() => navigate("/accounts")}>Accounts</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Statements</Breadcrumb.Item>
      </Breadcrumb>
      <div className="row">
        <div className="col-12">
          <div className="sub-layout-render-secton">
            <Form
              name="StatementForm"
              layout="vertical"
              requiredMark={false}
              initialValues={{
                accountNumber: selectedAccountDetails["accountNo"],
              }}
              onFinish={onVerify}
            >
              <div className="row">
                <div className="col-3">
                  <Form.Item label="Account Number" name="accountNumber">
                    <Select
                      onChange={getAccountMiniStatement}
                      placeholder="Choose Option"
                    >
                      {accountList.map((account, idx) => (
                        <Select.Option key={idx} value={account.accountNo}>
                          {account.accountNo}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-3">
                  <Form.Item label="Transaction Date From" name="fromDate">
                    <DatePicker
                      format={"MM/DD/YYYY"}
                      placeholder="MM/DD/YYYY"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
                <div className="col-3">
                  <Form.Item label="Transaction Date To" name="toDate">
                    <DatePicker
                      format={"MM/DD/YYYY"}
                      placeholder="MM/DD/YYYY"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>

                <div className="col-3">
                  <Button
                    style={{ marginTop: 29 }}
                    block
                    type="primary"
                    htmlType="submit"
                  >
                    Custom Search
                  </Button>
                </div>
              </div>
            </Form>
            <div className="row">
              <div className="col-3">
                <Button
                  block
                  type="default"
                  htmlType="button"
                  onClick={() =>
                    getAccountMiniStatement(selectedAccountDetails?.accountNo)
                  }
                >
                  Last 10 Transactions
                </Button>
              </div>
              <div className="col-3">
                <Button
                  block
                  type="default"
                  htmlType="button"
                  onClick={() =>
                    getCurrentMonthTransactions(selectedAccountDetails)
                  }
                >
                  Current Month
                </Button>
              </div>

              <div className="col-3">
                <Button
                  block
                  type="default"
                  htmlType="button"
                  onClick={() =>
                    getLast2MonthTransactions(selectedAccountDetails)
                  }
                >
                  Last 2 Months
                </Button>
              </div>

              <div className="col-3">
                <Button
                  block
                  type="default"
                  htmlType="button"
                  onClick={() =>
                    getLast3MonthTransactions(selectedAccountDetails)
                  }
                >
                  Last 3 Months
                </Button>
              </div>
            </div>
          </div>
          <h5>Transaction History</h5>
          <div className="beneficiary-list-section">
            <Table
              loading={loading}
              pagination={true}
              columns={columns}
              dataSource={statementList}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
