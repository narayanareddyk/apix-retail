import {Form, Input, Select, Button } from 'antd'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAddressInfo } from '../../../../store/actions/customer.action'
import { addressInfoSelector } from '../../../../store/selectors/customer.selector'

export default function AddressDetails(props) {
  const addressDetails = useSelector(addressInfoSelector)

  const dispatch = useDispatch()

  const postData = useCallback((values) => {
    try {
      dispatch(setAddressInfo({ ...values }))
      props.onNext()
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <Form initialValues={{ ...addressDetails }} onFinish={postData} layout='vertical'>
      <div className='row'>
        <div className='col-4'>
          <Form.Item
            name='houseNumber'
            label='House Number / floor'
            rules={[{ required: true, message: 'required' }]}>
            <Input size='large' />
          </Form.Item>
        </div>
        <div className='col-4'>
          <Form.Item
            name='addrLine1'
            label='Address Line1'
            rules={[{ required: true, message: 'required' }]}>
            <Input size='large' />
          </Form.Item>
        </div>

        <div className='col-4'>
          <Form.Item
            name='addrLine2'
            label='Address Line 2'
            rules={[{ required: false, message: 'required' }]}>
            <Input size='large' />
          </Form.Item>
        </div>

        <div className='col-4'>
          <Form.Item name='city' label='City' rules={[{ required: true, message: 'required' }]}>
            <Input size='large' />
          </Form.Item>
        </div>
        <div className='col-4'>
          <Form.Item
            name='district'
            label='Disrtict'
            rules={[{ required: true, message: 'required' }]}>
            <Input size='large' />
          </Form.Item>
        </div>

        <div className='col-4'>
          <Form.Item name='state' label='State' rules={[{ required: true, message: 'required' }]}>
            <Input size='large' />
          </Form.Item>
        </div>
        <div className='col-4'>
          <Form.Item
            name='pinCode'
            label='PinCode'
            rules={[{ required: true, message: 'required' }]}>
            <Input size='large' />
          </Form.Item>
        </div>
      </div>
      
      <div className='footer-btn-style'>
        <Button onClick={() => props.onBack()} size='large' style={{ marginRight: 30 }}>
          Back
        </Button>
        <Button htmlType='submit' size='large' type='primary'>
          Next
        </Button>
      </div>
    </Form>
  )
}
