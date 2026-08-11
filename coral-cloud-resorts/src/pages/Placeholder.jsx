import { Link } from 'react-router-dom';
import styles from './Placeholder.module.css';

const pageData = {
  dining: {
    title: 'Dining & Bar',
    sub: 'Six culinary destinations where the freshest ocean catch meets masterful craft.',
    bg: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85',
  },
  spa: {
    title: 'Spa & Wellness',
    sub: 'An overwater sanctuary dedicated to the restoration of mind, body, and spirit.',
    bg: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=85',
  },
  experiences: {
    title: 'Experiences',
    sub: 'From sunrise reef dives to private island picnics — every moment crafted for wonder.',
    bg: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1600&q=85',
  },
  contact: {
    title: 'Contact & Reservations',
    sub: 'Our concierge team is available around the clock to craft your perfect escape.',
    bg: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1600&q=85',
  },
};

export default function Placeholder({ page }) {
  const data = pageData[page] || pageData.contact;
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <img src={data.bg} alt={data.title} className={styles.bg} />
        <div className={styles.overlay} />
        <div className={`container ${styles.content}`}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.sub}>{data.sub}</p>
        </div>
      </section>
      <section className={styles.body}>
        <div className="container">
          <div className={styles.comingSoon}>
            <div className={styles.wave}>🌊</div>
            <h2>This page is being crafted</h2>
            <p>Like everything at Coral Cloud, this experience is being perfected. Please check back soon, or contact our team directly.</p>
            <div className={styles.actions}>
              <a href="mailto:reservations@coralcloud.com" className={styles.btn}>Email Concierge</a>
              <Link to="/" className={styles.btnOutline}>Return Home</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
