import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthService from "../../services/auth.service";
import OtpInput from "react-otp-input";

export default function VerifyOtpComponent() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const verifyOtp = useCallback(async (values) => {
    try {
      setLoading(true);
      const response = await AuthService.verifyOTP(values);
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
      <h4>Login in to your account</h4>
      <p className="otp-desc">
        {" "}
        Please enter the 6 digits OTP sent to your registered mobile number or 
        email address
      </p>
      <div className="auth-content-area">
        <Form
          name="verifyOtpForm"
          layout="vertical"
          requiredMark={false}
          onFinish={verifyOtp}
        >
          <Form.Item
            label="Enter OTP"
            name="otpNo"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Input maxLength={6} size="large" placeholder="OTP" />
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

          <p></p>
        </Form>
      </div>
    </>
  );
}
