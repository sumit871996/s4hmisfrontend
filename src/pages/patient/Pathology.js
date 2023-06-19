import React, { useEffect } from 'react'
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import config from '../../Config'

export default function Pathology() {

    const [pathologytests, setPathologytests] = useState([])
    const navigate = useNavigate();
    const getPathologyTestInfo = ()=>{

        axios.get(config.serverURL+`/patient/getAllPathology/${sessionStorage['userId']}`,
        {headers: { Authorization: 'Bearer '+sessionStorage['token'] }})
        .then((response)=>{

            console.log(response)
            const allPathologyDetails = response.data
            setPathologytests(allPathologyDetails)
        })
    }

   useEffect(() => {
    getPathologyTestInfo()
   }, [])

   const BookPathologyAppointment = (pathologyDetail)=>{
        navigate('/patient/book-pathology', { state: { pathobj: pathologyDetail } })
        console.log(pathologyDetail);
        
   }

    return (
        <div className="col main pt-3">
            
            <div className="row " style={{marginLeft:'70px', height:619, overflow:'auto'}}>
            <div className="col-lg-11 col-md-6 col-sm-12">
              <h5 className="mt-3 mb-3 text-secondary">
               All Pathology Details
              </h5>
                <div className="table-responsive">
                    <table className="table table-hover" >
                        <thead className="table-dark">
                            <tr>
                                <th>Report No</th>
                                <th>Test Name</th>
                                <th>Status</th>                       
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                         {
                             pathologytests && pathologytests.length !==0 ?
                         
                             pathologytests.map((pathologyDetail)=>
                            <tr>
                                <td>{pathologyDetail.reportNo}</td>
                                <td>{pathologyDetail.testName}</td>
                                <td>{pathologyDetail.testStatus===false?'Pending':'Completed'}</td>
                                <td>
                                {(pathologyDetail.testStatus== true)?
                                    <button className='btn btn-success' disabled>Test Done</button>
                                   :
                                   (
                                    pathologyDetail.pathologistId != null ?
                                        <button className='btn btn-warning' disabled>Booked</button>
                                        :
                                        <button onClick={()=>{BookPathologyAppointment(pathologyDetail)}} className='btn btn-primary'>Book Pathology</button>
                                   )
                                    
                                    
                                }
                                </td>                               
                            </tr>
                           )
                           : 
                           <tr>
                               <td>No Pending Bill </td>
                               <td>No Pending Bill </td>
                               <td>No Pending Bill </td>  
                               <td>No Action </td>   
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
