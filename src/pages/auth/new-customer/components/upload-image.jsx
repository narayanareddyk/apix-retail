import React, { useState, useCallback } from 'react'
import { message, Upload } from 'antd'
import { BsPlusLg } from 'react-icons/bs'

export default function UploadImage({ getUploadImage, imgUrl,text='' }) {
  const [imageUrl, setImageUrl] = useState('')

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const onChange = useCallback((info) => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl)
        getUploadImage(imageUrl)
      })
    }
  })

  const handleAction = useCallback(({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  })

  return (
    <>
      <Upload
        name='avatar'
        listType='picture-card'
        className='avatar-uploader'
        showUploadList={false}
        customRequest={handleAction}
        beforeUpload={beforeUpload}
        onChange={onChange}>
        {imageUrl || imgUrl ? (
          <img src={imageUrl || imgUrl} alt='avatar' style={{ width: "100%", height: 250 }} />
        ) : (
          <div>
            <BsPlusLg />
            <div style={{ marginTop: 8 }}>Upload {text}</div>
          </div>
        )}
      </Upload>
    </>
  )
}
