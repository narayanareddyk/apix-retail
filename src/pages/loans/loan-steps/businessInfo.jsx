import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Form, Select, Breadcrumb, Checkbox, Steps } from "antd";
import fieldConfig from "../../../config/validations";

export default function BusinessInfo(props) {
  return (
    <Form
      name="form4"
      layout="vertical"
      initialValues={props.formValues}
      requiredMark={true}
      onFinish={(values) => {
        props.setFormValues(values);
      }}
    >
      <div className="row">
        <div className="col-4">
          <Form.Item
            label="Company Type"
            name="companyType"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Select>
              {[
                "Proprietorship",
                "Partnership Firm",
                "Private Limited Company",
                "Public Limited Company",
                "Limited Liability Partnership",
              ].map((option, idx) => (
                <Select.Option key={idx} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="col-4">
          <Form.Item
            label="Nature of Business"
            name="natureOfBusiness"
            rules={[{ required: false, message: "Required Field" }]}
          >
            <Select>
              {[
                "Manufacturer",
                "Trader / Wholesaler",
                "Retailer",
                "Service Provider",
                "Others",
              ].map((option, idx) => (
                <Select.Option key={idx} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="col-4">
          <Form.Item
            label="Type of Industry"
            name="typeOfIndustry"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Select>
              {[
                "Agriculture",
                "Automobiles",
                "Cement",
                "Chemicals",
                "IT Hardware / Software",
                "Construction",
                "Consumer Durables",
                "Containers & Packaging",
                "Durables",
                "Energy",
                "Food & Beverages",
                "Hardware Equipment",
                "Healthcare",
                "Household Products",
                "Industrial Equipment",
                "Metals",
                "Mining",
                "Paints",
                "Paper",
                "Petroleum Products",
                "Plastics",
                "Rubber",
                "Speciality Services",
                "Textiles",
              ].map((option, idx) => (
                <Select.Option key={idx} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="col-4">
          <Form.Item
            label="Product/ Services offered"
            name="serviceOffered"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
          </Form.Item>
        </div>

        <div className="col-4">
          <Form.Item
            label="Gross Annual Profit"
            name="workingSince"
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
          onClick={() => {
            props.setStage(3);
          }}
        >
          Back
        </Button>
        <Button type="primary" htmlType="submit">
          next
        </Button>
      </div>
    </Form>
  );
}
