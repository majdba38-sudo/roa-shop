import { useEffect, useRef } from 'react'
import { MotionConfig, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LanguageProvider, useLang } from './context/LanguageContext'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'
import { ProductDefs } from './components/ProductArt'
import Header from './components/Header'
import Hero from './components/Hero'
import Journey from './components/Journey'
import Collection from './components/Collection'
import About from './components/About'
import Finale from './components/Finale'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import CheckoutModal from './components/CheckoutModal'
import Toast from './components/Toast'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function Experience() {
  const { c, lang } = useLang()
  const reduce = useReducedMotion()
  const rootRef = useRef(null)

  useEffect(() => {
    if (reduce) return
    const context = gsap.context(() => {
      gsap.fromTo(
        '.hero-bg-img',
        { scale: 1.01, yPercent: 0 },
        {
          scale: 1.1,
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      )
    }, rootRef)
    return () => context.revert()
  }, [reduce])

  useEffect(() => {
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 250)
    return () => window.clearTimeout(timer)
  }, [lang])

  return (
    <div ref={rootRef}>
      <a
        href="#main"
        className="sr-only fixed start-4 top-4 z-[300] rounded-full bg-forest px-5 py-2.5 text-sm text-ivory focus:not-sr-only"
      >
        {c.nav.skip}
      </a>

      <ProductDefs />
      <Header />

      <main id="main">
        <Hero />
        <Journey />
        <Collection />
        <About />
        <Finale />
        <Contact />
      </main>

      <Footer />
      <CartDrawer />
      <CheckoutModal />
      <Toast />
    </div>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <CartProvider>
          <ToastProvider>
            <Experience />
          </ToastProvider>
        </CartProvider>
      </LanguageProvider>
    </MotionConfig>
  )
}
