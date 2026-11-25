import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Info, Leaf, MessageCircle, X } from 'lucide-react'
import ProductArt from './ProductArt'
import { useLang } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { useFocusTrap } from '../lib/useFocusTrap'
import { formatPrice, itemsLabel, orderRef, productName } from '../lib/format'
import { buildOrderMessage, buildWhatsAppUrl, isValidSaudiPhone } from '../lib/whatsapp'

const emptyForm = {
  fullName: '',
  mobile: '',
  city: '',
  district: '',
  address: '',
  notes: '',
}

export default function CheckoutModal() {
  const { c, lang, dir } = useLang()
  const { detailedItems, subtotal, count, isCheckoutOpen, closeCheckout } = useCart()
  const { showToast } = useToast()
  const panelRef = useRef(null)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)

  useFocusTrap(isCheckoutOpen, panelRef, closeCheckout)

  useEffect(() => {
    if (isCheckoutOpen) {
      setSubmitted(null)
      setErrors({})
    }
  }, [isCheckoutOpen])

  const update = (field) => (event) => {
    const value = event.target.value
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!current[field] && !current.general) return current
      const next = { ...current }
      delete next[field]
      delete next.general
      return next
    })
  }

  const validate = () => {
    const next = {}
    if (form.fullName.trim().length < 2) next.fullName = c.errors.fullName
    if (!isValidSaudiPhone(form.mobile)) next.mobile = c.errors.mobile
    if (!form.city.trim()) next.city = c.errors.city
    if (!form.district.trim()) next.district = c.errors.district
    if (form.address.trim().length < 5) next.address = c.errors.address
    if (detailedItems.length === 0) next.general = c.errors.emptyCart
    setErrors(next)
    const first = ['fullName', 'mobile', 'city', 'district', 'address'].find((key) => next[key])
    if (first) document.getElementById(`field-${first}`)?.focus()
    return Object.keys(next).length === 0
  }

  const submit = (event) => {
    event.preventDefault()
    if (!validate()) return

    const ref = orderRef()
    const message = buildOrderMessage({
      orderNumber: ref,
      items: detailedItems,
      subtotal,
      customer: form,
      lang,
    })
    const url = buildWhatsAppUrl(message)
    if (!url) {
      setErrors({ general: c.errors.whatsapp })
      return
    }
    window.open(url, '_blank', 'noopener,noreferrer')
    setSubmitted({ ref, url })
    showToast(c.toast.orderReady)
  }

  const fieldError = (key) => (errors[key] ? `field-${key}-error` : undefined)

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[90]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCheckout}
            className="absolute inset-0 bg-forest-deep/65 backdrop-blur-[4px]"
            aria-hidden="true"
          />

          <div className="pointer-events-none absolute inset-0 flex items-stretch justify-center sm:items-center sm:p-5">
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="checkout-title"
              initial={{ opacity: 0, y: dir === 'rtl' ? 18 : 24, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto relative flex h-full w-full flex-col overflow-hidden bg-ivory shadow-2xl sm:h-auto sm:max-h-[92vh] sm:max-w-5xl sm:rounded-[2rem]"
            >
              <header className="flex items-start justify-between gap-4 border-b border-forest/10 px-5 py-4 sm:px-8 sm:py-5">
                <div>
                  <h2 id="checkout-title" className={`text-forest ${lang === 'ar' ? 'font-arabic text-[1.15rem] font-bold' : 'font-display text-[1.75rem] font-medium leading-none'}`}>
                    {submitted ? c.checkout.successTitle : c.checkout.title}
                  </h2>
                  <p className={`mt-1.5 text-forest/45 ${lang === 'ar' ? 'font-arabic text-[0.76rem]' : 'font-sans text-[0.74rem]'}`}>
                    {submitted ? `${c.checkout.orderNumber} · ${submitted.ref}` : c.checkout.subtitle}
                  </p>
                </div>
                <button type="button" onClick={closeCheckout} aria-label={c.checkout.close} className="icon-btn -me-1 h-9 w-9 text-forest/70 hover:bg-forest/8">
                  <X size={19} strokeWidth={1.5} aria-hidden="true" />
                </button>
              </header>

              <div className="modal-scroll flex-1 overflow-y-auto">
                {submitted ? (
                  <div className="flex min-h-[26rem] flex-col items-center justify-center px-6 py-12 text-center">
                    <motion.span
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                      className="grid h-20 w-20 place-items-center rounded-full bg-sage-light/60 text-forest"
                    >
                      <Check size={34} strokeWidth={1.6} aria-hidden="true" />
                    </motion.span>
                    <h3 className={`mt-6 text-forest ${lang === 'ar' ? 'font-amiri text-[1.8rem] font-bold leading-[1.4]' : 'font-display text-[2.2rem] font-light leading-tight'}`}>
                      {c.checkout.successTitle}
                    </h3>
                    <p className={`mt-3 max-w-md text-forest/55 ${lang === 'ar' ? 'font-arabic text-[0.9rem] leading-[1.95]' : 'font-sans text-[0.88rem] font-light leading-[1.8]'}`}>
                      {c.checkout.successBody}
                    </p>

                    <div className="mt-6 rounded-full border border-forest/15 bg-white/60 px-5 py-2">
                      <span className={`text-forest/45 ${lang === 'ar' ? 'font-arabic text-[0.72rem]' : 'font-sans text-[0.6rem] uppercase tracking-[0.16em]'}`}>
                        {c.checkout.orderNumber}
                      </span>
                      <span dir="ltr" className="ms-2 font-sans text-[0.9rem] font-medium tracking-[0.1em] text-forest">
                        {submitted.ref}
                      </span>
                    </div>

                    <a href={submitted.url} target="_blank" rel="noopener noreferrer" data-testid="whatsapp-link" className="btn btn-primary mt-6">
                      <MessageCircle size={17} strokeWidth={1.6} aria-hidden="true" />
                      {c.checkout.openAgain}
                    </a>
                    <button type="button" onClick={closeCheckout} className={`mt-4 text-forest/45 transition-colors hover:text-forest ${lang === 'ar' ? 'font-arabic text-[0.8rem]' : 'font-sans text-[0.66rem] uppercase tracking-[0.14em]'}`}>
                      {c.checkout.close}
                    </button>
                    <p className={`mt-6 max-w-sm text-forest/35 ${lang === 'ar' ? 'font-arabic text-[0.7rem] leading-[1.8]' : 'font-sans text-[0.66rem] leading-[1.7]'}`}>
                      {c.checkout.keepNote}
                    </p>
                  </div>
                ) : detailedItems.length === 0 ? (
                  <div className="flex min-h-[24rem] flex-col items-center justify-center px-8 text-center">
                    <span className="grid h-20 w-20 place-items-center rounded-full border border-forest/10 bg-sage-light/40 text-botanical">
                      <Leaf size={32} strokeWidth={1} aria-hidden="true" />
                    </span>
                    <h3 className={`mt-6 text-forest ${lang === 'ar' ? 'font-amiri text-[1.6rem] font-bold' : 'font-display text-[2rem] font-light'}`}>
                      {c.cart.emptyTitle}
                    </h3>
                    <p className={`mt-2 max-w-sm text-forest/50 ${lang === 'ar' ? 'font-arabic text-[0.86rem] leading-[1.9]' : 'font-sans text-[0.84rem] leading-[1.8]'}`}>
                      {c.cart.emptyBody}
                    </p>
                    <a href="#station-1" onClick={closeCheckout} className="btn btn-primary mt-6">
                      {c.cart.emptyCta}
                    </a>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate data-testid="checkout-form" className="grid gap-8 px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-2 text-forest/50">
                        <span className="h-px w-6 bg-current" aria-hidden="true" />
                        <span className={`${lang === 'ar' ? 'font-arabic text-[0.78rem]' : 'font-sans text-[0.58rem] uppercase tracking-[0.18em]'}`}>
                          {c.checkout.orderDetails}
                        </span>
                      </div>

                      {errors.general && (
                        <div role="alert" className="mt-4 rounded-xl border border-[#b4553f]/25 bg-[#b4553f]/5 px-4 py-3 text-[0.8rem] text-[#8f3f2e]">
                          {errors.general}
                        </div>
                      )}

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="field-fullName" className="field-label">
                            {c.checkout.fullName} <span className="text-[#b4553f]">*</span>
                          </label>
                          <input
                            id="field-fullName"
                            name="name"
                            autoComplete="name"
                            value={form.fullName}
                            onChange={update('fullName')}
                            placeholder={c.checkout.fullNamePlaceholder}
                            className="field"
                            aria-invalid={Boolean(errors.fullName)}
                            aria-describedby={fieldError('fullName')}
                            required
                          />
                          {errors.fullName && (
                            <p id="field-fullName-error" role="alert" className="mt-1.5 text-[0.72rem] text-[#b4553f]">
                              {errors.fullName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="field-mobile" className="field-label">
                            {c.checkout.mobile} <span className="text-[#b4553f]">*</span>
                          </label>
                          <input
                            id="field-mobile"
                            name="tel"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            dir="ltr"
                            value={form.mobile}
                            onChange={update('mobile')}
                            placeholder={c.checkout.mobilePlaceholder}
                            className="field text-start"
                            aria-invalid={Boolean(errors.mobile)}
                            aria-describedby={fieldError('mobile') || 'mobile-hint'}
                            required
                          />
                          <p id="mobile-hint" className={`mt-1.5 text-forest/35 ${lang === 'ar' ? 'font-arabic text-[0.68rem]' : 'font-sans text-[0.66rem]'}`}>
                            {c.checkout.phoneHint}
                          </p>
                          {errors.mobile && (
                            <p id="field-mobile-error" role="alert" className="mt-1 text-[0.72rem] text-[#b4553f]">
                              {errors.mobile}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="field-city" className="field-label">
                            {c.checkout.city} <span className="text-[#b4553f]">*</span>
                          </label>
                          <input
                            id="field-city"
                            name="address-level2"
                            autoComplete="address-level2"
                            value={form.city}
                            onChange={update('city')}
                            placeholder={c.checkout.cityPlaceholder}
                            className="field"
                            aria-invalid={Boolean(errors.city)}
                            aria-describedby={fieldError('city')}
                            required
                          />
                          {errors.city && (
                            <p id="field-city-error" role="alert" className="mt-1.5 text-[0.72rem] text-[#b4553f]">
                              {errors.city}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="field-district" className="field-label">
                            {c.checkout.district} <span className="text-[#b4553f]">*</span>
                          </label>
                          <input
                            id="field-district"
                            name="address-level3"
                            autoComplete="address-level3"
                            value={form.district}
                            onChange={update('district')}
                            placeholder={c.checkout.districtPlaceholder}
                            className="field"
                            aria-invalid={Boolean(errors.district)}
                            aria-describedby={fieldError('district')}
                            required
                          />
                          {errors.district && (
                            <p id="field-district-error" role="alert" className="mt-1.5 text-[0.72rem] text-[#b4553f]">
                              {errors.district}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="field-address" className="field-label">
                            {c.checkout.address} <span className="text-[#b4553f]">*</span>
                          </label>
                          <textarea
                            id="field-address"
                            name="street-address"
                            autoComplete="street-address"
                            rows={3}
                            value={form.address}
                            onChange={update('address')}
                            placeholder={c.checkout.addressPlaceholder}
                            className="field resize-none"
                            aria-invalid={Boolean(errors.address)}
                            aria-describedby={fieldError('address')}
                            required
                          />
                          {errors.address && (
                            <p id="field-address-error" role="alert" className="mt-1.5 text-[0.72rem] text-[#b4553f]">
                              {errors.address}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="field-notes" className="field-label">
                            {c.checkout.notes}{' '}
                            <span className={`normal-case tracking-normal text-forest/30 ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
                              ({c.checkout.optional})
                            </span>
                          </label>
                          <textarea
                            id="field-notes"
                            name="notes"
                            rows={2}
                            value={form.notes}
                            onChange={update('notes')}
                            placeholder={c.checkout.notesPlaceholder}
                            className="field resize-none"
                          />
                        </div>
                      </div>

                      <p className={`mt-3 text-forest/35 ${lang === 'ar' ? 'font-arabic text-[0.7rem]' : 'font-sans text-[0.64rem]'}`}>
                        * {c.checkout.required}
                      </p>
                    </div>

                    <aside className="lg:col-span-5">
                      <div className="rounded-2xl border border-forest/10 bg-white/55 p-4 sm:p-5 lg:sticky lg:top-4">
                        <div className="flex items-center justify-between">
                          <h3 className={`text-forest ${lang === 'ar' ? 'font-arabic text-[0.95rem] font-medium' : 'font-sans text-[0.82rem] font-medium'}`}>
                            {c.checkout.summary}
                          </h3>
                          <span className={`text-forest/40 ${lang === 'ar' ? 'font-arabic text-[0.7rem]' : 'font-sans text-[0.62rem]'}`}>
                            {itemsLabel(count, lang)}
                          </span>
                        </div>

                        <ul className="mt-4 space-y-3">
                          {detailedItems.map((item) => (
                            <li key={item.id} className="flex items-center gap-3">
                              <span className="relative h-12 w-10 shrink-0 overflow-hidden rounded-lg border border-forest/10 bg-gradient-to-b from-sage-light/50 to-beige/40">
                                {item.product.photo ? (
                                  <img
                                    src={item.product.photo}
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-contain p-0.5 mix-blend-multiply"
                                  />
                                ) : (
                                  <ProductArt product={item.product} className="h-full w-full" />
                                )}
                                <span className="absolute -end-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-forest px-1 text-[0.55rem] leading-none text-ivory">
                                  {item.qty}
                                </span>
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className={`block truncate text-forest/80 ${lang === 'ar' ? 'font-arabic text-[0.8rem]' : 'font-sans text-[0.78rem]'}`}>
                                  {productName(item.product, lang)}
                                </span>
                                <span className={`block text-forest/40 ${lang === 'ar' ? 'font-arabic text-[0.68rem]' : 'font-sans text-[0.64rem]'}`}>
                                  {formatPrice(item.product.price, lang)} × {item.qty}
                                </span>
                              </span>
                              <span className={`shrink-0 text-forest ${lang === 'ar' ? 'font-arabic text-[0.8rem] font-medium' : 'font-sans text-[0.78rem] font-medium'}`}>
                                {formatPrice(item.product.price * item.qty, lang)}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4 border-t border-forest/10 pt-3">
                          <div className="flex items-center justify-between text-forest/55">
                            <span className={`${lang === 'ar' ? 'font-arabic text-[0.78rem]' : 'font-sans text-[0.7rem]'}`}>{c.checkout.subtotal}</span>
                            <span className={`${lang === 'ar' ? 'font-arabic text-[0.8rem]' : 'font-sans text-[0.74rem]'}`}>{formatPrice(subtotal, lang)}</span>
                          </div>
                          <div className="mt-2 flex items-baseline justify-between text-forest">
                            <span className={`${lang === 'ar' ? 'font-arabic text-[0.9rem] font-medium' : 'font-sans text-[0.8rem] font-medium'}`}>{c.checkout.total}</span>
                            <span className={`${lang === 'ar' ? 'font-arabic text-[1.15rem] font-bold' : 'font-display text-[1.4rem] font-medium'}`}>{formatPrice(subtotal, lang)}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2.5 rounded-xl bg-beige/45 p-3">
                          <Info size={15} strokeWidth={1.6} className="mt-0.5 shrink-0 text-botanical" aria-hidden="true" />
                          <p className={`text-forest/55 ${lang === 'ar' ? 'font-arabic text-[0.72rem] leading-[1.8]' : 'font-sans text-[0.68rem] leading-[1.65]'}`}>
                            {c.checkout.noOnlinePayment}
                          </p>
                        </div>

                        <button type="submit" data-testid="checkout-submit" className="btn btn-primary mt-4 w-full">
                          <MessageCircle size={17} strokeWidth={1.6} aria-hidden="true" />
                          {c.checkout.send}
                          {dir === 'rtl' ? <ArrowLeft size={15} strokeWidth={1.6} aria-hidden="true" /> : <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />}
                        </button>
                        <p className={`mt-2 text-center text-forest/35 ${lang === 'ar' ? 'font-arabic text-[0.68rem] leading-[1.7]' : 'font-sans text-[0.63rem] leading-[1.6]'}`}>
                          {c.checkout.keepNote}
                        </p>
                      </div>
                    </aside>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
