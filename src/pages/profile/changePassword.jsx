import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthService from "../../services/auth.service";
export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = useCallback(async (values) => {
    try {
      setLoading(true);
      const response = await AuthService.forceChangePassword(values);
      if (response.status === 200) {
        setLoading(false);
        navigate("/dashboard");
      }
    } catch (err) {
      setLoading(false);
    }
  }, []);

  return (
    <div className="password-criteria-section">
      <div className="row">
        <div className="col-4">
          <Form
            name="ChangePassordForm"
            layout="vertical"
            requiredMark={false}
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
        <div className="col-7">
          <div  className="password-criteria">
            <h6>New Password criteria tips</h6>
            <ul>
              <li>
                Password length should not be less than 8 and not more than 20
                characters.{" "}
              </li>
              <li>
                Password should contain at least one digit [0-9], one alphabet
                [A-Z] [a-z] and one special character such as [@#&*!].
              </li>
              <li>
                Please avoid choosing a password that is generic in nature,
                guessable or inferable.
              </li>
              <li>
                Avoid password that is related to your personal data such as
                name, date of birth, address, telephone number and car or bike
                registration number.
              </li>
              <li>
                It is a good practice to memorize your password rather than
                write it down somewhere.
              </li>
              <li>
                For security reasons, keep changing your password at regular
                intervals.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
