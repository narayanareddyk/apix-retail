import React, { useState, useCallback, useEffect } from "react";
import "./new-customer.css";
import GetStarted from "./steps/getStarted";
import pageLogo from "../../../assests/images/pageLogo/pageLogo.svg";
import IdentityType from "./steps/identity";
import CaptureFace from "./steps/captureFace";
import BasicInfo from "./steps/basicInfo";
import FamilyInfo from "./steps/familyInfo";
import Signature from "./steps/signature";
import UploadIdentityFront from "./steps/uploadIdentityFront";
import Confirmation from "./steps/confirmation";
import AddressDetails from "./steps/addressDetails";
import { Divider } from "antd";
import { MdOutlineFlight } from "react-icons/md";
import { BsCheck2, BsClipboardCheck } from "react-icons/bs";
import ValidateMobile from "./steps/validateMobile";
import { useNavigate } from "react-router-dom";
import ValidateEmail from "./steps/validateEmail";
import ValidateMobileOtp from "./steps/verifymobileOtp";
import ValidateEmailOtp from "./steps/validateEmailOtp";
import NewCustomerService from "../../../services/new-customer.service";
import ProductFeatures from "./steps/productDetails";
import { companyLogoSelector } from "../../../store/selectors/app.selector";
import { useSelector } from "react-redux";

export default function NewCustomer() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(1);
  const [masterData, setMasterData] = useState({});
  const history = useNavigate();
  const [countryList, setCountryList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [verifyDetails, setVerifyDetails] = useState({});
  const [done, setDone] = useState(false);
  const companyLogo = useSelector(companyLogoSelector);


  useEffect(() => {
    getMasterData();
    // getCountryCodes();
  }, []);

  const getMasterData = useCallback(async (values) => {
    try {
      const response = await NewCustomerService.getRegistrationRequiredValues();
      if (response.status === 200) {
        setMasterData(response.data["data"]);
      }
    } catch (err) {}
  }, []);

  function renderSwitch() {
    switch (stage) {
      case 1:
        return (
          <>
            <ValidateMobile
              onBack={() => history("/login")}
              onNext={() => setStage(2)}
            />
          </>
        );

      case 2:
        return (
          <>
            <ValidateMobileOtp
              onBack={() => setStage(1)}
              onNext={() => setStage(3)}
            />
          </>
        );

      case 3:
        return (
          <>
            <ValidateEmail
              onBack={() => history("/login")}
              onNext={() => setStage(4)}
            />
          </>
        );

      case 4:
        return (
          <>
            <ValidateEmailOtp
              onBack={() => setStage(3)}
              onNext={() => setStage(5)}
            />
          </>
        );

      case 5:
        return (
          <>
            <h3>Terms And Conditions</h3>
            <GetStarted
              onBack={() => history("/login")}
              onNext={() => setStage(6)}
            />
          </>
        );

      case 6:
        return (
          <>
            <h3>Identity Information</h3>
            <p>Please fill the Identity Information </p>
            <IdentityType
              onBack={() => history("/login")}
              onNext={() => setStage(7)}
              masterData={masterData}
              countryList={countryList}
            />
          </>
        );
      case 7:
        return (
          <>
            <CaptureFace
              onBack={() => setStage(6)}
              onNext={() => setStage(8)}
              masterData={masterData}
            />
          </>
        );

      case 8:
        return (
          <>
            <UploadIdentityFront
              onBack={() => setStage(7)}
              onNext={() => setStage(9)}
              masterData={masterData}
            />
          </>
        );

      case 9:
        return (
          <>
            <h3>Basic Information</h3>
            <p>Please fill the Basic Information </p>
            <BasicInfo
              onBack={() => setStage(8)}
              onNext={() => setStage(10)}
              masterData={masterData}
            />
          </>
        );

      case 10:
        return (
          <>
            <h3>Family Information</h3>
            <p>Please fill the Family and Spouse Information </p>
            <FamilyInfo
              onBack={() => setStage(9)}
              onNext={() => setStage(11)}
              masterData={masterData}
            />
          </>
        );

      case 11:
        return (
          <>
            <h3>Address Information</h3>
            <p>Please fill the Address Information </p>
            <AddressDetails
              onBack={() => setStage(10)}
              onNext={() => setStage(12)}
              masterData={masterData}
            />
          </>
        );

      case 12:
        return (
          <>
            <Signature
              onBack={() => setStage(11)}
              onNext={() => setStage(13)}
              masterData={masterData}
            />
          </>
        );

      case 13:
        return (
          <>
            <Confirmation
              onBack={() => setStage(12)}
              onNext={() => setStage(14)}
              setDone={() => setDone(true)}
              masterData={masterData}
            />
          </>
        );

      default:
        return <GetStarted />;
    }
  }

  return (
    <div className="new-customer-wrapper">
      <div className="new-customer-container">
        <div className="new-customer-header">
          <div className="d-flex">
          {companyLogo !== null && (
              <img height={50} src={`data:image/png;base64, ${companyLogo}`} />
            )}
            {companyLogo === null && (
              <>
                <img height={50} src={pageLogo} />
                <h3 className="bank-name">NEO Bank</h3>
              </>
            )}
          </div>
          <div>
            <Divider orientation="center" type="horizontal">
              <div className="customer-steps">
                <div>
                  <div
                    className="n-circle"
                    style={
                      stage > 0
                        ? { background: "#F6834C" }
                        : { background: "#dadada" }
                    }
                  >
                    <MdOutlineFlight
                      className="icon-style"
                      style={
                        stage > 0 ? { color: "#fff" } : { color: "#6e6e6e" }
                      }
                    />
                  </div>
                  <span>Get Started</span>
                </div>

                <div>
                  <div
                    className="n-circle"
                    style={
                      stage > 1
                        ? { background: "#F6834C" }
                        : { background: "#dadada" }
                    }
                  >
                    <BsClipboardCheck
                      className="icon-style"
                      style={
                        stage > 1 ? { color: "#fff" } : { color: "#6e6e6e" }
                      }
                    />
                  </div>
                  <span>Registration</span>
                </div>

                <div>
                  <div
                    className="n-circle"
                    style={
                      done
                        ? { background: "#F6834C" }
                        : { background: "#dadada" }
                    }
                  >
                    <BsCheck2
                      className="icon-style"
                      style={done ? { color: "#fff" } : { color: "#6e6e6e" }}
                    />
                  </div>
                  <span>Completed</span>
                </div>
              </div>
            </Divider>
          </div>
        </div>
        <div className="new-customer-render-section">{renderSwitch()}</div>
      </div>
    </div>
  );
}
