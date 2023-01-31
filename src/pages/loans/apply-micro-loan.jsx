import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumb, Button } from "antd";
import { useNavigate } from "react-router-dom";

import successImage from "../../assests/images/transfers/success1.svg";
import successImage1 from "../../assests/images/transfers/success.svg";

import AddressInfo from "./loan-steps/addressInfo";
import NewCustomerService from "../../services/new-customer.service";
import BasicInfo from "./loan-steps/basicInfo";
import EmploymentInfo from "./loan-steps/employmentInfo";
import MicroEmploymentInfo from "./loan-steps/micro-employment";
import MicroDocuments from "./loan-steps/micro-documents";
import BannerImage from "../../assests/images/common/offerBanner2_2.png";

export default function ApplyMicroLoan() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [masterData, setMasterData] = useState({});

  const [form1Values, setForm1Values] = useState({});

  const [form2Values, setForm2Values] = useState({});

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
        return verifyLoanAmount();

      case 2:
        return (
          <AddressInfo
            formValues={form1Values}
            setFormValues={(values) => {
              setForm1Values(values);
              setStage(3);
            }}
            masterData={masterData}
            setStage={() => setStage(1)}
          />
        );

      case 3:
        return (
          <MicroEmploymentInfo
            formValues={form2Values}
            setFormValues={(values) => {
              setForm2Values(values);
              setStage(4);
            }}
            masterData={masterData}
            setStage={() => setStage(2)}
          />
        );
      case 4:
        return (
          <MicroDocuments
            setFormValues={(values) => {
              setStage(5);
            }}
            masterData={masterData}
            setStage={() => setStage(3)}
          />
        );

      case 5:
        return confirmLoanAmount();

      default:
        return verifyLoanAmount();
    }
  }

  function confirmLoanAmount() {
    return (
      <>
        <div className="render-success-section">
          <img src={successImage1} />
          <p style={{ width: 500, fontSize: 19, marginTop: 50 }}>
            <b>Congratulations !!</b> Your Loan amount has been approved and
            will be credited into your account within 30 Minutes
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

  function verifyLoanAmount() {
    return (
      <>
        <div className="render-success-section">
          <img src={successImage} />
          <p>
            You are eligible for a micro loan of{" "}
            <span style={{ fontSize: 20, fontWeight: 600 }}>INR 10,000.00</span>
          </p>
          <p>
            Click proceed to get the loan amount instanly credited to your
            account
          </p>
          <div className="btn-group-style">
            <Button
              onClick={() => setStage(2)}
              size={"large"}
              style={{ margin: "0 auto" }}
              type="primary"
            >
              Proceed
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
        <Breadcrumb.Item>New Micro Loan</Breadcrumb.Item>
      </Breadcrumb>

      <div className="row">
        <div className="col-8">
          <div
            className="d-flex title-section"
            style={{ margin: 0, marginBottom: 15 }}
          >
            <h4>Apply New Micro Loan</h4>
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
                height: 450,
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
