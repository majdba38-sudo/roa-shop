import { motion } from 'framer-motion'
import { ArrowUpRight, Instagram, Leaf, MessageCircle, Music2, Phone } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { site } from '../data/site'
import { contactWhatsAppUrl } from '../lib/whatsapp'

const socialIcons = {
  instagram: Instagram,
  tiktok: Music2,
  x: ArrowUpRight,
}

export default function Contact() {
  const { c, lang } = useLang()

  return (
    <section id="contact" className="grain relative overflow-hidden bg-ivory">
      <div className="container-x section-pad relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden rounded-[2rem] bg-forest px-6 py-10 text-ivory shadow-panel sm:px-10 lg:px-14 lg:py-14"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -end-20 -top-24 h-80 w-80 rounded-full border border-ivory/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -end-8 -top-12 h-56 w-56 rounded-full border border-ivory/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -start-10 h-64 w-64 rounded-full bg-forest-soft/40 blur-2xl" />

          <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <span className="eyebrow text-ivory/55">
                <span className="eyebrow-line" aria-hidden="true" />
                {c.contact.label}
              </span>
              <h2
                className={`mt-5 whitespace-pre-line ${
                  lang === 'ar'
                    ? 'font-amiri text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.4]'
                    : 'font-display text-[clamp(2.3rem,4.4vw,3.8rem)] font-light leading-[1.03]'
                }`}
              >
                {c.contact.title}
              </h2>
              <p className={`mt-5 max-w-lg text-ivory/65 ${lang === 'ar' ? 'font-arabic text-[0.95rem] leading-[1.95]' : 'font-sans text-[0.92rem] font-light leading-[1.85]'}`}>
                {c.contact.body}
              </p>

              <a
                href={contactWhatsAppUrl(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light mt-7 group"
              >
                <MessageCircle size={17} strokeWidth={1.6} aria-hidden="true" />
                {c.contact.whatsappCta}
                <ArrowUpRight size={15} strokeWidth={1.6} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <div className="grid gap-4">
                <a
                  href={`tel:+${site.whatsappNumber}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-ivory/15 bg-ivory/5 p-4 transition-colors hover:bg-ivory/10"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-ivory/10 text-ivory/80">
                      <Phone size={17} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="flex flex-col">
                      <span className={`text-ivory/50 ${lang === 'ar' ? 'font-arabic text-[0.72rem]' : 'font-sans text-[0.55rem] uppercase tracking-[0.16em]'}`}>
                        {c.contact.phoneLabel}
                      </span>
                      <span dir="ltr" className="mt-0.5 font-sans text-[1rem] tracking-[0.08em] text-ivory/90">
                        {site.phoneLocal}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight size={16} strokeWidth={1.5} className="text-ivory/40 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>

                <div className="rounded-2xl border border-ivory/15 bg-ivory/5 p-4">
                  <span className={`text-ivory/50 ${lang === 'ar' ? 'font-arabic text-[0.72rem]' : 'font-sans text-[0.55rem] uppercase tracking-[0.16em]'}`}>
                    {c.contact.follow}
                  </span>
                  <div className="mt-3 grid gap-1">
                    {site.social.map((social) => {
                      const Icon = socialIcons[social.id] || Leaf
                      return (
                        <a
                          key={social.id}
                          href={social.href}
                          onClick={(event) => {
                            if (social.href === '#') event.preventDefault()
                          }}
                          target={social.href === '#' ? undefined : '_blank'}
                          rel={social.href === '#' ? undefined : 'noopener noreferrer'}
                          className="group flex items-center justify-between rounded-xl px-2 py-2 text-ivory/70 transition-colors hover:bg-ivory/10 hover:text-ivory"
                        >
                          <span className="flex items-center gap-3">
                            <Icon size={15} strokeWidth={1.5} aria-hidden="true" />
                            <span className="font-sans text-[0.8rem] tracking-[0.04em]">{social.label}</span>
                          </span>
                          <span dir="ltr" className="font-sans text-[0.72rem] text-ivory/35">
                            {social.handle}
                          </span>
                        </a>
                      )
                    })}
                  </div>
                </div>

                <p className={`px-1 text-ivory/40 ${lang === 'ar' ? 'font-arabic text-[0.72rem]' : 'font-sans text-[0.66rem]'}`}>
                  {c.contact.socialNote}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
