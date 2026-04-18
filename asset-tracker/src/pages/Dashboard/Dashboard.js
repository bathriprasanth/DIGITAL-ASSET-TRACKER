import React from 'react';
import { useApp } from '../../context/AppContext';
import ScoreCard from '../../components/ScoreCard/ScoreCard';
import './Dashboard.css';

function Dashboard() {
  const {
    salary, setSalary,
    savingsPercentage, setSavingsPercentage,
    assets, setAssets,
    assetValues, setAssetValues,
    investments, setInvestments,
    monthlyExpenses, setMonthlyExpenses,
    financialScore,
    scoreGenerated,
    monthlySavings,
    savingsRate,
    totalAssets,
    calculateScore,
    getSuggestion,
    getInvestmentSuggestions,
    calculateCompoundGrowth
  } = useApp();

  const openLink = (url) => {
    window.open(url, '_blank');
  };

  const handleAssetChange = (asset) => {
    if (assets.includes(asset)) {
      setAssets(prev => prev.filter(a => a !== asset));
      setAssetValues(prev => ({ ...prev, [asset]: 0 }));
    } else {
      setAssets(prev => [...prev, asset]);
    }
  };

  const handleAssetValueChange = (asset, value) => {
    setAssetValues(prev => ({ ...prev, [asset]: value }));
  };

  const handleInvestmentChange = (investment) => {
    setInvestments(prev => 
      prev.includes(investment) 
        ? prev.filter(i => i !== investment)
        : [...prev, investment]
    );
  };

  const handleGenerateScore = () => {
    calculateScore();
  };

  const formatCurrency = (amount) => {
    return `₹${Number(amount).toLocaleString('en-IN')}`;
  };

  const investmentSuggestions = getInvestmentSuggestions();
  const growth10Years = calculateCompoundGrowth(10000, 10);
  const growth20Years = calculateCompoundGrowth(10000, 20);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Financial Dashboard</h1>
        
        {!scoreGenerated ? (
          <div className="financial-input-section">
            <div className="input-grid">
              <div className="input-card">
                <h3>Monthly Salary</h3>
                <div className="salary-display">{formatCurrency(salary)}</div>
                <input
                  type="range"
                  min="10000"
                  max="200000"
                  step="1000"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="slider"
                />
                <div className="slider-labels">
                  <span>₹10,000</span>
                  <span>₹2,00,000</span>
                </div>
              </div>

              <div className="input-card">
                <h3>Monthly Expenses</h3>
                <input
                  type="number"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                  placeholder="Enter monthly expenses"
                  className="expense-input"
                />
              </div>

              <div className="input-card">
                <h3>Assets</h3>
                <div className="asset-list">
                  {['Gold', 'Silver', 'Land', 'House', 'Car', 'Savings Account'].map(asset => (
                    <div key={asset} className="asset-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={assets.includes(asset)}
                          onChange={() => handleAssetChange(asset)}
                        />
                        <span className="checkmark"></span>
                        {asset}
                      </label>
                      {assets.includes(asset) && (
                        <input
                          type="number"
                          placeholder="Enter value (₹)"
                          value={assetValues[asset] || ''}
                          onChange={(e) => handleAssetValueChange(asset, e.target.value)}
                          className="asset-value-input"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="input-card">
                <h3>Investments</h3>
                <div className="checkbox-grid">
                  {['Stocks', 'Mutual Funds', 'Gold Investment', 'Fixed Deposit', 'Crypto'].map(investment => (
                    <label key={investment} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={investments.includes(investment)}
                        onChange={() => handleInvestmentChange(investment)}
                      />
                      <span className="checkmark"></span>
                      {investment}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="savings-summary">
              <div className="summary-card">
                <h3>Monthly Savings: {formatCurrency(monthlySavings)}</h3>
                <p>Savings Rate: {savingsRate}%</p>
              </div>
              <div className="summary-card">
                <h3>Total Assets: {formatCurrency(totalAssets)}</h3>
              </div>
            </div>

            <button className="generate-score-btn" onClick={handleGenerateScore}>
              Generate Score
            </button>
          </div>
        ) : (
          <div className="results-section">
            <div className="score-section">
              <ScoreCard 
                title="Financial Score"
                value={`${financialScore} / 100`}
                subtitle={getSuggestion()}
                color="blue"
              />
            </div>

            <div className="wealth-projection">
              <h2>Future Wealth Projection</h2>
              <p>If you invest ₹10,000 per month at 12% annual return:</p>
              <div className="projection-grid">
                <div className="projection-card">
                  <h3>After 10 years</h3>
                  <p>{formatCurrency(growth10Years)}</p>
                </div>
                <div className="projection-card">
                  <h3>After 20 years</h3>
                  <p>{formatCurrency(growth20Years)}</p>
                </div>
              </div>
            </div>

            <div className="investment-suggestions">
              <h2>Recommended Investments</h2>
              <div className="suggestions-grid">
                {investmentSuggestions.map((suggestion, index) => {
                  let learnLink, marketLink;
                  
                  if (suggestion.name === 'Mutual Funds') {
                    learnLink = 'https://en.wikipedia.org/wiki/Mutual_fund';
                    marketLink = 'https://www.moneycontrol.com/mutual-funds/';
                  } else if (suggestion.name === 'Index Funds') {
                    learnLink = 'https://en.wikipedia.org/wiki/Index_fund';
                    marketLink = 'https://www.nseindia.com/market-data/live-equity-market';
                  } else {
                    learnLink = `https://en.wikipedia.org/wiki/${suggestion.name.replace(' ', '_')}`;
                    marketLink = 'https://www.msn.com/en-in/money/watchlist?id=ahkqww&tab=Markets';
                  }
                  
                  return (
                    <div key={index} className="suggestion-card">
                      <h3>{suggestion.name}</h3>
                      <div className={`risk-badge risk-${suggestion.risk.toLowerCase()}`}>
                        {suggestion.risk} Risk
                      </div>
                      <p>{suggestion.description}</p>
                      <div className="card-buttons">
                        <button 
                          className="card-btn learn-btn"
                          onClick={() => openLink(learnLink)}
                        >
                          Learn More
                        </button>
                        <button 
                          className="card-btn market-btn"
                          onClick={() => openLink(marketLink)}
                        >
                          View Market Data
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="stock-info">
              <h2>Educational Stock Information</h2>
              <div className="stock-grid">
                <div className="stock-card">
                  <h3>Tata Consultancy Services (TCS)</h3>
                  <p>Sector: IT</p>
                  <p>Type: Blue Chip Stock</p>
                  <div className="card-buttons">
                    <button 
                      className="card-btn learn-btn"
                      onClick={() => openLink('https://en.wikipedia.org/wiki/Tata_Consultancy_Services')}
                    >
                      Company Info
                    </button>
                    <button 
                      className="card-btn market-btn"
                      onClick={() => openLink('https://finance.yahoo.com/quote/TCS.NS')}
                    >
                      View Stock Price
                    </button>
                  </div>
                </div>
                <div className="stock-card">
                  <h3>Reliance Industries</h3>
                  <p>Sector: Energy / Telecom</p>
                  <p>Type: Large Cap</p>
                  <div className="card-buttons">
                    <button 
                      className="card-btn learn-btn"
                      onClick={() => openLink('https://en.wikipedia.org/wiki/Reliance_Industries')}
                    >
                      Company Info
                    </button>
                    <button 
                      className="card-btn market-btn"
                      onClick={() => openLink('https://finance.yahoo.com/quote/RELIANCE.NS')}
                    >
                      View Stock Price
                    </button>
                  </div>
                </div>
                <div className="stock-card">
                  <h3>Infosys</h3>
                  <p>Sector: IT</p>
                  <p>Type: Blue Chip Stock</p>
                  <div className="card-buttons">
                    <button 
                      className="card-btn learn-btn"
                      onClick={() => openLink('https://en.wikipedia.org/wiki/Infosys')}
                    >
                      Company Info
                    </button>
                    <button 
                      className="card-btn market-btn"
                      onClick={() => openLink('https://finance.yahoo.com/quote/INFY.NS')}
                    >
                      View Stock Price
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="global-market-section">
              <button 
                className="global-market-btn"
                onClick={() => openLink('https://www.msn.com/en-in/money/watchlist?id=ahkqww&tab=Markets')}
              >
                View Global Market Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;