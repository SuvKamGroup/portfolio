import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PROJECTS } from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'

const CATEGORIES = [
  { id: 'all', label: 'Все', match: () => true },
  { id: 'web', label: 'Сайты', match: (p) => ['WEB APP', 'LANDING'].includes(p.type) },
  { id: 'bot', label: 'Боты', match: (p) => p.type === 'TELEGRAM BOT' },
]

const AUTO_MS = 4500
const PAUSE_MS = 30000

const slideVariants = {
  enter: (d) => ({ x: d > 0 ? 120 : -120, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d) => ({ x: d > 0 ? -120 : 120, opacity: 0 }),
}

const viewVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 12 },
  show: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: -8 },
}

export default function Projects() {
  const [view, setView] = useState('slider')
  const [catId, setCatId] = useState('all')
  const [[index, dir], setState] = useState([0, 0])
  const [autoPlay, setAutoPlay] = useState(true)
  const pauseRef = useRef(null)

  const filtered = useMemo(() => {
    const cat = CATEGORIES.find((c) => c.id === catId)
    return PROJECTS.filter(cat.match)
  }, [catId])

  useEffect(() => {
    setState([0, 0])
  }, [catId])

  const pauseAutoplay = useCallback(() => {
    setAutoPlay(false)
    clearTimeout(pauseRef.current)
    pauseRef.current = setTimeout(() => setAutoPlay(true), PAUSE_MS)
  }, [])

  const paginate = useCallback(
    (delta, fromUser = false) => {
      setState(([i]) => {
        const len = filtered.length
        if (len === 0) return [0, 0]
        const next = (i + delta + len) % len
        return [next, delta > 0 ? 1 : -1]
      })
      if (fromUser) pauseAutoplay()
    },
    [filtered.length, pauseAutoplay]
  )

  const goTo = useCallback(
    (i, fromUser = false) => {
      setState(([cur]) => [i, i > cur ? 1 : -1])
      if (fromUser) pauseAutoplay()
    },
    [pauseAutoplay]
  )

  useEffect(() => {
    if (view !== 'slider' || !autoPlay || filtered.length <= 1) return
    const id = setInterval(() => paginate(1, false), AUTO_MS)
    return () => clearInterval(id)
  }, [view, autoPlay, filtered.length, paginate])

  useEffect(() => () => clearTimeout(pauseRef.current), [])

  const safeIdx = Math.min(index, Math.max(0, filtered.length - 1))
  const current = filtered[safeIdx]

  const handleViewChange = (v) => {
    if (v === view) return
    setView(v)
    clearTimeout(pauseRef.current)
    setAutoPlay(true)
  }

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-ink text-cream overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Section header */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10 md:mb-14">
          <div className="min-w-0">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-mono text-sm text-yellow font-bold">02</span>
              <div className="h-[2px] bg-cream flex-1 max-w-[80px]" />
              <h2 className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-cream/70">
                Selected works
              </h2>
            </div>
            <h3
              className="font-display font-extrabold leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
            >
              МОИ{' '}
              <span className="bg-yellow text-ink px-3 border-2 border-cream inline-block -rotate-1">
                ПРОЕКТЫ
              </span>
              <span className="text-accent">.</span>
            </h3>
          </div>

          <ViewToggle view={view} onChange={handleViewChange} />
        </div>

        {/* Category tabs + status */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10 md:mb-12">
          <div className="flex flex-wrap gap-2 md:gap-3" role="tablist" aria-label="Категория">
            {CATEGORIES.map((c) => {
              const count = PROJECTS.filter(c.match).length
              const active = c.id === catId
              return (
                <motion.button
                  key={c.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCatId(c.id)}
                  whileHover={{ x: -2, y: -2 }}
                  whileTap={{ x: 0, y: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`relative inline-flex items-center gap-2 px-4 py-2 border-2 border-cream font-mono text-xs md:text-sm uppercase tracking-[0.2em] ${
                    active ? 'bg-cream text-ink' : 'bg-ink text-cream'
                  }`}
                  style={{ boxShadow: active ? '5px 5px 0 0 #e63946' : '3px 3px 0 0 #e63946' }}
                >
                  {c.label}
                  <span
                    className={`text-[10px] ${
                      active ? 'text-accent' : 'text-cream/50'
                    }`}
                  >
                    {String(count).padStart(2, '0')}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {view === 'slider' && filtered.length > 1 && (
            <div className="hidden md:flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-cream/70">
              <span>{String(safeIdx + 1).padStart(2, '0')}</span>
              <span className="w-16 h-[2px] bg-cream/40 relative overflow-hidden">
                <motion.span
                  className="absolute inset-y-0 left-0 bg-accent"
                  animate={{
                    width: `${((safeIdx + 1) / filtered.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </span>
              <span>{String(filtered.length).padStart(2, '0')}</span>
              <AnimatePresence>
                {!autoPlay && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    className="ml-2 text-accent normal-case tracking-normal"
                  >
                    ● пауза
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* View swap */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {view === 'slider' ? (
              <motion.div
                key="view-slider"
                variants={viewVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <SliderView
                  filtered={filtered}
                  current={current}
                  index={safeIdx}
                  dir={dir}
                  paginate={paginate}
                  goTo={goTo}
                />
              </motion.div>
            ) : (
              <motion.div
                key="view-grid"
                variants={viewVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <GridView projects={filtered} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function ViewToggle({ view, onChange }) {
  const options = [
    {
      id: 'slider',
      label: 'Слайдер',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="10" height="10" />
        </svg>
      ),
    },
    {
      id: 'grid',
      label: 'Сетка',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="5" height="5" />
          <rect x="9" y="2" width="5" height="5" />
          <rect x="2" y="9" width="5" height="5" />
          <rect x="9" y="9" width="5" height="5" />
        </svg>
      ),
    },
  ]
  return (
    <div
      className="relative inline-flex border-2 border-cream bg-ink"
      role="group"
      aria-label="Вид отображения"
      style={{ boxShadow: '3px 3px 0 0 #e63946' }}
    >
      {options.map((o, i) => {
        const active = view === o.id
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            aria-pressed={active}
            className={`relative inline-flex items-center gap-2 px-3 md:px-4 py-2 font-mono text-xs uppercase tracking-widest z-10 transition-colors ${
              i > 0 ? 'border-l-2 border-cream' : ''
            } ${active ? 'text-ink' : 'text-cream'}`}
          >
            {active && (
              <motion.span
                layoutId="view-toggle-active"
                className="absolute inset-0 bg-cream -z-0"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {o.icon}
              <span className="hidden sm:inline">{o.label}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

function SliderView({ filtered, current, index, dir, paginate, goTo }) {
  if (!current) return <EmptyState />

  return (
    <>
      <div className="relative overflow-hidden">
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={current.id}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              const threshold = 80
              if (info.offset.x < -threshold || info.velocity.x < -400) paginate(1, true)
              else if (info.offset.x > threshold || info.velocity.x > 400) paginate(-1, true)
            }}
            className="max-w-[900px] mx-auto cursor-grab active:cursor-grabbing"
          >
            <ProjectCard project={current} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 md:mt-10 flex items-center justify-between gap-6">
        <ArrowButton direction="left" onClick={() => paginate(-1, true)} label="Предыдущий проект" />

        <div className="flex items-center gap-3" role="tablist" aria-label="Проекты">
          {filtered.map((p, i) => {
            const active = i === index
            return (
              <button
                key={p.id}
                onClick={() => goTo(i, true)}
                aria-label={`Перейти к проекту ${p.title}`}
                aria-selected={active}
                role="tab"
                className="relative grid place-items-center"
                style={{ width: 22, height: 22 }}
              >
                <span
                  className={`block border-2 border-cream ${
                    active ? 'bg-accent' : 'bg-transparent'
                  }`}
                  style={{
                    width: active ? 18 : 10,
                    height: active ? 18 : 10,
                    transition: 'all 200ms',
                  }}
                />
              </button>
            )
          })}
        </div>

        <ArrowButton direction="right" onClick={() => paginate(1, true)} label="Следующий проект" />
      </div>

      <div className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-cream/50">
        drag card — or use arrows
      </div>
    </>
  )
}

function GridView({ projects }) {
  if (projects.length === 0) return <EmptyState />

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
      }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
    >
      {projects.map((p) => (
        <motion.div
          key={p.id}
          variants={{
            hidden: { opacity: 0, y: 24, scale: 0.96 },
            show: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] },
            },
          }}
          className="h-full"
        >
          <ProjectCard project={p} />
        </motion.div>
      ))}
    </motion.div>
  )
}

function ArrowButton({ direction, onClick, label }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="group w-12 h-12 md:w-14 md:h-14 bg-cream text-ink border-2 border-cream font-display text-2xl font-bold flex items-center justify-center transition-all hover:-translate-x-0.5 hover:-translate-y-0.5"
      style={{ boxShadow: '4px 4px 0 0 #e63946' }}
    >
      <span aria-hidden>{direction === 'left' ? '←' : '→'}</span>
    </button>
  )
}

function EmptyState() {
  return (
    <div className="py-24 text-center font-mono text-xs uppercase tracking-[0.3em] text-cream/60">
      // нет проектов в этой категории
    </div>
  )
}
