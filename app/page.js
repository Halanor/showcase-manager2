'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function LandingPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // placeholder for authentication logic to fix later
    console.log({ username, password });
    // successful login redirect to admin for now, will change later depending on account logged
    router.push('/admin');
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-4">
      <h1 className="text-5xl font-bold text-gray-600">Welcome to Showcase Manager</h1>
      <h2 className="text-2xl mt-3 text-gray-500">Your showcases, under control</h2>
      <div className="mt-8 bg-white rounded-xl p-6 w-80 shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-700 text-center">Login</h3>
        <form onSubmit={handleLogin} className="flex flex-col mt-4 space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded border border-gray-300 focus:outline-none focus:border-gray-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded border border-gray-300 focus:outline-none focus:border-gray-500"
            required
          />
          <button
            type="submit"
            className="bg-gray-600 text-white rounded p-3 mt-2 hover:bg-gray-700"
          >
            Log In
          </button>
        </form>
        <div className="text-center mt-3">
          <Link href="/register" className="text-gray-500 text-sm hover:underline">
						Create an account
					</Link>
        </div>
      </div>
    </div>
  );
}
