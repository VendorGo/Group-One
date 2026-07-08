import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import OrderStatusBadge from '../../components/OrderStatusBadge';
import { orderService } from '../../services/orderService';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

const MyOrders = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    orderService.myOrders().then((response) => setOrders(response.data));
  }, []);

  if (!orders) return <LoadingSpinner />;

  return (
    <>
      <h1 className="h3 mb-3">My Orders</h1>
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead><tr><th>Order</th><th>Supplier</th><th>Station</th><th>Total</th><th>Status</th><th>Date</th><th></th></tr></thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.order_number}</td>
                <td>{order.supplier_name}</td>
                <td>{order.station_name}</td>
                <td>{formatCurrency(order.total_amount)}</td>
                <td><OrderStatusBadge status={order.status} /></td>
                <td>{formatDate(order.created_at)}</td>
                <td><Link to={`/customer/orders/${order.id}`}>Details</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyOrders;
