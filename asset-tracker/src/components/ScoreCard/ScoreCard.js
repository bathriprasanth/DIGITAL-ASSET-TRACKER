import React from 'react';
import './ScoreCard.css';

function ScoreCard({ title, value, subtitle, color = 'blue' }) {
  return (
    <div className={`score-card score-card-${color}`}>
      <div className="score-card-header">
        <h3 className="score-card-title">{title}</h3>
      </div>
      <div className="score-card-value">{value}</div>
      {subtitle && <div className="score-card-subtitle">{subtitle}</div>}
    </div>
  );
}

export default ScoreCard;