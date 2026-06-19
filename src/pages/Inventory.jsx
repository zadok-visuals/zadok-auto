import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard';
import FadeInSection from '../components/FadeInSection';

const MAKES = ['All makes', ...Array.from(new Set(cars.map(c => c.make))).sort()];
const PRICE_RANGES = [
  { label: 'Any price', min: 0, max: Infinity },
  { label: 'Under R800k', min: 0, max: 800000 },
  { label: 'R800k – R1.2M', min: 800000, max: 1200000 },
  { label: 'R1.2M – R1.6M', min: 1200000, max: 1600000 },
  { label: 'Over R1.6M', min: 1600000, max: Infinity },
];
const YEAR_RANGES = [
  { label: 'Any year', min: 0, max: Infinity },
  { label: '2023+', min: 2023, max: Infinity },
  { label: '2021–2022', min: 2021, max: 2022 },
  { label: '2019–2020', min: 2019, max: 2020 },
  { label: 'Before 2019', min: 0, max: 2018 },
];

const DEFAULT_FILTERS = {
  search: '',
  make: 'All makes',
  priceIdx: 0,
  yearIdx: 0,
};

export default function Inventory() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const filtered = useMemo(() => {
    const pr = PRICE_RANGES[filters.priceIdx];
    const yr = YEAR_RANGES[filters.yearIdx];
    const q = filters.search.toLowerCase().trim();

    return cars.filter(car => {
      const matchMake = filters.make === 'All makes' || car.make === filters.make;
      const matchPrice = car.price >= pr.min && car.price <= pr.max;
      const matchYear = car.year >= yr.min && car.year <= yr.max;
      const matchSearch = !q || car.name.toLowerCase().includes(q) || car.make.toLowerCase().includes(q);
      return matchMake && matchPrice && matchYear && matchSearch;
    });
  }, [filters]);

  const isDirty =
    filters.search !== '' ||
    filters.make !== 'All makes' ||
    filters.priceIdx !== 0 ||
    filters.yearIdx !== 0;

  return (
    <>
      {/* Page header */}
      <div className="page-header" style={{ background: 'var(--graphite)' }}>
        <div className="container">
          <p className="section-label">Browse</p>
          <h1 className="page-header__title">The lot</h1>
          <p className="page-header__sub">
            {cars.length} vehicles. Every one inspected, every history verified.
          </p>
        </div>
      </div>

      <section style={{ background: 'var(--graphite)', minHeight: '60vh', padding: '0 0 6rem' }}>
        <div className="container">
          {/* Filter bar */}
          <div className="filter-bar">
            {/* Search */}
            <div style={{ position: 'relative', flex: 1, minWidth: 200, maxWidth: 320 }}>
              <Search
                size={14}
                style={{
                  position: 'absolute', left: '0.9rem', top: '50%',
                  transform: 'translateY(-50%)', color: 'var(--silver)', pointerEvents: 'none',
                }}
              />
              <input
                className="input"
                type="search"
                placeholder="Search make or model…"
                value={filters.search}
                onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
                style={{ paddingLeft: '2.3rem' }}
                aria-label="Search cars"
              />
            </div>

            {/* Make */}
            <select
              className="input"
              value={filters.make}
              onChange={e => setFilters(f => ({ ...f, make: e.target.value }))}
              style={{ flex: 1, minWidth: 160, maxWidth: 200 }}
              aria-label="Filter by make"
            >
              {MAKES.map(m => <option key={m}>{m}</option>)}
            </select>

            {/* Price */}
            <select
              className="input"
              value={filters.priceIdx}
              onChange={e => setFilters(f => ({ ...f, priceIdx: Number(e.target.value) }))}
              style={{ flex: 1, minWidth: 160, maxWidth: 200 }}
              aria-label="Filter by price range"
            >
              {PRICE_RANGES.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
            </select>

            {/* Year */}
            <select
              className="input"
              value={filters.yearIdx}
              onChange={e => setFilters(f => ({ ...f, yearIdx: Number(e.target.value) }))}
              style={{ flex: 1, minWidth: 160, maxWidth: 200 }}
              aria-label="Filter by year range"
            >
              {YEAR_RANGES.map((y, i) => <option key={i} value={i}>{y.label}</option>)}
            </select>

            {/* Reset */}
            {isDirty && (
              <button
                className="btn-outline"
                onClick={() => setFilters(DEFAULT_FILTERS)}
                style={{ padding: '0.75rem 1rem', gap: '0.4rem', fontSize: '0.75rem' }}
                aria-label="Clear all filters"
              >
                <X size={13} /> Clear
              </button>
            )}
          </div>

          {/* Results count */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            color: 'var(--silver)',
            marginBottom: '1.5rem',
          }}>
            {filtered.length} {filtered.length === 1 ? 'vehicle' : 'vehicles'} found
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="inventory-grid">
              {filtered.map((car, i) => (
                <FadeInSection key={car.id} delay={i * 60}>
                  <CarCard car={car} style={{ height: '100%' }} />
                </FadeInSection>
              ))}
            </div>
          ) : (
            /* Empty state */
            <div style={{
              textAlign: 'center',
              padding: '6rem 0',
              borderTop: '1px solid #E5E3DC',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '2rem',
                color: '#E5E3DC',
                marginBottom: '1.5rem',
                letterSpacing: '0.1em',
              }}>
                0 / {cars.length}
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 800,
                
                letterSpacing: '0.04em',
                color: 'var(--ivory)',
                marginBottom: '0.5rem',
              }}>
                Nothing in range.
              </h2>
              <p style={{ color: 'var(--silver)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                No cars match those filters. Try widening your range.
              </p>
              <button className="btn-primary" onClick={() => setFilters(DEFAULT_FILTERS)}>
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
