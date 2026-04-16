import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { href: '#about', label: 'ABOUT' },
  { href: '#projects', label: 'PROJECTS' },
  { href: '#contacts', label: 'CONTACTS' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] bg-ink text-white border-b-2 border-accent"
      >
        <div className="mx-auto max-w-[1400px] flex items-center justify-between px-5 md:px-10 h-16">
          <a
            href="#top"
            className="font-mono text-yellow text-xl md:text-2xl tracking-tight font-bold select-none"
          >
            DENIS.DEV<span className="text-accent">_</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative font-mono text-sm uppercase tracking-widest text-white hover:text-accent transition-colors"
              >
                {l.label}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-accent transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden relative w-10 h-10 border-2 border-white flex items-center justify-center"
          >
            <motion.span
              className="absolute block h-[2px] w-5 bg-white"
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute block h-[2px] w-5 bg-white"
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="absolute block h-[2px] w-5 bg-white"
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
            className="md:hidden fixed top-16 left-0 right-0 z-[99] bg-ink border-b-2 border-accent"
          >
            <nav className="flex flex-col px-5 py-6 gap-4">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                  className="font-display font-bold text-white text-3xl uppercase border-b-2 border-white/20 pb-3 hover:text-accent"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
