'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserForm from '../components/UserForm';

export default function SettingsPage() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      alert('You must be logged in.');
      router.push('/');
      return;
    }
    const user = JSON.parse(stored);

    fetch(`/api/users?username=${encodeURIComponent(user.username)}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch(() => {
        alert('Error loading user data.');
        router.push('/');
      });
  }, [router]);

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const savePassword = async () => {
    setError('');
    setMessage('');

    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    const res = await fetch('/api/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: userData.username,
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      }),
    });

    if (res.ok) {
      setMessage('Password updated successfully.');
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
      setShowModal(true);
    } else {
      const result = await res.json();
      setError(result.error || 'Failed to update password.');
    }
  };

  if (!userData) {
    return <div className="ml-40 p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 ml-40 py-8 px-4 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-800 p-3 rounded">
          {error}
        </div>
      )}
      {message && (
        <div className="bg-green-100 border border-green-300 text-green-800 p-3 rounded">
          {message}
        </div>
      )}

      {/* personal info section */}
      <section className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold mb-2">Update Personal Information</h2>
        <UserForm
          mode="edit"
          initialData={{
            name: userData.name || '',
            lastname: userData.lastname || '',
            dateOfBirth: userData.dateOfBirth || '',
            email: userData.email || '',
            address: {
              street: userData.address?.street || '',
              number: userData.address?.number || '',
              postalCode: userData.address?.postalCode || '',
              city: userData.address?.city || '',
            },
            phone1: userData.phone1 || '',
            phone2: userData.phone2 || '',
            username: userData.username,
          }}
          onSuccess={() => setShowModal(true)}
        />
      </section>

      {/* password & security section */}
      <section className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Password & Security</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold">Current Password</label>
            <input
              name="currentPassword"
              type="password"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold">New Password</label>
            <input
              name="newPassword"
              type="password"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Confirm New Password</label>
            <input
              name="confirmNewPassword"
              type="password"
              value={passwords.confirmNewPassword}
              onChange={handlePasswordChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>
        <button
          onClick={savePassword}
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Change Password
        </button>
      </section>

      {/* succes pop-up */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 flex flex-col space-y-4">
            <h2 className="text-gray-800 text-xl font-bold">Success</h2>
            <p>Your information has been saved.</p>
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
