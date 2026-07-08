import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import { adminService } from '../../services/adminService';
import { formatCurrency } from '../../utils/formatCurrency';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    adminService.stats().then((response) => setStats(response.data));
  }, []);

  if (!stats) return <LoadingSpinner />;

  return (
    <>
      <h1 className="h3 mb-3">Admin Dashboard</h1>
      <div className="row g-3">
        <div className="col-md-4 col-xl-2"><div className="stat-card p-3"><p className="text-muted mb-1">Users</p><h2 className="h4">{stats.users}</h2></div></div>
        <div className="col-md-4 col-xl-2"><div className="stat-card p-3"><p className="text-muted mb-1">Items</p><h2 className="h4">{stats.items}</h2></div></div>
        <div className="col-md-4 col-xl-2"><div className="stat-card p-3"><p className="text-muted mb-1">Orders</p><h2 className="h4">{stats.orders}</h2></div></div>
        <div className="col-md-4 col-xl-3"><div className="stat-card p-3"><p className="text-muted mb-1">Pickup stations</p><h2 className="h4">{stats.pickupStations}</h2></div></div>
        <div className="col-md-8 col-xl-3"><div className="stat-card p-3"><p className="text-muted mb-1">Order value</p><h2 className="h4">{formatCurrency(stats.totalSales)}</h2></div></div>
      </div>
    </>
  );
};

export default AdminDashboard;
