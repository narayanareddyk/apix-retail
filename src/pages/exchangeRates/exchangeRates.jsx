import React, { useEffect, useState, useCallback } from "react";
import { Table } from "antd";

import CommonService from "../../services/common.service";

const crossCurRateList = [
  { symbol: "EUR-USD", buyRate: "0.9819", saleRate: "1.0104" },
  { symbol: "EUR-ZMW", buyRate: "15.2336", saleRate: "15.5336" },
  { symbol: "GBP-USD", buyRate: "1.1233", saleRate: "1.1876" },
  { symbol: "GBP-ZMW", buyRate: "17.6359", saleRate: "17.9859" },
  { symbol: "INR-ZMW", buyRate: "0.1928", saleRate: "0.1967" },
  { symbol: "USD-INR", buyRate: "78.573", saleRate: "80.828" },
  { symbol: "USD-ZAR", buyRate: "16.8939", saleRate: "17.6988" },
  { symbol: "USD-ZMW", buyRate: "15.236", saleRate: "15.5329" },
  { symbol: "ZAR-ZMW", buyRate: "0.8889", saleRate: "0.9067" },
];
export default function ExhangeRates() {
  const [sellCurrencyValues, setSellCurrencyValues] = useState([]);

  const columns = [
    {
      title: "Conversion Type",
      dataIndex: "symbol",
    },
    {
      title: "Buy Price",
      dataIndex: "buyRate",
    },

    {
      title: "Sell Price",
      dataIndex: "saleRate",
    },
  ];

  useEffect(() => {
    getCurrencyExchanges();
  }, []);

  const getCurrencyExchanges = useCallback(async () => {
    try {
      const response = await CommonService.getallExchangeRates();
      if (response.status === 200) {
        setSellCurrencyValues(response.data["crossCurRateList"]);
      }
    } catch (err) {}
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-8">
          <div
            className="sub-layout-render-secton"
            style={{ paddingTop: 5, background: "#fff" }}
          >
            <Table
              rowKey={"symbol"}
              pagination={false}
              columns={columns}
              dataSource={sellCurrencyValues}
            />
          </div>
        </div>
        <div className="col-4">
          <div
            className="offer-banner-style"
            style={{
              height: 450,
              borderRadius: 10,
            }}
          >
            <p style={{ lineHeight: 25 }}>Placeholder for offers here</p>
          </div>
        </div>
      </div>

      <div
        className="offer-banner-style"
        style={{
          height: 100,
          borderRadius: 10,
          marginTop:30
        }}
      >
        <p style={{ lineHeight: 6 }}>Placeholder for offers here</p>
      </div>
    </>
  );
}
