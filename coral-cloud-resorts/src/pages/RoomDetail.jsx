import { useParams, Link, useNavigate } from 'react-router-dom';
import { rooms } from '../data/rooms';
import RoomCard from '../components/RoomCard';
import styles from './RoomDetail.module.css';

export default function RoomDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const room = rooms.find(r => r.slug === slug);

  if (!room) {
    return (
      <main className={styles.notFound}>
        <h1>Accommodation not found</h1>
        <Link to="/rooms">← Back to all accommodations</Link>
      </main>
    );
  }

  const related = rooms.filter(r => r.id !== room.id && r.tags.some(t => room.tags.includes(t))).slice(0, 3);

  return (
    <main className={styles.main}>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <img src={room.image} alt={room.name} className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <button onClick={() => navigate(-1)} className={styles.backBtn} aria-label="Go back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            All Accommodations
          </button>
          <span className={styles.category}>{room.category}</span>
          <h1 className={styles.title}>{room.name}</h1>
          <p className={styles.tagline}>{room.tagline}</p>
        </div>
      </section>

      {/* ── QUICK FACTS ── */}
      <div className={styles.quickFacts}>
        <div className="container">
          <div className={styles.factsGrid}>
            {[
              { icon: '🛏', label: 'Bedding', value: room.beds },
              { icon: '👥', label: 'Max Guests', value: `${room.maxOccupancy} (${room.occupancyNote})` },
              { icon: '📐', label: 'Total Area', value: `${room.areaSqFt.toLocaleString()} sq ft` },
              { icon: '🌅', label: 'View', value: room.viewType },
            ].map(f => (
              <div key={f.label} className={styles.factItem}>
                <span className={styles.factIcon}>{f.icon}</span>
                <span className={styles.factLabel}>{f.label}</span>
                <span className={styles.factValue}>{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <section className={styles.body}>
        <div className="container">
          <div className={styles.bodyGrid}>
            {/* Left: content */}
            <div className={styles.content}>
              <span className={styles.eyebrow}>About This Villa</span>
              <h2 className={styles.sectionTitle}>An experience unlike any other</h2>
              <p className={styles.description}>{room.description}</p>

              <div className={styles.amenities}>
                <h3 className={styles.amenitiesTitle}>Included Amenities</h3>
                <ul className={styles.amenitiesList}>
                  {room.amenities.map(a => (
                    <li key={a} className={styles.amenityItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.serviceInfo}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                <p>{room.serviceHours}</p>
              </div>

              <div className={styles.tags}>
                {room.tags.map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>

            {/* Right: booking panel */}
            <aside className={styles.bookingPanel}>
              <div className={styles.panelInner}>
                <div className={styles.priceRow}>
                  <span className={styles.priceFrom}>from</span>
                  <span className={styles.price}>${room.rate.toLocaleString()}</span>
                  <span className={styles.priceNight}>per night</span>
                </div>
                <p className={styles.priceNote}>Exclusive of local taxes and service charges</p>

                <div className={styles.panelDivider} />

                <div className={styles.panelInfo}>
                  <div className={styles.panelInfoRow}>
                    <span>Check-in</span>
                    <span>3:00 PM</span>
                  </div>
                  <div className={styles.panelInfoRow}>
                    <span>Check-out</span>
                    <span>12:00 PM</span>
                  </div>
                  <div className={styles.panelInfoRow}>
                    <span>Room ID</span>
                    <span className={styles.roomId}>{room.id}</span>
                  </div>
                </div>

                <div className={styles.panelDivider} />

                <a href="mailto:reservations@coralcloud.com" className={styles.reserveBtn}>
                  Reserve This Villa
                </a>
                <a href="tel:+18005550100" className={styles.callBtn}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 7.2 7.2l.99-.99a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  Speak with Concierge
                </a>

                <p className={styles.panelNote}>
                  Complimentary cancellation up to 30 days before arrival. Minimum 2-night stay.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className={styles.related}>
          <div className="container">
            <h2 className={styles.relatedTitle}>You may also like</h2>
            <div className={styles.relatedGrid}>
              {related.map((r, i) => (
                <RoomCard key={r.id} room={r} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
