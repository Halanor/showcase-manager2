'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthorizationPage() {
  const [users, setUsers] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [newRole, setNewRole] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [modal, setModal] = useState({ open: false, message: '', type: '' });

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    const user = stored ? JSON.parse(stored) : null;

    if (!user || user.role !== 'admin') {
      setModal({
        open: true,
        message: "You don't have access to this page.",
        type: 'error'
      });
        setModal({ open: false, message: '', type: '' });
        router.push('/');
    } else {
      fetchUsers();
    }
  }, [router]);

  async function fetchUsers() {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data);
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSelectedUsername(value);
    if (value.trim() === '') {
      setSuggestions([]);
      setCurrentRole('');
      return;
    }
    const filtered = users
      .filter((u) => u.username.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5);
    setSuggestions(filtered);
  };

  const handleSuggestionClick = (username) => {
    const user = users.find((u) => u.username === username);
    setSelectedUsername(username);
    setCurrentRole(user?.role || '');
    setNewRole(user?.role || '');
    setSuggestions([]);
  };

  const handleChangeRole = async () => {
    if (!selectedUsername || !newRole) {
      setModal({
        open: true,
        message: 'Please select a user and a role.',
        type: 'error'
      });
      return;
    }

    const res = await fetch('/api/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: selectedUsername, role: newRole }),
    });

    if (res.ok) {
      setModal({
        open: true,
        message: 'Role updated successfully!',
        type: 'success'
      });
      fetchUsers();
    } else {
      setModal({
        open: true,
        message: 'Error updating role. Assigned role cannot be the same as current one',
        type: 'error'
      });
    }
  };

  const closeModal = () => {
    setModal({ open: false, message: '', type: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 ml-40 py-8 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">User Role Management</h1>

        {/* user selection */}
        <div className="relative mb-4">
          <label className="block text-sm font-semibold mb-1">Search Username</label>
          <input
            value={selectedUsername}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
            placeholder="Type username..."
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow max-h-40 overflow-y-auto">
              {suggestions.map((u) => (
                <li
                  key={u.username}
                  onClick={() => handleSuggestionClick(u.username)}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {u.username}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* current role */}
        {currentRole && (
          <div className="mb-4">
            <p>
              <strong>Current Role:</strong> {currentRole}
            </p>
          </div>
        )}

        {/* updated role */}
        {selectedUsername && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">New Role</label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="">-- Select Role --</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        )}

        <button
          onClick={handleChangeRole}
          className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
        >
          Change Role
        </button>
      </div>

      {/* update pop-up */}
      {modal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 flex flex-col space-y-4">
            <h2
              className={`text-xl font-bold ${
                modal.type === 'success' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {modal.type === 'success' ? 'Success' : 'Error'}
            </h2>
            <p className="text-gray-800">{modal.message}</p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-800 font-bold rounded-full px-4 py-2 hover:brightness-110"
                onClick={closeModal}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
