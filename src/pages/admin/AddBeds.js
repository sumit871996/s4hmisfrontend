import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import config from '../../Config'

export default function AddBeds() {
  const [wardNumber, setWardNumber] = useState('')
  const [bedNumber, setBedNumber] = useState('')
  const [wardCharges, setWardCharges] = useState('')
  const [bedAvailability, setBedAvailability] = useState(true)

  const navigate = useNavigate()
  const addBed = () => {
    const body = {
      wardNumber,
      bedNumber,
      wardCharges,
      bedAvailability,
    }

    axios
      .post(config.serverURL +'/admin/addbeds', body, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage['token'],
        },
      })
      .then((response) => {
        console.log(response)

        navigate('/admin/GetAllBeds')
      })
      .catch((response) => {
        console.log('catche ' + response)
        //alert(` ${res.data.message}`)
      })
  }
  return (
    <div className='col main pt-5 mt-3' style={{ marginLeft: 200 }}>
      <h5 className='mt-3 mb-3 text-secondary'> Add Bed </h5>

      <div className='row'>
        <div className='col-lg-4 col-md-6 col-sm-12'>
          <div className='mb-3'>
            <label for='wardNumber' class='form-label'>
              wardNumber
            </label>
            <input
              onKeyUp={(e) => setWardNumber(e.target.value)}
              type='text'
              class='form-control'
              id='wardNumber'
              placeholder='A/B/C'
            />
          </div>

          <div className='mb-3'>
            <label for='bedNumber' class='form-label'>
              bedNumber
            </label>
            <input
              onKeyUp={(e) => setBedNumber(e.target.value)}
              type='text'
              class='form-control'
              id='bedNumber'
              placeholder='1-15'
            />
          </div>
        </div>

        <div className='col-lg-4 col-md-6 col-sm-12'>
          <div className='mb-3'>
            <label for='wardCharges' class='form-label'>
              wardCharges
            </label>
            <input
              onChange={(e) => setWardCharges(e.target.value)}
              type='text'
              class='form-control'
              id='wardCharges'
              placeholder='2000(A)/3000(B)/5000(C)'
            />
          </div>
          <div className='mb-3'>
            <label for='bedAvailability' class='form-label'>
              {/* bedAvailability */}
            </label>
            <input
              type='hidden'
              class='form-control'
              id='bedAvailability'
              placeholder='true/false'
            />
          </div>
        </div>
        <div className='mb-3'>
          <button
            onClick={addBed}
            className='btn btn-success'
            style={{ marginTop: 20 }}>
            Add Bed
          </button>
        </div>
      </div>
    </div>
  )
}
