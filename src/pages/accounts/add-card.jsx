import React from "react";
import { useState, useCallback } from "react";
import card1Image from "../../assests/images/accounts/card1.svg";
import card1BackImage from "../../assests/images/accounts/card1_back.svg";

import card2Image from "../../assests/images/accounts/card2.svg";
import card2BackImage from "../../assests/images/accounts/card2_back.svg";

import card3Image from "../../assests/images/accounts/card3.svg";
import card3BackImage from "../../assests/images/accounts/card3_back.svg";

import card4Image from "../../assests/images/accounts/card4.svg";
import card4BackImage from "../../assests/images/accounts/card4_back.svg";

import { Breadcrumb, Button, Card, Divider, Modal, Radio, Switch } from "antd";
import { setDebits } from "../../store/actions/account.action";
import { useDispatch } from "react-redux";

export default function AddDebitCard(props) {
  const [stage, setStage] = useState(1);
  const [value, setValue] = useState();
  const dispatch = useDispatch();

  const handleSave = useCallback(() => {
    dispatch(
      setDebits([
        {
          cardNumber: "XXXX XXXX XXXX 8698",
          expiryDate: "02 / 27",
          name: "K NARAYANA",
          cardType: value,
        },
      ])
    );
    props.setIsModalVisible(false);
  }, [value]);

  function renderSwitch() {
    switch (stage) {
      case 1:
        return renderForm1();

      case 2:
        return renderForm2();

      default:
        return renderForm1();
    }
  }

  function renderForm1() {
    return (
      <>
        <p>Please choose your favorate Debit Card </p>
        <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
          <div className="row debit-options">
            <div className="col-6">
              <Radio value={"D1"}>
                <div style={{ position: "relative" }}>
                  <img
                    height={"200"}
                    style={{ width: "100%" }}
                    src={card1Image}
                  />
                  <p
                    style={{
                      position: "absolute",
                      bottom: "87px",
                      color: "#fff",
                      fontWeight: "500",
                      paddingLeft: 30,
                      fontSize: 10,
                      letterSpacing: 3,
                    }}
                  >
                    XXXX XXXX XXXX XXXX
                  </p>

                  <p
                    style={{
                      position: "absolute",
                      bottom: "62px",
                      color: "#fff",
                      fontWeight: "500",
                      fontSize: 9,
                      left: 60,
                    }}
                  >
                    XX / XX
                  </p>

                  <p
                    style={{
                      position: "absolute",
                      bottom: "35px",
                      color: "#fff",
                      fontWeight: "500",
                      paddingLeft: 30,
                      fontSize: 11,
                    }}
                  >
                    XXXXXXXXX XXXXX
                  </p>
                </div>
              </Radio>
            </div>

            <div className="col-6">
              <Radio value={"D2"}>
                <div style={{ position: "relative" }}>
                  <img
                    height={"200"}
                    style={{ width: "100%" }}
                    src={card2Image}
                  />

                  <p
                    style={{
                      position: "absolute",
                      bottom: "87px",
                      color: "#fff",
                      fontWeight: "500",
                      paddingLeft: 30,
                      fontSize: 10,
                      letterSpacing: 3,
                    }}
                  >
                    XXXX XXXX XXXX XXXX
                  </p>

                  <p
                    style={{
                      position: "absolute",
                      bottom: "62px",
                      color: "#fff",
                      fontWeight: "500",
                      fontSize: 9,
                      left: 60,
                    }}
                  >
                    XX / XX
                  </p>

                  <p
                    style={{
                      position: "absolute",
                      bottom: "35px",
                      color: "#fff",
                      fontWeight: "500",
                      paddingLeft: 30,
                      fontSize: 11,
                    }}
                  >
                    XXXXXXXXX XXXXX
                  </p>
                </div>
              </Radio>
            </div>

            <div className="col-6">
              <Radio value={"D3"}>
                <div style={{ position: "relative" }}>
                  <img
                    height={"200"}
                    style={{ width: "100%" }}
                    src={card3Image}
                  />

                  <p
                    style={{
                      position: "absolute",
                      bottom: "87px",
                      color: "#fff",
                      fontWeight: "500",
                      paddingLeft: 30,
                      fontSize: 10,
                      letterSpacing: 3,
                    }}
                  >
                    XXXX XXXX XXXX XXXX
                  </p>

                  <p
                    style={{
                      position: "absolute",
                      bottom: "62px",
                      color: "#fff",
                      fontWeight: "500",
                      fontSize: 9,
                      left: 60,
                    }}
                  >
                    XX / XX
                  </p>

                  <p
                    style={{
                      position: "absolute",
                      bottom: "35px",
                      color: "#fff",
                      fontWeight: "500",
                      paddingLeft: 30,
                      fontSize: 11,
                    }}
                  >
                    XXXXXXXXX XXXXX
                  </p>
                </div>
              </Radio>
            </div>

            <div className="col-6">
              <Radio value={"D4"}>
                <div style={{ position: "relative" }}>
                  <img
                    height={"200"}
                    style={{ width: "100%" }}
                    src={card4Image}
                  />

                  <p
                    style={{
                      position: "absolute",
                      bottom: "87px",
                      color: "#fff",
                      fontWeight: "500",
                      paddingLeft: 30,
                      fontSize: 10,
                      letterSpacing: 3,
                    }}
                  >
                    XXXX XXXX XXXX XXXX
                  </p>

                  <p
                    style={{
                      position: "absolute",
                      bottom: "62px",
                      color: "#fff",
                      fontWeight: "500",
                      fontSize: 9,
                      left: 60,
                    }}
                  >
                    XX / XX
                  </p>

                  <p
                    style={{
                      position: "absolute",
                      bottom: "35px",
                      color: "#fff",
                      fontWeight: "500",
                      paddingLeft: 30,
                      fontSize: 11,
                    }}
                  >
                    XXXXXXXXX XXXXX
                  </p>
                </div>
              </Radio>
            </div>
          </div>
          <Divider />
          <div
            className="btn-group"
            style={{ display: "flex", justifyContent: "end" }}
          >
            <Button
              type="primary"
              htmlType="button"
              onClick={() => setStage(2)}
            >
              Submit
            </Button>
          </div>
        </Radio.Group>
      </>
    );
  }

  function renderForm2() {
    return (
      <>
        <p>Please confirm Debit Card </p>

        {value === "D1" && (
          <div className="row">
            <div className="col-6">
              <div style={{ position: "relative" }}>
                <img height={"220"} src={card1Image} />
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
                  5256 1112 0367 8698
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
                  02 / 27
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
                  K NARAYANA
                </p>
              </div>
            </div>
            <div className="col-6">
              <img height={"177"} style={{marginTop:9}} src={card1BackImage} />
            </div>
          </div>
        )}

        {value === "D2" && (
          <div className="row">
            <div className="col-6">
              <div style={{ position: "relative" }}>
                <img height={"220"} src={card2Image} />
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
                  5256 1112 0367 8698
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
                  02 / 27
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
                  K NARAYANA
                </p>
              </div>
            </div>
            <div className="col-6">
              <img height={"177"} style={{marginTop:9}} src={card2BackImage} />
            </div>
          </div>
        )}

        {value === "D3" && (
          <div className="row">
            <div className="col-6">
              <div style={{ position: "relative" }}>
                <img height={"220"} src={card3Image} />
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
                  5256 1112 0367 8698
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
                  02 / 27
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
                  K NARAYANA
                </p>
              </div>
            </div>
            <div className="col-6">
              <img height={"177"} style={{marginTop:9}} src={card3BackImage} />
            </div>
          </div>
        )}

        {value === "D4" && (
          <div className="row">
            <div className="col-6">
              <div style={{ position: "relative" }}>
                <img height={"220"} src={card4Image} />
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
                  5256 1112 0367 8698
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
                  02 / 27
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
                  K NARAYANA
                </p>
              </div>
            </div>
            <div className="col-6">
              <img height={"177"} style={{marginTop:9}} src={card4BackImage} />
            </div>
          </div>
        )}

        <Divider />
        <div
          className="btn-group"
          style={{ display: "flex", justifyContent: "end" }}
        >
          <Button type="primary" htmlType="button" onClick={() => handleSave()}>
            Submit
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div>{renderSwitch()}</div>
    </>
  );
}
