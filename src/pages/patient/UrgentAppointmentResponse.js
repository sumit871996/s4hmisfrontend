import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import config from "../../Config"
import KiraHug from '../../assets/KiraHug.jpg'

const UrgentAppointmentResponse = ()=>{
    const location = useLocation()
    
    const[reportN, setRemoteN] = useState(0)
    
    const[timeSlot, setTimeSlot] = useState('')
    const[dateOfAppointment, setDateOfAppointment] = useState('')
    
    const[wardNumber, setWardNumber] = useState('')
    const[bedNumber, setBedNumber] = useState(0)
    
    
    useEffect(()=>{
        
        const Report_Response = location.state


        // console.log("Hi")
        // console.log(Report_Response)

        // console.log(Report_Response.Report_Response.reportNumber)

        setRemoteN(Report_Response.Report_Response.reportNumber)
        setWardNumber(Report_Response.Report_Response.wardNumber)
        setBedNumber(Report_Response.Report_Response.bedNumber)
        setTimeSlot(Report_Response.Report_Response.treatmentSlot)
        setDateOfAppointment(Report_Response.Report_Response.dateOfAppointment)


        // axios.get(config.serverURL + "/reception/getBill/" +location.state.reportNumber,
        // {
        //     headers : {
        //         'Authorization' : 'Bearer ' + sessionStorage['token']
        //     }
        // } ).then((response)=>{

            // const result = response.data
            // console.log(response.data)    
        //     },0)

        // }).catch((error)=>{
        //     console.log(error)
        // })
    },[])

return (
    <div className="col main pt-5 mt-1" style={{marginLeft:90, height:620, overflow:'auto'}}>

        <div className="row mb-3" style={{justifyContent:'center'}}>

        <div className="col-xl-10 col-sm-6 py-2">
                <div className="card text-white bg-danger h-100">
                    <div className="card-body bg-success">
                        <div className="rotate">
                            <i className="fa fa-list fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Report Number</h6>
                        <h1 className="display-8" style={{paddingTop:20}}>{reportN}</h1>
                    </div>
                </div>
            </div>

            <div className="col-xl-5 col-sm-6 py-2">
                <div className="card bg-success text-white h-100">
                    <div className="card-body bg-secondary" style={{backgroundColor:"#57b960"}}>
                        <div className="rotate">
                            <i className="fa fa-user fa-4x"></i>
                        </div>
                       
                        <h6 className="text-uppercase">Ward Number</h6>
                        <h1 className="display-8" style={{paddingTop:20}}>{wardNumber}</h1>
                    </div>
                </div>
            </div>
           
            <div className="col-xl-5 col-sm-6 py-2">
                <div className="card text-white bg-info h-100">
                    <div className="card-body bg-info">
                        <div className="rotate">
                          <i className="fab fa-twitter fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Bed Number</h6>
                        <h1 className="display-8" style={{paddingTop:20}}>{bedNumber}</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-5 col-sm-6 py-2">
                <div className="card text-white bg-info h-100">
                    <div className="card-body bg-info">
                        <div className="rotate">
                            <i className="fa fa-share fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Time Slot</h6>
                        <h1 className="display-8" style={{paddingTop:20}}>{timeSlot}</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-5 col-sm-6 py-2">
                <div className="card text-white bg-danger h-100">
                    <div className="card-body bg-secondary">
                        <div className="rotate">
                            <i className="fa fa-list fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Date of appointment</h6>
                        <h1 className="display-8" style={{paddingTop:20}}>{dateOfAppointment}</h1>
                    </div>
                </div>
            </div>
    </div> 

       
        <div className="row ">
            <div className='col-lg-12 col-md-6 col-sm-12'>
              <h5 className="mt-3 mb-3 text-secondary">
                <hr></hr>
               APPOINTMENT IS BOOKED FOR THE GIVEN TIME SLOT!!!!
               <hr></hr>
               CONTACT FOR EMERGENCY HELP: +91-9819978450
               <hr></hr>
              </h5>          
            </div>        
        </div>
    </div>
)


}

export default UrgentAppointmentResponse