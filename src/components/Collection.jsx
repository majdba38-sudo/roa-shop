import { motion } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import ProductArt from './ProductArt'
import { useLang } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { products } from '../data/products'
import { productName, productTag } from '../lib/format'

function hexToRgba(hex, alpha) {
  const clean = hex.replace('#', '')
  const value = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean
  const int = parseInt(value, 16)
  const r = (int >> 16) & 255
  const g = (int >> 8) & 255
  const b = int & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export default function Collection() {
  const { c, lang } = useLang()
  const { addItem } = useCart()
  const { showToast } = useToast()

  const add = (product) => {
    addItem(product.id, 1)
    showToast(`${productName(product, lang)} — ${c.toast.added}`)
  }

  return (
    <section id="collection" className="grain relative overflow-hidden bg-ivory">
      <div className="container-x section-pad relative z-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="eyebrow text-botanical"
            >
              <span className="eyebrow-line" aria-hidden="true" />
              {c.collection.label}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.06 }}
              className={`mt-5 whitespace-pre-line text-forest ${
                lang === 'ar'
                  ? 'font-amiri text-[clamp(2.1rem,4.6vw,3.8rem)] font-bold leading-[1.4]'
                  : 'font-display text-[clamp(2.4rem,4.8vw,4.2rem)] font-light leading-[1.03]'
              }`}
            >
              {c.collection.title}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.14 }}
            className={`max-w-md text-forest/60 ${
              lang === 'ar'
                ? 'font-arabic text-[0.94rem] leading-[1.95]'
                : 'font-sans text-[0.9rem] font-light leading-[1.85]'
            }`}
          >
            {c.collection.body}
          </motion.p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {products.map((product, index) => {
            const name = productName(product, lang)
            const spans = index === 0 ? 'lg:col-span-7' : index === 1 ? 'lg:col-span-5 lg:mt-14' : 'lg:col-span-4'
            return (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.75, delay: index * 0.05 }}
                className={`group relative flex min-h-[26rem] flex-col overflow-hidden rounded-[1.75rem] border border-forest/10 p-5 sm:p-6 lg:min-h-[30rem] ${spans}`}
                style={{
                  background: `radial-gradient(circle at 72% 18%, ${hexToRgba(product.accent, 0.28)}, transparent 58%), linear-gradient(155deg, #F6F4EC 0%, #E9EBDD 100%)`,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border border-forest/10 bg-ivory/60 px-3 py-1.5 text-forest/65 backdrop-blur-sm ${
                      lang === 'ar' ? 'font-arabic text-[0.7rem]' : 'font-sans text-[0.54rem] uppercase tracking-[0.14em]'
                    }`}
                  >
                    <span className="h-1 w-1 rounded-full" style={{ backgroundColor: product.accent }} aria-hidden="true" />
                    {productTag(product, lang)}
                  </span>
                  <span className="font-display text-[0.7rem] tracking-[0.2em] text-forest/30">
                    {String(product.station).padStart(2, '0')}
                  </span>
                </div>

                <div className="relative flex flex-1 items-center justify-center py-3">
                  <span
                    aria-hidden="true"
                    className="absolute h-40 w-40 rounded-full bg-white/30 blur-2xl transition-transform duration-700 group-hover:scale-125 sm:h-52 sm:w-52"
                  />
                  {product.photo ? (
                    <img
                      src={product.photo}
                      alt={`${name} ${c.station.imageAltSuffix}`}
                      loading="lazy"
                      decoding="async"
                      className="relative h-[12rem] w-auto max-w-full object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.03] sm:h-[14rem] lg:h-[16rem]"
                    />
                  ) : (
                    <ProductArt
                      product={product}
                      className="relative h-[13.5rem] w-auto max-w-full transition-transform duration-700 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.03] sm:h-[15rem] lg:h-[17rem]"
                    />
                  )}
                </div>

                <div className="relative flex items-end justify-between gap-4 border-t border-forest/10 pt-4">
                  <div className="min-w-0">
                    <h3 className={`truncate text-forest ${lang === 'ar' ? 'font-arabic text-[1.05rem] font-medium' : 'font-display text-[1.5rem] font-medium leading-none'}`}>
                      {lang === 'ar' ? product.nameAr : product.nameEn}
                    </h3>
                    <p className={`mt-1.5 truncate text-forest/50 ${lang === 'ar' ? 'font-sans text-[0.68rem] uppercase tracking-[0.12em]' : 'font-arabic text-[0.78rem]'}`} dir={lang === 'ar' ? 'ltr' : 'rtl'}>
                      {lang === 'ar' ? product.nameEn : product.nameAr}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className={`text-forest ${lang === 'ar' ? 'font-arabic text-[1rem] font-bold' : 'font-display text-[1.15rem] font-medium'}`}>
                        {product.price}
                      </span>
                      <span className="price-currency text-forest/45">{c.common.currency}</span>
                      <a
                        href={`#station-${product.station}`}
                        className={`ms-1 inline-flex items-center gap-1 text-forest/45 transition-colors hover:text-forest ${
                          lang === 'ar' ? 'font-arabic text-[0.68rem]' : 'font-sans text-[0.54rem] uppercase tracking-[0.12em]'
                        }`}
                      >
                        {c.collection.view}
                        <ArrowUpRight size={11} strokeWidth={1.6} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => add(product)}
                    aria-label={`${c.station.addToCart} — ${name}`}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest text-ivory shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-deep"
                  >
                    <Plus size={17} strokeWidth={1.7} aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
