import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Form, Select, Breadcrumb, Checkbox, Steps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import fieldConfig from "../../../config/validations";
import { profileDetailsSelector } from "../../../store/selectors/app.selector";

const identityTypes = [
  { id: 1, name: "Passport" },
  { id: 2, name: "Driving Licence" },
  { id: 3, name: "National Id" },
];

export default function BasicInfo(props) {
  const [form] = Form.useForm();
  const profileDetails = useSelector(profileDetailsSelector);

  useEffect(() => {
    if (Object.keys(profileDetails).length > 0) {
      console.log(profileDetails);
      form.setFieldsValue({
        ...profileDetails,
        maritalStatus: +profileDetails["maritalStatus"],
        idProofType: +profileDetails["idProofType"],
        gender:+profileDetails["gender"],
      });
    }
  }, []);

  return (
    <>
      {Object.keys(profileDetails).length > 0 && (
        <Form
          name="form1"
          layout="vertical"
          requiredMark={true}
          form={form}
          onFinish={(values) => {
            props.setFormValues(values);
          }}
        >
          <div className="row">
            <div className="col-4">
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: false, message: "Required Field" }]}
              >
                <Input readOnly maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item
                label="Middle Name"
                name="middleName"
                rules={[{ required: false, message: "Required Field" }]}
              >
                <Input readOnly maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>
            <div className="col-4">
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: false, message: "Required Field" }]}
              >
                <Input readOnly maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: false, message: "Required Field" }]}
              >
                <Select>
                  {props.masterData["GENDER"] &&
                    props.masterData["GENDER"].map((option, idx) => (
                      <Select.Option key={idx} value={option.id}>
                        {option.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item
                label="Mobile Number"
                name="mobileNo"
                rules={[{ required: false, message: "Required Field" }]}
              >
                <Input readOnly maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item
                label="Email Address"
                name="emailId"
                rules={[{ required: false, message: "Required Field" }]}
              >
                <Input readOnly maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item
                label="Marital Status"
                name="maritalStatus"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Select>
                  {props.masterData["MARITALSTATUS"] &&
                    props.masterData["MARITALSTATUS"].map((option, idx) => (
                      <Select.Option key={idx} value={option.id}>
                        {option.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item
                label="Identity Type"
                name="idProofType"
                rules={[{ required: false, message: "Required Field" }]}
              >
                <Select placeholder="Choose Identity">
                  {identityTypes.map((option, idx) => (
                    <Select.Option key={idx} value={option.id}>
                      {option.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item
                label="Identity Number"
                name="identityNumber"
                rules={[{ required: false, message: "Required Field" }]}
              >
                <Input readOnly maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item
                label="Educational Background"
                name="educationalBack"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Select>
                  {[
                    "Below 10th",
                    "10th",
                    "12th",
                    "Graduate",
                    "Post Graduate Degree or Diploma (Masters)",
                    "Professional (Doctor, CA, CS, Architect etc)",
                    "ITI or Other Diploma course",
                    "PhD or Research",
                  ].map((option, idx) => (
                    <Select.Option key={idx} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item
                label="Mother's Maiden Name"
                name="motherMaidenName"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>

            <div className="col-4">
              <Form.Item
                label="Father Name"
                name="fatherName"
                rules={[{ required: true, message: "Required Field" }]}
              >
                <Input maxLength={fieldConfig.INPUT_MAX_LENGTH} />
              </Form.Item>
            </div>
          </div>

          <div className="btn-group" style={{ justifyContent: "end" }}>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </div>
        </Form>
      )}
    </>
  );
}
