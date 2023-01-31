import { Empty } from "antd";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import addIcon from "../../assests/images/common/add.svg";
import beneficiariesIcon from "../../assests/images/transfers/beneficiaries.svg";
import instantTransferIcon from "../../assests/images/transfers/instantTransfer.svg";
import BankToWalletIcon from "../../assests/images/transfers/bankToWallet.svg";

import AddBeneficiary from "../beneficiary/add-beneficiay";
import TransferService from "../../services/transfers.service";
import { useState } from "react";
import RecentTransfers from "./recentTransfers";

export default function Transfers() {
  const navigate = useNavigate();

  return (
    <>
      <div className="row">
        <div className="col-3 ">
          <div
            className="menu-card-secondary create-menu-card"
            onClick={() => navigate("/transfers/beneficiary/add-Beneficiary")}
          >
            <div className="img-wrapper">
              <img height={60} src={addIcon} />
            </div>
            <div>
              <h5>Add Beneficiary</h5>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div
            className="menu-card-secondary"
            onClick={() => navigate("/transfers/beneficiaries")}
          >
            <div className="img-wrapper image-bg-color-2">
              <img height={20} src={beneficiariesIcon} />
            </div>
            <div>
              <h5>Beneficiary Transfer</h5>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div
            className="menu-card-secondary"
            onClick={() => navigate("/transfers/quick-transfer")}
          >
            <div className="img-wrapper image-bg-color-2">
              <img height={20} src={instantTransferIcon} />
            </div>
            <div>
              <h5>Instant Transfer</h5>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="menu-card-secondary">
            <div className="img-wrapper image-bg-color-4">
              <img height={20} src={BankToWalletIcon} />
            </div>
            <div>
              <h5>Bank to Wallet</h5>
            </div>
          </div>
        </div>

        {/* <div className="col-3">
        <div className="menu-card-secondary">
            <div className="img-wrapper image-bg-color-3">
              <img height={20} src={null} />
            </div>
            <div>
              <h5>Send to Mobile</h5>
            </div>
          </div>
        </div> */}
      </div>
      <div className="row account-section">
        <div className="col-6">
          <h4>Recent Transactions</h4>
          <div className="sub-layout-render-secton" style={{ minHeight: 250 }}>
            <RecentTransfers />
          </div>
        </div>
        <div className="col-6">
          <h4>Scheduled Transactions</h4>
          <div className="sub-layout-render-secton" style={{ height: 250 }}>
            <Empty style={{ marginTop: 40 }} />
          </div>
        </div>
      </div>

      <div
        className="offer-banner-style"
        style={{
          height: 100,
          marginTop: 30,
        }}
      >
        <p style={{ lineHeight: 6 }}>Placeholder for offers here</p>
      </div>
      <div style={{ height: 20 }}></div>
    </>
  );
}
