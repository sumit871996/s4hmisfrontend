import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../Config'
import { useNavigate, useLocation } from 'react-router-dom'

export default function MyDoctProfile() {
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState({})

  const header = {
    headers: { Authorization: 'Bearer ' + sessionStorage['token'] },
  }
  const getMydetails = () => {
    axios
      .get(
        config.serverURL + `/doctor/myDetails/${sessionStorage['userId']}`,
        header
      )
      .then((response) => {
        console.log(response)
        setDoctor(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getMydetails()
  }, [])

  const editprofile = () => {
    // console.log(doctor)
    navigate('/doctor/editProfile', { state: { empdetails: doctor } })
  }

  return (
    <div className='col main mt-3' style={{marginLeft:90,height:635, overflow:'auto'}}>
      <h2 className='mt-3 mb-3 text-secondary' style={{ textAlign: 'left' }}>
        My Profile
      </h2>
      <hr />
      <div className='row'></div>
      <div className='row' style={{ textAlign: 'start' }}>
        <div className='col-lg-4 col-md-6 col-sm-12 '>
          <table className='table table-borderless '>
            <tbody>
              <tr>
                <th>First Name :</th>
                <td>{doctor.firstName}</td>
              </tr>
              <tr>
                <th>Last Name :</th>
                <td>{doctor.lastName}</td>
              </tr>
              <tr>
                <th>Phone No :</th>
                <td>{doctor.phone}</td>
              </tr>

              <tr>
                <th>Email ID :</th>
                <td>{doctor.email == null ? '-' : doctor.email}</td>
              </tr>
              <tr>
                <th>Blood-Group:</th>
                <td>{doctor.bloodGroup == null ? '-' : doctor.bloodGroup}</td>
              </tr>
              <tr>
                <th>Gender :</th>
                <td>{doctor.gender == null ? '-' : doctor.gender}</td>
              </tr>
              <tr>
                <th>DOB :</th>
                <td>{doctor.dateOfBirth == null ? '-' : doctor.dateOfBirth}</td>
              </tr>
              <tr>
                <th>role :</th>
                <td>
                  {doctor.role == null ? '-' : `${doctor.role.substring(5)}`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='col-lg-4 col-md-6 col-sm-12'>
          <table className='table table-borderless text-align-start'>
            <tbody>
              <tr>
                <th>Building Name:</th>
                <td>
                  {doctor.buildingName == null ? '-' : doctor.buildingName}
                </td>
              </tr>
              <tr>
                <th>Street Name :</th>
                <td>{doctor.streetName == null ? '-' : doctor.streetName}</td>
              </tr>
              <tr>
                <th>City :</th>
                <td>{doctor.city == null ? '-' : doctor.city}</td>
              </tr>
              <tr>
                <th>State :</th>
                <td>{doctor.state == null ? '-' : doctor.state}</td>
              </tr>
              <tr>
                <th>Pincode :</th>
                <td>{doctor.pinCode == null ? '-' : doctor.pinCode}</td>
              </tr>

              <tr>
                <th>Education :</th>
                <td>{doctor.education == null ? '-' : doctor.education}</td>
              </tr>

              <tr>
                <th>Speciality :</th>
                <td>{doctor.speciality == null ? '-' : doctor.speciality}</td>
              </tr>

              <tr>
                <th>Department :</th>
                <td>{doctor.department == null ? '-' : doctor.department}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ textAlign: 'left' }}>
        <button className='btn btn-primary' onClick={editprofile}>
          Edit Profile
        </button>
      </div>
    </div>
  )
}
