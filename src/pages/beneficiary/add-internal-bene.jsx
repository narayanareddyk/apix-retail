import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Form, Divider, Result } from "antd";
import fieldConfig from "../../config/validations";
import NumberFormat from "react-number-format";
import BeneficiaryService from "../../services/beneficiary.service";
import { useNavigate } from "react-router-dom";
import successImage from "../../assests/images/transfers/success1.svg";

export default function AddInternalBeneficiary() {
  const [stage, setStage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [verifyDetails, setVerifyDetails] = useState({});
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const onVerify = useCallback(async (data) => {
    try {
      setFormValues(data);
      setLoading(true);
      const response = await BeneficiaryService.verifyInternalAddBeneficiary({
        srcAccount: data.srcAccount,
        beneName: data.shortName,
        maxTransferLimit: data.maxTransferLimit,
        shortName: data.shortName,
      });
      if (response.status === 200) {
        setVerifyDetails(response.data);
        setStage(2);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);

  const onConfirm = useCallback(async () => {
    try {
      setLoading(true);
      const response = await BeneficiaryService.confirmInternalAddBeneficiary({
        srcAccount: formValues.srcAccount,
        beneBrn: verifyDetails.beneBrn,
        beneCurrency: verifyDetails.beneCurrency,
        beneName: verifyDetails.beneName,
        beneType: "IAT",
        maxTransferLimit: formValues.maxTransferLimit,
        shortName: formValues.shortName,
        beneMobileNo: "",
        beneEMail: "",
        otp: otp || "0000",
      });
      if (response.status === 200) {
        setLoading(false);
        setMessage(response.data["message"]);
        setStage(3);
      }
    } catch (err) {
      setLoading(false);
      setOtp("");
    }
  }, [formValues, verifyDetails, otp]);

  function renderSwitch() {
    switch (stage) {
      case 1:
        return renderForm();
      case 2:
        return renderConfirm();
      case 3:
        return renderSuccess();
      default:
        return renderForm();
    }
  }

  function renderForm() {
    return (
      <>
        <h3>Add Internal Beneficiary</h3>
        <Divider style={{ marginTop: 10 }} type="horizontal" />
        <Form
          name="addInternalBeneficiaryForm"
          layout="vertical"
          requiredMark={true}
          onFinish={onVerify}
          initialValues={{ ...formValues }}
        >
          <div className="row">
            <div className="col-6">
              <Form.Item
                label="Nick Name"
                name="shortName"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>

            <div className="col-6">
              <Form.Item
                label="Account Number"
                name="srcAccount"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>

            <div className="col-6">
              <Form.Item
                label="Confirm Account Number"
                name="srcAccountConfirm"
                rules={[
                  { required: true, message: "Required Field" },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("srcAccount") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Not Matched!");
                    },
                  }),
                ]}
              >
                <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>

            <div className="col-6">
              <Form.Item
                label="Transfer Limit"
                name="maxTransferLimit"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>

            <div className="col-6">
              <Form.Item
                label="Beneficiary Email"
                name="beneEMail"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>

            <div className="col-6">
              <Form.Item
                label="Beneficiary Mobile Number"
                name="beneMobileNo"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Input maxLength={10} />
              </Form.Item>
            </div>
          </div>

          <div className="btn-group">
            <Button
              type="default"
              htmlType="button"
              onClick={() => navigate("/transfers")}
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

  function renderConfirm() {
    return (
      <>
        <h3>Confirm Internal Beneficiary</h3>
        <Divider style={{ marginTop: 10 }} type="horizontal" />
        <div className="row render-confirmation">
          <div className="col-4">
            <label>Nick Name</label>
            <span>{formValues["shortName"] || "-"}</span>
          </div>

          <div className="col-4">
            <label>Beneficiary Name</label>
            <span>{verifyDetails["beneName"] || "-"}</span>
          </div>

          <div className="col-4">
            <label>Account Number</label>
            <span>{formValues["srcAccount"] || "-"}</span>
          </div>

          <div className="col-4">
            <label>Transfer Limit</label>
            <span className="d-flex">
              <span style={{ marginRight: 5 }}>
                {verifyDetails["beneCurrency"]}{" "}
              </span>
              <NumberFormat
                value={formValues["maxTransferLimit"]}
                displayType={"text"}
                thousandSeparator={true}
                prefix={""}
                decimalScale={2}
                fixedDecimalScale={true}
                allowedDecimalSeparators={true}
              />
            </span>
          </div>

          <div className="col-4">
            <label>Beneficiary Branch Code</label>
            <span>{verifyDetails["beneBrn"]}</span>
          </div>

          <div className="col-4">
            <label>Beneficiary Email</label>
            <span>{formValues["beneEMail"]}</span>
          </div>

          <div className="col-4">
            <label>Beneficiary Mobile Number</label>
            <span>{formValues["beneMobileNo"]}</span>
          </div>
        </div>
        <Divider type="horizontal" />

        {verifyDetails["otpEnable"] && (
          <>
            <p>
              Please enter 6 digits of OTP sent to your registered Mobile Number
              or Email Address
            </p>
            <div className="row">
              <div className="col-2">
                <Input value={otp} onChange={(e) => setOtp(e.target.value)} />
              </div>
              <div className="col-10">
                <Button
                  loading={loading}
                  type="primary"
                  disabled={otp.length < 6}
                  onClick={() => onConfirm()}
                >
                  Submit
                </Button>
                <Button
                  style={{ marginLeft: 20 }}
                  type="default"
                  htmlType="button"
                  onClick={() => setStage(1)}
                >
                  Back
                </Button>
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  function renderSuccess() {
    return (
      <div className="render-success-section">
        <img src={successImage} />
        <p>{message}</p>
        <div className="btn-group-style">
          {/* <Button size={"large"} style={{ margin: "0 auto" }}>
            Download Receipt
          </Button> */}

          <Button
            size={"large"}
            style={{ margin: "0 auto" }}
            type="primary"
            onClick={() => navigate("/transfers/beneficiaries")}
          >
            Back To Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="sub-layout-render-secton">{renderSwitch()}</div>
    </>
  );
}
