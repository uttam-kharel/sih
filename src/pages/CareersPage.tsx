import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSiteData } from '@contexts/SiteContext'
import { SvgIcon } from '@utils/icon'
import { Chip, IconTile } from '@components/UI'
import { useToast } from '@hooks/useToast'
import { clsx } from '@utils/helpers'

export function CareersPage() {
  const { careers, benefits, jobs, departments } = useSiteData()
  const [jobFilter, setJobFilter] = useState('All Roles')
  const { toast, ToastContainer } = useToast()

  const jobCats = ['All Roles', ...Array.from(new Set(jobs.map((j) => j.category)))]

  const filteredJobs = jobs.filter((j) => jobFilter === 'All Roles' || j.category === jobFilter)

  const [appRole, setAppRole] = useState('')
  const [appName, setAppName] = useState('')
  const [appEmail, setAppEmail] = useState('')
  const [appDept, setAppDept] = useState('')
  const [appFile, setAppFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast('Application submitted — our recruitment team will be in touch.', 'success')
    setAppName('')
    setAppEmail('')
    setAppDept('')
    setAppRole('')
    setAppFile(null)
  }

  return (
    <>
      <Helmet>
        <title>Careers — Shubham International</title>
        <meta name="description" content="Join our mission to shape the future of healthcare. View current openings." />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        {careers.heroImage && (
          <img src={careers.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-35 z-0" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/70 to-navy-900/40 z-1" />
        <div className="container-wide relative z-2 py-[clamp(56px,8vw,96px)]">
          <Chip variant="danger" className="!bg-white/14 !text-white">{careers.heroBadge}</Chip>
          <h1 className="text-white text-[clamp(2.2rem,5.2vw,3.6rem)] max-w-[16ch] mt-[18px]">{careers.heroTitle}</h1>
          <p className="text-white/78 max-w-[50ch] text-[1.05rem] mt-5">{careers.heroLead}</p>
          <div className="flex gap-3.5 mt-[30px] flex-wrap">
            <a href="#openings" className="btn btn-primary btn-lg">View Openings</a>
            <a href="#applyForm" className="btn btn-ghost on-dark btn-lg">Quick Apply</a>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center max-w-[60ch] mx-auto mb-12">
            <h2 className="sec-title">Why Work With Us?</h2>
            <p className="text-slate-500 max-w-[56ch] mx-auto mt-3.5">We provide an environment where your professional growth is as important as the health of our patients.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[26px]">
            {benefits.map((b) => (
              <div key={b.id} className="bg-white border border-border rounded-lg p-5 sm:p-8">
                <IconTile variant="cyan" icon={b.icon} />
                <h3 className="text-[1.2rem] mt-[18px] mb-2.5">{b.title}</h3>
                <p className="text-[.92rem] text-slate-500">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="section bg-bg-alt" id="openings">
        <div className="container-wide">
          <div className="flex justify-between items-end gap-5 flex-wrap mb-7">
            <div>
              <h2 className="sec-title">Current Openings</h2>
              <p className="text-slate-500 mt-1.5">Join our world-class team of medical professionals.</p>
            </div>
            <div className="flex gap-2.5 flex-wrap" style={{ marginBottom: 0 }}>
              {jobCats.map((cat) => (
                <button
                  key={cat}
                  className={clsx(
                    'text-[.88rem] font-semibold py-[.55em] px-[1.1em] rounded-pill border transition-all duration-150',
                    cat === jobFilter
                      ? 'bg-navy-900 border-navy-900 text-white'
                      : 'bg-white border-border text-slate-600 hover:border-teal-500 hover:text-teal-600',
                  )}
                  onClick={() => setJobFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-[60px] text-slate-500">
                <h3 className="text-ink mb-1.5">No openings in this category</h3>
                <p>Check back soon or send us your resume below.</p>
              </div>
            ) : (
              filteredJobs.map((j) => (
                <article key={j.id} className="bg-white border border-border rounded-lg p-4 sm:p-5 md:p-[26px_30px] flex justify-between gap-4 sm:gap-7 items-center flex-col md:flex-row transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-[1.2rem]">{j.title}</h3>
                      <Chip>{j.type}</Chip>
                    </div>
                    <p className="text-[.92rem] text-slate-500 max-w-[60ch]">{j.desc}</p>
                  </div>
                  <div className="flex items-center gap-7 flex-none w-full md:w-auto justify-between md:justify-start">
                    <div className="text-right md:text-left">
                      <span className="block text-[.68rem] tracking-[.1em] uppercase text-slate-400">Location</span>
                      <b className="text-ink text-[.92rem]">{j.location}</b>
                    </div>
                    <button
                      className="btn btn-navy btn-sm rounded-pill font-semibold py-[.58em] px-[1.05em] text-[.85rem] bg-navy-900 text-white hover:bg-navy-800 hover:-translate-y-0.5 transition-all duration-[180ms]"
                      onClick={() => {
                        setAppRole(j.title)
                        toast(`Applying for: ${j.title}`, 'success')
                      }}
                    >
                      Apply Now
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Apply */}
      <section className="section" id="applyForm">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-[clamp(32px,5vw,72px)] items-start">
            <div>
              <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)]">Didn't find what you were looking for?</h2>
              <p className="text-slate-500 mt-3.5">We are always looking for exceptional talent. Send us your resume and tell us which department you're interested in. We'll reach out when a suitable position opens up.</p>
              <div className="flex gap-3.5 items-center mt-6">
                <IconTile variant="cyan" icon="mail" />
                <div><b className="text-ink text-[.95rem] block">Email Us Directly</b><a href={`mailto:${careers.recruitmentEmail}`} className="text-slate-500 text-[.92rem]">{careers.recruitmentEmail}</a></div>
              </div>
              <div className="flex gap-3.5 items-center mt-4">
                <IconTile variant="cyan" icon="phone" />
                <div><b className="text-ink text-[.95rem] block">Recruitment Desk</b><span className="text-slate-500 text-[.92rem]">{careers.recruitmentPhone}</span></div>
              </div>
            </div>

            <form className="bg-white rounded-lg shadow-md border-t-4 border-teal-600 p-5 sm:p-6 md:p-[clamp(26px,3.5vw,40px)]" onSubmit={handleSubmit}>
              <input type="hidden" value={appRole} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="block mb-[18px]">
                  <label htmlFor="appName" className="block font-semibold text-[.86rem] text-slate-700 mb-[7px]">Name</label>
                  <input
                    id="appName"
                    className="w-full bg-[#F1F4F6] border-2 border-transparent rounded-md p-[.8em_1em] text-ink placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-teal-500 transition-colors"
                    placeholder="John Doe"
                    required
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                  />
                </div>
                <div className="block mb-[18px]">
                  <label htmlFor="appEmail" className="block font-semibold text-[.86rem] text-slate-700 mb-[7px]">Email</label>
                  <input
                    id="appEmail"
                    type="email"
                    className="w-full bg-[#F1F4F6] border-2 border-transparent rounded-md p-[.8em_1em] text-ink placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-teal-500 transition-colors"
                    placeholder="john@example.com"
                    required
                    value={appEmail}
                    onChange={(e) => setAppEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="block mb-[18px]">
                <label htmlFor="appDept" className="block font-semibold text-[.86rem] text-slate-700 mb-[7px]">Department of Interest</label>
                <select
                  id="appDept"
                  className="w-full bg-[#F1F4F6] border-2 border-transparent rounded-md p-[.8em_1em] text-ink focus:outline-none focus:bg-white focus:border-teal-500 transition-colors appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' stroke='%23647682' stroke-width='2'%3E%3Cpath d='M3 5l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1em center',
                    paddingRight: '2.6em',
                  }}
                  value={appDept}
                  onChange={(e) => setAppDept(e.target.value)}
                >
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="block mb-[18px]">
                <label className="block font-semibold text-[.86rem] text-slate-700 mb-[7px]">Resume Upload</label>
                <div
                  className="border-2 border-dashed border-border-strong rounded-md p-7 text-center text-slate-500 cursor-pointer transition-colors hover:border-teal-500 hover:bg-cyan-50"
                  onClick={() => document.getElementById('appFile')?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    if (e.dataTransfer.files[0]) {
                      setAppFile(e.dataTransfer.files[0])
                    }
                  }}
                >
                  <SvgIcon name="upload" className="[&_svg]:w-7 [&_svg]:h-7 mx-auto mb-2 text-slate-400" />
                  <div>Click to upload or drag and drop</div>
                  <small className="text-[.75rem]">PDF, DOC (Max 5MB)</small>
                  {appFile && <div className="text-teal-600 font-semibold mt-2">{appFile.name}</div>}
                </div>
                <input
                  id="appFile"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  hidden
                  onChange={(e) => {
                    if (e.target.files?.[0]) setAppFile(e.target.files[0])
                  }}
                />
              </div>
              <button type="submit" className="btn btn-navy btn-block btn-lg text-center rounded-pill font-semibold py-[1.05em] px-[1.9em] text-[1rem] bg-navy-900 text-white hover:bg-navy-800 hover:-translate-y-0.5 transition-all duration-[180ms] w-full">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>

      {ToastContainer}
    </>
  )
}
