import { SITE_CONFIG } from '@constants/site'
import heroIcon from '@assets/hero-icon.png'

export function HeroSection() {
    return (
        <section className="text-center">
            <div className="mb-4 flex justify-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary-200/40 blur-3xl rounded-full scale-150" aria-hidden="true" />
                    <img src={heroIcon} alt="Shubham International Hospital — World-Class Healthcare" className="w-150 h-60 relative" />
                </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-primary-900 mb-1 tracking-tight leading-tight">
                {SITE_CONFIG.name}
            </h1>

            <h2 className="text-sm sm:text-base text-primary-600 font-medium mb-4">
                {SITE_CONFIG.tagline}
            </h2>

            <div
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-full text-sm font-semibold shadow-lg shadow-primary-200/60 border border-white/10"
                role="status"
                aria-label="Coming soon"
            >
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                Coming Soon
            </div>
        </section>
    )
}
