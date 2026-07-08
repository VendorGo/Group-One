import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AlertMessage from '../../components/AlertMessage';
import { useAuth } from '../../context/AuthContext';

const roleHome = {
  admin: '/admin',
  customer: '/customer',
  supplier: '/supplier',
  station_officer: '/station'
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const user = await login(form);
      navigate(location.state?.from?.pathname || roleHome[user.role] || '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <form className="panel p-4" onSubmit={handleSubmit}>
          <h1 className="h3 mb-3">Login</h1>
          <AlertMessage type="danger" message={error} onClose={() => setError('')} />
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input className="form-control" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button className="btn btn-brand w-100" type="submit">Login</button>
          <p className="small mt-3 mb-0">No account yet? <Link to="/register">Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
