import { motion } from 'framer-motion'
import { ArrowRight, Leaf } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

export default function About() {
  const { c, lang } = useLang()

  return (
    <section id="about" className="grain relative overflow-hidden bg-ivory-deep">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-40 top-20 h-[28rem] w-[28rem] rounded-full bg-sage-light/40 blur-3xl"
      />
      <div className="container-x section-pad relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="relative lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-t-[13rem] rounded-b-[1.75rem] border border-forest/10 bg-beige shadow-soft">
              <img
                src="./images/about-forest.webp"
                alt={c.about.imageAlt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/45 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5">
                <span className={`text-ivory/85 ${lang === 'ar' ? 'font-arabic text-[0.8rem]' : 'font-sans text-[0.6rem] uppercase tracking-[0.2em]'}`}>
                  {c.about.imageCaption}
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-ivory/30 bg-forest-deep/25 text-ivory backdrop-blur-sm">
                  <Leaf size={15} strokeWidth={1.4} aria-hidden="true" />
                </span>
              </div>
            </div>

            <div className="absolute -end-3 top-10 hidden rounded-2xl border border-forest/10 bg-ivory/95 p-4 shadow-soft backdrop-blur-sm sm:block">
              <span className="font-display text-[2rem] leading-none text-forest">05</span>
              <span className={`mt-1 block text-forest/50 ${lang === 'ar' ? 'font-arabic text-[0.65rem]' : 'font-sans text-[0.5rem] uppercase tracking-[0.16em]'}`}>
                {lang === 'ar' ? 'كنوز نباتية' : 'Botanical treasures'}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.08 }}
            className="lg:col-span-6 lg:col-start-7"
          >
            <span className="eyebrow text-botanical">
              <span className="eyebrow-line" aria-hidden="true" />
              {c.about.label}
            </span>
            <h2
              className={`mt-5 whitespace-pre-line text-forest ${
                lang === 'ar'
                  ? 'font-amiri text-[clamp(2.1rem,4.2vw,3.6rem)] font-bold leading-[1.4]'
                  : 'font-display text-[clamp(2.4rem,4.4vw,4rem)] font-light leading-[1.03]'
              }`}
            >
              {c.about.title}
            </h2>

            <div className={`mt-6 space-y-4 text-forest/65 ${lang === 'ar' ? 'font-arabic text-[0.96rem] leading-[2]' : 'font-sans text-[0.94rem] font-light leading-[1.9]'}`}>
              <p>{c.about.p1}</p>
              <p>{c.about.p2}</p>
            </div>

            <blockquote className="mt-7 border-s-2 border-gold/70 ps-5">
              <p className={`text-forest/80 ${lang === 'ar' ? 'font-amiri text-[1.25rem] leading-[1.8]' : 'font-display text-[1.4rem] italic leading-[1.5]'}`}>
                {c.about.quote}
              </p>
              <cite className={`mt-2 block not-italic text-forest/40 ${lang === 'ar' ? 'font-arabic text-[0.7rem]' : 'font-sans text-[0.56rem] uppercase tracking-[0.18em]'}`}>
                {c.about.quoteCaption}
              </cite>
            </blockquote>

            <div className="mt-8">
              <span className={`text-forest/40 ${lang === 'ar' ? 'font-arabic text-[0.78rem]' : 'font-sans text-[0.58rem] uppercase tracking-[0.2em]'}`}>
                {c.about.valuesTitle}
              </span>
              <div className="mt-3">
                {c.about.values.map((value) => (
                  <div key={value.n} className="flex gap-4 border-t border-forest/10 py-4 last:border-b">
                    <span className="font-display text-[0.75rem] tracking-[0.16em] text-botanical">{value.n}</span>
                    <div>
                      <h3 className={`text-forest ${lang === 'ar' ? 'font-arabic text-[0.92rem] font-medium' : 'font-sans text-[0.86rem] font-medium'}`}>
                        {value.title}
                      </h3>
                      <p className={`mt-1 text-forest/50 ${lang === 'ar' ? 'font-arabic text-[0.82rem] leading-[1.85]' : 'font-sans text-[0.8rem] font-light leading-[1.7]'}`}>
                        {value.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#journey"
              className={`group mt-7 inline-flex items-center gap-2 text-forest transition-colors hover:text-botanical ${
                lang === 'ar' ? 'font-arabic text-[0.9rem]' : 'font-sans text-[0.66rem] uppercase tracking-[0.18em]'
              }`}
            >
              {c.hero.cta}
              <ArrowRight size={15} strokeWidth={1.5} className="rtl-flip transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
