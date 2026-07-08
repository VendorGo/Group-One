import { useEffect, useState } from 'react';
import AlertMessage from '../../components/AlertMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import OrderStatusBadge from '../../components/OrderStatusBadge';
import { orderService } from '../../services/orderService';
import { formatCurrency } from '../../utils/formatCurrency';

const SupplierOrders = () => {
  const [orders, setOrders] = useState(null);
  const [message, setMessage] = useState('');

  const loadOrders = () => orderService.supplierOrders().then((response) => setOrders(response.data));

  useEffect(() => {
    loadOrders();
  }, []);

  const action = async (fn, id, success) => {
    await fn(id);
    setMessage(success);
    loadOrders();
  };

  if (!orders) return <LoadingSpinner />;

  return (
    <>
      <h1 className="h3 mb-3">Incoming Orders</h1>
      <AlertMessage type="success" message={message} onClose={() => setMessage('')} />
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead><tr><th>Order</th><th>Customer</th><th>Station</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.order_number}</td>
                <td>{order.customer_name}</td>
                <td>{order.station_name}</td>
                <td>{formatCurrency(order.total_amount)}</td>
                <td><OrderStatusBadge status={order.status} /></td>
                <td className="d-flex flex-wrap gap-1">
                  <button className="btn btn-sm btn-outline-success" onClick={() => action(orderService.acceptOrder, order.id, 'Order accepted')}>Accept</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => action(orderService.rejectOrder, order.id, 'Order rejected')}>Reject</button>
                  <button className="btn btn-sm btn-outline-primary" onClick={() => action(orderService.markPacked, order.id, 'Order packed')}>Packed</button>
                  <button className="btn btn-sm btn-brand" onClick={() => action(orderService.sendToStation, order.id, 'Order sent to station')}>Send</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SupplierOrders;
