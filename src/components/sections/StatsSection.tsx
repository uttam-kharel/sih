import { STATS } from '@constants/site'

const card = "rounded-xl bg-surface/50 backdrop-blur-sm border border-primary-100/50 shadow-[0_1px_3px_oklch(0_0_0/0.04)]"

export function StatsSection() {
  return (
    <section aria-label="Hospital facilities and services">
      <h2 className="sr-only">Our Services</h2>
      <div className="grid grid-cols-3 gap-2.5 text-center">
        {STATS.map((stat) => (
          <div key={stat.label} className={`${card} px-3 py-3.5`}>
            <div className="text-lg sm:text-xl font-bold text-primary-700 tracking-tight leading-none">
              {stat.value}
            </div>
            <div className="mt-1 text-[10px] font-medium text-primary-400 uppercase tracking-[0.12em] leading-snug">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
