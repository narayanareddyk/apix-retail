import React, { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import "./layout.css";
import TopBanner from "./topBanner";
import { authTokenSelector } from "../../store/selectors/auth.selector";
import { useSelector, useDispatch } from "react-redux";

export default function Layout() {
  const authToken = useSelector(authTokenSelector);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (authToken === null) {
  //     navigate("/login");
  //   }
  // }, [authToken]);

  return (
    <div className="app-container">
      <div className="top-banner">
        <TopBanner />
      </div>
      <div className="render-section">
        <div className="left-section">
          <NavBar />
        </div>
        <div className="right-section">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
