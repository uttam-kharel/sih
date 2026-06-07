import { Helmet } from 'react-helmet-async'
import { useSiteData } from '@contexts/SiteContext'
import { SvgIcon } from '@utils/icon'
import { IconTile, SectionTitle } from '@components/UI'

export function AboutPage() {
  const { about, site, stats, doctors, accreditations } = useSiteData()
  const years = new Date().getFullYear() - parseInt(site.established, 10)

  const statItems = stats.filter((s) => !/year/i.test(s.label))

  const leaders = doctors.filter((d) => d.featured).slice(0, 4)

  return (
    <>
      <Helmet>
        <title>About — Shubham International</title>
        <meta name="description" content="Defining the future of clinical excellence since 1998." />
      </Helmet>

      {/* Hero with image */}
      <section className="relative text-white min-h-[520px] flex items-end overflow-hidden">
        {about.heroImage && (
          <img src={about.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/35 to-navy-900/78 z-1" />
        <div className="container-wide relative z-2 w-full py-16">
          <p className="font-body font-bold text-[.8rem] tracking-[.18em] uppercase text-cyan-300">{about.heroEyebrow}</p>
          <h1 className="hero-display text-white mt-3.5 max-w-[14ch]">
            {about.heroTitle} <span className="text-cyan-300">{about.heroAccent}</span>
          </h1>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <div className="bg-white rounded-lg p-5 sm:p-6 md:p-[clamp(28px,3.5vw,44px)] min-h-[200px] md:min-h-[240px] shadow-sm border border-border">
              <IconTile variant="cyan" icon="eye" />
              <h3 className="text-[1.5rem] mb-3.5 mt-10 md:mt-20">Our Vision</h3>
              <p className="text-[1rem] leading-relaxed text-slate-500">{about.vision}</p>
            </div>
            <div className="bg-navy-900 rounded-lg p-5 sm:p-6 md:p-[clamp(28px,3.5vw,44px)] min-h-[200px] md:min-h-[240px]">
              <IconTile variant="navy" icon="rocket" />
              <h3 className="text-[1.5rem] text-white mb-3.5 mt-10 md:mt-20">Our Mission</h3>
              <p className="text-[1rem] leading-relaxed text-white/72">{about.mission}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="section bg-bg-alt">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-[clamp(32px,5vw,72px)] items-center">
            <div className="relative">
              {about.journeyImage ? (
                <img src={about.journeyImage} alt="Hospital heritage" className="w-full aspect-square object-cover rounded-xl" />
              ) : (
                <div className="w-full aspect-square bg-bg-alt rounded-xl flex items-center justify-center text-slate-400 font-semibold">
                  <SvgIcon name="image" className="[&_svg]:w-16 [&_svg]:h-16" />
                </div>
              )}
              <div className="absolute -right-2.5 bottom-[38px] bg-teal-600 text-white rounded-md p-5 shadow-lg">
                <div className="font-display font-bold text-[2rem] leading-none">{years}+</div>
                <div className="text-[.72rem] tracking-[.12em] uppercase opacity-85 mt-1.5">Years of Care</div>
              </div>
            </div>
            <div>
              <p className="font-body font-bold text-[.8rem] tracking-[.18em] uppercase text-teal-600">Our Journey</p>
              <h2 className="sec-title mt-2.5">{about.journeyTitle}</h2>
              {about.journeyBody.split('\n\n').map((p, i) => (
                <p key={i} className="text-slate-600 mt-4 leading-relaxed">{p}</p>
              ))}
              <div className="flex gap-5 sm:gap-10 mt-8 flex-wrap">
                {statItems.map((s) => (
                  <div key={s.id}>
                    <div className="font-display font-bold text-[1.8rem] text-ink">{s.value}</div>
                    <div className="text-[.74rem] tracking-[.1em] uppercase text-slate-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 items-end mb-10">
            <div>
              <p className="font-body font-bold text-[.8rem] tracking-[.18em] uppercase text-teal-600">Visionary Leadership</p>
              <h2 className="sec-title mt-3">The Minds Behind the Medicine</h2>
            </div>
            <blockquote className="text-slate-600 italic text-[1rem] border-l-3 border-cyan-300 pl-[18px]">{about.leadershipQuote}</blockquote>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {leaders.map((d) => (
              <article key={d.id}>
                <div className="aspect-[3/3.4] bg-bg-alt rounded-lg overflow-hidden">
                  {d.photo ? (
                    <img src={d.photo} alt={d.name} loading="lazy" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-semibold">
                      <SvgIcon name="doctor-search" className="[&_svg]:w-12 [&_svg]:h-12" />
                    </div>
                  )}
                </div>
                <h3 className="text-[1.08rem] mt-4 mb-1">{d.name}</h3>
                <p className="text-[.9rem] text-teal-600 font-semibold">{d.designation}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="section bg-bg-alt">
        <div className="container-wide">
          <SectionTitle
            eyebrow="Proven Quality"
            title="Accreditations &amp; Global Recognition"
            center
            className="mb-12"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 text-center">
            {accreditations.map((a) => (
              <div key={a.id} className="flex flex-col items-center gap-4">
                <div className="w-[72px] h-[72px] rounded-full bg-white shadow-sm grid place-items-center text-teal-600">
                  <SvgIcon name={a.icon} className="[&_svg]:w-[30px] [&_svg]:h-[30px]" />
                </div>
                <span className="text-[.78rem] font-bold tracking-[.08em] uppercase text-slate-600">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
