const leaves = [
  { left: '8%', delay: '0s', duration: '19s', size: 18, opacity: 0.35 },
  { left: '18%', delay: '6s', duration: '24s', size: 12, opacity: 0.25 },
  { left: '31%', delay: '2s', duration: '21s', size: 22, opacity: 0.3 },
  { left: '44%', delay: '9s', duration: '27s', size: 14, opacity: 0.22 },
  { left: '57%', delay: '4s', duration: '23s', size: 20, opacity: 0.28 },
  { left: '68%', delay: '11s', duration: '18s', size: 12, opacity: 0.22 },
  { left: '79%', delay: '1s', duration: '26s', size: 24, opacity: 0.3 },
  { left: '90%', delay: '7s', duration: '22s', size: 15, opacity: 0.26 },
]

export default function LeafParticles({ className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {leaves.map((leaf, index) => (
        <svg
          key={index}
          viewBox="0 0 24 24"
          className="leaf-drift"
          style={{
            left: leaf.left,
            width: leaf.size,
            height: leaf.size,
            opacity: leaf.opacity,
            animationDelay: leaf.delay,
            animationDuration: leaf.duration,
          }}
        >
          <path
            d="M12 2C18 6 21 12 18 18C15 23 9 23 6 19C3 15 4 10 7 7C9 5 11 3 12 2Z"
            fill="currentColor"
          />
          <path d="M12 21C12 15 12 10 9 6" stroke="#254C3A" strokeOpacity="0.35" strokeWidth="0.8" fill="none" />
        </svg>
      ))}
    </div>
  )
}
