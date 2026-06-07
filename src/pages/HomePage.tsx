import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useSiteData } from '@contexts/SiteContext'
import { SvgIcon } from '@utils/icon'

export function HomePage() {
  const { site, packages, values, insights } = useSiteData()

  return (
    <>
      <Helmet>
        <title>{site.name} — Humanizing Healthcare for Everyone</title>
        <meta name="description" content="World-class clinical precision and compassionate patient care at Shubham International Hospital." />
      </Helmet>

      {/* Hero */}
      <section className="relative bg-navy-900 text-white overflow-hidden min-h-[560px] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_15%,rgba(79,198,214,.16),transparent_55%)] pointer-events-none" />
        <div className="container-wide relative z-2 w-full py-[72px]">
          <p className="font-body font-bold text-[.8rem] tracking-[.18em] uppercase text-cyan-300">{site.heroEyebrow}</p>
          <h1 className="text-[clamp(2.6rem,6vw,4.6rem)] text-white leading-[1.02] mt-[18px]">
            {site.heroTitle} <span className="text-cyan-300">{site.heroAccent}</span>
          </h1>
          <p className="text-white/78 max-w-[46ch] text-[1.08rem] mt-[22px]">{site.heroLead}</p>
          <div className="flex gap-3.5 mt-8 flex-wrap">
            <Link to="/contact" className="btn btn-primary btn-lg">
              Book an Appointment
              <SvgIcon name="arrow" className="[&_svg]:w-[18px] [&_svg]:h-[18px]" />
            </Link>
            <Link to="/services" className="btn btn-ghost on-dark btn-lg">View Our Specialties</Link>
          </div>
        </div>
      </section>

      {/* Quick action cards */}
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-16 relative z-5">
          <Link to="/doctors" className="rounded-lg p-5 sm:p-6 md:p-8 min-h-[200px] md:min-h-[220px] flex flex-col shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg bg-navy-900 text-white">
            <div className="w-[48px] sm:w-[52px] h-[48px] sm:h-[52px] rounded-[14px] grid place-items-center flex-none" style={{ background: '#13414f', color: '#4FC6D6' }}>
              <SvgIcon name="doctor-search" className="[&_svg]:w-5 sm:[&_svg]:w-6 [&_svg]:h-5 sm:[&_svg]:h-6" />
            </div>
            <h3 className="text-[1.25rem] sm:text-[1.45rem] text-white mt-3 sm:mt-[18px] font-display">Find a Doctor</h3>
            <p className="text-[.9rem] sm:text-[.95rem] text-white/72 mt-2 flex-1">Access our network of internationally trained specialists across 40+ departments.</p>
            <span className="font-bold text-[.88rem] sm:text-[.92rem] text-cyan-300 inline-flex items-center gap-1.5 mt-3.5">
              Search Directory <SvgIcon name="arrow" className="[&_svg]:w-4 [&_svg]:h-4" />
            </span>
          </Link>

          <Link to="/services" className="rounded-lg p-5 sm:p-6 md:p-8 min-h-[200px] md:min-h-[220px] flex flex-col shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg bg-surface text-ink">
            <div className="w-[48px] sm:w-[52px] h-[48px] sm:h-[52px] rounded-[14px] grid place-items-center flex-none bg-cyan-100 text-teal-600">
              <SvgIcon name="flask" className="[&_svg]:w-5 sm:[&_svg]:w-6 [&_svg]:h-5 sm:[&_svg]:h-6" />
            </div>
            <h3 className="text-[1.25rem] sm:text-[1.45rem] mt-3 sm:mt-[18px] font-display">Our Services</h3>
            <p className="text-[.9rem] sm:text-[.95rem] text-slate-500 mt-2 flex-1">From advanced diagnostics to complex surgeries, we provide holistic care paths.</p>
            <span className="font-bold text-[.88rem] sm:text-[.92rem] text-teal-600 inline-flex items-center gap-1.5 mt-3.5">
              Explore Services <SvgIcon name="arrow" className="[&_svg]:w-4 [&_svg]:h-4" />
            </span>
          </Link>

          <div className="rounded-lg p-5 sm:p-6 md:p-8 min-h-[200px] md:min-h-[220px] flex flex-col shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg bg-danger-bg">
            <div className="w-[48px] sm:w-[52px] h-[48px] sm:h-[52px] rounded-[14px] grid place-items-center flex-none bg-danger-bg text-danger">
              <SvgIcon name="emergency" className="[&_svg]:w-5 sm:[&_svg]:w-6 [&_svg]:h-5 sm:[&_svg]:h-6" />
            </div>
            <h3 className="text-[1.25rem] sm:text-[1.45rem] text-danger mt-3 sm:mt-[18px] font-display">Emergency</h3>
            <p className="text-[.9rem] sm:text-[.95rem] text-[#9a4138] mt-2 flex-1">Available 24/7. Our rapid response team is ready for any medical crisis, anytime.</p>
            <a href={`tel:${site.emergencyPhone.replace(/\s/g, '')}`} className="font-bold text-[.88rem] sm:text-[.92rem] text-danger inline-flex items-center gap-1.5 mt-3.5">
              Call {site.emergencyPhone}
            </a>
          </div>
        </div>
      </div>

      {/* Packages */}
      <section className="py-[clamp(56px,8vw,104px)]">
        <div className="container-wide">
          <div className="flex justify-between items-center gap-5 flex-wrap mb-9">
            <div>
              <p className="font-body font-bold text-[.8rem] tracking-[.18em] uppercase text-teal-600">Preventive Care</p>
              <h2 className="sec-title mt-3">Health Checkup Packages</h2>
              <p className="text-slate-500 mt-[14px] max-w-[56ch]">Early detection is the key to a healthier life. Choose from our specially curated health screenings tailored for your needs.</p>
            </div>
            <Link to="/packages" className="font-bold text-teal-600 inline-flex items-center gap-[7px] shrink-0">
              View All Packages <SvgIcon name="arrow" className="[&_svg]:w-[18px] [&_svg]:h-[18px]" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px] items-stretch">
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

      {/* Difference */}
      <section className="py-[clamp(56px,8vw,104px)] bg-bg-alt">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-end mb-12">
            <div>
              <p className="font-body font-bold text-[.8rem] tracking-[.18em] uppercase text-teal-600">The Shubham Difference</p>
              <h2 className="sec-title mt-3">Redefining clinical excellence through empathy.</h2>
            </div>
            <p className="text-slate-500">We merge advanced technology with the human touch to create an environment where healing begins the moment you enter.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {values.map((v) => (
              <div key={v.id}>
                <div className="w-[52px] h-[52px] rounded-[14px] grid place-items-center flex-none bg-white text-navy-900 shadow-sm">
                  <SvgIcon name={v.icon} className="[&_svg]:w-6 [&_svg]:h-6" />
                </div>
                <h3 className="text-[1.2rem] mt-[18px] mb-2">{v.title}</h3>
                <p className="text-[.94rem] text-slate-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="py-[clamp(56px,8vw,104px)]">
        <div className="container-wide">
          <div className="flex justify-between items-center gap-5 flex-wrap mb-9">
            <h2 className="sec-title">Latest Health Insights</h2>
            <Link to="/insights" className="font-bold text-teal-600 inline-flex items-center gap-[7px]">
              View All Stories <SvgIcon name="arrow" className="[&_svg]:w-[18px] [&_svg]:h-[18px]" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-[26px]">
            {insights.slice(0, 3).map((i) => (
              <Link key={i.id} to={`/insights/${i.id}`} className="bg-white rounded-lg overflow-hidden border border-border flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-[16/9] bg-bg-alt overflow-hidden">
                  {i.image ? (
                    <img src={i.image} alt={i.title} loading="lazy" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-semibold">
                      <SvgIcon name="image" className="[&_svg]:w-10 [&_svg]:h-10" />
                    </div>
                  )}
                </div>
                <div className="p-[22px]">
                  <span className="inline-flex items-center gap-[.4em] text-[.72rem] font-bold tracking-[.04em] px-[.8em] py-[.38em] rounded-pill uppercase bg-cyan-100 text-teal-700">{i.category}</span>
                  <h3 className="text-[1.12rem] mt-3 mb-2 leading-snug">{i.title}</h3>
                  <p className="text-[.9rem] text-slate-500">{i.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-[clamp(56px,8vw,104px)]">
        <div className="container-wide">
          <div className="bg-gradient-to-br from-navy-800 to-teal-700 rounded-xl p-[clamp(40px,6vw,80px)] text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_-10%,rgba(111,214,226,.22),transparent_60%)]" />
            <div className="relative z-2">
              <p className="font-body font-bold text-[.8rem] tracking-[.18em] uppercase text-cyan-300">Your Health, Our Priority</p>
              <h2 className="text-white text-[clamp(1.8rem,4vw,3rem)] max-w-[18ch] mx-auto mt-3.5">Ready to experience world-class clinical care?</h2>
              <p className="text-white/80 max-w-[48ch] mx-auto mt-5">Schedule your consultation today with our expert specialists. We make it easy for you to access the best healthcare services tailored to your needs.</p>
              <div className="flex gap-3.5 justify-center mt-8 flex-wrap">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  <SvgIcon name="calendar" className="[&_svg]:w-[18px] [&_svg]:h-[18px]" />
                  Book Your Appointment
                </Link>
                <Link to="/contact" className="btn btn-ghost on-dark btn-lg">Call Us Now</Link>
              </div>
              <p className="text-white/55 text-[.82rem] mt-[22px]">Available 24/7 for emergency consultations and bookings.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
