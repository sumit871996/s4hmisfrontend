import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import config from '../../Config'
import { toast } from 'react-toastify'

export default function UpdateEmployee() {
  const location = useLocation()
  const navigate = useNavigate()
  const { empdetails } = location.state
  const [empId, setempId] = useState(empdetails.empId)
  const [changePassword, setChangePassword] = useState()

  const [firstName, setFirstName] = useState(empdetails.firstName)
  const [lastName, setLastName] = useState(empdetails.lastName)
  const [password, setPassword] = useState(empdetails.password)
  const [phone, setPhone] = useState(empdetails.phone)
  const [email, setEmail] = useState(empdetails.email)
  const [bloodGroup, setBloodgroup] = useState(empdetails.bloodGroup)
  const [gender, setGender] = useState(empdetails.gender)
  const [profilePhoto, setProfilePhoto] = useState(empdetails.profilePhoto)
  const [dateOfBirth, setDateOfBirth] = useState(empdetails.dateOfBirth)
  const [buildingName, setBuildingName] = useState(empdetails.buildingName)
  const [streetName, setStreetName] = useState(empdetails.streetName)
  const [city, setCity] = useState(empdetails.city)
  const [state, setState] = useState(empdetails.state)
  const [pinCode, setPinCode] = useState(empdetails.pinCode)
  const [education, setEducation] = useState(empdetails.education)
  const [speciality, setSpeciality] = useState(empdetails.speciality)
  const [department, setDepartment] = useState(empdetails.department)
  const [role, setRole] = useState(empdetails.role)

  const updateEmp = () => {
    console.log(empId)
    console.log(password)
    const body = {
      empId,
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
        .put(config.serverURL + '/admin/updateEmployee', body, {
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
  const changePass = () => {
    console.log(empdetails.empId)
    console.log(changePassword)
    const body = {
      changePassword
    }
    axios
      .put(config.serverURL + '/admin/changeEmpPass/' + empId, body, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage['token'],
        },
      })
      .then((response) => {
        const result = response.data
        console.log(response)
        toast.success('password updated successfully!!!')
      })
      .catch((e) => {
        console.log(e)
      })
  }
  // const updatePass = () => {
  //   navigate('/admin/updatePassword', { state: { Id: empId } })
  // }

  return (
    //firstName,lastName,password,phone,email,bloodGroup,gender,profilePhoto,dateOfBirth,buildingName,streetName,city,state,pincode,education,speciality,department,role
    // <div className='col main pt-5 mt-3' style={{ marginLeft: 200 }}>
    //   <h5 className='mt-3 mb-3 text-secondary'> Modify Employee </h5>

    //   <div className='row'>
    //     <div className='col-lg-4 col-md-6 col-sm-12'>
    //       <div className='mb-3'>
    //         <label for='firstName' class='form-label'>
    //           firstName
    //         </label>
    //         <input
    //           value={firstName}
    //           onKeyUp={(e) => setFirstName(e.target.value)}
    //           type='text'
    //           class='form-control'
    //           id='firstName'
    //         />
    //       </div>

    //       <div className='mb-3'>
    //         <button
    //           //  onClick={addEmp}
    //           className='btn btn-success'
    //           style={{ marginTop: 20 }}>
    //           Modify Employee
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    //for all fields

    <div className='col main pt-5' style={{ marginLeft:60, height:635, overflow:'auto'}}>
      <h5 className='mt-3 mb-3 text-secondary'> Modify Employee </h5>

      <hr></hr>

      <div className='row' style={{justifyContent:'center'}}>
        <div style={{justifyContent:'flex-end'}}>
          <div className='mb-3'><input
            id='changePassword'
            style={{ width: '360px', display:'inline-block' }}
            onChange={(e) => {
              setChangePassword(e.target.value)
            }}
            className='form-control'
            type='password'
          />
          </div>
          <button
            onClick={changePass}
            title='Change Password'
            className='btn btn-success m-1'>
            Change Password
          </button>
          </div>
        <div className='mb-3'>
          
        </div>
        <div className='col-lg-4 col-md-6 col-sm-12'>
          <div className='mb-3'>
            <label for='firstName' class='form-label'>
              firstName
            </label>
            <input
              defaultValue={firstName}
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
              //   value={lastName}
              defaultValue={lastName}
              onKeyUp={(e) => setLastName(e.target.value)}
              type='text'
              class='form-control'
              id='lastName'
            />
          </div>

          {/* <div className='mb-3'>
            <label for='password' class='form-label'>
              password
            </label>
            <input
              //defaultValue={password}
              onKeyUp={(e) => setPassword(e.target.value)}
              // type='password'
              class='form-control'
              id='password'
            />
          </div> */}

          <div className='mb-3'>
            <label for='phone' class='form-label'>
              phone
            </label>
            <input
              defaultValue={phone}
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
              defaultValue={email}
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
              defaultValue={bloodGroup}
              onChange={(e) => setBloodgroup(e.target.value)}>
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
            <label for='gender' class='form-label'>
              gender
            </label>

            <select
              class='form-select'
              aria-label='Default select example'
              defaultValue={gender}
              onChange={(e) => setGender(e.target.value)}>
              <option value='MALE'>MALE</option>
              <option value='FEMALE'>FEMALE</option>
              <option value='OTHER'>OTHER</option>
            </select>
          </div>

          <div className='mb-3'>
            <label for='dateOfBirth' class='form-label'>
              dateOfBirth
            </label>
            <input
              defaultValue={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              type='date'
              class='form-control'
              id='dateOfBirth'
            />
          </div>
          <div className='mb-3'>
            <label for='buildingName' class='form-label'>
              buildingName
            </label>
            <input
              defaultValue={buildingName}
              onChange={(e) => setBuildingName(e.target.value)}
              type='text'
              class='form-control'
              id='buildingName'
            />
          </div>
        </div>

        <div className='col-lg-4 col-md-6 col-sm-12'>
          <div className='mb-3'>
            <label for='streetName' class='form-label'>
              streetName
            </label>
            <input
              defaultValue={streetName}
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
              defaultValue={city}
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
              defaultValue={state}
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
              defaultValue={pinCode}
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
              defaultValue={education}
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
              defaultValue={speciality}
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
              defaultValue={department}
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

          <div className='mb-3'>
            <label for='role' class='form-label'>
              role
            </label>
            <select
              class='form-select'
              aria-label='Default select example'
              defaultValue={role}
              onChange={(e) => setRole(e.target.value)}>
              <option value='ROLE_DOCTOR'>ROLE_DOCTOR</option>
              <option value='ROLE_PATHOLOGIST'>ROLE_PATHOLOGIST</option>
              <option value='ROLE_ADMIN'>ROLE_ADMIN</option>
              <option value='ROLE_RECEPTIONIST'>ROLE_RECEPTIONIST</option>
            </select>
          </div>
        </div>
        <div className='mb-3'>
          {/* <input
            style={{ width: '250px', display: 'inline-block', marginLeft: 20 }}
            onChange={(e) => {
              // set the selected file in the state
              //setFile(e.target.files[0])
            }}
            className='form-control'
            type='text'
          /> */}
          {/* <button
            //onClick={updatePass}
            title='updatePass'
            className='btn btn-warning m-1'
            style={{ marginTop: 20 }}
            onClick={() => {
              updatePass({ empId })
            }}> */}
          {/* update Password
          </button> */}
        </div>
        <div className='mb-3'>
          <button
            onClick={() => {
              updateEmp()
            }}
            className='btn btn-success'
            // style={{ marginTop: 4 }}
          >
            Modify Employee
          </button>
        </div>
      </div>
    </div>
  )
}
