'use client';
import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';

export function AppWrapper({ children }) {
  const pathname = usePathname();
  const showNavbar = pathname !== '/';
  return (
    <div className="min-h-screen flex flex-row">
      {showNavbar && <Navbar />}
      <div className={`flex-1 ${showNavbar ? 'ml-40' : ''}`} style={{ paddingLeft: showNavbar ? '160px' : '0' }}>
        {children}
      </div>
    </div>
  );
}
