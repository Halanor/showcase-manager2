'use client';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className="fixed left-0 top-0 h-screen w-40 flex flex-col space-y-4 bg-gray-200 text-gray-800 py-8">
      <button
        onClick={() => router.push('/admin')}
        className={`flex flex-row items-center space-x-3 p-3 rounded
          ${isActive('/admin') ? 'bg-gray-500 text-white' : 'hover:text-yellow-600'}`}
      >
        <img src="/dashboard.svg" alt="Dashboard" className="w-5 h-5" />
        <span className="text-sm">Dashboard</span>
      </button>

      <button
        onClick={() => router.push('/statistics')}
        className={`flex flex-row items-center space-x-3 p-3 rounded
          ${isActive('/statistics') ? 'bg-gray-500 text-white' : 'hover:text-yellow-600'}`}
      >
        <img src="/statistics.svg" alt="Statistics" className="w-5 h-5" />
        <span className="text-sm">Statistics</span>
      </button>

      <button
        onClick={() => router.push('/settings')}
        className={`flex flex-row items-center space-x-3 p-3 rounded
          ${isActive('/settings') ? 'bg-gray-500 text-white' : 'hover:text-yellow-600'}`}
      >
        <img src="/settings.svg" alt="Settings" className="w-5 h-5" />
        <span className="text-sm">Settings</span>
      </button>
    </nav>
  );
}
