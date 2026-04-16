import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import RubiksCube from './RubiksCube.jsx'

const ROLES = ['Fullstack Developer', 'Telegram Bot Dev', 'AI Integration', 'Web & Landings']

function useTyping(words, { typing = 70, deleting = 40, hold = 1400 } = {}) {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const word = words[idx % words.length]
    let t
    if (phase === 'typing') {
      if (text.length < word.length) {
        t = setTimeout(() => setText(word.slice(0, text.length + 1)), typing)
      } else {
        t = setTimeout(() => setPhase('deleting'), hold)
      }
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(word.slice(0, text.length - 1)), deleting)
      } else {
        setPhase('typing')
        setIdx((i) => (i + 1) % words.length)
      }
    }
    return () => clearTimeout(t)
  }, [text, phase, idx, words, typing, deleting, hold])

  return text
}

export default function Hero() {
  const typed = useTyping(ROLES)

  return (
    <section id="top" className="relative pt-24 md:pt-32 pb-20 md:pb-28 overflow-hidden">
      {/* Decorative red block — desktop only, behind heading */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.6, rotate: -4 }}
        animate={{ opacity: 1, scale: 1, rotate: -2 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="hidden md:block absolute bg-accent border-2 border-ink shadow-brut6"
        style={{
          top: 140,
          left: '-4%',
          width: 'min(260px, 28vw)',
          height: 'min(260px, 28vw)',
          zIndex: 0,
        }}
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="hidden md:block absolute right-6 top-28 font-mono text-xs text-ink2 rotate-90 origin-bottom-right"
      >
        ISSUE № 001 — 2025 / EDITORIAL
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-ink2 mb-5 inline-flex items-center gap-3"
          >
            <span className="inline-block w-2 h-2 bg-accent" />
            Fullstack developer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display font-extrabold leading-[0.9] tracking-tight text-ink"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            DENIS
            <br />
            SUVOROV<span className="text-accent">.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 font-mono text-lg md:text-2xl text-ink min-h-[2rem]"
          >
            <span className="inline-block border-b-2 border-ink pb-1">
              {typed}
              <span className="ml-0.5 inline-block w-[0.6ch] h-[1em] align-[-0.15em] bg-ink animate-pulse" />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-6 max-w-xl text-lg md:text-xl text-ink2 leading-relaxed"
          >
            Строю сайты, боты и продукты, которые работают.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a href="#projects" className="btn-brutal">
              Смотреть проекты <span aria-hidden>→</span>
            </a>
            <a
              href="#contacts"
              className="font-mono text-sm uppercase tracking-widest underline underline-offset-4 decoration-2 hover:text-accent"
            >
              или напиши мне ↓
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.15, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="md:col-span-5 flex md:justify-end justify-center"
        >
          <RubiksCube />
        </motion.div>
      </div>

      {/* Bottom ticker strip */}
      <div className="mt-16 md:mt-24 border-y-2 border-ink bg-ink text-cream overflow-hidden">
        <div className="flex whitespace-nowrap animate-[scroll_25s_linear_infinite] md:animate-[scroll_60s_linear_infinite] py-3 font-mono text-sm uppercase tracking-widest">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex gap-10 pr-10 shrink-0" aria-hidden={i > 0}>
              <span>Python</span><span className="text-accent">/</span>
              <span>React</span><span className="text-accent">/</span>
              <span>FastAPI</span><span className="text-accent">/</span>
              <span>Telegram Mini Apps</span><span className="text-accent">/</span>
              <span>aiogram</span><span className="text-accent">/</span>
              <span>PostgreSQL</span><span className="text-accent">/</span>
              <span>AI / LLM APIs</span><span className="text-accent">/</span>
              <span>Next.js</span><span className="text-accent">/</span>
              <span>TypeScript</span><span className="text-accent">/</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
