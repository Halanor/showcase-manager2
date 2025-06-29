'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (err) {
          console.error('Error parsing user from localStorage:', err);
        }
      }
    }
  }, []);

  const isActive = (path) => pathname.startsWith(path);

  return (
    <>
      <nav className="fixed left-0 top-0 h-screen w-40 flex flex-col bg-gray-200 text-gray-800 py-8">
        {user && (
          <div className="px-3 pb-3 text-center">
            <div className="text-base font-bold">{user.username}</div>
          </div>
        )}
        <div className="border-b border-gray-500 mx-3 mb-3" />

        {/* buttons section */}
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => router.push('/dashboard')}
            className={`flex flex-row items-center space-x-3 p-3 rounded hover:text-yellow-600 ${isActive('/dashboard') ? 'bg-gray-500' : ''}`}
          >
            <img src="/dashboard.svg" alt="Dashboard" className="w-5 h-5" />
            <span className="text-sm">Dashboard</span>
          </button>

          <button
            onClick={() => router.push('/lighting')}
            className={`flex flex-row items-center space-x-3 p-3 rounded hover:text-yellow-600 ${isActive('/lighting') ? 'bg-gray-500' : ''}`}
          >
            <img src="/bulb.svg" alt="Lighting" className="w-5 h-5" />
            <span className="text-sm">Lighting</span>
          </button>

          <button
            onClick={() => router.push('/statistics')}
            className={`flex flex-row items-center space-x-3 p-3 rounded hover:text-yellow-600 ${isActive('/statistics') ? 'bg-gray-500' : ''}`}
          >
            <img src="/statistics.svg" alt="Statistics" className="w-5 h-5" />
            <span className="text-sm">Statistics</span>
          </button>

          {user?.role === 'admin' && (
            <button
              onClick={() => router.push('/admin/authorization')}
              className={`flex flex-row items-center space-x-3 p-3 rounded hover:text-yellow-600  ${isActive('/admin/authorization') ? 'bg-gray-500' : ''}`}
            >
              <img src="/authorization.svg" alt="Authorization" className="w-5 h-5" />
              <span className="text-sm">Authorization</span>
            </button>
          )}

          {/* <button
            onClick={() => router.push('/settings')}
            className={`flex flex-row items-center space-x-3 p-3 rounded hover:text-yellow-600 ${isActive('/settings') ? 'bg-gray-500' : ''}`}
          >
            <img src="/settings.svg" alt="Settings" className="w-5 h-5" />
            <span className="text-sm">Settings</span>
          </button> */}

          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex flex-row items-center space-x-3 p-3 rounded hover:text-yellow-600"
          >
            <img src="/log-out.svg" alt="Logout" className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
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
                  localStorage.removeItem('user');
                  setUser(null);
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
