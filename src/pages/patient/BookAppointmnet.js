import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import config from '../../Config'
import { toast } from 'react-toastify';


export default function BookAppointmnet() {

    const [patientId, setPatientId] = useState(sessionStorage['userId'])
    const [doctorId, setDoctorId] = useState(0)
    const [treatmentSlot, setTreatmentSlot] = useState('FIRST')
    const [typeOfTreatment, setTypeOfTreatment] = useState('')
    const [patientNote, setPatientNote] = useState('')
    const [patientProblem, setPatientProblem] = useState('')
    const [dateOfAppointment, setDateOfAppointment] = useState('')

    const [doctors, setDoctors] = useState([])

    const navigate = useNavigate();

    const header =  {
        headers: { Authorization: 'Bearer '+sessionStorage['token'] },
      }

    const bookAppt = ()=>{
        if(doctorId <=0)
        {
            alert("Please select valid doctor");
            return;
        }
        const body = {patientId,doctorId:parseInt(doctorId),treatmentSlot,typeOfTreatment,patientNote,patientProblem,dateOfAppointment}

        console.log(body)
        axios.post(config.serverURL+'/patient/bookappointment', body,header)
        .then((res)=>{
            toast.success(`Appointment ${res.data} booked Successfully!!!`)
            navigate('/patient/Dashboard')

        })
    }

    const getdoctorslist = ()=>{
        axios.get(config.serverURL+ '/patient/getAlldoctors',header
        ).then((res)=>{
            const doctorlist = res.data
            console.log(doctorlist)
            setDoctors(doctorlist)


        })
    }

    useEffect(() => {
        getdoctorslist()
    }, [])

    return (
       
        <div className="col col-lg-8 pt-5 mt-3" style={{marginLeft:150, height:620, overflow:'auto'}}>
            <h2 className="mt-3 mb-3 text-secondary"> Book Appointment </h2>
            <hr />
                       
            <div className="row" style={{justifyContent:'center'}}>
                <div className="col-lg-4 col-md-6 col-sm-12">
                
                    <div className='mb-3'>
                        <label for="doctor" class="form-label">Doctor</label>
                          <select class="form-select" aria-label="Default select example" onChange={(e)=>setDoctorId(e.target.value)}>
                                <option>Select doctor</option>
                                {
                                    doctors.map((doctor)=>{
                                        return(
                                            <option value={doctor.empId}>
                                                {doctor.firstName+" "+doctor.lastName+" ("+doctor.speciality+")"}
                                            </option>
                                        )

                                    })
                                }
                        </select>  
                    </div>
                    <div className='mb-3'>
                        <label for="treatmentSlot" class="form-label">Treatment Slot</label>
                        {/* <input
                        
                         type="text" class="form-control" id="treatmentSlot" /> */}
                         <select  class="form-select" aria-label="Default select example" onChange={(e)=>setTreatmentSlot(e.target.value)}>
                                <option value="FIRST">FIRST</option>
                                <option value="SECOND">SECOND</option>
                                <option value="THIRD">THIRD</option>
                                <option value="THIRD">FOURTH</option>
                                <option value="THIRD">FIFTH</option>
                                <option value="THIRD">SIXTH</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label for="typeOfTreatment" class="form-label">Type of Treatment</label>
                        <input 
                         onChange={(e)=>setTypeOfTreatment(e.target.value)}
                          type="text" class="form-control" id="typeOfTreatment" />
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className='mb-3'>
                        <label for="patientNote" class="form-label">patient Note</label>
                        <input
                        onChange={(e)=>setPatientNote(e.target.value)}
                         type="text" class="form-control" id="patientNote" />
                        
                    </div>
                    <div className='mb-3'>
                        <label for="DOA" class="form-label">Date of Appointment</label>
                        <input
                        onChange={(e)=>setDateOfAppointment(e.target.value)}
                         type="date" class="form-control" id="DOA" />
                        
                    </div>
                    <div className='mb-3'>
                        <label for="problem" class="form-label">patient Problem</label>
                        <input
                        onChange={(e)=>setPatientProblem(e.target.value)}
                         type="text" class="form-control" id="problem" />
                        
                    </div>

                </div>
                <div className=' mb-3'>
                    <button onClick={bookAppt} className='btn btn-success' style={{marginTop:20}}>Book Appointment</button>
                </div>
            </div>


        </div>
    )
}
