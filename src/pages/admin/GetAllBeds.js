import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import config from '../../Config'

export default function GetAllBeds() {
  const navigate = useNavigate()
  const [beds, setBeds] = useState([])

  //to get all beds
  const getAllBeds = () => {
    axios
      .get(config.serverURL + '/admin/getAllBeds', {
        headers: {
          Authorization: 'Bearer ' + sessionStorage['token'],
        },
      })
      .then((response) => {
        console.log(response.data)
        setBeds(response.data)
      })
  }

  useEffect(() => {
    getAllBeds()
  }, [])
  const addBed = () => {
    navigate('/admin/addbeds')
  }
  return (
    <div className='col main pt-5 mt-3' style={{ marginLeft:40, height:635, overflow:'auto'}}>
      <div className='container'>
        <div className='mb-3' style={{ marginLeft: 900 }}>
          <button
            onClick={addBed}
            className='btn btn-warning'
            style={{ marginTop: 20 }}>
            Add Bed
          </button>
        </div>

        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>wardNumber</th>
              <th scope='col'>bedNumber</th>
              <th scope='col'>wardCharges</th>
              <th scope='col'>bedAvailability</th>
            </tr>
          </thead>

          <tbody>
            {beds && beds.length > 0 ? (
              beds.map((bed) => {
                return (
                  <tr key={bed.bedNumber}>
                    <td>{bed.wardNumber}</td>
                    <td>{bed.bedNumber}</td>
                    <td>{bed.wardCharges}</td>
                    <td>{bed.bedAvailability ? 'Available' : 'Occupied'}</td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td>No Beds at present</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
