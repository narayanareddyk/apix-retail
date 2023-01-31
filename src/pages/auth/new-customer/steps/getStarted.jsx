import { Button, Checkbox } from 'antd'
import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import NewCustomerService from '../../../../services/new-customer.service'
import Loading from '../components/loader'

export default function GetStarted(props) {
  const [dataSource, setDataSource] = useState({})
  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    fetchTermsAndConditions()
  }, [])

  const fetchTermsAndConditions = useCallback(async () => {
    try {
      setLoader(true)
      const response = await NewCustomerService.getTermsAndConditions({
        module: 'REGISTRATION',
      })
      if (response.status === 200) {
        setLoader(false)
        if (response.data['termsAndCondition']) {
          setDataSource(response.data['termsAndCondition'][0])
        }
      }
    } catch (err) {
      setLoader(false)
    }
  }, [])

  function renderLoading() {
    return (
      <div
        className='mx-4 rounded d-flex justify-content-center align-items-center'
        style={{ marginTop: 80 }}>
        <Loading width='50px' height='50px' />
      </div>
    )
  }

  function renderData() {
    return (
      <>
        <p
          dangerouslySetInnerHTML={{ __html: dataSource?.message || '' }}
          className='text-justify'
          style={{
            height: 300,
            marginTop: 30,
            overflow: 'overlay',
            whiteSpace: 'pre-line',
          }}></p>

        <Checkbox onChange={(e) => setChecked(e.target.checked)}>
          Read and Accept the Terms and Conditions
        </Checkbox>
        <div className='footer-btn-style'>
          <Button size='large' onClick={() => props.onBack()} style={{ marginRight: 30 }}>
            Cancel
          </Button>
          <Button disabled={!checked} size='large' type='primary' onClick={() => props.onNext()}>
            Proceed
          </Button>
        </div>
      </>
    )
  }

  return (
    <div>
      {loader && renderLoading()}
      {!loader && renderData()}
    </div>
  )
}
