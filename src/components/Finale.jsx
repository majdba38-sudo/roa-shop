import { motion } from 'framer-motion'
import { ArrowUpRight, Leaf } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import BrandLogo from './BrandLogo'
import LeafParticles from './LeafParticles'

export default function Finale() {
  const { c, lang } = useLang()

  return (
    <section id="finale" className="relative isolate flex min-h-[88svh] items-center overflow-hidden bg-forest-deep">
      <img
        src="./images/clearing.webp"
        srcSet="./images/clearing-sm.webp 1000w, ./images/clearing.webp 2000w"
        sizes="100vw"
        alt={c.hero.imageAlt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="clear-scrim absolute inset-0" aria-hidden="true" />
      <div className="grain absolute inset-0" aria-hidden="true" />
      <LeafParticles />

      <div className="container-x relative z-10 py-24 sm:py-28 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <BrandLogo tone="light" large markOnly={false} className="justify-center" />

          <span className="eyebrow mt-8 justify-center text-ivory/65">
            <span className="eyebrow-line" aria-hidden="true" />
            {c.finale.eyebrow}
            <span className="eyebrow-line" aria-hidden="true" />
          </span>

          <h2
            className={`mt-6 whitespace-pre-line text-ivory ${
              lang === 'ar'
                ? 'font-amiri text-[clamp(2.4rem,5.8vw,4.8rem)] font-bold leading-[1.35]'
                : 'font-display text-[clamp(2.8rem,6.2vw,5.4rem)] font-light leading-[1.02]'
            }`}
          >
            {c.finale.title}
          </h2>

          <p
            className={`mt-6 max-w-2xl text-ivory/72 ${
              lang === 'ar'
                ? 'font-arabic text-[0.98rem] leading-[2] sm:text-[1.06rem]'
                : 'font-sans text-[0.94rem] font-light leading-[1.9] sm:text-[1rem]'
            }`}
          >
            {c.finale.body}
          </p>

          <div className="mt-9 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a href="#collection" className="btn btn-light group">
              <Leaf size={16} strokeWidth={1.5} aria-hidden="true" />
              {c.finale.exploreAll}
              <ArrowUpRight size={15} strokeWidth={1.6} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn-outline-light">
              {c.finale.contact}
            </a>
          </div>

          <a
            href="#home"
            className={`mt-10 inline-flex items-center gap-2 text-ivory/45 transition-colors hover:text-ivory/80 ${
              lang === 'ar' ? 'font-arabic text-[0.78rem]' : 'font-sans text-[0.56rem] uppercase tracking-[0.2em]'
            }`}
          >
            {c.finale.backTop}
            <span className="h-px w-8 bg-current" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
