import React from 'react';
import { useApp } from '../../context/AppContext';
import './AssetsPage.css';

function AssetsPage() {
  const { assets, updateAsset, totalAssets } = useApp();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="assets-page">
      <div className="assets-container">
        <h1 className="assets-title">Manage Your Assets</h1>
        <div className="total-assets">
          <h2>Total Assets: {formatCurrency(totalAssets)}</h2>
        </div>

        <div className="assets-grid">
          {assets.map(asset => (
            <div key={asset.id} className="asset-card">
              <div className="asset-header">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={asset.checked}
                    onChange={(e) => updateAsset(asset.id, 'checked', e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  <span className="asset-name">{asset.name}</span>
                </label>
              </div>
              
              {asset.checked && (
                <div className="asset-value-input">
                  <label htmlFor={`value-${asset.id}`}>Approximate Value:</label>
                  <input
                    id={`value-${asset.id}`}
                    type="number"
                    placeholder="Enter amount"
                    value={asset.value}
                    onChange={(e) => updateAsset(asset.id, 'value', e.target.value)}
                    className="value-input"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AssetsPage;