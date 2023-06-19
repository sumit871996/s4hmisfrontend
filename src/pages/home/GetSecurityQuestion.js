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

const GetSecurityQuestion = ()=>
{

  const location = useLocation()


  
  const inputData = location.state.questionData;
  
    const[securityQuestion, setSecurityQuestion] = useState(inputData.question)
    const[securityAnswer, setSecurityAnswer] = useState('')
    const[phoneNo, setPhoneNo] = useState(inputData.phoneNo)


  const navigate = useNavigate()

  useEffect(()=>{

    console.log(inputData.question)
    console.log(inputData.phoneNo)
  })
  
  const forgotpassword = ()=>{

    const body = {
      phoneNo,
      securityAnswer
    }

    
    console.log(phoneNo)

    if (securityAnswer.length === 0 ) {
      toast.error('please enter security answer')
    } else
    {
      axios.post(config.serverURL + '/home/forgotpassword', body).then((result)=>
      {
        navigate("/home/setpassword", {state : {phone: phoneNo}})
  
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
        <label >Security Question</label>
        <input type='text' className='form-control' defaultValue={securityQuestion}  disabled
        id='exampleInputPassword1'/>
      </div>
      <div className='mb-3'>
        <label >Security Answer</label>
        <input type='text' className='form-control'
        onChange={(event)=>setSecurityAnswer(event.target.value)}
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

export default GetSecurityQuestion