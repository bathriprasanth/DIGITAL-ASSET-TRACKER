import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './pages/Landing/LandingPage';
import Dashboard from './pages/Dashboard/Dashboard';
import AboutPage from './pages/About/AboutPage';
import LoginPage from './pages/Login/LoginPage';
import InvestmentsPage from './pages/Investments/InvestmentsPage';
import InvestmentDetailsPage from './pages/InvestmentDetails/InvestmentDetailsPage';
import './App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/investments" element={<InvestmentsPage />} />
            <Route path="/investment/:type" element={<InvestmentDetailsPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;