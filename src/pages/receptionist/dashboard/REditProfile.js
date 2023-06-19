import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import config from '../../../Config'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { signinUser } from '../../../slices/authSlice'

export default function REditProfile() {
  const location = useLocation()
  const { empdetails } = location.state
  console.log(empdetails)
  const navigate = useNavigate()
  const bg =
    empdetails.bloodGroup == null ? 'ABPOSITIVE' : empdetails.bloodGroup
  const gen = empdetails.gender == null ? 'MALE' : empdetails.gender

  const [empId, setEmpId] = useState(sessionStorage['userId'])
  const [firstName, setFirstName] = useState(empdetails.firstName)
  const [lastName, setLastName] = useState(empdetails.lastName)
  const [phone, setPhone] = useState(empdetails.phone)
  const [email, setEmail] = useState(empdetails.email)
  const [bloodGroup, setBloodGroup] = useState(bg)
  const [gender, setGender] = useState(gen)
  const [profilePhoto, setprofilePhoto] = useState([])
  const [dob, setDob] = useState(empdetails.dateOfBirth)
  const [buildingName, setBuildingName] = useState(empdetails.buildingName)
  const [streetName, setStreetName] = useState(empdetails.streetName)
  const [city, setCity] = useState(empdetails.city)
  const [state, setState] = useState(empdetails.state)
  const [pinCode, setPinCode] = useState(empdetails.pinCode)
  const [securityQuestion, setSecurityQuestion] = useState(
    empdetails.securityQuestion
  )
  const [securityAnswer, setSecurityAnswer] = useState(
    empdetails.securityAnswer
  )
  const [file, setFile] = useState()

  const header = {
    headers: { Authorization: 'Bearer ' + sessionStorage['token'] },
  }
  const editProfile = () => {
    const body = {
      firstName,
      lastName,
      phone,
      email,
      bloodGroup,
      gender,
      buildingName,
      dateOfBirth: dob,
      streetName,
      city,
      state,
      pinCode,
      securityQuestion,
      securityAnswer,
    }

    console.log(body)
    function calculateAge(dob, dt) {
      dt = dt || new Date()
      var diff = dt.getTime() - new Date(dob).getTime()
      return Math.floor(diff / (1000 * 60 * 60 * 24))
    }

    const age = calculateAge(dob)

    if (
      firstName.length === 0 &&
      lastName.length === 0 &&
      dob.length === 0 &&
      phone.length === 0 &&
      email.length === 0
    ) {
      toast.error('Please enter all necessory fields!!')
    } else if (firstName.length === 0) {
      toast.error('please enter first name')
    } else if (lastName.length === 0) {
      toast.error('please enter last name')
    } else if (dob.length === 0 || age < 0) {
      toast.error('please enter valid date of birth')
    } else if (age < 0) {
      toast.error('Please select valid date of birth')
    } else if (phone.length !== 10) {
      toast.error('please enter valid  phone number')
    } else {
      axios
        .put(
          config.serverURL +
            `/reception/updateDetails/${sessionStorage['userId']}`,
          body,
          header
        )
        .then((response) => {
          console.log(response)
          toast.success('Profile edited successfully!!!')
          navigate('/reception/dashboard/myProfile')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  const dispatch = useDispatch()

  useEffect(() => {
    if (sessionStorage['token'] && sessionStorage['token'].length > 0) {
      // reading the information from sesssionstorage and manually signing in user
      const user = {
        token: sessionStorage['token'],
        id: sessionStorage['userId'],
        role: sessionStorage['role'],
      }
      dispatch(signinUser(user))
    }
  })

  const uploadImage = () => {
    // FormData is used to send the multipart file
    const body = new FormData()

    // add the file
    body.set('imageFile', file)

    axios
      .post(
        config.serverURL + `/employee/${sessionStorage['userId']}/images`,
        body,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + sessionStorage['token'],
          },
        }
      )
      .then((response) => {
        const result = response.data
        console.log(response)
        toast.success('Image uploaded successfully!!!')
        window.location.reload()
        //navigate('/doctor/myDoctProfile')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    // <div>doct edit profile</div>
    <div className='col main  mt-3' style={{ marginLeft:90, height:635, overflow:'auto'}}>
      <h2 className='mt-3 mb-3 text-secondary' style={{ textAlign: 'left' }}>
        {' '}
        Edit Profile{' '}
      </h2>
      <hr />

      <div className='row'>
      <div className='mb-3'>
            <input
              style={{ width: '360px', display: 'inline-block' }}
              onChange={(e) => {
                // set the selected file in the state
                setFile(e.target.files[0])
              }}
              className='form-control'
              type='file'
            />
            <button
              onClick={uploadImage}
              title='Upload Photo'
              className='btn btn-success m-1'>
              Upload
            </button>
          </div>
        <div className='col-lg-5 col-md-6 col-sm-12'>
         

          <div className='mb-3'>
            <label htmlFor='firstN' className='form-label'>
              First Name
            </label>
            <input
              defaultValue={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              id='firstN'
              type='text'
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='LName' className='form-label'>
              Last Name
            </label>
            <input
              defaultValue={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type='text'
              className='form-control'
              id='LName'
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='phone' className='form-label'>
              Phone No
            </label>
            <input
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
              type='text'
              className='form-control'
              id='phone'
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              className='form-control'
              id='email'
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Blood Group</label>
            <select
              defaultValue={bloodGroup}
              className='form-select'
              aria-label='Default select example'
              onChange={(e) => setBloodGroup(e.target.value)}>
              <option value='ABPOSITIVE'>ABPOSITIVE</option>
              <option value='APOSITIVE'>APOSITIVE</option>
              <option value='BPOSITIVE'>BPOSITIVE</option>
              <option value='OPOSITIVE'>OPOSITIVE</option>
              <option value='ABNEGATIVE'>ABNEGATIVE</option>
              <option value='ANEGATIVE'>ANEGATIVE</option>
              <option value='BNEGATIVE'>BNEGATIVE</option>
              <option value='ONEGATIVE'>ONEGATIVE</option>
            </select>
          </div>

          <div className='mb-3'>
            <label className='form-label'>Gender</label>
            <select
              defaultValue={gender}
              className='form-select'
              aria-label='Default select example'
              onChange={(e) => setGender(e.target.value)}>
              <option value='MALE'>MALE</option>
              <option value='FEMALE'>FEMALE</option>
            </select>
          </div>

          
        </div>
        <div className='col-lg-5 col-md-6 col-sm-12'>
          <div className='mb-3'>
            <label className='form-label'>Building Name</label>
            <input
              defaultValue={buildingName}
              onChange={(e) => setBuildingName(e.target.value)}
              type='text'
              className='form-control'
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Street Name</label>
            <input
              defaultValue={streetName}
              onChange={(e) => setStreetName(e.target.value)}
              type='text'
              className='form-control'
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>City</label>
            <input
              defaultValue={city}
              onChange={(e) => setCity(e.target.value)}
              type='text'
              className='form-control'
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>State</label>
            <input
              defaultValue={state}
              onChange={(e) => setState(e.target.value)}
              type='text'
              className='form-control'
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Pin Code</label>
            <input
              defaultValue={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              type='Number'
              className='form-control'
            />
          </div>

          {/* <div className='mb-3'>
            <label className='form-label'>Security Question</label>
            <input
              defaultValue={securityQuestion}
              onChange={(e) => setSecurityQuestion(e.target.value)}
              type='text'
              className='form-control'
              required
            />
          </div> */}

          {/* <div className='mb-3'>
            <label className='form-label'>Security Answer</label>
            <input
              defaultValue={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              type='text'
              className='form-control'
              required
            />
          </div> */}

<div className='mb-3'>
            <label htmlFor='DOB' className='form-label'>
              Date of Birth
            </label>
            <input
              defaultValue={dob}
              type='date'
              onChange={(e) => setDob(e.target.value)}
              className='form-control'
              id='DOB'
              required
            />
          </div>

          
         
        </div>

        <div className='row'>
          <div className='col-lg-5 col-md-6 col-sm-12'>
            <div className='mb-3' style={{ textAlign: 'left' }}>
              <button
                onClick={editProfile}
                className='btn btn-success'
                style={{ marginTop: 20 }}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
