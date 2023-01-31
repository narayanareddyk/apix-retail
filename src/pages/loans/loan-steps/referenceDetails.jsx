import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Form, Select, Breadcrumb, Checkbox, Steps } from "antd";
import fieldConfig from "../../../config/validations";

export default function ReferenceDetails(props) {
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
      <h4>Reference 1</h4>
      <div className="row">
        <div className="col-4">
          <Form.Item
            label="Contact Name"
            name="serviceOffered1"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
          </Form.Item>
        </div>

        <div className="col-4">
          <Form.Item
            label="Mobile Number"
            name="workingSince1"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
          </Form.Item>
        </div>

        <div className="col-4">
          <Form.Item
            label="Relationship"
            name="relationship1"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
          </Form.Item>
        </div>
      </div>

      <h4>Reference 2</h4>

      <div className="row">
        <div className="col-4">
          <Form.Item
            label="Contact Name"
            name="serviceOffered2"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
          </Form.Item>
        </div>

        <div className="col-4">
          <Form.Item
            label="Mobile Number"
            name="workingSince2"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
          </Form.Item>
        </div>

        <div className="col-4">
          <Form.Item
            label="Relationship"
            name="relationship2"
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
