import React, { useEffect, useCallback, useState } from "react";
import "./landing.css";
import { Button, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import LOGO from "../../assests/images/pageLogo/pageLogo.svg";
import infoIcon from "../../assests/images/landing/info.svg";
import secureIcon from "../../assests/images/landing/secure.svg";
import cardIcon from "../../assests/images/landing/card.svg";
import mobileApp from "../../assests/images/landing/mobileApp.svg";
import sliderGroup from "../../assests/images/landing/slider_Group.svg";
import { useDispatch, useSelector } from "react-redux";
import { companyLogoSelector, themeSelector } from "../../store/selectors/app.selector";
import { setTheme } from "../../store/actions/app.action";
import AuthService from "../../services/auth.service";

export default function Landing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState("light");
  const theme = useSelector(themeSelector);
  const companyLogo = useSelector(companyLogoSelector);


  const changeTheme = useCallback((value) => {
    setValue(value);
    dispatch(setTheme(value));
    document.documentElement.classList = [];
    document.documentElement.classList.add(value);
  }, []);

  useEffect(() => {
    companyprofileimage();
  }, []);

  const companyprofileimage = useCallback(async () => {
    try {
      const response = await AuthService.companyprofileimage();
      if (response.status === 200) {
      }
    } catch (error) {}
  }, []);

  return (
    <>
      <div className="landing-section">
        <div className="landing-top-banner">
          <div className="d-flex">
            {companyLogo !== null && (
              <img height={50} src={`data:image/png;base64, ${companyLogo}`} />
            )}
            {companyLogo === null && (
              <>
                <img height={50} src={LOGO} />
                <h3 className="bank-name">NEO Bank</h3>
              </>
            )}
          </div>

          <div>
            <Link to={"/"}>Exchane Rates</Link>
            <Link to={"/"}>Loan Eligibility</Link>
            <Link to={"/"}>Locate Us</Link>
          </div>
          <div>
            <Select
              value={theme}
              onChange={changeTheme}
              placeholder="Choose Theme"
              bordered={false}
              style={{ width: 120 }}
            >
              <Select.Option value="light">Light</Select.Option>
              <Select.Option value="dark">Dark</Select.Option>
            </Select>

            <Button
              onClick={() => navigate("/login")}
              size="large"
              type="default"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/newCustomer")}
              size="large"
              type="primary"
            >
              Sign Up
            </Button>
          </div>
        </div>
        <div className="landing-slider">
          <div className="slider-wrapper">
            <div className="row">
              <div className="col-6">
                <h1>Life Should Be Easy. </h1>
                <p>
                  Financial transactions remotely using a mobile device such a
                  smartphone or tablet.
                </p>
                <Button size="large" onClick={() => navigate("/login")}>
                  Get Started
                </Button>
              </div>
              <div className="col-6">
                <img height={460} src={sliderGroup} />
              </div>
            </div>
          </div>
        </div>
        <div className="landing-how-its-works">
          <h2>How it works</h2>
          <p>
            Mobile Banking differ from mobile payment, which involves the use of
            a mobile device
          </p>

          <div className="row">
            <div className="col-4">
              <img src={infoIcon} />
              <h4>Information</h4>
              <span>
                Mobile Banking differ from mobile payment, which involves the
                use of a mobile device
              </span>
            </div>

            <div className="col-4">
              <img src={secureIcon} />
              <h4>Data Secure</h4>
              <span>
                Mobile Banking differ from mobile payment, which involves the
                use of a mobile device
              </span>
            </div>

            <div className="col-4">
              <img src={cardIcon} />
              <h4>Add Cards</h4>
              <span>
                Mobile Banking differ from mobile payment, which involves the
                use of a mobile device
              </span>
            </div>
          </div>
        </div>

        <div className="landing-app-info">
          <div className="row">
            <div className="col-7" align="right">
              <img height={750} src={mobileApp} />
            </div>
            <div className="col-5">
              <h1>Download Mobile App</h1>
              <p>
                Download mobile banking app for IOS or Android. It help you
                banking quickly and more smartly.
              </p>
              <div className="auth-card"></div>
              <div className="auth-card"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="landing-footer"></div>
    </>
  );
}
