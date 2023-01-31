import { Checkbox, DatePicker, Form, Input, Select, Button } from "antd";
import React, { useCallback } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setBasicInfo } from "../../../../store/actions/customer.action";
import {
  basicInfoSelector,
  identityInfoSelector,
} from "../../../../store/selectors/customer.selector";
import { COUNTRYLIST } from "../../../../config/constant";
import NewCustomerService from "../../../../services/new-customer.service";
import { useState } from "react";

export default function BasicInfo(props) {
  const basicDetails = useSelector(basicInfoSelector);
  const identityInfo = useSelector(identityInfoSelector);
  const [loader,setLoader] = useState(false)

  const dispatch = useDispatch();

  const postData = useCallback(async (values) => {
    try {
      dispatch(setBasicInfo({ ...values }));
      const reqParams = {
        lastName: values.lastName,
        firstName: values.firstName,
        middleName: values.middleName,
        identityNumber: identityInfo["identityNumber"],
        customerIdentifier: identityInfo["name"],
      };
      setLoader(true)

      const response = await NewCustomerService.validateIdcheck(reqParams);
      if (response.status === 200) {
        setLoader(false)
        props.onNext();
      }
    } catch (err) {
      setLoader(false)
      console.log(err);
    }
  }, []);

  return (
    <Form
      initialValues={{
        ...basicDetails,
        dateOfBirth: basicDetails["dateOfBirth"]
          ? moment(new Date(basicDetails["dateOfBirth"]), "YYYY-MM-DD")
          : null,
      }}
      onFinish={postData}
      layout="vertical"
    >
      <div className="row">
        <div className="col-2">
          <Form.Item
            name="namePrefix"
            label="Title"
            rules={[{ required: true, message: "required" }]}
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
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "required" }]}
          >
            <Input size="large" placeholder="First Name" />
          </Form.Item>
        </div>
        <div className="col-3">
          <Form.Item name="middleName" label="Middle Name">
            <Input size="large" placeholder="Middle Name" />
          </Form.Item>
        </div>
        <div className="col-4">
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "required" }]}
          >
            <Input size="large" placeholder="Last Name" />
          </Form.Item>
        </div>
        <div className="col-4">
          <Form.Item
            name="dateOfBirth"
            label="Date Of Birth"
            rules={[{ required: true, message: "required" }]}
          >
            <DatePicker
              size="large"
              style={{ width: "100%" }}
              placeholder="DD/MM/YYYY"
              format={"DD/MM/YYYY"}
            />
          </Form.Item>
        </div>
        <div className="col-4">
          <Form.Item
            name="placeOfBirth"
            label="Place Of Birth"
            rules={[{ required: true, message: "required" }]}
          >
            <Input size="large" placeholder="Place Of Birth" />
          </Form.Item>
        </div>
        <div className="col-4">
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "required" }]}
          >
            <Select size="large" placeholder="Choose Option">
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
            name="maritalStatus"
            label="Marital Status"
            rules={[{ required: true, message: "required" }]}
          >
            <Select size="large" placeholder="Choose Option">
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
            name="stringoccupationType"
            label="Occupation"
            rules={[{ required: true, message: "required" }]}
          >
            <Select size="large" placeholder="Choose Option">
              {props.masterData["OCCUPATION"] &&
                props.masterData["OCCUPATION"].map((option, idx) => (
                  <Select.Option key={idx} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>

        {/* <div className='col-4'>
          <Form.Item
            name='nationality'
            label='Nationality'
            rules={[{ required: true, message: 'required' }]}>
            <Select showSearch optionFilterProp='children' size='large' placeholder='Choose Option'>
              {COUNTRYLIST.map((option, idx) => (
                <Select.Option key={idx} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div> */}

        <div className="footer-btn-style" style={{ marginLeft: 17 }}>
          <Button
            onClick={() => props.onBack()}
            size="large"
            style={{ marginRight: 30 }}
          >
            Back
          </Button>
          <Button loading={loader} htmlType="submit" size="large" type="primary">
            Next
          </Button>
        </div>
      </div>
    </Form>
  );
}
