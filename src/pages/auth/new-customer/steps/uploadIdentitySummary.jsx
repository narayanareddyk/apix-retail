import { Button, Checkbox, Image } from 'antd'
import React, { useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  selfieImageSelector,
  frontImageSelector,
  backImageSelector,
} from '../../../../selectors/customer.selector'
import NewCustomerService from '../../../../services/new-customer.service'

export default function UploadIdentitySummary(props) {
  const [dataSource, setDataSource] = useState({})
  const [loader, setLoader] = useState(false)
  const selfieImage = useSelector(selfieImageSelector)
  const frontImage = useSelector(frontImageSelector)
  const backImage = useSelector(backImageSelector)

  const verifyLiveness = useCallback(async () => {
    try {
      setLoader(true)
      const response = await NewCustomerService.verifyLiveness(selfieImage.split(',')[1])
      if (response.status === 200) {
        await verifyFacematch()
      }
    } catch (err) {
      setLoader(false)
    }
  }, [])

  const verifyFacematch = useCallback(async () => {
    try {
      setLoader(true)
      const response = await NewCustomerService.verifyFacematch(
        selfieImage.split(',')[1],
        frontImage.split(',')[1],
      )
      if (response.status === 200) {
       await getKycDetails()
      }
    } catch (err) {
      setLoader(false)
    }
  }, [])

  const getKycDetails = useCallback(async () => {
    try {
      setLoader(true)
      const response = await NewCustomerService.getKycDetails(
        frontImage.split(',')[1],
        backImage.split(',')[1],
      )
      if (response.status === 200) {
        setLoader(false)
      }
    } catch (err) {
      setLoader(false)
    }
  }, [])

  return (
    <div>
      <div className='row'>
        <div className='col-4'>
          <Image src={selfieImage} />
        </div>
        <div className='col-4'>
          <Image src={frontImage} />
        </div>
        <div className='col-4'>
          <Image src={backImage} />
        </div>
      </div>

      <div className='footer-btn-style'>
        <Button size='large' onClick={() => props.onBack()} style={{ marginRight: 30 }}>
          Back
        </Button>
        <Button size='large' loading={loader} type='primary' onClick={() =>  verifyLiveness()}>
          Confirm
        </Button>
      </div>
    </div>
  )
}
