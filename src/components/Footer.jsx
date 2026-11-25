import { ArrowUp, Instagram, Leaf, MessageCircle, Music2, Phone } from 'lucide-react'
import BrandLogo from './BrandLogo'
import { useLang } from '../context/LanguageContext'
import { site } from '../data/site'
import { contactWhatsAppUrl } from '../lib/whatsapp'

const socialIcons = { instagram: Instagram, tiktok: Music2, x: ArrowUp }

export default function Footer() {
  const { c, lang } = useLang()
  const year = new Date().getFullYear()

  const explore = [
    { href: '#home', label: c.nav.home },
    { href: '#journey', label: c.nav.journey },
    { href: '#collection', label: c.nav.products },
    { href: '#about', label: c.nav.about },
    { href: '#contact', label: c.nav.contact },
  ]

  return (
    <footer className="relative overflow-hidden bg-forest-deep text-ivory">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <svg viewBox="0 0 600 600" className="absolute -end-20 -top-32 h-[34rem] w-[34rem]">
          <path d="M300 40C420 140 480 280 420 400C370 500 260 540 180 480C100 420 110 300 170 210C220 130 280 90 300 40Z" fill="none" stroke="#F8F7F1" strokeWidth="1" />
          <path d="M300 480C295 360 270 260 210 190" fill="none" stroke="#F8F7F1" strokeWidth="1" />
        </svg>
      </div>

      <div className="container-x relative z-10 pb-8 pt-16 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <BrandLogo tone="light" />
            <p className={`mt-5 max-w-sm text-ivory/55 ${lang === 'ar' ? 'font-arabic text-[0.9rem] leading-[1.95]' : 'font-sans text-[0.86rem] font-light leading-[1.85]'}`}>
              {c.footer.intro}
            </p>
            <p className={`mt-5 flex items-center gap-2 text-sage ${lang === 'ar' ? 'font-arabic text-[0.82rem]' : 'font-sans text-[0.66rem] uppercase tracking-[0.16em]'}`}>
              <Leaf size={14} strokeWidth={1.4} aria-hidden="true" />
              {c.footer.madeWith}
            </p>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <h3 className={`text-ivory/60 ${lang === 'ar' ? 'font-arabic text-[0.78rem]' : 'font-sans text-[0.58rem] uppercase tracking-[0.2em]'}`}>
              {c.footer.exploreTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {explore.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`text-ivory/65 transition-colors hover:text-ivory ${lang === 'ar' ? 'font-arabic text-[0.82rem]' : 'font-sans text-[0.8rem]'}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className={`text-ivory/60 ${lang === 'ar' ? 'font-arabic text-[0.78rem]' : 'font-sans text-[0.58rem] uppercase tracking-[0.2em]'}`}>
              {c.footer.contactTitle}
            </h3>
            <ul className="mt-4 space-y-2.5 text-ivory/65">
              <li>
                <a href={`tel:+${site.whatsappNumber}`} className="flex items-center gap-2 text-[0.82rem] transition-colors hover:text-ivory">
                  <Phone size={13} strokeWidth={1.5} aria-hidden="true" />
                  <span dir="ltr" className="font-sans tracking-[0.06em]">{site.phoneLocal}</span>
                </a>
              </li>
              <li>
                <a
                  href={contactWhatsAppUrl(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 transition-colors hover:text-ivory ${lang === 'ar' ? 'font-arabic text-[0.82rem]' : 'font-sans text-[0.8rem]'}`}
                >
                  <MessageCircle size={13} strokeWidth={1.5} aria-hidden="true" />
                  {c.contact.whatsappLabel}
                </a>
              </li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="text-[0.8rem] transition-colors hover:text-ivory">
                    {site.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className={`text-ivory/60 ${lang === 'ar' ? 'font-arabic text-[0.78rem]' : 'font-sans text-[0.58rem] uppercase tracking-[0.2em]'}`}>
              {c.footer.followTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {site.social.map((social) => {
                const Icon = socialIcons[social.id] || Leaf
                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      onClick={(event) => {
                        if (social.href === '#') event.preventDefault()
                      }}
                      target={social.href === '#' ? undefined : '_blank'}
                      rel={social.href === '#' ? undefined : 'noopener noreferrer'}
                      className="flex items-center gap-2 text-ivory/65 transition-colors hover:text-ivory"
                    >
                      <Icon size={13} strokeWidth={1.5} aria-hidden="true" />
                      <span className="font-sans text-[0.8rem]">{social.label}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-ivory/10 bg-ivory/[0.03] px-4 py-3.5">
          <p className={`text-ivory/38 ${lang === 'ar' ? 'font-arabic text-[0.72rem] leading-[1.8]' : 'font-sans text-[0.68rem] leading-[1.7]'}`}>
            {c.footer.disclaimer}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-ivory/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className={`text-ivory/60 ${lang === 'ar' ? 'font-arabic text-[0.72rem]' : 'font-sans text-[0.68rem]'}`}>
            © {year} {site.nameAr} · ROA NATURE. {c.footer.rights}
          </p>
          <div className="flex items-center gap-5">
            <span className={`text-ivory/25 ${lang === 'ar' ? 'font-arabic text-[0.68rem]' : 'font-sans text-[0.56rem] uppercase tracking-[0.16em]'}`}>
              {c.footer.brandLine}
            </span>
            <a
              href="#home"
              aria-label={c.finale.backTop}
              className="grid h-9 w-9 place-items-center rounded-full border border-ivory/15 text-ivory/55 transition-colors hover:border-ivory/40 hover:text-ivory"
            >
              <ArrowUp size={14} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
