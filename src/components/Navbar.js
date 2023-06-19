import { Link } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';

const Navbar = () => {
  return (
    <nav
      style={{ backgroundColor: '#2596be' }}
      className='navbar navbar-expand-lg navbar-dark'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/home'>
          s4Hospitals
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

        <div className='collapse navbar-collapse'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='/home'>
                Home
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className='nav-link active'
                aria-current='page'
                to='/wishlist'>
                Privacy Policy
              </Link>
            </li>

            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='/host'>
                About Us
              </Link>
            </li>

           
          </ul>
        </div>
      </div>
      <NavDropdown title='Login' id='navbarScrollingDropdown' style={{paddingLeft: 50, paddingRight:50, color:'white'}}>
              <NavDropdown.Item href='/patient/signin'>Patient Login</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/employee/signin'>
                Employee Login
              </NavDropdown.Item>
            </NavDropdown>
    </nav>
  )
}

export default Navbar
