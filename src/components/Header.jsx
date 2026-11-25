import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Globe2, Menu, MessageCircle, ShoppingBag, X } from 'lucide-react'
import BrandLogo from './BrandLogo'
import { useLang } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'
import { site } from '../data/site'
import { contactWhatsAppUrl } from '../lib/whatsapp'

const sectionIds = ['home', 'journey', 'collection', 'about', 'contact']

export default function Header() {
  const { c, lang, toggleLang, dir } = useLang()
  const { count, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  const links = [
    { id: 'home', href: '#home', label: c.nav.home },
    { id: 'journey', href: '#journey', label: c.nav.journey },
    { id: 'collection', href: '#collection', label: c.nav.products },
    { id: 'about', href: '#about', label: c.nav.about },
    { id: 'contact', href: '#contact', label: c.nav.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!elements.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const solid = scrolled || menuOpen
  const ink = solid ? 'text-forest' : 'text-ivory'
  const navText = lang === 'ar' ? 'text-[13px] tracking-normal' : 'text-[10.5px] uppercase tracking-[0.19em]'

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ${
          solid
            ? 'bg-ivory/92 shadow-[0_1px_0_rgba(37,76,58,0.09)] backdrop-blur-xl'
            : 'bg-transparent'
        } ${ink}`}
      >
        <div className="container-x flex h-[4.75rem] items-center justify-between gap-4 lg:h-[5.5rem]">
          <a
            href="#home"
            onClick={closeMenu}
            className="shrink-0 transition-opacity duration-300 hover:opacity-80"
            aria-label={`${site.nameAr} — ${site.nameEn}`}
          >
            <BrandLogo tone={solid ? 'dark' : 'light'} />
          </a>

          <nav aria-label={c.nav.menu} className="hidden items-center gap-6 lg:flex xl:gap-8">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                aria-current={active === link.id ? 'page' : undefined}
                className={`group relative py-2 font-medium transition-opacity duration-300 hover:opacity-100 ${navText} ${
                  active === link.id ? 'opacity-100' : 'opacity-65'
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-center bg-current transition-transform duration-500 ${
                    active === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={toggleLang}
              data-testid="lang-toggle"
              aria-label={c.nav.switchLang}
              className={`icon-btn h-10 w-10 gap-1.5 rounded-full text-[0.66rem] font-medium tracking-[0.12em] sm:w-auto sm:px-3 ${
                solid ? '' : 'icon-btn-light'
              }`}
            >
              <Globe2 size={15} strokeWidth={1.5} aria-hidden="true" />
              <span className={lang === 'ar' ? 'font-sans' : 'font-arabic'}>{c.nav.langShort}</span>
            </button>

            <button
              type="button"
              onClick={openCart}
              data-testid="cart-button"
              aria-label={`${c.nav.openCart} (${count})`}
              className={`icon-btn relative ${solid ? '' : 'icon-btn-light'}`}
            >
              <ShoppingBag size={19} strokeWidth={1.5} aria-hidden="true" />
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                  className={`absolute -end-0.5 -top-0.5 grid h-[1.15rem] min-w-[1.15rem] place-items-center rounded-full px-1 text-[0.6rem] font-medium leading-none ${
                    solid ? 'bg-forest text-ivory' : 'bg-ivory text-forest'
                  }`}
                  aria-hidden="true"
                >
                  {count > 99 ? '99+' : count}
                </motion.span>
              )}
              <span className="sr-only">{c.cart.itemCount}</span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              data-testid="menu-toggle"
              aria-label={menuOpen ? c.nav.close : c.nav.menu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`icon-btn lg:hidden ${solid ? '' : 'icon-btn-light'}`}
            >
              {menuOpen ? <X size={21} strokeWidth={1.5} aria-hidden="true" /> : <Menu size={21} strokeWidth={1.5} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-ivory pt-[4.75rem] lg:hidden"
          >
            <div className="grain absolute inset-0 overflow-hidden" aria-hidden="true">
              <div className="absolute -end-24 top-24 h-80 w-80 rounded-full bg-sage-light/50 blur-3xl" />
              <div className="absolute -start-20 bottom-10 h-72 w-72 rounded-full bg-beige/50 blur-3xl" />
            </div>
            <nav aria-label={c.nav.menu} className="container-x relative flex flex-1 flex-col justify-center pb-10">
              <ul className="space-y-1">
                {links.map((link, index) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.055, duration: 0.45 }}
                  >
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="group flex items-baseline gap-4 border-b border-forest/10 py-3.5"
                    >
                      <span className="font-display text-[0.7rem] tracking-[0.2em] text-botanical">
                        0{index + 1}
                      </span>
                      <span className={`text-forest ${lang === 'ar' ? 'font-arabic text-2xl font-medium' : 'font-display text-3xl'}`}>
                        {link.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-10 flex flex-col gap-4"
              >
                <a
                  href={contactWhatsAppUrl(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full"
                  onClick={closeMenu}
                >
                  <MessageCircle size={17} strokeWidth={1.6} aria-hidden="true" />
                  {c.contact.whatsappCta}
                </a>
                <div className="flex items-center justify-between text-[0.78rem] text-forest/65">
                  <span dir="ltr" className="font-sans tracking-[0.12em]">
                    {site.phoneLocal}
                  </span>
                  <button type="button" onClick={toggleLang} className="underline underline-offset-4">
                    {c.nav.switchLang}
                  </button>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
