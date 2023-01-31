import { Form, Input, Button } from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmailIcon from "../../../../assests/images/new-customer/email.png";
import NewCustomerService from "../../../../services/new-customer.service";
import { setEmailAddress } from "../../../../store/actions/customer.action";
import { emailIdSelector } from "../../../../store/selectors/customer.selector";

export default function ValidateEmail(props) {
  const emailAddress = useSelector(emailIdSelector);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const postData = useCallback(async (values) => {
    try {
      setLoader(true);
      const response = await NewCustomerService.verifyEmail(values)
      if (response.status === 200) {
        setLoader(false)
        dispatch(setEmailAddress(values.emailId))
        props.onNext()
      }
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  }, []);

  return (
    <>
      <h3 style={{ margin: 0 }}>Email Address</h3>
      <p>Enter Email Address to verify </p>
      <div className="row">
        <div className="col-6">
          <Form
            initialValues={{
              emailId: emailAddress,
            }}
            onFinish={postData}
            layout="vertical"
          >
            <Form.Item
              label="Email Address"
              name="emailId"
              rules={[
                { required: true, message: "Required Field" },
                { type: "email", message: "Invalid Email" },
              ]}
            >
              <Input size="large" placeholder="Email" />
            </Form.Item>

            <div className="footer-btn-style">
              <Button
                onClick={() => props.onBack()}
                size="large"
                style={{ marginRight: 30 }}
              >
                Cancel
              </Button>
              <Button
                loading={loader}
                htmlType="submit"
                size="large"
                type="primary"
              >
                Next
              </Button>
            </div>
          </Form>
        </div>

        <div className="col-6">
          <img
            width={380}
            style={{
              display: "block",
              margin: "0 auto",
              marginTop: "-110px",
              marginLeft: 50,
            }}
            src={EmailIcon}
          />
        </div>
      </div>
    </>
  );
}
