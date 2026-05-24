import { HeroSection } from '@components/sections/HeroSection'
import { StatsSection } from '@components/sections/StatsSection'
import { Footer } from '@components/sections/Footer'

export function ComingSoonPage() {
  return (
    <main className="h-screen bg-primary-50 flex flex-col relative overflow-hidden selection:bg-primary-200/60">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-48 -right-32 w-[28rem] h-[28rem] bg-primary-200/50 rounded-[40%_60%_50%_50%/50%_40%_60%_50%] blur-[80px] animate-drift-1" />
        <div className="absolute -bottom-32 -left-32 w-[24rem] h-[24rem] bg-primary-200/40 rounded-[50%_40%_60%_40%/40%_60%_50%_60%] blur-[70px] animate-drift-2" />
        <div className="absolute top-[55%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-soft/30 rounded-[50%] blur-[120px]" />
        <div className="absolute inset-0 bg-[image:repeating-linear-gradient(0deg,transparent,transparent_2px,oklch(0.5_0_0/0.015)_2px,oklch(0.5_0_0/0.015)_3px)]" />
        <div className="absolute inset-0 bg-[image:repeating-linear-gradient(90deg,transparent,transparent_2px,oklch(0.5_0_0/0.015)_2px,oklch(0.5_0_0/0.015)_3px)]" />
      </div>

      <div className="absolute top-12 left-8 w-20 h-20 border border-primary-200/30 rounded-[2rem_6rem_4rem_3rem/3rem_4rem_6rem_2rem] rotate-12 opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-20 right-10 w-14 h-14 border border-accent/20 rounded-[3rem_2rem_5rem_2rem/2rem_5rem_2rem_4rem] -rotate-6 opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className="text-center max-w-md mx-auto animate-fade-in w-full">
          <HeroSection />
          <div className="mt-6">
            <StatsSection />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
