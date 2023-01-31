import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Form, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthService from "../../services/auth.service";
import OtpInput from "react-otp-input";

export default function LoginComponent() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [OTP, setOTP] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch({ type: "USER_LOGOUT" });
    companyprofileimage();
  }, []);

  const companyprofileimage = useCallback(async () => {
    try {
      const response = await AuthService.companyprofileimage();
      if (response.status === 200) {
      }
    } catch (error) {}
  }, []);

  const postLogin = useCallback(async (values) => {
    try {
      setLoading(true);
      const response = await AuthService.postLogin(values);
      setLoading(false);
      if (response.data["forceChangePwd"] === true) {
        navigate("/forceChangePassword");
        return;
      }
      if (response.data["otpEnable"] === true) {
        navigate("/verifyOtp");
        return;
      }
      AuthService.getUserProfile();
      AuthService.getUserProfileImage();
      AuthService.featureCheck();
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <h4 onClick={() => setIsModalVisible(true)}>Login in to your account</h4>
      <div className="auth-content-area">
        <Form
          name="verifyEmailForm"
          layout="vertical"
          requiredMark={false}
          onFinish={postLogin}
        >
          <Form.Item
            label="Username / Customer ID"
            name="username"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Input size="large" placeholder="Username / Customer Id" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Input.Password
              size="large"
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          {/* <span style={{ textAlign: "center", fontSize: 20,display:'block' }}>( OR )</span>

          <div className="otp-wrapper">
            <Form.Item
              label="Please enter your 6 digit PIN (Digital Token)" 
              name="username"
              rules={[{ required: false, message: "Required Field" }]}
            >
              <OtpInput
                className="otp-input"
                value={OTP}
                shouldAutoFocus={true}
                onChange={(otp) => console.log(otp)}
                numInputs={6}
                isInputNum={true}
                isInputSecure={true}
              />
            </Form.Item>
          </div> */}

          <Button
            block
            size="large"
            className="solid-btn-style"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Login
          </Button>

          <Button
            block
            size="large"
            type="default"
            htmlType="button"
            className="solid-btn-style"
            onClick={() => navigate("/newCustomer")}
            style={{ marginBottom: 0 }}
          >
            Create An Account
          </Button>
        </Form>

        {/* <Alert
          message="Error"
          description="This is an error message about copywriting."
          type="error"
          showIcon
          banner
        /> */}
      </div>

      <Modal
        title={"Login using Neo bank oneToken"}
        visible={isModalVisible}
        footer={null}
        className="digital-token-modal"
        maskClosable={false}
        width={620}
        closable={true}
        onCancel={() => setIsModalVisible(false)}
      >
        <div className="row">
          <div className="col-8">
            <p style={{ fontSize: 17, fontWeight: 500, marginBottom: 30 }}>
              A notification has been sent to your mobile
              <br />
              <b>(XX XXXXX XX678)</b>. Please tap on it to log in.
            </p>
            <p style={{ fontSize: 17, fontWeight: 500, marginBottom: 30 }}>
              Your mobile data must be switched on to receive this notification.
            </p>

            <a style={{ color: "blue", textDecoration: "underline" }}>
              Resend notfication
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
}
