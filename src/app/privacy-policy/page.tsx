"use client";
import React from 'react';
import HeaderOne from '@/layouts/headers/HeaderOne';
import FooterOne from '@/layouts/footers/FooterOne';

const PrivacyPolicy = () => {
  return (
    <>
      <HeaderOne />
      <section className="privacy-policy-wrapper py-5">
        <div className="divider"></div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="privacy-content">
                <h1 className="mb-4">Privacy Policy</h1>
                <p style={{ fontSize: '14px', color: '#8B8B94', marginBottom: '32px' }}>
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <div className="privacy-section mb-5">
                  <h3 className="mb-3">1. Introduction</h3>
                  <p>
                    CoinPulse Bot ("we", "our", or "us") operates the Service. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                  </p>
                </div>

                <div className="privacy-section mb-5">
                  <h3 className="mb-3">2. Information Collection and Use</h3>
                  <p>
                    We collect several different types of information for various purposes to provide and improve our Service to you.
                  </p>
                  <h5 className="mt-3 mb-2">Types of Data Collected:</h5>
                  <ul style={{ marginLeft: '20px' }}>
                    <li><strong>Telegram User Information:</strong> When you use our Telegram bot, we may collect your Telegram user ID and username.</li>
                    <li><strong>Usage Data:</strong> We may collect information about how you interact with our Service (pages viewed, commands used, etc.).</li>
                    <li><strong>Device Information:</strong> We may collect information about your device such as device type and operating system.</li>
                  </ul>
                </div>

                <div className="privacy-section mb-5">
                  <h3 className="mb-3">3. Use of Data</h3>
                  <p>
                    CoinPulse Bot uses the collected data for various purposes:
                  </p>
                  <ul style={{ marginLeft: '20px', marginTop: '16px' }}>
                    <li>To provide and maintain our Service</li>
                    <li>To notify you about changes to our Service</li>
                    <li>To provide customer support</li>
                    <li>To gather analysis or valuable information so that we can improve our Service</li>
                    <li>To monitor the usage of our Service</li>
                    <li>To detect, prevent and address technical issues</li>
                  </ul>
                </div>

                <div className="privacy-section mb-5">
                  <h3 className="mb-3">4. Security of Data</h3>
                  <p>
                    The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
                  </p>
                </div>

                <div className="privacy-section mb-5">
                  <h3 className="mb-3">5. Cookies</h3>
                  <p>
                    We may use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                  </p>
                </div>

                <div className="privacy-section mb-5">
                  <h3 className="mb-3">6. Third-Party Services</h3>
                  <p>
                    Our Service may contain links to third-party websites and services that are not operated by us. This Privacy Policy does not apply to these external sites, and we are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party service before providing your personal information.
                  </p>
                </div>

                <div className="privacy-section mb-5">
                  <h3 className="mb-3">7. Telegram API</h3>
                  <p>
                    Our Service uses the Telegram Bot API to provide services through Telegram. Your interaction with our bot through Telegram is subject to Telegram's Privacy Policy as well as this Privacy Policy.
                  </p>
                </div>

                <div className="privacy-section mb-5">
                  <h3 className="mb-3">8. Binance API</h3>
                  <p>
                    We use the Binance public API to fetch cryptocurrency data. This integration is subject to Binance's Terms of Service. We do not store or transmit your Binance account credentials through our Service.
                  </p>
                </div>

                <div className="privacy-section mb-5">
                  <h3 className="mb-3">9. Changes to This Privacy Policy</h3>
                  <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
                  </p>
                </div>

                <div className="privacy-section mb-5">
                  <h3 className="mb-3">10. Contact Us</h3>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us on Telegram at <a href="https://t.me/CryptoOleBot" target="_blank" rel="noopener noreferrer" style={{ color: '#ECC80B' }}>@CryptoOleBot</a> or follow us on X at <a href="https://x.com/cpulse_crypto" target="_blank" rel="noopener noreferrer" style={{ color: '#ECC80B' }}>@cpulse_crypto</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>
      </section>
      <FooterOne />
    </>
  );
};

export default PrivacyPolicy;
