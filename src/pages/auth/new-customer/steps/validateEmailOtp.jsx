import { Form, Input, Button } from 'antd'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OtpIcon from '../../../../assests/images/new-customer/otp.png'
import OtpInput from 'react-otp-input'
import { emailIdSelector } from '../../../../store/selectors/customer.selector'
import NewCustomerService from '../../../../services/new-customer.service'

export default function ValidateEmailOtp(props) {
  const dispatch = useDispatch()
  const [OTP, setOTP] = useState('')
  const [loader, setLoader] = useState(false)
  const emailId = useSelector(emailIdSelector)

  const postData = useCallback(async () => {
    try {
      setLoader(true)
      const response = await NewCustomerService.validateEmailOtp({ otp: OTP })
      if (response.status === 200) {
        setLoader(false)
        props.onNext()
      }
    } catch (err) {
      setLoader(false)
    }
  }, [OTP])

  return (
    <>
      <h3 style={{ margin: 0 }}>Validate Code</h3>
      <p>
        Please enter the OTP sent to <b>{emailId}</b>{' '}
      </p>
      <div className='row'>
        <div className='col-7'>
          <div className='otp-wrapper'>
            <OtpInput
              className='otp-input'
              value={OTP}
              shouldAutoFocus={true}
              onChange={(otp) => setOTP(otp)}
              numInputs={6}
              isInputNum={true}
              isInputSecure={true}
            />
          </div>

          <div className='footer-btn-style'>
            <Button onClick={() => props.onBack()} size='large' style={{ marginRight: 30 }}>
              Back
            </Button>
            <Button onClick={()=>postData()} loading={loader} size='large' type='primary'>
              Next
            </Button>
          </div>
        </div>

        <div className='col-5'>
          <img
            width={320}
            style={{ display: 'block', margin: '0 auto', marginTop: '-90px', marginLeft: 50 }}
            src={OtpIcon}
          />
        </div>
      </div>
    </>
  )
}
