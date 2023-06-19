import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Input from '../../components/input'

import TextArea from '../../components/textArea'
import config from '../../Config'

const TestReport = () => {
  const location = useLocation()
  const { testDetails } = location.state

  const [patient_details, setPatient_details] = useState(
    testDetails.patient_details
  )

  const [testCharges, setTestCharges] = useState()
  const reportNumber = testDetails.reportNumber
  const [testName, setTestName] = useState(testDetails.testName)
  const [pathologistRemark, setPathologistRemark] = useState('')
  const navigate = useNavigate()

  const updateReport = () => {
    const testStatus = true
    const body = {
      testCharges,
      pathologistRemark,
      testStatus,
    }
    console.log(body)
    console.log(reportNumber)
    console.log(patient_details)
    if (pathologistRemark.length === 0 && testCharges === undefined) {
      toast.error('Please enter all necessory fields!!')
    } else if (pathologistRemark.length === 0) {
      toast.error('please enter Pathologist Remark ')
    } else if (testCharges === undefined || testCharges <= 0) {
      toast.error('please enter Treatment Charges greter than 0')
    } else {
      axios
        .put(
          config.serverURL + '/pathologist/updateReport/' + reportNumber,
          body,
          {
            headers: {
              Authorization: 'Bearer ' + sessionStorage['token'],
            },
          }
        )
        .then((response) => {
          const result = response.data
          toast.success('test report updated successfully')

          navigate('/pathologist/dashboard')
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  return (
    <div className='col main  mt-3' style={{marginLeft:90,height:635, overflow:'auto'}}>
      <div style={{ marginTop: 20 }}>
        <h3
          style={{
            paddingRight: '8px',
            textAlign: 'center',
            marginBottom: 50,
          }}>
          Test Report
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
                  readOnly='true'
                />
              </div>
              <div className='col'>
                <Input
                  title='Last Name'
                  value={patient_details['lastName']}
                  readOnly='true'
                />
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                <Input
                  title='Phone'
                  value={patient_details['phone']}
                  readOnly='true'
                />
              </div>
              <div className='col  '>
                <Input
                  title='Gender'
                  value={patient_details['gender']}
                  readOnly='true'
                />
              </div>
              <div className='col '>
                <div className='row ' style={{ textAlign: 'left' }}>
                  <label htmlFor='bloodgroup' style={{ padding: '10px 20px' }}>
                    Blood Grroup
                  </label>
                  <input
                    id='bloodgroup'
                    className='form-control'
                    value={patient_details['bloodGroup']}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col'>
            <Input title='Test Name' value={testName} readOnly='true' />

            <div>
              <Input
                type='number'
                title='Test Charges'
                onChange={(e) => {
                  setTestCharges(e.target.value)
                }}
              />
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
            <TextArea
              lines='3'
              title='Pathologist Remark'
              onChange={(e) => {
                setPathologistRemark(e.target.value)
              }}
            />
          </div>
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
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
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
export default TestReport
