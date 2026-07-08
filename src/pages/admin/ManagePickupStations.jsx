import { useEffect, useState } from 'react';
import AlertMessage from '../../components/AlertMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import { adminService } from '../../services/adminService';

const initialForm = { station_name: '', district: '', location_details: '', officer_id: '', phone: '', status: 'active' };

const ManagePickupStations = () => {
  const [stations, setStations] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');

  const loadStations = () => adminService.pickupStations().then((response) => setStations(response.data));

  useEffect(() => {
    loadStations();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await adminService.createPickupStation(form);
    setForm(initialForm);
    setMessage('Pickup station created');
    loadStations();
  };

  if (!stations) return <LoadingSpinner />;

  return (
    <>
      <h1 className="h3 mb-3">Manage Pickup Stations</h1>
      <AlertMessage type="success" message={message} onClose={() => setMessage('')} />
      <form className="panel p-3 mb-3" onSubmit={handleSubmit}>
        <div className="row g-2">
          <div className="col-md-3"><input className="form-control" placeholder="Station name" value={form.station_name} onChange={(e) => setForm({ ...form, station_name: e.target.value })} required /></div>
          <div className="col-md-2"><input className="form-control" placeholder="District" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} required /></div>
          <div className="col-md-3"><input className="form-control" placeholder="Location details" value={form.location_details} onChange={(e) => setForm({ ...form, location_details: e.target.value })} /></div>
          <div className="col-md-2"><input className="form-control" placeholder="Officer ID" value={form.officer_id} onChange={(e) => setForm({ ...form, officer_id: e.target.value })} /></div>
          <div className="col-md-2 d-grid"><button className="btn btn-brand" type="submit">Create</button></div>
        </div>
      </form>
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead><tr><th>Station</th><th>District</th><th>Officer</th><th>Phone</th><th>Status</th></tr></thead>
          <tbody>
            {stations.map((station) => (
              <tr key={station.id}><td>{station.station_name}</td><td>{station.district}</td><td>{station.officer_name || 'Unassigned'}</td><td>{station.phone}</td><td>{station.status}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManagePickupStations;
