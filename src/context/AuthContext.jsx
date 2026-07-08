import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vendergo_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  // AuthContext keeps login state in one place. Any component can call useAuth()
  // instead of passing the user through many layers of props.
  useEffect(() => {
    const token = localStorage.getItem('vendergo_token');
    if (!token) return;

    setLoading(true);
    authService.me()
      .then((response) => {
        setUser(response.data);
        localStorage.setItem('vendergo_user', JSON.stringify(response.data));
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    localStorage.setItem('vendergo_token', response.data.token);
    localStorage.setItem('vendergo_user', JSON.stringify(response.data.user));
    setUser(response.data.user);
    return response.data.user;
  };

  const register = async (formData) => {
    const response = await authService.register(formData);
    localStorage.setItem('vendergo_token', response.data.token);
    localStorage.setItem('vendergo_user', JSON.stringify(response.data.user));
    setUser(response.data.user);
    return response.data.user;
  };

  const logout = () => {
    localStorage.removeItem('vendergo_token');
    localStorage.removeItem('vendergo_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: Boolean(user) }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
