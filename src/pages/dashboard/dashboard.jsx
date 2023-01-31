import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountService from "../../services/account.service";
import AccountCard from "../components/account-card";
import Carousel from "react-multi-carousel";
import "../accounts/account.css";
import "./dashboard.css";
import { Empty } from "antd";
import weeklyImage from "../../assests/images/common/weekly.svg";
import historyImage from "../../assests/images/common/history.png";
import recentImage from "../../assests/images/common/recent.png";
import quickImage from "../../assests/images/common/quick.png";
import offerImage from "../../assests/images/offer1.svg";
import { FiArrowRightCircle } from "react-icons/fi";
import RecentTransaction from "./recentTransactions";

export default function Dashboard() { 
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);


  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = useCallback(async () => {
    try {
      const response = await AccountService.getAllAccounts();
      if (response.status === 200) {
        setDataSource(response.data.slice(0,2));
      }
    } catch (err) {}
  }, []);

  return (
    <div className="dashboard-section">
      <div className="row" style={{ marginBottom: 15 }}>
        <div className="col-8">
          <div className="d-flex title-section" style={{ marginTop: 0 }}>
            <h5 style={{ margin: 0 }}>My Accounts</h5>
            {/* <span>View Portfoliok</span> */}
          </div>

          {/* <div className="account-cards-section">
            {dataSource.map((option, idx) => (
              <div key={idx} className="col-5">
                <AccountCard source="DASHBOARD" accIndex={idx + 1} account={option} />
              </div>
            ))}
          </div> */}

          {dataSource.length > 0 && (
            <div className="row account-cards-section static-account-cards-section">
              {dataSource.map((option, idx) => (
                <div className="col-5" style={{ width: "38%" }}>
                  <AccountCard
                    source="DASHBOARD"
                    accIndex={idx + 1}
                    key={idx}
                    account={option}
                  />
                </div>
              ))}
              <div className="col-2 ">
                <div
                  style={{
                    height: 180,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  className="sub-layout-render-secton"
                >
                  <div onClick={() => navigate("/portfolio")}>
                    <FiArrowRightCircle
                      className="dashboard-arrow"
                      style={{ fontSize: 25 }}
                    />
                    <p style={{ marginTop: 10 }}> View Portfolio</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-4">
          <img
            src={offerImage}
            style={{ width: "100%", height: 190, marginTop: 35 }}
          />
        </div>
      </div>
      <div className="row" style={{ marginBottom: 35 }}>
        <div className="col-8">
          <h5>Weekly Activity</h5>
          <div
            className="sub-layout-render-secton"
            style={{ background: "#FFF",height: 375 }}
          >
            <img src={weeklyImage} />
          </div>
        </div>
        <div className="col-4">
          <h5>Recent Transaction</h5>
          <div className="sub-layout-render-secton" style={{ height: 375 }}>
            <RecentTransaction />
          </div>
        </div>
      </div>

      <div className="row" style={{ marginBottom: 30 }}>
        <div className="col-5">
          <h5>Quick Transfer</h5>
          <div
            className="sub-layout-render-secton"
            style={{ background: "#FFF" }}
          >
            <img src={quickImage} />
          </div>
        </div>
        <div className="col-7">
          <h5>Balance History</h5>
          <div
            className="sub-layout-render-secton"
            style={{ height: 315, background: "#FFF" }}
          >
            <img height={293} src={historyImage} style={{ width: "100%" }} />
          </div>
        </div>
      </div>
      <div style={{ height: 1 }}></div>
    </div>
  );
}
