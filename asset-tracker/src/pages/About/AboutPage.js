import React from 'react';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">About Digital Asset Tracker</h1>
        
        <div className="about-content">
          <section className="about-section">
            <h2>Our Purpose</h2>
            <p>
              Digital Asset Tracker is designed specifically for salaried professionals 
              who want to take control of their financial future. Our platform helps you 
              track your assets, manage expenses, and receive personalized suggestions 
              to improve your financial lifestyle.
            </p>
          </section>

          <section className="about-section">
            <h2>Key Features</h2>
            <ul className="features-list">
              <li>Track various assets including gold, silver, property, and savings</li>
              <li>Monitor monthly expenses across different categories</li>
              <li>Get a personalized financial health score</li>
              <li>Receive tailored suggestions for financial improvement</li>
              <li>Explore investment opportunities with risk assessments</li>
              <li>Simple, user-friendly interface designed for busy professionals</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>How It Works</h2>
            <div className="steps-grid">
              <div className="step-card">
                <h3>1. Track Assets</h3>
                <p>Select and value your assets using our simple checkbox interface</p>
              </div>
              <div className="step-card">
                <h3>2. Monitor Expenses</h3>
                <p>Track your monthly spending across different categories</p>
              </div>
              <div className="step-card">
                <h3>3. Get Your Score</h3>
                <p>Receive a financial health score based on your data</p>
              </div>
              <div className="step-card">
                <h3>4. Improve</h3>
                <p>Follow personalized suggestions to enhance your financial position</p>
              </div>
            </div>
          </section>

          <section className="disclaimer-section">
            <h2>Important Disclaimer</h2>
            <div className="disclaimer-box">
              <p>
                <strong>Financial suggestions provided in this platform are for educational purposes only.</strong> 
                Users should make investment decisions at their own risk. The information provided should not 
                be considered as professional financial advice. Please consult with a qualified financial 
                advisor before making any investment decisions.
              </p>
              <p>
                This platform does not guarantee any returns on investments and is not responsible for any 
                financial losses that may occur from following the suggestions provided.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;