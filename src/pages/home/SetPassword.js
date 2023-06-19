import { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import NavBar2 from '../../components/Navbar2.js'
import HospitalLogin from '../../assets/Hospital-HD.jpg'
import '../../components/Form.css'
import Footer from '../../components/Footer.js'
import {toast} from 'react-toastify'
import config from '../../Config.js'
import Homepagebackground from '../../assets/Homepagebackground.jpg'
import { useLocation } from 'react-router-dom'

const SetPassword = ()=>
{

  const location = useLocation()


  
  const phoneNo = location.state.phone;
  
    const[password, setPassword] = useState('')
    const[cpassword, setCPassword] = useState('')
    const[phone, setPhoneNo] = useState(phoneNo)


  const navigate = useNavigate()

  useEffect(()=>{


  })
  
  const setpassword = ()=>{

    const body = {
      phone,
     password
    }


    if (password.length === 0 ) {
      toast.error('please enter password')
    } else if (cpassword.length === 0 ) {
        toast.error('please enter password confirmation')
      } else if (cpassword != password ) {
        toast.error('password and confirm password not matching!')
      } else
    {
      axios.put(config.serverURL + '/home/setpassword', body).then((result)=>
      {
        toast.success("Password changed successfully!!")
        navigate("/home/signin")
  
      }).catch((error)=>{
        console.log(error.response.data)
        if(error.response.data == 'Bad credentials')
        toast.error('Invalid Credentials!!!')
      })
    }
  }
  
  


    return (
      <div><div>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
        <i className='bi bi-facebook ' style={styles.icons}></i>
            <i className='bi bi-twitter' style={styles.icons}></i>
            <i className='bi bi-whatsapp' style={styles.icons}></i>
            <i className='bi bi-instagram' style={styles.icons}></i>
        </div>
        
      </section>
      <div style={{backgroundImage : `url(${HospitalLogin})`, height:800}}>
      <div className='container p-5 customform' style={{width:500, height:450, position:'relative', bottom:50, top:100}}>
      <div className='mb-3'>
        <label >Phone Number</label>
        <input type='text' className='form-control' defaultValue={phone} disabled
        id='exampleInputPassword1'/>
      </div>
      <div className='mb-3'>
        <label >New Password</label>
        <input type='password' className='form-control'
        onChange={(event)=>setPassword(event.target.value)}
        id='exampleInputPassword1'/>
      </div>

      <div className='mb-3'>
        <label >Confirm Password</label>
        <input type='password' className='form-control'
        onChange={(event)=>setCPassword(event.target.value)}
        id='exampleInputPassword1'/>
      </div>

      <button style={{width:150, marginTop:10}} type='submit' className='btn btn-primary' onClick={setpassword}>Submit</button>
    </div>
    <div className='col-md-12' style={{marginTop:200}} ><Footer/></div>
    </div>
      <div>
      <div className='mt-50 ' style={{backgroundImage: `url(${Homepagebackground})` , justifyContent:'flex-end',  display: 'inline-block'}}>

        </div>
      </div>
      <div><Footer/></div>
      
    </div></div>
      
    )
}



const styles = {
  icons: {
    padding: '10px',
  },
  content: {
    backgroundColor: '#DFDCE3',
    alignContent: 'center',
    margin: 0,
  },
}

export default SetPassword