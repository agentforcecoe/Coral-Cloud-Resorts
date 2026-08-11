import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wave}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#081C24"/>
        </svg>
      </div>

      <div className={styles.body}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.brand}>
              <div className={styles.logoText}>Coral Cloud Resorts</div>
              <p className={styles.tagline}>
                Where the ocean becomes your living room. An island sanctuary crafted for those who seek beauty beyond the ordinary.
              </p>
              <div className={styles.socials}>
                {['Instagram', 'Facebook', 'Pinterest', 'YouTube'].map(s => (
                  <a key={s} href="#" className={styles.socialLink} aria-label={s}>{s[0]}</a>
                ))}
              </div>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>Explore</h4>
              <Link to="/rooms" className={styles.colLink}>Accommodations</Link>
              <Link to="/dining" className={styles.colLink}>Dining & Bar</Link>
              <Link to="/spa" className={styles.colLink}>Spa & Wellness</Link>
              <Link to="/experiences" className={styles.colLink}>Experiences</Link>
              <a href="#" className={styles.colLink}>Gallery</a>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>Plan</h4>
              <a href="#" className={styles.colLink}>Reserve a Room</a>
              <a href="#" className={styles.colLink}>Special Packages</a>
              <a href="#" className={styles.colLink}>Weddings & Events</a>
              <a href="#" className={styles.colLink}>Private Charters</a>
              <a href="#" className={styles.colLink}>Transfers & Arrival</a>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>Contact</h4>
              <p className={styles.colText}>Coral Cloud Island<br />South Pacific Ocean</p>
              <a href="tel:+18005550100" className={styles.colLink}>+1 800 555 0100</a>
              <a href="mailto:reservations@coralcloud.com" className={styles.colLink}>reservations@coralcloud.com</a>
              <div className={styles.awards}>
                <span className={styles.award}>★ Forbes Five-Star</span>
                <span className={styles.award}>★ Condé Nast Traveller</span>
              </div>
            </div>
          </div>

          <div className={styles.bottom}>
            <p className={styles.copy}>© 2025 Coral Cloud Resorts. All rights reserved.</p>
            <div className={styles.legal}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
              <a href="#">Cookie Settings</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
