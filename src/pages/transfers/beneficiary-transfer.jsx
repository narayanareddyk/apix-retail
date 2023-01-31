import { Tabs, Table, Button, Breadcrumb } from "antd";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
import TransferService from "../../services/transfers.service";
import BeneficiarySearch from "./beneficiarySearch";
const { TabPane } = Tabs;

export default function BeneficiaryTransfer() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [beneType, setBeneType] = useState("IAT");
  const [selected, setSelected] = useState({});
  const navigate = useNavigate();

  const columns = [
    {
      title: "Beneficiary Name",
      dataIndex: "beneName",
    },
    {
      title: "Short Name",
      dataIndex: "shortName",
    },

    {
      title: "Account Number",
      dataIndex: "beneAccNo",
    },

    {
      title: "Beneficiary Bank",
      dataIndex: "beneBrn",
    },
    {
      title: "Transfer Limit",
      key: "maxTransferLimit",
      render: (record) => {
        return (
          <span className="d-flex">
            <span style={{ marginRight: 5 }}>{record["beneCurrency"]} </span>
            <NumberFormat
              value={record["maxTransferLimit"]}
              displayType={"text"}
              thousandSeparator={true}
              prefix={""}
              decimalScale={2}
              fixedDecimalScale={true}
              allowedDecimalSeparators={true}
            />
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const fetchBeneficiaries = useCallback(async () => {
    try {
      setLoading(true);
      const response = await TransferService.getAllBeneficiaries();
      if (response.status === 200) {
        const data = [
          ...response.data["internalBeneficiaries"],
          ...response.data["thirdPartyBeneficiaries"],
        ];

        data.forEach((element, index) => {
          element.key = index + 1;
        });
        setDataSource([...data]);

        // setListOfBen(response.data);
        // setInternalBeneList(response.data["internalBeneficiaries"]);
        // setInternationalBeneList(
        //   response.data["thirdPartyBeneficiaries"].filter(
        //     (ele) => ele.beneType === "INTERNATIONAL"
        //   )
        // );
        // setOtherBeneList(
        //   response.data["thirdPartyBeneficiaries"].filter(
        //     (ele) => ele.beneType === "THIRD_PARTY"
        //   )
        // );
        // setRegionalList(
        //   response.data["thirdPartyBeneficiaries"].filter(
        //     (ele) => ele.beneType === "REGION"
        //   )
        // );
      }
      //   setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelected(selectedRows[0]);
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };

  return (
    <>
      <Breadcrumb className="bread-crumb-section">
        <Breadcrumb.Item>
          <a onClick={() => navigate("/dashboard")}>Dashboard</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a onClick={() => navigate("/transfers")}>Transfers</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Beneficiary</Breadcrumb.Item>
      </Breadcrumb>

      <Tabs
        activeKey={beneType}
        onChange={(value) => {
          setBeneType(value);
          setSelected({});
        }}
      >
        <TabPane tab="Internal Beneficiary" key="IAT"></TabPane>
        <TabPane tab="Domestic Beneficiary" key="THIRD_PARTY"></TabPane>
        <TabPane tab="International Beneficiary" key="INTERNATIONAL"></TabPane>
        {/* <TabPane tab="Regional Beneficiary" key="REGION"></TabPane> */}
      </Tabs>

      <BeneficiarySearch />

      <div className="d-flex title-section">
        <h4>Beneficiary List</h4>
        <span
          onClick={() => navigate("/transfers/beneficiary/add-beneficiary")}
        >
          Add Beneficiary
        </span>
      </div>
      <div className="beneficiary-list-section">
        <Table
          pagination={false}
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataSource.filter((ele) => ele.beneType === beneType)}
        />
        {Object.keys(selected).length > 0 && (
          <div align="right" className="btn-align">
            <Button size="large" type="default">
              Delete Beneficiary
            </Button>
            <Button size="large" type="default">
              Modify Beneficiary
            </Button>

            <Button size="large" type="default">
              View Beneficiary
            </Button>
            <Button
              size="large"
              type="primary"
              onClick={() =>
                navigate("/transfers/beneficiary/internal", { state: selected })
              }
            >
              Transfer Money
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
