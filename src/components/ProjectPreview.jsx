import { motion } from 'framer-motion'

/**
 * Brutalist editorial-style previews. No iframes — static compositions.
 * To replace with real media later, add `image` or `video` to the project entry.
 */
export default function ProjectPreview({ project }) {
  const { image, video, preview } = project

  if (video) {
    return (
      <div className="relative w-full h-full bg-ink overflow-hidden">
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    )
  }
  if (image) {
    const isBot = project.type === 'TELEGRAM BOT'
    const zoom = project.imageZoom
    return (
      <div className={`relative w-full h-full overflow-hidden ${isBot ? 'bg-[#17212b]' : 'bg-ink'}`}>
        <img
          src={image}
          alt={project.title}
          style={zoom ? { transform: `scale(${zoom})`, transformOrigin: 'center' } : undefined}
          className="w-full h-full object-cover object-center"
        />
      </div>
    )
  }

  switch (preview?.kind) {
    case 'slides':
      return <SlidesPreview label={preview.label} />
    case 'printer':
      return <PrinterPreview label={preview.label} />
    case 'telegram':
      return <TelegramPreview {...preview} />
    default:
      return <FallbackPreview label={project.title} />
  }
}

function SlidesPreview({ label }) {
  return (
    <div className="relative w-full h-full bg-cream overflow-hidden">
      {/* grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* stacked slide cards */}
      <motion.div
        initial={{ rotate: -6, y: 10 }}
        animate={{ rotate: -6, y: [10, 6, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-8 top-8 w-44 h-28 bg-white border-2 border-ink shadow-brut4"
      >
        <div className="h-3 bg-accent border-b-2 border-ink" />
        <div className="p-3 space-y-2">
          <div className="h-2 bg-ink w-5/6" />
          <div className="h-2 bg-ink/30 w-4/6" />
          <div className="h-2 bg-ink/30 w-3/6" />
        </div>
      </motion.div>
      <motion.div
        initial={{ rotate: 3, y: 0 }}
        animate={{ rotate: 3, y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute right-10 top-14 w-48 h-32 bg-yellow border-2 border-ink shadow-brut4"
      >
        <div className="p-3">
          <div className="font-mono text-[10px]">SLIDE 04 / 10</div>
          <div className="mt-2 h-4 bg-ink w-4/5" />
          <div className="mt-2 grid grid-cols-3 gap-1">
            <div className="h-8 bg-ink" />
            <div className="h-8 bg-white border-2 border-ink" />
            <div className="h-8 bg-accent" />
          </div>
        </div>
      </motion.div>
      <div className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-widest text-ink2">
        {label}
      </div>
      <div className="absolute bottom-3 right-4 font-mono text-[10px] text-accent">● LIVE</div>
    </div>
  )
}

function PrinterPreview({ label }) {
  return (
    <div className="relative w-full h-full bg-ink text-cream overflow-hidden">
      {/* iso grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(60deg, #fff 0 1px, transparent 1px 18px), repeating-linear-gradient(-60deg, #fff 0 1px, transparent 1px 18px)',
        }}
      />
      {/* isometric object stack */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: 160, height: 160 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="absolute left-1/2 -translate-x-1/2 border-2 border-cream"
              style={{
                bottom: i * 12,
                width: 120 - i * 10,
                height: 14,
                background: i === 4 ? '#e63946' : i === 2 ? '#f5c842' : '#1a1a1a',
                transform: `translateX(-50%) skewX(-20deg)`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="absolute top-3 left-4 font-mono text-[10px] uppercase tracking-widest text-yellow">
        {label}
      </div>
      <div className="absolute top-3 right-4 font-mono text-[10px] text-cream/60">
        LAYER 04 / 12
      </div>
      <div className="absolute bottom-3 left-4 right-4 font-mono text-[10px] text-cream/70 flex justify-between">
        <span>PRINTING...</span>
        <span className="text-accent">████████░░ 82%</span>
      </div>
    </div>
  )
}

function TelegramPreview({ botName, botHandle, messages = [] }) {
  return (
    <div className="relative w-full h-full bg-[#17212b] text-[#e9edef] overflow-hidden flex flex-col">
      {/* header */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#202b36] border-b border-black/40">
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-mono text-xs font-bold">
          {botName.slice(0, 1)}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-sm truncate">{botName}</div>
          <div className="text-[10px] text-[#7d8e98] truncate">{botHandle} · bot</div>
        </div>
        <div className="ml-auto text-[#7d8e98] text-[10px]">online</div>
      </div>
      {/* messages */}
      <div className="flex-1 overflow-hidden px-3 py-3 space-y-2 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22><circle cx=%2220%22 cy=%2220%22 r=%221%22 fill=%22%23243341%22/></svg>')]">
        {messages.slice(0, 4).map((m, i) => (
          <div
            key={i}
            className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[78%] px-3 py-1.5 text-[12px] leading-snug whitespace-pre-line ${
                m.from === 'user'
                  ? 'bg-[#2b5278] text-white rounded-[12px] rounded-br-[3px]'
                  : 'bg-[#182533] text-[#e9edef] rounded-[12px] rounded-bl-[3px]'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 px-3 py-2 bg-[#202b36] border-t border-black/40">
        <div className="flex-1 h-7 rounded bg-[#17212b] border border-black/40 px-2 flex items-center text-[11px] text-[#7d8e98]">
          Message
        </div>
        <div className="w-7 h-7 rounded-full bg-[#2b5278] flex items-center justify-center text-white text-[12px]">
          ➤
        </div>
      </div>
    </div>
  )
}

function FallbackPreview({ label }) {
  return (
    <div className="relative w-full h-full bg-accent text-white flex items-center justify-center overflow-hidden">
      <div className="font-display font-extrabold text-3xl md:text-4xl uppercase tracking-tight px-6 text-center">
        {label}
      </div>
    </div>
  )
}
