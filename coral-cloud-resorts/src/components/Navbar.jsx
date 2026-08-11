import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const logoUrl = 'https://ik.imagekit.io/r0ogw01pg/Coral%20Cloud%20Room%20Images/Coral_Cloud_Resort_Logo.webp?updatedAt=1786371486000';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';

  return (
    <header className={`${styles.nav} ${scrolled || !isHome ? styles.solid : ''} ${menuOpen ? styles.menuActive : ''}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <img
            src="/coral-cloud-resorts/logo.webp"
            alt="Coral Cloud Resorts"
            onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}
          />
          <span className={styles.logoFallback} style={{ display: 'none' }}>Coral Cloud Resorts</span>
        </Link>

        <nav className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/rooms" className={styles.link}>Accommodations</Link>
          <Link to="/dining" className={styles.link}>Dining</Link>
          <Link to="/experiences" className={styles.link}>Experiences</Link>
          <Link to="/spa" className={styles.link}>Spa</Link>
          <Link to="/contact" className={styles.link}>Contact</Link>
        </nav>

        <div className={styles.actions}>
          <a href="tel:+18005550100" className={styles.phone}>+1 800 555 0100</a>
          <Link to="/rooms" className={styles.bookBtn}>Reserve Now</Link>
        </div>

        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen(m => !m)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
