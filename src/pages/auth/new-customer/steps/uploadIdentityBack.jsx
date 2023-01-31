import { Button, Divider, message } from 'antd'
import React, { useState, useCallback } from 'react'
import Webcam from 'react-webcam'
import { AiFillCamera } from 'react-icons/ai'
import { RiFileUploadFill } from 'react-icons/ri'
import UploadImage from '../components/upload-image'
import { useDispatch } from 'react-redux'
import { setBackImageInfo } from '../../../../actions/customer.action'
import { selfieImageSelector } from '../../../../selectors/customer.selector'
import uploadArrowIcon from '../../../../assets/images/new-customer/uploadArrow.png'

export default function UploadIdentityBack(props) {
  const webcamRef = React.useRef(null)
  const [showCamera, setShowCamera] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [image, setImage] = useState('')
  const dispatch = useDispatch()

  const postData = useCallback(() => {
    try {
      if (image.length === 0) {
        message.error('front image required')
        return
      }
      dispatch(setBackImageInfo(image))
      props.onNext()
    } catch (err) {}
  }, [image])

  return (
    <div className='row'>
      <div className='col-5'>
        <h3>Upload / Capture Id</h3>
        <p>Please upload or capture an image of ID Back </p>
        <img width={200} style={{ display: 'block', marginBottom: 76 }} src={uploadArrowIcon} />

        <div className='footer-btn-style'>
          <Button size='large' onClick={() => props.onBack()} style={{ marginRight: 30 }}>
            Back
          </Button>
          <Button size='large' type='primary' onClick={() => postData()}>
            Next
          </Button>
        </div>
      </div>
      <div className='col-7'>
        <div style={{ textAlign: 'center' }} className='upload-options'>
          <span
            onClick={() => {
              setShowCamera(true)
              setShowUpload(false)
              setImage('')
            }}>
            <AiFillCamera style={{ fontSize: 30 }} /> Open Camera
          </span>
          <Divider type='vertical' />
          <span
            onClick={() => {
              setShowCamera(false)
              setShowUpload(true)
              setImage('')
            }}>
            <RiFileUploadFill style={{ fontSize: 30 }} /> Upload From Device
          </span>
        </div>
        <div className='capture-render-area'>
          {showCamera && image.length === 0 && (
            <Webcam
              ref={webcamRef}
              audio={false}
              height='260px'
              width={'100%'}
              screenshotFormat='image/jpeg'
              screenshotQuality={1}
              imageSmoothing={true}
              minScreenshotHeight={1000}
              minScreenshotWidth={1000}
              className='web-cam'
            />
          )}

          {showCamera && image.length > 0 && (
            <img src={image} style={{ width: 410, height: 250 }} />
          )}

          {showUpload && (
            <div>
              <UploadImage
                getUploadImage={(img) => {
                  setImage(img)
                }}
              />
            </div>
          )}
        </div>
        {showCamera && image.length === 0 && (
          <div
            style={{
              marginTop: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button
              onClick={() => setImage(webcamRef.current.getScreenshot())}
              size='large'
              type='primary'>
              Take screenshot
            </Button>
          </div>
        )}

        {showCamera && image.length > 0 && (
          <div
            style={{
              marginTop: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button
              onClick={() => {
                setImage('')
              }}
              size='large'>
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
