import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar">
      <h2>React Projects</h2>

      <div>
        <Link to="/">Home</Link>

        {!isLoggedIn ? (
          <Link to="/login">Login</Link>
        ) : (
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;