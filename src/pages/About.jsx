import { Link } from 'react-router-dom';
import { Shield, FileText, RotateCcw, Star, Clock, Eye } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';

const INSPECTION_STEPS = [
  {
    icon: <Eye size={20} />,
    title: 'Visual inspection',
    text: 'Panel alignment, paint depth readings at all panels, glass condition, trim and rubber seal assessment.',
  },
  {
    icon: <FileText size={20} />,
    title: 'History verification',
    text: 'Full service record cross-check against OEM dealer systems. Finance check, stolen vehicle check, VIN verification.',
  },
  {
    icon: <Shield size={20} />,
    title: 'Mechanical assessment',
    text: 'Road test, diagnostic scan, brake and tyre measurement, fluid analysis, suspension and driveline check.',
  },
  {
    icon: <Star size={20} />,
    title: 'Condition grading',
    text: 'Independent score out of 10 assigned. Only vehicles scoring 8.5 or higher are listed for sale.',
  },
];

export default function About() {
  return (
    <>
      {/* Page header */}
      <div className="page-header" style={{ background: 'var(--graphite)' }}>
        <div className="container">
          <p className="section-label">Who we are</p>
          <h1 className="page-header__title">About Zadok Auto</h1>
          <p className="page-header__sub">
            A single stand. No auction cars. No compromises.
          </p>
        </div>
      </div>

      {/* Story section */}
      <section style={{ background: 'var(--graphite)', padding: '5rem 0', borderBottom: '1px solid #E5E3DC' }}>
        <div className="container">
          <FadeInSection>
            <div className="about-section">
              <div className="about-text">
                <div className="about-accent" />
                <p className="section-label">Our story</p>
                <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '1.5rem' }}>
                  We started because<br />we were buyers first.
                </h2>
                <p>
                  Zadok Auto was founded in 2018 by car enthusiasts who were tired of buying from dealers who treated every car the same — unloved stock rotated through auctions, history sheets that said nothing, and salespeople who knew less about the car than you did.
                </p>
                <p>
                  We run a single stand in Bryanston with a deliberately short list. Every car we buy is one we'd drive ourselves. Every one passes our inspection before it appears on the site.
                </p>
                <p>
                  We're not chasing volume. We're building a reputation, one car at a time.
                </p>
              </div>
              <div style={{
                background: 'var(--graphite2)',
                border: '1px solid #E5E3DC',
                borderTop: '3px solid var(--amber)',
                padding: '2.5rem',
              }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  
                  letterSpacing: '0.04em',
                  color: 'var(--ivory)',
                  lineHeight: 1.2,
                  marginBottom: '1.5rem',
                }}>
                  "We only list what we'd buy."
                </p>
                <div style={{ borderTop: '1px solid #E5E3DC', paddingTop: '1.5rem' }}>
                  {[
                    ['Vehicles listed since 2018', '94'],
                    ['Average days to sell', '12'],
                    ['Customer return rate', '41%'],
                    ['Minimum condition score', '8.5/10'],
                  ].map(([label, val]) => (
                    <div key={label} style={{
                      display: 'flex', justifyContent: 'space-between',
                      paddingBlock: '0.6rem',
                      borderBottom: '1px solid #E5E3DC',
                    }}>
                      <span style={{ fontSize: '0.82rem', color: 'var(--silver)' }}>{label}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--amber)' }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Inspection process */}
      <section style={{ background: 'var(--graphite2)', padding: '5rem 0', borderBottom: '1px solid #E5E3DC' }}>
        <div className="container">
          <FadeInSection style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <p className="section-label">How we work</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)' }}>
              The 120-point inspection
            </h2>
          </FadeInSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {INSPECTION_STEPS.map((step, i) => (
              <FadeInSection key={step.title} delay={i * 80}>
                <div style={{
                  background: 'var(--graphite)',
                  border: '1px solid #E5E3DC',
                  borderTop: '2px solid var(--amber)',
                  padding: '2rem 1.75rem',
                  height: '100%',
                }}>
                  <div style={{
                    width: 44, height: 44,
                    border: '1px solid #E5E3DC',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--amber)',
                    marginBottom: '1.25rem',
                  }}>
                    {step.icon}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '1rem',
                    letterSpacing: '0.06em',
                    
                    color: 'var(--ivory)',
                    marginBottom: '0.6rem',
                  }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--silver)', lineHeight: 1.7 }}>{step.text}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: 'var(--graphite)', padding: '5rem 0', borderBottom: '1px solid #E5E3DC' }}>
        <div className="container">
          <FadeInSection style={{ marginBottom: '2.5rem' }}>
            <p className="section-label">What we stand for</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)' }}>
              Our values
            </h2>
          </FadeInSection>
          <div className="values-grid">
            {[
              { n: '01', title: 'Transparency', text: "Every flaw is disclosed. Every price is explained. We'd rather lose a sale than sell a car badly." },
              { n: '02', title: 'Restraint', text: "We run a short list on purpose. Depth over breadth. You'll never browse 400 cars that nobody checked." },
              { n: '03', title: 'Accountability', text: '12 months of mechanical warranty on every vehicle. If something goes wrong, we fix it.' },
            ].map(v => (
              <FadeInSection key={v.n}>
                <div className="value-card" style={{ height: '100%' }}>
                  <div className="value-card__number">{v.n}</div>
                  <h3 className="value-card__title">{v.title}</h3>
                  <p className="value-card__text">{v.text}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="cta-band">
        <div className="container">
          <FadeInSection>
            <h2 className="cta-band__title">Come and see for yourself.</h2>
            <p className="cta-band__sub">
              Private viewings. Honest conversations. No pressure.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">Book a viewing</Link>
              <Link to="/inventory" className="btn-outline" style={{ borderColor: '#E5E3DC' }}>Browse inventory</Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
