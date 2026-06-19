import { Routes, Route } from 'react-router-dom';
import { useState, useCallback } from 'react';
import Layout from './components/Layout';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import CarDetail from './pages/CarDetail';
import About from './pages/About';
import Contact from './pages/Contact';

// Only show preloader on first visit in this session
const hasVisited = sessionStorage.getItem('zadok_visited');

export default function App() {
  const [loading, setLoading] = useState(!hasVisited);

  const handlePreloaderDone = useCallback(() => {
    sessionStorage.setItem('zadok_visited', '1');
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Preloader onDone={handlePreloaderDone} />}
      <div style={{ visibility: loading ? 'hidden' : 'visible', opacity: loading ? 0 : 1, transition: 'opacity 0.4s ease-out' }}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/:id" element={<CarDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* 404 fallback */}
            <Route path="*" element={
              <div style={{
                minHeight: '100vh',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '1.5rem', paddingTop: '5rem',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '4rem', color: '#E5E3DC', fontWeight: 600 }}>404</span>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 900,  letterSpacing: '0.08em', color: 'var(--ivory)' }}>
                  Page not found
                </h1>
                <a href="/" className="btn-primary">Go home</a>
              </div>
            } />
          </Routes>
        </Layout>
      </div>
    </>
  );
}
