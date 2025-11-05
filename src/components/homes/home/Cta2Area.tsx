import React from 'react';

const Cta2Area = () => {
  return (
    <>
      <div className="cta-wrapper py-5">
        <div className="divider"></div>

        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-6">
              <h2 className="wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="700ms">Ready to Get Started?</h2>
            </div>
            <div className="col-12 col-lg-6">
              <p className="wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="900ms">Ready to transform your crypto trading strategy? CoinPulse Bot provides AI-powered insights, real-time market analysis, and intelligent trading suggestions to help you make smarter investment decisions across multiple blockchain sectors.</p>
              <a
                href="https://t.me/CryptoOleBot"
                target="_blank"
                className="btn btn-primary wow fadeInUp"
                data-wow-duration="1000ms"
                data-wow-delay="1100ms"
                style={{ minWidth: '280px' }}
              >
                <span>Launch CoinPulse Bot</span>
                <span>Launch CoinPulse Bot</span>
              </a>
            </div>
          </div>
        </div>

        <div className="divider"></div>
      </div>
    </>
  );
};

export default Cta2Area;