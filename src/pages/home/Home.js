import { Link } from 'react-router-dom'
import Navbar2 from '../../components/Navbar2.js'
import Slider from './Slider.js'
import OurSpecialitiesGallery from '../../components/OurSpecialitiesGallery.js'
import { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../Config'
import Footer from '../../components/Footer.js'
import Homepagebackground from '../../assets/Homepagebackground.jpg'
import '../../components/blurrImage.css'
import EmergencyNo from '../home/emergencyNo'

const Home = () => {


  const[homeStaticInfo, setHomeStaticInfo] = useState([])
  const[speciality_enum, setSpeciality_enum ] = useState([])


  useEffect(()=>{
    axios.get(config.serverURL + "/home").then((response)=>{

      console.log(response.data)

      const result = response.data
      setSpeciality_enum(result.speciality_enum)
    }).catch((error)=>{
      console.log(error)
    })


  },[])
  return (
    <div>
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
      <div style={{}}><EmergencyNo/></div>
      <hr></hr>

      <div><Slider /></div>
      <div>
      <div className='mt-50 ' style={{backgroundImage: `url(${Homepagebackground})` , justifyContent:'flex-end',  display: 'inline-block'}}>
        <div>
        <div className='mt-3'><i style={{fontSize:50, fontFamily: 'fantasy'}}>Our Experties </i></div>
       <OurSpecialitiesGallery specialities = {speciality_enum}/>
        </div>

        </div>
      </div>
      <div><Footer/></div>
      
    </div>
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
export default Home
