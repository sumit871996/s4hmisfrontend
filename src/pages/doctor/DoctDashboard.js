import { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../Config'
import { toast } from 'react-toastify'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import UploadImage from './uploadImage'

const DoctDashboard = () => {
  const [appointments, setAppointments] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    getUpcommingAppointments()
  }, [])

  const getUpcommingAppointments = () => {
    axios
      .get(
        config.serverURL + '/doctor/treatments/' + sessionStorage['userId'],
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
    <div className='col main  mt-2' style={{height:635, overflow:'auto'}}>
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
              <th> Report No.</th>
              <th>Patient Problem</th>
              <th>patient Note</th>
              <th>Date of Appointment</th>
              <th>Treatment Slot</th>
              <th>Action</th>
            </tr>
          </thead>

          {
            <tbody>
              {appointments && appointments.length !== 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment.reportNumberToSend}>
                    <td>
                      {appointment.patient_details.firstName +
                        ' ' +
                        appointment.patient_details.lastName}
                    </td>
                    <td>{appointment.patient_details.phone}</td>
                    <td>{appointment.patient_details.bloodGroup}</td>
                    <td>{appointment.patient_details.gender}</td>
                    <td>{appointment.patient_details.dateOfBirth}</td>
                    <td>{appointment.reportNumberToSend}</td>
                    <td>{appointment.patientProblem}</td>
                    <td>{appointment.patientNote}</td>
                    <td>{appointment.dateOfAppointment}</td>
                    <td>{appointment.treatmentSlot}</td>
                    <td>
                      <button
                        className='btn btn-outline-warning'
                        onClick={() => {
                          navigate(
                            '/doctor/viewReport/' +
                              appointment.reportNumberToSend
                          )
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
                  <td>No Appointments </td>
                </tr>
              )}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}

export default DoctDashboard
