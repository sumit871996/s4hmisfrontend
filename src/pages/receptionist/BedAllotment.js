import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import config from '../../Config';
import { signinUser } from '../../slices/authSlice';

const BedAllotment = ()=>
{

    const[bedDetails, setBedDetails] = useState([])
    const[patientName, setPatientName] = useState('')
    const[doctorName, setDoctorName] = useState('')
    const[reportNumber, setReportNumber] = useState(0)
    const[totalBeds, setTotalBeds] = useState(0)
    const[allocatedBeds, setAllocatedBeds] = useState(0)
    const[emergencyBeds, setEmergencyBeds] = useState(0)


    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{


        //   if (sessionStorage['token'] && sessionStorage['token'].length > 0) {
        //     // reading the information from sesssionstorage and manually signing in user
        //     const user = {
        //       token: sessionStorage['token'],
        //       id: sessionStorage['userId'],
        //       role: sessionStorage['role'],
        //     }
        //     dispatch(signinUser(user))
        //   }
     
        getBedDetails()
    },[totalBeds])

    const getBedDetails = ()=>{

        axios.get(config.serverURL + "/reception/getBedsDetails", 
        {
            headers : {
                'Authorization' : 'Bearer ' + sessionStorage['token']
            }
        }).then((response)=>{
            console.log(response.data)
            const result = response.data
            // const result = response.data;

            // result.map((eachResult)=>{

            //     setBedDetails(eachResult)
            // })
            setBedDetails(result)

            setTotalBeds(result.length)
           
            function isAllocated(x){
                    return (x.bedAvailability === false)
            }

            function isWardC(x){
                return (x.wardNumber === "C")
        }

            const alloBeds = result.filter(isAllocated)
            const emerbeds = result.filter(isWardC)

            console.log(alloBeds)
            console.log(emerbeds)

            setAllocatedBeds(alloBeds.length)
            setEmergencyBeds(emerbeds.length)

            // console.log(result)
        })
        
    }

    const AllocateBed = (wardNumber, bedNumber)=>{
            
        if(reportNumber <1)
        {
            toast.error("Please enter valid Report number")
            return
        }
        // console.log(wardNumber)
        // console.log(bedNumber)
        
        // console.log(reportNumber)

        const body = {
            wardNumber, bedNumber
        }

        axios.put(config.serverURL + "/reception/bedAllocation/" + reportNumber, body,
        {
        headers: {
            'Authorization' : 'Bearer ' + sessionStorage['token']
        }}).then((response)=>
        {
                // console.log(response.data)
                toast.success("Bed allocated successfully")
                setAllocatedBeds(allocatedBeds+1)
                window.location.reload()
        }).catch((error)=>{
            toast.error("error allocating bed")
        })

    }

    return (

        <div className="col main pt-5 mt-3" style={{height:635, overflow:'auto'}}>
         
         
        <p className="lead d-none d-sm-block"></p>
 
        <div className="alert alert-warning fade collapse" role="alert" id="myAlert">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">x</span>
                <span className="sr-only">Close</span>
            </button>
            <strong>Data and Records</strong> Learn more about employee
        </div>
        <div className="row mb-3">
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card bg-success text-white h-100">
                    <div className="card-body bg-success" style={{backgroundColor:"#57b960"}}>
                        <div className="rotate">
                            <i className="fa fa-user fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Total Beds</h6>
                        <h1 className="display-4">{totalBeds}</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-danger h-100">
                    <div className="card-body bg-danger">
                        <div className="rotate">
                            <i className="fa fa-list fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Allocated Beds</h6>
                        <h1 className="display-4">{allocatedBeds}</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-info h-100">
                    <div className="card-body bg-info">
                        <div className="rotate">
                          <i className="fab fa-twitter fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Non-Allocated Beds</h6>
                        <h1 className="display-4">{totalBeds - allocatedBeds}</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-warning h-100">
                    <div className="card-body">
                        <div className="rotate">
                            <i className="fa fa-share fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Emegency Beds</h6>
                        <h1 className="display-4">{emergencyBeds}</h1>
                    </div>
                </div>
            </div>
    </div> 

       
        <div className="row ">
            <div className='col-lg-12 col-md-6 col-sm-12'>
              <h5 className="mt-3 mb-3 text-secondary">
               BED ALLOTMENT STATUSES WITH PATIENT DETAILS
              </h5>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead className="thead-light">
                            <tr>
                                <th>Ward Number</th>
                                <th>Bed Number</th>
                                <th>Patient Name</th>
                                <th>Doctor's Name</th>
                                <th>Patient contact</th>
                                <th>Report Number</th>
                                <th>Allocate Bed</th>
                            </tr>
                        </thead>
                        <tbody>
                         {bedDetails.map((output)=>
                            <tr key={output.bedNumber}>
                                <td>{output.wardNumber}</td>
                                <td>{output.bedNumber}</td>
                                <td>{output.patientName}</td>
                                <td>{output.doctorName}</td>
                                <td>{output.patientPhone} </td>
                                <td>{output.bedAvailability ? <input type='Number' onKeyUp={(event)=>setReportNumber(event.target.value)} defaultValue = {output.reportNumber ? output.reportNumber : ''}/> : <h6>{output.reportNumber}</h6>}</td>
                                <td> {output.bedAvailability ? <button className='btn btn-success' onClick={()=>AllocateBed(output.wardNumber, output.bedNumber)}>Allocate</button> : <button className='btn btn-danger'disabled>Allocated</button> }</td>
                            </tr>
                           )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <div className="col-lg-5 col-md-6 col-sm-12 col-sm-offset-5">
               
                 <div className="mb-5" style={{height:"300px",width:"400px"}}></div></div> */}
        </div>
       
        {/* <div className="row mb-3">
            <div className="col-lg-6">
 
                <div className="card mb-3">
                    <div className="card-header">
                        Bye .well, .panel &amp; .thumbnail
                    </div>
                    <div className="card-body">
                        <h4 className="card-title">Replaced with .card</h4>
                        <p className="card-text">All of these Bootstrap 3.x components have been dropped entirely for the new card component.</p>
                        <button type="button" className="btn btn-secondary btn-lg">Large</button>
                    </div>
                </div>
 
            </div>
        </div> */}
 
    </div>













        
    )



}

export default BedAllotment




    
