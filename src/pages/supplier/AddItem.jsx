import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../../components/AlertMessage';
import { itemService } from '../../services/itemService';

const emptyForm = { item_name: '', category_id: '', description: '', price: '', stock_quantity: '', unit: 'piece', image: null };

const AddItem = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    itemService.getCategories().then((response) => setCategories(response.data));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => value !== null && formData.append(key, value));
      await itemService.createItem(formData);
      navigate('/supplier/items');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create item');
    }
  };

  return (
    <form className="panel p-4" onSubmit={handleSubmit}>
      <h1 className="h3 mb-3">Add Item</h1>
      <AlertMessage type="danger" message={error} onClose={() => setError('')} />
      <div className="row g-3">
        <div className="col-md-6"><label className="form-label">Item name</label><input className="form-control" value={form.item_name} onChange={(e) => setForm({ ...form, item_name: e.target.value })} required /></div>
        <div className="col-md-6"><label className="form-label">Category</label><select className="form-select" value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}><option value="">Choose category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></div>
        <div className="col-md-4"><label className="form-label">Price</label><input className="form-control" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required /></div>
        <div className="col-md-4"><label className="form-label">Stock</label><input className="form-control" type="number" value={form.stock_quantity} onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })} required /></div>
        <div className="col-md-4"><label className="form-label">Unit</label><input className="form-control" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} /></div>
        <div className="col-12"><label className="form-label">Image</label><input className="form-control" type="file" accept="image/*" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} /></div>
        <div className="col-12"><label className="form-label">Description</label><textarea className="form-control" rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
      </div>
      <button className="btn btn-brand mt-3" type="submit">Create Item</button>
    </form>
  );
};

export default AddItem;
