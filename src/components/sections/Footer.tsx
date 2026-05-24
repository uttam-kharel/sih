import { SITE_CONFIG } from '@constants/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 pb-5 text-center">
      <div className="flex justify-center gap-2 items-center mb-1.5">
        <span className="w-4 h-px bg-primary-200/40" aria-hidden="true" />
        <span className="w-1 h-1 rounded-full bg-primary-300/40" aria-hidden="true" />
        <span className="w-4 h-px bg-primary-200/40" aria-hidden="true" />
      </div>
      <p className="text-primary-400/60 text-[10px] font-medium tracking-[0.08em]">
        &copy; {year} {SITE_CONFIG.name}
      </p>
    </footer>
  )
}