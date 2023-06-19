import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import config from '../../Config'
import { toast } from 'react-toastify'

export default function GetAllEmployees() {
  const navigate = useNavigate()
  const [employees, setEmployees] = useState([])
  const [isDeleted, setIsDeleted] = useState(false)

  // const header = {
  //   headers: { Authorization: 'Bearer ' + sessionStorage['token'] },
  // }

  const getAllEmployees = () => {
    axios
      .get(config.serverURL + '/admin/getAllEmployees', {
        headers: {
          Authorization: 'Bearer ' + sessionStorage['token'],
        },
      })
      .then((response) => {
        console.log(response.data)
        setEmployees(response.data)
      })
  }

  useEffect(() => {
    getAllEmployees()
  }, [isDeleted])

  const addEmployee = () => {
    navigate('/admin/AddEmployee')
  }

  const delEmpApi = (empId) => {
    axios
      .delete(config.serverURL + `/admin/deleteEmployee/${empId}`, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage['token'],
        },
      })
      .then((response) => {
        console.log(response.data)
        setIsDeleted(true)
        navigate('/admin/GetAllEmployees')
      })
  }

  const deleteEmp = (empId) => {
    delEmpApi(empId)
  }

  //modify-->
  const updateEmp = (emp) => {
    navigate('/admin/updateEmployee', { state: { empdetails: emp } })
  }

  return (
    // style={{ marginLeft: 200 }}>

    <div className='col main pt-5 mt-3' style={{ marginLeft:20, height:635, overflow:'auto'}}>
      <div className='row mb-3'></div>
      <div style={{ marginLeft: 100, marginTop: 20 }}>
        <button className='btn btn-warning mb-5' onClick={addEmployee}>
          AddEmployee
        </button>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>EmpId</th>
            <th scope='col'>FirstName</th>
            <th scope='col'>LastName</th>
            <th scope='col'>Phone</th>
            {/* <th scope='col'>Email</th> */}
            <th scope='col'>BloodGroup</th>
            <th scope='col'>Education</th>
            <th scope='col'>Speciality</th>
            <th scope='col'>Department</th>
            <th scope='col'>Role</th>
            <th scope='col'>delete</th>
            <th scope='col'>update</th>
          </tr>
        </thead>

        <tbody>
          {employees && employees.length > 0 ? (
            employees.map((e) => {
              return (
                <tr key={e.phone}>
                  <th scope='row'>{e.empId}</th>
                  <td>{e.firstName}</td>
                  <td>{e.lastName}</td>
                  <td>{e.phone}</td>
                  {/* <td>{e.email}</td> */}
                  <td>{e.bloodGroup}</td>
                  <td>{e.education}</td>
                  <td>{e.speciality}</td>
                  <td>{e.department}</td>
                  <td>{e.role}</td>
                  <td>
                    <div className='mb-3'>
                      <button
                        onClick={() => {
                          deleteEmp(e.empId)
                        }}
                        className='btn btn-danger'
                        style={{ marginTop: 20 }}>
                        delete
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className='mb-3'>
                      <button
                        onClick={() => {
                          updateEmp(e)
                        }}
                        className='btn btn-success'
                        style={{ marginTop: 20 }}>
                        modify
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td>No employees at present</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

{
  /* <div className='mb-3'>
<button
  onClick={addEmp}
  className='btn btn-success'
  style={{ marginTop: 20 }}>
  Add Employee
</button> */
}
