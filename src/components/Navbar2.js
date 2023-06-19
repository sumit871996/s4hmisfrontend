import { Link } from 'react-router-dom'
import S4Logos from '../assets/S4Logos.png'
import '../components/clickables.css'
import {useSelector, useDispatch} from 'react-redux'
import { signinUser, signoutUser } from '../slices/authSlice' 
import { useEffect } from 'react'

const Navbar2 = () => {


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
  })


  const signinStatus = useSelector(state=> state.authSlice.status)
  return (
    <nav
      style={{ backgroundColor: '#0492C2' }}
      className='navbar navbar-expand-lg '>
        <Link  className='navbar-brand' to='/home'>
          <img style={{width:60, paddingLeft:20, paddingRight:0, marginRight:0, marginLeft:20}} src = {S4Logos} />
        </Link>
      <div className='container-fluid'>
        <Link className='navbar-brand clickable' style={{paddingLeft:0, marginLeft:0}} to='/home'>
          S4Hospitals
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item clickable'>
              <Link className='nav-link active clickable' aria-current='page' to='/' style={{color:'white'}}>
                Home
              </Link>
            </li>

            
            <li>
            { signinStatus &&
          (<Link style={{paddingLeft:20, paddingRight:20}}
            to='/user/dashboard'
            className='nav-link clickable'
            role='button'
            aria-expanded='false'>
            Dashboard
          </Link>)
}
</li>

            <li className='nav-item'>
              <Link
                className='nav-link active clickable'
                aria-current='page'
                to='/AboutUs' style={{color:'white'}}>
                About Us
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className='nav-link active clickable'
                aria-current='page'
                to='/PrivacyPolicy' style={{color:'white'}}>
                Privacy Policy
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className='nav-link active clickable'
                aria-current='page'
                to='/doctorGallery' style={{color:'white'}}>
                Doctor's Gallery
              </Link>
            </li>



{/* <div className='collapse navbar-collapse'>
<li className='nav-item'>
              <div
                  className='navbar-brand'
                aria-current='page'
                to='/doctorGallery' style={{color:'white', marginLeft:60, display:'inline-block'}}>
                S4 Lifeline
              </div>
            </li>

            <li className='nav-item'>
              <div
                  className='navbar-brand'
                aria-current='page'
                to='/doctorGallery' style={{color:'white', marginLeft:60}}>
                S4 Lifeline
              </div>
            </li>
</div> */}



          </ul>

          

          {!signinStatus ?<Link style={{paddingLeft:20, paddingRight:20}}
            to='/home/signin'
            className='nav-link clickable'
            role='button'
            aria-expanded='false'
            >
            Sign In
          </Link>
          :
          <Link style={{paddingLeft:20, paddingRight:20}}
            to='/home/signin'
            className='nav-link clickable'
            role='button'
            aria-expanded='false' onClick={()=>{
              dispatch(signoutUser())
            }}>
            Sign Out
          </Link>

            }
          { !signinStatus &&
          (<Link style={{paddingLeft:20, paddingRight:20}}
            to='/home/signup'
            className='nav-link clickable'
            role='button'
            aria-expanded='false'
            color='white'>
            Sign Up
          </Link>)
}

        </div>
      </div>
    </nav>
  )
}
export default Navbar2
