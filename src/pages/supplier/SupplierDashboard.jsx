import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import OrderStatusBadge from '../../components/OrderStatusBadge';
import { itemService } from '../../services/itemService';
import { orderService } from '../../services/orderService';

const SupplierDashboard = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    Promise.all([itemService.getMyItems(), orderService.supplierOrders()]).then(([itemsResponse, ordersResponse]) => {
      setSummary({ items: itemsResponse.data, orders: ordersResponse.data });
    });
  }, []);

  if (!summary) return <LoadingSpinner />;

  const pending = summary.orders.filter((order) => order.status === 'Pending');

  return (
    <>
      <h1 className="h3 mb-3">Supplier Dashboard</h1>
      <div className="row g-3 mb-4">
        <div className="col-md-4"><div className="stat-card p-3"><p className="text-muted mb-1">Items</p><h2 className="h4">{summary.items.length}</h2></div></div>
        <div className="col-md-4"><div className="stat-card p-3"><p className="text-muted mb-1">Orders</p><h2 className="h4">{summary.orders.length}</h2></div></div>
        <div className="col-md-4"><div className="stat-card p-3"><p className="text-muted mb-1">Pending</p><h2 className="h4">{pending.length}</h2></div></div>
      </div>
      <div className="panel p-3">
        <h2 className="h5">Latest Orders</h2>
        <div className="table-responsive border-0">
          <table className="table mb-0 align-middle">
            <tbody>
              {summary.orders.slice(0, 5).map((order) => (
                <tr key={order.id}><td>{order.order_number}</td><td>{order.customer_name}</td><td><OrderStatusBadge status={order.status} /></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SupplierDashboard;
