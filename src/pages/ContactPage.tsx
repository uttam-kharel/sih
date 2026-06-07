import { Helmet } from 'react-helmet-async'
import { useSiteData } from '@contexts/SiteContext'
import { SvgIcon } from '@utils/icon'
import { IconTile } from '@components/UI'
import { useToast } from '@hooks/useToast'

export function ContactPage() {
  const { site, departments, doctors } = useSiteData()
  const { toast, ToastContainer } = useToast()

  const handleAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    ;(e.target as HTMLFormElement).reset()
    toast('Appointment request received — we will confirm shortly.', 'success')
  }

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault()
    ;(e.target as HTMLFormElement).reset()
    toast('Message sent — thank you for reaching out.', 'success')
  }

  return (
    <>
      <Helmet>
        <title>Contact &amp; Book — Shubham International</title>
        <meta name="description" content="Schedule a visit, find us, or send an inquiry. World-class healthcare tailored for you." />
      </Helmet>

      <section className="py-[clamp(48px,7vw,88px)]" style={{ paddingBottom: 0 }}>
        <div className="container-wide">
          <p className="font-body font-bold text-[.8rem] tracking-[.18em] uppercase text-teal-600 mb-4">Contact &amp; Care</p>
          <h1 className="text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.04]">
            Experience world-class healthcare, tailored for <span className="text-teal-600">you.</span>
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-7 items-start">
            {/* Schedule form */}
            <form className="bg-white rounded-lg shadow-md p-5 sm:p-6 md:p-[clamp(28px,3.5vw,44px)]" onSubmit={handleAppointment}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-[1.6rem]">Schedule a Visit</h2>
                  <p className="text-slate-500 text-[.94rem] mt-1.5">Please fill in your details for a consultation.</p>
                </div>
                <div className="flex gap-1.5">
                  <i className="w-[9px] h-[9px] rounded-full bg-teal-600 block" />
                  <i className="w-[9px] h-[9px] rounded-full bg-border-strong block" />
                  <i className="w-[9px] h-[9px] rounded-full bg-border-strong block" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="block mb-[18px]">
                  <label className="block font-semibold text-[.86rem] text-slate-700 mb-[7px]">Full Name</label>
                  <input name="name" placeholder="John Doe" required className="w-full bg-[#F1F4F6] border-2 border-transparent rounded-md p-[.8em_1em] text-ink placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-teal-500 transition-colors" />
                </div>
                <div className="block mb-[18px]">
                  <label className="block font-semibold text-[.86rem] text-slate-700 mb-[7px]">Contact Number</label>
                  <input name="phone" placeholder="+977 98XXXXXXXX" required className="w-full bg-[#F1F4F6] border-2 border-transparent rounded-md p-[.8em_1em] text-ink placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-teal-500 transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="block mb-[18px]">
                  <label className="block font-semibold text-[.86rem] text-slate-700 mb-[7px]">Department</label>
                  <select
                    name="dept"
                    className="w-full bg-[#F1F4F6] border-2 border-transparent rounded-md p-[.8em_1em] text-ink focus:outline-none focus:bg-white focus:border-teal-500 transition-colors appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' stroke='%23647682' stroke-width='2'%3E%3Cpath d='M3 5l4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1em center',
                      paddingRight: '2.6em',
                    }}
                  >
                    {departments.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="block mb-[18px]">
                  <label className="block font-semibold text-[.86rem] text-slate-700 mb-[7px]">Email ID</label>
                  <input type="email" name="email" placeholder="you@example.com" className="w-full bg-[#F1F4F6] border-2 border-transparent rounded-md p-[.8em_1em] text-ink placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-teal-500 transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="block mb-[18px]">
                  <label className="block font-semibold text-[.86rem] text-slate-700 mb-[7px]">Choose Doctor</label>
                  <select
                    name="doctor"
                    className="w-full bg-[#F1F4F6] border-2 border-transparent rounded-md p-[.8em_1em] text-ink focus:outline-none focus:bg-white focus:border-teal-500 transition-colors appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' stroke='%23647682' stroke-width='2'%3E%3Cpath d='M3 5l4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1em center',
                      paddingRight: '2.6em',
                    }}
                  >
                    <option value="">Select a specialist</option>
                    {doctors.map((d) => (
                      <option key={d.id}>{d.name} — {d.designation}</option>
                    ))}
                  </select>
                </div>
                <div className="block mb-[18px]">
                  <label className="block font-semibold text-[.86rem] text-slate-700 mb-[7px]">Preferred Date</label>
                  <input type="date" name="date" className="w-full bg-[#F1F4F6] border-2 border-transparent rounded-md p-[.8em_1em] text-ink focus:outline-none focus:bg-white focus:border-teal-500 transition-colors" />
                </div>
              </div>
              <div className="block mb-[18px]">
                <label className="block font-semibold text-[.86rem] text-slate-700 mb-[7px]">Purpose of Visit</label>
                <textarea name="reason" placeholder="Describe the reason for your visit…" className="w-full bg-[#F1F4F6] border-2 border-transparent rounded-md p-[.8em_1em] text-ink placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-teal-500 transition-colors resize-vertical min-h-[110px]" />
              </div>
              <button type="submit" className="btn btn-navy btn-block btn-lg text-center rounded-pill font-semibold py-[1.05em] px-[1.9em] text-[1rem] bg-navy-900 text-white hover:bg-navy-800 hover:-translate-y-0.5 transition-all duration-[180ms] w-full">
                Continue to Confirmation →
              </button>
            </form>

            {/* Side */}
            <div className="flex flex-col gap-5">
              <div className="bg-navy-900 text-white rounded-lg p-5 sm:p-7 flex flex-col sm:flex-row gap-3 sm:gap-[18px] items-start">
                <div className="w-[52px] h-[52px] rounded-[14px] grid place-items-center flex-none" style={{ background: '#13414f', color: '#4FC6D6' }}>
                  <SvgIcon name="emergency" className="[&_svg]:w-6 [&_svg]:h-6" />
                </div>
                <div>
                  <div className="text-[.72rem] tracking-[.12em] uppercase text-cyan-300">24/7 Lifeline</div>
                  <div className="font-display font-bold text-[1.4rem] sm:text-[1.8rem] text-white my-0.5 mb-2 break-all">{site.emergencyPhone}</div>
                  <p className="text-white/72 text-[.9rem]">Immediate emergency response and trauma care ambulance services.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-[22px]">
                  <IconTile variant="cyan" icon="phone" />
                  <b className="block text-ink text-[.9rem] sm:text-[.98rem] mt-3.5">General Inquiries</b>
                  <span className="block text-slate-500 text-[.82rem] sm:text-[.88rem] break-all">{site.phone}</span>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-[22px]">
                  <IconTile variant="cyan" icon="mail" />
                  <b className="block text-ink text-[.9rem] sm:text-[.98rem] mt-3.5">Email Us</b>
                  <span className="block text-slate-500 text-[.82rem] sm:text-[.88rem] break-all">{site.email}</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-[22px]">
                <IconTile variant="cyan" icon="pin" />
                <b className="block text-ink text-[.9rem] sm:text-[.98rem] mt-3.5">Main Reception</b>
                <span className="text-slate-500 text-[.82rem] sm:text-[.88rem]">{site.addressFull}</span>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-5 sm:p-7">
                <h3 className="text-[1.3rem] mb-[18px]">Quick Inquiry</h3>
                <form onSubmit={handleInquiry}>
                  <div className="block mb-[18px]">
                    <input name="iname" placeholder="Your Name" required className="w-full bg-[#F1F4F6] border-2 border-transparent rounded-md p-[.8em_1em] text-ink placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-teal-500 transition-colors" />
                  </div>
                  <div className="block mb-[18px]">
                    <input type="email" name="iemail" placeholder="Email Address" required className="w-full bg-[#F1F4F6] border-2 border-transparent rounded-md p-[.8em_1em] text-ink placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-teal-500 transition-colors" />
                  </div>
                  <div className="block mb-[18px]">
                    <textarea name="imsg" placeholder="How can we help?" style={{ minHeight: '90px' }} className="w-full bg-[#F1F4F6] border-2 border-transparent rounded-md p-[.8em_1em] text-ink placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-teal-500 transition-colors resize-vertical" />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block text-center rounded-pill font-semibold py-[.82em] px-[1.5em] text-[.95rem] bg-teal-600 text-white shadow-[0_6px_18px_rgba(14,115,115,.28)] hover:bg-teal-700 hover:-translate-y-0.5 transition-all duration-[180ms] w-full">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="relative rounded-lg overflow-hidden mt-7 shadow-sm">
            <svg viewBox="0 0 1200 420" xmlns="http://www.w3.org/2000/svg" aria-label="Map showing hospital location" className="w-full h-auto">
              <rect width="1200" height="420" fill="#DBE4E7" />
              <g stroke="#fff" stroke-width="7" fill="none" opacity="0.9">
                <path d="M0 120 H1200 M0 280 H1200 M200 0 V420 M520 0 V420 M820 0 V420" />
              </g>
              <g stroke="#cfd9dd" stroke-width="3" fill="none">
                <path d="M0 70 H1200 M0 200 H1200 M0 350 H1200 M90 0 V420 M360 0 V420 M680 0 V420 M980 0 V420" />
              </g>
              <rect x="220" y="140" width="120" height="120" rx="6" fill="#C4D2D6" />
              <rect x="560" y="40" width="160" height="60" rx="6" fill="#C4D2D6" />
              <rect x="860" y="300" width="140" height="90" rx="6" fill="#C4D2D6" />
            </svg>
            <span className="absolute left-[8%] top-[40%] text-teal-600">
              <SvgIcon name="pin" className="[&_svg]:w-[34px] [&_svg]:h-[44px]" />
            </span>
            <div className="absolute left-3 sm:left-6 bottom-3 sm:bottom-6 right-3 sm:right-6 bg-white rounded-md p-3 sm:p-[18px_22px] shadow-md flex justify-between items-center gap-3 sm:gap-4 max-w-[520px]">
              <div>
                <b className="text-ink block">Hospital Location</b>
                <span className="text-slate-500 text-[.88rem]">{site.address}</span>
              </div>
              <a href="#" className="w-[44px] h-[44px] rounded-[14px] grid place-items-center bg-cyan-100 text-teal-600 flex-none" aria-label="Get directions">
                <SvgIcon name="pin" className="[&_svg]:w-5 [&_svg]:h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {ToastContainer}
    </>
  )
}
