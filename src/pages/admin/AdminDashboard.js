// import { useNavigate, Link } from 'react-router-dom'
// import { GetAllEmployees } from './dashboard/GetAllEmployees'
import React from 'react'
import AdminSidebar from './dashboard/AdminSidebar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import config from '../../Config.js'

// export default function AdminDashboard() {
//   // const navigate = useNavigate()
//   return (
//     <div>
//       <div>
//         <Link to='/admin/GetAllEmployees'>GetAllEmployees</Link>
//       </div>

//       <div>
//         <Link to='/admin/GetAllBeds'>Beds</Link>
//       </div>
//       <div>
//         <Link to='/about'>about</Link>
//       </div>
//       <div>
//         <Link to='/privacy'>PrivacyPolicy</Link>
//       </div>
//     </div>
//   )
// }

export default function AdminDashboard(props) {
  const [fullName, setFullName] = useState('')

  useEffect(() => {
    loadEmployee()
  }, [])
  const loadEmployee = () => {
    // console.log(sessionStorage['token'])
    // console.log(sessionStorage['userId'])
    axios
      .get(
        config.serverURL + '/admin/myDetails/' + sessionStorage['userId'],
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage['token'],
          },
        }
      )
      .then((response) => {
        const result = response.data
        setFullName(result.firstName + ' ' + result.lastName)
      })
      .catch((error) => {})
  }
  return (
    <div>
      {/* //<DashNavbar2 /> */}
      <div className='container-fluid' id='main'>
        <div className='row row-offcanvas row-offcanvas-left'>
          <AdminSidebar fullName={fullName} />
          {props.children}
        </div>
      </div>
    </div>
  )
}
