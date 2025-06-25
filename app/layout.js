import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Showcase Manager',
  description: 'Manage showcases for museums',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
  <head></head>
  <body className="min-h-screen flex">
    <Navbar />
    <main className="ml-40 flex-1 p-4">
      {children}
    </main>
  </body>
</html>

  );
}

