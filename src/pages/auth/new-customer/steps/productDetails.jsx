import { Button, Descriptions, Divider, message, Tabs } from "antd";
import React, { useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import signatureIcon from "../../../../assests/images/new-customer/Signature.png";
const { TabPane } = Tabs;
export default function ProductFeatures(props) {
  const navigate = useNavigate();

  return (
    <div className="row">
      <div className="col-12">
        <h3 style={{ textAlign: "left" }}>
          Neo Bank Zero Balance Account Features
        </h3>

        <ul style={{ fontSize: 16 }}>
          <li>
            <b>Minimum Balance:</b> As it is a zero-balance account, there are
            no charges on non - maintenance of minimum balance. Spend your
            balance to the last cent without any worry.
          </li>
          <li>
            <b>Virtual Debit Card:</b> Get a Virtual Debit Card instantly for
            online shopping and digital payments.
          </li>
          <li>
            <b>Transfer Money:</b> Transfer money online for free and with ease
            from your Neo Bank zero balance account
          </li>
          <li>
            <b>New Age Banking:</b> 180+ features that let you carry out your
            banking transactions, pay bills, invest, shop, and do much more with
            just a few taps. The app is secure with{" "}
            <b style={{ color: "red" }}>two-factor authentication</b> and has an
            easy interface
          </li>

          <li>
            <b>Do Your eKyc Online:</b> Complete your verification through Video
            KYC and open a zero balance account without any restrictions
          </li>
        </ul>

        <Descriptions
          title=""
          bordered
          column={{
            xl: 1,
            lg: 1,
            md: 1,
            sm: 1,
            xs: 1,
          }}
        >
          <Descriptions.Item label="Minimum Balance">
            INR 0.00
          </Descriptions.Item>
          <Descriptions.Item label="Debit Card">Free</Descriptions.Item>
          <Descriptions.Item label="Chequebook**">Chargeable</Descriptions.Item>
          <Descriptions.Item label="Home Banking">
            Not Available
          </Descriptions.Item>
          <Descriptions.Item label="ATM withdrawals">
            5 Free monthly (Neo Bank ATM & Other Domestic Bank ATMs each)
          </Descriptions.Item>
          <Descriptions.Item label="Branch Transactions">
            1 free transaction of upto INR 5000 per month (for both cash deposit
            & withdrawal** separately)
          </Descriptions.Item>
          <Descriptions.Item label="Fund Transfer">
            Free 10 Monthly domestic transfers and 5 International Transfers
          </Descriptions.Item>
          <Descriptions.Item label="Bill Payments">
            Make unlimited bill payments through our Neo Bank Mobile Banking App
          </Descriptions.Item>
        </Descriptions>

        {/* <Tabs defaultActiveKey="1">
          <TabPane tab="Features" key="1">
            
          </TabPane>
          <TabPane tab="Benefits" key="2">
            
          </TabPane>
        </Tabs> */}

        {/* <div style={{ marginTop: 20, fontSize: 16, marginBottom: 20 }}>
          Click here to apply for other{" "}
          <NavLink to={"/login"}> Prodcuts</NavLink> or{" "}
          <NavLink to={"/login"}>Login</NavLink> to intenet banking
        </div> */}

        <div
          className="footer-btn-style"
          style={{
            justifyContent: "center",
            display: "flex",
            marginBottom: 40,
          }}
        >
          <Button
            htmlType="button"
            size="large"
            type="primary"
            onClick={() => navigate("/login")}
          >
            LoGIN to intenet banking
          </Button>
        </div>
      </div>
    </div>
  );
}
