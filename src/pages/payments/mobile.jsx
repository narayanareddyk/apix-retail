import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Input,
  Form,
  Divider,
  Result,
  Breadcrumb,
  Select,
  DatePicker,
} from "antd";
import fieldConfig from "../../config/validations";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
import SourceaccountField from "../components/accountField";

export default function MobilePayment() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [verifyDetails, setVerifyDetails] = useState({});

  function renderSwitch() {
    switch (stage) {
      case 1:
        return renderForm();
      //   case 2:
      //     return renderConfirm();
      //   case 3:
      //     return renderSuccess();
      default:
        return renderForm();
    }
  }

  function renderForm() {
    return (
      <>
        <h4>TopUp</h4>
        <Divider style={{ marginTop: 10 }} type="horizontal" />
        <Form
          name="addInternalBeneficiaryForm"
          layout="vertical"
          requiredMark={true}
        >
          <SourceaccountField />

          <Divider type="horizontal" style={{ marginTop: 0 }} />

          <div className="row">
            <div className="col-6">
              <Form.Item
                label="Transfer Amount"
                name="amount"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>
          </div>

          <div className="btn-group">
            <Button
              type="default"
              htmlType="button"
              onClick={() => navigate("/transfers/beneficiaries")}
            >
              Back
            </Button>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
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
          <a onClick={() => navigate("/payments")}>Payments</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Mobile</Breadcrumb.Item>
      </Breadcrumb>

      <div className="row">
        <div className="col-8">
          <div className="sub-layout-render-secton">{renderSwitch()}</div>
        </div>
      
        
      
       
      </div>
    </>
  );
}
