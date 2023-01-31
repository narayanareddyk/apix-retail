import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Form, Select, Breadcrumb, Checkbox, Steps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import fieldConfig from "../../../config/validations";
import { COUNTRYLIST } from "../../../config/constant";
import { profileDetailsSelector } from "../../../store/selectors/app.selector";

export default function AddressInfo(props) {
  const [addressForm] = Form.useForm();

  const profileDetails = useSelector(profileDetailsSelector);

  useEffect(() => {
    if (Object.keys(profileDetails).length > 0) {
      console.log(profileDetails);
      addressForm.setFieldsValue({
        lcountry: profileDetails["nationality"],
        lState: profileDetails["state"],
        lCity: profileDetails["city"],
        lAddline1: profileDetails["addrLine1"],
        lAddline2: profileDetails["addrLine2"],
        lPincode: profileDetails["pinCode"],
      });
    }
  }, []);

  const onChange = useCallback((e) => {
    if (e.target.checked) {
      addressForm.setFieldsValue({
        cCountry: profileDetails["nationality"],
        cState: profileDetails["state"],
        cCity: profileDetails["city"],
        cAddline1: profileDetails["addrLine1"],
        cAddline2: profileDetails["addrLine2"],
        cPincode: profileDetails["pinCode"],
      });
    } else {
      addressForm.setFieldsValue({
        cCountry: undefined,
        cState: undefined,
        cCity: undefined,
        cAddline1: undefined,
        cAddline2: undefined,
        cPincode: undefined,
      });
    }
  }, []);

  return (
    <Form
      form={addressForm}
      name="form3"
      layout="vertical"
      initialValues={props.formValues}
      requiredMark={true}
      onFinish={(values) => {
        props.setFormValues(values);
      }}
    >
      <div className="row">
        <div className="col-5">
          <h6 className="custom-lbl-style">Permanent Address</h6>
          <Form.Item
            label=""
            name="lcountry"
            rules={[{ required: true, message: "" }]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="Choose Country"
            >
              {COUNTRYLIST.map((option, idx) => (
                <Select.Option key={idx} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label=""
            name="lAddline1"
            rules={[{ required: true, message: "" }]}
          >
            <Input
              placeholder="Address Line 1"
              maxLength={fieldConfig.INPUT_MAX_LENGTH}
            />
          </Form.Item>
          <Form.Item
            label=""
            name="lAddline2"
            rules={[{ required: true, message: "" }]}
          >
            <Input
              placeholder="Address Line 2"
              maxLength={fieldConfig.INPUT_MAX_LENGTH}
            />
          </Form.Item>

          <Form.Item
            label=""
            name="lCity"
            rules={[{ required: true, message: "" }]}
          >
            <Input
              placeholder="City"
              maxLength={fieldConfig.INPUT_MAX_LENGTH}
            />
          </Form.Item>

          <div className="row">
            <div className="col-8">
              <Form.Item
                label=""
                name="lState"
                rules={[{ required: true, message: "" }]}
              >
                <Input
                  placeholder="State"
                  maxLength={fieldConfig.INPUT_MAX_LENGTH}
                />
              </Form.Item>
            </div>
            <div className="col-4">
              <Form.Item
                label=""
                name="lPincode"
                rules={[{ required: true, message: "" }]}
              >
                <Input
                  placeholder="Pincode"
                  maxLength={fieldConfig.INPUT_MAX_LENGTH}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="col-1"></div>

        <div className="col-5">
          <h6 className="custom-lbl-style">Communication Address</h6>
          <div style={{ margin: "10px 0" }}>
            <Checkbox onChange={onChange}>Same As Permanent Address</Checkbox>
          </div>
          <Form.Item
            label=""
            name="cCountry"
            rules={[{ required: true, message: "" }]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="Choose Country"
            >
              {COUNTRYLIST.map((option, idx) => (
                <Select.Option key={idx} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label=""
            name="cAddline1"
            rules={[{ required: true, message: "" }]}
          >
            <Input
              placeholder="Address Line 1"
              maxLength={fieldConfig.INPUT_MAX_LENGTH}
            />
          </Form.Item>
          <Form.Item
            label=""
            name="cAddline2"
            rules={[{ required: true, message: "" }]}
          >
            <Input
              placeholder="Address Line 2"
              maxLength={fieldConfig.INPUT_MAX_LENGTH}
            />
          </Form.Item>

          <Form.Item
            label=""
            name="cCity"
            rules={[{ required: true, message: "" }]}
          >
            <Input
              placeholder="City"
              maxLength={fieldConfig.INPUT_MAX_LENGTH}
            />
          </Form.Item>

          <div className="row">
            <div className="col-8">
              <Form.Item
                label=""
                name="cState"
                rules={[{ required: true, message: "" }]}
              >
                <Input
                  placeholder="State"
                  maxLength={fieldConfig.INPUT_MAX_LENGTH}
                />
              </Form.Item>
            </div>
            <div className="col-4">
              <Form.Item
                label=""
                name="cPincode"
                rules={[{ required: true, message: "" }]}
              >
                <Input
                  placeholder="Pincode"
                  maxLength={fieldConfig.INPUT_MAX_LENGTH}
                />
              </Form.Item>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <Form.Item
            label="Residence Ownership"
            name="residenceOwnership"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Select placeholder="Choose Option">
              {["Self Owned", "Parental Owned", "Rented"].map((option, idx) => (
                <Select.Option key={idx} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="col-6">
          <Form.Item
            label="Staying since (Year's)"
            name="stayingSince"
            rules={[{ required: true, message: "Required Field" }]}
          >
            <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
          </Form.Item>
        </div>
      </div>

      <div className="btn-group">
        <Button
          type="default"
          htmlType="button"
          onClick={() => {
            props.setStage(1);
          }}
        >
          Back
        </Button>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </div>
    </Form>
  );
}
