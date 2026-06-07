import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SvgIcon } from '@utils/icon'
import { NAV_ITEMS } from '@constants/navigation'
import { useSiteData } from '@contexts/SiteContext'
import { clsx } from '@utils/helpers'

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { site } = useSiteData()

  const isActive = (href: string) => pathname === href

  // Close menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = scrollbarWidth + 'px'
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [open])

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/88 backdrop-blur-md border-b border-border">
        <div className="container-wide">
          <nav className="flex items-center gap-7 h-[var(--nav-h)]" aria-label="Primary">
            <Link className="flex items-center gap-3 flex-none" to="/">
              <SvgIcon name="logo" className="[&_svg]:w-10 [&_svg]:h-10 flex-none" />
              <span className="font-display font-bold text-[1.18rem] text-ink tracking-[-.02em] leading-tight">{site.name}</span>
            </Link>

            <div className="hidden lg:flex gap-1 ml-auto">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={clsx(
                    'font-semibold text-[.94rem] text-slate-600 px-[.8em] py-[.5em] rounded-sm relative transition-colors duration-150 hover:text-teal-600',
                    isActive(item.href) && 'text-teal-700',
                  )}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute left-[.8em] right-[.8em] bottom-[2px] h-[2px] bg-teal-600 rounded-sm" />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex gap-2.5 flex-none">
              <Link to="/contact" className="inline-flex items-center justify-center gap-[.55em] font-body font-semibold leading-none whitespace-nowrap rounded-pill transition-all duration-[180ms] py-[.58em] px-[1.05em] text-[.85rem] bg-cyan-200 text-navy-900 hover:bg-cyan-300">
                Online Lab Report
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-[.55em] font-body font-semibold leading-none whitespace-nowrap rounded-pill transition-all duration-[180ms] py-[.58em] px-[1.05em] text-[.85rem] bg-teal-600 text-white shadow-[0_6px_18px_rgba(14,115,115,.28)] hover:bg-teal-700 hover:shadow-[0_10px_24px_rgba(14,115,115,.34)] hover:-translate-y-0.5 active:translate-y-px">
                Book Appointment
              </Link>
            </div>

            <button
              className="lg:hidden inline-grid place-items-center w-11 h-11 rounded-xl ml-auto text-ink hover:bg-bg-alt"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <SvgIcon name={open ? 'close' : 'menu'} className="[&_svg]:w-6 [&_svg]:h-6" />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu panel — outside <header> to avoid stacking context issues */}
      <div
        className={clsx(
          'lg:hidden fixed z-50 flex flex-col bg-white transition-transform duration-250 ease-out top-0 right-0 bottom-0 left-0',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-hidden={!open}
      >
        {/* Panel header with logo + close button */}
        <div className="flex items-center justify-between px-4 sm:px-6 h-[var(--nav-h)] border-b border-border shrink-0">
          <Link className="flex items-center gap-3" to="/" onClick={() => setOpen(false)}>
            <SvgIcon name="logo" className="[&_svg]:w-10 [&_svg]:h-10 flex-none" />
            <span className="font-display font-bold text-[1.18rem] text-ink tracking-[-.02em] leading-tight">{site.name}</span>
          </Link>
          <button
            className="inline-grid place-items-center w-11 h-11 rounded-xl text-ink hover:bg-bg-alt"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <SvgIcon name="close" className="[&_svg]:w-6 [&_svg]:h-6" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-2 overflow-y-auto p-4 sm:p-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={clsx(
                'text-[1.05rem] sm:text-[1.1rem] font-semibold py-3.5 px-1 border-b border-border text-ink',
                isActive(item.href) && 'text-teal-700',
              )}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-5">
            <Link to="/contact" className="inline-flex items-center justify-center gap-[.55em] font-body font-semibold leading-none whitespace-nowrap rounded-pill transition-all duration-[180ms] py-[.82em] px-[1.5em] text-[.95rem] w-full bg-cyan-200 text-navy-900 hover:bg-cyan-300" onClick={() => setOpen(false)}>
              Online Lab Report
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-[.55em] font-body font-semibold leading-none whitespace-nowrap rounded-pill transition-all duration-[180ms] py-[.82em] px-[1.5em] text-[.95rem] w-full bg-teal-600 text-white shadow-[0_6px_18px_rgba(14,115,115,.28)] hover:bg-teal-700" onClick={() => setOpen(false)}>
              Book Appointment
            </Link>
          </div>
        </nav>
      </div>

      {/* Backdrop overlay — outside <header> */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/30"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
