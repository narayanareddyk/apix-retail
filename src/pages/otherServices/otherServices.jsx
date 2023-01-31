import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AddAccountIcon from "../../assests/images/otherServices/addAcc.svg";
import BlockDebitCardIcon from "../../assests/images/otherServices/block_debit_card.svg";
import CardsIcon from "../../assests/images/otherServices/card.svg";
import ChequeStatusIcon from "../../assests/images/otherServices/checkStatus.svg";
import DeLinkIcon from "../../assests/images/otherServices/deLink.svg";
import DownloadCenterIcon from "../../assests/images/otherServices/downloadCenter.svg";
import FeedbackIcon from "../../assests/images/otherServices/feedback.svg";
import LinkIcon from "../../assests/images/otherServices/link.svg";
import QRCodeIcon from "../../assests/images/otherServices/QrCode.svg";
import ReIssueCardIcon from "../../assests/images/otherServices/re_issue_card.svg";
import ChequeRequestIcon from "../../assests/images/otherServices/request.svg";
import DebitCardRequestIcon from "../../assests/images/otherServices/requestCard.svg";
import StopChequeIcon from "../../assests/images/otherServices/stopCheque.svg";
import SupportCenterIcon from "../../assests/images/otherServices/support.svg";

export default function OtherServices() {
  const navigate = useNavigate();
  return (
    <div className="other-services-section">
      <div className="row">
        <div className="col-3">
          <div
            className="menu-card"
            onClick={() => navigate("/otherServices/linkAccount")}
          >
            <div className="img-wrapper image-bg-color-1">
              <img height={14} src={LinkIcon} />
            </div>
            <div>
              <h5>Link Account</h5>
              <p>Link an Account</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div
            className="menu-card"
            onClick={() => navigate("/otherServices/deLinkAccount")}
          >
            <div className="img-wrapper image-bg-color-2">
              <img height={20} src={DeLinkIcon} />
            </div>
            <div>
              <h5>Delink Account</h5>
              <p>Delink an active accounts</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="menu-card">
            <div className="img-wrapper image-bg-color-3">
              <img height={20} src={AddAccountIcon} />
            </div>
            <div>
              <h5>Add Account</h5>
              <p>Open new Account</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="menu-card">
            <div className="img-wrapper image-bg-color-1">
              <img height={20} src={ChequeRequestIcon} />
            </div>
            <div>
              <h5>Cheque Request</h5>
              <p>Request the Chequebook</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="menu-card">
            <div className="img-wrapper image-bg-color-4">
              <img height={24} src={StopChequeIcon} />
            </div>
            <div>
              <h5>Stop Cheque</h5>
              <p>Stop the Cheque leafs</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="menu-card">
            <div className="img-wrapper image-bg-color-4">
              <img height={24} src={ChequeStatusIcon} />
            </div>
            <div>
              <h5>Cheque Status</h5>
              <p>Check the Cheque Staus</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="menu-card">
            <div className="img-wrapper image-bg-color-2">
              <img height={24} src={DebitCardRequestIcon} />
            </div>
            <div>
              <h5>Request Debit Card</h5>
              <p>Request a new Debit Card</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="menu-card">
            <div className="img-wrapper image-bg-color-4">
              <img height={24} src={BlockDebitCardIcon} />
            </div>
            <div>
              <h5>Block Debit Card</h5>
              <p>Block the Debit Card</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="menu-card">
            <div className="img-wrapper image-bg-color-2">
              <img height={24} src={ReIssueCardIcon} />
            </div>
            <div>
              <h5>Re-Issue Debit Card</h5>
              <p>Upgrade the Debit Card</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="menu-card">
            <div className="img-wrapper image-bg-color-1">
              <img height={24} src={CardsIcon} />
            </div>
            <div>
              <h5>Cards</h5>
              <p>Apply / make payments for Credit Cards </p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="menu-card">
            <div className="img-wrapper image-bg-color-3">
              <img height={24} src={FeedbackIcon} />
            </div>
            <div>
              <h5>Feedback</h5>
              <p>Give feedback and make suggestion</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="menu-card">
            <div className="img-wrapper image-bg-color-2">
              <img height={24} src={QRCodeIcon} />
            </div>
            <div>
              <h5>My QR Code</h5>
              <p>Make transfer using QR Code</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="menu-card">
            <div className="img-wrapper image-bg-color-4">
              <img height={24} src={DownloadCenterIcon} />
            </div>
            <div>
              <h5>Download Center</h5>
              <p>Download Receipts and Statements</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="menu-card">
            <div className="img-wrapper image-bg-color-3">
              <img height={24} src={SupportCenterIcon} />
            </div>
            <div>
              <h5>Support Center</h5>
              <p>View Branches and About Us</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
