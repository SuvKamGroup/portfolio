import { motion } from 'framer-motion'

const TAGS = [
  'Python', 'React', 'JavaScript', 'TypeScript', 'Next.js', 'FastAPI',
  'Telegram Bot API', 'Telegram Mini Apps', 'aiogram', 'SQL', 'PostgreSQL',
  'AI / LLM APIs', 'REST API', 'Лендинги',
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
}
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] } },
}

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex items-baseline gap-4 mb-14 md:mb-24"
        >
          <span className="font-mono text-sm text-accent font-bold">01</span>
          <div className="h-[2px] bg-ink flex-1 max-w-[80px]" />
          <h2 className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-ink2">
            About the author
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="md:col-span-7"
          >
            <p
              className="font-display font-extrabold leading-[1.35] text-ink"
              style={{ fontSize: 'clamp(1.75rem, 3.4vw, 3rem)' }}
            >
              Fullstack-разработчик с фокусом на{' '}
              <span className="bg-yellow px-2 border-2 border-ink whitespace-nowrap inline-block">
                Telegram-экосистему
              </span>{' '}
              и веб. Создаю ботов, Mini Apps, лендинги и интегрирую{' '}
              <span className="text-accent">AI</span> в продукты.
            </p>
            <p className="mt-8 max-w-xl text-lg text-ink2 leading-[1.75]">
              Люблю, когда код решает реальные задачи. Предпочитаю простые решения
              сложным абстракциям, а честные сроки — обещаниям «за пару дней».
            </p>

            <div className="mt-14 grid grid-cols-3 gap-0 border-2 border-ink bg-white">
              {[
                { tag: 'now', display: '5 лет', sub: 'в разработке' },
                { tag: 'ex', display: 'Т-банк', sub: 'опыт работы' },
                { tag: 'ex', display: 'Яндекс', sub: 'опыт работы' },
              ].map((s, i) => (
                <div
                  key={s.display}
                  className={`p-3 md:p-7 flex flex-col justify-between min-h-[130px] md:min-h-[200px] ${
                    i < 2 ? 'border-r-2 border-ink' : ''
                  }`}
                >
                  <div>
                    <div className="font-mono text-[9px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.25em] flex items-center gap-1.5 md:gap-2">
                      <span className="hidden md:inline-block w-1.5 h-1.5 bg-accent" />
                      <span className="text-accent font-bold">{s.tag}</span>
                      <span className="text-ink2 hidden md:inline">·</span>
                    </div>
                    <div
                      className="mt-3 md:mt-7 font-display font-extrabold leading-none text-ink whitespace-nowrap"
                      style={{ fontSize: 'clamp(1.05rem, 4.2vw, 2.8rem)' }}
                    >
                      {s.display}
                    </div>
                  </div>
                  <div className="mt-3 md:mt-6 font-mono text-[9px] md:text-xs uppercase tracking-[0.15em] md:tracking-widest text-ink2">
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="md:col-span-5"
          >
            <div className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-ink2">
              // stack — ordered by frequency
            </div>
            <ul className="flex flex-wrap gap-2.5">
              {TAGS.map((t) => (
                <motion.li key={t} variants={item}>
                  <span className="tag-brutal">{t}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
