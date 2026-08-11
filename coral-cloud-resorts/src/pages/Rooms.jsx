import { useState, useMemo } from 'react';
import { rooms, categories } from '../data/rooms';
import RoomCard from '../components/RoomCard';
import styles from './Rooms.module.css';

const sortOptions = [
  { value: 'rate-asc', label: 'Price: Low to High' },
  { value: 'rate-desc', label: 'Price: High to Low' },
  { value: 'area-desc', label: 'Largest First' },
  { value: 'name-asc', label: 'Name A–Z' },
];

export default function Rooms() {
  const [activeTag, setActiveTag] = useState('All');
  const [sort, setSort] = useState('rate-asc');
  const [search, setSearch] = useState('');
  const [occupancy, setOccupancy] = useState(0);

  const filtered = useMemo(() => {
    let list = [...rooms];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.tagline.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (activeTag !== 'All') {
      list = list.filter(r => r.tags.includes(activeTag));
    }

    if (occupancy > 0) {
      list = list.filter(r => r.maxOccupancy >= occupancy);
    }

    list.sort((a, b) => {
      if (sort === 'rate-asc') return a.rate - b.rate;
      if (sort === 'rate-desc') return b.rate - a.rate;
      if (sort === 'area-desc') return b.area - a.area;
      if (sort === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });

    return list;
  }, [activeTag, sort, search, occupancy]);

  return (
    <main className={styles.main}>
      {/* ── PAGE HERO ── */}
      <section className={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=85"
          alt="Aerial view of overwater villas"
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.eyebrow}>Our Collection</span>
          <h1 className={styles.heroTitle}>Accommodations</h1>
          <p className={styles.heroSub}>
            Fifteen singular villas and suites — each one a universe unto itself.
          </p>
        </div>
      </section>

      {/* ── FILTERS ── */}
      <div className={styles.filtersBar}>
        <div className="container">
          <div className={styles.filtersInner}>
            {/* Search */}
            <div className={styles.searchWrap}>
              <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="search"
                placeholder="Search villas…"
                className={styles.searchInput}
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search accommodations"
              />
            </div>

            {/* Occupancy */}
            <select
              className={styles.select}
              value={occupancy}
              onChange={e => setOccupancy(Number(e.target.value))}
              aria-label="Minimum guests"
            >
              <option value={0}>Any occupancy</option>
              <option value={2}>2+ guests</option>
              <option value={4}>4+ guests</option>
              <option value={6}>6+ guests</option>
              <option value={8}>8+ guests</option>
            </select>

            {/* Sort */}
            <select
              className={styles.select}
              value={sort}
              onChange={e => setSort(e.target.value)}
              aria-label="Sort by"
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Tag pills */}
          <div className={styles.tagRow}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTag(cat)}
                className={`${styles.tagBtn} ${activeTag === cat ? styles.tagActive : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── RESULTS ── */}
      <section className={styles.results}>
        <div className="container">
          <p className={styles.resultCount}>
            Showing <strong>{filtered.length}</strong> of {rooms.length} accommodations
          </p>

          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <p>No accommodations match your filters.</p>
              <button
                className={styles.resetBtn}
                onClick={() => { setActiveTag('All'); setSearch(''); setOccupancy(0); }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map((room, i) => (
                <RoomCard key={room.id} room={room} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── NEED HELP ── */}
      <section className={styles.help}>
        <div className="container">
          <div className={styles.helpInner}>
            <div>
              <h2 className={styles.helpTitle}>Not sure which villa is right for you?</h2>
              <p className={styles.helpText}>Our reservations team is available around the clock to help you choose the perfect accommodation for your occasion.</p>
            </div>
            <div className={styles.helpActions}>
              <a href="tel:+18005550100" className={styles.helpPhone}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 7.2 7.2l.99-.99a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +1 800 555 0100
              </a>
              <a href="mailto:reservations@coralcloud.com" className={styles.helpEmail}>
                Email Concierge
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
