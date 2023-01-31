import { Image, Upload, notification } from "antd";
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  profileDetailsSelector,
  profileImageSelector,
} from "../../store/selectors/app.selector";
import profileIcon from "../../assests/images/top-banner/profile.svg";
import EditIcon from "../../assests/images/top-banner/editIcon.svg";
import { setProfileImage } from "../../store/actions/app.action";
import AuthService from "../../services/auth.service";

export default function ProfileDetails() {
  const profileDetails = useSelector(profileDetailsSelector);
  const profileImage = useSelector(profileImageSelector);

  const dispatch = useDispatch();

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      notification.error({
        message: "Error",
        description: "You can only upload JPG/PNG file!",
        placement: "bottomLeft",
      });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      // NotificationService.showErrorMessage("Image must smaller than 2MB!");
      notification.error({
        message: "Error",
        description: "Image must smaller than 2MB!",
        placement: "bottomLeft",
      });
    }
    return isJpgOrPng && isLt2M;
  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const onChange = useCallback((info) => {
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, async (imageUrl) => {
        const response = await AuthService.updateUserProfileImage(
          imageUrl?.split(",")[1]
        );
        if (response.status === 200) {
        }
      });
    }
  });

  const handleAction = useCallback(({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  });

  return (
    <div className="profile-details-section">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-3">
              <div className="profile-image">
                <img
                  height={180}
                  width={180}
                  src={`data:image/png;base64, ${profileImage}`}
                  style={{ margin: "0 auto", display: "block" }}
                />
                <Upload
                  customRequest={handleAction}
                  beforeUpload={beforeUpload}
                  onChange={onChange}
                  showUploadList={false}
                  className="edit-icon"
                >
                  <img src={EditIcon} />
                </Upload>
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                <div className="col-12">
                  <span
                    style={{
                      fontSize: 25,
                      paddingBottom: 20,
                      display: "block",
                      marginTop: 20,
                    }}
                  >
                    {" "}
                    {profileDetails?.firstName} {profileDetails?.lastName}
                  </span>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-2">
                      <label>Home Branch</label>
                    </div>
                    <div className="col-10">
                      <span>{profileDetails["branchName"]}</span>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-2">
                      {" "}
                      <label> Branch Code</label>
                    </div>
                    <div className="col-6">
                      {" "}
                      <span>{profileDetails["branchCode"]}</span>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-2">
                      <label> Date Of Birth</label>
                    </div>
                    <div className="col-6">
                      <span>{profileDetails["customerDob"]}</span>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="row">
                    <div className="col-2">
                      {" "}
                      <label> Mobile Number</label>
                    </div>
                    <div className="col-6">
                      {" "}
                      <span>{profileDetails["mobileNo"]}</span>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="row">
                    <div className="col-2">
                      <label> Email Address</label>
                    </div>
                    <div className="col-6">
                      {" "}
                      <span>{profileDetails["emailId"]}</span>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="row">
                    <div className="col-2">
                      {" "}
                      <label> Address</label>
                    </div>
                    <div className="col-8">
                      <span>
                        {profileDetails["addrLine1"]},{" "}
                        {profileDetails["addrLine2"]}, {profileDetails["city"]},
                        {profileDetails["district"]},{profileDetails["state"]} -{" "}
                        {profileDetails["pinCode"]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
