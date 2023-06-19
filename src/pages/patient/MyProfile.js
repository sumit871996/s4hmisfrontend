import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import config from '../../Config'
import { useNavigate, useLocation } from 'react-router-dom'

export default function MyProfile() {

    const navigate = useNavigate()
    const [patient, setPatient] = useState({})

    const header = {
        headers: { Authorization: 'Bearer ' + sessionStorage['token'] }
    }
    const getMydetails = () => {
        axios.get(config.serverURL + `/patient/getmyDetails/${sessionStorage['userId']}`, header)
            .then((response) => {
                console.log(response)
                setPatient(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getMydetails()
    }, [])

    const editprofile = ()=>{
        navigate('/patient/editProfile',{state:{patientdetails : patient}})
    }


    return (
        <div className="col main mt-3" style={{marginLeft:90, height:620, overflow:'auto'}}>
            <h2 className="mt-3 mb-3 text-secondary" style={{textAlign:"left"}}> My Profile </h2>
            <hr />
            <div className="row">
            </div>
            <div className="row" style={{textAlign:"left"}}>
                <div  className="col-lg-4 col-md-6 col-sm-12">
                <table class="table table-borderless">
                    
                    <tbody>
                        <tr>
                            <th >First Name :</th>
                            <td>{patient.firstName}</td> 
                        </tr>
                        <tr>
                            <th >Last Name :</th>
                            <td>{patient.lastName}</td>
  
                        </tr>
                        <tr>
                            <th >Phone No :</th>
                            <td>{patient.phone}</td>    
                        </tr>

                        <tr>
                            <th >Email ID :</th>
                            <td>{patient.email == null ? '-' :patient.email }</td>    
                        </tr>
                        <tr>
                            <th >Blood Group :</th>
                            <td>{patient.bloodGroup == null ? '-' :patient.bloodGroup }</td>    
                        </tr>
                        <tr>
                            <th >Gender :</th>
                            <td>{patient.gender == null ? '-' :patient.gender}</td>    
                        </tr>
                        <tr>
                            <th >DOB :</th>
                            <td>{patient.dateOfBirth == null ? '-' : patient.dateOfBirth}</td>    
                        </tr>
                     
                        
                    </tbody>
                </table>

                </div>

                <div  className="col-lg-4 col-md-6 col-sm-12">
                <table class="table table-borderless">
                    
                    <tbody>
                        
                        <tr>
                            <th >Building Name:</th>
                            <td>{patient.buildingName == null ? '-' : patient.buildingName }</td>    
                        </tr>
                        <tr>
                            <th >Street Name :</th>
                            <td>{patient.streetName == null ? '-' : patient.streetName}</td>    
                        </tr>
                        <tr>
                            <th >City :</th>
                            <td>{patient.city == null ? '-' : patient.city}</td>    
                        </tr>
                        <tr>
                            <th >State :</th>
                            <td>{patient.state == null ? '-' : patient.state}</td>    
                        </tr>
                        <tr>
                            <th >Pincode :</th>
                            <td>{patient.pinCode == null ? '-' : patient.pinCode}</td>    
                        </tr>

                        <tr>
                            <th >Security Question :</th>
                            <td>{patient.securityQuestion == null ? '-' : patient.securityQuestion}</td>    
                        </tr>

                        <tr>
                            <th >Security Answer :</th>
                            <td>{patient.securityAnswer == null ? '-' :patient.securityAnswer}</td>    
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
