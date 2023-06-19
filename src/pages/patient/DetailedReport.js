import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import config from '../../Config'
import { useEffect, useState } from 'react'

export default function DetailedReport() {

     const location = useLocation();

     const [reportDetails, setReportDetails] = useState(null)
     const header = {
        headers: { Authorization: 'Bearer ' + sessionStorage['token'] }
    }

     const getDetailReport = (ReportNo)=>{
       
        axios.get(config.serverURL + `/patient/getDetailedReport/${ReportNo}`, header)
        .then((resp) => {
            setReportDetails(resp.data)
        }).catch((error)=>{
            console.log(error);  
        })
     }

    useEffect(() => {
        const {ReportNo} = location.state
        getDetailReport(ReportNo)
    }, [])



    return (
        <>
            {
             reportDetails && reportDetails != null
                    ? 
                    (
                        <div className="col main  mt-1" style={{marginLeft:250, height:620, overflow:'auto'}}>
                            <div className="col-lg-8">
                                <div className="card">
                                    <div className="card-body">
                                        <div>
                                            <h5>Patient Details</h5>
                                            <hr />
                                            <ul style={{ textAlign: "left" }}>
                                                <li>
                                                    <lable><strong>Report No:</strong> </lable>
                                                    <span>{reportDetails.reportNo}</span>
                                                </li>
                                                <li>
                                                    <lable><strong>Patient Name:</strong> </lable>
                                                    <span>{reportDetails.patientfirstName +" " + reportDetails.patientlastName}</span>
                                                </li>

                                                <li>
                                                    <lable><strong>Patient Note:</strong> </lable>
                                                    <span>{reportDetails.patientNote}</span>
                                                </li>
                                            
                                            </ul>
                                        </div>

                                        <div>
                                            <h5>Doctor Details</h5>
                                            <hr />
                                            <ul style={{ textAlign: "left" }}>
                                                <li>
                                                    <lable><strong>Doctor Name:</strong> </lable>
                                                    <span>{reportDetails.docfirstName+" "+reportDetails.doclastName}</span>
                                                </li>
                                                <li>
                                                    <lable><strong>Treatment type:</strong> </lable>
                                                    <span>{reportDetails.typeoftreatment}</span>
                                                </li>
                                                <li>
                                                    <lable><strong>Treatment Name:</strong></lable>
                                                    <span> {reportDetails.treatmentName}</span>
                                                </li>

                                                <li>
                                                    <lable><strong>Date of Appointment:</strong></lable>
                                                    <span> {reportDetails.dateOfAppointment}</span>
                                                </li>
                                                <li>
                                                    <lable><strong>Pathology Name:</strong> </lable>
                                                    {
                                                            reportDetails.pathfirstName != null && reportDetails.pathlastName != null ?
                                                            <span>{reportDetails.pathfirstName +" "+reportDetails.pathlastName}</span>
                                                            :
                                                            <span>-</span>

                                                     }
                                                    
                                                </li>
                                                <li>
                                                    <lable><strong>Test Name:</strong> </lable>
                                                    <span>{reportDetails.pathologyTest}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-4">
                                    <div className="card-body p-0 table-responsive">
                                        <h4 className="p-3 mb-0">Medicines Details</h4>
                                        <table className="table mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Duration</th>
                                                    <th scope="col">Dosage</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    reportDetails.medicines &&  reportDetails.medicines.length >0
                                                    ?

                                                    reportDetails.medicines.map((medicine)=>{
                                                        return(
                                                            <tr>
                                                                <td >{medicine.medicineName}</td>
                                                                <td>{medicine.quantity}</td>
                                                                <td>{medicine.duration}</td>
                                                                <td>{medicine.dosagePerDay}</td>
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    (<tr>
                                                        <td colspan="4">-</td>  
                                                    </tr>)
                                                }
                                                
                                            
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
