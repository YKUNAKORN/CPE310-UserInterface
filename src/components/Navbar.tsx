import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className="navbar-title">ASL Detection</h1>
        </Link>
      </div>
      <div className="navbar-menu">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          Overview
        </Link>
        <Link 
          to="/detection" 
          className={`nav-link ${location.pathname === '/detection' ? 'active' : ''}`}
        >
          Detection
        </Link>
        <Link 
          to="/manual" 
          className={`nav-link ${location.pathname === '/manual' ? 'active' : ''}`}
        >
          Manual
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
