import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import statementIcon from "../../assests/images/accounts/statement.svg";
import depositIcon from "../../assests/images/accounts/deposit.svg";
import cardlessCashIcon from "../../assests/images/accounts/cardlessCash.svg";
import quickTansferIcon from "../../assests/images/accounts/quickTransfer.svg";
import requestIcon from "../../assests/images/accounts/request.svg";
import linkIcon from "../../assests/images/accounts/link.svg";
import AddNewAccIcon from "../../assests/images/accounts/addNewAcc.svg";
import beneficiariesIcon from "../../assests/images/accounts/addAcc.svg";
import CardIcon from "../../assests/images/payments/card.svg";
import AccountCard from "../components/account-card";
import AccountService from "../../services/account.service";
import { useState } from "react";
import "./account.css";
import AddAccount from "./add-account";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { setAccounts } from "../../store/actions/account.action";
import Carousel from "react-multi-carousel";

import addIcon from "../../assests/images/common/add1.svg";

export default function Accounts() {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [activeKey, setActiveKey] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dipatch = useDispatch();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = useCallback(async () => {
    try {
      const response = await AccountService.getAllAccounts();
      if (response.status === 200) {
        setDataSource(response.data);
      }
    } catch (err) {}
  }, []);

  return (
    <div className="account-section">
      <div
        className="d-flex title-section"
        style={{ marginTop: 0, marginBottom: 0 }}
      >
        <h4 style={{ marginBottom: 10 }}>My Accounts</h4>
        {dataSource.length > 3 && (
          <span
            onClick={() => setIsModalVisible(true)}
            style={{ textDecoration: "underline" }}
          >
            Add New Account
          </span>
        )}
      </div>
      {dataSource.length > 3 && (
        <div className="account-cards-section">
          <Carousel
            draggable={true}
            arrows={false}
            renderDotsOutside={true}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: 4,
                partialVisibilityGutter: 30,
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0,
                },
                items: 1,
                partialVisibilityGutter: 30,
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464,
                },
                items: 2,
                partialVisibilityGutter: 30,
              },
            }}
            showDots={true}
          >
            {dataSource.map((option, idx) => (
              <AccountCard
                source="ACCOUNT"
                accIndex={idx + 1}
                key={idx}
                account={option}
              />
            ))}
          </Carousel>
        </div>
      )}

      {dataSource.length <= 3 && (
        <div className="row account-cards-section static-account-cards-section ">
          {dataSource.map((option, idx) => (
            <div key={idx} className="col-4" style={{ width: "26.5%" }}>
              <AccountCard
                source="ACCOUNT"
                accIndex={idx + 1}
                key={idx}
                account={option}
              />
            </div>
          ))}

          <div className="col-2">
            <img
              onClick={() => setIsModalVisible(true)}
              style={{ cursor: "pointer" }}
              height={180}
              src={AddNewAccIcon}
            />
          </div>
        </div>
      )}

      <h4>Quick Actions</h4>

      <div className="row">
        <div className="col-3">
          <div
            className="menu-card"
            onClick={() => navigate("/accounts/statements")}
          >
            <div className="img-wrapper image-bg-color-1">
              <img height={24} src={statementIcon} />
            </div>
            <div>
              <h5>Statement</h5>
              <p>View and Download Statement</p>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div
            className="menu-card"
            onClick={() => navigate("/transfers/quick-transfer")}
          >
            <div className="img-wrapper image-bg-color-3">
              <img height={24} src={quickTansferIcon} />
            </div>
            <div>
              <h5>Instant Transfer</h5>
              <p>Make quick funds transfer</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div
            className="menu-card"
            onClick={() => navigate("/otherServices/linkAccount")}
          >
            <div className="img-wrapper image-bg-color-4">
              <img height={25} width={25} src={linkIcon} />
            </div>
            <div>
              <h5>Link / Delink Account</h5>
              <p>Link or Delink an Account</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="menu-card" onClick={() => navigate("/transfers")}>
            <div className="img-wrapper image-bg-color-2">
              <img height={24} src={beneficiariesIcon} />
            </div>
            <div>
              <h5>Add Beneficiary</h5>
              <p>Add internal, other Beneficiries</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div
            className="menu-card"
            onClick={() => navigate("/loans/applyMicroLoan")}
          >
            <div className="img-wrapper image-bg-color-1">
              <img height={20} src={depositIcon} />
            </div>
            <div>
              <h5>Apply Micro Loan</h5>
              <p>Apply for the loan</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="menu-card">
            <div className="img-wrapper image-bg-color-2">
              <img height={20} src={cardlessCashIcon} />
            </div>
            <div>
              <h5>Cardless Cash</h5>
              <p>View your tokens and generate tokens</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="menu-card">
            <div className="img-wrapper image-bg-color-1">
              <img height={25} width={25} src={requestIcon} />
            </div>
            <div>
              <h5>Cheque Book</h5>
              <p>Request the cheque book</p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div
            className="menu-card"
            onClick={() => navigate("/accounts/debitCard")}
          >
            <div className="img-wrapper image-bg-color-4">
              <img height={25} src={CardIcon} />
            </div>
            <div>
              <h5>Debit Card</h5>
              <p>Request the Debit Card</p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={"Add New Account"}
        visible={isModalVisible}
        footer={null}
        maskClosable={false}
        width={450}
        closable={true}
        onCancel={() => setIsModalVisible(false)}
      >
        {isModalVisible && (
          <AddAccount
            key={new Date().getTime()}
            onClose={() => {
              dipatch(setAccounts([]));
              setIsModalVisible(false);
              fetchAccounts();
            }}
          />
        )}
      </Modal>
    </div>
  );
}
