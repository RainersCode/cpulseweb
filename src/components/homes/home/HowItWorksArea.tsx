"use client";
import React from 'react';
import Link from 'next/link';
import SvgBgDecorator from './SvgBgDecorator';

const HowItWorksArea = () => {
  const steps = [
    {
      number: "01",
      title: "Login",
      description: "Search for 'CoinPulseBot' on Telegram and hit start.",
      icon: "login"
    },
    {
      number: "02",
      title: "Choose Your Sector",
      description: "Get top coins from DeFi, Gaming, AI, Layer-2 and more.",
      icon: "category"
    },
    {
      number: "03",
      title: "Get Real-Time Insights",
      description: "Get instant analysis with price data and sentiment.",
      icon: "show_chart"
    },
    {
      number: "04",
      title: "Make Informed Trades",
      description: "Use insights to make better trading decisions.",
      icon: "trending_up"
    }
  ];

  return (
    <>
      <section className="how-it-works-wrapper py-5" style={{ position: 'relative' }}>
        <SvgBgDecorator side="right" size="36%" opacity={0.1} />
        <div className="divider"></div>

        <div className="container py-5" style={{ position: 'relative', zIndex: 1 }}>
          {/* Section Header */}
          <div className="row mb-5">
            <div className="col-12 text-center">
              <div className="section-heading">
                <h2
                  className="mb-3 wow fadeInUp"
                  data-wow-duration="1000ms"
                  data-wow-delay="300ms"
                  style={{
                    fontSize: 'clamp(32px, 7vw, 70px)',
                    fontWeight: 700,
                    letterSpacing: '-2px',
                    lineHeight: '1.2',
                    marginBottom: '16px'
                  }}
                >
                  How CoinPulse Works
                </h2>
                <p
                  className="wow fadeInUp"
                  data-wow-duration="1000ms"
                  data-wow-delay="500ms"
                  style={{
                    fontSize: 'clamp(14px, 2vw, 18px)',
                    color: '#8B8B94',
                    fontWeight: 500
                  }}
                >
                  Get started in 4 simple steps
                </p>
              </div>
            </div>
          </div>

          {/* Steps Container - Vertical on Mobile, Horizontal on Desktop */}
          <div className="row g-4">
            {steps.map((step, index) => (
              <div key={index} className="col-12 col-lg-3 position-relative">
                {/* Step Card */}
                <div
                  className="wow fadeInUp h-100"
                  data-wow-duration="1000ms"
                  data-wow-delay={`${600 + index * 150}ms`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '32px 24px 24px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(236, 200, 11, 0.08) 0%, rgba(236, 200, 11, 0.03) 100%)',
                    border: '1px solid rgba(236, 200, 11, 0.2)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(236, 200, 11, 0.15) 0%, rgba(236, 200, 11, 0.08) 100%)';
                    e.currentTarget.style.borderColor = 'rgba(236, 200, 11, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(236, 200, 11, 0.08) 0%, rgba(236, 200, 11, 0.03) 100%)';
                    e.currentTarget.style.borderColor = 'rgba(236, 200, 11, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Icon Container with Gradient Background */}
                  <div
                    style={{
                      width: '110px',
                      height: '110px',
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #ECC80B 0%, #FFD700 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '28px',
                      boxShadow: '0 4px 12px rgba(236, 200, 11, 0.15)',
                      flexShrink: 0,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Background Glow Effect */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1), transparent 70%)',
                        pointerEvents: 'none'
                      }}
                    />

                    {/* Icon */}
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: '52px',
                        color: '#0E0E0E',
                        fontVariationSettings: '"FILL" 0, "wght" 600',
                        position: 'relative',
                        zIndex: 1,
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      {step.icon}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h4
                    style={{
                      fontSize: 'clamp(16px, 2vw, 20px)',
                      fontWeight: 700,
                      marginBottom: '12px',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {step.title}
                  </h4>

                  {/* Step Description */}
                  <p
                    style={{
                      fontSize: 'clamp(13px, 1.5vw, 15px)',
                      color: '#8B8B94',
                      lineHeight: '1.6',
                      marginBottom: '0',
                      flex: '1'
                    }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Arrow Connector - Desktop Only */}
                {index < steps.length - 1 && (
                  <div
                    className="d-none d-lg-flex"
                    style={{
                      position: 'absolute',
                      right: '-22px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '28px',
                      color: '#ECC80B',
                      fontWeight: 700,
                      zIndex: 1,
                      textShadow: '0 0 8px rgba(236, 200, 11, 0.4)'
                    }}
                  >
                    →
                  </div>
                )}

                {/* Vertical Arrow Connector - Mobile Only */}
                {index < steps.length - 1 && (
                  <div
                    className="d-lg-none text-center"
                    style={{
                      fontSize: '24px',
                      color: '#ECC80B',
                      fontWeight: 700,
                      margin: '20px 0',
                      textShadow: '0 0 8px rgba(236, 200, 11, 0.3)'
                    }}
                  >
                    ↓
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action Button */}
          <div className="row mt-5 wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="900ms">
            <div className="col-12 text-center">
              <Link
                href="https://t.me/CryptoOleBot"
                target="_blank"
                className="btn btn-primary"
              >
                <span>Start Now</span>
                <span>Start Now</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="divider"></div>
      </section>
    </>
  );
};

export default HowItWorksArea;
