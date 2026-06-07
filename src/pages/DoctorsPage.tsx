import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useSiteData } from '@contexts/SiteContext'
import { SvgIcon } from '@utils/icon'
import { clsx } from '@utils/helpers'

export function DoctorsPage() {
  const { doctors, departments } = useSiteData()
  const [activeDept, setActiveDept] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const matchDept = activeDept === 'All' || d.department === activeDept
      const q = query.toLowerCase()
      const matchQ = !q || `${d.name} ${d.designation} ${d.department}`.toLowerCase().includes(q)
      return matchDept && matchQ
    })
  }, [doctors, activeDept, query])

  const deptList = ['All', ...departments]

  return (
    <>
      <Helmet>
        <title>Find a Doctor — Shubham International</title>
        <meta name="description" content="Search our network of internationally trained specialists across 40+ departments." />
      </Helmet>

      <section className="py-[clamp(48px,7vw,88px)]">
        <div className="container-wide">
          <p className="font-body font-bold text-[.8rem] tracking-[.18em] uppercase text-teal-600 mb-4">Our Specialists</p>
          <h1 className="text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.04]">Meet the experts behind your care.</h1>
          <p className="text-slate-500 max-w-[52ch] text-[1.08rem] mt-5">Access our network of internationally trained specialists across 40+ departments. Search by name or filter by specialty to find the right doctor for you.</p>
        </div>
      </section>

      <section className="pb-[clamp(40px,6vw,72px)]" style={{ paddingTop: 0 }}>
        <div className="container-wide">
          <div className="flex gap-4 items-center mb-7 flex-wrap">
            <div className="relative flex-1 min-w-0 sm:min-w-[240px]">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <SvgIcon name="search" className="[&_svg]:w-5 [&_svg]:h-5" />
              </span>
              <input
                type="search"
                placeholder="Search by name, specialty, or designation…"
                aria-label="Search doctors"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white border border-border rounded-pill py-[.85em] pl-[3em] pr-[1em] text-ink placeholder:text-slate-400 focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>
            <span className="text-[.9rem] text-slate-500 font-semibold whitespace-nowrap">
              {filtered.length} specialist{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex gap-2.5 flex-wrap mb-9">
            {deptList.map((dept) => (
              <button
                key={dept}
                className={clsx(
                  'text-[.88rem] font-semibold py-[.55em] px-[1.1em] rounded-pill border transition-all duration-150',
                  dept === activeDept
                    ? 'bg-navy-900 border-navy-900 text-white'
                    : 'bg-white border-border text-slate-600 hover:border-teal-500 hover:text-teal-600',
                )}
                onClick={() => setActiveDept(dept)}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[26px]">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center py-[60px] text-slate-500">
                <div className="w-[52px] h-[52px] rounded-[14px] grid place-items-center bg-cyan-100 text-teal-600 mx-auto mb-4">
                  <SvgIcon name="doctor-search" className="[&_svg]:w-6 [&_svg]:h-6" />
                </div>
                <h3 className="text-ink mb-1.5">No specialists found</h3>
                <p>Try a different department or search term.</p>
              </div>
            ) : (
              filtered.map((d) => (
                <article key={d.id} className="bg-white border border-border rounded-lg overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                  <div className="relative aspect-[4/3.6] bg-bg-alt overflow-hidden max-h-[220px] md:max-h-none">
                    {d.photo ? (
                      <img src={d.photo} alt={d.name} loading="lazy" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 font-semibold">
                        <SvgIcon name="doctor-search" className="[&_svg]:w-14 [&_svg]:h-14" />
                      </div>
                    )}
                    <span className="absolute left-3.5 top-3.5 bg-white/92 backdrop-blur text-teal-700 text-[.72rem] font-bold px-2.5 py-1 rounded-pill tracking-[.03em]">{d.department}</span>
                  </div>
                  <div className="p-4 sm:p-[22px] flex flex-col flex-1">
                    <h3 className="text-[1.08rem] sm:text-[1.18rem]">{d.name}</h3>
                    <p className="text-teal-600 font-semibold text-[.85rem] sm:text-[.9rem] mt-1 mb-2.5">{d.designation}</p>
                    <p className="text-[.88rem] text-slate-500 mb-[18px] flex-1">{d.bio}</p>
                    <Link to="/contact" className="btn btn-navy btn-sm btn-block text-center rounded-pill font-semibold py-[.58em] px-[1.05em] text-[.85rem] bg-navy-900 text-white hover:bg-navy-800 hover:-translate-y-0.5 transition-all duration-[180ms]">
                      Book Appointment
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  )
}
