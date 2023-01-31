import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Input,
  Form,
  Select,
  Breadcrumb,
  Checkbox,
  Steps,
  Upload,
} from "antd";
import fieldConfig from "../../../config/validations";
import LoanService from "../../../services/loan.service";

export default function SalariedDocument(props) {
  const handleAction = useCallback(({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  });

  return (
    <Form name="form5" layout="vertical" requiredMark={true}>
      <h4>Upload Documentss</h4>
      <div>
        <p className="custom-lbl-style">3 Months Bank Statements</p>
        <Upload customRequest={handleAction}>
          <Button>Upload</Button>
        </Upload>
      </div>

      <div style={{ marginTop: 20 }}>
        <p className="custom-lbl-style">
          3 Month Salary Slip (or) Annual Tax Filling
        </p>
        <Upload customRequest={handleAction}>
          <Button>Upload</Button>
        </Upload>
      </div>

      <div style={{ marginTop: 20, marginBottom: 50 }}>
        <p className="custom-lbl-style">Employee Id Card</p>
        <Upload customRequest={handleAction}>
          <Button>Upload</Button>
        </Upload>
      </div>

      <div className="btn-group">
        <Button
          type="default"
          htmlType="button"
          onClick={() => {
            props.setStage(4);
          }}
        >
          Back
        </Button>
        <Button
          type="primary"
          onClick={() => {
            props.setFormValues({});
          }}
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}
