import { Form, Input, Select, Button } from "antd";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { familyInfoSelector } from "../../../../store/selectors/customer.selector";
import { setFamilyInfo } from "../../../../store/actions/customer.action";

export default function FamilyInfo(props) {
  const familyDetails = useSelector(familyInfoSelector);
  const dispatch = useDispatch();

  const postData = useCallback((values) => {
    try {
      dispatch(setFamilyInfo({ ...values }));
      props.onNext();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Form
      initialValues={{ ...familyDetails }}
      onFinish={postData}
      layout="vertical"
    >
      <div className="row">
        <div className="col-2">
          <Form.Item
            name="fatherNamePrefix"
            label="Title"
            rules={[{ required: false, message: "Required Field" }]}
          >
            <Select placeholder="Title">
              {props.masterData["NAMEPREFIX"] &&
                props.masterData["NAMEPREFIX"].map((option, idx) => (
                  <Select.Option key={idx} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>
        <div className="col-3">
          <Form.Item
            name="fatherFirstName"
            label="Father First Name"
            rules={[{ required: false, message: "Required Field" }]}
          >
            <Input size="large" placeholder=" First Name" />
          </Form.Item>
        </div>
        <div className="col-3">
          <Form.Item name="fatherMiddleName" label="Father Middle Name">
            <Input size="large" placeholder=" Middle Name" />
          </Form.Item>
        </div>
        <div className="col-4">
          <Form.Item
            name="fatherLastName"
            label="Father Last Name"
            rules={[{ required: false, message: "Required Field" }]}
          >
            <Input size="large" placeholder=" Last Name" />
          </Form.Item>
        </div>

        <div className="col-2">
          <Form.Item
            name="motherNamePrefix"
            label="Title"
            rules={[{ required: false, message: "Required Field" }]}
          >
            <Select size="large" placeholder="Title">
              {props.masterData["NAMEPREFIX"] &&
                props.masterData["NAMEPREFIX"].map((option, idx) => (
                  <Select.Option key={idx} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>
        <div className="col-3">
          <Form.Item
            name="motherFirstName"
            label="Mother First Name"
            rules={[{ required: false, message: "Required Field" }]}
          >
            <Input size="large" placeholder="First Name" />
          </Form.Item>
        </div>
        <div className="col-3">
          <Form.Item name="motherMiddleName" label="Mother Middle Name">
            <Input size="large" placeholder="Middle Name" />
          </Form.Item>
        </div>
        <div className="col-4">
          <Form.Item
            name="motherLastName"
            label="Mother Last Name"
            rules={[{ required: false, message: "Required Field" }]}
          >
            <Input size="large" placeholder="Last Name" />
          </Form.Item>
        </div>
      </div>

      <h5 style={{ marginBottom: 30, marginTop: 30 }}>
        Spouse Details ( <span style={{ fontWeight: 200 }}>Optional</span> )
      </h5>
      <div className="row">
        <div className="col-2">
          <Form.Item name="spouseNamePrefix" label="Title">
            <Select size="large" placeholder="Title">
              {props.masterData["NAMEPREFIX"] &&
                props.masterData["NAMEPREFIX"].map((option, idx) => (
                  <Select.Option key={idx} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>
        <div className="col-3">
          <Form.Item name="spouseFirstName" label="First Name">
            <Input size="large" placeholder="First Name" />
          </Form.Item>
        </div>
        <div className="col-3">
          <Form.Item name="spouseMiddleName" label="Middle Name">
            <Input size="large" placeholder="Middle Name" />
          </Form.Item>
        </div>
        <div className="col-4">
          <Form.Item name="spouseLastName" label="Last Name">
            <Input size="large" placeholder="Last Name" />
          </Form.Item>
        </div>
      </div>

      <div className="footer-btn-style" style={{ marginTop: 20 }}>
        <Button
          onClick={() => props.onBack()}
          size="large"
          style={{ marginRight: 30 }}
        >
          Back
        </Button>
        <Button htmlType="submit" size="large" type="primary">
          Next
        </Button>

        <Button
          type="link"
          onClick={() => props.onNext()}
          size="large"
          style={{ marginRight: 30 }}
        >
          Skip
        </Button>
      </div>
    </Form>
  );
}
