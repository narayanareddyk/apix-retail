import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Card, Divider, Modal, Radio, Switch } from "antd";
import statementIcon from "../../assests/images/accounts/statement.svg";
import card1Image from "../../assests/images/accounts/card1.svg";
import card2Image from "../../assests/images/accounts/card2.svg";
import card3Image from "../../assests/images/accounts/card3.svg";
import card4Image from "../../assests/images/accounts/card4.svg";

import NewCardIcon from "../../assests/images/accounts/new_card.svg";
import ReIssueCardIcon from "../../assests/images/accounts/re_Issue_card.svg";
import AddNewAccIcon from "../../assests/images/accounts/addDebitCard.svg";

import "./account.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debitListSelector } from "../../store/selectors/account.selector";
import { setDebits } from "../../store/actions/account.action";
import AddDebitCard from "./add-card";

export default function DebitCard() {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [activeKey, setActiveKey] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const debitList = useSelector(debitListSelector);
  const dispatch = useDispatch();
  const [value, setValue] = useState();

  console.log(debitList);

  return (
    <div className="account-section">
      <Breadcrumb className="bread-crumb-section">
        <Breadcrumb.Item>
          <a onClick={() => navigate("/dashboard")}>Dashboard</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a onClick={() => navigate("/accounts")}>Accounts</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Debit Card</Breadcrumb.Item>
      </Breadcrumb>

      <div
        className="d-flex title-section"
        style={{ marginTop: 0, marginBottom: 0 }}
      >
        <h4 style={{ marginBottom: 10 }}>My Cards</h4>
        {/* <span>Add New Account</span> */}
      </div>

      <div className="account-cards-section">
        <div className="row">
          {debitList?.map((option, idx) => (
            <div key={idx} className="col-3">
              <div style={{ position: "relative" }}>
                <img
                  height={"220"}
                  src={
                    option?.cardType === "D1"
                      ? card1Image
                      : option?.cardType === "D2"
                      ? card2Image
                      : option?.cardType === "D3"
                      ? card3Image
                      : card4Image
                  }
                />
                <p
                  style={{
                    position: "absolute",
                    bottom: "87px",
                    color: "#fff",
                    fontWeight: "500",
                    paddingLeft: 43,
                    fontSize: 15,
                    letterSpacing: 3,
                  }}
                >
                  {option.cardNumber}
                </p>

                <p
                  style={{
                    position: "absolute",
                    bottom: "62px",
                    color: "#fff",
                    fontWeight: "500",
                    fontSize: 11,
                    left: 71,
                  }}
                >
                  {option.expiryDate}
                </p>

                <p
                  style={{
                    position: "absolute",
                    bottom: "29px",
                    color: "#fff",
                    fontWeight: "500",
                    paddingLeft: 44,
                    fontSize: 14,
                    letterSpacing: 2,
                  }}
                >
                  {option.name}
                </p>
              </div>

              <div
                className="debit-switch-options"
                style={{
                  marginTop: "-15px",
                  display: "flex",
                  justifyContent: "end",
                  marginRight: 20,
                }}
              >
                {"Enable / Disable"}{" "}
                <Switch style={{ marginLeft: 10 }} defaultChecked />{" "}
              </div>
            </div>
          ))}
          {debitList?.length < 1 && (
            <div className="col-2">
              <img
                onClick={() => setIsModalVisible(true)}
                style={{ cursor: "pointer" }}
                height={180}
                src={AddNewAccIcon}
              />
            </div>
          )}
        </div>
      </div>

      <h4>Other Actions</h4>

      <div className="row">
        <div className="col-3">
          <div className="menu-card">
            <div className="img-wrapper image-bg-color-1">
              <img height={24} src={statementIcon} />
            </div>
            <div>
              <h5>Statements</h5>
              <p>View and Download Statement </p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="menu-card">
            <div className="img-wrapper image-bg-color-2">
              <img height={24} src={NewCardIcon} />
            </div>
            <div>
              <h5>Change PIN</h5>
              <p>Change the PIN Number </p>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="menu-card">
            <div className="img-wrapper image-bg-color-3">
              <img height={24} src={ReIssueCardIcon} />
            </div>
            <div>
              <h5>Re-Issue Debit Card</h5>
              <p>Upgrade the Debit Card</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="offer-banner-style"
        style={{
          height: 100,
          borderRadius:10
        }}
      >
        <p style={{ lineHeight: 6 }}>Placeholder for offers here</p>
      </div>
      <div style={{ height: 20 }}></div>

      <Modal
        title={"Add Debit Card"}
        visible={isModalVisible}
        footer={null}
        className="digital-token-modal"
        maskClosable={false}
        width={700}
        closable={true}
        centered
        onCancel={() => setIsModalVisible(false)}
      >
        <AddDebitCard
          key={new Date().getTime()}
          setIsModalVisible={() => setIsModalVisible(false)}
        />
      </Modal>
    </div>
  );
}
