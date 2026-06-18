import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

const HOURS = [
  { day: 'Monday – Friday', hours: '08:00 – 17:00' },
  { day: 'Saturday', hours: '08:00 – 13:00' },
  { day: 'Sunday', hours: 'Closed' },
];

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
];

const DEFAULT_FORM = {
  name: '',
  contact: '',
  date: '',
  time: '',
  message: '',
  carInquiry: '',
};

export default function Contact() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    ...DEFAULT_FORM,
    carInquiry: params.get('car') ?? '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Update car field if query param arrives late
  useEffect(() => {
    const car = params.get('car');
    if (car) setForm(f => ({ ...f, carInquiry: car }));
  }, [params]);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.contact.trim()) e.contact = 'Required';
    if (!form.date) e.date = 'Required';
    if (!form.time) e.time = 'Required';
    return e;
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    // Simulate submission
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function set(field) {
    return e => {
      setForm(f => ({ ...f, [field]: e.target.value }));
      setErrors(er => ({ ...er, [field]: undefined }));
    };
  }

  if (submitted) {
    return (
      <>
        <div className="page-header" style={{ background: 'var(--graphite)' }}>
          <div className="container">
            <p className="section-label">Contact</p>
            <h1 className="page-header__title">Book a viewing</h1>
          </div>
        </div>
        <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--graphite)' }}>
          <div style={{ textAlign: 'center', maxWidth: 480, padding: '2rem' }}>
            <div style={{
              width: 64, height: 64,
              border: '1px solid rgba(74,222,128,0.3)',
              background: 'rgba(74,222,128,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 2rem',
              color: '#4ade80',
            }}>
              <CheckCircle size={28} />
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.8rem', fontWeight: 900,
              textTransform: 'uppercase', letterSpacing: '0.04em',
              color: 'var(--ivory)', marginBottom: '1rem',
            }}>
              Request received.
            </h2>
            <p style={{ color: 'var(--silver)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              We'll confirm your appointment within 2 hours. You can reach us directly on{' '}
              <span style={{ color: 'var(--amber)', fontFamily: 'var(--font-mono)' }}>+27 11 463 0000</span>.
            </p>
            <button className="btn-outline" onClick={() => setSubmitted(false)}>
              Submit another request
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Page header */}
      <div className="page-header" style={{ background: 'var(--graphite)' }}>
        <div className="container">
          <p className="section-label">Reach us</p>
          <h1 className="page-header__title">Book a viewing</h1>
          <p className="page-header__sub">
            Private appointments only. We'll confirm within 2 hours.
          </p>
        </div>
      </div>

      <section style={{ background: 'var(--graphite)', padding: '4rem 0 6rem', borderBottom: '1px solid rgba(199,204,209,0.06)' }}>
        <div className="container">
          <div className="contact-grid">
            {/* Form */}
            <form onSubmit={handleSubmit} noValidate aria-label="Viewing booking form">
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(199,204,209,0.4)',
                marginBottom: '2rem',
              }}>
                All fields marked * are required
              </div>

              {/* Car inquiry (pre-filled or editable) */}
              {form.carInquiry && (
                <div className="form-group">
                  <label className="form-label" htmlFor="carInquiry">Enquiring about</label>
                  <input
                    id="carInquiry"
                    className="input"
                    type="text"
                    value={form.carInquiry}
                    onChange={set('carInquiry')}
                    style={{ background: 'rgba(255,138,61,0.04)', borderColor: 'rgba(255,138,61,0.2)' }}
                  />
                </div>
              )}

              {/* Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full name *</label>
                <input
                  id="name"
                  className="input"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={set('name')}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  autoComplete="name"
                />
                {errors.name && (
                  <span id="name-error" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#f87171', letterSpacing: '0.1em' }}>
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Contact */}
              <div className="form-group">
                <label className="form-label" htmlFor="contact">Phone or email *</label>
                <input
                  id="contact"
                  className="input"
                  type="text"
                  placeholder="+27 or email address"
                  value={form.contact}
                  onChange={set('contact')}
                  aria-invalid={!!errors.contact}
                  autoComplete="tel"
                />
                {errors.contact && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#f87171', letterSpacing: '0.1em' }}>
                    {errors.contact}
                  </span>
                )}
              </div>

              {/* Date + time row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="date">Preferred date *</label>
                  <input
                    id="date"
                    className="input"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={form.date}
                    onChange={set('date')}
                    aria-invalid={!!errors.date}
                    style={{ colorScheme: 'dark' }}
                  />
                  {errors.date && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#f87171', letterSpacing: '0.1em' }}>
                      {errors.date}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="time">Preferred time *</label>
                  <select
                    id="time"
                    className="input"
                    value={form.time}
                    onChange={set('time')}
                    aria-invalid={!!errors.time}
                  >
                    <option value="">Select time</option>
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.time && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#f87171', letterSpacing: '0.1em' }}>
                      {errors.time}
                    </span>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message (optional)</label>
                <textarea
                  id="message"
                  className="input"
                  rows={5}
                  placeholder="Any questions, specific interests, or requests…"
                  value={form.message}
                  onChange={set('message')}
                  style={{ resize: 'vertical', fontFamily: 'var(--font-body)' }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem', padding: '1rem' }}
              >
                Request appointment
              </button>
            </form>

            {/* Info panel */}
            <div>
              <div className="address-block" style={{ marginBottom: '1rem' }}>
                <h2 className="address-block__title">Zadok Auto</h2>
                <div className="address-row">
                  <MapPin size={14} className="address-row__icon" />
                  <span>14 Montrose Avenue, Bryanston<br />Johannesburg, 2021</span>
                </div>
                <div className="address-row">
                  <Phone size={14} className="address-row__icon" />
                  <span>+27 11 463 0000</span>
                </div>
                <div className="address-row">
                  <Mail size={14} className="address-row__icon" />
                  <span>hello@zadokauto.co.za</span>
                </div>
              </div>

              {/* Hours */}
              <div className="address-block" style={{ marginBottom: '1rem' }}>
                <h2 className="address-block__title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={14} style={{ color: 'var(--amber)' }} /> Hours
                </h2>
                {HOURS.map(h => (
                  <div key={h.day} style={{
                    display: 'flex', justifyContent: 'space-between',
                    fontSize: '0.82rem', color: 'var(--silver)',
                    paddingBlock: '0.5rem',
                    borderBottom: '1px solid rgba(199,204,209,0.06)',
                  }}>
                    <span>{h.day}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: h.hours === 'Closed' ? 'rgba(199,204,209,0.35)' : 'var(--amber)' }}>
                      {h.hours}
                    </span>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="map-placeholder">
                <MapPin size={32} style={{ opacity: 0.2, color: 'var(--amber)' }} />
                <span>14 Montrose Ave, Bryanston</span>
                <span style={{ opacity: 0.4, fontSize: '0.7rem' }}>Johannesburg, South Africa</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
