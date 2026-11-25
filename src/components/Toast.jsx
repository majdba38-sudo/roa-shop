import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useToast } from '../context/ToastContext'
import { useLang } from '../context/LanguageContext'

export default function Toast() {
  const { toast, dismiss } = useToast()
  const { c } = useLang()

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-[200] flex justify-center px-4"
      role="status"
      aria-live="polite"
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex max-w-[92vw] items-center gap-3 rounded-full border border-ivory/15 bg-forest-deep/95 py-2.5 pe-2.5 ps-4 text-ivory shadow-xl backdrop-blur-md"
          >
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ivory/12 text-sage">
              <Check size={13} strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="text-[0.8rem] leading-snug">{toast.message}</span>
            <button
              type="button"
              onClick={dismiss}
              aria-label={c.common.close}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-ivory/50 transition-colors hover:bg-ivory/10 hover:text-ivory"
            >
              <X size={13} strokeWidth={1.6} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
