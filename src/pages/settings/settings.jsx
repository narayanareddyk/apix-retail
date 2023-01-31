import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Input,
  Form,
  Select,
  Breadcrumb,
  Checkbox,
  Steps,
  Switch,
} from "antd";
import fieldConfig from "../../config/validations";

const timeZones = [
  {
    timezoneId: 259,
    timezone: "AST",
    code: "CA",
    name: "Atlantic  Standard Time",
    description: "Atlantic",
    country: "Canada",
    utc: "(UTC-04:00)",
    active: true,
  },
  {
    timezoneId: 256,
    timezone: "MST",
    code: "CA",
    name: "Mountain Standard Time",
    description: "Mountain ",
    country: "Canada",
    utc: "(UTC-07:00)",
    active: true,
  },
  {
    timezoneId: 257,
    timezone: "EST",
    code: "CA",
    name: "Eastern Standard Time",
    description: "Eastern Time",
    country: "Canada",
    utc: "(UTC-05:00)",
    active: true,
  },
  {
    timezoneId: 258,
    timezone: "CST",
    code: "CA",
    name: "Central Standard Time",
    description: "Central America",
    country: "Canada",
    utc: "(UTC-06:00)",
    active: true,
  },
  {
    timezoneId: 263,
    timezone: "PST",
    code: "CA",
    name: "Pacific Standard Time",
    description: "Pacific Time",
    country: "Canada",
    utc: "(UTC-08:00)",
    active: true,
  },
  {
    timezoneId: 260,
    timezone: "CST",
    code: "MX",
    name: "Central Standard Time",
    description: "Central America",
    country: "Mexico",
    utc: "(UTC-06:00)",
    active: true,
  },
  {
    timezoneId: 262,
    timezone: "MST",
    code: "MX",
    name: "Mountain Standard Time",
    description: "Mountain ",
    country: "Mexico",
    utc: "(UTC-07:00)",
    active: true,
  },
  {
    timezoneId: 261,
    timezone: "PST",
    code: "MX",
    name: "Pacific Standard Time",
    description: "Pacific Time",
    country: "Mexico",
    utc: "(UTC-08:00)",
    active: true,
  },
  {
    timezoneId: 239,
    timezone: "PST",
    code: "US",
    name: "Pacific Standard Time",
    description: "Pacific Time",
    country: "United States",
    utc: "(UTC-08:00)",
    active: true,
  },
  {
    timezoneId: 251,
    timezone: "EST",
    code: "US",
    name: "Eastern Standard Time",
    description: "Eastern Time",
    country: "United States",
    utc: "(UTC-05:00)",
    active: true,
  },
  {
    timezoneId: 252,
    timezone: "CST",
    code: "US",
    name: "Central Standard Time",
    description: "Central America",
    country: "United States",
    utc: "(UTC-06:00)",
    active: true,
  },
  {
    timezoneId: 253,
    timezone: "HST",
    code: "US",
    name: "Hawaii Standard Time",
    description: "Hawaii",
    country: "United States",
    utc: "(UTC-10:00)",
    active: true,
  },
  {
    timezoneId: 254,
    timezone: "MST",
    code: "US",
    name: "Mountain Standard Time",
    description: "Mountain ",
    country: "United States",
    utc: "(UTC-07:00)",
    active: true,
  },
  {
    timezoneId: 255,
    timezone: "AST",
    code: "US",
    name: "Alaska Standard Time",
    description: "Alaska",
    country: "United States",
    utc: "(UTC-09:00)",
    active: true,
  },
];

export default function Settings() {
  return (
    <>
      <div className="row">
        <div className="col-8">
          <div className="sub-layout-render-secton">
            <Form
              name="form4"
              initialValues={{ serviceOffered1: "INR" }}
              layout="vertical"
              requiredMark={true}
            >
              <div className="row">
                <div className="col-4">
                  <Form.Item label="Currency" name="serviceOffered1">
                    <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
                  </Form.Item>
                </div>

                <div className="col-5">
                  <Form.Item label="Time Zone" name="workingSince1">
                    <Select>
                      {timeZones.map((option, idx) => (
                        <Select.Option value={option.code} key={idx}>
                          {option.utc} - {option.country}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <div className="custom-lbl-style">Notification</div>

              <div style={{ margin: "20px 0" }}>
                {" "}
                <Switch defaultChecked />{" "}
                <span style={{ marginLeft: 15 }}>
                  Send or Recieve Money
                </span>
              </div>

              <div style={{ margin: "20px 0" }}>
                {" "}
                <Switch defaultChecked />{" "}
                <span style={{ marginLeft: 15 }}>
                  Recieve upcoming offers
                </span>
              </div>

              <div style={{ margin: "20px 0" }}>
                {" "}
                <Switch  />{" "}
                <span style={{ marginLeft: 15 }}>
                  Recomendations on wealth management
                </span>
              </div>

              <div className="custom-lbl-style">Two-Factor Authentication</div>

              <div style={{ margin: "20px 0" }}>
                {" "}
                <Switch defaultChecked />{" "}
                <span style={{ marginLeft: 15 }}>
                  Enable or Disable two facor authentication
                </span>
              </div>


              <div className="custom-lbl-style">Transactions</div>

              <div style={{ margin: "20px 0" }}>
                {" "}
                <Switch />{" "}
                <span style={{ marginLeft: 15 }}>
                  Enable or Disable International Transfers 
                </span>
              </div>

              <div style={{ margin: "20px 0" }}>
                {" "}
                <Switch />{" "}
                <span style={{ marginLeft: 15 }}>
                  Usage of Debit Card for International Transactions
                </span>
              </div>

              <div className="btn-group" style={{ justifyContent: "end" }}>
                <Button type="primary" htmlType="submit">
                  next
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
