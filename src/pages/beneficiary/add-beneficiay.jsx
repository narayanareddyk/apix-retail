import { Tabs, Breadcrumb } from "antd";
import React, { useEffect } from "react";
import AddInternalBeneficiary from "./add-internal-bene";
import AddInternationalBeneficiary from "./add-international-bene";
import AddDomesticBeneficiary from "./add-other-bene";
import AddRegionalBeneficiary from "./add-regional-bene";
import { useNavigate } from "react-router-dom";
const { TabPane } = Tabs;

export default function AddBeneficiary() {
  const navigate = useNavigate();

  return (
    <>
      <Breadcrumb className="bread-crumb-section">
        <Breadcrumb.Item>
          <a onClick={() => navigate("/dashboard")}>Dashboard</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a onClick={() => navigate("/transfers")}>Transfers</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a onClick={() => navigate("/transfers/beneficiaries")}>Beneficiary</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add Beneficiary</Breadcrumb.Item>
      </Breadcrumb>

      <Tabs destroyInactiveTabPane={true} defaultActiveKey="INTERNAL">
        <TabPane tab="Internal Beneficiary" key="INTERNAL">
          <div className="row">
            <div className="col-8">
              <AddInternalBeneficiary />
            </div>
          </div>
        </TabPane>
        <TabPane tab="Domestic Beneficiary" key="DOMESTIC">
          <div className="row">
            <div className="col-8">
              <AddDomesticBeneficiary />
            </div>
          </div>
        </TabPane>
        <TabPane tab="International Beneficiary" key="INTERNATIONAL">
          <div className="row">
            <div className="col-10">
              <AddInternationalBeneficiary />
            </div>
          </div>
        </TabPane>
        {/* <TabPane tab="Regional Beneficiary" key="REGIONAL">
          <div className="row">
            <div className="col-8">
              <AddRegionalBeneficiary />
            </div>
          </div>
        </TabPane> */}
      </Tabs>
    </>
  );
}
