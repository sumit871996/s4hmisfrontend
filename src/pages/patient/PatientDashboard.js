import React from 'react'
import DashNavbar from './dashboard/DashNavbar'
import Dashboard from './dashboard/Dashboard'
import Sidebar from './dashboard/Sidebar'
import PendingBills from './PendingBills'
import {useEffect,useState} from 'react';
import axios from 'axios'
import config from '../../Config'
import Navbar2 from '../../components/Navbar2'


export default function PatientDashboard(props) {
    
    const[fullName, setFullName] = useState('')

    const header = {
        headers: { Authorization: 'Bearer ' + sessionStorage['token'] }
    }
    const getMydetails=()=>{
        axios.get(config.serverURL +`/patient/getmyDetails/${sessionStorage['userId']}`,header)
        .then((response)=>{
            console.log(response)
            setFullName(response.data.firstName+ " "+response.data.lastName )
        })
    }

    useEffect(() => {
        getMydetails()
    }, [])

    
    return (
        <div>
            {/* class="container-fluid" */}
            <div  id="main"> 
                <div className="row row-offcanvas row-offcanvas-left">
                    <Sidebar patientName = {fullName} />
                    
                    {props.children}
                   
                </div>
            </div>
        </div>

    )
}
