import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [salary, setSalary] = useState(30000);
  const [savingsPercentage, setSavingsPercentage] = useState('');
  const [assets, setAssets] = useState([]);
  const [assetValues, setAssetValues] = useState({});
  const [investments, setInvestments] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [financialScore, setFinancialScore] = useState(0);
  const [scoreGenerated, setScoreGenerated] = useState(false);

  const monthlySavings = salary - monthlyExpenses;
  const savingsRate = salary > 0 ? Math.round((monthlySavings / salary) * 100) : 0;
  
  const totalAssets = Object.values(assetValues).reduce((sum, value) => sum + Number(value || 0), 0);

  const calculateScore = () => {
    let score = 50; // Base score

    // Add points for good savings rate
    if (savingsRate > 30) {
      score += 10;
    }

    // Add points for high assets
    if (totalAssets > 500000) {
      score += 10;
    }

    // Add points for having investments
    if (investments.length > 0) {
      score += 10;
    }

    // Add points for low expenses
    if (monthlyExpenses < salary * 0.5) {
      score += 10;
    }

    // Subtract points for high expenses
    if (monthlyExpenses > salary * 0.7) {
      score -= 10;
    }

    const finalScore = Math.max(0, Math.min(100, score));
    setFinancialScore(finalScore);
    setScoreGenerated(true);
    return finalScore;
  };

  const getSuggestion = () => {
    if (financialScore < 50) {
      return "Start with safe investments like Fixed Deposits and Gold.";
    } else if (financialScore <= 75) {
      return "Good foundation! Consider Mutual Funds and Index Funds.";
    } else {
      return "Excellent! Explore advanced options like Stocks and Real Estate.";
    }
  };

  const getInvestmentSuggestions = () => {
    if (financialScore < 50) {
      return [
        { name: 'Fixed Deposits', risk: 'Low', description: 'Safe guaranteed returns with capital protection' },
        { name: 'Gold Investment', risk: 'Low', description: 'Traditional hedge against inflation' }
      ];
    } else if (financialScore <= 75) {
      return [
        { name: 'Mutual Funds', risk: 'Medium', description: 'Professionally managed diversified portfolios' },
        { name: 'Index Funds', risk: 'Medium', description: 'Low-cost market tracking investments' }
      ];
    } else {
      return [
        { name: 'Stocks', risk: 'High', description: 'Direct equity investments for high returns' },
        { name: 'Real Estate', risk: 'Medium', description: 'Property investments for long-term growth' },
        { name: 'Long Term Equity', risk: 'High', description: 'Growth-focused equity investments' }
      ];
    }
  };

  const calculateCompoundGrowth = (monthlyInvestment, years, rate = 12) => {
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    const futureValue = monthlyInvestment * (((1 + monthlyRate) ** months - 1) / monthlyRate);
    return Math.round(futureValue);
  };

  return (
    <AppContext.Provider value={{
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
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};