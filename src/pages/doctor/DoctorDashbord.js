import React from 'react'
import DoctSidebar from './DoctSidebar'

import { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../Config'
export default function DoctorDashboard(props) {
  const [fullName, setFullName] = useState('')

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
        setFullName(response.data.firstName + ' ' + response.data.lastName)
      })
  }

  useEffect(() => {
    getMydetails()
  }, [])

  return (
    <div id='main'>
      <div className='row row-offcanvas row-offcanvas-left'>
        <DoctSidebar empName={fullName} />
        {props.children}
      </div>
    </div>
  )
}
