import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getCarById, getRelatedCars, formatPrice, formatMileage } from '../data/cars';
import GaugePanel from '../components/GaugePanel';
import CarCard from '../components/CarCard';
import FadeInSection from '../components/FadeInSection';

// Spec blocks definition for the full detail page
function buildSpecBlocks(car) {
  return [
    {
      id: 'engine',
      gauge: 0,
      label: '01 / Powertrain',
      title: 'Engine & Performance',
      text: `${car.specs.engine}. ${car.specs.transmission}. Capable of ${car.specs.acceleration} from standstill with a governed top speed of ${car.specs.topSpeed}.`,
    },
    {
      id: 'interior',
      gauge: 2,
      label: '02 / Interior',
      title: 'Cabin & Comfort',
      text: `${car.specs.interior}. Dual-zone climate, adaptive suspension settings, and a premium sound system. Every surface trimmed to factory exacting standards.`,
    },
    {
      id: 'history',
      gauge: 1,
      label: '03 / History & Condition',
      title: 'Provenance',
      text: `${car.history.owners === 1 ? 'One previous registered keeper.' : `${car.history.owners} previous registered keepers.`} ${car.history.serviceHistory} ${car.history.condition}`,
    },
    {
      id: 'warranty',
      gauge: 2,
      label: '04 / Warranty',
      title: 'Coverage Terms',
      text: car.history.warranty,
    },
  ];
}

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = getCarById(id);
  const related = getRelatedCars(id, 3);

  const [activeImg, setActiveImg] = useState(0);
  const [activeBlock, setActiveBlock] = useState('engine');

  const specBlocks = car ? buildSpecBlocks(car) : [];

  // IntersectionObserver for spec blocks
  useEffect(() => {
    if (!car) return;
    const blockIds = specBlocks.map(b => b.id);
    const observers = blockIds.map(bid => {
      const el = document.getElementById(`detail-block-${bid}`);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveBlock(bid); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [car, id]);

  if (!car) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--silver)', letterSpacing: '0.1em' }}>
          404 — car not found
        </p>
        <button className="btn-primary" onClick={() => navigate('/inventory')}>
          Back to inventory
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Top bar */}
      <div style={{
        paddingTop: '5.5rem',
        paddingBottom: '1.5rem',
        background: 'var(--graphite)',
        borderBottom: '1px solid #E5E3DC',
      }}>
        <div className="container">
          <Link
            to="/inventory"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              letterSpacing: '0.15em', 
              color: 'var(--silver)',
              transition: 'color 150ms ease-out',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--ivory)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--silver)'}
          >
            <ArrowLeft size={12} /> Back to inventory
          </Link>
        </div>
      </div>

      {/* Gallery + Price hero */}
      <section style={{ background: 'var(--graphite)', padding: '2.5rem 0 3rem' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: '3rem',
            alignItems: 'start',
          }}
          className="detail-top-grid"
          >
            {/* Gallery */}
            <div>
              <div className="gallery__main">
                <img
                  key={activeImg}
                  src={car.images[activeImg]}
                  alt={`${car.name} — image ${activeImg + 1}`}
                />
              </div>
              <div className="gallery__thumbs">
                {car.images.map((src, i) => (
                  <button
                    key={i}
                    className={`gallery__thumb${activeImg === i ? ' active' : ''}`}
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            </div>

            {/* Price + CTA */}
            <div style={{ paddingTop: '0.5rem' }}>
              <p className="section-label">{car.year} · {car.make}</p>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 900,
                
                letterSpacing: '0.04em',
                color: 'var(--ivory)',
                margin: '0.5rem 0 1.5rem',
                lineHeight: 1.1,
              }}>
                {car.name}
              </h1>

              <div className="price-display" style={{ marginBottom: '0.5rem' }}>
                {formatPrice(car.price)}
              </div>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                color: 'var(--silver)', letterSpacing: '0.05em',
                marginBottom: '1.75rem',
              }}>
                {formatMileage(car.mileage)} &nbsp;·&nbsp; {car.specs.colour} &nbsp;·&nbsp;
                <span className={`pill pill--${car.status}`} style={{ marginLeft: '0.4rem' }}>
                  {car.status}
                </span>
              </p>

              <Link
                to={`/contact?car=${encodeURIComponent(car.name)}&id=${car.id}`}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}
              >
                Book a viewing
              </Link>

              <p style={{ fontSize: '0.75rem', color: 'rgba(107,107,104,0.4)', textAlign: 'center' }}>
                Private appointment · No obligation
              </p>

              {/* VIN */}
              <div style={{
                marginTop: '2rem',
                padding: '1rem',
                background: 'var(--graphite2)',
                borderTop: '2px solid #E5E3DC',
              }}>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                  letterSpacing: '0.2em', 
                  color: 'rgba(107,107,104,0.4)', marginBottom: '0.4rem',
                }}>
                  VIN
                </p>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                  color: 'var(--silver)', letterSpacing: '0.08em', wordBreak: 'break-all',
                }}>
                  {car.vin}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section style={{ background: 'var(--graphite2)', borderTop: '1px solid #E5E3DC', padding: '3rem 0' }}>
        <div className="container">
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '1rem',
            color: 'var(--silver)', lineHeight: 1.85,
            maxWidth: '680px',
            borderLeft: '2px solid var(--amber)',
            paddingLeft: '1.5rem',
          }}>
            {car.description}
          </p>
        </div>
      </section>

      {/* ── SPEC GAUGE SECTION ────────────────────────────── */}
      <section style={{ background: 'var(--graphite)', padding: '5rem 0' }} aria-label="Full specifications">
        <div className="container">
          <FadeInSection style={{ marginBottom: '2.5rem' }}>
            <p className="section-label">Spec sheet</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              Full breakdown
            </h2>
          </FadeInSection>

          <div className="sticky-section">
            {/* Sticky gauge panel */}
            <div className="sticky-panel">
              <GaugePanel
                car={car}
                specBlocks={specBlocks}
                activeBlock={activeBlock}
              />
            </div>

            {/* Scrolling spec blocks */}
            <div>
              {specBlocks.map(block => (
                <div
                  key={block.id}
                  id={`detail-block-${block.id}`}
                  className={`spec-block${activeBlock === block.id ? ' active' : ''}`}
                >
                  <p className="spec-block__label">{block.label}</p>
                  <h3 className="spec-block__title">{block.title}</h3>
                  <p className="spec-block__text">{block.text}</p>

                  {/* Engine block extras */}
                  {block.id === 'engine' && (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.5rem 2rem',
                      marginTop: '1.5rem',
                    }}>
                      {[
                        ['Power', car.specs.engine.match(/\d+ hp/)?.[0] ?? '—'],
                        ['0–100 km/h', car.specs.acceleration],
                        ['Top Speed', car.specs.topSpeed],
                        ['Fuel', car.specs.fuelType],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.18em', color: 'rgba(107,107,104,0.4)',  marginBottom: '0.2rem' }}>{k}</p>
                          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--amber)' }}>{v}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED CARS ─────────────────────────────────── */}
      {related.length > 0 && (
        <section style={{ background: 'var(--graphite2)', borderTop: '1px solid #E5E3DC', padding: '5rem 0' }}>
          <div className="container">
            <FadeInSection style={{ marginBottom: '2rem' }}>
              <p className="section-label">You might also like</p>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}>
                More from the lot
              </h2>
            </FadeInSection>
            <div className="related-row">
              {related.map(c => (
                <FadeInSection key={c.id}>
                  <CarCard car={c} style={{ height: '100%' }} />
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
