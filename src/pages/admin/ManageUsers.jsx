import { useEffect, useState } from 'react';
import AlertMessage from '../../components/AlertMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import { adminService } from '../../services/adminService';

const ManageUsers = () => {
  const [users, setUsers] = useState(null);
  const [message, setMessage] = useState('');

  const loadUsers = () => adminService.users().then((response) => setUsers(response.data));

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleStatus = async (user) => {
    const nextStatus = user.status === 'active' ? 'inactive' : 'active';
    await adminService.updateUserStatus(user.id, nextStatus);
    setMessage(`User marked ${nextStatus}`);
    loadUsers();
  };

  if (!users) return <LoadingSpinner />;

  return (
    <>
      <h1 className="h3 mb-3">Manage Users</h1>
      <AlertMessage type="success" message={message} onClose={() => setMessage('')} />
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td className="text-end"><button className="btn btn-sm btn-outline-secondary" onClick={() => toggleStatus(user)}>{user.status === 'active' ? 'Deactivate' : 'Activate'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUsers;
