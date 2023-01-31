import { Carousel, Col, Row } from "antd";

import React from "react";
import { Outlet } from "react-router";
import "./auth.css";
import LOGO from "../../assests/images/pageLogo/pageLogo.svg";
import { useSelector } from "react-redux";
import { companyLogoSelector } from "../../store/selectors/app.selector";

export default function AuthWrapper() {
  const companyLogo = useSelector(companyLogoSelector);

  return (
    <div className="auth-container">
      <div className="auth-render-section">
        <div
          className="d-flex"
          style={{
            marginBottom: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {companyLogo !== null && (
            <img height={45} src={`data:image/png;base64, ${companyLogo}`} />
          )}
          {companyLogo === null && (
            <>
              <img height={45} src={LOGO} />
              <h3 className="bank-name1">NEO Bank</h3>
            </>
          )}

          {/* <img height={45} src={LOGO} /> */}

          {/* <h3 className="bank-name1">NEO Bank</h3> */}
        </div>
        <Outlet />
      </div>
    </div>
  );
}
