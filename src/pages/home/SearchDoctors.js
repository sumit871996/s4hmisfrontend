import Input from '../../components/input'
import Button from '../../components/button'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import config from '../../Config'
import DefaultProfile from '../../assets/avatar.png'
import SearchDoctorImage from '../../assets/Image20220928204520.jpg'
import Footer from '../../components/Footer.js'

const SearchDoctor = () => {

  const [searchText, setSearchText] = useState('')

  const[doctorsList, setDoctorsList] = useState([])



  useEffect(()=>{

    loadAllDoctors()
  },[])

  const loadAllDoctors= ()=>{

    axios.get(config.serverURL + "/employee/getAllDoctors").then((response)=>{

      console.log(response)

      setDoctorsList(response.data)

    }).catch((error)=>{
      console.log(error)
    })


  }

  // const fetchImage = (empId)=>{

  //   axios.get(config.serverURL + "/employee/" + empId + "/images").then((response)=>{

  //     console.log(response)
  //     return (config.serverURL + "/employee/" + empId + "/images")

  //   }).catch((error)=>{
  //     console.log(error)
  //   })
  // }


  const searchDoctor = () => {
    if (searchText.length === 0) {
      toast.error('please enter text')
    } else {
      
    }
  }

  return (
    <div style={{backgroundImage : `url(${SearchDoctorImage})`}}>
      <h1 style={{ textAlign: 'center', padding: 20 }}>Find a Doctor</h1>
      <div className='container'><Input
        onChange={(e) => setSearchText(e.target.value)}
        title='' placeholder = 'Enter doctor name....'
      />
      </div>

      {doctorsList.filter((val)=>{
        if(searchText == '')
        {
          return val
        }
        else{
          if(val.firstName.toLowerCase().includes(searchText.toLowerCase()))
          {
          return val
          }
          else{
            if(val.lastName.toLowerCase().includes(searchText.toLowerCase()))
            {
              return val
            }
          }
        }

      }).map((listing) => {
        const imageUrl = config.serverURL + '/employee/' + listing.empId + "/images"
        return (
          <div
            key={listing.phone}
            className='col-md-3'
            style={{
              position: 'relative',
              padding: 20,
              display: 'inline-block',
              cursor: 'pointer',
            }}>
            <img
              alt='No Profile Photo'
              style={{
                height: 250,
                width: '100%',
                display: 'block',
                borderRadius: 10,
              }}
              src={imageUrl}
            />
            <div style={{ marginTop: 20 }}>
              <h5 className='card-title'>{listing.department}</h5>
              <p>
                {listing.firstName.concat(" ").concat(listing.lastName)} 
                <br />
                {listing.speciality}
              </p>
            </div>
          </div>
        )
      })}
    <div><Footer/></div>
    </div>
  )
}

export default SearchDoctor
