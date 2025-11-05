
import React from 'react';

const FaqsArea = () => {
  return (
    <>
      <div className="faq-page-wrapper">
        <div className="divider"></div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="faq-accordion service-details-faq">
                <div className="accordion" id="faqAccordion">

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#faqQuestion1" aria-expanded="true" aria-controls="faqQuestion1">
                        What is CoinPulse and how does it work?
                      </button>
                    </h2>
                    <div id="faqQuestion1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">
                        CoinPulse is your AI trading assistant that analyzes thousands of cryptocurrencies 24/7 across 12 major sectors (DeFi, AI, Gaming, Meme coins, and more). Instead of spending hours scrolling social media and Discord channels, just press a button and get instant, curated coin suggestions backed by data in just 3 seconds.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#faqQuestion2" aria-expanded="false" aria-controls="faqQuestion2">
                        Is CoinPulse free to use?
                      </button>
                    </h2>
                    <div id="faqQuestion2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">
                        Yes! We offer a FREE plan that gives you 3 coin suggestions per day and access to 1 category. It's perfect for trying the bot and seeing how it works. For unlimited access, market analysis, and AI insights, you can upgrade to our BASIC ($5/month), PREMIUM ($15/month), or PRO ($30/month) plans.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#faqQuestion3" aria-expanded="false" aria-controls="faqQuestion3">
                        What payment methods do you accept?
                      </button>
                    </h2>
                    <div id="faqQuestion3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">
                        We accept cryptocurrency payments including BTC, ETH, USDT, TON, BNB, and more. Best part? No KYC required – pay anonymously with crypto. Subscriptions are valid for 30 days and require manual renewal. This gives you maximum privacy and flexibility in how you manage your subscription.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#faqQuestion4" aria-expanded="false" aria-controls="faqQuestion4">
                        Is this financial advice?
                      </button>
                    </h2>
                    <div id="faqQuestion4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">
                        No. CoinPulse is a tool to help you discover opportunities faster. Our AI analysis provides insights based on technical indicators and market trends, but we provide data, not financial advice. You make the decisions. Always Do Your Own Research (DYOR) and invest responsibly – only risk what you can afford to lose. Past performance does not guarantee future results.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#faqQuestion5" aria-expanded="false" aria-controls="faqQuestion5">
                        What features are included in each plan?
                      </button>
                    </h2>
                    <div id="faqQuestion5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">
                        <strong>FREE:</strong> 3 daily suggestions, 1 category access<br/>
                        <strong>BASIC:</strong> All 12 categories, unlimited suggestions<br/>
                        <strong>PREMIUM:</strong> All features + 12 AI analyses/month, Top 10 Elite, Market Sentiment, priority support<br/>
                        <strong>PRO:</strong> Everything + 20 AI analyses/month, Yesterday's Champion, 24/7 VIP support<br/><br/>
                        Each paid plan gives you access to Top Trending Coins, Specialized Sector Analysis, and more. Upgrade anytime to unlock advanced features.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-9 col-xl-8">
              <div className="section-heading text-center">
                <h2>Ready to discover crypto opportunities faster?</h2>
                <p>Start with our FREE plan and get 3 coin suggestions per day. No credit card required. Upgrade anytime to unlock unlimited access, AI analysis, and premium features.</p>
                <a href="/pricing-plan" className="btn btn-primary mt-5"><span>View Pricing Plans</span><span>View Pricing Plans</span></a>
              </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>
      </div>
    </>
  );
};

export default FaqsArea;