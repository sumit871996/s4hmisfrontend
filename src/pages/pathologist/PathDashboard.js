import { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../Config'
import { toast } from 'react-toastify'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import UploadImage from './uploadImage'

const PathDashboard = () => {
  const [appointments, setAppointments] = useState([])

  const navigate = useNavigate()
  useEffect(() => {
    getUpcommingAppointments()
  }, [])

  const getUpcommingAppointments = () => {
    // {{URL}}/pathologist/pathologist/5
    axios
      .get(
        config.serverURL + '/pathologist/tests/' + sessionStorage['userId'],
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage['token'],
          },
        }
      )
      .then((response) => {
        const result = response.data
        console.log(result)
        setAppointments(result)
      })
      .catch((e) => console.log(e))
  }
  return (
    <div className="col main  mt-3" style={{height:635, overflow:'auto'}}>
    <div className='col main  mt-2'>
      <div className='row mb-3'></div>

      <div className='table-responsive'>
        <table className='table table-hover'>
          <thead className='thead-light table-dark'>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Blood Group</th>
              <th>gender</th>
              <th>DOB</th>

              <th>Doctor Id</th>
              <th>Test Name</th>
              <th>Date of Appointment</th>
              <th>Treatment Slot</th>
              <th>Action</th>
            </tr>
          </thead>

          {
            <tbody>
              {appointments && appointments.length !== 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment.reportNumber}>
                    <td>
                      {appointment.patient_details.firstName +
                        ' ' +
                        appointment.patient_details.lastName}
                    </td>
                    <td>{appointment.patient_details.phone}</td>
                    <td>{appointment.patient_details.bloodGroup}</td>
                    <td>{appointment.patient_details.gender}</td>
                    <td>{appointment.patient_details.dateOfBirth}</td>
                    <td>{appointment.empId}</td>
                    <td>{appointment.testName}</td>
                    <td>{appointment.dateOfArrivalTest}</td>
                    <td>{appointment.testSlot}</td>
                    <td>
                      <button
                        className='btn btn-outline-warning'
                        //  navigate('/admin/updateEmployee', { state: { empdetails: emp } })
                        onClick={() => {
                          navigate('/pathologist/testReport/', {
                            state: { testDetails: appointment },
                          })
                        }}>
                        view more
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No Appointments </td>
                  <td>No Appointments </td>
                  <td>No Appointments </td>
                  <td>No Appointments </td>
                  <td>No Appointments </td>
                  <td>No Appointments </td>
                  <td>No Appointments </td>
                  <td>No Appointments </td>
                  <td>No Appointments </td>
                  <td>No Appointments </td>
                  {/* <td>No Appointments </td> */}
                </tr>
              )}
            </tbody>
          }
        </table>
      </div>
    </div>
    </div>
  )
}

export default PathDashboard
