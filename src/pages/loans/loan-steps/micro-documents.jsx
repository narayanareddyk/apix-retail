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

export default function MicroDocuments(props) {
  const [loader, setLoader] = useState(false);

  const handleAction = useCallback(({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  });

  return (
    <Form name="form5" layout="vertical" requiredMark={true}>
      <h4>Upload Documentss</h4>
      <div style={{ minHeight: 150, margin: "30px auto" }}>
        <div>
          <p className="custom-lbl-style">Upload last month salary slip</p>
          <Upload customRequest={handleAction}>
            <Button>Upload</Button>
          </Upload>
        </div>

        <div style={{ marginTop: 20 }}>
          <p className="custom-lbl-style">Upload Tax Identification Number</p>
          <Upload customRequest={handleAction}>
            <Button>Upload</Button>
          </Upload>
        </div>
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
          loading={loader}
          type="primary"
          onClick={() => {
            setLoader(true);
            setTimeout(() => {
              setLoader(false);
              props.setFormValues();
            }, 3000);
          }}
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}
