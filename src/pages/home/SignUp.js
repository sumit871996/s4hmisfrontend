import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar2 from '../../components/Navbar2.js'
import Footer from '../../components/Footer.js'

import HospitalLogin from '../../assets/Hospital-HD.jpg'
import { toast } from 'react-toastify'
import config from '../../Config'

const SignUp = ()=>
{
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [genders, setGenders] = useState(['FEMALE', 'MALE', 'OTHER'])
  const [genderSelected, setGenderSelected] = useState('')
  
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [password, setPassword] = useState('')
  const [securityQuestion, setSecurityQuestion] = useState('')
  const [securityAnswer, setSecurityAnswer] = useState('')
  
  
  const navigate = useNavigate()

  function calculateAge(dob, dt) {
    dt = dt || new Date();
    var diff = dt.getTime() - new Date(dob).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  const signup = ()=>{


    const body = {
    firstName,
    lastName,
    phone,
    password,
    dateOfBirth,
    securityAnswer,
    genderSelected,
    securityQuestion
    }


    const age = calculateAge(dateOfBirth)

    if((firstName.length === 0) && (lastName.length === 0)&& (dateOfBirth.length === 0)&&(phone.length === 0)
    &&(password.length === 0) &&(genderSelected.length === 0)&& (securityQuestion.length === 0)&& (securityAnswer.length === 0)) {
      toast.error('Please enter all fields!!')
    } else


    
    if (firstName.length === 0 ) {
      toast.error('please enter first name')
    } else if (lastName.length === 0) {
      toast.error('please enter last name')
    } else if (dateOfBirth.length === 0) {
      toast.error('please enter date of birth')
    } else if (age < 0) {
      toast.error('Please select valid date of birth')
    } else if (phone.length === 0) {
      toast.error('please enter phone number')
    } else if (phone.length != 10) {  
      toast.error('please enter 10 digit phone number')
    } else if (password.length === 0) {   
      toast.error('please enter password')
    } else if (password.length > 20) {   
      toast.error('password length can not be greater than 20')
    } else if (genderSelected.length === 0) {
      toast.error('please select gender')
    } else if (securityQuestion.length === 0) {
      toast.error('please enter security question for your safety')
    } else if (securityAnswer.length === 0) {
      toast.error('please enter security Answer for your safety')
    } else
    {
    axios.post(config.serverURL + '/auth/signup', body).then((result)=>
    {
      console.log(result)
        toast.success("User added successfully!!!")
      navigate("/home/signin")

    }).catch((error)=>{
      toast.error(error)
    })

    console.log("not submitted")
  }
  
  }




    return (
      <div style={{backgroundImage : `url(${HospitalLogin})`, height:1000}}> 
      <div className='container p-5 customform' style={{width:500, height:800, position:'relative', bottom:50, top:100}}>

      <div className='mb-3 '>
        <label htmlFor='exampleInputFirstName' >First Name</label>
        <input required type='text' className='form-control' 
        onChange={(event)=>setFirstName(event.target.value)}
        id='exampleInputFirstName' />
      </div>
        
      <div className='mb-3'>
        <label >Last Name</label>
        <input htmlFor='exampleInputLastName' required type='text' className='form-control' 
        onChange={(event)=>setLastName(event.target.value)}
        id='exampleInputLastName' />
      </div>

      <div className='mb-3'>
        <label htmlFor='exampleInputPhone' >Phone Number</label>
        <input required type='number' className='form-control' maxLength={{length:10}} 
        onChange={(event)=>setPhone(event.target.value)}
        id='exampleInputPhone' />
        <div id='phoneHelp' className='form-text'>
          We'll never share your phone number with anyone else.</div>
      </div>


      <div className='mb-3'>
        <label htmlFor='exampleInputPassword'>Password</label>
        <input required type='password' className='form-control' 
        onChange={(event)=>setPassword(event.target.value)}
        id='exampleInputPassword'/>
      </div>
      
      <div className='mb-3'>
                        <label htmlFor='gender' className="form-label">Gender</label>
                          <select className="form-select" aria-label="Default select example" onChange={(e)=>setGenderSelected(e.target.value)}>
                                <option id='gender' required >Select Gender</option>
                                {
                                    genders.map((gender)=>{
                                        return(
                                            <option key={gender} value={gender}>
                                                {gender}
                                            </option>
                                        )

                                    })
                                }
                        </select>  
                    </div>

      <div className='mb-3'>
        <label  >Date Of Birth</label>
        <input required type='Date' className='form-control' 
        onChange={(event)=>setDateOfBirth(event.target.value)}
        id='exampleInputDateOfBirth'/>
      </div>

      <div className='mb-3'>
        <label htmlFor='exampleInputSecurityQuestion' >Security Question</label>
        <input required type='text' className='form-control' 
        onChange={(event)=>setSecurityQuestion(event.target.value)}
        id='exampleInputSecurityQuestion'/>
      </div>

      <div className='mb-3'>
        <label htmlFor='exampleInputSecurityAnswer' >Security Answer</label>
        <input required='required' type='text' className='form-control' 
        onChange={(event)=>setSecurityAnswer(event.target.value)}
        id='exampleInputSecurityAnswer'/>
      </div>

      <div>Already have a account?? Sign in here:<strong><a style={{textDecoration : 'none'}} href='/home/SignIn'> Sign In... </a></strong></div>


      <button style={{width:150, marginTop:10}} type='submit' className='btn btn-primary' onClick={signup}>Sign Up</button>
    </div>
    <div className='col-md-12' style={{marginTop:200}}><Footer/></div>
    </div>
    )
}

export default SignUp