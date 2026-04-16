import { motion } from 'framer-motion'

const TelegramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 3 2 10l7 3 3 7 10-17z" />
    <path d="m22 3-13 10" />
  </svg>
)

const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="4" width="20" height="16" rx="1" />
    <path d="m2 6 10 7 10-7" />
  </svg>
)

const CONTACTS = [
  {
    id: 'tg',
    label: 'Telegram',
    value: '@Suvorovdv',
    href: 'https://t.me/Suvorovdv',
    Icon: TelegramIcon,
  },
  {
    id: 'mail',
    label: 'Email',
    value: 'erkobraxx@gmail.com',
    href: 'mailto:erkobraxx@gmail.com',
    Icon: MailIcon,
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
}

export default function Contacts() {
  return (
    <section id="contacts" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex items-baseline gap-4 mb-10">
          <span className="font-mono text-sm text-accent font-bold">03</span>
          <div className="h-[2px] bg-ink flex-1 max-w-[80px]" />
          <h2 className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-ink2">
            Get in touch
          </h2>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-display font-extrabold leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
        >
          ДАВАЙ <span className="bg-accent text-white px-3 border-2 border-ink inline-block -rotate-1">РАБОТАТЬ</span>
          <br />
          ВМЕСТЕ<span className="text-accent">.</span>
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 max-w-xl text-lg text-ink2"
        >
          Напишите в Telegram — отвечаю быстрее, чем по почте. Опишите идею в паре
          предложений, дальше разберёмся.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
        >
          {CONTACTS.map(({ id, label, value, href, Icon }) => (
            <motion.a
              key={id}
              variants={item}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              whileHover={{
                y: -3,
                x: -3,
                backgroundColor: '#f5c842',
                boxShadow: '7px 7px 0 0 #1a1a1a',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="group relative block bg-white border-2 border-ink p-7 md:p-9 shadow-brut4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="text-ink">
                  <Icon />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink2">
                  /{String(CONTACTS.indexOf(CONTACTS.find((c) => c.id === id)) + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-ink2">
                {label}
              </div>
              <div
                className="mt-2 font-display font-extrabold leading-none whitespace-nowrap overflow-hidden"
                style={{
                  fontSize:
                    value.length > 12
                      ? 'clamp(1rem, 2.4vw, 1.7rem)'
                      : 'clamp(1.6rem, 3vw, 2.4rem)',
                }}
              >
                {value}
              </div>
              <div className="mt-8 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
                <span>Написать</span>
                <motion.span
                  aria-hidden
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  className="text-xl"
                >
                  →
                </motion.span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
