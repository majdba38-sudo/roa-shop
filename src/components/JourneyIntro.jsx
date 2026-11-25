import { motion } from 'framer-motion'
import { ArrowDown, Leaf } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

export default function JourneyIntro() {
  const { c, lang } = useLang()

  return (
    <div className="grain relative overflow-hidden bg-ivory">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-32 top-10 h-96 w-96 rounded-full bg-sage-light/45 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-32 bottom-0 h-80 w-80 rounded-full bg-beige/55 blur-3xl"
      />

      <div className="container-x relative z-10 flex max-w-4xl flex-col items-center pb-20 pt-24 text-center sm:pb-28 sm:pt-32 lg:pb-32 lg:pt-36">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.7 }}
          className="eyebrow justify-center text-botanical"
        >
          <span className="eyebrow-line" aria-hidden="true" />
          {c.journey.label}
          <span className="eyebrow-line" aria-hidden="true" />
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.08 }}
          className={`mt-7 whitespace-pre-line text-forest ${
            lang === 'ar'
              ? 'font-amiri text-[clamp(2.2rem,5.4vw,4.4rem)] font-bold leading-[1.35]'
              : 'font-display text-[clamp(2.6rem,5.6vw,4.8rem)] font-light leading-[1.02]'
          }`}
        >
          {c.journey.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.16 }}
          className={`mt-7 max-w-2xl text-forest/65 ${
            lang === 'ar'
              ? 'font-arabic text-[0.98rem] leading-[2] sm:text-[1.06rem]'
              : 'font-sans text-[0.95rem] font-light leading-[1.9] sm:text-[1.02rem]'
          }`}
        >
          {c.journey.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-9 flex flex-col items-center gap-4"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/15 text-botanical">
            <Leaf size={17} strokeWidth={1.4} aria-hidden="true" />
          </span>
          <a
            href="#station-1"
            className={`group flex items-center gap-2.5 text-forest/55 transition-colors hover:text-forest ${
              lang === 'ar' ? 'font-arabic text-[0.82rem]' : 'font-sans text-[0.6rem] uppercase tracking-[0.22em]'
            }`}
          >
            {c.journey.hint}
            <ArrowDown size={14} strokeWidth={1.4} className="transition-transform duration-500 group-hover:translate-y-1" aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      <div className="relative h-16 overflow-hidden sm:h-24" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-full w-full">
          <path d="M0 120C220 40 420 40 720 76C1020 112 1220 96 1440 22V120H0Z" fill="#163127" />
        </svg>
      </div>
    </div>
  )
}
