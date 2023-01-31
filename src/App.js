import React, { useCallback, useState, useEffect } from "react";
import "./index.css";
import "./App.css";
import Router from "./app.route";
import { getErrorMessageSelector } from "./store/selectors/error.selector";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "antd";
import { setErrorMessage } from "./store/actions/error.action";

export default function App() {
  const dispatch = useDispatch();
  const errors = useSelector(getErrorMessageSelector);
  const [error, setError] = useState({});
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  useEffect(() => {
    showErrors();
  }, [errors]);

  const showErrors = useCallback(() => {
    try {
      if (errors) {
        if ((errors.status === 400 || errors.status === 0) && !errors?.data) {
          setError({
            code: "Error",
            message: "Error occurred, Please contact to bank",
            errors: null,
          });
        } else {
          setError(errors?.data);
        }
        setIsErrorModalVisible(true);
      }
    } catch (err) {}
  }, [errors]);

  return (
    <>
      <Router />

      <Modal
        title={error?.code || "Error"}
        visible={isErrorModalVisible}
        footer={null}
        width={350}
        closable={false}
        maskClosable={false}
        mask={false}
      >
        <p style={{ marginBottom: 30, fontSize: 15 }}>
          {error?.message || "Error occurred, Please contact to bank"}
        </p>
        <div align="center">
          <Button
            onClick={() => {
              setIsErrorModalVisible(false);
              dispatch(setErrorMessage(null));
            }}
            type="primary"
          >
            {" "}
            CLose
          </Button>
        </div>
      </Modal>
    </>
  );
}
