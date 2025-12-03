
import React from 'react';

const FooterOne = ({ style_2 }: any) => {
  return (
    <>
      <footer className={`footer-wrapper ${style_2 ? 'footer-2 bg-secondary' : ''}`}>
        <div className="divider"></div>

        <div className="container">
          <div className="row g-5">


            <div className="col-12 col-md-6 col-xl">
              <div className="footer-card">

                <a href="#">
                  <img className="dark-logo" src="/logo/coinpulse-og-image.png" alt="CoinPulse Logo" />
                  <img className="light-logo" src="/logo/coinpulse-og-image.png" alt="CoinPulse Logo" />
                </a>

                <p className="mb-0">AI-powered cryptocurrency insights delivered directly to Telegram. Get real-time market analysis, sector suggestions, and intelligent trading signals.</p>

                <div className="social-nav">
                  <a href="https://x.com/cpulse_crypto" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      className="bi bi-twitter-x" viewBox="0 0 16 16">
                      <path
                        d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>


            <div className="col-12 col-md-6 col-xl">
              <div className="footer-card">
                <h5 className="mb-0">Resources</h5>

                <ul className="footer-nav">
                  <li><a href="/">Home</a></li>
                  <li><a href="/pricing-plan">Pricing</a></li>
                  <li><a href="/articles">Latest News</a></li>
                  <li><a href="/contact">Contact</a></li>
                  <li><a href="/guide">Bot Guide</a></li>
                  <li><a href="https://x.com/cpulse_crypto" target="_blank">Follow on X</a></li>
                </ul>
              </div>
            </div>


            <div className="col-12 col-md-6 col-xl-4">
              <div className="footer-card">
                <h5 className="mb-0">Get Started</h5>
                <p style={{ fontSize: '13px', color: '#8B8B94', marginBottom: '16px' }}>Join 436+ crypto traders using CoinPulse Bot</p>
                <a href="https://t.me/CryptoOleBot" target="_blank" className="btn btn-primary" style={{ display: 'inline-block' }}>
                  <span>Start Bot Now</span>
                  <span>Start Bot Now</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        <div className="container">
          <div className="footer-line"></div>
        </div>

        <div className="container">
          <div className="row align-items-center">

            <div className="col-12 col-lg-6">
              <p className="mb-0 copyright">Copyright © {new Date().getFullYear()} <span id="year"></span> <a href="/">CoinPulse Bot</a> - AI-Powered Crypto Insights</p>
            </div>

            <div className="col-12 col-lg-6">
              <div className="footer-bottom-nav">
                <a href="/terms-and-conditions">Terms & conditions</a>
                <a href="/privacy-policy">Privacy policy</a>
              </div>
            </div>
          </div>
        </div>

        <div className="divider-sm"></div>
      </footer>
    </>
  );
};

export default FooterOne;