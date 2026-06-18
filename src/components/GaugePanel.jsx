import { useState, useRef, useEffect } from 'react';
import GaugeCircle from './GaugeCircle';

// specBlocks: array of { id, label, title, text, gauge }
// car: full car object (for gauge values)
// activeBlock: id of currently active spec block (controlled externally)

export default function GaugePanel({ car, specBlocks, activeBlock }) {
  const activeGauge = specBlocks.find(b => b.id === activeBlock)?.gauge ?? 0;

  return (
    <div className="gauge-panel">
      <p className="gauge-panel__title">Instrument Cluster</p>

      {/* Gauges row */}
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        <GaugeCircle
          value={car.mileage}
          max={100000}
          label="Odometer"
          unit="km"
          active={activeGauge === 0}
        />
        <GaugeCircle
          value={car.year}
          max={2026}
          label="Model Year"
          unit="year"
          active={activeGauge === 1}
        />
        <GaugeCircle
          value={car.conditionScore}
          max={10}
          label="Condition"
          unit="/10"
          active={activeGauge === 2}
        />
      </div>

      {/* Summary data */}
      <div style={{
        borderTop: '1px solid rgba(199,204,209,0.08)',
        paddingTop: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {[
          { label: 'Make', value: car.make },
          { label: 'Year', value: car.year },
          { label: 'Mileage', value: `${car.mileage.toLocaleString()} km` },
          { label: 'Colour', value: car.specs.colour },
          { label: 'Drivetrain', value: car.specs.drivetrain },
          { label: 'VIN', value: car.vin.slice(-8) + '…' },
        ].map(row => (
          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--silver)',
            }}>
              {row.label}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--ivory)',
              textAlign: 'right',
            }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
