
import React from 'react';

const FaqArea = ({ style_2 }: any) => {
  return (
    <>
      <div className={`faq-wrapper ${style_2 ? 'bg-secondary' : ''}`}>
        <div className="divider"></div>

        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-6">
              <div className="section-heading">
                <h2 className="mb-0">Frequently Asked Questions</h2>
              </div>

              <div className="divider-sm"></div>


              <div className="faq-image">
                <img src="/pricing-page/freq.jpg" alt="" />


                <div className="faq-info d-flex align-items-center">
                  <h2 className="mb-0">78</h2>
                  <p className="mb-0">Client Review</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="faq-accordion ps-lg-4">
                <div className="accordion" id="faqAccordion">

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#faqQuestion1" aria-expanded="true" aria-controls="faqQuestion1">
                        Can I upgrade or downgrade my plan anytime?
                      </button>
                    </h2>
                    <div id="faqQuestion1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                      <div className="accordion-body pt-0">
                        Yes! You can upgrade to a higher tier or downgrade to a lower tier at any time. Your changes will take effect immediately, and we'll adjust your billing accordingly on your next renewal date.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#faqQuestion2" aria-expanded="false" aria-controls="faqQuestion2">
                        How do I renew my subscription after 30 days?
                      </button>
                    </h2>
                    <div id="faqQuestion2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body pt-0">
                        Subscriptions require manual renewal. After 30 days, you'll be notified and can renew by making another crypto payment. Your bot access will remain active until you let your subscription expire.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#faqQuestion3" aria-expanded="false" aria-controls="faqQuestion3">
                        What if I don't like CoinPulse? Can I get a refund?
                      </button>
                    </h2>
                    <div id="faqQuestion3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body pt-0">
                        We stand behind our service, but crypto payments are generally non-refundable. However, we recommend trying our FREE plan first (3 daily suggestions, 1 category) to make sure CoinPulse works for you before upgrading.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#faqQuestion4" aria-expanded="false" aria-controls="faqQuestion4">
                        Do I need to provide personal information or ID to subscribe?
                      </button>
                    </h2>
                    <div id="faqQuestion4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body pt-0">
                        No KYC (Know Your Customer) required! Pay anonymously with crypto and maintain your privacy. We only need access to your Telegram account to deliver bot suggestions – no personal data collection.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#faqQuestion5" aria-expanded="false" aria-controls="faqQuestion5">
                        Which cryptocurrency should I use to pay for my subscription?
                      </button>
                    </h2>
                    <div id="faqQuestion5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body pt-0">
                        We accept BTC, ETH, USDT, TON, BNB, and many other cryptocurrencies. Choose whatever is most convenient for you. Your payment will be processed instantly, and your subscription will activate immediately.
                      </div>
                    </div>
                  </div>
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

export default FaqArea;