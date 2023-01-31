import { Button, Divider, message } from 'antd'
import React, { useState, useCallback } from 'react'
import { FaFileSignature } from 'react-icons/fa'
import { RiFileUploadFill } from 'react-icons/ri'
import SignaturePad from 'react-signature-canvas'
import UploadImage from '../components/upload-image'
import { useDispatch } from 'react-redux'
import signatureIcon from '../../../../assests/images/new-customer/Signature.png'
import { setSignatureInfo } from '../../../../store/actions/customer.action'

export default function Signature(props) {
  let sigPad = {}
  const [drawSign, setDrawSign] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [signature, setSignature] = useState('')
  const dispatch = useDispatch()

  const postData = useCallback(() => {
    try {
      if (signature.length === 0) {
        message.error('signature required')
        return
      }
      dispatch(setSignatureInfo(signature))
      props.onNext()
    } catch (err) {}
  }, [signature])

  return (
    <div className='row'>
      <div className='col-5'>
        <h3>Signature</h3>
        <p>Please Draw the Signature or Upload the Signature </p>
        <img width={200} style={{ display: 'block', marginBottom: 76 }} src={signatureIcon} />

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
              setDrawSign(true)
              setShowUpload(false)
              setSignature('')
            }}>
            <FaFileSignature style={{ fontSize: 30 }} /> Open Signature
          </span>
          <Divider type='vertical' />
          <span
            onClick={() => {
              setDrawSign(false)
              setShowUpload(true)
              setSignature('')
            }}>
            <RiFileUploadFill style={{ fontSize: 30 }} /> Upload From Device
          </span>
        </div>
        <div className='capture-render-area'>
          {drawSign && (
            <div
              style={{
                padding: 20,
                background: '#fff',
              }}>
              <SignaturePad
                canvasProps={{ width: 370, height: 200 }}
                ref={(ref) => {
                  sigPad = ref
                }}
                onEnd={() => {
                  setSignature(sigPad?.getTrimmedCanvas()?.toDataURL('image/png'))
                }}
              />
            </div>
          )}
          {showUpload && (
            <div>
              <UploadImage
                getUploadImage={(img) => {
                  setSignature(img)
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
