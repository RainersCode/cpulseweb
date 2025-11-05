
"use client";
import React from 'react';
import Link from 'next/link';

// CSS for improving pricing plan badge visibility in dark mode
const planBadgeStyles = `
  html.dark-mode .plan-description {
    color: #ECC80B !important;
    font-weight: 600;
  }

  html.light-mode .plan-description {
    color: #8B8B94 !important;
  }
`;

const PricingPlanArea = () => {

  const pricingPlans = [
    {
      name: "BASIC",
      monthlyPrice: 5,
      yearlyPrice: 50,
      description: "Perfect for beginners",
      features: [
        { text: "All 12 categories", included: true },
        { text: "Unlimited coin suggestions", included: true },
        { text: "Daily trending coins", included: true },
        { text: "Email support", included: true },
        { text: "AI analysis", included: false },
        { text: "Market Sentiment", included: false },
      ],
      badge: null,
      buttonStyle: "btn-dark",
    },
    {
      name: "PREMIUM",
      monthlyPrice: 15,
      yearlyPrice: 150,
      description: "Popular choice for active traders",
      features: [
        { text: "All 12 categories", included: true },
        { text: "Unlimited coin suggestions", included: true },
        { text: "12 AI analyses/month", included: true },
        { text: "Top 10 Elite 🏆", included: true },
        { text: "Market Sentiment 📰", included: true },
        { text: "Priority support", included: true },
      ],
      badge: null,
      buttonStyle: "btn-dark",
    },
    {
      name: "PRO",
      monthlyPrice: 30,
      yearlyPrice: 300,
      description: "For professional traders",
      features: [
        { text: "All 12 categories", included: true },
        { text: "Unlimited coin suggestions", included: true },
        { text: "20 AI analyses/month", included: true },
        { text: "Top 10 Elite 🏆", included: true },
        { text: "Market Sentiment 📰", included: true },
        { text: "Yesterday's Champion 👑 + 24/7 VIP support", included: true },
      ],
      badge: "Your Current Plan",
      buttonStyle: "btn-primary",
    },
  ];

  return (
    <>
      <style>{planBadgeStyles}</style>
      <div className="price-table-wrapper">
        <div className="divider"></div>

        <div className="container">
          {/* Free Plan Info Section */}
          <div className="row mb-5 justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="free-plan-intro text-center mb-5">
                <h3 className="mb-3">🎁 Start for Free</h3>
                <p className="mb-3">
                  Not ready to commit? Try CoinPulse free with <strong>3 coin suggestions per day</strong> and access to <strong>1 category</strong>. Perfect for exploring and seeing how the bot works. No credit card required!
                </p>
                <p className="mb-0">
                  Ready for more? Upgrade to any plan below to unlock unlimited suggestions, AI analysis, and premium features.
                </p>
              </div>
            </div>
          </div>

<div className="row g-4">
            {pricingPlans.map((plan, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className={`price-card h-100 ${plan.badge ? 'shadow-lg' : ''}`} style={plan.badge ? { borderWidth: '2px', borderColor: '#ECC80B', borderStyle: 'solid' } : {}}>
                  {plan.badge && (
                    <div className="badge position-absolute top-0 start-50 translate-middle-x mt-2" style={{ backgroundColor: '#ECC80B', color: '#0E0E0E' }}>
                      {plan.badge}
                    </div>
                  )}

                  <div className="price-info">
                    <h5 className="mb-2">{plan.name}</h5>
                    <h3 className="price mb-1">
                      ${(plan.monthlyPrice).toFixed(2)}
                      <span className="fs-6">/mo</span>
                    </h3>
                    <p className="mb-0 plan-description small">{plan.description}</p>
                  </div>

                  <ul className="price-description list-unstyled">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={feature.included ? '' : 'opacity-50'}>
                        <span className="material-symbols-outlined">
                          {feature.included ? 'check' : 'close'}
                        </span>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="choose-plan mt-auto">
                    <Link
                      href="#subscribe"
                      className={`btn ${plan.buttonStyle} w-100`}
                    >
                      <span>Subscribe to {plan.name}</span>
                      <span>Subscribe to {plan.name}</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Methods Section */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="payment-methods-section text-center">
                <h4 className="mb-4">💳 Payment Methods</h4>
                <p className="mb-3">
                  <strong>Crypto (BTC, ETH, USDT, TON, BNB, etc.)</strong>
                </p>
                <div className="payment-info">
                  <p className="mb-2">
                    <span className="badge bg-success me-2">🔒 No KYC Required</span>
                    Pay anonymously with crypto
                  </p>
                  <p>
                    <small>📅 Duration: 30 days per payment (manual renewal)</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>
      </div>
    </>
  );
};

export default PricingPlanArea;