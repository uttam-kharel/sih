import { Link } from 'react-router-dom'
import { SvgIcon } from '@utils/icon'
import { useSiteData } from '@contexts/SiteContext'
import { SOCIAL_LINKS, QUICK_LINKS, SUPPORT_LINKS } from '@constants/navigation'

export function Footer() {
  const { site } = useSiteData()

  return (
    <footer className="bg-surface border-t border-border py-14 pb-8">
      <div className="container-wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-6 sm:gap-8 lg:gap-10">
          <div className="footer-brand">
            <div className="flex items-center gap-3">
              <SvgIcon name="logo" className="[&_svg]:w-10 [&_svg]:h-10 flex-none" />
              <span className="font-display font-bold text-[1.18rem] text-ink tracking-[-.02em] leading-tight">{site.name}</span>
            </div>
            <p className="text-[.92rem] text-slate-500 max-w-[34ch] mt-3.5">{site.footerBlurb}</p>
            <div className="flex gap-3 mt-5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-[38px] h-[38px] rounded-xl grid place-items-center bg-bg-alt text-slate-600 hover:bg-cyan-100 hover:text-teal-600 transition-colors"
                  aria-label={s.label}
                >
                  <SvgIcon name={s.icon} className="[&_svg]:w-5 [&_svg]:h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[.98rem] text-ink mb-4 font-body font-bold">Quick Navigation</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-[.92rem] text-slate-500 hover:text-teal-600 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[.98rem] text-ink mb-4 font-body font-bold">Patient Support</h4>
            <ul className="space-y-2.5">
              {SUPPORT_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[.92rem] text-slate-500 hover:text-teal-600 transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[.98rem] text-ink mb-4 font-body font-bold">Contact Us</h4>
            <ul className="space-y-2.5 text-[.92rem] text-slate-500">
              <li>{site.address}</li>
              <li><a href={`tel:${site.phone}`} className="text-teal-600 font-bold">{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`} className="hover:text-teal-600 transition-colors">{site.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 sm:mt-10 pt-5.5 flex justify-between gap-3 sm:gap-4 flex-col sm:flex-row text-[.78rem] sm:text-[.82rem] text-slate-400 tracking-[.02em]">
          <span>&copy; {new Date().getFullYear()} {site.name} Hospital. {site.tagline}.</span>
          <span>{site.accreditationLine}</span>
        </div>
      </div>
    </footer>
  )
}
