import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { copy } from '../data/copy'

const LanguageContext = createContext(null)

function initialLang() {
  try {
    const saved = window.localStorage.getItem('roa-lang')
    if (saved === 'en' || saved === 'ar') return saved
  } catch {
    /* ignore */
  }
  return 'ar'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLang)
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  const setLang = useCallback((next) => {
    setLangState(next === 'en' ? 'en' : 'ar')
  }, [])

  const toggleLang = useCallback(() => {
    setLangState((current) => (current === 'ar' ? 'en' : 'ar'))
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    document.title = copy[lang].meta.title
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', copy[lang].meta.description)
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', copy[lang].meta.title)
    try {
      window.localStorage.setItem('roa-lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang, dir])

  const value = useMemo(
    () => ({ lang, dir, setLang, toggleLang, c: copy[lang] }),
    [lang, dir, setLang, toggleLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLang must be used inside LanguageProvider')
  return context
}
