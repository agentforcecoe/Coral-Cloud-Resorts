import { Link } from 'react-router-dom';
import styles from './RoomCard.module.css';

export default function RoomCard({ room, index = 0 }) {
  return (
    <Link
      to={`/rooms/${room.slug}`}
      className={styles.card}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className={styles.imageWrap}>
        <img
          src={room.image}
          alt={room.name}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.overlay} />
        <div className={styles.topRow}>
          <span className={styles.category}>{room.category}</span>
          {room.featured && <span className={styles.featured}>Featured</span>}
        </div>
        <div className={styles.rate}>
          <span className={styles.rateFrom}>from</span>
          <span className={styles.rateNum}>${room.rate.toLocaleString()}</span>
          <span className={styles.rateNight}>/night</span>
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{room.name}</h3>
        <p className={styles.tagline}>{room.tagline}</p>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
            {room.beds}
          </span>
          <span className={styles.metaItem}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Up to {room.maxOccupancy} guests
          </span>
          <span className={styles.metaItem}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
            </svg>
            {room.areaSqFt.toLocaleString()} sq ft
          </span>
        </div>

        <div className={styles.tags}>
          {room.tags.slice(0, 3).map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        <div className={styles.cta}>
          <span className={styles.ctaText}>View Details</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}
