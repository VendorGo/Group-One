import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const dashboardPath = {
    admin: '/admin',
    customer: '/customer',
    supplier: '/supplier',
    station_officer: '/station'
  }[user?.role];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">VenderGo</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/items">Browse Items</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
            {user && <li className="nav-item"><NavLink className="nav-link" to={dashboardPath}>Dashboard</NavLink></li>}
            {user?.role === 'customer' && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/customer/cart">Cart ({items.length})</NavLink>
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center gap-2">
            {user ? (
              <>
                <span className="small text-muted">{user.full_name}</span>
                <button className="btn btn-outline-secondary btn-sm" type="button" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-secondary btn-sm" to="/login">Login</Link>
                <Link className="btn btn-brand btn-sm" to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
