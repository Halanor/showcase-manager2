'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const [userData, setUserData] = useState(null);
  const [form, setForm] = useState({});
  const [editableFields, setEditableFields] = useState({});
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

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
        setForm({
          name: data.name || '',
          lastname: data.lastname || '',
          dateOfBirth: data.dateOfBirth || '',
          email: data.email || '',
          phone1: data.phone1 || '',
          phone2: data.phone2 || '',
          street: data.address?.street || '',
          number: data.address?.number || '',
          postalCode: data.address?.postalCode || '',
          city: data.address?.city || '',
          address2: data.address?.address2 || '',
        });
      })
      .catch(() => {
        alert('Error loading user data.');
        router.push('/');
      });
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const toggleEditable = (field) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const savePersonalInfo = async () => {
    setMessage('');
    setError('');
    const res = await fetch('/api/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: userData.username,
        updates: {
          name: form.name,
          lastname: form.lastname,
          dateOfBirth: form.dateOfBirth,
          email: form.email,
          phone1: form.phone1,
          phone2: form.phone2,
          address: {
            street: form.street,
            number: form.number,
            postalCode: form.postalCode,
            city: form.city,
            address2: form.address2,
          },
        },
      }),
    });

    if (res.ok) {
      setMessage('Personal information updated successfully.');
      setShowModal(true);
    } else {
      setError('Failed to update personal information.');
    }
  };

  const savePassword = async () => {
    setMessage('');
    setError('');

    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    const res = await fetch('/api/users/password', {
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

      {/* personal info section */}
      <section className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Update Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(form).map(([key, value]) => (
            <div key={key} className="flex flex-col space-y-1 relative">
              <label className="text-sm font-semibold capitalize">{key}</label>
              <input
                name={key}
                value={value}
                onChange={handleChange}
                disabled={!editableFields[key]}
                className={`border rounded p-2 ${
                  editableFields[key]
                    ? ''
                    : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                }`}
              />
              <img
                src="/edit.svg"
                alt="Edit"
                className="absolute right-2 top-8 w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
                onClick={() => toggleEditable(key)}
              />
            </div>
          ))}
        </div>
        <button
          onClick={savePersonalInfo}
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Save
        </button>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* pop-up*/}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 flex flex-col space-y-4">
            <h2 className="text-gray-800 text-xl font-bold">Success</h2>
            <p>{message}</p>
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
