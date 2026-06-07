import { Helmet } from 'react-helmet-async'
import { Link, useParams, Navigate } from 'react-router-dom'
import { useSiteData } from '@contexts/SiteContext'
import { SvgIcon } from '@utils/icon'

export function PackageDetailPage() {
  const { id } = useParams()
  const { packages } = useSiteData()
  const pkg = packages.find((p) => p.id === id)

  if (!pkg) return <Navigate to="/packages" replace />

  return (
    <>
      <Helmet>
        <title>{pkg.name} — Shubham International</title>
        <meta name="description" content={pkg.desc} />
      </Helmet>

      <section className="py-[clamp(48px,6vw,80px)]">
        <div className="container-wide max-w-[960px]">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors mb-8 text-[.92rem]"
          >
            <SvgIcon name="arrow" className="[&_svg]:w-4 [&_svg]:h-4 [&_svg]:rotate-180" />
            Back to Packages
          </Link>

          <div className="bg-white rounded-xl border border-border shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-[55%] p-5 sm:p-6 md:p-[clamp(28px,3.5vw,44px)] flex flex-col">
                {pkg.badge && (
                  <span className="inline-block self-start text-[.65rem] font-extrabold tracking-[.08em] px-3 py-1.5 rounded-pill uppercase mb-4 bg-cyan-100 text-teal-700">
                    {pkg.badge}
                  </span>
                )}
                <h1 className="text-[clamp(1.5rem,3vw,2.2rem)]">{pkg.name}</h1>
                <p className="text-slate-500 mt-3 text-[.95rem] leading-relaxed">{pkg.desc}</p>
                <div className="flex items-baseline gap-3 mt-5 pb-5 border-b border-border">
                  {pkg.oldPrice && <span className="text-[1rem] text-slate-400 line-through">{pkg.oldPrice}</span>}
                  <span className="font-display font-bold text-[2rem] text-ink">{pkg.price}</span>
                </div>
                {pkg.features.length > 0 && (
                  <ul className="flex flex-col gap-3 mt-5 flex-1">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex gap-3 text-[.94rem] items-start">
                        <SvgIcon name="check-circle" className="[&_svg]:w-[20px] [&_svg]:h-[20px] flex-none mt-0.5 [&_svg]:text-teal-500" />
                        <span className="text-slate-600">{f}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 rounded-pill font-semibold py-[.85em] px-[1.6em] text-[.96rem] transition-all duration-[180ms] mt-6 bg-navy-900 text-white hover:bg-navy-800 hover:-translate-y-0.5 hover:shadow-lg self-start"
                >
                  <SvgIcon name="calendar" className="[&_svg]:w-[18px] [&_svg]:h-[18px]" />
                  Book This Package
                </Link>
              </div>
              <div className="md:w-[45%] min-h-[240px] sm:min-h-[320px] md:min-h-full bg-bg-alt overflow-hidden">
                {pkg.image ? (
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full min-h-[320px] flex items-center justify-center text-slate-300">
                    <SvgIcon name="image" className="[&_svg]:w-24 [&_svg]:h-24" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 text-teal-600 font-bold hover:underline"
            >
              <SvgIcon name="arrow" className="[&_svg]:w-4 [&_svg]:h-4 [&_svg]:rotate-180" />
              View All Packages
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
