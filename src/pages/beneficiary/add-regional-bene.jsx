import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Form, Divider, Result, Select } from "antd";
import fieldConfig from "../../config/validations";
import NumberFormat from "react-number-format";
import BeneficiaryService from "../../services/beneficiary.service";
import { useNavigate } from "react-router-dom";
import CommonService from "../../services/common.service";
import envConfig from "../../environment";

export default function AddRegionalBeneficiary() {
  const [stage, setStage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [verifyDetails, setVerifyDetails] = useState({});
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [bankList, setBankList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [requestBanks, setRequestBanks] = useState([]);
  const [inputForm] = Form.useForm();

  const navigate = useNavigate();

  useEffect(() => {
    getBankList();
  }, []);

  const getBankList = useCallback(async () => {
    const response = await CommonService.getAllBanks();
    if (response.status === 200) {
    }
    setRequestBanks(response.data);
    const bankList = [...new Set(response.data.map((v) => v.bankName))];
    console.log(bankList);
    setBankList(bankList);
  }, []);

  const handleBankNameChange = useCallback(
    (option) => {
      inputForm.setFieldsValue({ beneBrn: undefined });
      const branchList = [
        ...new Set(requestBanks.filter((v) => v.bankName === option)),
      ];
      setBranchList(branchList);
    },
    [requestBanks]
  );

  const onVerify = useCallback(
    async (values) => {
      try {
        setFormValues(values);
        setLoading(true);
        const bankInformation = requestBanks.filter(
          (x) => x.bankName === values.bankName
        )[0];
        const response =
          await BeneficiaryService.verifyAddOtherBeneficiary({
            addrline: "",
            bankCode: bankInformation.bankCode,
            bankName: bankInformation.bankName,
            srcAccount: values.srcAccount,
            beneBrn: bankInformation.branchDesc,
            beneCurrency: envConfig.LOCAL_CURRENCY_CODE,
            beneName: values.beneName,
            bicCode: bankInformation.bicCode,
            city: "",
            beneType: "REGION",
            maxTransferLimit: values.maxTransferLimit,
            shortName: values.shortName,
            sortCode: bankInformation.sortCode,
            favorites: "N",
            terms: "Y",
            beneMobileNo: values.beneMobileNo,
            beneEMail: values.beneEMail,
            module: "Beneficary",
            modeOfTransfer: "",
            beneCountry: "",
            bankCountry: "",
          });

        if (response.status === 200) {
          setVerifyDetails(response.data);
          setLoading(false);
          setStage(2);
        }
      } catch (err) {
        setLoading(false);
      }
    },
    [setFormValues, setStage, requestBanks]
  );

  const onConfirm = useCallback(async () => {
    setLoading(true);
    try {
      const bankInformation = requestBanks.filter(
        (x) => x.bankName === formValues.bankName
      )[0];
      const response = await BeneficiaryService.confirmOtherBeneficiary({
        addrline: "",
        bankCode: bankInformation.bankCode,
        bankName: bankInformation.bankName,
        srcAccount: formValues.srcAccount,
        beneBrn: bankInformation.branchDesc,
        beneCurrency: envConfig.LOCAL_CURRENCY_CODE,
        beneName: formValues.beneName,
        bicCode: bankInformation.bicCode,
        city: "",
        beneType: "REGION",
        maxTransferLimit: formValues.maxTransferLimit,
        shortName: formValues.shortName,
        sortCode: bankInformation.sortCode,
        favorites: "N",
        terms: "Y",
        beneMobileNo: formValues.beneMobileNo,
        beneEMail: formValues.beneEMail,
        module: "Beneficary",
        modeOfTransfer: "",
        beneCountry: "",
        bankCountry: "",
        otp: otp || "0000",
      });
      if (response.status === 200) {
        setLoading(false);
        setMessage(response.data.message);
        setStage(3);
      }
    } catch (err) {
      setLoading(false);
      setOtp("");
    }
  }, [formValues, requestBanks, otp]);

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
        <h3>Add Reional Beneficiary</h3>

        <Form
          name="addDomesticBeneficiaryForm"
          layout="vertical"
          requiredMark={true}
          onFinish={onVerify}
          form={inputForm}
        >
          <div className="row">
            <div className="col-4">
              <Form.Item
                label="Beneficiary Name"
                name="beneName"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>
            <div className="col-4">
              <Form.Item
                label="Nick Name"
                name="shortName"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item
                label="Account Number"
                name="srcAccount"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>

            <div className="col-4">
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

            <div className="col-4">
              <Form.Item
                label="Beneficiary Bank"
                name="bankName"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Select onChange={handleBankNameChange}>
                  {bankList.map((option, idx) => (
                    <Select.Option key={idx} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item
                label="Beneficiary Branch"
                name="beneBrn"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Select>
                  {branchList.map((option, idx) => (
                    <Select.Option key={idx} value={option.branchDesc}>
                      {option.branchDesc}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item
                label="Transfer Limit"
                name="maxTransferLimit"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item
                label="Beneficiary Email"
                name="beneEMail"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item
                label="Beneficiary Mobile Number"
                name="beneMobileNo"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>
          </div>

          <div className="btn-group">
            <Button type="default" htmlType="button">
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
        <h3>Confirm Regional Beneficiary</h3>
        <div className="row">
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
            <span>
              {verifyDetails["beneCurrency"]} {formValues["maxTransferLimit"]}
            </span>
          </div>
        </div>
        <Divider type="horizontal" />

        {verifyDetails["otpEnable"] && (
          <>
            <p>
              Please enter OTP send to your registered mobile number or email
              address
            </p>
            <div className="row">
              <div className="col-2">
                <Input size="large" onChange={(e) => setOtp(e.target.value)} />
              </div>
              <div className="col-4">
                <Button
                  loading={loading}
                  type="primary"
                  disabled={otp.length < 6}
                  onClick={() => onConfirm()}
                >
                  Submit
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
      <>
        <Result
          status="success"
          title="Successfull!"
          subTitle={message}
          extra={[
            <Button
              size={"large"}
              style={{ margin: "0 auto" }}
              type="primary"
              key="console"
              onClick={() => navigate("/dashboard")}
            >
              GO TO HOME
            </Button>,
          ]}
        />
      </>
    );
  }

  return (
    <>
      <div className="sub-layout-render-secton">{renderSwitch()}</div>
    </>
  );
}
