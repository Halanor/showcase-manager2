'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isActive = (path) => pathname.startsWith(path);

  return (
    <>
      <nav className="fixed left-0 top-0 h-screen w-40 flex flex-col space-y-4 bg-gray-200 text-gray-800 py-8">
        <button
          onClick={() => router.push('/admin')}
          className={`flex flex-row items-center space-x-3 p-3 rounded hover:text-yellow-600 ${isActive('/admin') ? 'bg-gray-500' : ''}`}
        >
          <img src="/dashboard.svg" alt="Dashboard" className="w-5 h-5" />
          <span className="text-sm">Dashboard</span>
        </button>

        <button
          onClick={() => router.push('/statistics')}
          className={`flex flex-row items-center space-x-3 p-3 rounded hover:text-yellow-600 ${isActive('/statistics') ? 'bg-gray-500' : ''}`}
        >
          <img src="/statistics.svg" alt="Statistics" className="w-5 h-5" />
          <span className="text-sm">Statistics</span>
        </button>

        <button
          onClick={() => router.push('/settings')}
          className={`flex flex-row items-center space-x-3 p-3 rounded hover:text-yellow-600 ${isActive('/settings') ? 'bg-gray-500' : ''}`}
        >
          <img src="/settings.svg" alt="Settings" className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </button>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex flex-row items-center space-x-3 p-3 rounded hover:text-yellow-600"
        >
          <img src="/log-out.svg" alt="Logout" className="w-5 h-5" />
          <span className="text-sm">Logout</span>
        </button>
      </nav>

      {showLogoutModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div className="bg-white rounded-lg p-6 w-80 flex flex-col space-y-4">
      <h2 className="text-gray-800 text-xl font-bold">Are you sure you want to log out?</h2>
      <div className="flex justify-end space-x-3">
        <button
          className="bg-gray-300 text-gray-800 font-bold rounded-full px-4 py-2 hover:brightness-125"
          onClick={() => setShowLogoutModal(false)}
        >
          No
        </button>
        <button
          className="bg-red-500 text-white font-bold rounded-full px-4 py-2 hover:brightness-125"
          onClick={() => {
            setShowLogoutModal(false);
            router.push('/');
          }}
        >
          Yes
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}
