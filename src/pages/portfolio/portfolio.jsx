import { Collapse, Empty } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import "./portfolio.css";
import PortfolioService from "../../services/portfolio.service";
import BannerImage from "../../assests/images/common/offerBanner2_3.png";

export default function Portfolio() {
  const [portfolioDetails, sePortfolioDetails] = useState({
    accounts: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPortfolioDetails();
  }, []);

  const getPortfolioDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await PortfolioService.getPortfolioDetails();
      if (response.status === 200) {
        setLoading(false);
        sePortfolioDetails(response.data[0]);
      }
    } catch (err) {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-11">
          {Object.keys(portfolioDetails).length > 0 && !loading && (
            <div className="row">
              <div className="col-5">
                <div
                  className="d-flex title-section"
                  style={{ marginBottom: 8 }}
                >
                  <h6>
                    {" "}
                    <b>Assets</b>{" "}
                  </h6>
                  <span className="d-flex">
                    <span style={{ marginRight: 5 }}>
                      {portfolioDetails["currency"]}{" "}
                    </span>
                    <NumberFormat
                      value={portfolioDetails["assets"]}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      allowedDecimalSeparators={true}
                    />
                  </span>
                </div>
                <div className="portfolio-account-card">
                  <Collapse
                    expandIconPosition="right"
                    defaultActiveKey={["S"]}
                    ghost
                  >
                    <Collapse.Panel header="Saving Account" key="S">
                      {portfolioDetails["accounts"].filter(
                        (ele) => ele.accType === "S"
                      ).length === 0 && (
                        <>
                          <Empty />
                        </>
                      )}

                      {portfolioDetails["accounts"]
                        .filter((ele) => ele.accType === "S")
                        .map((account, idx) => (
                          <div key={idx} className="p-card">
                            <p>{account.accNo}</p>
                            <div>
                              {" "}
                              <span style={{ marginRight: 5 }}>
                                {account["accCurrecny"]}
                              </span>
                              <NumberFormat
                                value={account["balance"]}
                                displayType={"text"}
                                thousandSeparator={true}
                                decimalScale={2}
                                allowedDecimalSeparators={true}
                                prefix={""}
                                fixedDecimalScale={true}
                              />
                            </div>
                          </div>
                        ))}
                    </Collapse.Panel>
                  </Collapse>
                </div>

                <div className="portfolio-account-card">
                  <Collapse expandIconPosition="right" ghost>
                    <Collapse.Panel header="Current Account" key="U">
                      {portfolioDetails["accounts"].filter(
                        (ele) => ele.accType === "U"
                      ).length === 0 && (
                        <>
                          <Empty />
                        </>
                      )}

                      {portfolioDetails["accounts"]
                        .filter((ele) => ele.accType === "U")
                        .map((account, idx) => (
                          <div key={idx} className="p-card">
                            <p>{account.accNo}</p>
                            <div>
                              {" "}
                              <span style={{ marginRight: 5 }}>
                                {account["accCurrecny"]}
                              </span>
                              <NumberFormat
                                value={account["balance"]}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={""}
                                decimalScale={2}
                                allowedDecimalSeparators={true}
                                fixedDecimalScale={true}
                              />
                            </div>
                          </div>
                        ))}
                    </Collapse.Panel>
                  </Collapse>
                </div>

                <div className="portfolio-account-card">
                  <Collapse expandIconPosition="right" ghost>
                    <Collapse.Panel header="Term Deposit Account" key="D">
                      {portfolioDetails["accounts"].filter(
                        (ele) => ele.accType === "D"
                      ).length === 0 && (
                        <>
                          <Empty />
                        </>
                      )}
                      {portfolioDetails["accounts"]
                        .filter((ele) => ele.accType === "D")
                        .map((account, idx) => (
                          <div key={idx} className="p-card">
                            <p>{account.accNo}</p>
                            <div>
                              {" "}
                              <span style={{ marginRight: 5 }}>
                                {account["accCurrecny"]}
                              </span>
                              <NumberFormat
                                value={account["balance"]}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={""}
                                decimalScale={2}
                                allowedDecimalSeparators={true}
                                fixedDecimalScale={true}
                              />
                            </div>
                          </div>
                        ))}
                    </Collapse.Panel>
                  </Collapse>
                </div>

                <div></div>
              </div>
              <div className="col-1"></div>
              <div className="col-5">
                <div
                  className="d-flex title-section"
                  style={{ marginBottom: 8 }}
                >
                  <h6>
                    {" "}
                    <b>Liabilities</b>{" "}
                  </h6>
                  <span className="d-flex">
                    <span style={{ marginRight: 5 }}>
                      {portfolioDetails["currency"]}{" "}
                    </span>
                    <NumberFormat
                      value={portfolioDetails["liability"]}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      allowedDecimalSeparators={true}
                    />
                  </span>
                </div>
                <div className="portfolio-account-card libiality-card">
                  <Collapse
                    expandIconPosition="right"
                    defaultActiveKey={["L"]}
                    ghost
                  >
                    <Collapse.Panel header="Loan Account" key="L">
                      {portfolioDetails["accounts"].filter(
                        (ele) => ele.accType === "L"
                      ).length === 0 && (
                        <>
                          <Empty />
                        </>
                      )}
                      {portfolioDetails["accounts"]
                        ?.filter((ele) => ele.accType === "L")
                        ?.map((account, idx) => (
                          <div key={idx} className="p-card">
                            <p>{account.accNo}</p>
                            <div>
                              {" "}
                              <span style={{ marginRight: 5 }}>
                                {account["accCurrecny"]}
                              </span>
                              <NumberFormat
                                value={account["balance"]}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={""}
                                decimalScale={2}
                                allowedDecimalSeparators={true}
                                fixedDecimalScale={true}
                              />
                            </div>
                          </div>
                        ))}
                    </Collapse.Panel>
                  </Collapse>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {!loading && (
        <div
          className="offer-banner-style"
          style={{
            height: 100,
            marginTop:20,
            borderRadius:10
          }}
        >
          <p style={{ lineHeight: 6 }}>Placeholder for offers here</p>
        </div>
      )}
      <div style={{ height: 20 }}></div>
    </>
  );
}
