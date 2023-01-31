import React, { useEffect } from "react";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { Modal } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentAccountDetails } from "../../store/actions/account.action";

export default function AccountCard({
  account = {},
  accIndex = 1,
  source = "",
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selected, setSelected] = useState({});

  function fetchClass() {
    switch (Math.ceil(accIndex % 2)) {
      case 1:
        return "account-card card-1";
      case 2:
        return "account-card card-2";
      case 3:
        return "account-card card-3";
      case 4:
        return "account-card card-1";

      default:
        return "account-card card-2";
    }
  }

  return (
    <>
      <div className={fetchClass()}>
        <div>
          <p>{account["accDesc"]}</p>
          <span style={{ fontSize: 24, fontWeight: 600 }}>
            <span style={{ marginRight: 5 }}>{account["currency"]} </span>
            <NumberFormat
              value={account["avlBal"]}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
              allowedDecimalSeparators={true}
              decimalSeparator={"."}
              fixedDecimalScale={true}
              prefix={""}
            />
          </span>
          <p>{account["accountNo"]}</p>
        </div>
        <div className="account-card-action">
          {source === "ACCOUNT" && (
            <span
              onClick={() => {
                dispatch(setCurrentAccountDetails(account));
                navigate("/accounts/statements");
              }}
            >
              View Satement
            </span>
          )}

          <span onClick={() => setIsModalVisible(true)}>
            View Details <BsArrowRight style={{ marginLeft: 10 }} />{" "}
          </span>
        </div>
      </div>

      <Modal
        title={`Account No: ${account["accountNo"]}`}
        visible={isModalVisible}
        footer={null}
        centered
        maskClosable={false}
        width={500}
        onCancel={() => setIsModalVisible(false)}
      >
        <div className="row model-account-details">
          <div className="col-6">
            <label>Account Type</label>
            <span>{account["accountTypeDesc"] || "-"}</span>
          </div>
          <div className="col-6">
            <label>Account Nick Name</label>
            <span>{account["accountNickName"] || "-"}</span>
          </div>
          <div className="col-6">
            <label>Account Holder Name</label>
            <span>{account["customerName"] || "-"}</span>
          </div>
          <div className="col-6">
            <label>Customer Id</label>
            <span>{account["custNo"] || "-"}</span>
          </div>

          <div className="col-6">
            <label>Branch</label>
            <span>
              {" "}
              {account["brnCode"]} - {account["brnName"]}
            </span>
          </div>
          <div className="col-6">
            <label>Swift Code</label>
            <span>{account["swiftCode"] || "-"}</span>
          </div>
          <div className="col-6">
            <label>Sort Code</label>
            <span>{account["sortCode"] || "-"}</span>
          </div>
          <div className="col-6">
            <label>Available Balance</label>
            <span className="d-flex">
              <span style={{ marginRight: 5 }}>{account["currency"]} </span>
              <NumberFormat
                value={account["avlBal"]}
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={2}
                allowedDecimalSeparators={true}
                decimalSeparator={"."}
                fixedDecimalScale={true}
                prefix={""}
              />
            </span>
          </div>

          <div className="col-6">
            <label>Current Balance</label>
            <span className="d-flex">
              <span style={{ marginRight: 5 }}>{account["currency"]} </span>
              <NumberFormat
                value={account["currBal"]}
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={2}
                allowedDecimalSeparators={true}
                decimalSeparator={"."}
                fixedDecimalScale={true}
                prefix={""}
              />
            </span>
          </div>

          <div className="col-6">
            <label>Account Open Date</label>
            <span>{account["accountOpeningDate"]}</span>
          </div>

          <div className="col-12">
            <label>Account Description</label>
            <span>{account["accClassDesc"]}</span>
          </div>

          {/* <div className="col-6">
            <label>Account Status</label>
            <span style={{ color: "#15B873" }}>
              {account["status"] === "O" ? "Active" : "Inactive"}
            </span>
          </div> */}
        </div>
      </Modal>
    </>
  );
}
