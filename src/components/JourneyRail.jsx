import { useLang } from '../context/LanguageContext'
import { products } from '../data/products'

export default function JourneyRail({ active, visible }) {
  const { c } = useLang()
  const total = products.length
  const progress = total > 1 ? ((active - 1) / (total - 1)) * 100 : 0

  return (
    <>
      <div
        className={`journey-rail fixed end-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex ${
          visible ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-label={c.journey.railLabel}
      >
        <span className="font-display text-[0.68rem] tracking-[0.18em] text-ivory/70">
          {String(active).padStart(2, '0')}
        </span>
        <div className="relative flex flex-col items-center gap-1 py-1">
          <span className="absolute inset-y-0 start-1/2 w-px -translate-x-1/2 bg-ivory/20" aria-hidden="true" />
          <span
            className="absolute start-1/2 top-0 w-px -translate-x-1/2 bg-ivory/85 transition-[height] duration-500"
            style={{ height: `${Math.max(6, progress)}%` }}
            aria-hidden="true"
          />
          {products.map((product) => {
            const isActive = active === product.station
            return (
              <a
                key={product.id}
                href={`#station-${product.station}`}
                className="journey-dot font-sans"
                aria-current={isActive ? 'true' : undefined}
                aria-label={`${c.journey.goTo} ${product.station} — ${c.station.label} 0${product.station}`}
              >
                <span className="relative z-10">{String(product.station).padStart(2, '0')}</span>
              </a>
            )
          })}
        </div>
        <span className="font-display text-[0.68rem] tracking-[0.18em] text-ivory/40">
          {String(total).padStart(2, '0')}
        </span>
      </div>

      <div
        className={`fixed inset-x-0 bottom-[max(0.9rem,env(safe-area-inset-bottom))] z-30 flex justify-center px-4 transition-opacity duration-500 lg:hidden ${
          visible ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="flex items-center gap-2 rounded-full border border-ivory/15 bg-forest-deep/78 px-2.5 py-1.5 shadow-lg backdrop-blur-md"
          aria-label={c.journey.railLabel}
        >
          <span className="px-1.5 font-sans text-[0.58rem] tracking-[0.14em] text-ivory/75">
            {String(active).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span className="h-3 w-px bg-ivory/20" aria-hidden="true" />
          {products.map((product) => (
            <a
              key={product.id}
              href={`#station-${product.station}`}
              aria-label={`${c.journey.goTo} ${product.station}`}
              aria-current={active === product.station ? 'true' : undefined}
              className={`grid h-6 w-6 place-items-center rounded-full transition-colors ${
                active === product.station ? 'bg-ivory text-forest' : 'text-ivory/55 hover:bg-ivory/10'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
