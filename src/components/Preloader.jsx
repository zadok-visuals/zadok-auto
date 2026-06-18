import { useEffect, useState } from 'react';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Preloader({ onDone }) {
  const [phase, setPhase] = useState('drawing'); // drawing | fill | fade | done

  useEffect(() => {
    if (prefersReducedMotion) {
      onDone();
      return;
    }
    // draw: 0–1.2s, fill+fade: 1.2–1.6s
    const t1 = setTimeout(() => setPhase('fill'), 1200);
    const t2 = setTimeout(() => setPhase('fade'), 1400);
    const t3 = setTimeout(() => onDone(), 1700);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onDone]);

  // Skip on scroll or click
  useEffect(() => {
    const skip = () => onDone();
    window.addEventListener('scroll', skip, { once: true, passive: true });
    window.addEventListener('click', skip, { once: true });
    return () => {
      window.removeEventListener('scroll', skip);
      window.removeEventListener('click', skip);
    };
  }, [onDone]);

  if (phase === 'done') return null;

  return (
    <div
      className="preloader"
      style={{
        opacity: phase === 'fade' ? 0 : 1,
        pointerEvents: phase === 'fade' ? 'none' : 'auto',
        transition: 'opacity 0.35s ease-out',
      }}
      aria-hidden="true"
    >
      <div className="preloader__car">
        {/* Minimalist car silhouette as SVG line drawing */}
        <svg viewBox="0 0 300 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="300">
          {/* Body outline */}
          <path
            d="M20 80 L40 80 L55 50 L90 38 L130 34 L175 34 L215 42 L248 52 L265 68 L270 80 L280 80"
            stroke={phase === 'fill' ? '#FF8A3D' : '#F2EEE6'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeDasharray="800"
            strokeDashoffset="0"
            style={{
              strokeDashoffset: phase === 'drawing' ? 800 : 0,
              transition: 'stroke-dashoffset 1s ease-out, stroke 0.2s ease-out',
            }}
          />
          {/* Roof */}
          <path
            d="M90 38 L105 20 L195 20 L215 42"
            stroke={phase === 'fill' ? '#FF8A3D' : '#F2EEE6'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeDasharray="400"
            style={{
              strokeDashoffset: phase === 'drawing' ? 400 : 0,
              transition: 'stroke-dashoffset 0.9s 0.15s ease-out, stroke 0.2s ease-out',
            }}
          />
          {/* Windows */}
          <path
            d="M108 38 L115 24 L148 24 L148 38"
            stroke={phase === 'fill' ? '#FF8A3D' : 'rgba(242,238,230,0.5)'}
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="200"
            style={{
              strokeDashoffset: phase === 'drawing' ? 200 : 0,
              transition: 'stroke-dashoffset 0.6s 0.3s ease-out, stroke 0.2s ease-out',
            }}
          />
          <path
            d="M152 38 L152 24 L192 24 L210 42"
            stroke={phase === 'fill' ? '#FF8A3D' : 'rgba(242,238,230,0.5)'}
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="200"
            style={{
              strokeDashoffset: phase === 'drawing' ? 200 : 0,
              transition: 'stroke-dashoffset 0.6s 0.4s ease-out, stroke 0.2s ease-out',
            }}
          />
          {/* Ground line */}
          <line
            x1="10" y1="87" x2="290" y2="87"
            stroke="rgba(199,204,209,0.15)"
            strokeWidth="1"
            strokeDasharray="400"
            style={{
              strokeDashoffset: phase === 'drawing' ? 400 : 0,
              transition: 'stroke-dashoffset 0.8s 0.2s ease-out',
            }}
          />
          {/* Rear wheel */}
          <circle
            cx="72" cy="87" r="18"
            stroke={phase === 'fill' ? '#FF8A3D' : '#F2EEE6'}
            strokeWidth="2"
            fill="none"
            strokeDasharray="120"
            style={{
              strokeDashoffset: phase === 'drawing' ? 120 : 0,
              transition: 'stroke-dashoffset 0.7s 0.5s ease-out, stroke 0.2s ease-out',
            }}
          />
          <circle cx="72" cy="87" r="5" fill={phase === 'fill' ? '#FF8A3D' : '#F2EEE6'} style={{ transition: 'fill 0.2s ease-out' }} />
          {/* Front wheel */}
          <circle
            cx="228" cy="87" r="18"
            stroke={phase === 'fill' ? '#FF8A3D' : '#F2EEE6'}
            strokeWidth="2"
            fill="none"
            strokeDasharray="120"
            style={{
              strokeDashoffset: phase === 'drawing' ? 120 : 0,
              transition: 'stroke-dashoffset 0.7s 0.55s ease-out, stroke 0.2s ease-out',
            }}
          />
          <circle cx="228" cy="87" r="5" fill={phase === 'fill' ? '#FF8A3D' : '#F2EEE6'} style={{ transition: 'fill 0.2s ease-out' }} />
          {/* Front detail */}
          <path
            d="M265 68 L275 68 L278 72 L278 82"
            stroke={phase === 'fill' ? '#FF8A3D' : '#F2EEE6'}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="60"
            style={{
              strokeDashoffset: phase === 'drawing' ? 60 : 0,
              transition: 'stroke-dashoffset 0.4s 0.6s ease-out, stroke 0.2s ease-out',
            }}
          />
        </svg>
      </div>

      <p className="preloader__label">Zadok Auto</p>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        letterSpacing: '0.2em',
        color: 'rgba(199,204,209,0.3)',
        textTransform: 'uppercase',
        opacity: phase === 'drawing' ? 0 : 1,
        transition: 'opacity 0.4s ease-out 0.6s',
      }}>
        Premium Pre-Owned
      </p>
    </div>
  );
}
