import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleBasedRoute = ({ roles }) => {
  const { user } = useAuth();

  // Role-based routing protects pages like /admin and /supplier from users who
  // are logged in but do not have the correct system role.
  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;
