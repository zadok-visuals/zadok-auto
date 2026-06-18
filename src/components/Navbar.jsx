import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar({ heroHeight = 80 }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Transparent only on Home page
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > heroHeight - 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome, heroHeight]);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  return (
    <>
      <nav className={`navbar ${isHome && !scrolled ? 'transparent' : 'solid'}`} role="navigation" aria-label="Main navigation">
        <div className="container navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo" aria-label="Zadok Auto — Home">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="20" height="20" stroke="#FF8A3D" strokeWidth="1.5"/>
              <path d="M5 14 L8 9 L11 13 L14 8 L17 14" stroke="#FF8A3D" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
            </svg>
            Zadok <span>Auto</span>
          </Link>

          {/* Desktop links */}
          <ul className="navbar__links" role="list">
            {NAV_LINKS.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link to="/contact" className="btn-booking desktop">Book a viewing</Link>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-nav${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        {NAV_LINKS.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
        <Link to="/contact" className="btn-primary" onClick={() => setMenuOpen(false)}>
          Book a viewing
        </Link>
      </div>
    </>
  );
}
