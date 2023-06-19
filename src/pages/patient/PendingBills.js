import React from 'react'
import {useEffect,useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import config from '../../Config'
 

export default function PendingBills() {
    const[pendingBills,setPendingBills] = useState([])

    const navigate = useNavigate();
 
   const getAllPendingBills = () =>
   {
       axios.get(config.serverURL+`/patient/getPendingBills/${sessionStorage['userId']}`,{
        headers: { Authorization: 'Bearer '+sessionStorage['token']},
      }).then((resp)=>{
      
        setPendingBills(resp.data)
      })  
   }

   const viewMoreDetails=(pendingBill)=>{      
    navigate('/patient/getDetailBill',{state:{BillNo : pendingBill.billNumber}})

   }
 
   useEffect(() => {
    getAllPendingBills();
   },[])
    
 
    return (
    <div className="col main pt-3">
        
        <div className="row " style={{ marginLeft:'60px', height:620, overflow:'auto'}}>
            <div className="col-lg-11 col-md-6 col-sm-12">
              <h5 className="mt-3 mb-3 text-secondary">
               All Pending Bills
              </h5>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Bill No</th>
                                <th>Treatment Name</th>
                                <th>Type of Treatment</th>
                                <th>Due Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                         {
                             pendingBills && pendingBills.length !==0 ?
                         
                             pendingBills.map((pendingBill)=>
                            <tr>
                                <td>{pendingBill.billNumber}</td>
                                <td>{
                                    pendingBill.treatmentName === null || pendingBill.treatmentName === "" ? '-' :
                                        pendingBill.treatmentName}</td>
                                <td>{pendingBill.typeOfTreatment}</td>
                                <td>{pendingBill.totalPaidAmount}</td>
                                <td><button className='btn btn-success' onClick={()=>{viewMoreDetails(pendingBill)}}>View More</button></td> 
                                
                            </tr>
                           )
                           : 
                           <tr>
                               <td>No Pending Bill </td>
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
