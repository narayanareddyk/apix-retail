import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthService from "../../services/auth.service";
import OtpInput from "react-otp-input";

export default function ForceChangePassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = useCallback(async (values) => {
    try {
      setLoading(true);
      const response = await AuthService.forceChangePassword(values);
      if (response.status === 200) {
        setLoading(false);
        AuthService.getUserProfile();
        AuthService.getUserProfileImage();
        AuthService.featureCheck();
        navigate("/dashboard");
      }
    } catch (err) {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <h4>Force Change Passwod</h4>

      <div className="auth-content-area">
        <Form
          name="forceChangePasswordForm"
          layout="vertical"
          requiredMark={true}
          onFinish={onSubmit}
        >
          <Form.Item
            label="Current Password"
            name="oldPassword"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Input.Password size="large" placeholder="Current Password" />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Input.Password size="large" placeholder="New Password" />
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Required Field" },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Not Matched!");
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="Confirm New Password" />
          </Form.Item>
          <Button
            style={{ marginTop: 10, marginBottom: 10 }}
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
