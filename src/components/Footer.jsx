import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          {/* Brand col */}
          <div>
            <div className="footer__brand">Zadok <span>Auto</span></div>
            <p className="footer__tagline">
              Premium pre-owned performance &amp; luxury vehicles. Every car independently inspected, every history verified.
            </p>
          </div>

          {/* Nav col */}
          <div>
            <p className="footer__heading">Navigate</p>
            <ul className="footer__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/inventory">Inventory</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/contact">Book a viewing</Link></li>
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <p className="footer__heading">Find us</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="address-row">
                <MapPin size={14} className="address-row__icon" />
                <span>14 Montrose Avenue, Bryanston, Johannesburg, 2021</span>
              </div>
              <div className="address-row">
                <Phone size={14} className="address-row__icon" />
                <span>+27 11 463 0000</span>
              </div>
              <div className="address-row">
                <Mail size={14} className="address-row__icon" />
                <span>hello@zadokauto.co.za</span>
              </div>
              <div className="address-row">
                <Clock size={14} className="address-row__icon" />
                <span>Mon–Sat 08:00–17:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} Zadok Auto. All rights reserved.</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(199,204,209,0.25)' }}>
            ZA / JHB / EST. 2018
          </span>
        </div>
      </div>
    </footer>
  );
}
