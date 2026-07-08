import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../../components/AlertMessage';
import { useCart } from '../../context/CartContext';
import { adminService } from '../../services/adminService';
import { orderService } from '../../services/orderService';
import { formatCurrency } from '../../utils/formatCurrency';

const Checkout = () => {
  const { items, total, loadCart } = useCart();
  const navigate = useNavigate();
  const [stations, setStations] = useState([]);
  const [form, setForm] = useState({ pickup_station_id: '', customer_notes: '' });
  const [paymentMethod, setPaymentMethod] = useState('airtel');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    adminService.activePickupStations().then((response) => setStations(response.data)).catch(() => setStations([]));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const payload = {
        ...form,
        pickup_station_id: form.pickup_station_id ? Number(form.pickup_station_id) : null
      };

      const response = await orderService.placeOrder(payload);
      const orderId = response.data?.order?.id || response.data?.orders?.[0]?.id || response.data?.id;

      if (!orderId) {
        throw new Error('Order created but server did not return an order ID.');
      }

      await loadCart();
      navigate(`/customer/orders/${orderId}/pay`);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Could not place order');
    }
  };

  return (
    <form className="panel p-4" onSubmit={handleSubmit}>
      <h1 className="h3 mb-3">Checkout</h1>
      <AlertMessage type="danger" message={error} onClose={() => setError('')} />
      <p className="text-muted">{items.length} cart items, total {formatCurrency(total)}</p>
      <div className="alert alert-info">
        After placing your order, you will be redirected to a mobile money payment page where you can pay using Airtel Money or MTN Mobile Money.
      </div>
      <div className="mb-3">
        <label className="form-label">Pickup station</label>
        <select className="form-select" value={form.pickup_station_id} onChange={(e) => setForm({ ...form, pickup_station_id: e.target.value })} required>
          <option value="">Choose station</option>
          {stations.map((station) => <option key={station.id} value={station.id}>{station.station_name} - {station.district}</option>)}
        </select>
        {stations.length === 0 && <div className="form-text">If no stations load, ask an admin to create stations or use seeded admin data.</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Customer notes</label>
        <textarea className="form-control" rows="3" value={form.customer_notes} onChange={(e) => setForm({ ...form, customer_notes: e.target.value })} />
      </div>
      <button className="btn btn-brand" type="submit" disabled={items.length === 0}>Place Order & Continue to Payment</button>
    </form>
  );
};

export default Checkout;
