import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}
