import { Button, Card, Image, notification, Result } from "antd";
import React, { useCallback, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  accountInfoSelector,
  addressInfoSelector,
  backImageSelector,
  basicInfoSelector,
  emailIdSelector,
  familyInfoSelector,
  frontImageSelector,
  identityInfoSelector,
  mobileNumberSelector,
  selfieImageSelector,
  signatureSelector,
} from "../../../../store/selectors/customer.selector";
import NewCustomerService from "../../../../services/new-customer.service";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import OtpIcon from "../../../../assests/images/new-customer/otp.png";
import SuccessIcon from "../../../../assests/images/new-customer/success.svg";
import gifIcon from "../../../../assests/images/new-customer/dance.gif";
import giftCardIcon from "../../../../assests/images/new-customer/giftCard.png";

import ProductFeatures from "./productDetails";

export default function Confirmation(props) {
  const accountInfo = useSelector(accountInfoSelector);
  const identityInfo = useSelector(identityInfoSelector);
  const basicInfo = useSelector(basicInfoSelector);
  const familyInfo = useSelector(familyInfoSelector);
  const addressInfo = useSelector(addressInfoSelector);
  const selfieImage = useSelector(selfieImageSelector);
  const frontImage = useSelector(frontImageSelector);
  const backImage = useSelector(backImageSelector);
  const signature = useSelector(signatureSelector);
  const emailId = useSelector(emailIdSelector);
  const mobileNumber = useSelector(mobileNumberSelector);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [cOtp, setcOtp] = useState("");

  const [stage, setStage] = useState(1);
  const [verifyDetails, setVerifyDetails] = useState({});
  const [message, setMessage] = useState({});

  const onConfirm = useCallback(async () => {
    try {
      const reqParams = {
        // accountType: accountInfo['accountType'] || '',
        namePrefix: basicInfo["namePrefix"] || "",
        customerIdentifier: identityInfo["name"] || "",
        lastName: basicInfo["lastName"] || "",
        middleName: basicInfo["middleName"] || "",
        firstName: basicInfo["firstName"] || "",
        dateOfBirth:
          moment(basicInfo["dateOfBirth"]).format("YYYY-MM-DD") || "",
        placeOfBirth: basicInfo["placeOfBirth"] || "",
        nationality: identityInfo["countryOfIssuance"] || "India",
        identityNumber: identityInfo["identityNumber"] || "",
        issueDate:
          identityInfo["issueDate"] !== null
            ? moment(identityInfo["issueDate"]).format("YYYY-MM-DD")
            : "",
        expiredDate:
          identityInfo["expiredDate"] !== null
            ? moment(identityInfo["expiredDate"]).format("YYYY-MM-DD")
            : "",
        countryOfIssuance: identityInfo["countryOfIssuance"] || "",
        emailId: emailId || "",
        mobileNumber: mobileNumber || "",
        selfieImageData: selfieImage.split(",")[1],
        idProofFrontImageData: frontImage.split(",")[1],
        idProofBackImageDate: backImage.split(",")[1],
        signatureImageData: signature.split(",")[1],
        proofOfResidenceImageData: "",
        otp: otp,
        randomKey: verifyDetails["randomKey"] || "",
        maritalStatus: basicInfo["maritalStatus"] || "",
        fatherNamePrefix: familyInfo["fatherNamePrefix"] || "",
        fatherFirstName: familyInfo["fatherFirstName"] || "",
        fatherMiddleName: familyInfo["fatherMiddleName"] || "",
        fatherLastName: familyInfo["fatherLastName"] || "",
        motherNamePrefix: familyInfo["motherNamePrefix"] || "",
        motherFirstName: familyInfo["motherFirstName"] || "",
        motherMiddleName: familyInfo["motherMiddleName"] || "",
        motherLastName: familyInfo["motherLastName"] || "",
        spouseNamePrefix: familyInfo["spouseNamePrefix"] || "",
        spouseFirstName: familyInfo["spouseFirstName"] || "",
        spouseMiddleName: familyInfo["spouseMiddleName"] || "",
        spouseLastName: familyInfo["spouseLastName"] || "",
        gender: basicInfo["gender"] || "",
        occupationType: basicInfo["stringoccupationType"] || "",
        idProofType: identityInfo["idProofType"] || "",
        addrLine1: addressInfo["addrLine1"] || "",
        addrLine2: addressInfo["addrLine2"] || "",
        houseNumber: addressInfo["houseNumber"] || "",
        district: addressInfo["district"] || "",
        state: addressInfo["state"] || "",
        pinCode: addressInfo["pinCode"] || "",
        city: addressInfo["city"] || "",
        residentialStatus: "",
        region: "",
        fatherName: "",
        motherName: "",
        religion: "",
        caste: "",
        casteCategory: "",
        addressType: "2",
        phoneType: "3",
        kycType: "1",
        address: "",
      };
      console.log(reqParams);
      setLoading(true);
      const response = await NewCustomerService.postCreateNewCustomer(
        reqParams
      );
      if (response.status === 200) {
        setLoading(false);
        setMessage(response.data);
        setStage(3);
        props.setDone(true);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [otp, verifyDetails]);

  const verifyNewRequest = useCallback(async () => {
    try {
      const reqParams = {
        mobileNumber: mobileNumber,
        emailId: emailId,
      };
      setLoading(true);
      setOtp("");
      setcOtp("");
      const response = await NewCustomerService.customerCreateOtpGenerate(
        reqParams
      );
      if (response.status === 200) {
        setLoading(false);
        setVerifyDetails(response.data);
        setStage(2);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      notification.error({
        message: "Error",
        description: err?.data?.message,
      });
    }
  }, []);

  function renderSwitch() {
    switch (stage) {
      case 1:
        return renderConfirm();
      case 2:
        return (
          <>
            <h3 style={{ margin: 0 }}>Setup your digital token</h3>
            <p style={{ marginTop: 20 }}>
              Please enter 6 digits of digital token
            </p>
            <div className="row">
              <div className="col-7">
                <div>
                  <label className="custom-lbl-style1">
                    Enter your 6 digit PIN
                  </label>
                  <div
                    className="otp-wrapper"
                    style={{ marginLeft: "-13px", marginTop: 5 }}
                  >
                    <OtpInput
                      className="otp-input"
                      value={otp}
                      shouldAutoFocus={true}
                      onChange={(otp) => setOtp(otp)}
                      numInputs={6}
                      isInputNum={true}
                      isInputSecure={true}
                    />
                  </div>
                </div>
                <div>
                  <label className="custom-lbl-style1">
                    Re-Enter your 6 digit PIN
                  </label>
                  <div
                    className="otp-wrapper"
                    style={{ marginLeft: "-13px", marginTop: 5 }}
                  >
                    <OtpInput
                      className="otp-input"
                      value={cOtp}
                      onChange={(otp) => setcOtp(otp)}
                      numInputs={6}
                      isInputNum={true}
                      isInputSecure={true}
                    />
                  </div>
                </div>

                <div className="footer-btn-style">
                  <Button
                    onClick={() => setStage(1)}
                    size="large"
                    style={{ marginRight: 30 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={otp.length < 6}
                    onClick={() => onConfirm()}
                    loading={loading}
                    size="large"
                    type="primary"
                  >
                    Next
                  </Button>
                </div>
              </div>

              <div className="col-5">
                <img
                  width={320}
                  style={{
                    display: "block",
                    margin: "0 auto",
                    marginTop: "-90px",
                    marginLeft: 50,
                  }}
                  src={OtpIcon}
                />
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <div>
            <img style={{ display: "block", margin: "0 auto" }} src={gifIcon} />
            {/* <Result status="success" title="Thank you. You are all set!!!" /> */}

            <h3 style={{ textAlign: "center", margin: "10px auto" }}>
              Thank you. You are all set!!!
            </h3>
            {successMessage()}

            

            <ProductFeatures />

            <p style={{margin:'10x 0',textAlign:'center',fontSize:18,fontWeight:600}}>
              Hey, You have got a Starbucks Voucher from us. Click on the
              voucher to redeem!!!
            </p>
            <img
              height={280}
              width={400}
              style={{ display: "block", margin: "30px auto",cursor:'pointer' }}
              src={giftCardIcon}
            />
            <div style={{height:1}}></div>
          </div>
        );
      default:
        return renderConfirm();
    }
  }

  function successMessage() {
    return (
      <>
        <p style={{ textAlign: "center", fontSize: 20 }}>
          Customer Registration is successful. Your Customer Id:{" "}
          <b>{message["customerId"] || "100067585"}</b>. <br /> We have provided
          you a Neo Bank Classic Saving Account with Number:{" "}
          <b>{message["accountNumber"] || "763463878267896"}</b>.
        </p>
      </>
    );
  }

  function renderConfirm() {
    return (
      <div className="customer-confirm">
        <h3>Confirmation</h3>
        <p>Please Confirm the Details </p>

        <Card title="Identity Information" style={{ marginBottom: 30 }}>
          <div className="row">
            <div className="col-4">
              <label>Identity Type</label>
              <span>{identityInfo["name"]}</span>
            </div>

            <div className="col-4">
              <label>Identity Number</label>
              <span>{identityInfo["identityNumber"]}</span>
            </div>
            <div className="col-4">
              <label>Country Of Issue</label>
              <span>{identityInfo["countryOfIssuance"] || "-"}</span>
            </div>
            <div className="col-4">
              <label>Issue Date</label>
              <span>
                {identityInfo["issueDate"] !== null
                  ? moment(identityInfo["issueDate"]).format("YYYY-MM-DD")
                  : "-"}
              </span>
            </div>

            <div className="col-4">
              <label>Expiry Date</label>
              <span>
                {identityInfo["expiryDate"] !== null
                  ? moment(identityInfo["expiryDate"]).format("YYYY-MM-DD")
                  : "-"}
              </span>
            </div>
          </div>
        </Card>

        <Card title="Basic Information" style={{ marginBottom: 30 }}>
          <div className="row">
            <div className="col-2">
              <label>Title</label>
              <span>
                {(props.masterData["NAMEPREFIX"] &&
                  props.masterData["NAMEPREFIX"].filter(
                    (ele) => ele.id === basicInfo["namePrefix"]
                  )[0].name) ||
                  "-"}
              </span>
            </div>

            <div className="col-3">
              <label>First Name</label>
              <span>{basicInfo["firstName"]}</span>
            </div>
            <div className="col-3">
              <label>Middle Name</label>
              <span>{basicInfo["middleName"] || "-"}</span>
            </div>

            <div className="col-3">
              <label>Last Name</label>
              <span>{basicInfo["lastName"]}</span>
            </div>
            <div className="col-3">
              <label>Date Of Birth</label>
              <span>
                {" "}
                {basicInfo["dateOfBirth"] !== null
                  ? moment(basicInfo["dateOfBirth"]).format("YYYY-MM-DD")
                  : "-"}
              </span>
            </div>

            <div className="col-3">
              <label>Place Of Birth</label>
              <span>{basicInfo["placeOfBirth"]}</span>
            </div>
            <div className="col-3">
              <label>Gender</label>
              <span>
                {(props.masterData["GENDER"] &&
                  props.masterData["GENDER"].filter(
                    (ele) => ele.id === basicInfo["gender"]
                  )[0].name) ||
                  "-"}
              </span>
            </div>

            <div className="col-3">
              <label>Marital Status</label>
              <span>
                {(props.masterData["MARITALSTATUS"] &&
                  props.masterData["MARITALSTATUS"].filter(
                    (ele) => ele.id === basicInfo["maritalStatus"]
                  )[0].name) ||
                  "-"}
              </span>
            </div>
            <div className="col-3">
              <label>Email Id</label>
              <span>{emailId}</span>
            </div>

            <div className="col-3">
              <label>Mobile Number</label>
              <span>{mobileNumber}</span>
            </div>

            <div className="col-3">
              <label>Occupation</label>
              <span>
                {(props.masterData["OCCUPATION"] &&
                  props.masterData["OCCUPATION"].filter(
                    (ele) => ele.id === basicInfo["stringoccupationType"]
                  )[0].name) ||
                  "-"}
              </span>
            </div>

            <div className="col-3">
              <label>Nationality</label>
              <span>{identityInfo["countryOfIssuance"] || "-"}</span>
            </div>
          </div>
        </Card>

        <Card title="Address Information" style={{ marginBottom: 30 }}>
          <div className="row">
            <div className="col-4">
              <label>House Number / Floor</label>
              <span>{addressInfo["houseNumber"]}</span>
            </div>

            <div className="col-4">
              <label> Address Line1</label>
              <span>{addressInfo["addrLine1"]}</span>
            </div>
            <div className="col-4">
              <label> Address Line2</label>
              <span>{addressInfo["addrLine2"]}</span>
            </div>

            <div className="col-3">
              <label> City</label>
              <span>{addressInfo["city"]}</span>
            </div>

            <div className="col-3">
              <label> Disrtict</label>
              <span>{addressInfo["district"]}</span>
            </div>

            <div className="col-3">
              <label> State</label>
              <span>{addressInfo["state"]}</span>
            </div>

            <div className="col-3">
              <label> Pincode</label>
              <span>{addressInfo["pinCode"]}</span>
            </div>
          </div>
        </Card>
        <h4>Proof Of Documents</h4>
        <div className="row">
          <div className="col-4">
            <Image src={selfieImage} height={200} />
          </div>

          <div className="col-4">
            <Image src={frontImage} height={200} />
          </div>

          <div className="col-4">
            <Image src={backImage} height={200} />
          </div>

          <div className="col-4" style={{ marginTop: 30 }}>
            <Image src={signature} height={200} />
          </div>
        </div>

        <div className="footer-btn-style">
          <Button
            onClick={() => props.onBack()}
            size="large"
            style={{ marginRight: 30 }}
          >
            Back
          </Button>
          <Button
            loading={loading}
            onClick={() => verifyNewRequest()}
            size="large"
            type="primary"
          >
            Next
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>{renderSwitch()}</div>
    </div>
  );
}
