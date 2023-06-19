import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import config from '../../Config'
import axios from 'axios'
import './../doctor/docSidebar.css'
import { useEffect, useState } from 'react'
import DefaultProfile from '../../assets/avatar.png'
const PathSidebar = (props) => {
  const { empName } = props
  const [profilePhoto, setProfilePhoto] = useState(false)

  useEffect(() => {
    axios
      .get(
        config.serverURL + '/employee/' + sessionStorage['userId'] + '/images',
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage['token'],
          },
        }
      )
      .then((response) => {
        // console.log(response)

        if (response.data != null) {
          // console.log(JSON.stringify(response.data))
          console.log(response.data)
          setProfilePhoto(true)
        }

        // setProfilePhoto(JSON.stringify(response.data))
      })
      .catch((error) => {
        console.log(error)
      })
  })

  return (
    <div
      className='col-md-3 col-lg-2 sidebar-offcanvas pl-0'
      id='sidebar'
      role='navigation'
      style={{ backgroundColor: 'rgb(103, 174, 202)' }}>
      <nav id='sidebar'>
        <ul className='list-unstyled components'>
          <li>
            <img
              href='/receptionist/dashboard'
              className='img-circle mt-5'
              src={
                profilePhoto
                  ? config.serverURL +
                    '/employee/' +
                    sessionStorage['userId'] +
                    '/images'
                  : DefaultProfile
              }
              style={{
                overflow: 'auto',
                width: 130,
                height: 130,
                borderRadius: 65,
              }}
            />
          </li>
          <p>{empName}</p>
          <li>
            <NavLink
              to='/pathologist/myPathProfile'
              className={({ isActive }) =>
                isActive ? 'bg-black font-bold ' : 'inactive'
              }>
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/pathologist/dashboard'
              className={({ isActive }) =>
                isActive ? 'bg-black font-bold ' : 'inactive'
              }>
              Dashbord
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
    // <div
    //   className='col-md-3 col-lg-2 sidebar-offcanvas pl-0'
    //   id='sidebar'
    //   role='navigation'
    //   style={{ backgroundColor: '#67AECA', height: '100%' }}>
    //   <div style={{ height: 100 }}></div>
    //   <ul className='nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 '>
    //     <li className='nav-item mb-2'>
    //       <Link
    //         className='nav-link text-secondary'
    //         to='/pathologist/myPathProfile'>
    //         <i className='far fa-folder font-weight-bold'></i>
    //         <span className='ml-3 text-white'>Edit Profile</span>
    //       </Link>
    //     </li>

    //     <li className='nav-item mb-2 '>
    //       <Link className='nav-link text-secondary' to='/pathologist/dashboard'>
    //         <i className='fas fa-user font-weight-bold'></i>
    //         <span className='ml-3 text-white'>Dashboard</span>
    //       </Link>
    //     </li>
    //   </ul>
    // </div>
  )
}

export default PathSidebar
