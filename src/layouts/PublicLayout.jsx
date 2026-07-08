import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PublicLayout = () => (
  <div className="app-shell">
    <Navbar />
    <main className="container py-4">
      <Outlet />
    </main>
  </div>
);

export default PublicLayout;
