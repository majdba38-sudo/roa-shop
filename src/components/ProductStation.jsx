import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Check, Leaf, Minus, Plus, ShoppingBag, Zap } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { products } from '../data/products'
import { productDesc, productInspired, productName, productTag } from '../lib/format'
import ProductStage from './ProductStage'

export default function ProductStation({ product, index }) {
  const { c, lang } = useLang()
  const { addItem, openCheckout } = useCart()
  const { showToast } = useToast()
  const [qty, setQty] = useState(1)
  const [justAdded, setJustAdded] = useState(false)
  const nextProduct = products[index + 1]
  const flip = index % 2 === 1
  const name = productName(product, lang)

  const add = () => {
    addItem(product.id, qty)
    showToast(`${name} — ${c.toast.added}`)
    setJustAdded(true)
    window.setTimeout(() => setJustAdded(false), 1600)
  }

  const buyNow = () => {
    addItem(product.id, qty)
    openCheckout()
  }

  return (
    <section
      id={`station-${product.station}`}
      data-station={product.station}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden py-24 sm:py-28 lg:py-32"
      aria-labelledby={`station-title-${product.id}`}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <img
          data-station-bg
          src={product.scene}
          srcSet={product.sceneSm ? `${product.sceneSm} 1000w, ${product.scene} 1900w` : undefined}
          sizes="100vw"
          alt=""
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className="station-bg-img absolute -top-[6%] h-[112%] w-full object-cover"
          style={{ objectPosition: product.scenePosition }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: product.tint }} />
        <div className="station-scrim absolute inset-0" />
      </div>

      <div className="container-x relative">
        <div className="mb-6 flex items-center gap-4 text-ivory/75 sm:mb-8">
          <span className={`${lang === 'ar' ? 'font-arabic text-[0.8rem]' : 'font-sans text-[0.6rem] uppercase tracking-[0.28em]'}`}>
            {c.station.label} {String(product.station).padStart(2, '0')}
          </span>
          <span className="h-px w-10 bg-ivory/30 sm:w-16" aria-hidden="true" />
          <span className={`${lang === 'ar' ? 'font-arabic text-[0.78rem]' : 'font-sans text-[0.58rem] uppercase tracking-[0.18em]'}`}>
            {productTag(product, lang)}
          </span>
          <span
            dir="ltr"
            className={`ms-auto hidden text-ivory/45 sm:block ${lang === 'ar' ? 'font-arabic text-[0.72rem]' : 'font-sans text-[0.58rem] tracking-[0.18em]'}`}
          >
            {String(product.station).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
          </span>
        </div>

        <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className={`lg:col-span-6 ${flip ? 'lg:order-2 lg:col-start-7' : 'lg:order-1'}`}
          >
            <ProductStage product={product} priority={index === 0} className="h-[56vh] min-h-[23rem] sm:h-[62vh] lg:h-[68vh] lg:max-h-[44rem]" />
            <p className={`mt-3 text-center text-ivory/45 ${lang === 'ar' ? 'font-arabic text-[0.7rem]' : 'font-sans text-[0.56rem] uppercase tracking-[0.14em]'}`}>
              {c.station.illustrativeLong}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`lg:col-span-5 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:order-2 lg:col-start-8'}`}
          >
            <div className="relative rounded-[1.75rem] border border-white/60 bg-ivory/95 p-6 shadow-panel backdrop-blur-md sm:p-8 lg:p-9">
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`inline-flex items-center gap-2 rounded-full bg-sage-light/60 px-3 py-1.5 text-forest/75 ${
                    lang === 'ar' ? 'font-arabic text-[0.75rem]' : 'font-sans text-[0.58rem] uppercase tracking-[0.16em]'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: product.accent }} aria-hidden="true" />
                  {productTag(product, lang)}
                </span>
                <span className="font-display text-[0.72rem] tracking-[0.22em] text-forest/35">
                  {String(product.station).padStart(2, '0')}
                </span>
              </div>

              <h2 id={`station-title-${product.id}`} className="mt-5 text-forest">
                <span
                  className={`block ${
                    lang === 'ar'
                      ? 'font-amiri text-[clamp(1.9rem,3vw,2.7rem)] font-bold leading-[1.35]'
                      : 'font-display text-[clamp(2.05rem,3.2vw,2.85rem)] font-medium leading-[1.02]'
                  }`}
                >
                  {lang === 'ar' ? product.nameAr : product.nameEn}
                </span>
                <span
                  dir={lang === 'ar' ? 'ltr' : 'rtl'}
                  className={`mt-1.5 block text-forest/55 ${
                    lang === 'ar'
                      ? 'font-display text-[1.05rem] italic tracking-[0.02em]'
                      : 'font-arabic text-[0.95rem]'
                  }`}
                >
                  {lang === 'ar' ? product.nameEn : product.nameAr}
                </span>
              </h2>

              <p
                className={`mt-5 text-forest/68 ${
                  lang === 'ar'
                    ? 'font-arabic text-[0.94rem] leading-[1.95]'
                    : 'font-sans text-[0.92rem] font-light leading-[1.85]'
                }`}
              >
                {productDesc(product, lang)}
              </p>

              <div className="mt-5 flex items-center gap-2 text-botanical">
                <Leaf size={14} strokeWidth={1.5} aria-hidden="true" />
                <span className={`${lang === 'ar' ? 'font-arabic text-[0.8rem]' : 'font-sans text-[0.66rem] uppercase tracking-[0.12em]'}`}>
                  {c.station.inspired} {productInspired(product, lang)}
                </span>
              </div>

              <div className="my-6 h-px bg-forest/10" aria-hidden="true" />

              <div className="flex items-end gap-4">
                <div>
                  <span className={`block text-forest/45 ${lang === 'ar' ? 'font-arabic text-[0.72rem]' : 'font-sans text-[0.58rem] uppercase tracking-[0.16em]'}`}>
                    {c.station.priceLabel}
                  </span>
                  <span className="mt-1 flex items-baseline gap-1.5 text-forest">
                    <span className={`${lang === 'ar' ? 'font-arabic text-[2rem] font-bold' : 'font-display text-[2.4rem] font-medium leading-none'}`}>
                      {product.price}
                    </span>
                    <span className="price-currency text-forest/55">{c.common.currency}</span>
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <span className={`mb-2 block text-forest/55 ${lang === 'ar' ? 'font-arabic text-[0.78rem]' : 'font-sans text-[0.6rem] uppercase tracking-[0.16em]'}`}>
                  {c.station.quantity}
                </span>
                <div className="flex items-stretch gap-2.5">
                  <div className="flex items-center rounded-full border border-forest/15 bg-white/60 p-1">
                    <button
                      type="button"
                      onClick={() => setQty((value) => Math.max(1, value - 1))}
                      disabled={qty <= 1}
                      aria-label={c.station.decrease}
                      className="grid h-9 w-9 place-items-center rounded-full text-forest transition-colors hover:bg-forest/8 disabled:opacity-30"
                    >
                      <Minus size={14} strokeWidth={1.8} aria-hidden="true" />
                    </button>
                    <span className="grid w-8 place-items-center text-center text-[0.92rem] font-medium text-forest" aria-live="polite">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty((value) => Math.min(99, value + 1))}
                      disabled={qty >= 99}
                      aria-label={c.station.increase}
                      className="grid h-9 w-9 place-items-center rounded-full text-forest transition-colors hover:bg-forest/8 disabled:opacity-30"
                    >
                      <Plus size={14} strokeWidth={1.8} aria-hidden="true" />
                    </button>
                  </div>
                  <button type="button" onClick={add} data-testid={`add-to-cart-${product.id}`} className="btn btn-primary flex-1 px-4!">
                    {justAdded ? <Check size={16} strokeWidth={1.8} aria-hidden="true" /> : <ShoppingBag size={16} strokeWidth={1.6} aria-hidden="true" />}
                    <span>{justAdded ? c.station.inCart : c.station.addToCart}</span>
                  </button>
                </div>
              </div>

              <button type="button" onClick={buyNow} data-testid={`buy-now-${product.id}`} className="btn btn-outline mt-3 w-full">
                <Zap size={15} strokeWidth={1.6} aria-hidden="true" />
                {c.station.buyNow}
              </button>

              <p className={`mt-4 flex items-center gap-2 text-forest/45 ${lang === 'ar' ? 'font-arabic text-[0.7rem]' : 'font-sans text-[0.58rem]'}`}>
                <span className="h-1 w-1 rounded-full bg-botanical" aria-hidden="true" />
                {c.station.note}
              </p>

              {nextProduct ? (
                <a
                  href={`#station-${nextProduct.station}`}
                  className={`group mt-5 flex items-center justify-between border-t border-forest/10 pt-4 text-forest/55 transition-colors hover:text-forest ${
                    lang === 'ar' ? 'font-arabic text-[0.78rem]' : 'font-sans text-[0.58rem] uppercase tracking-[0.16em]'
                  }`}
                >
                  {c.station.next}
                  <ArrowDown size={14} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-y-1" aria-hidden="true" />
                </a>
              ) : (
                <a
                  href="#collection"
                  className={`group mt-5 flex items-center justify-between border-t border-forest/10 pt-4 text-forest/55 transition-colors hover:text-forest ${
                    lang === 'ar' ? 'font-arabic text-[0.78rem]' : 'font-sans text-[0.58rem] uppercase tracking-[0.16em]'
                  }`}
                >
                  {c.collection.allProducts}
                  <ArrowDown size={14} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-y-1" aria-hidden="true" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
