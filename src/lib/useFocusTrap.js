import { useEffect, useRef } from 'react'

/**
 * Keeps keyboard focus inside an open dialog and restores it on close.
 */
export function useFocusTrap(active, containerRef, onClose) {
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (!active) return
    const container = containerRef.current
    if (!container) return
    const previouslyFocused = document.activeElement

    const focusables = () =>
      Array.from(
        container.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement)

    const timer = window.setTimeout(() => {
      const first = focusables()[0]
      first?.focus({ preventScroll: true })
    }, 80)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeRef.current?.()
        return
      }
      if (event.key !== 'Tab') return
      const list = focusables()
      if (list.length === 0) return
      const first = list[0]
      const last = list[list.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus({ preventScroll: true })
      }
    }
  }, [active, containerRef])
}
