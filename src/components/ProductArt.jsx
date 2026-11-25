/**
 * Bespoke, unbranded packaging illustrations.
 * Labels are intentionally blank: no invented ingredients, sizes or claims.
 * Swap in real photography through `product.photo` when available.
 */

const leafPath = 'M0 0C15-21 40-26 60-11C45 12 18 18 0 0Z'

export function ProductDefs() {
  return (
    <svg aria-hidden="true" focusable="false" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        <linearGradient id="roa-goldCap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E8CF96" />
          <stop offset="0.45" stopColor="#C8A96A" />
          <stop offset="1" stopColor="#A98342" />
        </linearGradient>
        <linearGradient id="roa-amberGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8E5A1F" />
          <stop offset="0.22" stopColor="#C68A3A" />
          <stop offset="0.55" stopColor="#A96824" />
          <stop offset="0.82" stopColor="#D9A052" />
          <stop offset="1" stopColor="#7C4B18" />
        </linearGradient>
        <linearGradient id="roa-amberLiquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D79A45" stopOpacity="0.7" />
          <stop offset="1" stopColor="#8A4F15" stopOpacity="0.92" />
        </linearGradient>
        <linearGradient id="roa-labelPaper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FCFAF3" />
          <stop offset="1" stopColor="#EDE6D6" />
        </linearGradient>
        <linearGradient id="roa-creamLid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7F0E1" />
          <stop offset="0.5" stopColor="#E5D6BA" />
          <stop offset="1" stopColor="#CBB897" />
        </linearGradient>
        <linearGradient id="roa-aloeGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A9C9A0" />
          <stop offset="0.35" stopColor="#D7E8CB" />
          <stop offset="0.7" stopColor="#9FBE93" />
          <stop offset="1" stopColor="#78956F" />
        </linearGradient>
        <linearGradient id="roa-herbGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1B3A2A" />
          <stop offset="0.3" stopColor="#3E6650" />
          <stop offset="0.62" stopColor="#254C3A" />
          <stop offset="1" stopColor="#142F23" />
        </linearGradient>
        <linearGradient id="roa-serumGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6F4516" />
          <stop offset="0.28" stopColor="#B87B2F" />
          <stop offset="0.62" stopColor="#9A5E1D" />
          <stop offset="0.86" stopColor="#D2A15C" />
          <stop offset="1" stopColor="#66400F" />
        </linearGradient>
        <linearGradient id="roa-serumLiquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E0B36D" stopOpacity="0.7" />
          <stop offset="1" stopColor="#7A4A12" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="roa-woodCap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B08A58" />
          <stop offset="0.5" stopColor="#8B6739" />
          <stop offset="1" stopColor="#6B4C27" />
        </linearGradient>
        <linearGradient id="roa-almondGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7B4A1B" />
          <stop offset="0.3" stopColor="#B77A36" />
          <stop offset="0.65" stopColor="#955B22" />
          <stop offset="1" stopColor="#6A3D12" />
        </linearGradient>
        <linearGradient id="roa-almondSkin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B98352" />
          <stop offset="1" stopColor="#7E5227" />
        </linearGradient>
        <linearGradient id="roa-resin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E5C180" />
          <stop offset="1" stopColor="#B9852F" />
        </linearGradient>
        <radialGradient id="roa-sunHalo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#F2D49A" stopOpacity="0.42" />
          <stop offset="0.6" stopColor="#E0BE7C" stopOpacity="0.12" />
          <stop offset="1" stopColor="#E0BE7C" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

function Sprig({ x, y, rotate = 0, scale = 1, color = '#71866A', opacity = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`} opacity={opacity}>
      <path d="M0 0C10-30 10-70 2-112" stroke={color} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(2 ${-26 - i * 22})`}>
          <path d="M0 0C-18-4-28-16-26-30C-10-30 2-20 0 0Z" fill={color} />
          <path d="M0 0C18-4 28-16 26-30C10-30-2-20 0 0Z" fill={color} opacity="0.82" />
        </g>
      ))}
    </g>
  )
}

function Label({ x, y, w, h, accent }) {
  const cx = x + w / 2
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill="url(#roa-labelPaper)" />
      <rect x={x} y={y} width={w} height={h} rx="6" fill="none" stroke={accent} strokeOpacity="0.45" strokeWidth="1" />
      <g transform={`translate(${cx} ${y + h * 0.3})`}>
        <path d="M0 7C0-3 7-10 17-11C17-1 10 7 0 7Z" fill={accent} opacity="0.85" />
        <path d="M0 7C0 1 4-4 10-7" stroke="#254C3A" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      </g>
      <rect x={cx - 26} y={y + h * 0.5} width="52" height="1.6" rx="0.8" fill="#254C3A" opacity="0.55" />
      <rect x={cx - 17} y={y + h * 0.58} width="34" height="1.2" rx="0.6" fill="#254C3A" opacity="0.28" />
      <rect x={cx - 10} y={y + h * 0.78} width="20" height="1" rx="0.5" fill="#254C3A" opacity="0.22" />
    </g>
  )
}

function Almond({ x, y, rotate = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M0 0C14-18 34-16 40 0C34 16 14 18 0 0Z" fill="url(#roa-almondSkin)" />
      <path d="M7 0C17-8 29-8 35 0C29 8 17 8 7 0Z" fill="#E8D3B4" opacity="0.55" />
    </g>
  )
}

function Blossom({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy="-8" rx="5.4" ry="8.4" fill="#FBF6EC" transform={`rotate(${a})`} opacity="0.95" />
      ))}
      <circle r="3.4" fill="#D9B36C" />
    </g>
  )
}

function DropperBottle({ accent }) {
  return (
    <g>
      <ellipse cx="210" cy="498" rx="96" ry="18" fill="#10261d" opacity="0.35" />
      <ellipse cx="210" cy="492" rx="78" ry="12" fill="#10261d" opacity="0.22" />

      <g transform="translate(92 330) rotate(-24)">
        <path d={leafPath} fill="#71866A" />
      </g>
      <g transform="translate(300 356) rotate(196) scale(1.1)">
        <path d={leafPath} fill="#4F6B4A" />
      </g>

      <rect x="177" y="118" width="66" height="54" rx="9" fill="url(#roa-goldCap)" />
      <rect x="183" y="130" width="54" height="2" rx="1" fill="#fff" opacity="0.35" />
      <rect x="183" y="142" width="54" height="2" rx="1" fill="#fff" opacity="0.2" />
      <rect x="183" y="154" width="54" height="2" rx="1" fill="#fff" opacity="0.16" />
      <rect x="186" y="168" width="48" height="20" rx="5" fill="#6B4B22" />
      <rect x="190" y="172" width="40" height="4" rx="2" fill="#fff" opacity="0.18" />

      <path
        d="M172 186h76c13 0 22 10 22 23v204c0 23-15 37-38 37h-44c-23 0-38-14-38-37V209c0-13 9-23 22-23z"
        fill="url(#roa-amberGlass)"
      />
      <path
        d="M180 200h60c8 0 13 6 13 14v188c0 17-10 27-27 27h-32c-17 0-27-10-27-27V214c0-8 5-14 13-14z"
        fill="url(#roa-amberLiquid)"
      />
      <path d="M158 218c0-10 5-16 14-18v232c-9-4-14-12-14-24V218z" fill="#fff" opacity="0.24" />
      <rect x="153" y="252" width="8" height="156" rx="4" fill="#fff" opacity="0.18" />
      <Label x={160} y={278} w={100} h={112} accent={accent} />
      <path d="M176 440h68" stroke="#fff" strokeOpacity="0.18" strokeWidth="2" strokeLinecap="round" />

      <g opacity="0.95">
        <ellipse cx="112" cy="466" rx="12" ry="8" fill="#8B6B3F" transform="rotate(-18 112 466)" />
        <ellipse cx="134" cy="480" rx="10" ry="7" fill="#A98655" transform="rotate(12 134 480)" />
        <ellipse cx="298" cy="472" rx="11" ry="7.5" fill="#8B6B3F" transform="rotate(24 298 472)" />
        <ellipse cx="322" cy="458" rx="9" ry="6" fill="#A98655" transform="rotate(-8 322 458)" />
      </g>
      <g transform="translate(118 420) rotate(-40) scale(0.8)">
        <path d={leafPath} fill="#71866A" opacity="0.9" />
      </g>
      <g transform="translate(304 424) rotate(212) scale(0.72)">
        <path d={leafPath} fill="#71866A" opacity="0.9" />
      </g>
    </g>
  )
}

function AloeJar({ accent }) {
  return (
    <g>
      <ellipse cx="210" cy="496" rx="104" ry="19" fill="#10261d" opacity="0.32" />
      <ellipse cx="210" cy="490" rx="82" ry="13" fill="#10261d" opacity="0.2" />

      <g transform="translate(96 474) rotate(-64)">
        <path d="M0 0C24-58 30-128 12-198C-8-140-14-62 0 0Z" fill="#5E8F5A" />
        <path d="M0 0C14-52 16-110 8-168" stroke="#8FBE7E" strokeWidth="2" fill="none" opacity="0.6" />
      </g>
      <g transform="translate(126 486) rotate(-30) scale(0.8)">
        <path d="M0 0C22-52 26-112 10-172C-8-122-12-56 0 0Z" fill="#7FA76C" />
      </g>
      <g transform="translate(312 482) rotate(54) scale(0.9)">
        <path d="M0 0C24-58 30-128 12-198C-8-140-14-62 0 0Z" fill="#4F7B4C" />
      </g>

      <rect x="138" y="236" width="144" height="44" rx="13" fill="url(#roa-creamLid)" />
      <rect x="146" y="248" width="128" height="4" rx="2" fill="#fff" opacity="0.4" />
      <rect x="144" y="272" width="132" height="10" rx="4" fill="#D8C9A9" />
      <path
        d="M148 280h124c10 0 18 8 18 18v140c0 24-17 42-41 42h-78c-24 0-41-18-41-42V298c0-10 8-18 18-18z"
        fill="url(#roa-aloeGlass)"
      />
      <path
        d="M158 296h104c8 0 14 6 14 14v120c0 19-12 31-31 31h-70c-19 0-31-12-31-31V310c0-8 6-14 14-14z"
        fill="#CFE7C6"
        opacity="0.42"
      />
      <rect x="152" y="306" width="10" height="118" rx="5" fill="#fff" opacity="0.35" />
      <Label x={158} y={322} w={104} h={96} accent={accent} />
      <g fill="#EAF6F0" opacity="0.8">
        <circle cx="288" cy="418" r="5" />
        <circle cx="300" cy="432" r="3.4" />
        <circle cx="132" cy="386" r="3.8" />
      </g>
      <g transform="translate(304 404) rotate(28) scale(0.7)">
        <path d={leafPath} fill="#7FAE96" />
      </g>
    </g>
  )
}

function ShampooBottle({ accent }) {
  return (
    <g>
      <ellipse cx="210" cy="500" rx="94" ry="18" fill="#10261d" opacity="0.34" />
      <g transform="translate(112 466) rotate(-22)">
        <Sprig x={0} y={0} color="#4F6B4A" scale={0.85} />
      </g>
      <g transform="translate(304 480) rotate(16)">
        <Sprig x={0} y={0} color="#71866A" scale={0.7} />
      </g>

      <rect x="203" y="88" width="14" height="80" rx="5" fill="#254C3A" />
      <path d="M203 100h28c18 0 32 14 32 32v8h-16v-6c0-10-8-18-18-18h-26z" fill="#254C3A" />
      <rect x="238" y="124" width="30" height="16" rx="8" fill="#163127" />
      <rect x="188" y="160" width="48" height="20" rx="7" fill="#1C3B2C" />

      <path
        d="M172 176h80c13 0 22 10 22 23v198c0 25-16 41-41 41h-42c-25 0-41-16-41-41V199c0-13 9-23 22-23z"
        fill="url(#roa-herbGlass)"
      />
      <path
        d="M180 192h64c8 0 13 6 13 14v184c0 19-11 30-30 30h-30c-19 0-30-11-30-30V206c0-8 5-14 13-14z"
        fill="#2F5942"
        opacity="0.55"
      />
      <rect x="155" y="220" width="9" height="150" rx="4.5" fill="#fff" opacity="0.2" />
      <Label x={160} y={268} w={100} h={120} accent={accent} />
      <path d="M186 428h48" stroke="#fff" strokeOpacity="0.16" strokeWidth="2" strokeLinecap="round" />
      <g transform="translate(304 356) rotate(30) scale(0.62)">
        <path d={leafPath} fill="#8CA37A" opacity="0.9" />
      </g>
    </g>
  )
}

function SerumBottle({ accent }) {
  return (
    <g>
      <circle cx="210" cy="250" r="150" fill="url(#roa-sunHalo)" />
      <ellipse cx="210" cy="498" rx="90" ry="17" fill="#10261d" opacity="0.34" />
      <g transform="translate(106 480) rotate(-30)">
        <path d="M0 0C20-44 24-96 10-146C-8-104-12-52 0 0Z" fill="#5E7B50" opacity="0.8" />
      </g>
      <g transform="translate(318 472) rotate(38) scale(0.8)">
        <path d="M0 0C20-44 24-96 10-146C-8-104-12-52 0 0Z" fill="#6E8B5C" opacity="0.7" />
      </g>

      <ellipse cx="210" cy="112" rx="21" ry="27" fill="#2B2A24" />
      <ellipse cx="204" cy="104" rx="6" ry="10" fill="#fff" opacity="0.18" />
      <rect x="190" y="136" width="40" height="16" rx="4" fill="#1F2A24" />
      <rect x="182" y="150" width="56" height="24" rx="5" fill="url(#roa-goldCap)" />
      <rect x="190" y="174" width="40" height="14" rx="3" fill="#6B4B22" />

      <path
        d="M177 186h66c11 0 19 8 19 19v204c0 22-15 37-37 37h-30c-22 0-37-15-37-37V205c0-11 8-19 19-19z"
        fill="url(#roa-serumGlass)"
      />
      <path
        d="M186 202h48c7 0 12 5 12 12v188c0 17-10 27-27 27h-18c-17 0-27-10-27-27V214c0-7 5-12 12-12z"
        fill="url(#roa-serumLiquid)"
        opacity="0.9"
      />
      <rect x="157" y="228" width="8" height="138" rx="4" fill="#fff" opacity="0.25" />
      <Label x={166} y={282} w={88} h={104} accent={accent} />
      <path d="M196 442h28" stroke="#fff" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" />

      <g fill="url(#roa-resin)">
        <path d="M128 474c-6-12 3-22 15-21c10 1 15 10 12 19c-3 9-20 13-27 2z" />
        <path d="M296 480c-4-11 4-19 14-18c9 1 13 9 10 17c-3 8-18 11-24 1z" />
        <path d="M148 488c-3-8 3-14 10-13c7 1 10 7 8 13c-2 6-14 8-18 0z" />
      </g>
      <path d="M210 460c-14-16 8-24 0-38c-7-12 8-18 4-30" stroke="#F1E3C2" strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round" />
      <g transform="translate(312 392) rotate(24) scale(0.6)">
        <path d={leafPath} fill="#A9B9A0" />
      </g>
    </g>
  )
}

function AlmondBottle({ accent }) {
  return (
    <g>
      <ellipse cx="210" cy="500" rx="100" ry="18" fill="#10261d" opacity="0.33" />
      <g transform="translate(108 462) rotate(-16) scale(0.85)">
        <path d="M0 0C30-28 34-70 18-104" stroke="#6E5A3A" strokeWidth="3" fill="none" />
        <Blossom x={18} y={-104} scale={1.1} />
        <Blossom x={2} y={-62} scale={0.8} />
        <path d="M4-24C-14-30-22-44-18-56C-2-54 6-42 4-24Z" fill="#71866A" />
      </g>
      <g transform="translate(318 470) rotate(24) scale(0.7)">
        <Blossom x={0} y={0} scale={1.2} />
      </g>

      <rect x="176" y="130" width="68" height="58" rx="7" fill="url(#roa-woodCap)" />
      <rect x="176" y="130" width="68" height="6" rx="3" fill="#fff" opacity="0.2" />
      <path d="M186 148h48M182 162h56M188 174h40" stroke="#5A4326" strokeWidth="1" opacity="0.35" />
      <rect x="190" y="186" width="40" height="16" rx="3" fill="#7B5A31" />

      <path
        d="M170 200h80c14 0 24 11 24 25v186c0 24-16 39-40 39h-48c-24 0-40-15-40-39V225c0-14 10-25 24-25z"
        fill="url(#roa-almondGlass)"
      />
      <path
        d="M179 214h62c8 0 13 6 13 14v174c0 18-11 29-29 29h-30c-18 0-29-11-29-29V228c0-8 5-14 13-14z"
        fill="#8F5E2C"
        opacity="0.45"
      />
      <rect x="153" y="240" width="9" height="146" rx="4.5" fill="#fff" opacity="0.2" />
      <Label x={160} y={286} w={100} h={112} accent={accent} />
      <path d="M186 438h48" stroke="#fff" strokeOpacity="0.16" strokeWidth="2" strokeLinecap="round" />

      <g>
        <Almond x={112} y={470} rotate={-24} scale={0.95} />
        <Almond x={140} y={486} rotate={12} scale={0.8} />
        <Almond x={300} y={476} rotate={30} scale={0.9} />
        <Almond x={324} y={458} rotate={-10} scale={0.7} />
      </g>
    </g>
  )
}

export default function ProductArt({ product, className = '' }) {
  const accent = product?.accent || '#C8A96A'
  const bottles = {
    jojoba: <DropperBottle accent={accent} />,
    aloe: <AloeJar accent={accent} />,
    shampoo: <ShampooBottle accent={accent} />,
    serum: <SerumBottle accent={accent} />,
    almond: <AlmondBottle accent={accent} />,
  }

  return (
    <svg
      viewBox="0 0 420 560"
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMax meet"
    >
      {bottles[product?.bottle] || bottles.jojoba}
    </svg>
  )
}
