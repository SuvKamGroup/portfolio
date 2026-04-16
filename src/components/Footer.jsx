export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-cream">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.25em] text-ink2">
        <span>Denis Suvorov &copy; 2025</span>
        <span className="hidden md:inline text-accent">●</span>
        <span>Built brutalist. Shipped with care.</span>
      </div>
    </footer>
  )
}
