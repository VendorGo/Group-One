import { Link } from 'react-router-dom';
import AlertMessage from '../../components/AlertMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { useState } from 'react';

const Cart = () => {
  const { items, loading, total, updateQuantity, removeItem, clearCart } = useCart();
  const [message, setMessage] = useState('');

  const handleRemove = async (id) => {
    if (!window.confirm('Remove this item from cart?')) return;
    await removeItem(id);
    setMessage('Item removed from cart');
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h1 className="h3 mb-3">Cart</h1>
      <AlertMessage type="success" message={message} onClose={() => setMessage('')} />
      {items.length === 0 ? (
        <div className="panel p-4">
          <p>Your cart is empty.</p>
          <Link className="btn btn-brand" to="/items">Browse Items</Link>
        </div>
      ) : (
        <>
          <div className="table-responsive mb-3">
            <table className="table align-middle mb-0">
              <thead><tr><th>Item</th><th>Supplier</th><th>Price</th><th>Quantity</th><th>Subtotal</th><th></th></tr></thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.item_name}</td>
                    <td>{item.supplier_name}</td>
                    <td>{formatCurrency(item.price)}</td>
                    <td style={{ maxWidth: 120 }}>
                      <input className="form-control" type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.id, Number(e.target.value))} />
                    </td>
                    <td>{formatCurrency(item.price * item.quantity)}</td>
                    <td><button className="btn btn-sm btn-outline-danger" type="button" onClick={() => handleRemove(item.id)}>Remove</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 panel p-3">
            <strong>Total: {formatCurrency(total)}</strong>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary" type="button" onClick={clearCart}>Clear Cart</button>
              <Link className="btn btn-brand" to="/customer/checkout">Checkout</Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
