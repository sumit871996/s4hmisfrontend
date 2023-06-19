import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import config from '../../Config'
import { toast } from 'react-toastify'

export default function AddEmployee() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [bloodGroup, setBloodgroup] = useState('ABPOSITIVE')
  const [gender, setGender] = useState('MALE')
  const [profilePhoto, setProfilePhoto] = useState('null')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [buildingName, setBuildingName] = useState('')
  const [streetName, setStreetName] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [education, setEducation] = useState('')
  const [speciality, setSpeciality] = useState('PHYSICIAN')
  const [department, setDepartment] = useState('ORTHOPEDY')
  const [role, setRole] = useState('ROLE_DOCTOR')

  const navigate = useNavigate()

  const addEmp = () => {
    const body = {
      firstName,
      lastName,
      password,
      phone,
      email,
      bloodGroup,
      gender,
      profilePhoto,
      dateOfBirth,
      buildingName,
      streetName,
      city,
      state,
      pinCode,
      education,
      speciality,
      department,
      role,
    }
    if (
      firstName.length === 0 &&
      lastName.length === 0 &&
      dateOfBirth.length === 0 &&
      phone.length === 0 &&
      password.length === 0
    ) {
      toast.error('Please enter all fields!!')
    } else if (firstName.length === 0) {
      toast.error('please enter first name')
    } else if (lastName.length === 0) {
      toast.error('please enter last name')
    } else if (dateOfBirth.length === 0) {
      toast.error('please enter date of birth')
    } else if (phone.length === 0) {
      toast.error('please enter phone number')
    } else if (password.length === 0) {
      toast.error('please enter password')
    } else {
      axios
        .post(config.serverURL + '/admin/addEmployee', body, {
          headers: {
            Authorization: 'Bearer ' + sessionStorage['token'],
          },
        })
        .then((response) => {
          console.log(response)

          navigate('/admin/GetAllEmployees')
        })
        .catch((response) => {
          console.log('catche ' + response)
          //alert(` ${res.data.message}`)
        })
    }
  }

  return (
    //firstName,lastName,password,phone,email,bloodGroup,gender,profilePhoto,dateOfBirth,buildingName,streetName,city,state,pincode,education,speciality,department,role
    <div className='col main pt-5 mt-3' style={{ marginLeft:200, height:635, overflow:'auto'}}>
      <h5 className='mt-3 mb-3 text-secondary'> Add Employee </h5>

      <div className='row'>
        <div className='col-lg-4 col-md-6 col-sm-12'>
          <div className='mb-3'>
            <label for='firstName' class='form-label'>
              firstName
            </label>
            <input
              onKeyUp={(e) => setFirstName(e.target.value)}
              type='text'
              class='form-control'
              id='firstName'
            />
          </div>

          <div className='mb-3'>
            <label for='lastName' class='form-label'>
              lastName
            </label>
            <input
              onKeyUp={(e) => setLastName(e.target.value)}
              type='text'
              class='form-control'
              id='lastName'
            />
          </div>

          <div className='mb-3'>
            <label for='password' class='form-label'>
              password
            </label>
            <input
              onKeyUp={(e) => setPassword(e.target.value)}
              type='password'
              class='form-control'
              id='password'
            />
          </div>

          <div className='mb-3'>
            <label for='phone' class='form-label'>
              phone
            </label>
            <input
              onKeyUp={(e) => setPhone(e.target.value)}
              type='text'
              class='form-control'
              id='phone'
            />
          </div>

          <div className='mb-3'>
            <label for='email' class='form-label'>
              email
            </label>
            <input
              onKeyUp={(e) => setEmail(e.target.value)}
              type='text'
              class='form-control'
              id='email'
            />
          </div>
          <div className='mb-3'>
            <label for='bloodGroup' class='form-label'>
              bloodGroup
            </label>
            <select
              class='form-select'
              aria-label='Default select example'
              onChange={(e) => setBloodgroup(e.target.value)}>
              <option value='1'>ABPOSITIVE</option>
              <option value='2'>APOSITIVE</option>
              <option value='3'>BPOSITIVE</option>
              <option value='4'>OPOSITIVE</option>
              <option value='5'>ABNEGATIVE</option>
              <option value='6'>ANEGATIVE</option>
              <option value='7'>BNEGATIVE</option>
              <option value='8'>ONEGATIVE</option>
            </select>
          </div>
          <div className='mb-3'>
            <label for='gender' class='form-label'>
              gender
            </label>

            <select
              class='form-select'
              aria-label='Default select example'
              onChange={(e) => setGender(e.target.value)}>
              <option value='1'>MALE</option>
              <option value='2'>FEMALE</option>
              <option value='3'>OTHER</option>
            </select>
          </div>

          <div className='mb-3'>
            <label for='role' class='form-label'>
              role
            </label>
            <select
              class='form-select'
              aria-label='Default select example'
              onChange={(e) => setRole(e.target.value)}>
              <option value='ROLE_DOCTOR'>ROLE_DOCTOR</option>
              <option value='ROLE_PATHOLOGIST'>ROLE_PATHOLOGIST</option>
              <option value='ROLE_ADMIN'>ROLE_ADMIN</option>
              <option value='ROLE_RECEPTIONIST'>ROLE_RECEPTIONIST</option>
            </select>
          </div>

          <div className='mb-3'>
            <label for='dateOfBirth' class='form-label'>
              dateOfBirth
            </label>
            <input
              onChange={(e) => setDateOfBirth(e.target.value)}
              type='date'
              class='form-control'
              id='dateOfBirth'
            />
          </div>
        </div>

        <div className='col-lg-4 col-md-6 col-sm-12'>
          <div className='mb-3'>
            <label for='buildingName' class='form-label'>
              buildingName
            </label>
            <input
              onChange={(e) => setBuildingName(e.target.value)}
              type='text'
              class='form-control'
              id='buildingName'
            />
          </div>
          <div className='mb-3'>
            <label for='streetName' class='form-label'>
              streetName
            </label>
            <input
              onKeyUp={(e) => setStreetName(e.target.value)}
              type='text'
              class='form-control'
              id='streetName'
            />
          </div>
          <div className='mb-3'>
            <label for='city' class='form-label'>
              city
            </label>
            <input
              onKeyUp={(e) => setCity(e.target.value)}
              type='text'
              class='form-control'
              id='city'
            />
          </div>

          <div className='mb-3'>
            <label for='state' class='form-label'>
              state
            </label>
            <input
              onKeyUp={(e) => setState(e.target.value)}
              type='text'
              class='form-control'
              id='state'
            />
          </div>

          <div className='mb-3'>
            <label for='pinCode' class='form-label'>
              pinCode
            </label>
            <input
              onKeyUp={(e) => setPinCode(e.target.value)}
              type='text'
              class='form-control'
              id='pinCode'
            />
          </div>

          <div className='mb-3'>
            <label for='education' class='form-label'>
              education
            </label>
            <input
              onKeyUp={(e) => setEducation(e.target.value)}
              type='text'
              class='form-control'
              id='education'
            />
          </div>

          {/* <div className='mb-3'>
            <label for='speciality' class='form-label'>
              speciality
            </label>
            <input
              onChange={(e) => setSpeciality(e.target.value)}
              type='text'
              class='form-control'
              id='speciality'
            />
          </div> */}

          <div className='mb-3'>
            <label for='speciality' class='form-label'>
              speciality
            </label>
            <select
              class='form-select'
              aria-label='Default select example'
              onChange={(e) => setSpeciality(e.target.value)}>
              <option value='PHYSICIAN'>PHYSICIAN</option>
              <option value='NEUOROSURGEON'>NEUOROSURGEON</option>
              <option value='GENERAL_SURGEON'>GENERAL_SURGEON</option>
              <option value='CARDIAC_SURGEON'>CARDIAC_SURGEON</option>
              <option value='ENT_SPECIALIST'>ENT_SPECIALIST</option>
              <option value='SKIN_EXPERT'>SKIN_EXPERT</option>
              <option value='ORTHOPEDIC_SURGEON'>ORTHOPEDIC_SURGEON</option>
              <option value='PATHOLOGIST'>PATHOLOGIST</option>
              <option value='ADMINISTRATION'>ADMINISTRATION</option>
              <option value='RECEPTIONIST'>RECEPTIONIST</option>
            </select>
          </div>

          <div className='mb-3'>
            <label for='department' class='form-label'>
              department
            </label>
            <select
              class='form-select'
              aria-label='Default select example'
              onChange={(e) => setDepartment(e.target.value)}>
              <option value='ORTHOPEDY'>ORTHOPEDY</option>
              <option value='SKIN'>SKIN</option>
              <option value='ENT'>ENT</option>
              <option value='DENTAL'>DENTAL</option>
              <option value='NEUROLOGY'>NEUROLOGY</option>
              <option value='RADIOLOGY'>RADIOLOGY</option>
              <option value='RECEPTION'>RECEPTION</option>
              <option value='MEDICINE'>MEDICINE</option>
              <option value='PATHOLOGY'>PATHOLOGY</option>
            </select>
          </div>

         
        </div>
        <div className='mb-3'>
          <button
            onClick={addEmp}
            className='btn btn-success'
            style={{ marginTop: 20 }}>
            Add Employee
          </button>
        </div>
      </div>
    </div>
  )
}
