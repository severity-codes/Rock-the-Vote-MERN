
import PropTypes from 'prop-types'; // Ensure you've installed prop-types
import { Link } from 'react-router-dom';

function Navbar({ logout }) {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/public">Public</Link>
      <button className="logout" onClick={logout} aria-label="Logout">
        Logout
      </button>
    </nav>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Navbar;
