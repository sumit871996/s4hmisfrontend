import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Input from '../../components/input'

import TextArea from '../../components/textArea'
import config from '../../Config'
import AddDeleteTableRows from './AddDeleteTableRows'
const ViewReport = () => {
  const { id } = useParams()
  const [treatmentStatus, setTreatmentStatus] = useState(false)
  const [patient_details, setPatient_details] = useState({})
  const [patientNote, setPatientNote] = useState('')
  const [patientProblem, setPatientProblem] = useState('')
  const [treatmentName, setTreatmentName] = useState('')
  const [treatmentCharges, setTreatmentCharges] = useState()
  const [doctorRemark, setDoctorRemark] = useState('')
  const [doctorsNote, setDoctorsNote] = useState('')
  const [treatmentResult, setTreatmentResult] = useState('')

  const [bedAllotedForDays, setBedAllotedForDays] = useState(0)

  const [testName, setTestName] = useState('')
  const medicines_list = useSelector(
    (state) => state.MedicineSlice.medicines_list
  )
  const navigate = useNavigate()

  const toggleStatus = () => {
    setTreatmentStatus(!treatmentStatus)
  }
  useEffect(() => {
    if (id) {
      axios
        .get(config.serverURL + '/doctor/viewReport/' + id, {
          headers: {
            Authorization: 'Bearer ' + sessionStorage['token'],
          },
        })
        .then((response) => {
          const result = response.data
          setPatient_details(result['patient_details'])
          setPatientProblem(result['patientProblem'])
          setPatientNote(result['patientNote'])
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [])
  const updateReport = () => {
    const body = {
      treatmentName,
      treatmentCharges,
      doctorRemark,
      doctorsNote,
      treatmentResult,

      bedAllotedForDays,
      treatmentStatus,
      medicines_list,
      testName,
      treatmentStatus,
    }
    console.log(body)
    console.log(patient_details)
    console.log(typeof treatmentName.length)
    console.log(typeof treatmentCharges)
    console.log(typeof medicines_list.length)

    if (
      treatmentName.length === 0 &&
      treatmentCharges === undefined &&
      medicines_list.length === 0
    ) {
      toast.error('Please enter all necessory fields!!')
    } else if (treatmentName.length === 0) {
      toast.error('please enter Treatment Name')
    } else if (treatmentCharges === undefined || treatmentCharges <= 0) {
      toast.error('please enter Treatment Charges greter than 0')
    } else if (medicines_list.length === 0) {
      toast.error('please enter atleast one Priscription')
    } else {
      axios
        .post(config.serverURL + '/doctor/updateReport/' + id, body, {
          headers: {
            Authorization: 'Bearer ' + sessionStorage['token'],
          },
        })
        .then((response) => {
          const result = response.data
          toast.success(result['message'])
          navigate('/doctor/dashboard')
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  return (
    <div className='col main  mt-3' style={{height:635, overflow:'auto'}}>
      <div className='container' style={{ marginTop: 20 }}>
        <h3
          style={{
            paddingRight: '8px',
            textAlign: 'center',
            marginBottom: 50,
          }}>
          View Report
        </h3>
        <div className='row'>
          <div
            className='col'
            style={{
              borderRightStyle: 'solid',
              borderRightColor: 'lightgray',
            }}>
            <div className='row'>
              <div className='col'>
                <Input
                  title='First Name'
                  value={patient_details['firstName']}
                  readOnly
                />
              </div>
              <div className='col'>
                <Input
                  title='Last Name'
                  value={patient_details['lastName']}
                  readOnly
                />
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                <Input
                  title='Phone'
                  value={patient_details['phone']}
                  readOnly
                />
              </div>
              <div className='col  '>
                <Input
                  title='Gender'
                  value={patient_details['gender']}
                  readOnly
                />
              </div>
              <div className='col '>
                <div className='row '>
                  <label htmlFor='bloodgroup' style={{ padding: '10px 20px' }}>
                    Blood Grroup
                  </label>
                  <input
                    id='bloodgroup'
                    className='form-control'
                    value={patient_details['bloodGroup']}
                  />
                </div>
              </div>
            </div>

            <TextArea
              className='mt-5'
              title='Patient Problem'
              value={patientProblem}
            />
            <TextArea title='Patient Note' value={patientNote} />
          </div>
          <div className='col'>
            <Input
              title='Treatment Name'
              onChange={(e) => {
                setTreatmentName(e.target.value)
              }}
            />
            <TextArea
              lines='2'
              title='Doctors Remark'
              onChange={(e) => {
                setDoctorRemark(e.target.value)
              }}
            />
            <TextArea
              lines='3'
              title='Doctors Note'
              onChange={(e) => {
                setDoctorsNote(e.target.value)
              }}
            />
            <div>
              <Input
                type='number'
                title='Treatment Charges'
                onChange={(e) => {
                  setTreatmentCharges(e.target.value)
                }}
              />
            </div>
            <div className='row'>
              <div className='col'>
                <Input
                  placeholder='days'
                  type='number'
                  title=' Bed Allocated'
                  onChange={(e) => {
                    setBedAllotedForDays(e.target.value)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div
            className='col'
            style={{
              marginRight: '0px',
              borderRightStyle: 'solid',
              borderRightColor: 'lightgray',
            }}>
            {/*  "profilePhoto": "jjjj.jpg" */}
            <Input
              title='Test Name'
              onChange={(e) => {
                setTestName(e.target.value)
              }}
            />
            <TextArea
              lines='3'
              title='Treatment Result'
              onChange={(e) => {
                setTreatmentResult(e.target.value)
              }}
            />
          </div>
          <div className='col'>
            <h6 style={{ padding: '10px' }}>Prescriptions</h6>
            <AddDeleteTableRows />
          </div>
        </div>

        <div className='row'>
          <div className='col'></div>
          <div className='col mt-4 pt-3 align-self-center  text-center'>
            <h5> Treatment status</h5>
            {/* <td> {output.bedAvailability ? <button className='btn btn-success' onClick={()=>AllocateBed(output.wardNumber, output.bedNumber)}>Allocate</button> : <button className='btn btn-danger'disabled>Allocated</button> }</td> */}
            <div className='mt-0' style={{ justifyContent: 'center' }}>
              {treatmentStatus ? (
                <button
                  className='btn btn-success'
                  style={styles.button}
                  onClick={toggleStatus}>
                  Success
                </button>
              ) : (
                <button
                  className='btn btn-danger'
                  style={styles.button}
                  onClick={toggleStatus}>
                  Pending
                </button>
              )}
            </div>
          </div>
          <div className='col'></div>
        </div>
        <div className='row'>
          <div className='col mt-4'>
            <button
              onClick={updateReport}
              className='btn'
              style={styles.button1}>
              Update Report
            </button>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  )
}
const styles = {
  button: {
    position: 'relative',
    width: '100%',
    height: 40,
    borderRadius: 5,
    border: 'none',
    marginTop: 10,
  },
  button1: {
    position: 'relative',
    width: '100%',
    height: 40,
    backgroundColor: '#1F6986',
    color: 'white',
    borderRadius: 5,
    border: 'none',
    marginTop: 10,
  },
}
export default ViewReport
