import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Leaf, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import ProductArt from './ProductArt'
import { useLang } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { useFocusTrap } from '../lib/useFocusTrap'
import { formatPrice, itemsLabel, productName } from '../lib/format'

function Stepper({ item, setQty, c, maxQty }) {
  return (
    <div className="flex items-center rounded-full border border-forest/15 bg-white/60 p-0.5">
      <button
        type="button"
        onClick={() => setQty(item.id, item.qty - 1)}
        disabled={item.qty <= 1}
        aria-label={c.station.decrease}
        className="grid h-7 w-7 place-items-center rounded-full text-forest transition-colors hover:bg-forest/8 disabled:opacity-30"
      >
        <Minus size={12} strokeWidth={1.8} aria-hidden="true" />
      </button>
      <span className="grid w-6 place-items-center text-[0.8rem] font-medium text-forest" aria-live="polite">
        {item.qty}
      </span>
      <button
        type="button"
        onClick={() => setQty(item.id, item.qty + 1)}
        disabled={item.qty >= maxQty}
        aria-label={c.station.increase}
        className="grid h-7 w-7 place-items-center rounded-full text-forest transition-colors hover:bg-forest/8 disabled:opacity-30"
      >
        <Plus size={12} strokeWidth={1.8} aria-hidden="true" />
      </button>
    </div>
  )
}

export default function CartDrawer() {
  const { c, lang, dir } = useLang()
  const { detailedItems, count, subtotal, isCartOpen, closeCart, setQty, removeItem, openCheckout, maxQty } = useCart()
  const { showToast } = useToast()
  const panelRef = useRef(null)

  useFocusTrap(isCartOpen, panelRef, closeCart)

  const close = () => closeCart()
  const goToCheckout = () => {
    closeCart()
    openCheckout()
  }

  const handleRemove = (item) => {
    removeItem(item.id)
    showToast(`${productName(item.product, lang)} — ${c.toast.removed}`)
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[80]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="absolute inset-0 bg-forest-deep/55 backdrop-blur-[3px]"
            aria-hidden="true"
          />

          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: dir === 'rtl' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: dir === 'rtl' ? '-100%' : '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 end-0 top-0 flex w-full flex-col bg-ivory shadow-2xl sm:max-w-[27rem]"
          >
            <header className="flex items-start justify-between gap-4 border-b border-forest/10 px-5 py-5 sm:px-6">
              <div>
                <h2 id="cart-title" className={`text-forest ${lang === 'ar' ? 'font-arabic text-[1.15rem] font-bold' : 'font-display text-[1.7rem] font-medium leading-none'}`}>
                  {c.cart.title}
                </h2>
                <p className={`mt-1.5 text-forest/45 ${lang === 'ar' ? 'font-arabic text-[0.76rem]' : 'font-sans text-[0.7rem]'}`} aria-live="polite">
                  {count > 0 ? itemsLabel(count, lang) : c.cart.cartIsEmpty}
                </p>
              </div>
              <button type="button" onClick={close} data-testid="cart-close" aria-label={c.cart.close} className="icon-btn -me-1 h-9 w-9 text-forest/70 hover:bg-forest/8">
                <X size={19} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </header>

            {detailedItems.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="relative grid h-28 w-28 place-items-center rounded-full border border-forest/10 bg-sage-light/40">
                  <Leaf size={44} strokeWidth={0.9} className="text-botanical" aria-hidden="true" />
                  <span className="absolute -end-1 top-4 h-2.5 w-2.5 rounded-full bg-sky/70" aria-hidden="true" />
                </span>
                <h3 className={`mt-7 text-forest ${lang === 'ar' ? 'font-amiri text-[1.5rem] font-bold leading-[1.5]' : 'font-display text-[1.8rem] font-light leading-tight'}`}>
                  {c.cart.emptyTitle}
                </h3>
                <p className={`mt-2.5 max-w-xs text-forest/50 ${lang === 'ar' ? 'font-arabic text-[0.86rem] leading-[1.9]' : 'font-sans text-[0.84rem] font-light leading-[1.8]'}`}>
                  {c.cart.emptyBody}
                </p>
                <a href="#station-1" onClick={close} className="btn btn-primary mt-6">
                  {c.cart.emptyCta}
                  {dir === 'rtl' ? <ArrowLeft size={15} strokeWidth={1.6} aria-hidden="true" /> : <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />}
                </a>
              </div>
            ) : (
              <>
                <div className="modal-scroll flex-1 overflow-y-auto px-5 py-2 sm:px-6">
                  <ul className="divide-y divide-forest/8">
                    {detailedItems.map((item) => {
                      const name = productName(item.product, lang)
                      return (
                        <li key={item.id} className="flex gap-3 py-4">
                          <a
                            href={`#station-${item.product.station}`}
                            onClick={close}
                            className="relative h-[5.5rem] w-[4.4rem] shrink-0 overflow-hidden rounded-xl border border-forest/10 bg-gradient-to-b from-sage-light/50 to-beige/40"
                            aria-label={`${c.cart.viewProduct} — ${name}`}
                          >
                            {item.product.photo ? (
                              <img
                                src={item.product.photo}
                                alt={name}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-contain p-1.5 mix-blend-multiply"
                              />
                            ) : (
                              <ProductArt product={item.product} className="h-full w-full" />
                            )}
                          </a>

                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <a
                                href={`#station-${item.product.station}`}
                                onClick={close}
                                className={`line-clamp-2 text-forest transition-colors hover:text-botanical ${lang === 'ar' ? 'font-arabic text-[0.88rem] font-medium leading-[1.6]' : 'font-sans text-[0.84rem] font-normal leading-[1.5]'}`}
                              >
                                {name}
                              </a>
                              <button
                                type="button"
                                onClick={() => handleRemove(item)}
                                aria-label={`${c.cart.remove} — ${name}`}
                                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-forest/35 transition-colors hover:bg-forest/5 hover:text-forest/70"
                              >
                                <Trash2 size={14} strokeWidth={1.5} aria-hidden="true" />
                              </button>
                            </div>
                            <p className={`mt-1 text-forest/45 ${lang === 'ar' ? 'font-arabic text-[0.72rem]' : 'font-sans text-[0.68rem]'}`}>
                              {formatPrice(item.product.price, lang)} · {c.cart.each}
                            </p>
                            <div className="mt-auto flex items-center justify-between gap-2 pt-2.5">
                              <Stepper item={item} setQty={setQty} c={c} maxQty={maxQty} />
                              <span className={`text-forest ${lang === 'ar' ? 'font-arabic text-[0.86rem] font-bold' : 'font-sans text-[0.84rem] font-medium'}`}>
                                {formatPrice(item.product.price * item.qty, lang)}
                              </span>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <footer className="border-t border-forest/10 bg-ivory px-5 pb-5 pt-4 sm:px-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className={`text-forest/55 ${lang === 'ar' ? 'font-arabic text-[0.84rem]' : 'font-sans text-[0.72rem] uppercase tracking-[0.14em]'}`}>
                      {c.cart.subtotal}
                    </span>
                    <span className={`text-forest ${lang === 'ar' ? 'font-arabic text-[1.2rem] font-bold' : 'font-display text-[1.45rem] font-medium'}`}>
                      {formatPrice(subtotal, lang)}
                    </span>
                  </div>
                  <p className={`mt-2 text-forest/40 ${lang === 'ar' ? 'font-arabic text-[0.7rem] leading-[1.7]' : 'font-sans text-[0.66rem] leading-[1.6]'}`}>
                    {c.cart.deliveryNote}
                  </p>
                  <button type="button" onClick={goToCheckout} data-testid="cart-checkout" className="btn btn-primary mt-4 w-full">
                    <ShoppingBag size={16} strokeWidth={1.6} aria-hidden="true" />
                    {c.cart.checkout}
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className={`mx-auto mt-3 block text-forest/50 transition-colors hover:text-forest ${lang === 'ar' ? 'font-arabic text-[0.78rem]' : 'font-sans text-[0.66rem] uppercase tracking-[0.14em]'}`}
                  >
                    {c.cart.continue}
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
