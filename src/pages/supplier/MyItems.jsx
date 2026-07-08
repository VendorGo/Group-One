import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertMessage from '../../components/AlertMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import { itemService } from '../../services/itemService';
import { formatCurrency } from '../../utils/formatCurrency';

const MyItems = () => {
  const [items, setItems] = useState(null);
  const [message, setMessage] = useState('');

  const loadItems = () => itemService.getMyItems().then((response) => setItems(response.data));

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Deactivate this item?')) return;
    await itemService.deleteItem(id);
    setMessage('Item deactivated');
    loadItems();
  };

  if (!items) return <LoadingSpinner />;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">My Items</h1>
        <Link className="btn btn-brand" to="/supplier/items/new">Add Item</Link>
      </div>
      <AlertMessage type="success" message={message} onClose={() => setMessage('')} />
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.item_name}</td>
                <td>{item.category_name}</td>
                <td>{formatCurrency(item.price)}</td>
                <td>{item.stock_quantity}</td>
                <td>{item.status}</td>
                <td className="text-end">
                  <Link className="btn btn-sm btn-outline-secondary me-2" to={`/supplier/items/${item.id}/edit`}>Edit</Link>
                  <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyItems;
