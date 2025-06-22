import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Showcase Manager',
  description: 'Manage showcases for museums',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>{/* You can add <link /> or <meta /> tags here if needed */}</head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

