import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
        <i className='bi bi-facebook ' style={styles.icons}></i>
            <i className='bi bi-twitter' style={styles.icons}></i>
            <i className='bi bi-whatsapp' style={styles.icons}></i>
            <i className='bi bi-instagram' style={styles.icons}></i>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                S4Hospitals
              </h6>
              <p>
              Established by Dr Prathap C Reddy in 1983, S4 Healthcare has a robust presence across the healthcare ecosystem. From routine wellness & preventive health care to innovative life-saving treatments and diagnostic services, S4 Hospitals has touched more than 120 million lives from over 120 countries, offering the best clinical outcomes.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Services</h6>
              <p>
                <a style={{textDecoration:'none'}} className='text-reset'>
                  Pathology
                </a>
              </p>
              <p>
                <a style={{textDecoration:'none'}} className='text-reset'>
                  Consultation
                </a>
              </p>
              <p>
                <a className='text-reset' style={{textDecoration:'none'}}>
                  Operation
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='/AboutUs' style={{textDecoration:'none'}} className='text-reset'>
                  About Us
                </a>
              </p>
              <p>
                <a href='/PrivacyPolicy' style={{textDecoration:'none'}} className='text-reset'>
                  Privacy Policy
                </a>
              </p>
              <p>
                <a href='/doctorGallery' style={{textDecoration:'none'}} className='text-reset'>
                  Doctor's Gallery
                </a>
              </p>

            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Lower Parel, Mumbai 452125, India
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@s4hospitals.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 91 789 754 8888
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" />+ 91 789 754 8889
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright:
        <a className='text-reset fw-bold' href='/home'>
          S4Hospitals.com
        </a>
      </div>
    </MDBFooter>
  );
}

const styles = {
  icons: {
    padding: '10px',
  },
  content: {
    backgroundColor: '#DFDCE3',
    alignContent: 'center',
    margin: 0,
  },
}