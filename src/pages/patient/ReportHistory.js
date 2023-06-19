import React from 'react'
import {useEffect,useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import config from '../../Config'


export default function ReportHistory() {
    const[reportHistory,setReportHistory] = useState([])
    const navigate = useNavigate();
 
   const getAllPendingBills = () =>
   {
       axios.get(config.serverURL+`/patient/getReportHistory/${sessionStorage['userId']}`,{
        headers: { Authorization: 'Bearer '+sessionStorage['token'] },
      }).then((resp)=>{
        console.log(resp.data);
        setReportHistory(resp.data)
      })
      
   }
 
   useEffect(() => {
    getAllPendingBills();
   },[])
    
   const viewDetailedReport = (reportNum)=>{
       navigate('/patient/detailedReport',{state:{ReportNo :reportNum }})
   }
 
    return (
    <div className="col main pt-3">
        
        <div className="row " style={{marginLeft:'45px', height:620, overflow:'auto'}}>
            <div className="col-lg-11 col-md-6 col-sm-12">
              <h5 className="mt-3 mb-3 text-secondary">
               Report History
              </h5>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Report No</th>
                                <th>Doctor Name</th>
                                <th>Date of Appointment</th>
                                <th>Doctor PhoneNo</th>
                                <th>Doctor Remark</th>
                                <th>Treatment Status</th>
                                <th>Action</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                         {
                             reportHistory && reportHistory.length !==0 ?
                         
                             reportHistory.map((report)=>
                            <tr>
                                <td>{report.reportNo}</td>
                                <td>{report.docFirstName+" "+report.docLastName}</td>
                                <td>{report.dateOfAppointment}</td>
                                <td>{report.doctorphone}</td>
                                <td>{report.doctorRemark}</td>
                                <td>{report.treatmentStatus === false? 'In Progress' : 'Completed'}</td>  
                                <td><button className='btn btn-success' onClick = {()=>{viewDetailedReport(report.reportNo)}}>View More</button></td>  
                            </tr>
                           )
                           : 
                           <tr>
                               <td>No report </td>
                               <td>No report </td>
                               <td>No report </td>
                               <td>No report </td>
                               <td>No report </td>
                               <td>No treatment </td>
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
