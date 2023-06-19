import React from 'react'
import PathSidebar from './PathSidebar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../Config'

export default function PathologistDashboard(props) {
  const [fullName, setFullName] = useState('')

  const header = {
    headers: { Authorization: 'Bearer ' + sessionStorage['token'] },
  }
  const getMydetails = () => {
    axios
      .get(
        config.serverURL + `/pathologist/myDetails/${sessionStorage['userId']}`,
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
    <div className='container-fluid' id='main'>
      <div className='row row-offcanvas row-offcanvas-left'>
        <PathSidebar empName={fullName} />
        {props.children}
      </div>
    </div>
  )
}
