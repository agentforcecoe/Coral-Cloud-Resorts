import { Link } from 'react-router-dom';
import { rooms } from '../data/rooms';
import RoomCard from '../components/RoomCard';
import styles from './Home.module.css';

const featured = rooms.filter(r => r.featured).slice(0, 3);

const highlights = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Unhurried Arrivals',
    text: 'Private seaplane and boat transfers from your gateway airport, tailored to your schedule.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Deeply Personal Service',
    text: 'Every preference noted before you arrive. Every wish anticipated before you ask.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
    title: 'Private Marine Sanctuary',
    text: 'Snorkel through living coral gardens steps from your villa. Our reef is protected and pristine.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Exclusive Island Setting',
    text: 'Forty-two villas on a privately held island — never crowded, always immaculate.',
  },
];

const experiences = [
  { label: 'Sunset Reef Dive', image: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=80', category: 'Marine' },
  { label: 'Private Chef Dining', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', category: 'Culinary' },
  { label: 'Overwater Spa Ritual', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80', category: 'Wellness' },
  { label: 'Sunrise Kayaking', image: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?w=600&q=80', category: 'Adventure' },
];

export default function Home() {
  return (
    <main className={styles.main}>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <img
            src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1800&q=85"
            alt="Aerial view of Coral Cloud Resorts overwater villas"
            className={styles.heroBg}
          />
          <div className={styles.heroGradient} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <p className={styles.heroEyebrow}>A Private Island Sanctuary</p>
          <h1 className={styles.heroHeadline}>
            Where the Ocean<br />
            <em>Becomes Your Living Room</em>
          </h1>
          <p className={styles.heroSub}>
            Forty-two ultra-luxury villas hovering above the world's most pristine lagoon.
            <br />Overwater. Beachfront. Entirely yours.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/rooms" className={styles.heroPrimary}>Explore Accommodations</Link>
            <a href="#story" className={styles.heroSecondary}>Our Story</a>
          </div>
        </div>

        <div className={styles.heroScroll}>
          <span className={styles.scrollLine} />
          <span className={styles.scrollLabel}>Scroll</span>
        </div>

        <div className={styles.heroStats}>
          {[
            { num: '42', label: 'Private Villas' },
            { num: '5★', label: 'Forbes Rated' },
            { num: '100%', label: 'Reef Protected' },
            { num: '24/7', label: 'Butler Service' },
          ].map(s => (
            <div key={s.label} className={styles.heroStat}>
              <span className={styles.heroStatNum}>{s.num}</span>
              <span className={styles.heroStatLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className={styles.intro} id="story">
        <div className="container">
          <div className={styles.introInner}>
            <div className={styles.introText}>
              <span className={styles.eyebrow}>The Coral Cloud Experience</span>
              <h2 className={styles.sectionHeading}>
                An island that exists<br />for one reason alone
              </h2>
              <p className={styles.introPara}>
                Perched in the heart of the South Pacific, Coral Cloud Resorts was born from a single conviction: that true luxury is not a collection of amenities, but the profound sensation of being entirely and completely free.
              </p>
              <p className={styles.introPara}>
                Here, your villa floats above a marine sanctuary. Your breakfast table is set at the water's edge. Your only obligation is to the horizon.
              </p>
              <Link to="/rooms" className={styles.textLink}>
                Discover Our Villas →
              </Link>
            </div>
            <div className={styles.introImages}>
              <img
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&q=80"
                alt="Overwater villa pool at sunrise"
                className={styles.introImg1}
              />
              <img
                src="https://images.unsplash.com/photo-1540202404-a2f29016b523?w=400&q=80"
                alt="Lagoon view from villa deck"
                className={styles.introImg2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED ROOMS ── */}
      <section className={styles.featuredRooms}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Signature Accommodations</span>
            <h2 className={styles.sectionHeading}>Curated for the discerning traveller</h2>
            <p className={styles.sectionSub}>Each villa is a private world — architecturally distinct, immaculately appointed, and positioned for maximum immersion in our living lagoon.</p>
          </div>
          <div className={styles.roomGrid}>
            {featured.map((room, i) => (
              <RoomCard key={room.id} room={room} index={i} />
            ))}
          </div>
          <div className={styles.sectionFooter}>
            <Link to="/rooms" className={styles.viewAll}>
              View All {rooms.length} Accommodations
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className={styles.highlights}>
        <div className={styles.highlightsBg} />
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrowLight}>What Sets Us Apart</span>
            <h2 className={`${styles.sectionHeading} ${styles.light}`}>
              Every detail considered.<br />Every moment elevated.
            </h2>
          </div>
          <div className={styles.highlightGrid}>
            {highlights.map(h => (
              <div key={h.title} className={styles.highlightCard}>
                <div className={styles.highlightIcon}>{h.icon}</div>
                <h3 className={styles.highlightTitle}>{h.title}</h3>
                <p className={styles.highlightText}>{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCES ── */}
      <section className={styles.exp}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>On the Island</span>
            <h2 className={styles.sectionHeading}>Moments worth crossing oceans for</h2>
          </div>
          <div className={styles.expGrid}>
            {experiences.map((e, i) => (
              <div key={e.label} className={`${styles.expCard} ${i === 0 ? styles.expCardLarge : ''}`}>
                <img src={e.image} alt={e.label} className={styles.expImg} loading="lazy" />
                <div className={styles.expOverlay} />
                <div className={styles.expContent}>
                  <span className={styles.expCategory}>{e.category}</span>
                  <h3 className={styles.expLabel}>{e.label}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.sectionFooter}>
            <Link to="/experiences" className={styles.viewAll}>
              Explore All Experiences
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className={styles.ctaBanner}>
        <img
          src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1600&q=80"
          alt="Overwater villa at twilight"
          className={styles.ctaBannerBg}
        />
        <div className={styles.ctaBannerOverlay} />
        <div className={`container ${styles.ctaBannerContent}`}>
          <p className={styles.eyebrowLight}>Begin Your Journey</p>
          <h2 className={styles.ctaBannerHeading}>
            Your private island<br />awaits discovery
          </h2>
          <p className={styles.ctaBannerSub}>
            Contact our reservations team — available around the clock — to craft your perfect escape.
          </p>
          <div className={styles.ctaBannerActions}>
            <Link to="/rooms" className={styles.heroPrimary}>Reserve Your Villa</Link>
            <a href="mailto:reservations@coralcloud.com" className={styles.heroSecondary}>
              Email Reservations
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
