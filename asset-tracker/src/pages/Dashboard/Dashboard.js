import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import ScoreCard from '../../components/ScoreCard/ScoreCard';
import {
  saveFinancialRecord,
  getFinancialRecords,
  updateFinancialRecord,
  deleteFinancialRecord,
} from '../../api/financialApi';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  const {
    salary, setSalary,
    assets, setAssets,
    assetValues, setAssetValues,
    investments, setInvestments,
    monthlyExpenses, setMonthlyExpenses,
    financialScore,
    scoreGenerated, setScoreGenerated,
    monthlySavings,
    savingsRate,
    totalAssets,
    calculateScore,
    getSuggestion,
    getInvestmentSuggestions,
    calculateCompoundGrowth,
  } = useApp();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try { setCurrentUser(JSON.parse(stored)); } catch { setCurrentUser(null); }
    }
  }, []);

  const [savedRecords, setSavedRecords] = useState([]);
  const [editingId,    setEditingId]    = useState(null);
  const [apiMessage,   setApiMessage]   = useState('');
  const [apiError,     setApiError]     = useState('');
  const [loading,      setLoading]      = useState(false);
  const [saving,       setSaving]       = useState(false);

  useEffect(() => {
    if (currentUser?.id) fetchRecords(currentUser.id);
  }, [currentUser]);

  const fetchRecords = async (uid) => {
    setLoading(true);
    try {
      const result = await getFinancialRecords(uid);
      setSavedRecords(result.data || []);
    } catch (err) {
      console.error('Fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg, isError = false) => {
    if (isError) { setApiError(msg); setApiMessage(''); }
    else         { setApiMessage(msg); setApiError(''); }
    setTimeout(() => { setApiMessage(''); setApiError(''); }, 4000);
  };

  const handleSaveToDB = async () => {
    if (!currentUser?.id) {
      showMessage('You are not logged in. Please login to save data.', true);
      return;
    }

    const formData = {
      user_id:          currentUser.id,
      monthly_salary:   salary,
      monthly_expenses: monthlyExpenses,
      monthly_savings:  monthlySavings,
      gold_value:       Number(assetValues['Gold']   || 0),
      silver_value:     Number(assetValues['Silver'] || 0),
      land_value:       Number(assetValues['Land']   || 0),
      house_value:      Number(assetValues['House']  || 0),
      car_value:        Number(assetValues['Car']    || 0),
      financial_score:  financialScore,
    };

    setSaving(true);
    try {
      if (editingId) {
        await updateFinancialRecord(editingId, formData);
        setEditingId(null);
        showMessage('Record updated successfully.');
      } else {
        await saveFinancialRecord(formData);
        showMessage('Financial data saved to database successfully.');
      }
      fetchRecords(currentUser.id);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to save. Please check if the backend is running.';
      showMessage(msg, true);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      await deleteFinancialRecord(id);
      showMessage('Record deleted successfully.');
      fetchRecords(currentUser.id);
    } catch (err) {
      showMessage('Failed to delete record. Please try again.', true);
    }
  };

  const handleEdit = (record) => {
    setSalary(Number(record.monthly_salary));
    setMonthlyExpenses(Number(record.monthly_expenses));
    setAssetValues({
      Gold:   record.gold_value,
      Silver: record.silver_value,
      Land:   record.land_value,
      House:  record.house_value,
      Car:    record.car_value,
    });
    setAssets(['Gold', 'Silver', 'Land', 'House', 'Car'].filter(
      (a) => Number(record[`${a.toLowerCase()}_value`]) > 0
    ));
    setEditingId(record.id);
    setScoreGenerated(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showMessage('Record loaded for editing. Adjust values and click Generate Score, then Update.');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    setSavedRecords([]);
  };

  const openLink = (url) => window.open(url, '_blank');

  const handleAssetChange = (asset) => {
    if (assets.includes(asset)) {
      setAssets(prev => prev.filter(a => a !== asset));
      setAssetValues(prev => ({ ...prev, [asset]: 0 }));
    } else {
      setAssets(prev => [...prev, asset]);
    }
  };

  const handleAssetValueChange = (asset, value) =>
    setAssetValues(prev => ({ ...prev, [asset]: value }));

  const handleInvestmentChange = (investment) =>
    setInvestments(prev =>
      prev.includes(investment) ? prev.filter(i => i !== investment) : [...prev, investment]
    );

  const formatCurrency = (amount) =>
    `₹${Number(amount || 0).toLocaleString('en-IN')}`;

  const investmentSuggestions = getInvestmentSuggestions();
  const growth10Years = calculateCompoundGrowth(10000, 10);
  const growth20Years = calculateCompoundGrowth(10000, 20);

  return (
    <div className="dashboard">
      <div className="dashboard-container">

        {/* Header */}
        <div className="dashboard-header-row">
          <div>
            <h1 className="dashboard-title">Financial Dashboard</h1>
            <p className="dashboard-subtitle">Track, analyse and manage your financial health</p>
          </div>
          {currentUser ? (
            <div className="user-panel">
              <div className="user-info">
                <div className="user-avatar">{currentUser.name.charAt(0).toUpperCase()}</div>
                <div>
                  <div className="user-name">{currentUser.name}</div>
                  <div className="user-email">{currentUser.email}</div>
                </div>
              </div>
              <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
            </div>
          ) : (
            <div className="not-logged-in-banner">
              <span className="banner-dot"></span>
              Not signed in.{' '}
              <span className="banner-link" onClick={() => navigate('/login')}>
                Login to save your data
              </span>
            </div>
          )}
        </div>

        {/* Notification Messages */}
        {apiMessage && (
          <div className="alert alert-success">
            <span className="alert-icon success-icon"></span>
            {apiMessage}
          </div>
        )}
        {apiError && (
          <div className="alert alert-error">
            <span className="alert-icon error-icon"></span>
            {apiError}
          </div>
        )}

        {/* Form Section */}
        {!scoreGenerated ? (
          <div className="financial-input-section">
            <div className="section-header">
              <h2 className="section-title">Financial Overview</h2>
              <p className="section-desc">Enter your financial details to generate your personalised score</p>
            </div>

            <div className="input-grid">
              <div className="input-card">
                <div className="input-card-label">Monthly Salary</div>
                <div className="salary-display">{formatCurrency(salary)}</div>
                <input
                  type="range" min="10000" max="200000" step="1000"
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
                <div className="input-card-label">Monthly Expenses</div>
                <input
                  type="number"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                  placeholder="Enter amount in rupees"
                  className="expense-input"
                />
                <div className="input-hint">Total monthly spending</div>
              </div>

              <div className="input-card">
                <div className="input-card-label">Assets</div>
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
                          placeholder="Estimated value (₹)"
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
                <div className="input-card-label">Current Investments</div>
                <div className="checkbox-grid">
                  {['Stocks', 'Mutual Funds', 'Gold Investment', 'Fixed Deposit', 'Crypto'].map(inv => (
                    <label key={inv} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={investments.includes(inv)}
                        onChange={() => handleInvestmentChange(inv)}
                      />
                      <span className="checkmark"></span>
                      {inv}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="savings-summary">
              <div className="summary-card">
                <div className="summary-label">Monthly Savings</div>
                <div className="summary-value">{formatCurrency(monthlySavings)}</div>
                <div className="summary-sub">Savings Rate: {savingsRate}%</div>
              </div>
              <div className="summary-card">
                <div className="summary-label">Total Asset Value</div>
                <div className="summary-value">{formatCurrency(totalAssets)}</div>
                <div className="summary-sub">Across all asset categories</div>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-primary" onClick={() => calculateScore()}>
                Generate Financial Score
              </button>
            </div>
          </div>

        ) : (
          /* Results Section */
          <div className="results-section">

            <div className="results-actions">
              <button
                className="btn-primary"
                onClick={handleSaveToDB}
                disabled={saving}
              >
                {saving ? 'Saving...' : editingId ? 'Update Record' : 'Save to Database'}
              </button>
              <button
                className="btn-secondary"
                onClick={() => setScoreGenerated(false)}
              >
                Edit Inputs
              </button>
            </div>

            {/* Score */}
            <div className="score-section">
              <ScoreCard
                title="Financial Score"
                value={`${financialScore} / 100`}
                subtitle={getSuggestion()}
                color="blue"
              />
            </div>

            {/* Wealth Projection */}
            <div className="panel">
              <div className="panel-header">
                <h2 className="panel-title">Wealth Projection</h2>
                <p className="panel-desc">Projected growth investing ₹10,000 per month at 12% annual return</p>
              </div>
              <div className="projection-grid">
                <div className="projection-card">
                  <div className="projection-label">10 Year Projection</div>
                  <div className="projection-value">{formatCurrency(growth10Years)}</div>
                </div>
                <div className="projection-card">
                  <div className="projection-label">20 Year Projection</div>
                  <div className="projection-value">{formatCurrency(growth20Years)}</div>
                </div>
              </div>
            </div>

            {/* Investment Recommendations */}
            <div className="panel">
              <div className="panel-header">
                <h2 className="panel-title">Recommended Investments</h2>
                <p className="panel-desc">Based on your financial score</p>
              </div>
              <div className="suggestions-grid">
                {investmentSuggestions.map((s, i) => {
                  const learnLink =
                    s.name === 'Mutual Funds' ? 'https://en.wikipedia.org/wiki/Mutual_fund' :
                    s.name === 'Index Funds'  ? 'https://en.wikipedia.org/wiki/Index_fund' :
                    `https://en.wikipedia.org/wiki/${s.name.replace(' ', '_')}`;
                  const marketLink =
                    s.name === 'Mutual Funds' ? 'https://www.moneycontrol.com/mutual-funds/' :
                    s.name === 'Index Funds'  ? 'https://www.nseindia.com/market-data/live-equity-market' :
                    'https://www.msn.com/en-in/money/watchlist?id=ahkqww&tab=Markets';
                  return (
                    <div key={i} className="suggestion-card">
                      <div className="suggestion-top">
                        <h3 className="suggestion-name">{s.name}</h3>
                        <span className={`risk-badge risk-${s.risk.toLowerCase()}`}>{s.risk} Risk</span>
                      </div>
                      <p className="suggestion-desc">{s.description}</p>
                      <div className="card-buttons">
                        <button className="btn-outline" onClick={() => openLink(learnLink)}>Learn More</button>
                        <button className="btn-outline-secondary" onClick={() => openLink(marketLink)}>Market Data</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stock Information */}
            <div className="panel">
              <div className="panel-header">
                <h2 className="panel-title">Market Reference</h2>
                <p className="panel-desc">Educational information on key Indian stocks</p>
              </div>
              <div className="stock-grid">
                {[
                  { name: 'Tata Consultancy Services', sector: 'Information Technology', type: 'Blue Chip', wiki: 'Tata_Consultancy_Services', yahoo: 'TCS.NS' },
                  { name: 'Reliance Industries',       sector: 'Energy & Telecom',       type: 'Large Cap', wiki: 'Reliance_Industries',        yahoo: 'RELIANCE.NS' },
                  { name: 'Infosys Limited',           sector: 'Information Technology', type: 'Blue Chip', wiki: 'Infosys',                    yahoo: 'INFY.NS' },
                ].map((stock) => (
                  <div key={stock.name} className="stock-card">
                    <h3 className="stock-name">{stock.name}</h3>
                    <div className="stock-meta">
                      <span className="stock-tag">{stock.sector}</span>
                      <span className="stock-tag">{stock.type}</span>
                    </div>
                    <div className="card-buttons">
                      <button className="btn-outline" onClick={() => openLink(`https://en.wikipedia.org/wiki/${stock.wiki}`)}>Company Profile</button>
                      <button className="btn-outline-secondary" onClick={() => openLink(`https://finance.yahoo.com/quote/${stock.yahoo}`)}>Live Price</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Global Markets */}
            <div className="global-market-section">
              <button className="btn-primary" onClick={() => openLink('https://www.msn.com/en-in/money/watchlist?id=ahkqww&tab=Markets')}>
                View Global Market Dashboard
              </button>
            </div>

            {/* Saved Records Table */}
            <div className="panel records-panel">
              <div className="records-header">
                <div>
                  <h2 className="panel-title">Financial Records</h2>
                  <p className="panel-desc">All saved entries from the database</p>
                </div>
                {currentUser && (
                  <button
                    className="btn-secondary"
                    onClick={() => fetchRecords(currentUser.id)}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Refresh'}
                  </button>
                )}
              </div>

              {!currentUser && (
                <div className="empty-state">
                  Please{' '}
                  <span className="inline-link" onClick={() => navigate('/login')}>sign in</span>
                  {' '}to view your saved records.
                </div>
              )}

              {currentUser && loading && (
                <div className="loading-state">Fetching records from database...</div>
              )}

              {currentUser && !loading && savedRecords.length === 0 && (
                <div className="empty-state">
                  No records found. Complete the form above and click "Save to Database".
                </div>
              )}

              {currentUser && !loading && savedRecords.length > 0 && (
                <div className="table-wrapper">
                  <table className="records-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Monthly Salary</th>
                        <th>Monthly Expenses</th>
                        <th>Monthly Savings</th>
                        <th>Score</th>
                        <th>Date Saved</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedRecords.map((r) => (
                        <tr key={r.id}>
                          <td className="td-id">{r.id}</td>
                          <td>{formatCurrency(r.monthly_salary)}</td>
                          <td>{formatCurrency(r.monthly_expenses)}</td>
                          <td>{formatCurrency(r.monthly_savings)}</td>
                          <td>
                            <span className={`score-pill ${r.financial_score >= 75 ? 'score-high' : r.financial_score >= 50 ? 'score-mid' : 'score-low'}`}>
                              {r.financial_score}
                            </span>
                          </td>
                          <td className="td-date">{new Date(r.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                          <td>
                            <div className="action-btns">
                              <button className="btn-edit" onClick={() => handleEdit(r)}>Edit</button>
                              <button className="btn-delete" onClick={() => handleDelete(r.id)}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
