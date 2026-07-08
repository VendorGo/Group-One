import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import { adminService } from '../../services/adminService';
import { formatCurrency } from '../../utils/formatCurrency';

const ManageItems = () => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    adminService.items().then((response) => setItems(response.data));
  }, []);

  if (!items) return <LoadingSpinner />;

  return (
    <>
      <h1 className="h3 mb-3">Manage Items</h1>
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead><tr><th>Item</th><th>Supplier</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}><td>{item.item_name}</td><td>{item.supplier_name}</td><td>{item.category_name}</td><td>{formatCurrency(item.price)}</td><td>{item.stock_quantity}</td><td>{item.status}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageItems;
