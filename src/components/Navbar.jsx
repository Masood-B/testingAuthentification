import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
          <button onClick={toggleSidebar} className="close-btn">
            &times;
          </button>
          <ul className="sidebar-list">
          <li className="navbar-item">
              <Link to="/profile">Profile</Link>
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
            <li className="navbar-item">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
