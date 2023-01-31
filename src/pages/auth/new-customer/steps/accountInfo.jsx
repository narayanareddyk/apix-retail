import { Checkbox, DatePicker, Form, Input, Select, Button } from 'antd'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAccountInfo } from '../../../../actions/customer.action'
import { accountInfoSelector } from '../../../../selectors/customer.selector'
import accountInfoIcon from '../../../../assets/images/new-customer/AccountOpeningInformation.png'

export default function AccountType(props) {
  const accountInfoDetails = useSelector(accountInfoSelector)
  const dispatch = useDispatch()

  const postData = useCallback((values) => {
    try {
      const selectedBranch = props.masterData['BRANCH'].filter(
        (ele) => ele.id === values.branchId,
      )[0]
      dispatch(setAccountInfo({ ...values, ...selectedBranch }))
      props.onNext()
    } catch (err) {}
  }, [])

  // console.log(accountInfoDetails)

  return (
    <div className='row'>
      <div className='col-6'>
        <Form initialValues={{ ...accountInfoDetails }} onFinish={postData} layout='vertical'>
          <Form.Item
            name='accountType'
            label='Account Type'
            rules={[{ required: true, message: 'required' }]}>
            <Select placeholder='Choose Option'>
              <Select.Option value={'4'}>{'Saving Account'}</Select.Option>
              <Select.Option value={'5'}>{'current Account'}</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name='branchId'
            label='Branch Name'
            rules={[{ required: true, message: 'required' }]}>
            <Select placeholder='Choose Option'>
              {props.masterData['BRANCH'] &&
                props.masterData['BRANCH'].map((option, idx) => (
                  <Select.Option key={idx} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <div className='footer-btn-style'>
            <Button onClick={() => props.onBack()} size='large' style={{ marginRight: 30 }}>
              Back
            </Button>
            <Button htmlType='submit' size='large' type='primary'>
              Next
            </Button>
          </div>
        </Form>
      </div>

      <div className='col-6'>
        <img
          width={280}
          style={{ display: 'block', margin: '0 auto', marginTop: '-50px' }}
          src={accountInfoIcon}
        />
      </div>
    </div>
  )
}
