import { Breadcrumb, Button, Divider, Form, Input, Select } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountService from "../../services/account.service";
import { accountListSelector } from "../../store/selectors/account.selector";
import successImage from "../../assests/images/transfers/success.svg";
import NewCustomerService from "../../services/new-customer.service";

export default function AddAccount(props) {
  const [stage, setStage] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [accountClassList, setAccountClassList] = useState([
    {
      id: 2012001,
      name: "Savings Account",
    },
    {
      id: 2013003,
      name: "Current Account",
    },
  ]);
  const accountList = useSelector(accountListSelector);
  const [formValues, setFormValues] = useState({});
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [verifyDetails, setVerifyDetails] = useState({});

  // useEffect(() => {
  //   getAccountClasses();
  // }, []);

  // const getAccountClasses = useCallback(async () => {
  //   try {
  //     const response = await NewCustomerService.getRegistrationRequiredValues();
  //     if (response.status === 200) {
  //       setAccountClassList(response.data["data"]);
  //     }
  //   } catch (err) {}
  // }, []);

  const onVerify = useCallback(
    async (values) => {
      try {
        // const selected = accountList.filter(
        //   (ele) => ele.accountNo === values.accountNumber
        // )[0];
        const reqParams = {
          accClass: values.accountClass,
          // accountType: selected["accountType"],
          // brnCode: selected["brnCode"],
          // currency: selected["currency"],
          // srcAccount: selected["accountNo"],
          // srcBranch: selected["brnCode"],
        };
        setFormValues({ ...values });
        setLoading(true);
        const response = await AccountService.createCASAAccountVerify(
          reqParams
        );
        if (response.status === 200) {
          setLoading(false);
          setVerifyDetails(response.data);
          setStage(2);
        }
      } catch (err) {
        setLoading(false);
      }
    },
    [accountList]
  );

  const onConfirm = useCallback(async () => {
    try {
      const reqParams = {
        accClass: formValues.accountClass,
        // accountType: formValues["accountType"],
        // brnCode: formValues["brnCode"],
        // currency: formValues["currency"],
        // srcAccount: formValues["accountNo"],
        // srcBranch: formValues["brnCode"],
        otpNo: otp,
      };
      setLoading(true);
      const response = await AccountService.createCASAAccountConfirm(reqParams);
      if (response.status === 200) {
        setLoading(false);
        setMessage(`${response.data?.message} - ${response.data?.accountNo}`);
        setStage(3);
      }
    } catch (err) {}
  }, [formValues, otp, verifyDetails]);

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
        <Form
          name="linkForm"
          layout="vertical"
          onFinish={onVerify}
          requiredMark={true}
          initialValues={formValues}
        >
          <Form.Item
            label="Account Class"
            name="accountClass"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Select placeholder="Account Class">
              {accountClassList.map((option, idx) => (
                <Select.Option key={idx} value={option.id}>
                  {option.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* <Form.Item
            label="Funding Account Number"
            name="accountNumber"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Select placeholder="Funding Account Number">
              {accountList?.map((option, idx) => (
                <Select.Option key={idx} value={option.accountNo}>
                  {option.accountNo}
                </Select.Option>
              ))}
            </Select>
          </Form.Item> */}

          <Button loading={loading} type="primary" block htmlType="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  }

  function renderConfirm() {
    return (
      <>
        <div className="row render-confirmation">
          <div className="col-12">
            <label>Account Class</label>
            <span>
              {accountClassList.filter(
                (ele) => ele.id === formValues["accountClass"]
              )[0].name || "-"}
            </span>
          </div>
        </div>
        <Divider type="horizontal" style={{ marginTop: 0 }} />

        {verifyDetails["otpEnable"] && (
          <>
            <p>
              Please enter OTP send to your registered mobile number or email
              address
            </p>
            <div>
              <div>
                <Input maxLength={6} onChange={(e) => setOtp(e.target.value)} />
              </div>
              <div
                className="btn-group"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: 20,
                }}
              >
                <Button
                  type="default"
                  htmlType="button"
                  onClick={() => setStage(1)}
                >
                  Back
                </Button>
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="button"
                  disabled={otp.length < 6}
                  style={{ marginLeft: 20 }}
                  onClick={() => onConfirm()}
                >
                  Submit
                </Button>
              </div>
            </div>
          </>
        )}

        {!verifyDetails["otpEnable"] && (
          <>
            <div
              className="btn-group"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                type="default"
                htmlType="button"
                onClick={() => setStage(1)}
              >
                Back
              </Button>
              <Button
                loading={loading}
                type="primary"
                htmlType="button"
                onClick={() => onConfirm()}
                style={{ marginLeft: 20 }}
              >
                Submit
              </Button>
            </div>
          </>
        )}
      </>
    );
  }

  function renderSuccess() {
    return (
      <div className="render-success-section" style={{ paddingTop: 0 }}>
        <img src={successImage} height={120} />
        <p>{message}</p>
        <div className="btn-group-style">
          <Button
            size={"large"}
            style={{ margin: "0 auto" }}
            type="primary"
            onClick={() => props.onClose()}
          >
            Back To Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>{renderSwitch()}</div>
    </>
  );
}
