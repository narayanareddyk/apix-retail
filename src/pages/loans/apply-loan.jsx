import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumb, Button } from "antd";
import { useNavigate } from "react-router-dom";
import NewCustomerService from "../../services/new-customer.service";
import { profileDetailsSelector } from "../../store/selectors/app.selector";
import { useDispatch, useSelector } from "react-redux";
import BasicInfo from "./loan-steps/basicInfo";
import EmploymentInfo from "./loan-steps/employmentInfo";
import AddressInfo from "./loan-steps/addressInfo";
import BusinessInfo from "./loan-steps/businessInfo";
import LoanStepForm5 from "./loan-steps/businessDocuments";
import BusinessDocuments from "./loan-steps/businessDocuments";
import OtherServicesDocument from "./loan-steps/otherServiceDocument";
import SalariedDocument from "./loan-steps/salariedDocument";
import ReferenceDetails from "./loan-steps/referenceDetails";
import successImage1 from "../../assests/images/transfers/success.svg";
import BannerImage from "../../assests/images/common/offerBanner2_2.png";

export default function ApplyLoan() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [masterData, setMasterData] = useState({});
  const [empType, setEmpType] = useState("");
  const [form1Values, setForm1Values] = useState({});
  const [form2alues, setForm2Values] = useState({});
  const [form3Values, setForm3Values] = useState({});
  const [form4Values, setForm4Values] = useState({});
  const [form5Values, setForm5Values] = useState({});
  const [form6Values, setForm6Values] = useState({});
  const [form7Values, setForm7Values] = useState({});

  useEffect(() => {
    getMasterData();
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
          <BasicInfo
            formValues={form1Values}
            masterData={masterData}
            setFormValues={(values) => {
              setForm1Values(values);
              setStage(2);
            }}
          />
        );

      case 2:
        return (
          <AddressInfo
            formValues={form2alues}
            setFormValues={(values) => {
              setForm2Values(values);
              setStage(3);
            }}
            masterData={masterData}
            setStage={setStage}
          />
        );

      case 3:
        return (
          <EmploymentInfo
            formValues={form3Values}
            setFormValues={(values) => {
              setForm3Values(values);
              if (values?.employmentType === "Salaried") {
                setStage(7);
              } else {
                setEmpType(values?.employmentType);
                setStage(4);
              }
            }}
            masterData={masterData}
            setStage={setStage}
          />
        );

      case 4:
        return (
          <BusinessInfo
            formValues={form4Values}
            setFormValues={(values) => {
              setForm4Values(values);
              if (empType === "Business") {
                setStage(5);
              }

              if (empType === "Other Services") {
                setStage(6);
              }
            }}
            masterData={masterData}
            setStage={setStage}
          />
        );
      case 5:
        return (
          <BusinessDocuments
            formValues={form5Values}
            setFormValues={(values) => {
              setForm5Values(values);
              setStage(8);
            }}
            masterData={masterData}
            setStage={setStage}
          />
        );

      case 6:
        return (
          <OtherServicesDocument
            formValues={form6Values}
            setFormValues={(values) => {
              setForm6Values(values);
              setStage(8);
            }}
            masterData={masterData}
            setStage={setStage}
          />
        );

      case 7:
        return (
          <SalariedDocument
            formValues={form7Values}
            setFormValues={(values) => {
              setForm7Values(values);
              setStage(9);
            }}
            masterData={masterData}
            setStage={() => setStage(3)}
          />
        );

      case 8:
        return (
          <ReferenceDetails
            formValues={form7Values}
            setFormValues={(values) => {
              setForm7Values(values);
              setStage(9);
            }}
            masterData={masterData}
            setStage={() => setStage(3)}
          />
        );

      case 9:
        return confirmLoanAmount();

      default:
        return (
          <BasicInfo
            formValues={form1Values}
            setFormValues={(values) => {
              setForm1Values(values);
              setStage(2);
            }}
          />
        );
    }
  }

  function confirmLoanAmount() {
    return (
      <>
        <div className="render-success-section">
          <img src={successImage1} />
          <p style={{ width: 500, fontSize: 19, marginTop: 50 }}>
            Congratulations Your Loan appliction submitted successfully. Our
            representative will get in touch with you shortly
          </p>
          <div className="btn-group-style">
            <Button
              onClick={() => navigate("/loans")}
              size={"large"}
              style={{ margin: "0 auto" }}
              type="primary"
            >
              Back to home
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb className="bread-crumb-section">
        <Breadcrumb.Item>
          <a onClick={() => navigate("/dashboard")}>Dashboard</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a onClick={() => navigate("/loans")}>Loans</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Apply New Loan</Breadcrumb.Item>
      </Breadcrumb>

      <div className="row">
        <div className="col-8">
          <div
            className="d-flex title-section"
            style={{ margin: 0, marginBottom: 15 }}
          >
            <h4>Apply New Loan</h4>
            {/* <span>Step {stage} / 5</span> */}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-8">
          <div className="sub-layout-render-secton">{renderSwitch()}</div>
        </div>

        {stage !== 3 && (
          <div className="col-4">
            <div
              className="offer-banner-style"
              style={{
                height: 400,
                borderRadius: 10,
              }}
            >
              <p style={{ lineHeight: 25 }}>Placeholder for offers here</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
