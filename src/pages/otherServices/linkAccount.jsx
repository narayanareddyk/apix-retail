import { Breadcrumb, Button, Form, Input } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { accountListSelector } from "../../store/selectors/account.selector";

export default function LinkAccount() {
  const [stage, setStage] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const accountList = useSelector(accountListSelector);

  function renderSwitch() {
    switch (stage) {
      case 1:
        return renderList();
      default:
        return renderList();
    }
  }

  function renderList() {
    return (
      <>
        <div className="row">
          <div className="col-7">
            <h5>Linked Account List</h5>
            {accountList?.map((option, idx) => (
              <div
                key={idx}
                className="sub-layout-render-secton  linked-options"
              >
                <div>
                  <p>Account Number</p>
                  <p>{option?.accountNo}</p>
                </div>
                <Button className="round-corner">Delink Account</Button>
              </div>
            ))}
          </div>
          <div className="col-3">
            <h5>Link Account</h5>
            <div className="sub-layout-render-secton">
              <Form name="linkForm" layout="vertical" requiredMark={true}>
                <Form.Item
                  label="Account Number"
                  name="accountNumber"
                  rules={[{ required: true, message: "Required Field" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Confirm Account Number"
                  name="cAccountNumber"
                  rules={[{ required: true, message: "Required Field" }]}
                >
                  <Input />
                </Form.Item>

                <Button type="primary" block htmlType="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb className="bread-crumb-section">
        <Breadcrumb.Item>
          <a onClick={() => navigate("/dashboard")}>Dashboard</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a onClick={() => navigate("/otherServices")}>Other Services</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Link Account</Breadcrumb.Item>
      </Breadcrumb>
      <div>{renderSwitch()}</div>
    </>
  );
}
