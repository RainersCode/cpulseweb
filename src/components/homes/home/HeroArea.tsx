'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import 'jarallax/dist/jarallax.css';

const HeroArea = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only enable jarallax on desktop (min-width: 768px)
      if (window.innerWidth >= 768) {
        import("jarallax").then(({ jarallax }) => {
          jarallax(document.querySelectorAll<HTMLElement>(".hero-wrapper"), {
            speed: 0.6,
          });
          // Initialize parallax for the EDITION image
          jarallax(document.querySelectorAll<HTMLElement>(".hero-wrapper .jarallax"), {
            speed: 0.3,
          });
        });
      }
    }
  }, []);

  return (
    <>
      <section
        className="hero-wrapper jarallax py-5"
        data-jarallax=""
        data-speed="0.6"
        style={{
          position: 'relative',
          backgroundColor: '#1A1A1A',
          backgroundAttachment: 'fixed'
        }}
      >
        <style>{`
          .hero-wrapper {
            background-color: #1A1A1A;
            background-image:
              linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.1) 100%);
            background-size: 100%;
            background-position: center, center;
            background-repeat: no-repeat;
            background-attachment: scroll !important;
          }

          /* EDITION image on mobile - behind text */
          @media (max-width: 767px) {
            .edition-image-wrapper {
              position: absolute !important;
              right: -50px !important;
              top: 0 !important;
              transform: none !important;
              width: 150% !important;
              max-width: none !important;
              height: 1000px !important;
              z-index: 0 !important;
              opacity: 0.3 !important;
              background-size: contain !important;
            }
          }

          .light-mode .hero-wrapper {
            background-color: #fff !important;
            background-image:
              linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.01) 50%, rgba(0, 0, 0, 0.02) 100%) !important;
            background-size: 100% !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
          }

          body.light-mode .hero-wrapper {
            background-color: #fff !important;
            background-image:
              linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.01) 50%, rgba(0, 0, 0, 0.02) 100%) !important;
            background-size: 100% !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
          }

          .hero-wrapper > .jarallax-img {
            transform: scale(0.25) !important;
            transform-origin: center center !important;
          }

          .hero-wrapper .hero-content h2 {
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.3);
          }

          .light-mode .hero-wrapper .hero-content h2 {
            color: #FFFFFF;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.3), 0 8px 16px rgba(0, 0, 0, 0.4);
          }

          .light-mode .hero-wrapper .hero-content p {
            color: #1a1a1a !important;
            text-shadow: 0 1px 3px rgba(255, 255, 255, 0.8) !important;
          }

          body.light-mode .hero-wrapper .hero-content p {
            color: #1a1a1a !important;
            text-shadow: 0 1px 3px rgba(255, 255, 255, 0.8) !important;
          }

          .light-mode .hero-stats h4 {
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
          }

          body.light-mode .hero-stats h4 {
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
          }

          .light-mode .hero-wrapper::after {
            background-color: transparent !important;
            opacity: 0 !important;
          }

          body.light-mode .hero-wrapper::after {
            background-color: transparent !important;
            opacity: 0 !important;
          }
        `}</style>
        <div className="divider"></div>

        {/* Static SVG background */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 0,
            pointerEvents: 'none',
            backgroundImage: 'url(/bg-logo/Asset%203.svg)',
            backgroundSize: '50%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center left',
            width: '100%',
            height: '100%',
            opacity: 0.15
          }}
        >
        </div>

        {/* Right side original image with parallax */}
        <div
          className="edition-image-wrapper jarallax"
          data-jarallax=""
          data-speed="0.3"
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            pointerEvents: 'none',
            backgroundImage: 'url(/bg-desktop/EDITION.png)',
            backgroundAttachment: 'fixed',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            maxWidth: '1000px',
            width: '1000px',
            height: '800px'
          }}
        >
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row">
            <div className="col-12">
              <div className="hero-content">
                <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                  <h2
                    className="mb-4 wow fadeInUp"
                    data-wow-duration="1000ms"
                    data-wow-delay="500ms"
                    style={{
                      fontSize: 'clamp(32px, 7vw, 70px)',
                      fontWeight: 700,
                      letterSpacing: '-2px',
                      lineHeight: '1.2',
                      marginBottom: '24px'
                    }}
                  >
                    AI-Powered Crypto
                  </h2>

                  <h2
                    className="mb-4 wow fadeInUp"
                    data-wow-duration="1000ms"
                    data-wow-delay="600ms"
                    style={{
                      fontSize: 'clamp(32px, 7vw, 70px)',
                      fontWeight: 700,
                      letterSpacing: '-2px',
                      lineHeight: '1.2',
                      marginBottom: '32px'
                    }}
                  >
                    Insights on Telegram
                  </h2>

                </div>
              </div>

              <div
                className="hero-cta-buttons mt-4 wow fadeInUp d-flex align-items-center justify-content-center gap-3 flex-wrap"
                data-wow-duration="1000ms"
                data-wow-delay="1000ms"
              >
                <Link
                  href="https://t.me/CryptoOleBot"
                  target="_blank"
                  className="btn btn-primary"
                >
                  <span>Start Bot</span>
                  <span>Start Bot</span>
                </Link>
                <Link
                  href="/pricing-plan"
                  className="btn btn-dark"
                >
                  <span>View Pricing</span>
                  <span>View Pricing</span>
                </Link>
              </div>

              <div
                className="hero-stats mt-5 d-flex gap-4 justify-content-center flex-wrap wow fadeInUp"
                data-wow-duration="1000ms"
                data-wow-delay="1200ms"
              >
                <div className="stat-item text-center">
                  <h4 className="mb-1" style={{ fontSize: '32px', fontWeight: 700, color: '#fff' }}>
                    436
                  </h4>
                  <p className="mb-0" style={{ fontSize: '13px', color: '#8B8B94' }}>
                    Active Users
                  </p>
                </div>
                <div className="stat-item text-center">
                  <h4 className="mb-1" style={{ fontSize: '32px', fontWeight: 700, color: '#fff' }}>
                    100%
                  </h4>
                  <p className="mb-0" style={{ fontSize: '13px', color: '#8B8B94' }}>
                    Real-Time Data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>
      </section>
    </>
  );
};

export default HeroArea;