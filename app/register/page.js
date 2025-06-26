'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: '', 
    password: '', 
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setUser((prev) => ({ ...prev, address: { ...prev.address, [field]: value } }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (res.ok) {
      alert('Registration successful!');
      router.push('/');
    } else {
      alert('Error registering user!');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-700">Create an Account</h1>
      <form onSubmit={handleRegister} className="bg-white rounded p-6 mt-4 space-y-3 w-80 shadow">
        <input required name="username" placeholder="Username" value={user.username} onChange={handleChange} className="w-full p-2 rounded border" />
        <input required name="password" placeholder="Password" value={user.password} onChange={handleChange} className="w-full p-2 rounded border" />
        <input required name="dateOfBirth" placeholder="Date of Birth" value={user.dateOfBirth} onChange={handleChange} className="w-full p-2 rounded border" />
        <input required name="email" placeholder="Email" value={user.email} onChange={handleChange} className="w-full p-2 rounded border" />
        <input required name="address.street" placeholder="Street" value={user.address.street} onChange={handleChange} className="w-full p-2 rounded border" />
        <input required name="address.number" placeholder="Number" value={user.address.number} onChange={handleChange} className="w-full p-2 rounded border" />
        <input required name="address.postalCode" placeholder="Postal Code" value={user.address.postalCode} onChange={handleChange} className="w-full p-2 rounded border" />
        <input required name="address.city" placeholder="City" value={user.address.city} onChange={handleChange} className="w-full p-2 rounded border" />
        <input name="address.address2" placeholder="Additional Address" value={user.address.address2} onChange={handleChange} className="w-full p-2 rounded border" />
        <input required name="phone1" placeholder="Phone 1" value={user.phone1} onChange={handleChange} className="w-full p-2 rounded border" />
        <input name="phone2" placeholder="Phone 2" value={user.phone2} onChange={handleChange} className="w-full p-2 rounded border" />
        <button type="submit" className="bg-gray-600 text-white rounded p-3 mt-2 w-full hover:bg-gray-700">Register</button>
      </form>
    </div>
  );
}
