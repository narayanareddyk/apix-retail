import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import addIcon from "../../assests/images/common/add.svg";
import ElectricityIcon from "../../assests/images/payments/ele.svg";
import SubscriptionIcon from "../../assests/images/payments/subscribe.svg";
import cashInIcon from "../../assests/images/payments/cashIn.svg";
import BroadbandIcon from "../../assests/images/payments/broadband.svg";
import CardIcon from "../../assests/images/payments/card.svg";
import DTHIcon from "../../assests/images/payments/dth.svg";
import GasIcon from "../../assests/images/payments/gas.svg";
import HosptalIcon from "../../assests/images/payments/hospital.svg";
import HouseIcon from "../../assests/images/payments/house.svg";
import InsuranceIcon from "../../assests/images/payments/insurance.svg";
import MobileIcon from "../../assests/images/payments/mobile.svg";
import SchoolIcon from "../../assests/images/payments/school.svg";
import WaterIcon from "../../assests/images/payments/water.svg";
import Carousel from "react-multi-carousel";
import {
  accountListSelector,
  debitListSelector,
} from "../../store/selectors/account.selector";
import { useSelector } from "react-redux";
import AccountCard from "../components/account-card";
import NumberFormat from "react-number-format";
import { Radio } from "antd";
import card1Image from "../../assests/images/accounts/card1.svg";
import card2Image from "../../assests/images/accounts/card2.svg";

export default function Payments() {
  const navigate = useNavigate();
  const [value, setValue] = useState("A");
  const accountList = useSelector(accountListSelector);
  const debitList = useSelector(debitListSelector);

  console.log(accountList);

  return (
    <div className="payment-section" style={{ marginTop: 30 }}>
      <div className="row">
        <div className="col-8">
          <div className="row">
            <div className="col-4">
              <div className="menu-card">
                <div className="img-wrapper image-bg-color-2">
                  <img height={22} src={ElectricityIcon} />
                </div>
                <div>
                  <h5>Electricity</h5>
                  <p>Description here</p>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="menu-card">
                <div className="img-wrapper image-bg-color-3">
                  <img height={22} src={cashInIcon} />
                </div>
                <div>
                  <h5>CashIn / CashOut</h5>
                  <p>Description here</p>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="menu-card">
                <div className="img-wrapper image-bg-color-4">
                  <img height={22} src={BroadbandIcon} />
                </div>
                <div>
                  <h5>Broadband</h5>
                  <p>Description here</p>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div
                className="menu-card"
                onClick={() => navigate("/payments/mobile")}
              >
                <div className="img-wrapper image-bg-color-1">
                  <img height={22} src={MobileIcon} />
                </div>
                <div>
                  <h5>Mobile</h5>
                  <p>Description here</p>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="menu-card">
                <div className="img-wrapper image-bg-color-2">
                  <img height={22} src={DTHIcon} />
                </div>
                <div>
                  <h5>DTH / Cable TV</h5>
                  <p>Description here</p>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="menu-card">
                <div className="img-wrapper image-bg-color-3">
                  <img height={22} src={WaterIcon} />
                </div>
                <div>
                  <h5>Water Bill</h5>
                  <p>Description here</p>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="menu-card">
                <div className="img-wrapper image-bg-color-2">
                  <img height={22} src={SchoolIcon} />
                </div>
                <div>
                  <h5>School Payment</h5>
                  <p>Description here</p>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="menu-card">
                <div className="img-wrapper image-bg-color-3">
                  <img height={22} src={InsuranceIcon} />
                </div>
                <div>
                  <h5>Insurance</h5>
                  <p>Description here</p>
                </div>
              </div>
            </div>

            {/* <div className="col-3">
          <div className="menu-card">
            <div className="img-wrapper image-bg-color-1">
              <img height={22} src={SubscriptionIcon} />
            </div>
            <div>
              <h5>Subscription</h5>
              <p>Description here</p>
            </div>
          </div>
        </div> */}

            <div className="col-4">
              <div className="menu-card">
                <div className="img-wrapper image-bg-color-1">
                  <img height={22} src={GasIcon} />
                </div>
                <div>
                  <h5>LPG Gas Cylinder</h5>
                  <p>Description here</p>
                </div>
              </div>
            </div>

            {/* <div className="col-3">
          <div className="menu-card">
            <div className="img-wrapper image-bg-color-2">
              <img height={22} src={HouseIcon} />
            </div>
            <div>
              <h5>Housing Society</h5>
              <p>Description here</p>
            </div>
          </div>
        </div> */}

            {/* <div className="col-3">
          <div className="menu-card">
            <div className="img-wrapper image-bg-color-2">
              <img height={22} src={HosptalIcon} />
            </div>
            <div>
              <h5>Hospital</h5>
              <p>Description here</p>
            </div>
          </div>
        </div> */}

            <div className="col-4">
              <div className="menu-card">
                <div className="img-wrapper image-bg-color-4">
                  <img height={22} src={CardIcon} />
                </div>
                <div>
                  <h5>Credit Card</h5>
                  <p>Description here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="account-selection">
        <div style={{ margin: "20px 0" }}>
          <div className="custom-lbl-style" style={{ marginBottom: 15 }}>
            Please choose Payment mode option
          </div>
          <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
            <Radio value={"A"}>Account</Radio>
            <Radio value={"D"}>Debit Card</Radio>
          </Radio.Group>
        </div>

        {value === "A" && (
          <div style={{ width: "100%", position: "relative" }}>
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
                  items: 1,
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0,
                  },
                  items: 1,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 1,
                },
              }}
              showDots={true}
            >
              {accountList?.map((account, idx) => (
                <div key={idx} className={"account-card card-1"}>
                  <div>
                    <p>{account["accDesc"]}</p>
                    <span style={{ fontSize: 24, fontWeight: 600 }}>
                      <span style={{ marginRight: 5 }}>
                        {account["currency"]}{" "}
                      </span>
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
                </div>
              ))}
            </Carousel>
          </div>
        )}

        {value === "D" && (
          <div style={{ width: "100%", position: "relative" }}>
            {debitList?.map((option, idx) => (
              <div key={idx} style={{ position: "relative" }}>
                <img
                  height={"210"}
                  src={option?.cardType === "D1" ? card1Image : card2Image}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
