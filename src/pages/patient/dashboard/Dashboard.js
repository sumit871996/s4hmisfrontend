import {useEffect,useState} from 'react';
import axios from 'axios';
import config from '../../../Config'
 
 
const Dashboard = () => {
   
   const[appointments,setAppointments] = useState([])

   const getAllUpcomingAppoints = () =>
   {
       axios.get(config.serverURL+`/patient/upcomingAppointments/${sessionStorage['userId']}`,{
        headers: { Authorization: 'Bearer '+sessionStorage['token'] },
      }).then((resp)=>{
        console.log(resp.data);
        setAppointments(resp.data)
      })
      
   }
 
   useEffect(() => {
     getAllUpcomingAppoints();
   },[])
    
 
    return (
    <div className="col main mt-3">
   
        <div className="row " style={{marginLeft:24, height:620, overflow:'auto'}}>
            <div className="col-lg-12 col-md-6 col-sm-12">
              <h5 className="mt-3 mb-3 text-secondary">
               Check Upcoming Appointments
              </h5>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="thead-light table-dark">
                            <tr>
                                <th>Report No</th>
                                <th>Doctor Name</th>
                                <th>Date of Appointment</th>
                                <th>Treatment Slot</th>
                                <th>Patient Note</th>
                                <th>Doctor Phone No</th>
                            </tr>
                        </thead>
                        <tbody>
                         {
                             appointments && appointments.length !==0 ?
                         
                         appointments.map((appointment)=>
                            <tr>
                                <td>{appointment.reportId}</td>
                                <td>{appointment.doctorName}</td>
                                <td>{appointment.dateOfAppointment}</td>
                                <td>{appointment.treatmentSlot}</td>
                                <td>{appointment.patientNote}</td>
                                <td>{appointment.doctorphone}</td>
                                <td></td>
                            </tr>
                           )
                           : 
                           <tr>
                               <td>No Appointments </td>
                               <td>No Appointments </td>
                               <td>No Appointments </td>
                               <td>No Appointments </td>
                               <td>No Appointments </td>
                           </tr>
                           }
                        </tbody>
                    </table>
                </div>
            </div>
        
        </div>

    </div>
    )
}
 
export default Dashboard