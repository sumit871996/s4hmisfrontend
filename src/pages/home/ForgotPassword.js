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

const ForgotPassword = ()=>
{
  
  
    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[phone, setPhone] = useState('')

  const navigate = useNavigate()


  useEffect(()=>{

  },[])

  
  const forgotpassword = ()=>{

    console.log("Hiiiiiiiiiiii")
    const body = {
      phone,
      firstName,
      lastName
    }

    if((phone.length === 0) &&(firstName.length === 0)&&(lastName.length === 0)) {
      toast.error('Please enter all fields!!')
    } else

    if (phone.length === 0 || phone.length != 10) {
      toast.error('please enter valid phone number')
    } else if (firstName.length === 0 ) {
      toast.error('please enter first name')
    } else
    if (lastName.length === 0 ) {
      toast.error('please enter last name')
    } else
    {
    axios.post(config.serverURL + '/home/getSecurityQ', body).then((result)=>
    {
      if(result.status){
      console.log(result.data)
      console.log(phone)
      const QUData = {
        question : result.data,
        phoneNo : phone,
      }
      navigate("/home/getSecurityQ", {state : {questionData : QUData}})
      }

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
      <div className='mb-3' style={{}}>
        <label className='mt-5' >Phone Number</label>
        <input type='text' className='form-control' 
        onChange={(event)=>setPhone(event.target.value)}
        id='exampleInputPhone' />
        <div id='phoneHelp' className='form-text'>
          We'll never share your phone number with anyone else.</div>
      </div>
      <div className='mb-3'>
        <label >First Name</label>
        <input type='text' className='form-control' 
        onChange={(event)=>setFirstName(event.target.value)}
        id='exampleInputPassword1'/>
      </div>
      <div className='mb-3'>
        <label >Last Name</label>
        <input type='text' className='form-control' 
        onChange={(event)=>setLastName(event.target.value)}
        id='exampleInputPassword1'/>
      </div>

      <button style={{width:150, marginTop:10}} type='submit' className='btn btn-primary' onClick={forgotpassword}>Submit</button>
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

export default ForgotPassword