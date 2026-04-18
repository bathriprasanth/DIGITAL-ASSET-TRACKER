import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Manage Your Financial Life Smartly</h1>
          <p className="hero-description">
            Track your assets, manage expenses, and get personalized suggestions 
            to improve your financial lifestyle as a salaried professional.
          </p>
          <Link to="/dashboard" className="cta-button">
            Start Tracking
          </Link>
        </div>
      </section>

      <section className="benefits">
        <div className="benefits-container">
          <h2 className="benefits-title">Why Use This Platform?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Track Assets</h3>
              <p>Monitor your gold, property, savings, and other valuable assets in one place.</p>
            </div>
            <div className="benefit-card">
              <h3>Manage Expenses</h3>
              <p>Keep track of your monthly expenses across different categories.</p>
            </div>
            <div className="benefit-card">
              <h3>Improve Savings</h3>
              <p>Get insights on how to optimize your spending and increase savings.</p>
            </div>
            <div className="benefit-card">
              <h3>Get Financial Score</h3>
              <p>Receive a personalized financial health score with improvement suggestions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;