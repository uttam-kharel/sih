import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useSiteData } from '@contexts/SiteContext'
import { SvgIcon } from '@utils/icon'
import { Chip, IconTile, SectionTitle } from '@components/UI'

export function ServicesPage() {
  const { criticalCare, services } = useSiteData()

  return (
    <>
      <Helmet>
        <title>Services — Shubham International</title>
        <meta name="description" content="World-class medical specialties: critical care, diagnostics, laboratory, imaging and more." />
      </Helmet>

      {/* Hero */}
      <section className="py-[clamp(48px,6vw,80px)]">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(32px,5vw,64px)] items-center">
            <div>
              <Chip>Our Expertise</Chip>
              <h1 className="text-[clamp(2rem,4.6vw,3.4rem)] mt-[18px]">
                World-Class Medical <span className="text-teal-600">Specialties</span> for Your Family.
              </h1>
              <div className="w-[60px] h-1 bg-teal-600 rounded my-[22px]" />
              <p className="text-slate-500 text-[1.05rem] max-w-[46ch]">Experience clinical excellence combined with compassionate care. Our multidisciplinary approach ensures you receive the most advanced treatment across all medical domains.</p>
            </div>
            <div className="relative">
              <img src="/assets/img/services-device.svg" alt="Advanced medical equipment" className="w-full rounded-xl" />
              
              <div className="absolute -left-2 -bottom-[22px] bg-white rounded-md p-3.5 shadow-lg flex items-center gap-3">
                <IconTile variant="cyan" icon="check-circle" />
                <div><b className="text-ink text-[.92rem] block">ISO Certified</b><span className="text-[.78rem] text-slate-500">Safety Standards Excellence</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Care */}
      <section className="section bg-bg-alt">
        <div className="container-wide">
          <SectionTitle
            title="Critical Care Facilities"
            lead="Always ready, always advanced. 24/7 Support."
            className="mb-9"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
            {criticalCare.map((c) => (
              <article
                key={c.id}
                className={`p-5 sm:p-[30px] flex flex-col border rounded-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                  c.highlight ? 'bg-navy-900 border-navy-900 text-white hover:shadow-xl' : 'bg-white border-border'
                }`}
              >
                {c.highlight ? (
                  <>
                    <div className="w-[52px] h-[52px] rounded-[14px] grid place-items-center flex-none" style={{ background: '#13414f', color: '#6FD6E2' }}>
                      <SvgIcon name="emergency" className="[&_svg]:w-6 [&_svg]:h-6" />
                    </div>
                    <Chip variant="danger" className="mt-[18px]">{c.tag}</Chip>
                    <h3 className="text-[1.4rem] mt-[18px] mb-2.5 text-white">{c.title}</h3>
                    <p className="text-[.94rem] text-white/72">{c.desc}</p>
                    <a href="tel:108" className="btn btn-light btn-block mt-auto text-center rounded-pill font-semibold py-[.82em] px-[1.5em] text-[.95rem] bg-white text-navy-900 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-[180ms]">{c.cta}</a>
                  </>
                ) : (
                  <>
                    <IconTile variant="cyan" icon={c.title.includes('ICU') ? 'plus' : 'chart'} />
                    <h3 className="text-[1.4rem] mt-[18px] mb-2.5">{c.title}</h3>
                    <p className="text-[.94rem] text-slate-500">{c.desc}</p>
                    {c.features && (
                      <ul className="mt-[18px] flex flex-col gap-3">
                        {c.features.map((f, i) => (
                          <li key={i} className="flex gap-2.5 text-[.92rem] items-center">
                            <SvgIcon name="check-circle" className="[&_svg]:w-[18px] [&_svg]:h-[18px] flex-none [&_svg]:text-teal-500" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {c.note && (
                      <>
                        <div className="bg-cyan-50 text-teal-700 text-[.86rem] italic p-3.5 rounded-md mt-[18px]">{c.note}</div>
                        <Link to="/contact" className="inline-flex items-center gap-2 text-navy-900 font-bold mt-[18px]">
                          {c.cta} <SvgIcon name="arrow" className="[&_svg]:w-[18px] [&_svg]:h-[18px]" />
                        </Link>
                      </>
                    )}
                  </>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="section">
        <div className="container-wide">
          <SectionTitle
            title="Clinical Specializations"
            lead="Comprehensive medical and diagnostic services tailored to meet your healthcare needs with advanced technology and expert care."
            center
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {services.map((s) => {
              const isEmergency = /emergency/i.test(s.title)
              return (
                <article key={s.id} className="bg-white border border-border rounded-lg p-5 sm:p-7 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                  <IconTile variant={isEmergency ? 'danger' : 'cyan'} icon={s.icon} />
                  <h3 className="text-[1.2rem] mt-[18px] mb-2.5">{s.title}</h3>
                  <p className="text-[.92rem] text-slate-500 flex-1 mb-5">{s.desc}</p>
                  <Link
                    to="/contact"
                    className={`inline-flex items-center gap-[.55em] self-start rounded-pill font-semibold py-[.58em] px-[1.05em] text-[.85rem] transition-all duration-[180ms] ${
                      isEmergency ? 'bg-danger text-white hover:brightness-93' : 'bg-navy-900 text-white hover:bg-navy-800 hover:-translate-y-0.5'
                    }`}
                  >
                    {s.cta} <span className="w-[15px] h-[15px] inline-grid"><SvgIcon name="arrow" /></span>
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Helpdesk */}
      <section className="pb-[clamp(56px,8vw,104px)]">
        <div className="container-wide">
          <div className="bg-navy-900 rounded-xl p-[clamp(40px,6vw,72px)] text-center text-white">
            <h2 className="text-white text-[clamp(1.6rem,3.6vw,2.6rem)]">Can't find the service you're looking for?</h2>
            <p className="text-white/70 max-w-[52ch] mx-auto mt-4">Our helpdesk is available 24/7 to assist you with specific medical queries and doctor availability.</p>
            <div className="flex gap-3.5 justify-center mt-[30px] flex-wrap">
              <Link to="/contact" className="btn btn-primary btn-lg">
                <SvgIcon name="phone" className="[&_svg]:w-[18px] [&_svg]:h-[18px]" />
                Call Helpdesk
              </Link>
              <Link to="/contact" className="btn btn-ghost on-dark btn-lg">
                <SvgIcon name="mail" className="[&_svg]:w-[18px] [&_svg]:h-[18px]" />
                Inquiry Form
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
