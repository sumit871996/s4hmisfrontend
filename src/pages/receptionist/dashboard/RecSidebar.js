import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../../Config'
import DefaultProfile from '../../../assets/avatar.png'
import {Link, NavLink} from 'react-router-dom'
import '../../patient/dashboard/Sidebar.css'


const RecSidebar = (props) => {

    const fullName = props.fullName

    const[profilePhoto, setProfilePhoto] = useState(false)

    useEffect(()=>{

       
    axios.get(config.serverURL+"/reception/" + sessionStorage['userId'] + "/images", 
    {
        headers:
        {
            'Authorization' : 'Bearer ' + sessionStorage['token']
        }
    }).then((response)=>{
        // console.log(response)

        if(response.data != null){
        // console.log(JSON.stringify(response.data))
        // console.log(response.data)
        setProfilePhoto(true)
        }

        // setProfilePhoto(JSON.stringify(response.data))
    }).catch((error)=>{
        console.log(error)
    })
    })

    return (
         <div className="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{backgroundColor:"#rgb(103, 174, 202)", width:250, height:650}}>
             {console.log(profilePhoto)}
             <img href='/reception/dashboard' className = "img-circle mt-5" src={profilePhoto ? config.serverURL+"/employee/" + sessionStorage['userId'] + "/images" : DefaultProfile } style={{overflow : 'auto', width:130, height:130, borderRadius:65}} />
             {/* <img href='/receptionist/dashboard' className = "img-circle mt-5" src={`data:image/jpeg;base64,${profilePhoto}`} style={{overflow : 'auto', width:125, height:125, borderRadius:50}} /> */}
    
            <ul className="nav flex-column sticky-top pl-0 pt-1 p-3 mt-1 ">
                <li className="nav-item mb-2 mt-3"><Link className="nav-link text-secondary" to="/reception/dashboard"><h5>{fullName}</h5></Link></li>
                <li className="nav-item mb-2"><Link className="nav-link text-secondary" to="/reception/dashboard/myProfile"><i className="fas fa-file-export font-weight-bold"></i><span className="ml-3">My Profile</span></Link></li>
                {/* <li className="nav-item mb-2 "><a className="nav-link text-secondary" href="/reception/dashboard/editProfile"><i className="fas fa-user font-weight-bold"></i> <span className="ml-3">Edit Profile</span></a></li> */}
                <li className="nav-item mb-2">
                    <Link className="nav-link text-secondary" to="/reception/dashboard/PendingBills" data-toggle="collapse" data-target="#submenu1"><i className="far fa-file-word font-weight-bold"></i> <span className="ml-3"> Pending Bills</span></Link>
                    {/* <ul className="list-unstyled flex-column pl-3 collapse" id="submenu1" aria-expanded="false">
                       <li className="nav-item mb-2 "><a className="nav-link text-secondary" href=""><i className="fas fa-book-reader"></i> Data Report </a></li>
                       <li className="nav-item mb-2 "><a className="nav-link text-secondary" href=""> <i className="fas fa-book-medical"></i> File Report </a></li>
                    </ul> */}
                </li>
                <li className="nav-item mb-2"><Link className="nav-link text-secondary" to="/reception/dashboard/PaidBills"><i className="far fa-chart-bar font-weight-bold"></i> <span className="ml-3">Paid Bills</span></Link></li>
                <li className="nav-item mb-2"><Link className="nav-link text-secondary" to="/reception/dashboard/BedAllotment"><i className="fas fa-file-export font-weight-bold"></i><span className="ml-3">Bed Allotment</span></Link></li>
                {/* <li className="nav-item mb-2"><a className="nav-link text-secondary" href="#"><i className="fas fa-tablet-alt font-weight-bold"></i><span className="ml-3">Snippets</span></a></li>
                <li className="nav-item mb-2"><a className="nav-link text-secondary" href="#"><i className="fas fa-atom font-weight-bold"></i> <span className="ml-3">Flex</span></a></li>
                <li className="nav-item mb-2"><a className="nav-link text-secondary" href="#"><i className="far fa-folder font-weight-bold"></i> <span className="ml-3">Layouts</span></a></li> */}
                {/* <li className="nav-item mb-2"><a className="nav-link text-secondary" href="#">Templates</a></li>
                <li className="nav-item mb-2"><a className="nav-link text-secondary" href="#">Themes</a></li> */}
            </ul>
       </div>
    // <div className="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{backgroundColor:"#e9ecef"}}>
    // <nav id="sidebar">
    //     <ul className="list-unstyled components">
    //     <li><img 
    //                 src={config.serverURL+`/employee/${sessionStorage['userId']}/images`} 
    //                 className="rounded-circle" 
    //                 alt="No Images"
    //                 style={{width:"150px", height:"150px"}}
    //              /></li>
    //         <p>{fullName}</p>
    //         <li>
    //             <NavLink to="/reception/dashboard/myProfile" className={({ isActive }) => (isActive ? 'bg-black font-bold ' : 'inactive')} >My Profile</NavLink>
    //         </li>
    //         <li>
    //             <NavLink to="/reception/dashboard/editProfile" className={({ isActive }) => (isActive ? 'bg-black font-bold ' : 'inactive')} >Edit Profile</NavLink>
    //         </li>
    //         <li>
    //             <NavLink to="/reception/dashboard/PaidBills" className={({ isActive }) => (isActive ? 'bg-black font-bold ' : 'inactive')} >Paid Bills</NavLink>
    //         </li>
    //         <li>
    //         <NavLink to="/reception/dashboard/PendingBills" className={({ isActive }) => (isActive ? 'bg-black font-bold ' : 'inactive')} >Pending Bills</NavLink>
    //         </li>

    //         <li>
    //             <NavLink to="/reception/dashboard/BedAllotment" className={({ isActive }) => (isActive ? 'bg-black font-bold ' : 'inactive')} >Bed Allotment</NavLink>
    //         </li>

    //     </ul>
    // </nav>
    // </div>
    )
}
 
export default RecSidebar