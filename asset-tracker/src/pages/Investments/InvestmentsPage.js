import React from 'react';
import { useApp } from '../../context/AppContext';
import './InvestmentsPage.css';

const stockInfo = [
  {
    name: 'Tata Consultancy Services (TCS)',
    sector: 'IT',
    type: 'Blue Chip Stock',
    links: {
      wikipedia: 'https://en.wikipedia.org/wiki/Tata_Consultancy_Services',
      market: 'https://www.msn.com/en-in/money/watchlist?id=ahkqww&tab=Markets',
      charts: 'https://finance.yahoo.com/quote/TCS.NS/'
    }
  },
  {
    name: 'Reliance Industries',
    sector: 'Energy / Telecom',
    type: 'Large Cap',
    links: {
      wikipedia: 'https://en.wikipedia.org/wiki/Reliance_Industries',
      market: 'https://www.msn.com/en-in/money/watchlist?id=ahkqww&tab=Markets',
      charts: 'https://finance.yahoo.com/quote/RELIANCE.NS/'
    }
  },
  {
    name: 'Infosys',
    sector: 'IT',
    type: 'Blue Chip Stock',
    links: {
      wikipedia: 'https://en.wikipedia.org/wiki/Infosys',
      market: 'https://www.msn.com/en-in/money/watchlist?id=ahkqww&tab=Markets',
      charts: 'https://finance.yahoo.com/quote/INFY.NS/'
    }
  }
];

const additionalInvestments = [
  {
    name: 'Mutual Funds',
    description: 'Professionally managed diversified investment portfolios',
    risk: 'High',
    links: {
      wikipedia: 'https://en.wikipedia.org/wiki/Mutual_fund',
      market: 'https://www.msn.com/en-in/money/watchlist?id=ahkqww&tab=Markets',
      info: 'https://www.moneycontrol.com/mutual-funds/'
    }
  },
  {
    name: 'Index Funds',
    description: 'Track market indices like Nifty 50 with low fees',
    risk: 'High',
    links: {
      wikipedia: 'https://en.wikipedia.org/wiki/Index_fund',
      market: 'https://www.nseindia.com/market-data/live-equity-market',
      charts: 'https://www.tradingview.com/symbols/NSE-NIFTY/'
    }
  },
  {
    name: 'Cryptocurrency',
    description: 'Digital currencies with high growth potential',
    risk: 'High',
    links: {
      wikipedia: 'https://en.wikipedia.org/wiki/Cryptocurrency',
      market: 'https://coinmarketcap.com/',
      charts: 'https://www.tradingview.com/markets/cryptocurrencies/'
    }
  },
  {
    name: 'Digital Gold',
    description: 'Online gold investment without physical storage',
    risk: 'Low',
    links: {
      wikipedia: 'https://en.wikipedia.org/wiki/Gold_as_an_investment',
      market: 'https://www.goldprice.org/',
      info: 'https://www.paytm.com/gold'
    }
  },
  {
    name: 'Real Estate',
    description: 'Property investment for rental income and appreciation',
    risk: 'High',
    links: {
      wikipedia: 'https://en.wikipedia.org/wiki/Real_estate',
      market: 'https://www.magicbricks.com/',
      info: 'https://www.99acres.com/'
    }
  }
];

function InvestmentsPage() {
  const { getSuggestion, scoreGenerated, financialScore, getInvestmentSuggestions } = useApp();
  
  const suggestions = getInvestmentSuggestions();

  const openLink = (url) => {
    window.open(url, '_blank');
  };

  const getInvestmentLinks = (investmentName) => {
    const linkMap = {
      'Fixed Deposits': {
        wikipedia: 'https://en.wikipedia.org/wiki/Fixed_deposit',
        market: 'https://www.bankbazaar.com/fixed-deposit.html'
      },
      'Gold Investment': {
        wikipedia: 'https://en.wikipedia.org/wiki/Gold_as_an_investment',
        market: 'https://www.goldprice.org/'
      },
      'Mutual Funds': {
        wikipedia: 'https://en.wikipedia.org/wiki/Mutual_fund',
        info: 'https://www.moneycontrol.com/mutual-funds/'
      },
      'Index Funds': {
        wikipedia: 'https://en.wikipedia.org/wiki/Index_fund',
        market: 'https://www.nseindia.com/market-data/live-equity-market'
      },
      'Stocks': {
        wikipedia: 'https://en.wikipedia.org/wiki/Stock',
        market: 'https://www.msn.com/en-in/money/watchlist?id=ahkqww&tab=Markets'
      },
      'Real Estate': {
        wikipedia: 'https://en.wikipedia.org/wiki/Real_estate',
        market: 'https://www.magicbricks.com/'
      },
      'Long Term Equity': {
        wikipedia: 'https://en.wikipedia.org/wiki/Stock',
        market: 'https://www.msn.com/en-in/money/watchlist?id=ahkqww&tab=Markets'
      }
    };
    return linkMap[investmentName] || linkMap['Stocks'];
  };

  return (
    <div className="investments-page">
      <div className="investments-container">
        <h1 className="investments-title">Investment Suggestions</h1>
        <p className="investments-subtitle">
          Explore different investment options to grow your wealth
        </p>

        {scoreGenerated && (
          <div className="suggestion-banner">
            <h3>Personalized Suggestion</h3>
            <p>{getSuggestion()}</p>
            <div className="score-display">
              Your Financial Score: <span className="score-number">{financialScore}/100</span>
            </div>
          </div>
        )}

        <div className="recommended-section">
          <h2>Recommended for You</h2>
          <div className="investments-grid">
            {suggestions.map((investment, index) => {
              const links = getInvestmentLinks(investment.name);
              return (
                <div key={index} className="investment-card">
                  <h3 className="investment-name">{investment.name}</h3>
                  <div className={`risk-level risk-${investment.risk.toLowerCase()}`}>
                    Risk Level: {investment.risk}
                  </div>
                  <p className="investment-description">{investment.description}</p>
                  <div className="card-buttons">
                    <button 
                      className="card-btn learn-btn"
                      onClick={() => openLink(links.wikipedia)}
                    >
                      Learn More
                    </button>
                    <button 
                      className="card-btn market-btn"
                      onClick={() => openLink(links.info || links.market)}
                    >
                      View Market Data
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="additional-investments">
          <h2>Explore More Investment Options</h2>
          <div className="investments-grid">
            {additionalInvestments.map((investment, index) => {
              return (
                <div key={index} className="investment-card">
                  <h3 className="investment-name">{investment.name}</h3>
                  <div className={`risk-level risk-${investment.risk.toLowerCase()}`}>
                    Risk Level: {investment.risk}
                  </div>
                  <p className="investment-description">{investment.description}</p>
                  <div className="card-buttons">
                    <button 
                      className="card-btn learn-btn"
                      onClick={() => openLink(investment.links.wikipedia)}
                    >
                      Learn More
                    </button>
                    <button 
                      className="card-btn market-btn"
                      onClick={() => openLink(investment.links.info || investment.links.market)}
                    >
                      View Market Data
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="stock-education">
          <h2>Educational Stock Information</h2>
          <p className="stock-disclaimer">Sample stocks for educational purposes only</p>
          <div className="stock-grid">
            {stockInfo.map((stock, index) => {
              return (
                <div key={index} className="stock-card">
                  <h3>{stock.name}</h3>
                  <p><strong>Sector:</strong> {stock.sector}</p>
                  <p><strong>Type:</strong> {stock.type}</p>
                  <div className="card-buttons">
                    <button 
                      className="card-btn learn-btn"
                      onClick={() => openLink(stock.links.wikipedia)}
                    >
                      Learn More
                    </button>
                    <button 
                      className="card-btn market-btn"
                      onClick={() => openLink(stock.links.charts)}
                    >
                      View Market Data
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="global-market-section">
          <button 
            className="global-market-btn"
            onClick={() => openLink('https://www.msn.com/en-in/money/watchlist?id=ahkqww&tab=Markets')}
          >
            View Global Market
          </button>
        </div>

        <div className="disclaimer">
          <h3>Disclaimer</h3>
          <p>
            Financial suggestions provided in this platform are for educational purposes only. 
            Users should make investment decisions at their own risk. Please consult with a 
            qualified financial advisor before making any investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default InvestmentsPage;