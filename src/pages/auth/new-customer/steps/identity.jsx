import { Checkbox, DatePicker, Form, Input, Select, Button } from 'antd'
import React, { useCallback, useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import identifyIcon from '../../../../assests/images/new-customer/identify.png'
import { identityInfoSelector } from '../../../../store/selectors/customer.selector'
import { COUNTRYLIST } from '../../../../config/constant'
import NewCustomerService from '../../../../services/new-customer.service'
import { setIdentityInfo } from '../../../../store/actions/customer.action'

const identityTypes = [
  { id: 1, name: 'Passport' },
  { id: 2, name: 'Driving Licence' },
  { id: 3, name: 'National Id' },
]

export default function IdentityType(props) {
  const identityDetails = useSelector(identityInfoSelector)
  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false)
  const [type, setType] = useState()

  const postData = useCallback(async (values) => {
    try {
      const selectedIndentityDetails = identityTypes.filter(
        (ele) => ele.id === values.idProofType,
      )[0]
      const reqParams = {
        identityNumber: values.identityNumber,
      }
      setLoader(true)
      const response = await NewCustomerService.validateId(reqParams)
      if (response.status === 200) {
        setLoader(false)
        dispatch(setIdentityInfo({ ...values, ...selectedIndentityDetails }))
        props.onNext()
      }
    } catch (err) {
      setLoader(false)
    }
  }, [])

  const disbaleFutureDates = (current) => {
    return current && current > moment(new Date() + 3)
  }

  const disbalePastDates = (current) => {
    return current && current < moment(new Date() + 1)
  }

  return (
    <div className='row'>
      <div className='col-6'>
        <Form
          initialValues={{
            ...identityDetails,
            issueDate: identityDetails['issueDate']
              ? moment(identityDetails['issueDate'], 'YYYY-MM-DD')
              : null,
            expiryDate: identityDetails['expiryDate']
              ? moment(identityDetails['expiryDate'], 'YYYY-MM-DD')
              : null,
          }}
          onFinish={postData}
          layout='vertical'>
          <Form.Item
            name='idProofType'
            label='Identity Type'
            rules={[{ required: true, message: 'required' }]}>
            <Select onChange={setType} placeholder='Choose Identity'>
              {identityTypes.map((option, idx) => (
                <Select.Option key={idx} value={option.id}>
                  {option.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name='identityNumber'
            label='Identity Number'
            rules={[{ required: true, message: 'required' }]}>
            <Input placeholder='Identity Number' />
          </Form.Item>

          <div className='row'>
            <div className='col-6'>
              <Form.Item
                name='issueDate'
                label='Issue Date'
                rules={[{ required: type && type !== 3 ? true : false, message: 'required' }]}>
                <DatePicker
                  disabledDate={disbaleFutureDates}
                  style={{ width: '100%' }}
                  placeholder='YYYY-MM-DD'
                />
              </Form.Item>
            </div>
            <div className='col-6'>
              <Form.Item
                name='expiryDate'
                label='Expiry Date'
                rules={[{ required: type && type !== 3 ? true : false, message: 'required' }]}>
                <DatePicker
                  disabledDate={disbalePastDates}
                  style={{ width: '100%' }}
                  placeholder='YYYY-MM-DD'
                />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            name='countryOfIssuance'
            label='Country Of Issue'
            rules={[{ required: true, message: 'required' }]}>
            <Select showSearch optionFilterProp='children' placeholder='Choose Option'>
              {COUNTRYLIST.map((option, idx) => (
                <Select.Option key={idx} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <div className='footer-btn-style'>
            <Button onClick={() => props.onBack()} size='large' style={{ marginRight: 30 }}>
              Back
            </Button>
            <Button loading={loader} htmlType='submit' size='large' type='primary'>
              Next
            </Button>
          </div>
        </Form>
      </div>

      <div className='col-6'>
        <img
          width={430}
          style={{ display: 'block', margin: '0 auto', marginTop: '-80px', marginLeft: 50 }}
          src={identifyIcon}
        />
      </div>
    </div>
  )
}
