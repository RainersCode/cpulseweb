"use client";
import React from "react";

const GuideContent = () => {
  return (
    <section className="guide-content-wrapper py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-10 mx-auto">
            {/* Getting Started Section */}
            <div className="guide-section mb-5">
              <h2 className="mb-4">🚀 Getting Started with CoinPulse Bot</h2>
              <p className="mb-4" style={{ color: '#8B8B94' }}>
                CoinPulse is your AI-powered cryptocurrency trading assistant. Follow these simple steps to get started:
              </p>

              <style>{`
                .steps .step-item {
                  border-left: 4px solid #ECC80B;
                  background: transparent;
                  padding: 16px 20px;
                  border-radius: 8px;
                  transition: all 0.3s ease;
                }

                .steps .step-item:hover {
                  border-left-color: #FFD700;
                  transform: translateX(4px);
                }
              `}</style>

              <div className="steps">
                <div className="step-item mb-4 rounded">
                  <h5 className="mb-3">Step 1: Start the Bot</h5>
                  <p style={{ color: '#8B8B94' }}>
                    Go to <a href="https://t.me/cpqhere" target="_blank" rel="noopener noreferrer" className="text-primary fw-bold">@cpqhere on Telegram</a> and click the "START" button or send <code>/start</code>
                  </p>
                </div>

                <div className="step-item mb-4 rounded">
                  <h5 className="mb-3">Step 2: Choose Your Plan</h5>
                  <p style={{ color: '#8B8B94' }}>
                    Select from FREE, BASIC, PREMIUM, or PRO plans. Each plan offers different features and limits. You can upgrade anytime!
                  </p>
                </div>

                <div className="step-item mb-4 rounded">
                  <h5 className="mb-3">Step 3: Get Coin Suggestions</h5>
                  <p style={{ color: '#8B8B94' }}>
                    Use the <code>/coins</code> command to get trending coins, or browse specific categories to find gems in your favorite sectors.
                  </p>
                </div>

                <div className="step-item mb-4 rounded">
                  <h5 className="mb-3">Step 4: Explore More Features</h5>
                  <p style={{ color: '#8B8B94' }}>
                    Depending on your plan, unlock AI analysis, market sentiment, elite picks, and more. Check the command list below!
                  </p>
                </div>
              </div>
            </div>

            <hr className="my-5" />

            {/* How It Works */}
            <div className="guide-section mb-5">
              <h2 className="mb-4">⚙️ How CoinPulse Works</h2>

              <div className="feature-box mb-4 p-4 border-left" style={{ borderLeft: '4px solid #ECC80B' }}>
                <h5 className="mb-2">📊 Real-Time Analysis</h5>
                <p style={{ color: '#8B8B94' }}>
                  CoinPulse analyzes thousands of cryptocurrencies 24/7 using advanced AI algorithms and technical indicators to identify trending coins and emerging opportunities.
                </p>
              </div>

              <div className="feature-box mb-4 p-4 border-left" style={{ borderLeft: '4px solid #ECC80B' }}>
                <h5 className="mb-2">🎯 12 Specialized Categories</h5>
                <p style={{ color: '#8B8B94' }}>
                  We categorize coins into 12 major sectors: DeFi, AI & Machine Learning, Gaming, Layer 2s, Meme Coins, Web3, Privacy, Infrastructure, NFTs, Staking, Yield, and more.
                </p>
              </div>

              <div className="feature-box mb-4 p-4 border-left" style={{ borderLeft: '4px solid #ECC80B' }}>
                <h5 className="mb-2">⚡ Instant Suggestions</h5>
                <p style={{ color: '#8B8B94' }}>
                  Get curated coin suggestions in just 3 seconds. No need to scroll through endless social media posts or Discord channels!
                </p>
              </div>

              <div className="feature-box mb-4 p-4 border-left" style={{ borderLeft: '4px solid #ECC80B' }}>
                <h5 className="mb-2">🤖 AI-Powered Insights (Premium)</h5>
                <p style={{ color: '#8B8B94' }}>
                  Upgrade to PREMIUM or PRO to unlock detailed AI analysis with entry/exit points, risk assessment, and market sentiment analysis.
                </p>
              </div>
            </div>

            <hr className="my-5" />

            {/* Commands Section */}
            <div className="guide-section mb-5">
              <h2 className="mb-4">📋 Bot Commands List</h2>
              <p className="mb-4" style={{ color: '#8B8B94' }}>
                Here are all available commands you can use with CoinPulse bot:
              </p>

              <style>{`
                .commands-table table {
                  color: #8B8B94;
                  background-color: transparent !important;
                }

                .commands-table table thead {
                  background-color: transparent !important;
                }

                .commands-table table tbody {
                  background-color: transparent !important;
                }

                .commands-table table th {
                  background-color: transparent !important;
                  color: #FEFEFE;
                  border-color: #404040;
                  border-bottom: 2px solid #ECC80B;
                }

                .commands-table table td {
                  border-color: #404040;
                  color: #8B8B94;
                  padding: 14px 10px;
                  background-color: transparent !important;
                }

                .commands-table table tbody tr {
                  background-color: transparent !important;
                }

                .commands-table table tbody tr:hover {
                  background-color: rgba(236, 200, 11, 0.08) !important;
                }

                .commands-table table code {
                  background-color: rgba(236, 200, 11, 0.15) !important;
                  color: #ECC80B !important;
                  padding: 2px 6px !important;
                  border-radius: 3px !important;
                  font-weight: 600;
                }

                /* Light mode */
                :is(html[data-bs-theme="light"]) .commands-table table {
                  color: #1A1A1A;
                  background-color: transparent !important;
                }

                :is(html[data-bs-theme="light"]) .commands-table table thead {
                  background-color: transparent !important;
                }

                :is(html[data-bs-theme="light"]) .commands-table table tbody {
                  background-color: transparent !important;
                }

                :is(html[data-bs-theme="light"]) .commands-table table th {
                  background-color: transparent !important;
                  color: #0E0E0E;
                  border-color: #d0d0d0;
                  border-bottom: 2px solid #ECC80B;
                }

                :is(html[data-bs-theme="light"]) .commands-table table td {
                  border-color: #d0d0d0;
                  color: #1A1A1A;
                  background-color: transparent !important;
                }

                :is(html[data-bs-theme="light"]) .commands-table table tbody tr {
                  background-color: transparent !important;
                }

                :is(html[data-bs-theme="light"]) .commands-table table tbody tr:hover {
                  background-color: rgba(236, 200, 11, 0.05) !important;
                }

                :is(html[data-bs-theme="light"]) .commands-table table code {
                  background-color: #ECC80B !important;
                  color: #000000 !important;
                  padding: 2px 6px !important;
                  border-radius: 3px !important;
                  font-weight: 600 !important;
                }
              `}</style>

              <div className="commands-table">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th style={{ width: '20%' }}>Command</th>
                      <th style={{ width: '40%' }}>Description</th>
                      <th style={{ width: '20%' }}>Plan</th>
                      <th style={{ width: '20%' }}>Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>/start</code></td>
                      <td>Initialize the bot and see main menu</td>
                      <td><span className="badge bg-success">All</span></td>
                      <td>Send once</td>
                    </tr>
                    <tr>
                      <td><code>/coins</code></td>
                      <td>Get trending coin suggestions</td>
                      <td><span className="badge bg-success">All</span></td>
                      <td>Anytime</td>
                    </tr>
                    <tr>
                      <td><code>/defi</code></td>
                      <td>Get top DeFi coins</td>
                      <td><span className="badge bg-info">BASIC+</span></td>
                      <td>Anytime</td>
                    </tr>
                    <tr>
                      <td><code>/ai</code></td>
                      <td>Get top AI & ML coins</td>
                      <td><span className="badge bg-info">BASIC+</span></td>
                      <td>Anytime</td>
                    </tr>
                    <tr>
                      <td><code>/gaming</code></td>
                      <td>Get top Gaming coins</td>
                      <td><span className="badge bg-info">BASIC+</span></td>
                      <td>Anytime</td>
                    </tr>
                    <tr>
                      <td><code>/meme</code></td>
                      <td>Get top Meme coins</td>
                      <td><span className="badge bg-info">BASIC+</span></td>
                      <td>Anytime</td>
                    </tr>
                    <tr>
                      <td><code>/layer2</code></td>
                      <td>Get top Layer 2 coins</td>
                      <td><span className="badge bg-info">BASIC+</span></td>
                      <td>Anytime</td>
                    </tr>
                    <tr>
                      <td><code>/web3</code></td>
                      <td>Get top Web3 coins</td>
                      <td><span className="badge bg-info">BASIC+</span></td>
                      <td>Anytime</td>
                    </tr>
                    <tr>
                      <td><code>/privacy</code></td>
                      <td>Get top Privacy coins</td>
                      <td><span className="badge bg-info">BASIC+</span></td>
                      <td>Anytime</td>
                    </tr>
                    <tr>
                      <td><code>/infra</code></td>
                      <td>Get top Infrastructure coins</td>
                      <td><span className="badge bg-info">BASIC+</span></td>
                      <td>Anytime</td>
                    </tr>
                    <tr>
                      <td><code>/nft</code></td>
                      <td>Get top NFT coins</td>
                      <td><span className="badge bg-info">BASIC+</span></td>
                      <td>Anytime</td>
                    </tr>
                    <tr>
                      <td><code>/staking</code></td>
                      <td>Get top Staking coins</td>
                      <td><span className="badge bg-info">BASIC+</span></td>
                      <td>Anytime</td>
                    </tr>
                    <tr>
                      <td><code>/top10</code></td>
                      <td>Get Top 10 Elite picks across all sectors</td>
                      <td><span className="badge bg-warning">PREMIUM+</span></td>
                      <td>Anytime</td>
                    </tr>
                    <tr>
                      <td><code>/sentiment</code></td>
                      <td>Get market sentiment analysis</td>
                      <td><span className="badge bg-warning">PREMIUM+</span></td>
                      <td>Anytime</td>
                    </tr>
                    <tr>
                      <td><code>/analyze [coin]</code></td>
                      <td>Get detailed AI analysis of any coin</td>
                      <td><span className="badge bg-warning">PREMIUM+</span></td>
                      <td>Limited per month</td>
                    </tr>
                    <tr>
                      <td><code>/yesterday</code></td>
                      <td>See yesterday's best performing coin</td>
                      <td><span className="badge bg-danger">PRO</span></td>
                      <td>Once daily</td>
                    </tr>
                    <tr>
                      <td><code>/plans</code></td>
                      <td>View available subscription plans</td>
                      <td><span className="badge bg-success">All</span></td>
                      <td>Anytime</td>
                    </tr>
                    <tr>
                      <td><code>/subscribe</code></td>
                      <td>Upgrade your subscription plan</td>
                      <td><span className="badge bg-success">All</span></td>
                      <td>Anytime</td>
                    </tr>
                    <tr>
                      <td><code>/help</code></td>
                      <td>Get help and support information</td>
                      <td><span className="badge bg-success">All</span></td>
                      <td>Anytime</td>
                    </tr>
                    <tr>
                      <td><code>/settings</code></td>
                      <td>Customize your bot preferences</td>
                      <td><span className="badge bg-success">All</span></td>
                      <td>Anytime</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <hr className="my-5" />

            {/* Tips & Tricks */}
            <div className="guide-section mb-5">
              <h2 className="mb-4">💡 Tips & Best Practices</h2>

              <style>{`
                .tip-item {
                  border-left: 4px solid #ECC80B;
                  background: transparent;
                  padding: 16px 20px;
                  border-radius: 8px;
                  transition: all 0.3s ease;
                }

                .tip-item:hover {
                  border-left-color: #FFD700;
                  transform: translateX(4px);
                }
              `}</style>

              <div className="tip-item mb-4 rounded">
                <h5 className="mb-2">📈 Start with Free Plan</h5>
                <p className="mb-0" style={{ color: '#8B8B94' }}>
                  Try the free plan (3 daily suggestions) to familiarize yourself with the bot before upgrading.
                </p>
              </div>

              <div className="tip-item mb-4 rounded">
                <h5 className="mb-2">🎯 Focus on Categories</h5>
                <p className="mb-0" style={{ color: '#8B8B94' }}>
                  Use category-specific commands like <code>/defi</code>, <code>/gaming</code>, etc. to find coins in sectors you're interested in.
                </p>
              </div>

              <div className="tip-item mb-4 rounded">
                <h5 className="mb-2">🔍 Do Your Own Research (DYOR)</h5>
                <p className="mb-0" style={{ color: '#8B8B94' }}>
                  Always research coins independently before investing. CoinPulse provides data and insights, not financial advice.
                </p>
              </div>

              <div className="tip-item mb-4 rounded">
                <h5 className="mb-2">⏰ Check Regularly</h5>
                <p className="mb-0" style={{ color: '#8B8B94' }}>
                  Market trends change fast. Check the bot regularly for new trending coins and market sentiment updates.
                </p>
              </div>

              <div className="tip-item mb-4 rounded">
                <h5 className="mb-2">💰 Risk Management</h5>
                <p className="mb-0" style={{ color: '#8B8B94' }}>
                  Only invest what you can afford to lose. Crypto is volatile—use bot suggestions as part of a broader investment strategy.
                </p>
              </div>

              <div className="tip-item mb-4 rounded">
                <h5 className="mb-2">📱 Keep Telegram Open</h5>
                <p className="mb-0" style={{ color: '#8B8B94' }}>
                  Enable notifications for the bot so you don't miss important market updates and trending coins.
                </p>
              </div>
            </div>

            <hr className="my-5" />

            {/* FAQ Section */}
            <div className="guide-section mb-5">
              <h2 className="mb-4">❓ Frequently Asked Questions</h2>

              <style>{`
                .faq-accordion .accordion-button {
                  background-color: #f8f9fa;
                  color: #0E0E0E;
                  border: 1px solid #e0e0e0;
                  font-weight: 500;
                  padding: 16px 20px;
                  transition: all 0.3s ease;
                }

                /* Dark mode for closed accordion button */
                :is(html[data-bs-theme="dark"]) .faq-accordion .accordion-button {
                  background-color: transparent;
                  color: #E5E5E5;
                  border-color: #404040;
                }

                .faq-accordion .accordion-button:not(.collapsed) {
                  background-color: #ECC80B;
                  color: #0E0E0E;
                  border-color: #ECC80B;
                  box-shadow: none;
                }

                /* Dark mode for active/opened accordion button */
                :is(html[data-bs-theme="dark"]) .faq-accordion .accordion-button:not(.collapsed) {
                  background-color: #ECC80B;
                  color: #0E0E0E;
                  border-color: #ECC80B;
                }

                .faq-accordion .accordion-button:hover {
                  background-color: #f0e5a3;
                  border-color: #ECC80B;
                }

                /* Dark mode hover */
                :is(html[data-bs-theme="dark"]) .faq-accordion .accordion-button:hover {
                  background-color: #f0e5a3;
                  border-color: #ECC80B;
                  color: #0E0E0E;
                }

                .faq-accordion .accordion-button:focus {
                  border-color: #ECC80B;
                  box-shadow: 0 0 0 0.25rem rgba(236, 200, 11, 0.25);
                }

                .faq-accordion .accordion-item {
                  border: 1px solid #404040;
                  margin-bottom: 10px;
                  border-radius: 8px;
                  overflow: hidden;
                  background-color: transparent !important;
                }

                /* Light mode accordion item */
                html[data-bs-theme="light"] .faq-accordion .accordion-item,
                html.light-mode .faq-accordion .accordion-item {
                  border-color: #d0d0d0;
                  background-color: transparent !important;
                }

                /* Dark mode accordion item */
                :is(html[data-bs-theme="dark"]) .faq-accordion .accordion-item {
                  border-color: #404040;
                  background-color: transparent !important;
                }

                .faq-accordion .accordion-body {
                  background-color: transparent !important;
                  color: #D1D5DB;
                  padding: 18px 20px;
                  line-height: 1.6;
                  border-top-color: #404040;
                }

                /* Light mode accordion body */
                html[data-bs-theme="light"] .faq-accordion .accordion-body,
                html.light-mode .faq-accordion .accordion-body {
                  background-color: transparent !important;
                  color: #1A1A1A;
                  border-top-color: #d0d0d0;
                }

                /* Dark mode accordion body */
                :is(html[data-bs-theme="dark"]) .faq-accordion .accordion-body {
                  background-color: transparent !important;
                  color: #D1D5DB;
                  border-top-color: #404040;
                }

                .faq-accordion .accordion-body code {
                  background-color: #f5f5f5;
                  color: #d63384;
                  padding: 2px 6px;
                  border-radius: 3px;
                }

                /* Dark mode code */
                :is(html[data-bs-theme="dark"]) .faq-accordion .accordion-body code {
                  background-color: #2d2d2d;
                  color: #ECC80B;
                }

                .faq-accordion .accordion-button::after {
                  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23ECC80B'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
                }
              `}</style>

              <div className="accordion faq-accordion" id="guideFAQ">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      How often are the coin suggestions updated?
                    </button>
                  </h2>
                  <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#guideFAQ">
                    <div className="accordion-body">
                      Coin suggestions are updated in real-time as market conditions change. We analyze the market 24/7 to identify the most promising opportunities.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                      What's the difference between plans?
                    </button>
                  </h2>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#guideFAQ">
                    <div className="accordion-body">
                      <strong>FREE:</strong> 3 daily suggestions, 1 category. <strong>BASIC:</strong> All 12 categories, unlimited suggestions. <strong>PREMIUM:</strong> Everything + 12 AI analyses/month, Top 10 Elite. <strong>PRO:</strong> Everything + 20 AI analyses/month, Yesterday's Champion, 24/7 support.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                      Can I cancel my subscription?
                    </button>
                  </h2>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#guideFAQ">
                    <div className="accordion-body">
                      Yes! Subscriptions are valid for 30 days with manual renewal. Simply don't renew when your subscription expires. You can downgrade to FREE anytime through <code>/plans</code>.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                      Is CoinPulse financial advice?
                    </button>
                  </h2>
                  <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#guideFAQ">
                    <div className="accordion-body">
                      No. CoinPulse is a tool that provides data and insights. We are NOT financial advisors. Always Do Your Own Research (DYOR) before making investment decisions.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
                      How do I get support?
                    </button>
                  </h2>
                  <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#guideFAQ">
                    <div className="accordion-body">
                      Use <code>/help</code> command in the bot for quick answers. For additional support, contact us on <a href="https://t.me/cpqhere" target="_blank" rel="noopener noreferrer">Telegram support group</a>. PRO users get 24/7 VIP support.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuideContent;
