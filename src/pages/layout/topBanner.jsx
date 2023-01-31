import React, { useCallback, useEffect, useState } from "react";
import LOGO from "../../assests/images/pageLogo/pageLogo.svg";
import settingIcon from "../../assests/images/top-banner/settings.svg";
import profileIcon from "../../assests/images/top-banner/profile.svg";
import notificationIcon from "../../assests/images/top-banner/notification.svg";
import { Button, Popover, Select } from "antd";
import { FaUserAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../../services/auth.service";
import {
  companyLogoSelector,
  profileImageSelector,
  themeSelector,
} from "../../store/selectors/app.selector";
import { setTheme } from "../../store/actions/app.action";

export default function TopBanner() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [value, setValue] = useState("light");
  const theme = useSelector(themeSelector);
  const profileImage = useSelector(profileImageSelector);
  const companyLogo = useSelector(companyLogoSelector);

  const profileOptions = (
    <div className="profile-setting-options">
      <span onClick={() => navigate("/profileSettings")}>Profile</span>
      <span>Change Password</span>
      <span
        onClick={async () => {
          try {
            await AuthService.logoutUser();
            navigate("/login");
          } catch (err) {}
        }}
      >
        Logout
      </span>
    </div>
  );

  const changeTheme = useCallback((value) => {
    setValue(value);
    dispatch(setTheme(value));
    document.documentElement.classList = [];
    document.documentElement.classList.add(value);
  }, []);

  return (
    <>
      <div className="d-flex" style={{ alignItems: "center" }}>
        <div className="d-flex" style={{ alignItems: "center" }}>
          {companyLogo !== null && (
            <img height={35} src={`data:image/png;base64, ${companyLogo}`} />
          )}
          {companyLogo === null && (
            <>
              <img height={35} src={LOGO} />
              <h3 className="bank-name2">NEO Bank</h3>
            </>
          )}
        </div>

        <h4 style={{ marginLeft: 65, marginBottom: 0 }}>
          {location.pathname.includes("/dashboard") && "Dashboard"}
          {location.pathname.includes("/portfolio") && "Portfolio"}
          {location.pathname.includes("/accounts") && "Accounts"}
          {location.pathname.includes("/transfers") && "Transfers"}
          {location.pathname.includes("/payments") && "Payments"}
          {location.pathname.includes("/deposit") && "Deposit"}
          {location.pathname.includes("/loans") && "Loans"}
          {location.pathname.includes("/exchangeRates") && "Exchange Rates"}
          {location.pathname.includes("/otherServices") && "Other Services"}
          {location.pathname.includes("/profileSettings") && "Profile"}
          {location.pathname.includes("/settings") && "Settings"}
        </h4>
      </div>

      <div className="d-flex top-banner-options">
        <Select
          value={theme}
          onChange={changeTheme}
          placeholder="Choose Theme"
          bordered={false}
          style={{ width: 120 }}
        >
          <Select.Option value="light">Light </Select.Option>
          <Select.Option value="dark">Dark </Select.Option>
        </Select>

        <div className="img-wrapper image-bg-color-2">
          <img
            onClick={() => navigate("/settings")}
            height={15}
            src={settingIcon}
          />
        </div>

        <div className="img-wrapper image-bg-color-2">
          <img height={15} src={notificationIcon} />
        </div>

        <div className="img-wrapper">
          <Popover
            content={profileOptions}
            placement="bottomRight"
            trigger={"click"}
          >
            <img
              height={40}
              width={40}
              style={{ borderRadius: "50%", objectFit: "cover" }}
              src={`data:image/png;base64, ${profileImage}`}
            />
          </Popover>
        </div>
      </div>
    </>
  );
}
