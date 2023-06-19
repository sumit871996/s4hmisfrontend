// import React, { useState } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import axios from 'axios'
// import config from '../../Config'

// export default function UpdatePassword() {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const { empdetails } = location.state
//   const [empId, setempId] = useState(empdetails.empId)
//   const [password, setPassword] = useState(empdetails.password)

//   const updatePass = () => {
//     {
//       const body = {
//         password,
//       }
//       axios
//         .put(config.serverURL + `/admin/updatePassword/${empId}`, body, {
//           headers: {
//             Authorization: 'Bearer ' + sessionStorage['token'],
//           },
//         })
//         .then((response) => {
//           console.log(response)
//           navigate('/admin/GetAllEmployees')
//         })
//         .catch((response) => {
//           console.log('catche ' + response)
//           //alert(` ${res.data.message}`)
//         })
//     }
//     navigate('/admin/GetAllEmployees')
//   }

//   return (
//     <div className='col main  mt-3' style={{ marginLeft: 90 }}>
//       <div className='row'>
//         <div className='col-lg-5 col-md-6 col-sm-12'>
//           <div className='mb-3'>
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               type='text'
//               class='form-control'
//               id='password'
//               style={{ marginTop: 20 }}
//             />
//             <button
//               onClick={() => {
//                 updatePass()
//               }}
//               className='btn btn-success m-1'>
//               Update
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
