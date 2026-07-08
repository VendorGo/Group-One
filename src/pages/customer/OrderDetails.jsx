import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AlertMessage from '../../components/AlertMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import OrderStatusBadge from '../../components/OrderStatusBadge';
import { orderService } from '../../services/orderService';
import { formatCurrency } from '../../utils/formatCurrency';

const OrderDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('');

  const loadOrder = () => orderService.getOrder(id).then((response) => setData(response.data));

  useEffect(() => {
    loadOrder();
  }, [id]);

  if (!data) return <LoadingSpinner />;

  const handleCancel = async () => {
    if (!window.confirm('Cancel this order?')) return;
    await orderService.cancelOrder(id);
    setMessage('Order cancelled');
    loadOrder();
  };

  const handleConfirm = async () => {
    if (!window.confirm('Confirm that you received this order?')) return;
    await orderService.confirmReceived(id);
    setMessage('Order completed');
    loadOrder();
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h1 className="h3 mb-1">{data.order.order_number}</h1>
          <OrderStatusBadge status={data.order.status} />
        </div>
        <Link className="btn btn-outline-secondary" to={`/customer/track/${id}`}>Track</Link>
      </div>
      <AlertMessage type="success" message={message} onClose={() => setMessage('')} />
      <div className="panel p-3 mb-3">
        <p className="mb-1"><strong>Supplier:</strong> {data.order.supplier_name}</p>
        <p className="mb-1"><strong>Pickup station:</strong> {data.order.station_name}</p>
        <p className="mb-0"><strong>Total:</strong> {formatCurrency(data.order.total_amount)}</p>
      </div>
      <div className="table-responsive mb-3">
        <table className="table mb-0">
          <thead><tr><th>Item</th><th>Quantity</th><th>Unit price</th><th>Subtotal</th></tr></thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id}><td>{item.item_name}</td><td>{item.quantity}</td><td>{formatCurrency(item.unit_price)}</td><td>{formatCurrency(item.subtotal)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex gap-2 flex-wrap">
        {['Pending', 'Accepted'].includes(data.order.status) && (
          <>
            <button className="btn btn-outline-danger" type="button" onClick={handleCancel}>Cancel Order</button>
            <Link className="btn btn-brand" to={`/customer/orders/${id}/pay`}>Pay Now</Link>
          </>
        )}
        {['Picked Up', 'Ready for Pickup'].includes(data.order.status) && <button className="btn btn-brand" type="button" onClick={handleConfirm}>Confirm Received</button>}
      </div>
    </>
  );
};

export default OrderDetails;
