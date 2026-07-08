import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { itemService } from '../../services/itemService';

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(null);

  useEffect(() => {
    Promise.all([itemService.getItem(id), itemService.getCategories()]).then(([itemResponse, categoriesResponse]) => {
      const item = itemResponse.data;
      setForm({ item_name: item.item_name, category_id: item.category_id || '', description: item.description || '', price: item.price, stock_quantity: item.stock_quantity, unit: item.unit || 'piece', status: item.status, image: null });
      setCategories(categoriesResponse.data);
    });
  }, [id]);

  if (!form) return <LoadingSpinner />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => value !== null && formData.append(key, value));
    await itemService.updateItem(id, formData);
    navigate('/supplier/items');
  };

  return (
    <form className="panel p-4" onSubmit={handleSubmit}>
      <h1 className="h3 mb-3">Edit Item</h1>
      <div className="row g-3">
        <div className="col-md-6"><label className="form-label">Item name</label><input className="form-control" value={form.item_name} onChange={(e) => setForm({ ...form, item_name: e.target.value })} required /></div>
        <div className="col-md-6"><label className="form-label">Category</label><select className="form-select" value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></div>
        <div className="col-md-3"><label className="form-label">Price</label><input className="form-control" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
        <div className="col-md-3"><label className="form-label">Stock</label><input className="form-control" type="number" value={form.stock_quantity} onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })} /></div>
        <div className="col-md-3"><label className="form-label">Unit</label><input className="form-control" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} /></div>
        <div className="col-md-3"><label className="form-label">Status</label><select className="form-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="active">active</option><option value="inactive">inactive</option></select></div>
        <div className="col-12"><label className="form-label">New image</label><input className="form-control" type="file" accept="image/*" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} /></div>
        <div className="col-12"><label className="form-label">Description</label><textarea className="form-control" rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
      </div>
      <button className="btn btn-brand mt-3" type="submit">Save Item</button>
    </form>
  );
};

export default EditItem;
