import React from 'react';
import { useApp } from '../../context/AppContext';
import './ExpensesPage.css';

function ExpensesPage() {
  const { expenses, updateExpense, totalExpenses } = useApp();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="expenses-page">
      <div className="expenses-container">
        <h1 className="expenses-title">Track Your Expenses</h1>
        <div className="total-expenses">
          <h2>Total Monthly Expenses: {formatCurrency(totalExpenses)}</h2>
        </div>

        <div className="expenses-grid">
          {expenses.map(expense => (
            <div key={expense.id} className="expense-card">
              <div className="expense-header">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={expense.checked}
                    onChange={(e) => updateExpense(expense.id, 'checked', e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  <span className="expense-name">{expense.name}</span>
                </label>
              </div>
              
              {expense.checked && (
                <div className="expense-value-input">
                  <label htmlFor={`value-${expense.id}`}>Monthly Amount:</label>
                  <input
                    id={`value-${expense.id}`}
                    type="number"
                    placeholder="Enter monthly amount"
                    value={expense.value}
                    onChange={(e) => updateExpense(expense.id, 'value', e.target.value)}
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

export default ExpensesPage;