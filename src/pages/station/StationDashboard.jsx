import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { orderService } from '../../services/orderService';

const StationDashboard = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    orderService.stationOrders().then((response) => setOrders(response.data));
  }, []);

  if (!orders) return <LoadingSpinner />;

  const ready = orders.filter((order) => order.status === 'Ready for Pickup');

  return (
    <>
      <h1 className="h3 mb-3">Pickup Station Dashboard</h1>
      <div className="row g-3 mb-4">
        <div className="col-md-4"><div className="stat-card p-3"><p className="text-muted mb-1">Assigned orders</p><h2 className="h4">{orders.length}</h2></div></div>
        <div className="col-md-4"><div className="stat-card p-3"><p className="text-muted mb-1">Ready for pickup</p><h2 className="h4">{ready.length}</h2></div></div>
        <div className="col-md-4"><div className="stat-card p-3"><p className="text-muted mb-1">Completed</p><h2 className="h4">{orders.filter((o) => o.status === 'Completed').length}</h2></div></div>
      </div>
      <Link className="btn btn-brand" to="/station/orders">Manage Station Orders</Link>
    </>
  );
};

export default StationDashboard;
