import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import config from '../../../Config'
import { useNavigate, useLocation } from 'react-router-dom'

export default function RMyProfile() {

    const navigate = useNavigate()
    const [receptionist, setReceptionist] = useState({})

    const header = {
        headers: { Authorization: 'Bearer ' + sessionStorage['token'] }
    }
    const getMydetails = () => {
        axios.get(config.serverURL + `/reception/myDetails/${sessionStorage['userId']}`, header)
            .then((response) => {
                // console.log(response)
                setReceptionist(response.data)
            }).catch((error) => {
                // console.log(error)
            })
    }

    useEffect(() => {
        getMydetails()
    }, [])

    const editprofile = ()=>{
        navigate('/reception/dashboard/editProfile',{state:{empdetails : receptionist}})
    }


    return (
        <div className="col main mt-3" style={{marginLeft:90, height:635, overflow:'auto'}}>
            
            <h2 className="mt-3 mb-3 text-secondary" style={{textAlign:"left"}}> My Profile </h2>
            <hr />
            <div className="row">
            </div>
            <div className="row" style={{ textAlign: 'start' }}>
                <div  className="col-lg-4 col-md-6 col-sm-12">
                <table className='table table-borderless '>
            <tbody>
              <tr>
                <th>First Name :</th>
                <td>{receptionist.firstName}</td>
              </tr>
              <tr>
                <th>Last Name :</th>
                <td>{receptionist.lastName}</td>
              </tr>
              <tr>
                <th>Phone No :</th>
                <td>{receptionist.phone}</td>
              </tr>

              <tr>
                <th>Email ID :</th>
                <td>{receptionist.email == null ? '-' : receptionist.email}</td>
              </tr>
              <tr>
                <th>Blood-Group:</th>
                <td>{receptionist.bloodGroup == null ? '-' : receptionist.bloodGroup}</td>
              </tr>
              <tr>
                <th>Gender :</th>
                <td>{receptionist.gender == null ? '-' : receptionist.gender}</td>
              </tr>
              <tr>
                <th>DOB :</th>
                <td>{receptionist.dateOfBirth == null ? '-' : receptionist.dateOfBirth}</td>
              </tr>
              <tr>
                <th>role :</th>
                <td>
                  {receptionist.role == null ? '-' : `${receptionist.role.substring(5)}`}
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
                  {receptionist.buildingName == null ? '-' : receptionist.buildingName}
                </td>
              </tr>
              <tr>
                <th>Street Name :</th>
                <td>{receptionist.streetName == null ? '-' : receptionist.streetName}</td>
              </tr>
              <tr>
                <th>City :</th>
                <td>{receptionist.city == null ? '-' : receptionist.city}</td>
              </tr>
              <tr>
                <th>State :</th>
                <td>{receptionist.state == null ? '-' : receptionist.state}</td>
              </tr>
              <tr>
                <th>Pincode :</th>
                <td>{receptionist.pinCode == null ? '-' : receptionist.pinCode}</td>
              </tr>

              <tr>
                <th>Education :</th>
                <td>{receptionist.education == null ? '-' : receptionist.education}</td>
              </tr>

              <tr>
                <th>Speciality :</th>
                <td>{receptionist.speciality == null ? '-' : receptionist.speciality}</td>
              </tr>

              <tr>
                <th>Department :</th>
                <td>{receptionist.department == null ? '-' : receptionist.department}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
            <div style={{textAlign:"left"}}>
                    <button className="btn btn-primary" onClick={editprofile}>Edit Profile</button>
            </div>


        </div>
    )
}
