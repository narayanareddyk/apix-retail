import React, { useEffect } from "react";
import { Tabs } from "antd";
import ProfileDetails from "./profileDetails";
import ChangePassword from "./changePassword";
import './profile.css'
const { TabPane } = Tabs;
export default function ProfileSetting() {
  return (
    <>
      <div className="sub-layout-render-secton">
        <Tabs destroyInactiveTabPane={true} defaultActiveKey="INTERNAL">
          <TabPane tab="Profile" key="PROFILE">
            <ProfileDetails />
          </TabPane>
          <TabPane tab="Change Password" key="CHANGE_PASSWORD">
            <ChangePassword />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}
