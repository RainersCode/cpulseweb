"use client"
import React from 'react';

const ContactArea = () => {

  return (
    <>
      <div className="contact-details-wrap">
        <div className="divider"></div>

        <div className="container">
          <div className="row g-4 justify-content-center">

            <div className="col-12 col-md-6 col-lg-4">
              <a href="https://x.com/cpulse_crypto" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div className="contact-info-card" style={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '2px solid transparent'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(236, 200, 11, 0.3)';
                    e.currentTarget.style.borderColor = '#ECC80B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}>
                  <div className="icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                      className="bi bi-twitter-x" viewBox="0 0 16 16" style={{ color: '#ECC80B' }}>
                      <path
                        d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                    </svg>
                  </div>

                  <p className="mb-0">Follow Us</p>
                  <h4>@cpulse_crypto</h4>
                </div>
              </a>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <a href="https://t.me/cpqhere" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div className="contact-info-card" style={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '2px solid transparent'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(236, 200, 11, 0.3)';
                    e.currentTarget.style.borderColor = '#ECC80B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}>
                  <div className="icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <path d="M20 0C8.95 0 0 8.95 0 20c0 11.05 8.95 20 20 20s20-8.95 20-20c0-11.05-8.95-20-20-20zm8.75 14.25l-2.75 13c-.2 1-.75 1.25-1.5.75l-4.1-3.05-1.95 1.9c-.2.25-.5.35-.75.35l.3-4.05 7.35-6.65c.3-.3 0-.45-.5-.15l-9.1 5.75-3.9-1.25c-1-.3-1-.95.2-1.4l15.2-5.9c.7-.25 1.35.15 1.1 1.35z" fill="#ECC80B"/>
                    </svg>
                  </div>

                  <p className="mb-0">Support</p>
                  <h4>Telegram Support</h4>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="divider"></div>


        <div className="maps-wrap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25280012016!2d-74.14448732737499!3d40.69763123331177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1732385899288!5m2!1sen!2sbd"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>


        <div className="contact-form-wrap contact-page-form">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                <div className="contact-form bg-secondary m-0 mt-0">
                  <div className="section-heading text-center">
                    <h2>Have Questions?</h2>
                    <p>Contact us on Telegram for instant support!</p>
                  </div>

                  <div className="divider-sm"></div>

                  <div className="text-center">
                    <a href="https://t.me/cpqhere" target="_blank" rel="noopener noreferrer" className="btn btn-primary rounded-pill">
                      <span>Chat on Telegram</span>
                      <span>Chat on Telegram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactArea;