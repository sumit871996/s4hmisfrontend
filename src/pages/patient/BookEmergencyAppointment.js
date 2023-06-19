import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import config from '../../Config'
import { toast } from 'react-toastify';


export default function BookEmergencyAppointmnet() {

    const [patientId, setPatientId] = useState(sessionStorage['userId'])
    const [patientNote, setPatientNote] = useState('')
    const [patientProblem, setPatientProblem] = useState('')


    const navigate = useNavigate();

    const header =  {
        headers: { Authorization: 'Bearer '+sessionStorage['token'] },
      }

    const bookAppt = ()=>{
        
        const body = {patientId,patientNote,patientProblem}

        console.log(body)
        axios.post(config.serverURL+'/patient/bookEmergencyAppointment', body,header)
        .then((res)=>{
            console.log(res.data)
            toast.success(`Appointment booked Successfully!!!`)
            navigate('/patient/book-emergency-appointment-response', {state :{Report_Response : res.data}})

        })
    }

    

    useEffect(() => {

        setPatientId(sessionStorage['userId'])
        
    }, [])

    return (
       
        <div className="col main pt-5 mt-3" style={{marginLeft:20, height:620, overflow:'auto'}}>
            <h2 className="mt-3 mb-3 text-secondary"> Book Appointment </h2>
            <hr />
                       
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12">
                
    
                    
                    
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    
                    <div className='mb-3'>
                        <label for="problem" class="form-label">Please mention your problem:</label>
                        <input
                        onChange={(e)=>setPatientProblem(e.target.value)}
                         type="text" class="form-control" id="problem" />
                        
                    </div>
                    <div className='mb-3'>
                        <label for="patientNote" class="form-label">Patient Note:</label>
                        <input
                        onChange={(e)=>setPatientNote(e.target.value)}
                         type="text" class="form-control" id="patientNote" />
                        
                    </div>

                </div>
                <div className='mb-3'>
                    <button onClick={bookAppt} className='btn btn-success' style={{marginTop:20}}>Book Appointment</button>
                </div>
            </div>

            <div className="row ">
            <div className='col-lg-12 col-md-6 col-sm-12'>
              <h5 className="mt-3 mb-3 text-secondary">
                <hr></hr>
               CONTACT FOR EMERGENCY HELP: +91-9819978450
               <hr></hr>
              </h5>          
            </div>        
        </div>


        </div>
    )
}

