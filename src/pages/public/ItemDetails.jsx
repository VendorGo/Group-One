import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AlertMessage from '../../components/AlertMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { itemService } from '../../services/itemService';
import { uploadsUrl } from '../../services/api';
import { formatCurrency } from '../../utils/formatCurrency';

const ItemDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [item, setItem] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    itemService.getItem(id).then((response) => setItem(response.data));
  }, [id]);

  if (!item) return <LoadingSpinner />;

  const imageUrl = item.image ? `${uploadsUrl}${item.image}` : 'https://placehold.co/900x650/e0f2fe/0f766e?text=VenderGo';

  const handleAdd = async () => {
    await addToCart(item.id, 1);
    setMessage('Item added to cart');
  };

  return (
    <div className="row g-4">
      <div className="col-md-6">
        <img className="w-100 item-image rounded" src={imageUrl} alt={item.item_name} />
      </div>
      <div className="col-md-6">
        <AlertMessage type="success" message={message} onClose={() => setMessage('')} />
        <h1 className="h3">{item.item_name}</h1>
        <p className="text-brand fw-semibold fs-4">{formatCurrency(item.price)}</p>
        <p>{item.description || 'No description provided.'}</p>
        <dl className="row">
          <dt className="col-sm-4">Supplier</dt><dd className="col-sm-8">{item.supplier_name}</dd>
          <dt className="col-sm-4">Category</dt><dd className="col-sm-8">{item.category_name}</dd>
          <dt className="col-sm-4">Stock</dt><dd className="col-sm-8">{item.stock_quantity} {item.unit}</dd>
        </dl>
        {user?.role === 'customer' && (
          <button className="btn btn-brand" type="button" disabled={item.stock_quantity < 1} onClick={handleAdd}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
