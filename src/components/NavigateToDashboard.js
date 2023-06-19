import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { signinUser, signoutUser} from '../slices/authSlice'
import { toast } from "react-toastify"

const NavigateTODashboard = ()=>{

    const navigate = useNavigate()

    const statusUser = useSelector(state=> state.authSlice.status)

    useEffect(()=>{

    

      if(!statusUser)
      {
        toast.warning("Please signin to proceed!!")
        navigate("/home/signin")
      }
      else{
        if(sessionStorage['role'] === "ROLE_PATHOLOGIST")
        {
          navigate("/pathologist/dashboard")
        }
          else
          if(sessionStorage['role'] === "ROLE_DOCTOR")
        { 
          navigate("/doctor/dashboard")
        }
          else
          if(sessionStorage['role'] === "ROLE_RECEPTIONIST")
        { 
          navigate("/reception/dashboard/myProfile")
        } else
          if(sessionStorage['role'] === "ROLE_ADMIN")
        {
         
          navigate("/admin/dashboard")
        } else
          if(sessionStorage['role'] === "ROLE_PATIENT")
          {
          navigate("/patient/dashboard")
          }
        }
    
        
    },[])


    



}
export default NavigateTODashboard