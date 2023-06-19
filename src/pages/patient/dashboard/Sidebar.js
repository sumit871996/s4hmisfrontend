import React, { useEffect, useState } from 'react'
import {Link,NavLink} from 'react-router-dom'
import config from '../../../Config'
import DefaultProfile from '../../../assets/avatar.png'
import './Sidebar.css'
import axios from 'axios'
const Sidebar = (props) => {
    const[imgavl, setImgavl] = useState(false)
    const {patientName} = props

    useEffect(()=>{
        axios.get(config.serverURL+`/employee/${sessionStorage['userId']}/images`).then((response)=>
        {
            if(response.data != null)
                setImgavl(true)
        })
    })
    return (
  
    <div className="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{height:635, backgroundColor:"rgb(103, 174, 202)"}}>
        <nav id="sidebar">
            <ul className="list-unstyled components">
            <li><img 
                        src={imgavl ? config.serverURL+`/employee/${sessionStorage['userId']}/images`: DefaultProfile} 
                        className="rounded-circle" 
                        alt="No Images"
                        style={{width:"130px", height:"130px"}}
                     /></li>
                <p>{patientName}</p>
                <li>
                    <NavLink to="/patient/dashboard" className={({ isActive }) => (isActive ? 'bg-black font-bold ' : 'inactive')} >Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/patient/book-appointment" className={({ isActive }) => (isActive ? 'bg-black font-bold ' : 'inactive')} >Book Appointment</NavLink>
                </li>
                <li>
                    <NavLink to="/patient/book-emergency-appointment" className={({ isActive }) => (isActive ? 'bg-black font-bold ' : 'inactive')} >Book Emergency Appointment</NavLink>
                </li>
                <li>
                    <NavLink to="/patient/pathology" className={({ isActive }) => (isActive ? 'bg-black font-bold ' : 'inactive')} >Pathology</NavLink>
                </li>
                <li>
                <NavLink to="/patient/pending-bills" className={({ isActive }) => (isActive ? 'bg-black font-bold ' : 'inactive')} >Pending Bills</NavLink>
                </li>
                <li>
                    <NavLink to="/patient/paid-bills" className={({ isActive }) => (isActive ? 'bg-black font-bold ' : 'inactive')} >Paid Bills</NavLink>
                </li>
                <li>
                    <NavLink to="/patient/report-history" className={({ isActive }) => (isActive ? 'bg-black font-bold ' : 'inactive')} >Report History</NavLink>
                </li>
                <li>
                <NavLink to="/patient/myprofile" className={({ isActive }) => (isActive ? 'bg-black font-bold ' : 'inactive')} >Myprofile</NavLink>
                </li>
            </ul>
        </nav>
        </div>
    )
}
 
export default Sidebar