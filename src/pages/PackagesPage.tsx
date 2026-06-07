import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useSiteData } from '@contexts/SiteContext'
import { SvgIcon } from '@utils/icon'

export function PackagesPage() {
  const { packages } = useSiteData()

  return (
    <>
      <Helmet>
        <title>Health Packages — Shubham International</title>
        <meta name="description" content="Explore our complete range of health checkup packages and preventive care screenings." />
      </Helmet>

      <section className="py-[clamp(48px,6vw,80px)]">
        <div className="container-wide">
          <div className="max-w-[50ch] mb-12">
            <p className="font-body font-bold text-[.8rem] tracking-[.18em] uppercase text-teal-600">Preventive Care</p>
            <h1 className="text-[clamp(2rem,4.6vw,3.4rem)] mt-[18px]">
              Health Checkup <span className="text-teal-600">Packages</span>
            </h1>
            <div className="w-[60px] h-1 bg-teal-600 rounded my-[22px]" />
            <p className="text-slate-500 text-[1.05rem]">Early detection is the key to a healthier life. Choose from our specially curated health screenings tailored for your needs.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px] items-stretch">
            {packages.length === 0 && (
              <p className="text-slate-400 col-span-full text-center py-20">No packages available yet.</p>
            )}
            {packages.map((pkg) => (
              <Link
                key={pkg.id}
                to={`/packages/${pkg.id}`}
                className={`rounded-lg p-5 sm:p-[30px_26px] flex flex-col relative border transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                  pkg.featured ? 'bg-navy-900 border-navy-900' : 'bg-white border-border'
                }`}
              >
                {pkg.badge && (
                  <span className="absolute top-[18px] right-[18px] bg-cyan-300 text-navy-900 text-[.65rem] font-extrabold tracking-[.08em] px-2.5 py-1 rounded-pill uppercase">{pkg.badge}</span>
                )}
                <h3 className={`text-[1.2rem] ${pkg.featured ? 'text-white' : ''}`}>{pkg.name}</h3>
                <p className={`text-[.9rem] mt-2 min-h-[40px] ${pkg.featured ? 'text-white/70' : 'text-slate-500'}`}>{pkg.desc}</p>
                <ul className="my-5 flex flex-col gap-3 flex-1">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex gap-2.5 text-[.9rem] items-start">
                      <SvgIcon name="check-circle" className={`[&_svg]:w-[18px] [&_svg]:h-[18px] flex-none mt-px ${pkg.featured ? '[&_svg]:text-cyan-300' : '[&_svg]:text-teal-500'}`} />
                      <span className={pkg.featured ? 'text-white/85' : 'text-slate-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mb-5 mt-1.5 flex flex-col">
                  {pkg.oldPrice && <span className="text-[.85rem] text-slate-400 line-through">{pkg.oldPrice}</span>}
                  <span className={`font-display font-bold text-[1.7rem] ${pkg.featured ? 'text-cyan-300' : 'text-ink'}`}>{pkg.price}</span>
                </div>
                <span className={`btn btn-block text-center rounded-pill font-semibold py-[.82em] px-[1.5em] text-[.95rem] transition-all duration-[180ms] ${
                  pkg.featured ? 'bg-white text-navy-900 hover:shadow-md hover:-translate-y-0.5' : 'bg-navy-900 text-white hover:bg-navy-800 hover:-translate-y-0.5'
                }`}>
                  View Details
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
