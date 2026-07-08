import { useEffect, useState } from 'react';
import AlertMessage from '../../components/AlertMessage';
import { adminService } from '../../services/adminService';
import { itemService } from '../../services/itemService';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [message, setMessage] = useState('');

  const loadCategories = () => itemService.getCategories().then((response) => setCategories(response.data));

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await adminService.createCategory(form);
    setForm({ name: '', description: '' });
    setMessage('Category created');
    loadCategories();
  };

  return (
    <>
      <h1 className="h3 mb-3">Manage Categories</h1>
      <AlertMessage type="success" message={message} onClose={() => setMessage('')} />
      <form className="panel p-3 mb-3" onSubmit={handleSubmit}>
        <div className="row g-2">
          <div className="col-md-4"><input className="form-control" placeholder="Category name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div className="col-md-6"><input className="form-control" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div className="col-md-2 d-grid"><button className="btn btn-brand" type="submit">Create</button></div>
        </div>
      </form>
      <div className="row g-3">
        {categories.map((category) => (
          <div className="col-md-4" key={category.id}>
            <div className="stat-card p-3 h-100">
              <h2 className="h6">{category.name}</h2>
              <p className="small text-muted mb-0">{category.description || 'No description'}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ManageCategories;
