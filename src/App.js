import logo from './logo.svg'
import './App.css'
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom'
import Home from './pages/home/Home.js'
import SignIn from './pages/home/SignIn.js'
import ReceptionDashboard from './pages/receptionist/ReceptionDashboard.js'
import PatientDashboard from './pages/patient/PatientDashboard'
import PendingBills from './pages/patient/PendingBills'
import PaidBills from './pages/patient/PaidBills'
import Dashboard from './pages/patient/dashboard/Dashboard'
import ReportHistory from './pages/patient/ReportHistory'
import BookAppointmnet from './pages/patient/BookAppointmnet'
import RMyProfile from './pages/receptionist/dashboard/RMyProfile'
import REditProfile from './pages/receptionist/dashboard/REditProfile'

import DoctorDashboard from './pages/doctor/DoctorDashbord'
import DoctDashboard from './pages/doctor/DoctDashboard'
import Pathology from './pages/patient/Pathology'
import BookPathology from './pages/patient/BookPathology'
import SignUp from './pages/home/SignUp.js'
import EditProfile from './pages/receptionist/EditProfile'
import RecDashboard from './pages/receptionist/dashboard/RecDashboard'
import Bills from './pages/receptionist/Bills'
import BedAllotment from './pages/receptionist/BedAllotment'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar2 from './components/Navbar2'
import ViewReport from './pages/doctor/ViewReport'
import NotFound from './pages/NotFound'
import UploadImage from './pages/doctor/uploadImage'
import DetailsBill from './pages/patient/DetailsBill'
import MyProfile from './pages/patient/MyProfile'
import PEditProfile from './pages/patient/PEditProfile'
import DetailedReport from './pages/patient/DetailedReport'
import PaidBillsPage from './pages/receptionist/PaidBillsPage'
import Bill_View from './pages/receptionist/Bill_View'
import SearchDoctor from './pages/home/SearchDoctors'

import AdminDashboard from './pages/admin/AdminDashboard'
import GetAllEmployees from './pages/admin/GetAllEmployees'
import AddEmployee from './pages/admin/AddEmployee'
import UpdateEmployee from './pages/admin/updateEmployee'
import GetAllBeds from './pages/admin/GetAllBeds'
import AddBeds from './pages/admin/AddBeds'
import About from './pages/About/About'
import PrivacyPolicy from './pages/About/PrivacyPolicy'
import PathDashbord from './pages/pathologist/PathDashboard'
import PathologistDashboard from './pages/pathologist/PathologistDashbord'
import TestReport from './pages/pathologist/TestReport'
import DoctEditProfile from './pages/doctor/DoctEditProfile'
import MyDoctProfile from './pages/doctor/MyDoctProfile'
import MyPathProfile from './pages/pathologist/MyPathProfile'
import PathEditProfile from './pages/pathologist/PathtEditProfile'
import BookEmergencyAppointmnet from './pages/patient/BookEmergencyAppointment'
import UrgentAppointmentResponse from './pages/patient/UrgentAppointmentResponse'
import GetSecurityQuestion from './pages/home/GetSecurityQuestion'
import NavigateTODashboard from './components/NavigateToDashboard'
import UpdatePassword from './pages/admin/UpdatePassword'
import ForgotPassword from './pages/home/ForgotPassword'
import SetPassword from './pages/home/SetPassword'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        {/* <ToastContainer> */}
        <Navbar2 />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/home' element={<Home />}></Route>
          {/* <Route path='/home/Aboutus' element={<Home />}></Route> */}
          <Route path='/home/signin' element={<SignIn />}></Route>
          <Route path='/home/signup' element={<SignUp />}></Route>
          <Route
            path='/user/dashboard'
            element={<NavigateTODashboard />}></Route>

          <Route
            path='/receptionist/dashboard'
            element={
              <ReceptionDashboard>
                {' '}
                <RecDashboard />
              </ReceptionDashboard>
            }></Route>
          <Route
            path='/reception/dashboard/editProfile'
            element={
              <ReceptionDashboard>
                <REditProfile />{' '}
              </ReceptionDashboard>
            }></Route>
          <Route
            path='/reception/dashboard/PaidBills'
            element={
              <ReceptionDashboard>
                <PaidBillsPage />{' '}
              </ReceptionDashboard>
            }></Route>
          <Route
            path='/reception/dashboard/PendingBills'
            element={
              <ReceptionDashboard>
                <Bills />{' '}
              </ReceptionDashboard>
            }></Route>
          <Route
            path='/reception/dashboard/BedAllotment'
            element={
              <ReceptionDashboard>
                <BedAllotment />{' '}
              </ReceptionDashboard>
            }></Route>
          <Route
            path='/reception/dashboard/PendingBills/Bill_View/'
            element={
              <ReceptionDashboard>
                <Bill_View />{' '}
              </ReceptionDashboard>
            }></Route>

          <Route path='/doctorGallery' element={<SearchDoctor />}></Route>

          <Route
            path='/reception/dashboard/myProfile'
            element={
              <ReceptionDashboard>
                <RMyProfile />{' '}
              </ReceptionDashboard>
            }></Route>

          <Route
            path='/pathologist/dashboard'
            element={
              <PathologistDashboard>
                <PathDashbord />
              </PathologistDashboard>
            }></Route>
          <Route
            path='/pathologist/testReport/'
            element={
              <PathologistDashboard>
                <TestReport />
              </PathologistDashboard>
            }></Route>
          <Route
            path='/pathologist/myPathProfile'
            element={
              <PathologistDashboard>
                <MyPathProfile />
              </PathologistDashboard>
            }
          />
          <Route
            path='/pathologist/editProfile'
            element={
              <PathologistDashboard>
                <PathEditProfile />
              </PathologistDashboard>
            }
          />
          <Route
            path='/doctor/dashboard'
            element={
              <DoctorDashboard>
                <DoctDashboard />
              </DoctorDashboard>
            }></Route>
          <Route
            path='/doctor/myDoctProfile'
            element={
              <DoctorDashboard>
                <MyDoctProfile />
              </DoctorDashboard>
            }
          />
          <Route
            path='/doctor/editProfile'
            element={
              <DoctorDashboard>
                <DoctEditProfile />
              </DoctorDashboard>
            }
          />
          <Route path='/upload-image' element={<UploadImage />} />
          <Route
            path='/doctor/viewReport/:id'
            element={
              <DoctorDashboard>
                <ViewReport />
              </DoctorDashboard>
            }></Route>
          <Route
            path='/patient/dashboard'
            element={
              <PatientDashboard>
                <Dashboard />
              </PatientDashboard>
            }></Route>
          <Route
            path='/patient/pending-bills'
            element={
              <PatientDashboard>
                <PendingBills />
              </PatientDashboard>
            }></Route>
          <Route
            path='/patient/paid-bills'
            element={
              <PatientDashboard>
                <PaidBills />
              </PatientDashboard>
            }></Route>
          <Route
            path='/patient/report-history'
            element={
              <PatientDashboard>
                <ReportHistory />
              </PatientDashboard>
            }></Route>
          <Route
            path='/patient/book-appointment'
            element={
              <PatientDashboard>
                <BookAppointmnet />
              </PatientDashboard>
            }></Route>

          <Route
            path='/patient/book-emergency-appointment'
            element={
              <PatientDashboard>
                <BookEmergencyAppointmnet />
              </PatientDashboard>
            }></Route>

          <Route
            path='/patient/book-emergency-appointment-response'
            element={
              <PatientDashboard>
                <UrgentAppointmentResponse />
              </PatientDashboard>
            }></Route>

          <Route
            path='/home/getSecurityQ'
            element={<GetSecurityQuestion />}></Route>

          <Route
            path='/home/forgotpassword'
            element={<ForgotPassword />}></Route>



          <Route
            path='/home/setpassword'
            element={<SetPassword />}></Route>
          <Route
            path='/patient/pathology'
            element={
              <PatientDashboard>
                <Pathology />
              </PatientDashboard>
            }></Route>

          <Route
            path='/patient/book-pathology'
            element={
              <PatientDashboard>
                <BookPathology />
              </PatientDashboard>
            }></Route>

          <Route
            path='/patient/getDetailBill'
            element={
              <PatientDashboard>
                <DetailsBill />
              </PatientDashboard>
            }></Route>

          <Route
            path='/patient/myprofile'
            element={
              <PatientDashboard>
                <MyProfile />
              </PatientDashboard>
            }></Route>

          <Route
            path='/patient/editProfile'
            element={
              <PatientDashboard>
                <PEditProfile />
              </PatientDashboard>
            }></Route>

          <Route
            path='/patient/detailedReport'
            element={
              <PatientDashboard>
                <DetailedReport />
              </PatientDashboard>
            }></Route>

          {/* shivangi */}
          <Route
            path='/admin/dashboard'
            element={
              <AdminDashboard>
                <GetAllEmployees />
              </AdminDashboard>
            }></Route>
          {/* <Route path='/admin/dashboard' element={<AdminDashboard />}></Route> */}
          <Route
            path='/admin/GetAllEmployees'
            element={
              <AdminDashboard>
                <GetAllEmployees />
              </AdminDashboard>
            }
          />
          <Route
            path='/admin/updateEmployee'
            element={
              <AdminDashboard>
                <UpdateEmployee />
              </AdminDashboard>
            }
          />
          <Route
            path='/admin/AddEmployee'
            element={
              <AdminDashboard>
                <AddEmployee />
              </AdminDashboard>
            }
          />
          <Route
            path='/admin/updatePassword'
            element={<UpdatePassword />}></Route>

          <Route
            path='/admin/GetAllBeds'
            element={
              <AdminDashboard>
                <GetAllBeds />
              </AdminDashboard>
            }
          />
          <Route
            path='/admin/addbeds'
            element={
              <AdminDashboard>
                <AddBeds />
              </AdminDashboard>
            }
          />
          <Route path='/AboutUs' element={<About />} />
          <Route path='/PrivacyPolicy' element={<PrivacyPolicy />} />
          <Route path='/home/getSecurityQ' element={<GetSecurityQuestion />} />
          <Route
            path='/home/forgotpassword'
            element={<GetSecurityQuestion />}
          />

          <Route path='*' component={NotFound} />
        </Routes>
        {/* </ToastContainer> */}

        {/* this container is used to show toast messages */}
        <ToastContainer position='top-center' autoClose={1000} />
      </BrowserRouter>
    </div>
  )
}

export default App
