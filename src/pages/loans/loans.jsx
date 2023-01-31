import React, { useEffect } from "react";
import { Tabs, Table, Button, Breadcrumb } from "antd";
import bannerIcon from "../../assests/images/loans/bannerImage.svg";
import bannerIcon1 from "../../assests/images/loans/bannerImage1.svg";

import { useNavigate } from "react-router-dom";
export default function Loans() {
  const navigate = useNavigate();

  return (
    <>
      <div className="sub-layout-render-secton" style={{ marginBottom: 30 }}>
        <h4>New Micro Loan</h4>
        <div className="row">
          <div className="col-9">
            <p>
              Micro Loans - Get Rapid, Loans instantly disbursed in your
              account. Chose a period of repayment from one to six months
            </p>
            <Button
              size="large"
              type="primary"
              style={{ marginTop: 20 }}
              onClick={() => navigate("/loans/applyMicroLoan")}
            >
              Apply
            </Button>
          </div>
          <div className="col-3">
            <img
              style={{ display: "block", margin: "0 auto", marginTop: "-40px" }}
              src={bannerIcon1}
            />
          </div>
        </div>
      </div>

      <div className="sub-layout-render-secton" style={{ marginBottom: 30 }}>
        <h4>New Personal Loan</h4>
        <div className="row">
          <div className="col-9">
            <p>
              Apply for a Personal Loan & get instant approval, low-interest  
              rates, Hassle-free documentation with maximum flexibility.
            </p>
            <Button
              size="large"
              type="primary"
              style={{ marginTop: 20 }}
              onClick={() => navigate("/loans/applyLoan")}
            >
              Apply
            </Button>
          </div>
          <div className="col-3">
            <img
              style={{ display: "block", margin: "0 auto", marginTop: "-40px" }}
              src={bannerIcon}
            />
          </div>
        </div>
      </div>
    </>
  );
}
