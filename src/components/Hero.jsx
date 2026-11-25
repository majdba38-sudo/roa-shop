import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, Leaf } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import LeafParticles from './LeafParticles'
import BrandLogo from './BrandLogo'

export default function Hero() {
  const { c, lang } = useLang()
  const reduce = useReducedMotion()

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.15 } },
  }
  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-forest-deep"
    >
      <img
        src="./images/hero.webp"
        srcSet="./images/hero-sm.webp 1000w, ./images/hero.webp 2200w"
        sizes="100vw"
        alt={c.hero.imageAlt}
        fetchPriority="high"
        decoding="async"
        className="hero-bg-img absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: 'center 52%' }}
      />
      <div className="hero-scrim absolute inset-0" aria-hidden="true" />
      <div className="grain absolute inset-0" aria-hidden="true" />
      <LeafParticles />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-24 top-1/2 hidden h-[30rem] w-[30rem] -translate-y-1/2 opacity-[0.07] lg:block"
      >
        <BrandLogo tone="light" markOnly large className="h-full w-full [&>svg]:h-full [&>svg]:w-full" />
      </div>

      <div className="container-x relative z-10 flex min-h-[100svh] flex-col justify-center pb-40 pt-32 sm:pb-44 lg:pb-48 lg:pt-36">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-[46rem]"
        >
          <motion.div variants={item} className="flex items-center gap-3 text-ivory/80">
            <span className="h-px w-10 bg-current opacity-60" aria-hidden="true" />
            <span className={`eyebrow ${lang === 'ar' ? '' : 'text-[0.64rem]'}`}>{c.hero.eyebrow}</span>
          </motion.div>

          <motion.h1 variants={item} className="mt-6 text-ivory sm:mt-8">
            <span
              className={`block text-ivory/85 ${
                lang === 'ar'
                  ? 'font-arabic text-[clamp(1.8rem,4vw,2.9rem)] font-light leading-[1.25]'
                  : 'font-display text-[clamp(2rem,4.2vw,3.4rem)] font-light italic leading-[1.1]'
              }`}
            >
              {c.hero.titleLead}
            </span>
            <span
              className={`mt-2 block text-ivory sm:mt-3 ${
                lang === 'ar'
                  ? 'font-arabic text-[clamp(3.2rem,9.5vw,7.2rem)] font-bold leading-[1.02]'
                  : 'font-display text-[clamp(3.4rem,9.5vw,7.6rem)] font-medium uppercase leading-[0.94] tracking-[0.02em]'
              }`}
            >
              {c.hero.brand}
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className={`mt-7 max-w-xl text-ivory/78 ${
              lang === 'ar'
                ? 'font-arabic text-[1.02rem] leading-[1.95] sm:text-[1.12rem]'
                : 'font-sans text-[0.98rem] font-light leading-[1.85] sm:text-[1.05rem]'
            }`}
          >
            {c.hero.subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
            <a href="#journey" className="btn btn-light group w-full sm:w-auto">
              <Leaf size={16} strokeWidth={1.6} aria-hidden="true" />
              {c.hero.cta}
              <ArrowRight
                size={16}
                strokeWidth={1.6}
                aria-hidden="true"
                className="rtl-flip transition-transform duration-500 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#collection"
              className={`group inline-flex items-center gap-2 text-ivory/80 transition-colors hover:text-ivory ${
                lang === 'ar' ? 'font-arabic text-[0.95rem]' : 'font-sans text-[0.72rem] uppercase tracking-[0.18em]'
              }`}
            >
              <span className="border-b border-ivory/30 pb-1 transition-colors group-hover:border-ivory/70">
                {c.hero.secondary}
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container-x flex flex-col gap-5 pb-6 sm:pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-ivory/68">
            {[c.hero.badgeA, c.hero.badgeB, c.hero.badgeC].map((badge, index) => (
              <span
                key={badge}
                className={`flex items-center gap-2 ${
                  lang === 'ar' ? 'font-arabic text-[0.8rem]' : 'font-sans text-[0.64rem] uppercase tracking-[0.16em]'
                } ${index === 0 ? '' : 'sm:border-s sm:border-ivory/20 sm:ps-5'}`}
              >
                <span className="h-1 w-1 rounded-full bg-sage" aria-hidden="true" />
                {badge}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-6">
            <a
              href="#journey"
              className="group flex items-center gap-3 text-ivory/65 transition-colors hover:text-ivory"
              aria-label={c.hero.scroll}
            >
              <span className={`${lang === 'ar' ? 'font-arabic text-[0.78rem]' : 'font-sans text-[0.6rem] uppercase tracking-[0.22em]'}`}>
                {c.hero.scroll}
              </span>
              <ArrowDown size={14} strokeWidth={1.5} className="animate-bounce" aria-hidden="true" />
            </a>
            <div className="hidden items-center gap-3 text-ivory/50 sm:flex" aria-hidden="true">
              <span className="h-10 w-px bg-ivory/25" />
              <span className={`${lang === 'ar' ? 'font-arabic text-[0.7rem]' : 'font-sans text-[0.55rem] uppercase tracking-[0.25em]'} vertical-text`}>
                {c.hero.sideLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
