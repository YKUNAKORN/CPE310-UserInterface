import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Overview from './components/Overview';
import HowToUse from './components/HowToUse';
import './App.css';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isDetectionPage = location.pathname === '/detection';

  return (
    <div className={`app ${isDetectionPage ? 'detection-page' : ''}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/detection" element={<Home />} />
        <Route path="/manual" element={<HowToUse />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
