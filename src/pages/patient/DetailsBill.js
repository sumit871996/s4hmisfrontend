import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import config from '../../Config'

export default function DetailsBill() {

    const location = useLocation()

    const [reportDetails, setReportDetails] = useState(null)

    const header = {
        headers: { Authorization: 'Bearer ' + sessionStorage['token'] }
    }

    const getBillDetailUsingReportNo = (reportNo) => {

        axios.get(config.serverURL + `/patient/getBill/${reportNo}`, header)
            .then((resp) => {
                setReportDetails(resp.data)
            })
    }

    useEffect(() => {

        const { BillNo } = location.state
        getBillDetailUsingReportNo(BillNo)
    }, [])



    return (
        <>
            {
                reportDetails && reportDetails != null
                    ?
                    (
                        <div className="col main pt-5 mt-3" style={{marginLeft:250, height:620, overflow:'auto'}}>
                            <div className="col-lg-8">
                                <div className="card">
                                    <div className="card-body">
                                        <div>
                                            <h5>Teatment Details</h5>
                                            <hr />
                                            <ul style={{ textAlign: "left" }}>
                                                <li>
                                                    <lable><strong>Report No:</strong> </lable>
                                                    <span>{location.state.BillNo}</span>
                                                </li>
                                                <li>
                                                    <lable><strong>Treatment type:</strong> </lable>
                                                    <span>{reportDetails.doctor_details.treatmentName}</span>
                                                </li>
                                                <li>
                                                    <lable><strong>Treatment type:</strong></lable>
                                                    <span> {reportDetails.doctor_details.typeOfTreatment}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-4">
                                    <div className="card-body p-0 table-responsive">
                                        <h4 className="p-3 mb-0">Bill Details</h4>
                                        <table className="table mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Description</th>
                                                    <th scope="col"></th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    reportDetails.medicines_details &&  reportDetails.medicines_details.length >0
                                                    ?

                                                    reportDetails.medicines_details.map((medicine)=>{
                                                        return(
                                                            <tr>
                                                                <td colspan="2">{medicine.medicineName}</td>
                                                                <td>{medicine.quantity}</td>
                                                                <td>
                                                                    <strong><i class="bi bi-currency-rupee"></i>{medicine.quantity * medicine.unitCost}</strong>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    (<tr>
                                                        <td colspan="2">-</td>
                                                        <td> -</td>
                                                        <td><strong>-</strong> </td>   
                                                    </tr>)
                                                }
                                                
                                                <tr>
                                                    <td colspan="2">{reportDetails.pathology_details.testName}</td>
                                                    <td></td>
                                                    <td>
                                                        <strong><i class="bi bi-currency-rupee"></i>{reportDetails.pathology_details.testCharges}</strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">Bed Charges</td>
                                                    <td></td>
                                                    <td>
                                                        <strong><i class="bi bi-currency-rupee"></i>{reportDetails.totalBedCharges}</strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">Treatment Charges</td>
                                                    <td></td>
                                                    <td>
                                                        <strong><i class="bi bi-currency-rupee"></i>{reportDetails.doctor_details.treatmentCharges}</strong>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th colspan="2">
                                                        <span>Status:</span>
                                                        <span>{
                                                        reportDetails.paidStatus == false?' Unpaid':' Paid'}</span>
                                                    </th>
                                                    <td>
                                                       
                                                    </td>
                                                    <td>
                                                        <span className="text-muted">Total Amount</span>
                                                        <div>
                                                            <strong><i class="bi bi-currency-rupee"></i>{reportDetails.totalPaidAmount}</strong>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                    :
                    ( <div className="col main pt-5 mt-3" style={{ marginLeft: 250 }}>
                        <h3>No details found</h3>
                    </div> 
                    )    
            }


        </>

    )
}
