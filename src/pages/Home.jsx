import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, FileText, RotateCcw, ChevronDown } from 'lucide-react';
import { cars, formatPrice, formatMileage } from '../data/cars';
import CarCard from '../components/CarCard';
import GaugePanel from '../components/GaugePanel';
import FadeInSection from '../components/FadeInSection';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const featuredCar = cars.find(c => c.featured) ?? cars[0];
const otherCars = cars.filter(c => !c.featured).slice(0, 5);

// Spec blocks for the homepage gauge strip
const HOME_SPEC_BLOCKS = [
  {
    id: 'engine',
    gauge: 0,
    label: '01 / Powertrain',
    title: 'Engine & Drive',
    text: featuredCar.specs.engine + ' · ' + featuredCar.specs.transmission + ' · ' + featuredCar.specs.drivetrain,
  },
  {
    id: 'interior',
    gauge: 2,
    label: '02 / Interior',
    title: 'Cabin & Comfort',
    text: featuredCar.specs.interior + '. Climate-controlled cabin with dual-zone AC, heated/ventilated sport seats, and premium audio.',
  },
  {
    id: 'condition',
    gauge: 0,
    label: '03 / Condition',
    title: 'As Inspected',
    text: featuredCar.history.condition,
  },
  {
    id: 'warranty',
    gauge: 2,
    label: '04 / Warranty',
    title: 'Coverage',
    text: featuredCar.history.warranty,
  },
];

// Hook: track which spec block is in view
function useActiveBlock(blockIds) {
  const [active, setActive] = useState(blockIds[0]);
  useEffect(() => {
    const observers = blockIds.map(id => {
      const el = document.getElementById(`spec-block-${id}`);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.5 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [blockIds]);
  return active;
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();

  // Parallax transforms (disabled for reduced motion)
  // bg moves up fast, car moves up slower, creating depth
  const bgY = useTransform(scrollY, [0, 1000], prefersReducedMotion ? [0, 0] : [0, -250]);
  const carY = useTransform(scrollY, [0, 1000], prefersReducedMotion ? [0, 0] : [0, -80]);
  const carX = useTransform(scrollY, [0, 800], prefersReducedMotion ? [0, 0] : [0, -40]);
  const contentX = useTransform(scrollY, [0, 600], prefersReducedMotion ? [0, 0] : [0, 30]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  const activeBlock = useActiveBlock(HOME_SPEC_BLOCKS.map(b => b.id));

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero" ref={heroRef} aria-label="Hero">
        {/* Parallax bg */}
        <motion.div className="hero__bg" style={{ y: bgY }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAF8 35%, #F0F0EE 65%, #E5E3DC 100%)',
          }} />
          {/* Subtle grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(107,107,104,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(107,107,104,0.05) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} />
          {/* Accent light */}
          <div style={{
            position: 'absolute',
            right: '10%', top: '15%',
            width: '40%', height: '70%',
            background: 'radial-gradient(ellipse at center, rgba(200,96,46,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
        </motion.div>

        {/* Parallax car image */}
        <motion.div
          style={{ y: carY, x: carX }}
          aria-hidden="true"
          className="hero__car-wrap"
        >
          <img
            src={featuredCar.images[0]}
            alt=""
            style={{
              position: 'absolute',
              right: '5%',
              top: '55%',
              transform: 'translateY(-50%)',
              width: '55%',
              height: 'auto',
              maxHeight: '80%',
              objectFit: 'contain',
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, transparent 100%)',
            }}
            fetchpriority="high"
          />
        </motion.div>

        <div className="hero__overlay" />

        {/* Content */}
        <motion.div
          className="container"
          style={{ x: contentX, opacity: contentOpacity, position: 'relative', zIndex: 2 }}
        >
          <div className="hero__content">
            <p className="section-label" style={{ marginBottom: '1.5rem' }}>
              {featuredCar.year} · Featured
            </p>
            <h1 className="hero__headline">
              One car.<br /><em>No</em> compromises.
            </h1>
            <p className="hero__sub">
              {featuredCar.name}. {formatMileage(featuredCar.mileage)} &nbsp;·&nbsp; {featuredCar.specs.colour} &nbsp;·&nbsp; Independently inspected.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">Book a viewing</Link>
              <Link to="/inventory" className="btn-outline">View all cars</Link>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="hero__scroll-hint" aria-hidden="true">
          <ChevronDown size={18} />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── FEATURED SPEC STRIP ──────────────────────────── */}
      <section
        aria-label="Featured car specs"
        style={{
          padding: '6rem 0',
          background: 'var(--graphite)',
          borderBottom: '1px solid #E5E3DC',
        }}
      >
        <div className="container">
          <FadeInSection style={{ marginBottom: '2.5rem' }}>
            <p className="section-label">Featured Vehicle</p>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)' }}>
                {featuredCar.name}
              </h2>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.5rem',
                color: 'var(--amber)',
                fontWeight: 600,
              }}>
                {formatPrice(featuredCar.price)}
              </span>
            </div>
          </FadeInSection>

          <div className="sticky-section">
            {/* Sticky panel */}
            <div className="sticky-panel">
              <GaugePanel
                car={featuredCar}
                specBlocks={HOME_SPEC_BLOCKS}
                activeBlock={activeBlock}
              />
              <div style={{ marginTop: '1rem' }}>
                <Link
                  to={`/inventory/${featuredCar.id}`}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Full spec sheet
                </Link>
              </div>
            </div>

            {/* Scrolling spec blocks */}
            <div>
              {HOME_SPEC_BLOCKS.map(block => (
                <div
                  key={block.id}
                  id={`spec-block-${block.id}`}
                  className={`spec-block${activeBlock === block.id ? ' active' : ''}`}
                >
                  <p className="spec-block__label">{block.label}</p>
                  <h3 className="spec-block__title">{block.title}</h3>
                  <p className="spec-block__text">{block.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BENTO GRID ───────────────────────────────────── */}
      <section
        aria-label="Also on the lot"
        style={{ padding: '6rem 0', background: 'var(--graphite2)', borderBottom: '1px solid #E5E3DC' }}
      >
        <div className="container">
          <FadeInSection style={{ marginBottom: '2.5rem' }}>
            <p className="section-label">Also on the lot</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)' }}>
                Current inventory
              </h2>
              <Link to="/inventory" className="btn-outline" style={{ padding: '0.6rem 1.2rem', fontSize: '0.75rem' }}>
                View all
              </Link>
            </div>
          </FadeInSection>

          <div className="bento-grid">
            {otherCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────── */}
      <section
        aria-label="Trust signals"
        style={{
          padding: '4rem 0',
          background: 'var(--graphite)',
          borderBottom: '1px solid #E5E3DC',
        }}
      >
        <div className="container">
          <FadeInSection>
            <div className="trust-strip">
              <div className="trust-item">
                <div className="trust-item__icon"><Shield size={18} /></div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--ivory)', marginBottom: '0.15rem' }}>Independently inspected</p>
                  <p style={{ fontSize: '0.78rem' }}>Every car passes a 120-point third-party check.</p>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-item__icon"><FileText size={18} /></div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--ivory)', marginBottom: '0.15rem' }}>Full service history</p>
                  <p style={{ fontSize: '0.78rem' }}>Dealer records verified before every listing.</p>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-item__icon"><RotateCcw size={18} /></div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--ivory)', marginBottom: '0.15rem' }}>7-day return window</p>
                  <p style={{ fontSize: '0.78rem' }}>Full refund, no questions, no penalties.</p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────── */}
      <section className="cta-band" aria-label="Book a viewing">
        <div className="container">
          <FadeInSection>
            <h2 className="cta-band__title">Ready to take a look?</h2>
            <p className="cta-band__sub">
              We keep the lot private. Viewings are by appointment — relaxed, no pressure, your pace.
            </p>
            <Link to="/contact" className="btn-primary" style={{ fontSize: '0.9rem', padding: '1rem 2.5rem' }}>
              Book a viewing
            </Link>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
