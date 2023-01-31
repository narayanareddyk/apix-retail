import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Form, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function ExistingCustomer() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onVerify = useCallback(async (values) => {
    try {
    } catch (err) {}
  }, []);

  return (
    <>
      <h4>Register with us</h4>
      <div className="auth-content-area">
        <Form
          name="existingCustomer"
          layout="vertical"
          requiredMark={false}
          onFinish={onVerify}
        >
          <Form.Item
            label="Account Number"
            name="accountNumber"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Input size="large" placeholder="Account Number" />
          </Form.Item>

          <Form.Item
            label="Mobile Number"
            name="mobileNumber"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Input size="large" placeholder="Mobile Number" />
          </Form.Item>

          <Form.Item
            label="Identity Type"
            name="identityNumber"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Select size="large" placeholder="Identity Type"></Select>
          </Form.Item>

          <Form.Item
            label="Identity Number"
            name="identityNumber"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Input size="large" placeholder="Identity Number" />
          </Form.Item>

          <Button
            block
            size="large"
            className="solid-btn-style"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
