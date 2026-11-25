import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { products } from '../data/products'
import { useLang } from '../context/LanguageContext'
import JourneyIntro from './JourneyIntro'
import JourneyRail from './JourneyRail'
import ProductStation from './ProductStation'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Journey() {
  const { c } = useLang()
  const reduce = useReducedMotion()
  const journeyRef = useRef(null)
  const [active, setActive] = useState(1)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-station]'))
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.getAttribute('data-station')))
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const element = journeyRef.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0,
      // Keep the floating station rail hidden while the hero owns the screen.
      rootMargin: '-12% 0px -12% 0px',
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reduce) return
    const context = gsap.context(() => {
      gsap.utils.toArray('[data-station-bg]').forEach((image) => {
        const section = image.closest('[data-station]')
        gsap.fromTo(
          image,
          { yPercent: -5, scale: 1.12 },
          {
            yPercent: 5,
            scale: 1.06,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          },
        )
      })
    }, journeyRef)
    return () => context.revert()
  }, [reduce])

  useEffect(() => {
    if (typeof document === 'undefined' || !document.fonts) return
    document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {})
  }, [])

  return (
    <section id="journey" ref={journeyRef} aria-label={c.journey.label}>
      <JourneyIntro />
      {products.map((product, index) => (
        <ProductStation key={product.id} product={product} index={index} />
      ))}
      <JourneyRail active={active} visible={visible} />
    </section>
  )
}
