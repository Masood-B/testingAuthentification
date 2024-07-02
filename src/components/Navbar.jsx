import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/Login">Login</Link>
        </li>
        <li className="navbar-item">
          <Link to="/Dashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;