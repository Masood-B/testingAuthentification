// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const { isAuthenticated } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="navbar-container">
      {/* Overlay */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="sidebar">
          <ul className="sidebar-list">
            <li className="navbar-item">
              <Link to="/profile" onClick={toggleSidebar}>Profile</Link>
            </li>
          </ul>
        </div>
      )}

      <nav className="navbar">
        <div className="navbar-left">
          <button onClick={toggleSidebar} className="sidebar-toggle">
            ☰
          </button>
        </div>
        <div className="navbar-right">
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link to="/">Home</Link>
            </li>
            {!isAuthenticated && (
              <li className="navbar-item">
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
