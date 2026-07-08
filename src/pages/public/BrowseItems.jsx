import { useEffect, useState } from 'react';
import AlertMessage from '../../components/AlertMessage';
import ItemCard from '../../components/ItemCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { itemService } from '../../services/itemService';

const BrowseItems = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ search: '', category: '', supplier: '', available: false });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const loadItems = async () => {
    setLoading(true);
    try {
      const response = await itemService.getItems({
        search: filters.search || undefined,
        category: filters.category || undefined,
        supplier: filters.supplier || undefined,
        available: filters.available || undefined
      });
      setItems(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    itemService.getCategories().then((response) => setCategories(response.data));
  }, []);

  useEffect(() => {
    loadItems();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    loadItems();
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h1 className="h3 mb-1">Browse Items</h1>
          <p className="text-muted mb-0">Search by name, category, supplier, and availability.</p>
        </div>
      </div>
      <AlertMessage type="success" message={message} onClose={() => setMessage('')} />
      <form className="panel p-3 mb-4" onSubmit={handleSubmit}>
        <div className="row g-2">
          <div className="col-md-4">
            <input className="form-control" placeholder="Search item name" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
          </div>
          <div className="col-md-3">
            <select className="form-select" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
              <option value="">All categories</option>
              {categories.map((category) => <option key={category.id} value={category.name}>{category.name}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Supplier name" value={filters.supplier} onChange={(e) => setFilters({ ...filters, supplier: e.target.value })} />
          </div>
          <div className="col-md-2 d-grid">
            <button className="btn btn-brand" type="submit">Search</button>
          </div>
          <div className="col-12">
            <label className="form-check">
              <input className="form-check-input" type="checkbox" checked={filters.available} onChange={(e) => setFilters({ ...filters, available: e.target.checked })} />
              <span className="form-check-label">Show available items only</span>
            </label>
          </div>
        </div>
      </form>
      {loading ? <LoadingSpinner /> : (
        <div className="row g-3">
          {items.map((item) => (
            <div className="col-sm-6 col-lg-4 col-xl-3" key={item.id}>
              <ItemCard item={item} onMessage={setMessage} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BrowseItems;
