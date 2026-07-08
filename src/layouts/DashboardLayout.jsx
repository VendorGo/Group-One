import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const linksByRole = {
  customer: [
    ['Dashboard', '/customer'],
    ['Cart', '/customer/cart'],
    ['My Orders', '/customer/orders']
  ],
  supplier: [
    ['Dashboard', '/supplier'],
    ['Profile', '/supplier/profile'],
    ['Add Item', '/supplier/items/new'],
    ['My Items', '/supplier/items'],
    ['Orders', '/supplier/orders']
  ],
  station_officer: [
    ['Dashboard', '/station'],
    ['Station Orders', '/station/orders']
  ],
  admin: [
    ['Dashboard', '/admin'],
    ['Users', '/admin/users'],
    ['Items', '/admin/items'],
    ['Orders', '/admin/orders'],
    ['Pickup Stations', '/admin/pickup-stations'],
    ['Categories', '/admin/categories']
  ]
};

const DashboardLayout = () => {
  const { user } = useAuth();
  const links = linksByRole[user?.role] || [];

  return (
    <div className="app-shell">
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <aside className="dashboard-sidebar col-md-3 col-lg-2 p-3">
            <h2 className="h6 text-uppercase text-muted">Menu</h2>
            <nav className="nav nav-pills flex-md-column gap-1">
              {links.map(([label, to]) => (
                <NavLink key={to} end className="nav-link" to={to}>{label}</NavLink>
              ))}
            </nav>
          </aside>
          <main className="col-md-9 col-lg-10 p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
