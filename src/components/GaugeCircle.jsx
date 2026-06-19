// Reusable circular SVG gauge — instrument cluster style
// Props: value (number), max (number), label (string), unit (string), active (bool)

export default function GaugeCircle({ value, max, label, unit = '', active = false, size = 110 }) {
  const radius = 40;
  const strokeWidth = 1;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  // Arc goes from bottom-left (-225deg) sweeping 270 degrees
  const arcOffset = circumference * (1 - pct * 0.75);
  const center = size / 2;

  return (
    <div className={`gauge${active ? ' active' : ''}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={`${label}: ${value}${unit}`}>
        {/* Track arc */}
        <circle
          cx={center} cy={center} r={radius}
          fill="none"
          stroke="rgba(107,107,104,0.1)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference * 0.75}
          strokeDashoffset={0}
          strokeLinecap="butt"
          transform={`rotate(135 ${center} ${center})`}
        />
        {/* Fill arc */}
        <circle
          cx={center} cy={center} r={radius}
          fill="none"
          stroke={active ? '#C8602E' : 'rgba(107,107,104,0.3)'}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          strokeDashoffset={arcOffset}
          strokeLinecap="butt"
          transform={`rotate(135 ${center} ${center})`}
          style={{ transition: 'stroke-dashoffset 0.8s ease-out, stroke 0.3s ease-out' }}
        />
        {/* Center value */}
        <text
          x={center} y={center - 4}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={active ? '#C8602E' : '#1A1A1A'}
          fontSize="10"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="300"
          style={{ transition: 'fill 0.3s ease-out' }}
        >
          {typeof value === 'number' && value > 9999
            ? `${(value / 1000).toFixed(0)}k`
            : value}
        </text>
        <text
          x={center} y={center + 12}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(107,107,104,0.6)"
          fontSize="7"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="1"
        >
          {unit.toUpperCase()}
        </text>
      </svg>
      <span className="gauge__label">{label}</span>
    </div>
  );
}
