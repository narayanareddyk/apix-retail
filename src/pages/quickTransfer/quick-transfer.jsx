import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Input,
  Form,
  Divider,
  Result,
  Breadcrumb,
  Select,
  Modal,
} from "antd";
import fieldConfig from "../../config/validations";
import NumberFormat from "react-number-format";
import BeneficiaryService from "../../services/beneficiary.service";
import { useNavigate } from "react-router-dom";
import AccountService from "../../services/account.service";
import QuickTransferService from "../../services/quickTransfer.service";
import SourceaccountField from "../components/accountField";
import { selectedAccountDetailsSelector } from "../../store/selectors/account.selector";
import { useDispatch, useSelector } from "react-redux";
import successImage from "../../assests/images/transfers/success.svg";
import CommonService from "../../services/common.service";
import { setAccounts } from "../../store/actions/account.action";

export default function QuickTransfer() {
  const [stage, setStage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [verifyDetails, setVerifyDetails] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [remarksList, setRemarksList] = useState([]);
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const selectedAccount = useSelector(selectedAccountDetailsSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    getRemarksList();
  }, []);

  const getRemarksList = useCallback(async () => {
    try {
      const response = await CommonService.getRemarksCategory();
      if (response.status === 200) {
        setRemarksList(response.data.remarks);
      }
    } catch (err) {}
  }, []);

  const onVerify = useCallback(
    async (data) => {
      try {
        setFormValues(data);
        setLoading(true);

        const response = await QuickTransferService.fundTransferVerify({
          fin: {
            srcAccount: selectedAccount?.accountNo,
            srcAccBranch: selectedAccount?.brnCode,
            srcAccCcy: selectedAccount?.currency,
            destAccount: data.destAccount,
            destAccBranch: "",
            destAccCcy: "INR",
            destBankName: "",
            bicCode: "",
            sortCode: "",
            bankCode: "",
            txnCurrency: "INR",
            amount: data.amount,
            remarks: data.remarks,
          },
          nfin: {
            transferType: "IAT",
            beneId: 0,
            scheduled: "",
            scheduledDate: "",
            beneficiaryName: "",
            beneficiaryMail: "",
            beneficiaryMobile: "",
            addBeneficiary: false,
          },
          cdf: {
            FXREFNO: "",
          },
          requestId: `FTVERIFYIAT`,
          module: "FUNDTRANSFER",
        });

        if (response.status === 200) {
          setVerifyDetails(response.data);
          setLoading(false);
          setStage(2);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    },
    [selectedAccount]
  );

  const onConfirm = useCallback(async () => {
    try {
      setLoading(true);
      const response = await QuickTransferService.fundTransferConfirm({
        fin: {
          srcAccount: selectedAccount?.accountNo,
          srcAccBranch: selectedAccount?.brnCode,
          srcAccCcy: selectedAccount?.currency,
          destAccount: formValues.destAccount,
          destAccBranch: verifyDetails.destBranch,
          destAccCcy: verifyDetails.destCurrency,
          destBankName: "",
          bicCode: "",
          sortCode: "",
          bankCode: "",
          txnCurrency: "INR",
          amount: formValues.amount,
          remarks: formValues.remarks,
        },
        nfin: {
          transferType: "IAT",
          beneId: 0,
          scheduled: "",
          scheduledDate: "",
          beneficiaryName: verifyDetails.beneName,
          beneficiaryMail: "",
          beneficiaryMobile: "",
          addBeneficiary: false,
          otp: verifyDetails.otpEnabled ? otp : "0000",
        },
        cdf: {
          FXREFNO: "",
        },
        requestId: `FTCONFIRMIAT`,
        module: "FUNDTRANSFER",
      });
      if (response.status === 200) {
        setLoading(false);
        setMessage(response.data["message"]);
        setStage(3);
        dispatch(setAccounts([]))
      }
    } catch (err) {
      setLoading(false);
      setOtp("");
    }
  }, [formValues, verifyDetails, otp, selectedAccount]);

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
        <h4>Instant Transfer</h4>
        <Divider style={{ marginTop: 10 }} type="horizontal" />
        <SourceaccountField />
        <Form
          name="addInternalBeneficiaryForm"
          layout="vertical"
          requiredMark={true}
          onFinish={onVerify}
        >
          <div className="row">
            <div className="col-6">
              <Form.Item
                label="Account Number"
                name="destAccount"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>

            <div className="col-6">
              <Form.Item
                label="Confirm Account Number"
                name="destAccountConfirm"
                rules={[
                  { required: true, message: "Required Field" },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("destAccount") === value) {
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
                label="Amount"
                name="amount"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>

            <div className="col-6">
              <Form.Item
                label="Remarks"
                name="remarks"
                rules={[{ required: true, message: "Required Field" }]}
              >
               <Select>
                  {remarksList.map((option, idx) => (
                    <Select.Option key={idx} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
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
        <h4>Confirm Instant Transfer</h4>
        <Divider style={{ marginTop: 10 }} type="horizontal" />
        <div className="row render-confirmation">
          <div className="col-4">
            <label>Source Account Number</label>
            <span>{selectedAccount["accountNo"] || "-"}</span>
          </div>
          <div className="col-4">
            <label>Available Balance</label>
            <span>
              {selectedAccount["currency"]} {selectedAccount["avlBal"] || "-"}
            </span>
          </div>
        </div>
        <Divider type="horizontal" style={{ marginTop: 0 }} />
        <div className="row render-confirmation">
          <div className="col-4">
            <label>Beneficiary Name</label>
            <span>{verifyDetails["beneName"] || "-"}</span>
          </div>

          <div className="col-4">
            <label>Beneficiary Account Number</label>
            <span>{verifyDetails["destAccount"] || "-"}</span>
          </div>

          <div className="col-4">
            <label>Beneficiary Branch Code</label>
            <span>{verifyDetails["destBranch"] || "-"}</span>
          </div>

          <div className="col-4">
            <label>Amount</label>

            <span className="d-flex">
              <span style={{ marginRight: 5 }}>
                {selectedAccount["currency"]}{" "}
              </span>
              <NumberFormat
                value={formValues["amount"]}
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
            <label>Remarks</label>
            <span>{formValues["remarks"]}</span>
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

        {!verifyDetails["otpEnable"] && (
          <>
            <div className="btn-group">
              <Button type="default" htmlType="button">
                Back
              </Button>
              <Button
                onClick={() => onConfirm()}
                loading={loading}
                type="primary"
                htmlType="button"
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
      <div className="render-success-section">
        <img src={successImage} />
        <p>{message}</p>
        <div className="btn-group-style">
          <Button size={"large"} style={{ margin: "0 auto" }}>
            Download Receipt
          </Button>

          <Button
            size={"large"}
            style={{ margin: "0 auto" }}
            type="primary"
            onClick={() => navigate("/accounts")}
          >
            Back To Home
          </Button>
        </div>
      </div>
    );
  }
  return (
    <>
      <Breadcrumb className="bread-crumb-section">
        <Breadcrumb.Item>
          <a onClick={() => navigate("/dashboard")}>Dashboard</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a onClick={() => navigate("/transfers")}>Transfers</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Instant Transfer</Breadcrumb.Item>
      </Breadcrumb>

      <div className="row">
        <div className="col-8">
          <div className="sub-layout-render-secton">{renderSwitch()}</div>
        </div>
      </div>
    </>
  );
}
