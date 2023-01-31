import { Button, Divider, message } from "antd";
import React, { useState, useCallback } from "react";
import Webcam from "react-webcam";
import UploadImage from "../components/upload-image";
import { useDispatch, useSelector } from "react-redux";
import {
  identityInfoSelector,
  selfieImageSelector,
} from "../../../../store/selectors/customer.selector";
import {
  setAddressInfo,
  setBackImageInfo,
  setBasicInfo,
  setFamilyInfo,
  setFrontImageInfo,
} from "../../../../store/actions/customer.action";
import NewCustomerService from "../../../../services/new-customer.service";
import moment from "moment";

export default function UploadIdentityFront(props) {
  const webcamRef = React.useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showUpload, setShowUpload] = useState(true);
  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const [notMatched, setNotMatched] = useState(false);
  const dispatch = useDispatch();
  const selfieImage = useSelector(selfieImageSelector);
  const [loader, setLoader] = useState(false);
  const idetityDetails = useSelector(identityInfoSelector);

  const [verifyDetails, setVerifyDetails] = useState({});

  const verifyFacematch = useCallback(async () => {
    try {
      setLoader(true);
      const response = await NewCustomerService.verifyFacematch(
        selfieImage.split(",")[1],
        frontImage.split(",")[1]
      );
      if (response.status === 200) {
        //  if (response.data["match"] && response.data["matchScore"] >= 50) {
          dispatch(setFrontImageInfo(frontImage));
          dispatch(setBackImageInfo(backImage));
          await getKycDetails();
          props.onNext();
        // } else {
        //   setLoader(false);
        //   setVerifyDetails(response.data);
        //   // message.error(
        //   //   "Uploaded or Captured an image of Id not match with real face."
        //   // );
        // }
      }
    } catch (err) {
      setLoader(false);
    }
  }, [frontImage, backImage]);

  const getKycDetails = useCallback(async () => {
    try {
      const response = await NewCustomerService.getKycDetails(
        frontImage.split(",")[1],
        backImage.split(",")[1]
      );
      if (response.status === 200) {
        setLoader(false);

        dispatch(
          setBasicInfo({
            firstName: response.data["name"],
            dateOfBirth: moment(response.data["dob"], "DD/MM/YYYY").format(
              "MM/DD/YYYY"
            ),
            gender: response.data["gender"] === "MALE" ? 1 : 2,
          })
        );

        dispatch(
          setAddressInfo({
            addrLine1: response.data["addrLine1"],
            addrLine2: response.data["addrLine2"],
            city: response.data["city"],
            district: response.data["district"],
            state: response.data["state"],
            pinCode: response.data["zipCode"],
            houseNumber: response.data["houseNumber"],
          })
        );

        dispatch(
          setFamilyInfo({
            fatherFirstName: response.data["father"],
            motherFirstName: response.data["mother"],
          })
        );
      }
    } catch (err) {
      setLoader(false);
    }
  }, [frontImage, backImage]);

  return (
    <>
      <h3>Upload {idetityDetails?.name}</h3>
      <p>Please Upload the Front and Back image of {idetityDetails?.name} </p>

      <div className="row">
        <div className="col-6">
          <div className="capture-render-area">
            {showUpload && (
              <div>
                <UploadImage
                  text="Front"
                  getUploadImage={(img) => {
                    setFrontImage(img);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="col-6">
          <div className="capture-render-area">
            {showUpload && (
              <div>
                <UploadImage
                  text="Back"
                  getUploadImage={(img) => {
                    setBackImage(img);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="footer-btn-style">
        <Button
          size="large"
          onClick={() => props.onBack()}
          style={{ marginRight: 30 }}
        >
          Back
        </Button>
        <Button
          loading={loader}
          size="large"
          type="primary"
          onClick={() => verifyFacematch()}
        >
          Next
        </Button>

        {verifyDetails?.match === false && !loader && (
          <span style={{ fontSize: 18, color: "red", paddingLeft: 20 }}>
            Uploaded or Captured an image of Id not match with real face
          </span>
        )}

        {verifyDetails?.match === true &&
          verifyDetails?.matchScore < 50 &&
          !loader && (
            <span style={{ fontSize: 18, color: "red", paddingLeft: 20 }}>
              Uploaded image not match with real face.{" "}
              <b>Your matched scrore: {verifyDetails?.matchScore}</b>.
            </span>
          )}
      </div>
    </>
  );
}
