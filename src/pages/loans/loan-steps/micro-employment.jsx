import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Input,
  Form,
  Select,
  Breadcrumb,
  Checkbox,
  Steps,
  Slider,
} from "antd";
import fieldConfig from "../../../config/validations";
import NumberFormat from "react-number-format";
import CommonService from "../../../services/common.service";
import LoanService from "../../../services/loan.service";

export default function MicroEmploymentInfo(props) {
  const [employmentType, setEmploymentType] = useState("");
  const [tenure, setTenure] = useState(6);
  const [amount, setAmount] = useState(10000);
  const [emiDetails, setEmidetails] = useState({});

  useEffect(() => {
    calculateLoanDetails(tenure, amount);
  }, [tenure, amount]);

  const microloan = useCallback(
    async (values) => {
      try {

        props.setFormValues(values);
        // const reqParams = {
        //   Amount: "" + amount,
        //   Tenure: "" + tenure,
        //   RateOfInterest: "12",
        //   emiPerMonth: emiDetails["emiAmount"].toFixed(2),
        //   customerId: 1,
        // };
        // const response = await LoanService.microloan(reqParams);
        // if (response.status === 200) {
        //   props.setFormValues(values);
        // }
      } catch (err) {}
    },
    [tenure, amount, emiDetails]
  );

  const calculateLoanDetails = useCallback(async (tenure, amount) => {
    try {
      const reqParams = {
        accountType: "L",
        principalAmount: amount,
        tenor: tenure,
        interestRate: "12",
      };
      const response = await CommonService.calculateLoanDetails(reqParams);
      if (response.status === 200) {
        setEmidetails(response.data);
      }
    } catch (err) {}
  }, []);

  return (
    <Form
      name="form2"
      layout="vertical"
      initialValues={props.formValues}
      requiredMark={true}
      onFinish={microloan}
    >
      <div className="emi-table">
        <h6 style={{ textAlign: "center", textDecoration: "underline" }}>
          EMI Details
        </h6>
        <div>
          <label>Amount</label>
          <span className="d-flex">
            <span style={{ marginRight: 5 }}>{"INR"} </span>
            <NumberFormat
              value={amount}
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

        <div>
          <label>Tenure</label>
          <span>{tenure} Months</span>
        </div>

        <div>
          <label>Rate of Interest</label>
          <span>{"12%"}</span>
        </div>

        <div>
          <label>EMI Per Month</label>

          <span className="d-flex">
            <span style={{ marginRight: 5 }}>{"INR"} </span>
            <NumberFormat
              value={emiDetails["emiAmount"]}
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
      <div className="row">
        <div className="col-5">
          <label className="custom-lbl-style">Choose Amount ( in INR )</label>
          <Slider
            marks={{ 0: "0", 10000: "10,000" }}
            max={10000}
            value={amount}
            onChange={setAmount}
          />
        </div>

        <div className="col-5">
          <label className="custom-lbl-style">
            Choose Tenure ( in months )
          </label>
          <Slider
            onChange={setTenure}
            marks={{ 0: "0", 12: "12" }}
            max={12}
            value={tenure}
          />
        </div>

        <div className="col-6">
          <Form.Item
            label="Employment Type"
            name="employmentType"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Select placeholder="Choose option" onChange={setEmploymentType}>
              {["Salaried", "Business", "Other Services"].map((option, idx) => (
                <Select.Option key={idx} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </div>

      {employmentType === "Salaried" && (
        <div className="row">
          <div className="col-4">
            <Form.Item
              label="Company Name"
              name="companyName"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
            </Form.Item>
          </div>

          <div className="col-4">
            <Form.Item
              label="Employee Id"
              name="employeeId"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
            </Form.Item>
          </div>

          <div className="col-4">
            <Form.Item
              label="Designation"
              name="designation"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
            </Form.Item>
          </div>

          <div className="col-4">
            <Form.Item
              label="Official Mail Id"
              name="officeMailId"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
            </Form.Item>
          </div>

          <div className="col-4">
            <Form.Item
              label="Monthly Net Salary"
              name="netSalary"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
            </Form.Item>
          </div>

          <div className="col-4">
            <Form.Item
              label="Emplyment Tenure"
              name="employeeTenure"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
            </Form.Item>
          </div>

          <div className="col-12">
            <Form.Item
              label="Office Address"
              name="officeAddress"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>
      )}

      {employmentType === "Business" && (
        <div className="row">
          <div className="col-4">
            <Form.Item
              label="Business Type"
              name="businessType"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
            </Form.Item>
          </div>

          <div className="col-4">
            <Form.Item
              label="Business / Company Name"
              name="companyName"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
            </Form.Item>
          </div>

          <div className="col-4">
            <Form.Item
              label="Business Turnover"
              name="businessTurnover"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
            </Form.Item>
          </div>

          <div className="col-4">
            <Form.Item
              label="Years In Current Business"
              name="businessInYears"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
            </Form.Item>
          </div>

          <div className="col-4">
            <Form.Item
              label="Business Premise"
              name="businessPremise"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Select placeholder="Owned / Rented">
                {["Owned", "Rented"].map((option, idx) => (
                  <Select.Option key={idx} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="col-4">
            <Form.Item
              label="Residence"
              name="residence"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Select placeholder="Owned / Rented">
                {["Owned", "Rented"].map((option, idx) => (
                  <Select.Option key={idx} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="col-12">
            <Form.Item
              label="Business Address"
              name="businessAddress"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>
      )}

      {employmentType === "Other Services" && (
        <div className="row">
          <div className="col-4">
            <Form.Item
              label="Services Offered"
              name="serviceOffered"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
            </Form.Item>
          </div>
          <div className="col-4">
            <Form.Item
              label="Annual Sales Turnover"
              name="annualSales"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
            </Form.Item>
          </div>

          <div className="col-4">
            <Form.Item
              label="Years In Current Business"
              name="businessInYears"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
            </Form.Item>
          </div>

          <div className="col-4">
            <Form.Item
              label="Residence"
              name="residence"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Select placeholder="Owned / Rented">
                {["Owned", "Rented"].map((option, idx) => (
                  <Select.Option key={idx} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="col-8">
            <Form.Item
              label="Business Address"
              name="businessAddress"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>
      )}

      <div className="btn-group">
        <Button
          type="default"
          htmlType="button"
          onClick={() => {
            props.setStage(1);
          }}
        >
          Back
        </Button>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </div>
    </Form>
  );
}
