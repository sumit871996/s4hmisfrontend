import React from 'react'
import {useEffect,useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import config from '../../Config'

export default function PaidBills() {
    const[paidBills,setpaidBills] = useState([])
    const navigate = useNavigate();
   const getAllPaidBills = () =>
   {
       axios.get(config.serverURL+`/patient/getPaidBills/${sessionStorage['userId']}`,{
        headers: { Authorization: 'Bearer '+sessionStorage['token'] },
      }).then((resp)=>{
        console.log(resp.data);
        setpaidBills(resp.data)
      })
      
   }
 
   useEffect(() => {
    getAllPaidBills();
   },[])
    
   const viewMoreDetails=(paidBill)=>{      
    navigate('/patient/getDetailBill',{state:{BillNo : paidBill.billNumber}})

   }
 
    return (
    <div className="col main pt-3">
        
        <div className="row " style={{marginLeft:'60px', height:620, overflow:'auto'}}>
            <div className="col-lg-11 col-md-6 col-sm-12">
              <h5 className="mt-3 mb-3 text-secondary">
               All Paid Bills
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
                             paidBills && paidBills.length !==0 ?
                         
                             paidBills.map((paidBill)=>
                            <tr>
                                <td>{paidBill.billNumber}</td>
                                <td>{
                                    paidBill.treatmentName === null || paidBill.treatmentName === "" ? '-' :
                                        paidBill.treatmentName}</td>
                                <td>{paidBill.typeOfTreatment}</td>
                                <td>{paidBill.totalPaidAmount}</td>
                                <td><button className='btn btn-success' onClick={()=>{viewMoreDetails(paidBill)}}>View More</button></td> 
                                
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
