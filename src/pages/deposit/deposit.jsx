import React, { useEffect, useCallback, useState } from "react";

import { Tabs, Table, Button } from "antd";
import bannerIcon from "../../assests/images/deposit/chart.svg";
import { useNavigate } from "react-router-dom";
import DepositService from "../../services/deposit.service";
import NumberFormat from "react-number-format";
import Carousel from "react-multi-carousel";
import DepositDetails from "./depositDetails";
import DepositStatements from "./depositStatement";

const { TabPane } = Tabs;

export default function Deposit() {
  const navigate = useNavigate();
  const [depositList, setDepositList] = useState([]);
  const [depositDetails, setDepositDetails] = useState({});
  const [depositStatementDetails, setDepositStatementDetails] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = useCallback(async () => {
    try {
      const response = await DepositService.getAll();
      if (response.status === 200) {
        setDepositList(response.data["accountSummaryDetails"]);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getDepositAccountDetails = useCallback(async (selected) => {
    try {
      const reqParams = {
        accountNo: selected.accountNo,
        brnCode: selected.brnCode,
        accountId: selected.accountId,
      };
      setDepositDetails({});
      const response = await DepositService.getDepositAccountDetails(reqParams);
      if (response.status === 200) {
        setDepositDetails(response.data);
      }
    } catch (err) {}
  }, []);

  const getDepositAccountStatementDetails = useCallback(async (selected) => {
    try {
      const reqParams = {
        srcAccount: selected.accountNo,
        brnCode: selected.brnCode,
        accountId: selected.accountId,
      };
      setDepositStatementDetails([]);
      const response = await DepositService.getDepositAccountStatement(
        reqParams
      );
      if (response.status === 200) {
        setDepositStatementDetails(response.data["depositEntriesList"]);
      }
    } catch (err) {}
  }, []);

  return (
    <>
      {depositList.length === 0 && (
        <div className="sub-layout-render-secton">
          <h4>Term Deposit</h4>
          <div className="row">
            <div className="col-9">
              <p>
                Looking for a safe investment option that also provide
                attractive returns? Then Indo Zamibia Bank Term deposit is an
                ideal investment choice for you. invest and watch your fund
                growth safely and steady.
              </p>
              <Button
                onClick={() => navigate("/deposit/term-deposit-create")}
                size="large"
                type="primary"
                style={{ marginTop: 20 }}
              >
                Create Term Deposit
              </Button>
            </div>
            <div className="col-3">
              <img
                style={{
                  display: "block",
                  margin: "0 auto",
                  marginTop: "-40px",
                }}
                src={bannerIcon}
              />
            </div>
          </div>
        </div>
      )}

      {depositList.length > 0 && (
        <>
          <div
            className="d-flex title-section"
            style={{ marginTop: 0, marginBottom: 10 }}
          >
            <h4 style={{ marginBottom: 10 }}>My Deposits</h4>
            <span onClick={()=>navigate("/deposit/term-deposit-create")}>Create Term Deposit</span>
          </div>

          <div className="deposit-account-cards-section">
            <Carousel
              draggable={false}
              arrows={true}
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
              showDots={false}
            >
              {depositList.map((option, idx) => (
                <div key={idx} className="deposit-account-card">
                  <div>
                    <p>{option["accountTypeDesc"]}</p>
                    <span style={{ fontSize: 24, fontWeight: 600 }}>
                      <span style={{ marginRight: 5 }}>
                        {option["currency"]}{" "}
                      </span>
                      <NumberFormat
                        value={option["avlBal"]}
                        displayType={"text"}
                        thousandSeparator={true}
                        decimalScale={2}
                        allowedDecimalSeparators={true}
                        decimalSeparator={"."}
                        fixedDecimalScale={true}
                        prefix={""}
                      />
                    </span>
                    <p>{option["accountNo"]}</p>
                  </div>
                  <div className="deposit-account-card-action">
                    <span
                      onClick={async () => {
                        await getDepositAccountDetails(option);
                        await getDepositAccountStatementDetails(option);
                      }}
                    >
                      View Details
                    </span>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </>
      )}
      {Object.keys(depositDetails).length > 0 && (
        <Tabs>
          <TabPane tab="View Details" key="1">
            <DepositDetails details={depositDetails} />
          </TabPane>
          <TabPane tab="Statements" key="2">
            <DepositStatements statementList={depositStatementDetails} />
          </TabPane>
        </Tabs>
      )}
    </>
  );
}
