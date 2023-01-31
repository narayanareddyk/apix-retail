import React, { useCallback, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import DashboardIcon from "../../assests/images/navigation/dashboard.svg";
import AccountsIcon from "../../assests/images/navigation/accounts.svg";
import PortfolioIcon from "../../assests/images/navigation/portfolio.svg";
import TransfersIcon from "../../assests/images/navigation/transfers.svg";
import PaymentsIcon from "../../assests/images/navigation/payments.svg";
import DepositIcon from "../../assests/images/navigation/deposit.svg";
import LoansIcon from "../../assests/images/navigation/loans.svg";
import ExchangeRatesIcon from "../../assests/images/navigation/exchangeRates.svg";
import OtherServicesIcon from "../../assests/images/navigation/otherServices.svg";

import OfferBanner1 from "../../assests/images/common/offerBanner1.svg";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <div
        className={
          location.pathname.includes("/dashboard")
            ? "nav-link selected"
            : "nav-link"
        }
        onClick={() => navigate("/dashboard")}
      >
        <img width={20} height={20} src={DashboardIcon} />
        <span>Dashboard</span>
      </div>

      <div
        className={
          location.pathname.includes("/accounts")
            ? "nav-link selected"
            : "nav-link"
        }
        onClick={() => navigate("/accounts")}
      >
        <img width={20} height={20} src={AccountsIcon} />
        <span>Accounts</span>
      </div>

      <div
        className={
          location.pathname.includes("/portfolio")
            ? "nav-link selected"
            : "nav-link"
        }
        onClick={() => navigate("/portfolio")}
      >
        <img width={20} height={20} src={PortfolioIcon} />
        <span>Portfolio</span>
      </div>
      <div
        className={
          location.pathname.includes("/transfers")
            ? "nav-link selected"
            : "nav-link"
        }
        onClick={() => navigate("/transfers")}
      >
        <img width={20} height={20} src={TransfersIcon} />
        <span>Transfers</span>
      </div>
      <div
        className={
          location.pathname.includes("/payments")
            ? "nav-link selected"
            : "nav-link"
        }
        onClick={() => navigate("/payments")}
      >
        <img width={20} height={20} src={PaymentsIcon} />
        <span>Payments</span>
      </div>
      <div
        className={
          location.pathname.includes("/deposit")
            ? "nav-link selected"
            : "nav-link"
        }
        onClick={() => navigate("/deposit")}
      >
        <img width={20} height={20} src={DepositIcon} />
        <span>Deposit</span>
      </div>
      <div
        className={
          location.pathname.includes("/loans")
            ? "nav-link selected"
            : "nav-link"
        }
        onClick={() => navigate("/loans")}
      >
        <img width={20} height={20} src={LoansIcon} />
        <span>Loans</span>
      </div>

      <div
        className={
          location.pathname.includes("/exchangeRates")
            ? "nav-link selected"
            : "nav-link"
        }
        onClick={() => navigate("/exchangeRates")}
      >
        <img width={20} height={20} src={ExchangeRatesIcon} />
        <span>Exchange Rates</span>
      </div>

      <div
        className={
          location.pathname.includes("/otherServices")
            ? "nav-link selected"
            : "nav-link"
        }
        onClick={() => navigate("/otherServices")}
      >
        <img width={20} height={20} src={OtherServicesIcon} />
        <span>Other Services</span>
      </div>

      <img
        height={135}
        onClick={() => navigate("/loans/applyLoan")}
        style={{
          display: "block",
          margin: "0 auto",
          marginTop: 15,
          cursor: "pointer",
        }}
        src={OfferBanner1}
      />
    </>
  );
}
