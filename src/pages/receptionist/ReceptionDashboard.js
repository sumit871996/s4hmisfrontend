import React, { useEffect, useState } from 'react';
import RecDashboard from './dashboard/RecDashboard'
import Navbar2 from '../../components/Navbar2'
import RecSidebar from './dashboard/RecSidebar'
import axios from 'axios'
import config from '../../Config'

const ReceptionDashboard = (props)=>{

    const[fullName, setFullName] = useState('')

    useEffect(()=>{
        loadEmployee()
    },[])

    const loadEmployee = ()=>{

        // console.log(sessionStorage['token'])
        // console.log(sessionStorage['userId'])
        axios.get(config.serverURL + '/reception/myDetails/' + sessionStorage['userId'],
        {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage['token']
            }
        })
        .then((response)=>{
            const result = response.data
            setFullName(result.firstName + " " +result.lastName )
        }).catch((error)=>{
            alert(error)
        })
    }

    return (
        <div>
            <div className="container-fluid" id="main">
             <div className="row row-offcanvas row-offcanvas-left">
               <RecSidebar fullName = {fullName}/>   
               
               {props.children}   
               
         </div>
        </div>  
    </div>  
    )

}

export default ReceptionDashboard