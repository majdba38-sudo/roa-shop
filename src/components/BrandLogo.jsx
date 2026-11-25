import { useId } from 'react'
import { site } from '../data/site'

function Mark({ className = '', tone = 'dark' }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`leafA-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8FA982" />
          <stop offset="0.45" stopColor="#4F7259" />
          <stop offset="1" stopColor="#254C3A" />
        </linearGradient>
        <linearGradient id={`leafB-${uid}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#A9B9A0" />
          <stop offset="1" stopColor="#5D7A55" />
        </linearGradient>
      </defs>
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke={tone === 'light' ? '#F8F7F1' : '#254C3A'}
        strokeOpacity="0.22"
        strokeWidth="1"
      />
      <path
        d="M32 8C44 16 50 30 43 42C38 51 28 56 21 51C14 46 14 36 19 28C24 20 30 15 32 8Z"
        fill={`url(#leafA-${uid})`}
      />
      <path
        d="M33 38C35 27 42 20 54 18C54 30 46 38 33 38Z"
        fill={`url(#leafB-${uid})`}
        opacity="0.92"
      />
      <path
        d="M31 55C30 42 27 33 20 25"
        stroke={tone === 'light' ? '#F8F7F1' : '#254C3A'}
        strokeOpacity="0.4"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M23 46V24L41 46V24"
        stroke="#F8F7F1"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.92"
      />
      <path
        d="M23 46V24L41 46V24"
        stroke="#20A8D8"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export default function BrandLogo({ tone = 'dark', className = '', markOnly = false, large = false }) {
  const logo = tone === 'light' ? site.assets.fullLogoLight || site.assets.fullLogo : site.assets.fullLogo
  const source = markOnly && site.assets.mark ? site.assets.mark : logo

  if (source) {
    return (
      <img
        src={source}
        alt={markOnly ? site.nameEn : `${site.nameAr} — ${site.nameEn}`}
        className={
          markOnly
            ? `object-contain ${className}`
            : `w-auto object-contain ${tone === 'light' ? 'drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]' : ''} ${large ? 'h-20 sm:h-24' : 'h-12 sm:h-14'} ${className}`
        }
      />
    )
  }

  const ink = tone === 'light' ? 'text-ivory' : 'text-forest'

  return (
    <span className={`inline-flex items-center gap-2.5 sm:gap-3 ${ink} ${className}`} aria-label={`${site.nameAr} — ${site.nameEn}`}>
      <Mark tone={tone} className={large ? 'h-14 w-14' : 'h-10 w-10 sm:h-11 sm:w-11'} />
      {!markOnly && (
        <span className="flex flex-col justify-center">
          <span
            className={`font-arabic font-bold leading-none ${large ? 'text-[1.5rem]' : 'text-[1.08rem] sm:text-[1.22rem]'}`}
          >
            {site.nameAr}
          </span>
          <span
            dir="ltr"
            className={`mt-1 font-sans font-normal uppercase leading-none ${
              large ? 'text-[0.72rem] tracking-[0.4em]' : 'text-[0.5rem] tracking-[0.32em] sm:text-[0.56rem]'
            }`}
          >
            {site.nameEn}
          </span>
        </span>
      )}
    </span>
  )
}
