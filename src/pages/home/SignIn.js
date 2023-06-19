import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar2 from '../../components/Navbar2.js'
import HospitalLogin from '../../assets/Hospital-HD.jpg'
import '../../components/Form.css'
import Footer from '../../components/Footer.js'
import {toast} from 'react-toastify'
import { useDispatch} from 'react-redux'
import {signinUser} from '../../slices/authSlice'
import config from '../../Config'

const SignIn = ()=>
{

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const login = ()=>{
    const body = {
      phone,
      password
    }

    if((phone.length === 0) &&(password.length === 0)) {
      toast.error('Please enter all fields!!')
    } else

    if (phone.length === 0 || phone.length != 10) {
      toast.error('please enter valid phone number')
    } else if (password.length === 0 ) {
      toast.error('please enter valid password')
    } else
    {
    axios.post(config.serverURL+'/auth/signin', body).then((result)=>
    {
      console.log(result)
      const storeValues = result.data
      if(result.status){

        dispatch(signinUser(storeValues))

      //saving data in session storage
      // sessionStorage['userId'] = result.data.id
      // sessionStorage['token'] = result.data.token
      // sessionStorage['role'] = result.data.role
    
      
    
    }



      if(result.data.role === "ROLE_PATHOLOGIST")
    {
      toast.success("Logged in successfully!!")
      navigate("/pathologist/dashboard")
    }
      else
      if(result.data.role === "ROLE_DOCTOR")
    { toast.success("Logged in successfully!!")
      navigate("/doctor/dashboard")
    }
      else
      if(result.data.role === "ROLE_RECEPTIONIST")
    { toast.success("Logged in successfully!!")
      navigate("/reception/dashboard/myProfile")
    } else
      if(result.data.role === "ROLE_ADMIN")
    {
      toast.success("Logged in successfully!!")
      navigate("/admin/dashboard")
    } else
      if(result.data.role === "ROLE_PATIENT")
      {
      toast.success("Logged in successfully!!")
      navigate("/patient/dashboard")
      }
      else
      toast.error("Invalid credentials")

    }).catch((error)=>{
      console.log(error.response.data)
      if(error.response.data == 'Bad credentials')
      toast.error('Invalid Credentials!!!')
    })
  }
  
  }

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')


    return (
      <div style={{backgroundImage : `url(${HospitalLogin})`, height:800}}>
      <div className='container p-5 customform' style={{width:500, height:450, position:'relative', bottom:50, top:100}}>
      <div className='mb-3' style={{}}>
        <label className='mt-5' >Phone Number</label>
        <input type='text' className='form-control' 
        onChange={(event)=>setPhone(event.target.value)}
        id='exampleInputPhone' />
        <div id='phoneHelp' className='form-text'>
          We'll never share your phone number with anyone else.</div>
      </div>
      <div className='mb-3'>
        <label >Password</label>
        <input type='password' className='form-control' 
        onChange={(event)=>setPassword(event.target.value)}
        id='exampleInputPassword1'/>
      </div>

      <div>Dont have a account?? Sign up here:<strong><a style={{textDecoration : 'none'}} href='/home/SignUp'> Sign Up... </a></strong></div>
      <div>Forgot password??<strong><a style={{textDecoration : 'none'}} href='/home/forgotpassword'> Click here...</a></strong></div>
      <button style={{width:150, marginTop:10}} type='submit' className='btn btn-primary' onClick={login}>Sign In</button>
    </div>
    <div className='col-md-12' style={{marginTop:200}} ><Footer/></div>
    </div>
    )
}

export default SignIn