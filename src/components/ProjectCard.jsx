import { motion } from 'framer-motion'
import ProjectPreview from './ProjectPreview.jsx'

export default function ProjectCard({ project }) {
  return (
    <motion.article
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group relative bg-white text-ink border-2 border-ink h-full min-h-[540px] md:min-h-[600px] flex flex-col"
      variants={{
        rest: { x: 0, y: 0, boxShadow: '4px 4px 0 0 #1a1a1a' },
        hover: { x: -4, y: -4, boxShadow: '8px 8px 0 0 #1a1a1a' },
      }}
      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
    >
      {/* Red hover strip on top */}
      <motion.div
        aria-hidden
        variants={{
          rest: { scaleY: 0 },
          hover: { scaleY: 1 },
        }}
        transition={{ duration: 0.2 }}
        className="absolute top-0 left-0 right-0 h-1 bg-accent origin-top"
      />

      {/* Preview area */}
      <div className="relative border-b-2 border-ink h-[200px] md:h-[240px] flex-shrink-0">
        <ProjectPreview project={project} />
      </div>

      {/* Info */}
      <div className="p-5 md:p-7 flex-1 flex flex-col">
        <div className="flex items-center gap-4">
          <motion.span
            variants={{
              rest: { color: '#e63946', backgroundColor: 'transparent' },
              hover: { color: '#1a1a1a', backgroundColor: '#f5c842' },
            }}
            transition={{ duration: 0.2 }}
            className="font-mono text-sm font-bold px-1.5 py-0.5 border-2 border-ink"
          >
            {project.num}
          </motion.span>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink2">
            {project.type}
          </span>
          <div className="ml-auto h-[2px] flex-1 bg-ink/15" />
        </div>

        <h3
          className="mt-4 font-display font-bold leading-tight"
          style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)' }}
        >
          {project.title}
        </h3>
        <p className="mt-3 text-ink2 leading-relaxed max-w-xl line-clamp-3">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li key={s} className="tag-brutal !py-1 !px-2 !text-xs">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <motion.a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-ink font-mono text-xs uppercase tracking-widest"
            variants={{
              rest: {
                backgroundColor: '#ffffff',
                x: 0,
                y: 0,
                boxShadow: '3px 3px 0 0 #1a1a1a',
              },
              hover: {
                backgroundColor: '#f5c842',
                x: -2,
                y: -2,
                boxShadow: '5px 5px 0 0 #1a1a1a',
              },
            }}
            transition={{ duration: 0.15 }}
          >
            Открыть проект <span aria-hidden>→</span>
          </motion.a>
        </div>
      </div>
    </motion.article>
  )
}
