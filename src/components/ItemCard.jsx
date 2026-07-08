import { Link } from 'react-router-dom';
import { uploadsUrl } from '../services/api';
import { formatCurrency } from '../utils/formatCurrency';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ItemCard = ({ item, onMessage }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const imageUrl = item.image ? `${uploadsUrl}${item.image}` : 'https://placehold.co/600x450/e0f2fe/0f766e?text=VenderGo';

  const handleAdd = async () => {
    try {
      await addToCart(item.id, 1);
      onMessage?.('Item added to cart');
    } catch (error) {
      onMessage?.(error.response?.data?.message || 'Could not add item');
    }
  };

  return (
    <div className="item-card h-100 overflow-hidden">
      <img className="item-image w-100" src={imageUrl} alt={item.item_name} />
      <div className="p-3">
        <div className="d-flex justify-content-between gap-2">
          <h3 className="h6 mb-1">{item.item_name}</h3>
          <span className="badge text-bg-light">{item.category_name || 'General'}</span>
        </div>
        <p className="mb-1 text-brand fw-semibold">{formatCurrency(item.price)}</p>
        <p className="small text-muted mb-2">
          {item.stock_quantity} {item.unit || 'pieces'} in stock by {item.supplier_name}
        </p>
        <div className="d-flex gap-2">
          <Link className="btn btn-outline-secondary btn-sm flex-grow-1" to={`/items/${item.id}`}>
            Details
          </Link>
          {user?.role === 'customer' && (
            <button className="btn btn-brand btn-sm" type="button" disabled={item.stock_quantity < 1} onClick={handleAdd}>
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
