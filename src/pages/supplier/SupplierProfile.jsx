import { useEffect, useState } from 'react';
import AlertMessage from '../../components/AlertMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import api from '../../services/api';

const SupplierProfile = () => {
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/profile').then((response) => {
      const profile = response.data.supplierProfile || {};
      setForm({
        business_name: profile.business_name || '',
        business_description: profile.business_description || '',
        district: profile.district || '',
        address: profile.address || '',
        phone: profile.phone || ''
      });
    });
  }, []);

  if (!form) return <LoadingSpinner />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api.put('/profile/supplier', form);
    setMessage('Supplier profile saved');
  };

  return (
    <form className="panel p-4" onSubmit={handleSubmit}>
      <h1 className="h3 mb-3">Supplier Profile</h1>
      <AlertMessage type="success" message={message} onClose={() => setMessage('')} />
      <div className="row g-3">
        <div className="col-md-6"><label className="form-label">Business name</label><input className="form-control" value={form.business_name} onChange={(e) => setForm({ ...form, business_name: e.target.value })} required /></div>
        <div className="col-md-6"><label className="form-label">Phone</label><input className="form-control" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
        <div className="col-md-6"><label className="form-label">District</label><input className="form-control" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} /></div>
        <div className="col-md-6"><label className="form-label">Address</label><input className="form-control" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
        <div className="col-12"><label className="form-label">Description</label><textarea className="form-control" rows="4" value={form.business_description} onChange={(e) => setForm({ ...form, business_description: e.target.value })} /></div>
      </div>
      <button className="btn btn-brand mt-3" type="submit">Save Profile</button>
    </form>
  );
};

export default SupplierProfile;
