import React from 'react'
import './About.css'
import { ToastContainer } from 'react-toastify'
import backg from '../../assets/Image20220928204520.jpg'
import Footer from '../../components/Footer'

export default function PrivacyPolicy() {
  return (
    <>
      <div style={{backgroundImage : `url(${backg})`, paddingTop:'40px'}}>
        <div>
          <h1>Privacy Policy</h1>
          <div className='container'>
            S4 Hospitals are required by law to maintain the privacy of your
            medical information, to provide you with this written Notice of
            Privacy Rights and Practices, and to abide by the terms of the
            Notice currently in effect. This policy shall be applicable to the
            information collected or displayed on our website. We assure to take
            the privacy seriously and to keep your privacy and confidentiality
            of the information provided to us.
          </div>
        </div>
        {/* 1 Card Content */}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className='card-a'>
          <div className='card-a-1'>
            <div className='card-heading'>
              <h1>COMMUNICATION</h1>
            </div>
            <div className='card-content'>
              <h3>
                <p>
                  s4hmis Hospitals may reach out to you via various means of
                  communication including phone, SMS, online messengers , and
                  emails to update you with your appointments, medical history,
                  doctor requests, updates at s4hmis Hospitals and its other
                  properties operated by Mandke Foundation. If you do not wish
                  to receive such communications, you can either communicate the
                  same to the caller, use the unsubscribe link on the bottom of
                  the emails, or send a request to
                  initiatives.nm@reliancehospitals.com and the same will be
                  acted upon within 2 weeks.
                </p>
              </h3>
            </div>
          </div>
          {/* end 1 Card Content */}
        </div>
        <br></br>
        <br></br>
        <div className='card-b'>
          <div className='card-b-1'>
            <div className='card-heading'>
              <h1>DATA COLLECTED</h1>
            </div>
            <div className='card-content'>
              <h3>
                <p>
                  We collect and store anonymous data from every visitor of the
                  Website/application to monitor traffic and fix bugs on our
                  server. For example, we collect information like web requests,
                  the data sent in response to such requests, the Internet
                  Protocol address, the browser type, the browser language, and
                  a timestamp for the request.
                </p>
              </h3>
            </div>
          </div>
        </div>
        <div className='card-c'>
          <div className='card-c-1'>
            <div className='card-heading'>
              <h1>USE OF THE DATA</h1>
            </div>
            <div className='card-content'>
              <h3>
                We only use your personal information to provide you Reliance
                Hospitals services or to communicate with you about the services
                or the Website.With respect to any information you may choose to
                upload to Reliance Hospitals , we take the privacy and
                confidentiality of such information seriously.
                <br></br>
                <br></br>
              </h3>
            </div>
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
        <br></br> <br></br> <br></br> <br></br> <br></br>
        <Footer></Footer>
      </div>
    </>
  )
}
