'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: '', 
    lastName: '', 
    dateOfBirth: '', 
    email: '', 
    address: {
      street: '', 
      number: '', 
      postalCode: '', 
      city: '', 
      address2: '', 
    },
    phone1: '', 
    phone2: '', 
    username: '', 
    password: '', 
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setUser((prev) => ({ ...prev, address: { ...prev.address, [field]: value } }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const passwordStrength = (password) => {
    if (password.length < 6) return 'Weak';
    if (/[A-Za-z]/.test(password) && /\d/.test(password) && password.length >= 8) return 'Strong';
    return 'Medium';
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (user.password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      setError('Invalid email address!');
      return;
    }

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (res.ok) {
      setSuccessMessage('Registration successful! Redirecting...');
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } else {
      const errorData = await res.json();
      setError(errorData.error || 'Error registering user!');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-700">Create an Account</h1>

      {successMessage && (
        <div className="bg-green-100 text-green-800 rounded p-3 mt-4 w-[600px] text-center font-semibold">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 rounded p-3 mt-4 w-[600px] text-center font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="bg-white rounded p-6 mt-4 space-y-3 w-[600px] shadow">
        <div className="grid grid-cols-2 gap-3">
          <input required name="name" placeholder="First Name" value={user.name} onChange={handleChange} className="p-2 rounded border" />
          <input required name="lastName" placeholder="Last Name" value={user.lastName} onChange={handleChange} className="p-2 rounded border" />
          
          <input required name="dateOfBirth" placeholder="Date of Birth" value={user.dateOfBirth} onChange={handleChange} className="p-2 rounded border" />
          <input required name="email" placeholder="Email" value={user.email} onChange={handleChange} className="p-2 rounded border" />
          
          <input required name="address.street" placeholder="Street" value={user.address.street} onChange={handleChange} className="p-2 rounded border" />
          <input required name="address.number" placeholder="Number" value={user.address.number} onChange={handleChange} className="p-2 rounded border" />
          
          <input required name="address.postalCode" placeholder="Postal Code" value={user.address.postalCode} onChange={handleChange} className="p-2 rounded border" />
          <input required name="address.city" placeholder="City" value={user.address.city} onChange={handleChange} className="p-2 rounded border" />
          
          <input name="address.address2" placeholder="Additional Address" value={user.address.address2} onChange={handleChange} className="p-2 rounded border col-span-2" />
          
          <input required name="phone1" placeholder="Phone 1" value={user.phone1} onChange={handleChange} className="p-2 rounded border" />
          <input name="phone2" placeholder="Phone 2" value={user.phone2} onChange={handleChange} className="p-2 rounded border" />
        </div>

        <div className="border-t pt-3 mt-3">
          <h2 className="text-lg font-semibold text-gray-600 text-center">Account Details</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input required name="username" placeholder="Username" value={user.username} onChange={handleChange} className="p-2 rounded border" />
          
          <input required name="password" placeholder="Password" type="password" value={user.password} onChange={handleChange} className="p-2 rounded border" />
          
          <input required placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="p-2 rounded border col-start-2" />
        </div>
        <div className="text-sm text-gray-600 text-center mt-1">
          Password Strength: <span className={`font-bold ${passwordStrength(user.password) === 'Strong' ? 'text-green-600' : passwordStrength(user.password) === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>
            {passwordStrength(user.password)}
          </span>
        </div>

        <button type="submit" className="bg-gray-600 text-white rounded p-3 mt-4 w-full hover:bg-gray-700">Register</button>
      </form>
    </div>
  );
}
