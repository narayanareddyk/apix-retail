import { Button, Divider, message } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";
import UploadImage from "../components/upload-image";
import { useDispatch, useSelector } from "react-redux";
import faceScanIcon from "../../../../assests/images/new-customer/faceScan.png";
import { selfieImageSelector } from "../../../../store/selectors/customer.selector";
import { setSelfieImageInfo } from "../../../../store/actions/customer.action";
import NewCustomerService from "../../../../services/new-customer.service";

export default function CaptureFace(props) {
  const webcamRef = React.useRef(null);
  const [showCamera, setShowCamera] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [selfieImage, setSelfieImage] = useState("");
  const [loader, setLoader] = useState(false);

  const selfieDetails = useSelector(selfieImageSelector);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const verifyLiveness = useCallback(async () => {
    try {
      if (selfieImage.length === 0) {
        message.error("Please capture selfie");
        return;
      }
      setLoader(true);
      const response = await NewCustomerService.verifyLiveness(
        selfieImage.split(",")[1]
      );
      if (response.status === 200) {
        setLoader(false);
        if (response.data["liveness"]) {
          dispatch(setSelfieImageInfo(selfieImage));
          props.onNext();
        }
      }
    } catch (err) {
      setLoader(false);
    }
  }, [selfieImage]);

  // const postData = useCallback(() => {
  //   try {
  //     dispatch(setSelfieImageInfo(selfieImage))
  //     props.onNext()
  //   } catch (err) {}
  // }, [selfieImage])

  return (
    <div className="row">
      <div className="col-5">
        <h3>Capture Selfie</h3>
        <p>Please Capture the Selfie </p>

        <img
          width={200}
          style={{ display: "block", marginBottom: 76 }}
          src={faceScanIcon}
        />

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
            onClick={() => verifyLiveness()}
          >
            Next
          </Button>
        </div>
      </div>
      <div className="col-7">
        {/* <div style={{ textAlign: 'center' }} className='upload-options'>
          <span
            onClick={() => {
              setShowCamera(true)
              setShowUpload(false)
              setSelfieImage('')
            }}>
            <AiFillCamera style={{ fontSize: 30 }} /> Open Camera
          </span>
          <Divider type='vertical' />
          <span
            onClick={() => {
              setShowCamera(false)
              setShowUpload(true)
              setSelfieImage('')
            }}>
            <RiFileUploadFill style={{ fontSize: 30 }} /> Upload From Device
          </span>
        </div> */}
        <div className="capture-render-area">
          {showCamera && selfieImage.length === 0 && (
            <Webcam
              ref={webcamRef}
              audio={false}
              height="260px"
              width={"100%"}
              screenshotFormat="image/jpeg"
              screenshotQuality={1}
              imageSmoothing={true}
              minScreenshotHeight={1000}
              minScreenshotWidth={1000}
              className="web-cam"
            />
          )}

          {showCamera && selfieImage.length > 0 && (
            <img
              src={selfieImage}
              height="260px"
              style={{ margin: "0 auto", display: "block" }}
            />
          )}

          {showUpload && (
            <div>
              <UploadImage
                getUploadImage={(img) => {
                  setSelfieImage(img);
                }}
              />
            </div>
          )}
        </div>
        {showCamera && selfieImage.length === 0 && (
          <div
            style={{
              marginTop: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => setSelfieImage(webcamRef.current.getScreenshot())}
              size="large"
              type="primary"
            >
              Take screenshot
            </Button>
          </div>
        )}

        {showCamera && selfieImage.length > 0 && (
          <div
            style={{
              marginTop: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => {
                setSelfieImage("");
              }}
              size="large"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
