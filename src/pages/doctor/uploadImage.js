import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import { toast } from 'react-toastify'
import config from '../../Config'

const UploadImage = () => {
  // selected home id
  const [homeId, setHomeId] = useState()

  // used to keep the selected file
  const [file, setFile] = useState()

  // used to get the state sent by previous screen
  const location = useLocation()

  // used to navigate
  const navigate = useNavigate()

  // grab the home id
  // useEffect(() => {
  //   const { homeId } = location.state
  //   setHomeId(homeId)
  // }, [])

  const uploadImage = () => {
    // FormData is used to send the multipart file
    const body = new FormData()

    // add the file
    body.set('imageFile', file)

    axios
      .post(config.serverURL + '/employee/1/images', body, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + sessionStorage['token'],
        },
      })
      .then((response) => {
        const result = response.data
        console.log(response)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <div className='container'>
      <h3 style={{ textAlign: 'center', margin: 20 }}>Upload Image</h3>

      <div className='mb-3'>
        <label>Select Image</label>
        <input
          onChange={(e) => {
            // set the selected file in the state
            setFile(e.target.files[0])
          }}
          className='form-control'
          type='file'
        />
        <button className='btn btn-warning' onClick={uploadImage}>
          Upload Photo
        </button>
      </div>
    </div>
  )
}

export default UploadImage
