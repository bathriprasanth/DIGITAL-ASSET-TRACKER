import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './InvestmentDetailsPage.css';

const investmentData = {
  'mutual-funds': {
    title: 'Mutual Funds',
    whatIs: 'Mutual funds are investment vehicles that pool money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities.',
    howWorks: 'Professional fund managers use the pooled money to buy various securities. Your returns depend on the performance of the underlying investments.',
    whyInvest: 'Diversification reduces risk, professional management, and accessibility for small investors.',
    riskLevel: 'Medium',
    examples: ['SBI Bluechip Fund', 'HDFC Top 100 Fund', 'ICICI Prudential Value Discovery Fund'],
    growth: 'Mutual funds can provide 10-15% annual returns over long term through compounding and professional management.'
  },
  'index-funds': {
    title: 'Index Funds',
    whatIs: 'Index funds are mutual funds that track a specific market index like Nifty 50 or Sensex.',
    howWorks: 'The fund automatically buys all stocks in the index in the same proportion, providing market returns.',
    whyInvest: 'Low fees, broad diversification, and consistent market performance without active management risk.',
    riskLevel: 'Medium',
    examples: ['Nifty 50 Index Fund', 'Sensex Index Fund', 'Nifty Next 50 Fund'],
    growth: 'Index funds historically provide 12-14% annual returns matching market performance over long periods.'
  },
  'stocks': {
    title: 'Stocks',
    whatIs: 'Stocks represent ownership shares in a company. When you buy stocks, you become a partial owner.',
    howWorks: 'Stock prices fluctuate based on company performance and market conditions. You earn through price appreciation and dividends.',
    whyInvest: 'Potential for high returns, ownership in growing companies, and dividend income.',
    riskLevel: 'High',
    examples: ['Tata Consultancy Services (TCS)', 'Reliance Industries', 'Infosys'],
    growth: 'Quality stocks can provide 15-20% annual returns through capital appreciation and reinvested dividends.'
  },
  'nifty': {
    title: 'Nifty Index',
    whatIs: 'Nifty 50 is an index of the top 50 companies by market capitalization on the National Stock Exchange.',
    howWorks: 'Index funds track Nifty by buying all 50 stocks in the same weightage, giving you exposure to top Indian companies.',
    whyInvest: 'Represents the overall Indian market, diversified across sectors, and historically stable growth.',
    riskLevel: 'Medium',
    examples: ['Reliance Industries', 'TCS', 'HDFC Bank', 'Infosys', 'ICICI Bank'],
    growth: 'Nifty has delivered 12-15% annual returns over the past 20 years through economic growth and corporate earnings.'
  },
  'crypto': {
    title: 'Cryptocurrency',
    whatIs: 'Digital currencies that use blockchain technology for secure, decentralized transactions.',
    howWorks: 'Crypto values fluctuate based on demand, adoption, and market sentiment. Highly volatile investment.',
    whyInvest: 'Potential for high returns, portfolio diversification, and exposure to digital economy.',
    riskLevel: 'High',
    examples: ['Bitcoin (BTC)', 'Ethereum (ETH)', 'Binance Coin (BNB)'],
    growth: 'Crypto can provide exceptional returns but with extreme volatility. Only invest what you can afford to lose.'
  },
  'digital-gold': {
    title: 'Digital Gold',
    whatIs: 'Digital gold allows you to buy, sell, and store gold online without physical possession.',
    howWorks: 'You purchase gold units online, stored securely in vaults. Can be converted to physical gold or sold anytime.',
    whyInvest: 'Hedge against inflation, portfolio diversification, and easier storage than physical gold.',
    riskLevel: 'Low',
    examples: ['Paytm Gold', 'PhonePe Gold', 'Google Pay Gold'],
    growth: 'Gold provides 8-10% annual returns over long term, acting as a hedge against inflation and market volatility.'
  },
  'real-estate': {
    title: 'Real Estate',
    whatIs: 'Investment in physical properties like residential or commercial buildings for rental income and appreciation.',
    howWorks: 'Generate income through rent and benefit from property value appreciation over time.',
    whyInvest: 'Steady rental income, inflation hedge, and tangible asset ownership.',
    riskLevel: 'Medium',
    examples: ['Residential Properties', 'Commercial Spaces', 'REITs (Real Estate Investment Trusts)'],
    growth: 'Real estate provides 8-12% annual returns through rental yield and capital appreciation over long periods.'
  }
};

function InvestmentDetailsPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const investment = investmentData[type];

  if (!investment) {
    return (
      <div className="investment-details-page">
        <div className="investment-container">
          <h1>Investment Not Found</h1>
          <button className="back-btn" onClick={() => navigate('/investments')}>
            Back to Investments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="investment-details-page">
      <div className="investment-container">
        <button className="back-btn" onClick={() => navigate('/investments')}>
          ← Back to Investments
        </button>
        
        <h1 className="investment-title">{investment.title}</h1>
        
        <div className="investment-content">
          <div className="content-section">
            <h2>What is it?</h2>
            <p>{investment.whatIs}</p>
          </div>

          <div className="content-section">
            <h2>How it works?</h2>
            <p>{investment.howWorks}</p>
          </div>

          <div className="content-section">
            <h2>Why people invest?</h2>
            <p>{investment.whyInvest}</p>
          </div>

          <div className="content-section">
            <h2>Risk Level</h2>
            <div className={`risk-badge risk-${investment.riskLevel.toLowerCase()}`}>
              {investment.riskLevel} Risk
            </div>
          </div>

          <div className="content-section">
            <h2>Examples</h2>
            <div className="examples-grid">
              {investment.examples.map((example, index) => (
                <div key={index} className="example-card">
                  {example}
                </div>
              ))}
            </div>
          </div>

          <div className="content-section growth-section">
            <h2>How this investment improves your financial growth</h2>
            <p>{investment.growth}</p>
            <div className="growth-highlight">
              <strong>Key Benefit:</strong> Compounding returns over time can significantly multiply your wealth. 
              The earlier you start, the more time your money has to grow exponentially.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestmentDetailsPage;