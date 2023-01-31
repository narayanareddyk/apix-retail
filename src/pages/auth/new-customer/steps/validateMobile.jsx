import { Form, Input, Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import {
  setAccountInfo,
  setBasicInfo,
  setAdditionalInfo,
  setFamilyInfo,
  setAddressInfo,
  setIdentityInfo,
  setSelfieImageInfo,
  setFrontImageInfo,
  setBackImageInfo,
  setSignatureInfo,
  setEmailAddress,
  setMobileNo,
} from "../../../../store/actions/customer.action";
import { mobileNumberSelector } from "../../../../store/selectors/customer.selector";
import { useDispatch, useSelector } from "react-redux";
import mobileIcon from "../../../../assests/images/new-customer/phone.png";
import NewCustomerService from "../../../../services/new-customer.service";
// import NewCustomerService from '../../../../services/new-customer.service'

export default function ValidateMobile(props) {
  const mobileNumber = useSelector(mobileNumberSelector);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(setAccountInfo({}));
    dispatch(setBasicInfo({}));
    dispatch(setAdditionalInfo({}));
    dispatch(setFamilyInfo({}));
    dispatch(setAddressInfo({}));
    dispatch(setIdentityInfo({}));
    dispatch(setSelfieImageInfo(""));
    dispatch(setFrontImageInfo(""));
    dispatch(setBackImageInfo(""));
    dispatch(setSignatureInfo(""));
    dispatch(setEmailAddress(""));
    dispatch(setMobileNo(""));
  }, []);

  const postData = useCallback(async (values) => {
    try {
      setLoader(true)
      const response = await NewCustomerService.verifyMobileNo(values)
      if (response.status === 200) {
        setLoader(false)
        dispatch(setMobileNo(values.mobileNumber))
        props.onNext()
      }
    } catch (err) {
      setLoader(false);
    }
  }, []);

  return (
    <>
      <h3 style={{ margin: 0 }}>Mobile Number</h3>
      <p>Please enter Mobile Number </p>
      <div className="row">
        <div className="col-6">
          <Form onFinish={postData} layout="vertical">
            <Form.Item
              name="mobileNumber"
              label="Mobile Number"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Input
                size="large"
                placeholder="Mobile Number"
                maxLength={10}
                minLength={10}
                onKeyPress={(e) => {
                  const regex = new RegExp("[0-9]");
                  const pressedKey = String.fromCharCode(
                    !e.charCode ? e.which : e.charCode
                  );
                  if (!regex.test(pressedKey)) {
                    e.preventDefault();
                    return false;
                  }
                }}
              />
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
            width={320}
            style={{
              display: "block",
              margin: "0 auto",
              marginTop: "-88px",
              marginLeft: 50,
            }}
            src={mobileIcon}
          />
        </div>
      </div>
    </>
  );
}
