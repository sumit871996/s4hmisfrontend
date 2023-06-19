import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import config from '../../Config'
import { toast } from 'react-toastify';

export default function Bookpathology() {

    const navigate = useNavigate();
    const location = useLocation();

    const [pathologyId, setpathologyId] = useState(0)
    const [reportNumber, setReportNo] = useState(0)
    const [testName, setTestName] = useState('')
    const [dateOfArrivalTest, setDateOfArrivalTest] = useState(0)
    const [testSlot, setTestslot] = useState('FIRST')
    

    const [pathologistLists, setPathologistLists] = useState([])

    

    const header =  {
        headers: { Authorization: 'Bearer '+sessionStorage['token']}
      }

    const bookPathologyAppt = ()=>{
        if(pathologyId <=0)
        {
            alert("Please select valid pathologist");
            return;
        }
        const body = {pathologyId,dateOfArrivalTest,testSlot,reportNumber}

        

        console.log(body)
        axios.post(config.serverURL+'/patient/bookpathology', body,header)
        .then((res)=>{
            toast.success(`Pathology ${res.data} booked Successfully!!!`)
            navigate('/patient/pathology')

        }).catch((e)=>{
            console.log(e)
        })
    }

    const getpathologistlist = ()=>{
        axios.get(config.serverURL+ '/patient/getAllpathologist',header
        ).then((res)=>{
            const pathologistlist = res.data
            console.log(pathologistlist)
            setPathologistLists(pathologistlist)
        })
    }

    useEffect(() => {
        getpathologistlist()
        const {pathobj} = location.state
        setReportNo(pathobj.reportNo)
        setTestName(pathobj.testName)
        console.log('locations'+pathobj.reportNo)
    }, [])

    return (
       
        <div className="col main pt-5 mt-3" style={{marginLeft:250, height:620, overflow:'auto'}}>
                      
            <div className="row">
                <div className="col-lg-7 col-md-6 col-sm-12">
                <h2 className="mt-3 mb-3 text-secondary"> Book Pathology </h2>
                <hr />
                    <div className='mb-3'>
                        <label for="pathologist" class="form-label">Pathlogist</label>
                          <select class="form-select" aria-label="Default select example" onChange={(e)=>setpathologyId(e.target.value)}>
                                <option>Select Pathologist</option>
                                {
                                    pathologistLists.map((pathologist)=>{
                                        return(
                                            <option value={pathologist.empId}>
                                                {pathologist.firstName+" "+pathologist.lastName}
                                            </option>
                                        )
                                    })
                                }
                        </select>  
                    </div>
                    <div className='mb-3'>
                        <label for="treatmentSlot" class="form-label">Treatment Slot</label>
                       
                         <select  class="form-select" aria-label="Default select example" onChange={(e)=>setTestslot(e.target.value)}>
                                
                                <option value="FIRST">FIRST</option>
                                <option value="SECOND">SECOND</option>
                                <option value="THIRD">THIRD</option>
                                <option value="THIRD">FOURTH</option>
                                <option value="THIRD">FIFTH</option>
                                <option value="THIRD">SIXTH</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label for="reportNo" class="form-label">Report No</label>
                        <input 
                          onChange={(e)=>setReportNo(e.target.value)} value={reportNumber} disabled
                          type="text" class="form-control" id="reportNo" />
                    </div>
                    <div className='mb-3'>
                        <label for="testname" class="form-label">Test Name</label>
                        <input 
                         value={testName} disabled
                          type="text" class="form-control" id="testname" />
                    </div>
                    <div className='mb-3'>
                        <label for="pathologydate" class="form-label">Date of Pathology Test</label>
                        <input 
                          onChange={(e)=>setDateOfArrivalTest(e.target.value)}
                          type="date" class="form-control" id="pathologydate" />
                    </div>
                    <div className='mb-3'>
                    <button onClick={bookPathologyAppt} className='btn btn-success' style={{marginTop:20}}>Book Appointment</button>
                </div>
                </div>
                
                
            </div>


        </div>
    )
}

