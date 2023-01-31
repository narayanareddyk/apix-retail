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
import BeneficiaryService from "../../services/beneficiary.service";
import { useLocation, useNavigate } from "react-router-dom";
import AccountService from "../../services/account.service";
import QuickTransferService from "../../services/quickTransfer.service";
import SourceaccountField from "../components/accountField";
import CommonService from "../../services/common.service";
import { selectedAccountDetailsSelector } from "../../store/selectors/account.selector";
import { useDispatch, useSelector } from "react-redux";
import TransferService from "../../services/transfers.service";
import successImage from "../../assests/images/transfers/success.svg";
import { setAccounts } from "../../store/actions/account.action";

export default function InternalBeneTransfer() {
  const [stage, setStage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    destAccount: "",
    scheduled: "No",
    scheduledDate: "",
    txnCurrency: "",
    remarks: "",
    amount: "",
  });
  const [verifyDetails, setVerifyDetails] = useState({});
  const [remarksList, setRemarksList] = useState([]);
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [selectedAccount, setSelectedAccount] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [isSchedule, setIsSchedule] = useState("No");
  const sourceAccDetails = useSelector(selectedAccountDetailsSelector);
  const [beneDetails, setBeneDetails] = useState({});
  const [currencyList, setCurrencyList] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    if (location.state === undefined) {
      navigate("/transfers/beneficiaries");
      return;
    }

    if (location.state) {
      setBeneDetails(location.state);
      if (location?.state?.beneCurrency === sourceAccDetails?.currency) {
        setCurrencyList([location?.state?.beneCurrency]);
      } else {
        setCurrencyList([sourceAccDetails?.currency]);
      }
    }
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
    async (values) => {
      try {
        setFormValues(values);
        const reqParams = {
          fin: {
            srcAccount: sourceAccDetails?.accountNo,
            srcAccBranch: sourceAccDetails?.brnCode,
            srcAccCcy: sourceAccDetails?.currency,
            destAccount: beneDetails?.beneAccNo,
            destAccBranch: "",
            destAccCcy: "",
            destBankName: "",
            bicCode: "",
            sortCode: "",
            txnCurrency: values.txnCurrency,
            amount: values.amount,
            remarks: values.remarks,
          },
          nfin: {
            transferType: "IAT",
            beneId: beneDetails?.beneId,
            scheduled: values.scheduled === "Yes" ? true : false,
            scheduledDate: values.scheduledDate,
            beneficiaryName: "",
            beneficiaryMail: "",
            beneficiaryMobile: "",
            addBeneficiary: false,
          },
          cdf: {
            FXREFNO: "",
          },
          requestId: "FTVERIFYIAT",
        };
        const response = await TransferService.verifyFundTransfer(reqParams);
        if (response.status === 200) {
          setVerifyDetails(response.data);
          setStage(2);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
      }
    },
    [beneDetails, sourceAccDetails]
  );

  const onConfirm = useCallback(async () => {
    try {
      setLoading(true);
      const reqParams = {
        fin: {
          srcAccount: sourceAccDetails?.accountNo,
          srcAccBranch: sourceAccDetails?.brnCode,
          srcAccCcy: sourceAccDetails?.currency,
          destAccount: beneDetails?.beneAccNo,
          destAccBranch: verifyDetails["destBranch"],
          destAccCcy: verifyDetails["destCurrency"],
          destBankName: "",
          bicCode: "",
          sortCode: "",
          txnCurrency: formValues.txnCurrency,
          amount: formValues.amount,
          remarks: formValues.remarks,
        },
        nfin: {
          transferType: "IAT",
          beneId: beneDetails?.beneId,
          scheduled: formValues.scheduled === "Yes" ? true : false,
          scheduledDate: formValues.scheduledDate,
          beneficiaryName: "",
          beneficiaryMail: "",
          beneficiaryMobile: "",
          addBeneficiary: false,
          otp: verifyDetails.otpEnabled ? otp : "0000",
        },
        cdf: {
          FXREFNO: "",
        },
        requestId: "FTCONFIRMIAT",
        module: "FUNDTRANSFER",
      };
      const response = await TransferService.confirmFundTransfer(reqParams);
      if (response.status === 200) {
        setMessage(response.data["message"]);
        setStage(3);
        setLoading(false);
        dispatch(setAccounts([]))
      }
    } catch (err) {
      setLoading(false);
      setOtp("");
    }
  }, [beneDetails, sourceAccDetails, otp, formValues, verifyDetails]);

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
        <h4>Internal Beneficiary Transfer</h4>
        <Divider style={{ marginTop: 10 }} type="horizontal" />
        <Form
          name="addInternalBeneficiaryForm"
          layout="vertical"
          requiredMark={true}
          onFinish={onVerify}
          initialValues={{
            ...formValues,
            txnCurrency: sourceAccDetails["currency"],
          }}
        >
          <SourceaccountField module="TRANSFERS" beneDetails={beneDetails} />

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

            <div className="col-6">
              <Form.Item
                label="Currency"
                name="txnCurrency"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Select>
                  {currencyList.map((option, idx) => (
                    <Select.Option key={idx} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-6">
              <Form.Item
                label="Schedule Transfer"
                name="scheduled"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Select onChange={setIsSchedule}>
                  {["Yes", "No"].map((option, idx) => (
                    <Select.Option key={idx} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {isSchedule === "Yes" && (
              <div className="col-6">
                <Form.Item
                  label="Schedule Date"
                  name="scheduledDate"
                  rules={[{ required: true, message: "Required Field" }]}
                >
                  <DatePicker
                    format={"MM/DD/YYYY"}
                    style={{ width: "100%" }}
                    placeholder="MM/DD/YYYY"
                  />
                </Form.Item>
              </div>
            )}

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

  function renderConfirm() {
    return (
      <>
        <h4>Confirm Internal Beneficiary Transfer</h4>
        <Divider style={{ marginTop: 10 }} type="horizontal" />
        <div className="row render-confirmation">
          <div className="col-4">
            <label>Source Account Number</label>
            <span>{sourceAccDetails["accountNo"] || "-"}</span>
          </div>
          <div className="col-4">
            <label>Available Balance</label>
            <span className="d-flex">
              <span style={{ marginRight: 5 }}>
                {sourceAccDetails["currency"]}{" "}
              </span>
              <NumberFormat
                value={sourceAccDetails["avlBal"]}
                displayType={"text"}
                thousandSeparator={true}
                prefix={""}
                decimalScale={2}
                fixedDecimalScale={true}
                allowedDecimalSeparators={true}
              />
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
                {sourceAccDetails["currency"]}{" "}
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
                <Input onChange={(e) => setOtp(e.target.value)} />
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
              <Button
                type="default"
                htmlType="button"
                onClick={() => setStage(1)}
              >
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
      <Breadcrumb className="bread-crumb-section">
        <Breadcrumb.Item>
          <a onClick={() => navigate("/dashboard")}>Dashboard</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a onClick={() => navigate("/transfers")}>Transfers</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a onClick={() => navigate("/transfers/beneficiaries")}>
            Beneficiaries
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Internal Beneficiary Transfer</Breadcrumb.Item>
      </Breadcrumb>

      <div className="row">
        <div className="col-8">
          <div className="sub-layout-render-secton">{renderSwitch()}</div>
        </div>
      </div>
    </>
  );
}
