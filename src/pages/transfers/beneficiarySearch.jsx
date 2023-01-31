import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Form, Divider, Result, Select, DatePicker } from "antd";

export default function BeneficiarySearch() {
  return (
    <>
      <div className="sub-layout-render-secton">
        <Form name="StatementForm" layout="vertical" requiredMark={false} style={{margin:'15px 0'}}>
          <div className="row">
            <div className="col-3">
              <Form.Item style={{marginBottom:0}} label="" name="accountNumber">
                <Input placeholder="Beneficiary Name" />
              </Form.Item>
            </div>
            <div className="col-3">
              <Form.Item  style={{marginBottom:0}} label="" name="fromDate">
                <Input placeholder="Short Name" />
              </Form.Item>
            </div>
            <div className="col-3">
              <Form.Item style={{marginBottom:0}} label="" name="toDate">
                <Input placeholder="Account Number" />
              </Form.Item>
            </div>

            <div className="col-3">
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
