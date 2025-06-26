'use client';
import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';
import './globals.css';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isLandingPage = pathname === '/';

  return (
    <html lang="en">
      <body className="bg-gray-100 pr-400">
        {!isLandingPage && <Navbar />}
        {children}
      </body>
    </html>
  );
}

