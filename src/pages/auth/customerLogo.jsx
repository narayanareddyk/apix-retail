import { Button, notification, Upload } from "antd";
import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
export default function CustomerLogo() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

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
        setMessage('');
      getBase64(info.file.originFileObj, async (imageUrl) => {
        const response = await AuthService.updatecompanyimage(
          imageUrl?.split(",")[1]
        );
        if (response.status === 200) {
          setMessage(response.data["message"]);
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
    <div style={{ height: 180 }}>
      <div
        style={{
            display:'flex',
          alignItems: "center",
          justifyContent: "center",
          marginTop:30
        }}
      >
        <Upload
          customRequest={handleAction}
          beforeUpload={beforeUpload}
          onChange={onChange}
          showUploadList={false}
        >
          <Button>Upload Customer Logo</Button>
        </Upload>
      </div>

      <span className="upload-success-message">{message}</span>
    </div>
  );
}
