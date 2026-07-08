import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertMessage from '../../components/AlertMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import OrderStatusBadge from '../../components/OrderStatusBadge';
import { orderService } from '../../services/orderService';

const StationOrders = () => {
  const [orders, setOrders] = useState(null);
  const [message, setMessage] = useState('');

  const loadOrders = () => orderService.stationOrders().then((response) => setOrders(response.data));

  useEffect(() => {
    loadOrders();
  }, []);

  const action = async (fn, id, success) => {
    const note = window.prompt('Optional tracking note') || '';
    await fn(id, note);
    setMessage(success);
    loadOrders();
  };

  if (!orders) return <LoadingSpinner />;

  return (
    <>
      <h1 className="h3 mb-3">Station Orders</h1>
      <AlertMessage type="success" message={message} onClose={() => setMessage('')} />
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead><tr><th>Order</th><th>Customer</th><th>Supplier</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td><Link to={`/station/orders/${order.id}`}>{order.order_number}</Link></td>
                <td>{order.customer_name}</td>
                <td>{order.supplier_name}</td>
                <td><OrderStatusBadge status={order.status} /></td>
                <td className="d-flex flex-wrap gap-1">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => action(orderService.markArrived, order.id, 'Order marked arrived')}>Arrived</button>
                  <button className="btn btn-sm btn-outline-success" onClick={() => action(orderService.markReady, order.id, 'Order marked ready')}>Ready</button>
                  <button className="btn btn-sm btn-brand" onClick={() => action(orderService.markPickedUp, order.id, 'Order picked up')}>Picked Up</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StationOrders;
