import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import config from "../../Config"
import KiraHug from '../../assets/KiraHug.jpg'

const Bill_View = ()=>{

    const[reportN, setRemoteN] = useState(0)
    const[doctorDetails, setDoctorDetails] = useState({})
    const[pathologyDetails, setPathologyDetails] = useState({})
    const[medicinesDetails, setMedicineDetails] = useState([])
    const[dateOfDischarge, setDateOfDischarge] = useState('')
    const[paidStatus, setPaidStatus] = useState(false)
    const[totalBedCharges, setTotalBedCharges] = useState(0)
    const[totalPaidAmount, setTotalPaidAmount] = useState(0)
    const[totalMedicineCost, setTotalMedicineCost] = useState(0)

    const location = useLocation()
    useEffect(()=>{



        axios.get(config.serverURL + "/reception/getBill/" +location.state.reportNumber,
        {
            headers : {
                'Authorization' : 'Bearer ' + sessionStorage['token']
            }
        } ).then((response)=>{

            const result = response.data
            console.log(response.data)
           
            
            const doctorDDetails = response.data.doctor_details
            console.log(doctorDDetails)
            console.log(response.data.pathology_details)
            console.log(response.data.medicines_details)
            setDoctorDetails(doctorDDetails)
            setPathologyDetails(result.pathology_details)
            setMedicineDetails(result.medicines_details)


            setDateOfDischarge(result.dateOfDischarge)
            setPaidStatus(result.paidStatus)
            setTotalBedCharges(result.totalBedCharges)
            setTotalPaidAmount(result.totalPaidAmount)
            
           const totalMedicineAmount =  response.data.medicines_details.reduce((totalMedicineCost, medicine)=>{

                return totalMedicineCost + (medicine.quantity * medicine.unitCost)
                
            },0)

            setTotalMedicineCost(totalMedicineAmount)
            console.log(totalMedicineAmount)

        }).catch((error)=>{
            console.log(error)
        })

        console.log(location.state.reportNumber)
        setRemoteN(location.state.reportNumber)
    },[])

return (
    <div className="col main pt-5 mt-1" style={{height:635, overflow:'auto'}}>

        <div className="row mb-3">
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card bg-success text-white h-100">
                    <div className="card-body bg-info" style={{backgroundColor:"#57b960"}}>
                        <div className="rotate">
                            <i className="fa fa-user fa-4x"></i>
                        </div>
                       
                        <h6 className="text-uppercase">Bill Number</h6>
                        <h1 className="display-8" style={{paddingTop:20}}>{reportN}</h1>
                    </div>
                </div>
            </div>
           
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-info h-100">
                    <div className="card-body bg-info">
                        <div className="rotate">
                          <i className="fab fa-twitter fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Total Payable Amount</h6>
                        <h1 className="display-8" style={{paddingTop:20}}>{totalPaidAmount}</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-info h-100">
                    <div className="card-body">
                        <div className="rotate">
                            <i className="fa fa-share fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Date Of Discharge</h6>
                        <h1 className="display-8" style={{paddingTop:20}}>{dateOfDischarge ? dateOfDischarge : "NOT DISCHARGED"}</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-danger h-100">
                    {paidStatus?
                    <div className="card-body bg-success">
                        <div className="rotate">
                            <i className="fa fa-list fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Payment Status</h6>
                        <h1 className="display-8" style={{paddingTop:20}}>PAID</h1>
                    </div> :
                    <div className="card-body bg-danger">
                        <div className="rotate">
                            <i className="fa fa-list fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Payment Status</h6>
                        <h1 className="display-8" style={{paddingTop:20}}>NOT PAID</h1>
                    </div>
                    }
                </div>
            </div>
    </div> 

       
        <div className="row ">
            <div className='col-lg-12 col-md-6 col-sm-12'>
              <h5 className="mt-3 mb-3 text-secondary">
                <hr></hr>
               PAID BILL PAYMENT DETAILS WITH PATIENT DETAILS
              </h5>
                <div className="table-responsive mb-5">
                    <table className="table table-striped" style={{border:'solid'}} >
                        <thead className="thead-light">
                            <tr>
                                <th style={{textAlign:'start'}}>Description</th>
                                <th style={{textAlign:'end'}}>Cost (₹)</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                                <td style={{textAlign:'start'}}>Operation Charges/Treatment Charges + Visiting fees</td>
                                <td style={{textAlign:'end'}}>{doctorDetails.treatmentCharges}</td>
                            </tr>
                            
                            <tr>
                                <td style={{textAlign:'start'}}>{pathologyDetails.testName}</td>
                                <td style={{textAlign:'end'}}>{pathologyDetails.testCharges}</td>
                            </tr>

                            <tr>
                                <td style={{textAlign:'start'}}>Bed Charges</td>
                                <td style={{textAlign:'end'}}>{totalBedCharges}</td>
                            </tr>


                            <tr>
                                <td style={{textAlign:'start'}}>Total treatment amount to be Paid</td>
                                <td style={{textAlign:'end'}}>{doctorDetails.treatmentCharges + pathologyDetails.testCharges + totalBedCharges }</td>
                            </tr>
                           
                        </tbody>
                    </table>
                    </div>
                    </div>

                    <hr></hr>
                
                    <div className='col-lg-12 col-md-6 col-sm-12'>
                    <h5 className="mt-3 mb-3 text-secondary">
               MEDICAL BILL PAYMENT DETAILS WITH PATIENT DETAILS
              </h5>
                    <div className="table-responsive">
                    <table className="table table-striped" style={{border:'solid'}}>
                        <thead className="thead-light">
                            <tr>
                                <th style={{textAlign:'start'}}>Medicine Name</th>
                                <th style={{textAlign:'center'}} > Quantity</th>
                                <th style={{textAlign:'end'}}> Medicine Cost Per Unit (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            medicinesDetails.map((output)=>
                           <tr>
                            
                               <td style={{textAlign:'start'}}>{output.medicineName}</td>
                               <td style={{textAlign:'center'}}>{output.quantity}</td>
                               <td style={{textAlign:'end'}}>{output.unitCost}</td>
                           </tr>
                        )}
                        <tr>
                               <td style={{textAlign:'start'}}>Total Medicines amount</td>
                               <td style={{textAlign:'center'}}></td>
                               <td style={{textAlign:'end'}}>{totalMedicineCost}</td>
                           </tr>
                           
                        </tbody>
                    </table>
                    </div>




                    


                {/* </div> */}
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

export default Bill_View