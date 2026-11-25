import { BadgeCheck, Leaf } from 'lucide-react'
import ProductArt from './ProductArt'
import { useLang } from '../context/LanguageContext'
import { productInspired } from '../lib/format'

export default function ProductStage({ product, priority = false, className = '' }) {
  const { c, lang } = useLang()

  return (
    <div
      className={`product-stage grain ${className}`}
      style={{ '--stage-tint': product.tint }}
    >
      <img
        src={product.scene}
        srcSet={product.sceneSm ? `${product.sceneSm} 1000w, ${product.scene} 1900w` : undefined}
        sizes="(min-width: 1024px) 46vw, 100vw"
        alt={lang === 'ar' ? product.sceneAltAr : product.sceneAltEn}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="product-stage-img"
        style={{ objectPosition: product.scenePosition }}
      />
      <div className="product-stage-tint" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-forest-deep/5 to-forest-deep/25"
        aria-hidden="true"
      />

      <div className="product-arch" aria-hidden="true" />

      {product.photo ? (
        <div className="product-photo-wrap">
          <img
            src={product.photo}
            alt={`${lang === 'ar' ? product.nameAr : product.nameEn} — ${
              lang === 'ar' ? 'صورة المنتج' : 'product photo'
            }`}
            loading="lazy"
            decoding="async"
            className="product-photo"
          />
        </div>
      ) : (
        <div className="absolute inset-0 z-[2] flex items-end justify-center pb-[3%]">
          <div className="product-float h-[93%] w-[88%]">
            <ProductArt product={product} className="product-art" />
          </div>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 z-[3] h-1/3 bg-gradient-to-t from-forest-deep/70 to-transparent" aria-hidden="true" />

      <div
        className={`absolute start-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-ivory/20 bg-forest-deep/45 px-3 py-1.5 text-ivory/85 backdrop-blur-md ${
          lang === 'ar' ? 'font-arabic text-[0.7rem]' : 'font-sans text-[0.55rem] uppercase tracking-[0.16em]'
        }`}
      >
        <BadgeCheck size={12} strokeWidth={1.6} aria-hidden="true" />
        {c.station.illustrative}
      </div>

      <div className="absolute bottom-4 end-5 z-10 text-end">
        <span className="station-numeral text-[5.5rem] sm:text-[7rem]">
          {String(product.station).padStart(2, '0')}
        </span>
      </div>

      <div className="absolute bottom-4 start-4 z-10 flex items-center gap-2.5 rounded-full border border-ivory/20 bg-ivory/90 py-1 ps-1 pe-4 shadow-md backdrop-blur-sm">
        <span className="relative block h-9 w-9 overflow-hidden rounded-full bg-sage-light">
          <img
            src={product.ingredientImage}
            alt={lang === 'ar' ? product.ingredientAltAr : product.ingredientAltEn}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </span>
        <span className="flex flex-col leading-tight text-forest">
          <span className={`${lang === 'ar' ? 'font-arabic text-[0.72rem]' : 'font-sans text-[0.55rem] uppercase tracking-[0.14em]'} opacity-55`}>
            {c.station.inspired}
          </span>
          <span className={`${lang === 'ar' ? 'font-arabic text-[0.8rem] font-medium' : 'font-sans text-[0.7rem]'}`}>
            {productInspired(product, lang)}
          </span>
        </span>
        <Leaf size={13} strokeWidth={1.5} className="text-botanical" aria-hidden="true" />
      </div>
    </div>
  )
}
