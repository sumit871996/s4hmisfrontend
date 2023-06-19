import { useEffect, useState } from "react"
import axios from "axios"
import config from "../../Config"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { signinUser } from "../../slices/authSlice"
import { useDispatch } from "react-redux"


const Bills = ()=>{

    const navigate = useNavigate()

    const[allBills, setAllBills] = useState([])
    const[totalPaidBills, setTotalPaidBills] = useState([])
    const[totalUnpaidBills, setTotalUnpaidBills] = useState([])

    const paidBillsApi = config.serverURL + "/reception/getPaidBills"
    const unpaidBillsApi = config.serverURL + "/reception/getPendingBills"

    const getPaidBills = axios.get(paidBillsApi, {
        headers : {
            'Authorization' : 'Bearer ' + sessionStorage['token']
        }
    })

    const getPendingBills = axios.get(unpaidBillsApi, {
        headers : {
            'Authorization' : 'Bearer ' + sessionStorage['token']
        }
    })

    const dispatch = useDispatch()

    useEffect(()=>{

        if (sessionStorage['token'] && sessionStorage['token'].length > 0) {
            // reading the information from sesssionstorage and manually signing in user
            const user = {
              token: sessionStorage['token'],
              id: sessionStorage['userId'],
              role: sessionStorage['role'],
            }
            dispatch(signinUser(user))
        }

        getBillDetails()
    },[])

    const getBillDetails = async ()=>{


        await axios.all([getPaidBills, getPendingBills]).then(axios.spread((...allData)=>{

            const paids = allData[0]
            const unpaids = allData[1]
            // setBillDetails(paids + unpaids)
            console.log(paids)
            console.log(unpaids)
            setTotalPaidBills(paids.data)
            setTotalUnpaidBills(unpaids.data)
            // setTotalPaidBills(paids.length)
            // setTotalUnpaidBills(unpaids)
            // console.log(totalPaidBills)
            // console.log(totalUnpaidBills)
            const all = paids.data.concat(unpaids.data)
            setAllBills(all)
            // console.log(all)
            // console.log(allData[0])
        }))
        
    }

    const DetailedBill = (billNumberDetailed)=>{

        navigate("/reception/dashboard/PendingBills/Bill_View/", {state : { reportNumber : billNumberDetailed }})

    }

    const UpdateStatus = (billNumberDetailed)=>{

        axios.get(config.serverURL + '/reception/updatePaidStatus/' + billNumberDetailed, {
            headers: {
              'Authorization': 'Bearer ' + sessionStorage['token'],
            },
          }).then((response)=>{


              toast.success("Payment status updated successfully!!")
            window.setTimeout(()=>{window.location.reload(false)},1000)
              


        }).catch((error)=>{
            toast.error('Error Updating payment status!')
        })
    }

    return (
        <div className="col main pt-5 mt-1" style={{height:635, overflow:'auto'}}>

        <div className="row mb-3">
            <div className="col-xl-4 col-sm-6 py-2">
                <div className="card bg-success text-white h-100">
                    <div className="card-body bg-info" style={{backgroundColor:"#57b960"}}>
                        <div className="rotate">
                            <i className="fa fa-user fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Total Bills</h6>
                        <h1 className="display-4">{totalPaidBills.length + totalUnpaidBills.length}</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-4 col-sm-6 py-2">
                <div className="card text-white bg-danger h-100">
                    <div className="card-body bg-danger">
                        <div className="rotate">
                            <i className="fa fa-list fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Pending Bills</h6>
                        <h1 className="display-4">{totalUnpaidBills.length}</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-4 col-sm-6 py-2">
                <div className="card text-white bg-info h-100">
                    <div className="card-body bg-success">
                        <div className="rotate">
                          <i className="fab fa-twitter fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Paid Bills</h6>
                        <h1 className="display-4">{totalPaidBills.length}</h1>
                    </div>
                </div>
            </div>
            {/* <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-warning h-100">
                    <div className="card-body">
                        <div className="rotate">
                            <i className="fa fa-share fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Total Emergency Beds</h6>
                        <h1 className="display-4">11</h1>
                    </div>
                </div>
            </div> */}
    </div> 

       
        <div className="row ">
            <div className='col-lg-12 col-md-6 col-sm-12'>
              <h5 className="mt-3 mb-3 text-secondary">
               PENDING BILL PAYMENT DETAILS WITH PATIENT DETAILS
              </h5>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead className="thead-light">
                            <tr>
                                <th>Bill Number</th>
                                <th>Patient Name</th>
                                <th>Patient Phone</th>
                                <th>Total Paid Amount</th>
                                <th>Date Of Admission</th>
                                <th>Date Of Discharge</th>
                                <th>View Detailed Bill</th>
                                <th>Update Payment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {totalUnpaidBills.map((output)=>
                           <tr key={output.billNumber}>
                               <td>{output.billNumber}</td>
                               <td>{output.patientName}</td>
                               <td>{output.patientPhone}</td>
                               <td>{output.totalPaidAmount}</td>
                               <td>{output.dateOfAdmission}</td>
                               <td>{output.dateOfDischarge} </td>
                               <td> <button className='btn btn-success' onClick={()=>DetailedBill(output.billNumber)}>View Bill</button> </td>
                               <td><button className='btn btn-success' onClick={()=>UpdateStatus(output.billNumber)}>Update</button></td>
                           </tr>
                          )}
                            {/* {
                            allBills.map((output)=>{
                            <tr key={output.billNumber}>
                                <td>{output.billNumber}</td>
                                <td>{output.patientName}</td>
                                <td>{output.patientPhone}</td>
                                <td>{output.totalPaidAmount}</td>
                                <td>{output.dateOfAdmission}</td>
                                <td>{output.dateOfDischarge} </td>
                                <td> <button className='btn btn-success' onClick={()=>DetailedBill(output.billNumber)}>View Bill</button> </td>
                            </tr>
                            })
                          } */}
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

export default Bills