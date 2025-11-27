// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // ← مهم جدًا
import Logo from '../image/kyn_logo_transparent.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart(); // ← جبنا عدد المنتجات في السلة

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/product' },
    { name: 'Contact us', path: '/contact' },
    { name: 'About us', path: '/about' },
  ];

  return (
    <>
      <style jsx>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .navbar {
          background-color: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          color: #fff;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 80px;
        }

        .logo-container {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .logo {
          height: 55px;
          width: auto;
          transition: transform 0.3s ease;
        }

        .logo:hover {
          transform: scale(1.1);
        }

        .nav-menu {
          display: none;
          gap: 2.5rem;
          align-items: center;
        }

        .nav-link {
          color: #d1d5db;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link:hover {
          color: #fff;
          background-color: rgba(255, 255, 255, 0.1);
        }

        .nav-link.active {
          color: #fff;
          font-weight: 700;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 3px;
          background: #fff;
          border-radius: 2px;
        }

        /* أيقونة السلة */
        .cart-icon {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .cart-badge {
          position: absolute;
          top: -10px;
          right: -10px;
          background: #fff;
          color: #000;
          font-size: 0.75rem;
          font-weight: bold;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .menu-button {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          padding: 0.5rem;
          font-size: 1.5rem;
        }

        .mobile-menu {
          background: rgba(0, 0, 0, 0.98);
          padding: 1.5rem 1rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .mobile-menu-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .mobile-cart {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 1rem;
          background: rgba(255,255,255,0.1);
          border-radius: 12px;
          color: #fff;
          text-decoration: none;
          font-weight: 600;
        }

        .page-spacer { height: 80px; }

        @media (min-width: 768px) {
          .logo-container { flex: none; justify-content: flex-start; }
          .navbar-content { justify-content: flex-start; gap: 4rem; }
          .nav-menu { display: flex; flex: 1; justify-content: center; }
          .menu-button { display: none; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            {/* Logo */}
            <div className="logo-container">
              <Link to="/">
                <img src={Logo} alt="KYN Logo" className="logo" />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="nav-menu">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* أيقونة السلة في الديسكتوب */}
              <Link to="/cart" className="cart-icon">
                Cart
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="menu-button">
              {isOpen ? '×' : '☰'}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="mobile-menu">
              <div className="mobile-menu-links">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* سلة في الموبايل */}
              <Link to="/cart" className="mobile-cart" onClick={() => setIsOpen(false)}>
                Cart ({cartCount})
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer عشان المحتوى ما يختفيش تحت الـ Navbar */}
      <div className="page-spacer"></div>
    </>
  );
}