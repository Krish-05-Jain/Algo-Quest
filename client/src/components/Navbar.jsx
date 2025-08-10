import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Login</Link>
      <Link to="/question">Question</Link>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
};

export default Navbar;
