import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import OrderStatusBadge from '../../components/OrderStatusBadge';
import { orderService } from '../../services/orderService';
import { formatCurrency } from '../../utils/formatCurrency';

const CustomerDashboard = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    orderService.myOrders().then((response) => setOrders(response.data));
  }, []);

  if (!orders) return <LoadingSpinner />;

  const activeOrders = orders.filter((order) => !['Completed', 'Cancelled', 'Rejected'].includes(order.status));
  const totalSpent = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);

  return (
    <>
      <h1 className="h3 mb-3">Customer Dashboard</h1>
      <div className="row g-3 mb-4">
        <div className="col-md-4"><div className="stat-card p-3"><p className="text-muted mb-1">Total orders</p><h2 className="h4">{orders.length}</h2></div></div>
        <div className="col-md-4"><div className="stat-card p-3"><p className="text-muted mb-1">Active orders</p><h2 className="h4">{activeOrders.length}</h2></div></div>
        <div className="col-md-4"><div className="stat-card p-3"><p className="text-muted mb-1">Order value</p><h2 className="h4">{formatCurrency(totalSpent)}</h2></div></div>
      </div>
      <div className="panel p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="h5 mb-0">Recent Orders</h2>
          <Link to="/items" className="btn btn-sm btn-brand">Shop</Link>
        </div>
        <div className="table-responsive border-0">
          <table className="table align-middle mb-0">
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id}>
                  <td>{order.order_number}</td>
                  <td>{order.supplier_name}</td>
                  <td><OrderStatusBadge status={order.status} /></td>
                  <td><Link to={`/customer/orders/${order.id}`}>View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
