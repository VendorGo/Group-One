import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import OrderStatusBadge from '../../components/OrderStatusBadge';
import { adminService } from '../../services/adminService';
import { formatCurrency } from '../../utils/formatCurrency';

const ManageOrders = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    adminService.orders().then((response) => setOrders(response.data));
  }, []);

  if (!orders) return <LoadingSpinner />;

  return (
    <>
      <h1 className="h3 mb-3">Manage Orders</h1>
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead><tr><th>Order</th><th>Customer</th><th>Supplier</th><th>Station</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}><td>{order.order_number}</td><td>{order.customer_name}</td><td>{order.supplier_name}</td><td>{order.station_name}</td><td>{formatCurrency(order.total_amount)}</td><td><OrderStatusBadge status={order.status} /></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageOrders;
