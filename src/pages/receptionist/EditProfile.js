import { useEffect, useState } from "react"
import axios from "axios"
import config from "../../Config"

const EditProfile = ()=>{

    const[details, setDetails] = useState()

useEffect(()=>{

        console.log(sessionStorage['token'])
        console.log(sessionStorage['userId'])
        axios.get(config.serverURL + '/reception/myDetails/' + sessionStorage['userId'],
        {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage['token']
            }
        })
        .then((response)=>{
            const result = response.data
            setDetails(result)
            console.log(result)
        }).catch((error)=>{
            alert(error)
        })
},[])


return (
    <div className="col main pt-5 mt-3" style={{height:635, overflow:'auto'}}>
         
         
        <p className="lead d-none d-sm-block">Edit your details!!!</p>
 
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
                        <h6 className="text-uppercase">Users</h6>
                        <h1 className="display-4">134</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-danger h-100">
                    <div className="card-body bg-danger">
                        <div className="rotate">
                            <i className="fa fa-list fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Posts</h6>
                        <h1 className="display-4">87</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-info h-100">
                    <div className="card-body bg-info">
                        <div className="rotate">
                          <i className="fab fa-twitter fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Tweets</h6>
                        <h1 className="display-4">125</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-warning h-100">
                    <div className="card-body">
                        <div className="rotate">
                            <i className="fa fa-share fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Shares</h6>
                        <h1 className="display-4">36</h1>
                    </div>
                </div>
            </div>
    </div> 

       
        <div className="row ">
            <div >
              <h5 className="mt-3 mb-3 text-secondary">
               Check More Records of Employees
              </h5>
                <div className="table-responsive">
                    
                </div>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12 col-sm-offset-5">
               
                 <div className="mb-5" style={{height:"300px",width:"400px"}}></div></div>
        </div>
       
        <div className="row mb-3">
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
        </div>
 
    </div>
)


}

export default EditProfile