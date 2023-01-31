import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Input,
  Form,
  Divider,
  Result,
  Breadcrumb,
  Select,
  Radio,
} from "antd";
import fieldConfig from "../../config/validations";
import DepositService from "../../services/deposit.service";
import AccountService from "../../services/account.service";
import successImage from "../../assests/images/transfers/success.svg";
import NumberFormat from "react-number-format";
import CommonService from "../../services/common.service";
import BannerImage from "../../assests/images/common/offerBanner2_2.png";
import { setAccounts } from "../../store/actions/account.action";
import { useDispatch } from "react-redux";

const paymentOptions = [
  { value: "R", label: "CREDIT INTEREST ON MATURITY" },
  { value: "M", label: "CREDIT INTEREST MONTHLY" },
  { value: "Q", label: "CREDIT INTEREST QUARTERLY" },
];

const termDepositProductList = [
  {
    description: "Fixed Deposits",
    name: "Fixed Deposits - Product 1",
    tenorDays: "0",
    tenorMonths: "3",
    tenorYears: "0",
    product: "1",
  },
  {
    description: "Fixed Deposits",
    name: "Fixed Deposits - Product 2",
    tenorDays: "0",
    tenorMonths: "6",
    tenorYears: "0",
    product: "2",
  },
  {
    description: "Fixed Deposits",
    name: "Fixed Deposits - Product 3",
    tenorDays: "0",
    tenorMonths: "0",
    tenorYears: "1",
    product: "3",
  },
];

export default function TermDepositCreate() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("CM");
  const [rollType, setRoleType] = useState("RP");
  const [productList, setProductList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [verifyDetails, setVerifyDetails] = useState({});
  const [formValues, setFormValues] = useState({});
  const [otp, setOtp] = useState("");
  const [requestValues, setRequestValues] = useState({});
  const [termForm] = Form.useForm();
  const [message, setMessage] = useState("");
  const [emiDetails, setEmidetails] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrencyList();
    getProducts();
    fetchAccounts();
  }, []);

  const getCurrencyList = useCallback(async () => {
    try {
      const response = await DepositService.getCurrencyList();
      if (response.status === 200) {
        setCurrencyList(response.data["currencyList"]);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getProducts = useCallback(async () => {
    try {
      const response = await DepositService.getProducts();
      if (response.status === 200) {
        setProductList(response.data["termDepositProductList"]);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchAccounts = useCallback(async () => {
    try {
      const response = await AccountService.getAllAccounts();
      if (response.status === 200) {
        setDataSource(response.data);
      }
    } catch (err) {}
  }, []);

  const handleProductChange = useCallback(
    (value) => {
      try {
        const selected = termDepositProductList.find(
          (ele) => ele.name === value
        );
        termForm.setFieldsValue({
          days: selected?.tenorDays,
          months: selected?.tenorMonths,
          years: selected?.tenorYears,
        });
      } catch (err) {
        console.log(err);
      }
    },
    [productList]
  );

  const onVerify = useCallback(
    async (data) => {
      try {
        console.log(data);
        const creditAccountDetails = dataSource.filter(
          (value) => value?.accountNo === data.creditAccNo
        )[0];

        const debitAccountDetails = dataSource.filter(
          (value) => value?.accountNo === data.debitAccNo
        )[0];
        const selectedProduct = termDepositProductList.find(
          (ele) => ele.name === data.product
        );

        setFormValues(data);

        setLoading(true);
        const reqParams = {
          autoRenewal: type === "AR" ? "AUTO_RENEWAL" : "CLOSE_ON_MATURITY",
          principle: rollType === "RP" ? true : false,
          branchCode: debitAccountDetails.brnCode,
          currency: data.toCurrency,
          product: selectedProduct?.product,
          payInAmt: data.amount,
          debitAccNo: debitAccountDetails.accountNo,
          debitAccBrn: debitAccountDetails.brnCode,
          months: data.months || "0",
          years: data.years || "0",
          days: data.days || "0",
          interestCredit: data.interestCredit,
          creditAccNo: creditAccountDetails.accountNo,
          creditAccBrn: creditAccountDetails.brnCode,
          cdf: {
            customerName: debitAccountDetails.customerName,
            customerNo: debitAccountDetails.custNo,
            custidnumber: debitAccountDetails["custidnumber"],
            accountId: debitAccountDetails["accountId"],
            generalLedgerId: debitAccountDetails["generalLedgerId"],
          },
        };
        const response = await DepositService.createTermDeposit(reqParams);
        if (response.status === 200) {
          setLoading(false);
          setVerifyDetails(response.data);
          setRequestValues(reqParams);
          setStage(2);
          // calculateLoanDetails(
          //   +data.months + +data.years*12 + +data.days,
          //   data.amount,
          //   response.data["interestRate"]
          // );
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    },
    [dataSource, type, rollType, productList]
  );

  const onConfirm = useCallback(async () => {
    try {
      setLoading(true);
      const response = await DepositService.confirmTermDeposit({
        ...requestValues,
        otpNo: otp || "0000",
        product: verifyDetails["product"],
      });
      if (response.status === 200) {
        setMessage(response.data["message"]);
        setLoading(false);
        setStage(3);
        dispatch(setAccounts([]));
      }
    } catch (err) {
      setLoading(false);
    }
  }, [otp, requestValues, verifyDetails]);

  const calculateLoanDetails = useCallback(
    async (tenure, amount, interestRate) => {
      try {
        const reqParams = {
          accountType: "D",
          principalAmount: amount,
          tenor: tenure,
          interestRate: +interestRate || 0,
        };
        const response = await CommonService.calculateLoanDetails(reqParams);
        if (response.status === 200) {
          setEmidetails(response.data);
        }
      } catch (err) {}
    },
    []
  );

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
        <h4>Create Term Deposit</h4>

        <Form
          name="addInternalBeneficiaryForm"
          layout="vertical"
          requiredMark={true}
          onFinish={onVerify}
          form={termForm}
        >
          <div className="row">
            <div className="col-6">
              <div style={{ marginTop: 10, marginBottom: 20 }}>
                <Radio.Group
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <Radio value={"CM"}>Close on Maturity </Radio>
                  <Radio value={"AR"}>Auto Renewal</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className="col-6">
              {type === "AR" && (
                <div style={{ marginTop: 10, marginBottom: 20 }}>
                  <Radio.Group
                    value={rollType}
                    onChange={(e) => setRoleType(e.target.value)}
                  >
                    <Radio value={"RP"}>Rollover Principal</Radio>
                    <Radio value={"RPI"}>Rollover Prinicpal + Interest</Radio>
                  </Radio.Group>
                </div>
              )}
            </div>
            <div className="col-6">
              <Form.Item
                label="Credit Account Number"
                name="creditAccNo"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Select placeholder="Choose Option">
                  {dataSource.map((option, idx) => (
                    <Select.Option key={idx} value={option.accountNo}>
                      {option.accountNo}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item
                label="Debit Account Number"
                name="debitAccNo"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Select placeholder="Choose Option">
                  {dataSource.map((option, idx) => (
                    <Select.Option key={idx} value={option.accountNo}>
                      {option.accountNo}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-6">
              <Form.Item
                label="Currency"
                name="toCurrency"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Select placeholder="Choose Option">
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
                label="Payment Method"
                name="interestCredit"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Select placeholder="Choose Option">
                  {paymentOptions.map((option, idx) => (
                    <Select.Option key={idx} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item
                label="Choose Product"
                name="product"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Select
                  onChange={handleProductChange}
                  placeholder="Choose Option"
                >
                  {termDepositProductList.map((option, idx) => (
                    <Select.Option key={idx} value={option.name}>
                      {option.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-4">
                  <Form.Item
                    label="Tenure"
                    name="years"
                    rules={[{ required: true, message: "" }]}
                  >
                    <Input
                      placeholder="Years"
                      maxLength={fieldConfig.INPUT_MAX_LENGTH}
                    />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <Form.Item
                    label=""
                    name="months"
                    style={{ marginTop: 27 }}
                    rules={[{ required: true, message: "" }]}
                  >
                    <Input
                      placeholder="Months"
                      maxLength={fieldConfig.INPUT_MAX_LENGTH}
                    />
                  </Form.Item>
                </div>
                <div className="col-4">
                  <Form.Item
                    label=""
                    name="days"
                    style={{ marginTop: 27 }}
                    rules={[{ required: true, message: "" }]}
                  >
                    <Input
                      placeholder="Days"
                      maxLength={fieldConfig.INPUT_MAX_LENGTH}
                    />
                  </Form.Item>
                </div>
              </div>
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
          </div>

          <div className="btn-group">
            <Button
              type="default"
              htmlType="button"
              onClick={() => navigate("/deposit")}
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
        <h4>Confirm Create Term Deposit </h4>
        <Divider type="horizontal" />
        <div className="row render-confirmation">
          <div className="col-4">
            <label>Deposit Type</label>
            <span>{type === "CM" ? "Close on Maturity" : "Auto Renewal"}</span>
          </div>

          {type === "AR" && (
            <div className="col-4">
              <label>Principal</label>
              <span>
                {rollType === "RP"
                  ? "Rollover Principal"
                  : "Rollover Prinicpal + Interest"}
              </span>
            </div>
          )}

          <div className="col-4">
            <label>Credit Account Number</label>
            <span>{formValues["creditAccNo"] || "-"}</span>
          </div>
          <div className="col-4">
            <label>Debit Account Number</label>
            <span>{formValues["debitAccNo"] || "-"}</span>
          </div>

          <div className="col-4">
            <label>Payment Method</label>
            <span>
              {formValues["interestCredit"] === "M" &&
                "CREDIT INTEREST MONTHLY"}
              {formValues["interestCredit"] === "R" &&
                "CREDIT INTEREST ON MATURITY"}
              {formValues["interestCredit"] === "Q" &&
                "CREDIT INTEREST QUARTERLY"}
            </span>
          </div>

          <div className="col-4">
            <label>Amount</label>

            <span className="d-flex">
              <span style={{ marginRight: 5 }}>
                {formValues["toCurrency"]}{" "}
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
            <label>Rate of Interest</label>
            <span>{verifyDetails["interestRate"] || 0}%</span>
          </div>

          <div className="col-4">
            <label>Tenure</label>
            <span>
              {formValues["years"]} years {formValues["months"]} months{" "}
              {formValues["days"]} days
            </span>
          </div>

          <div className="col-4">
            <label>Product Name</label>
            <span>{formValues["product"] || "-"}</span>
          </div>
          <div className="col-4">
            <label>Maturity Amount</label>
            <span className="d-flex">
              <span style={{ marginRight: 5 }}>{"INR"} </span>
              <NumberFormat
                value={verifyDetails["maturityAmt"] || 0}
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
          <Button
            size={"large"}
            style={{ margin: "0 auto" }}
            type="primary"
            onClick={() => navigate("/deposit")}
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
          <a onClick={() => navigate("/deposit")}>Deposit</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Term Deposit</Breadcrumb.Item>
      </Breadcrumb>

      {/* <div className="row">
        <div className="col-8">
          <div
            className="d-flex title-section"
            style={{ margin: 0, marginBottom: 15 }}
          >
            <h4>Create Term Deposit</h4>
          </div>
        </div>
      </div> */}

      <div className="row">
        <div className="col-8">
          <div className="sub-layout-render-secton">{renderSwitch()}</div>
        </div>
        <div className="col-4">
          <div
            className="offer-banner-style"
            style={{
              height: 450,
              borderRadius: 10,
            }}
          >
            <p style={{ lineHeight: 25 }}>Placeholder for offers here</p>
          </div>
        </div>
      </div>
    </>
  );
}
