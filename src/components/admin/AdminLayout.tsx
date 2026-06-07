import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import { SvgIcon } from '@utils/icon'
import { useSiteData } from '@contexts/SiteContext'
import { useAdmin, SCHEMAS, INBOXES, SETTINGS } from '@contexts/AdminContext'
import { clsx } from '@utils/helpers'

export function AdminLayout() {
  const { site } = useSiteData()
  const { user, logout, setActiveView, sidebarOpen, toggleSidebar, closeMobileSidebar, drawerOpen, drawerTitle, drawerBody, drawerSaveCb, closeDrawer } = useAdmin()
  const navigate = useNavigate()
  const location = useLocation()
  const chipRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const drawerContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = drawerContentRef.current
    if (!el || !drawerOpen) return
    el.innerHTML = ''
    if (drawerBody instanceof Node) {
      el.appendChild(drawerBody as Node)
    }
  }, [drawerBody, drawerOpen])

  const currentView = location.pathname.replace('/admin/', '') || 'dashboard'

  useEffect(() => {
    setActiveView(currentView)
  }, [currentView, setActiveView])

  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      if (chipRef.current && !chipRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('click', handler)
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('click', handler)
      document.removeEventListener('keydown', keyHandler)
    }
  }, [menuOpen])

  const counts: Record<string, number> = {}
  Object.keys(SCHEMAS).forEach((k) => {
    const col = SCHEMAS[k]?.collection
    if (!col) return
    try {
      const raw = localStorage.getItem('shubham_cms_v1')
      if (raw) {
        const data = JSON.parse(raw)
        counts[k] = (data[col] || []).length
      }
    } catch { counts[k] = 0 }
  })

  const groups: Record<string, string[]> = {}
  Object.keys(SCHEMAS).forEach((k) => {
    const g = SCHEMAS[k]?.group || 'Content'
    if (!groups[g]) groups[g] = []
    groups[g].push(k)
  })

  const navItem = (view: string, ic: string, label: string, badge?: number | null) => {
    const isActive = currentView === view
    return (
      <button
        key={view}
        className={clsx(
          'flex items-center gap-3 w-full px-3 py-2.5 rounded-md font-semibold text-[.92rem] text-left transition-all duration-150',
          isActive ? 'bg-teal-600 text-white' : 'text-white/72 hover:bg-white/7 hover:text-white',
        )}
        onClick={() => { navigate(`/admin/${view}`); closeMobileSidebar() }}
      >
        <SvgIcon name={ic} className="[&_svg]:w-[19px] [&_svg]:h-[19px] flex-none" />
        <span className="flex-1">{label}</span>
        {badge != null && badge > 0 && (
          <span className="bg-cyan-300 text-navy-900 text-[.68rem] font-extrabold px-2 py-0.5 rounded-pill">{badge}</span>
        )}
      </button>
    )
  }

  const sidebar = (
    <aside className="bg-navy-900 text-white flex flex-col h-screen overflow-y-auto sticky top-0 w-full lg:w-[264px] lg:min-w-[264px] p-4 lg:pb-0 overscroll-contain" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,.18) transparent' }}>
      <div className="flex items-center justify-between gap-3 px-2 pb-5 mb-1 border-b border-white/10">
        <Link to="/" className="flex items-center gap-3 min-w-0">
          <SvgIcon name="logo" className="[&_svg]:w-10 [&_svg]:h-10 flex-none" />
          <span className="font-display font-bold text-[1.05rem] text-white leading-tight truncate">{site.name}</span>
        </Link>
        <button
          className="lg:hidden inline-grid place-items-center w-[38px] h-[38px] rounded-xl text-white/70 hover:text-white hover:bg-white/10 shrink-0 transition-colors"
          onClick={closeMobileSidebar}
          aria-label="Close sidebar"
        >
          <SvgIcon name="close" className="[&_svg]:w-5 [&_svg]:h-5" />
        </button>
      </div>

      <div className="flex-1 space-y-1 mt-4 overflow-y-auto">
        <div className="text-[.68rem] tracking-[.12em] uppercase text-white/40 px-3 py-2">Overview</div>
        {navItem('dashboard', 'grid', 'Dashboard')}

        {Object.entries(groups).map(([g, keys]) => (
          <div key={g}>
            <div className="text-[.68rem] tracking-[.12em] uppercase text-white/40 px-3 py-2 mt-4">{g}</div>
            {keys.map((k) => navItem(k, SCHEMAS[k]?.icon || 'grid', SCHEMAS[k]?.label || k, counts[k] || null))}
          </div>
        ))}

        <div className="text-[.68rem] tracking-[.12em] uppercase text-white/40 px-3 py-2 mt-4">Submissions</div>
        {Object.entries(INBOXES).map(([k, ib]) => {
          let unread = 0
          try {
            const raw = localStorage.getItem('shubham_cms_v1')
            if (raw) {
              const data = JSON.parse(raw)
              const arr = data[ib.collection] || []
              unread = arr.filter((x: Record<string, unknown>) => x.status === 'new').length
            }
          } catch { /* */ }
          return navItem('inbox-' + k, ib.icon, ib.label, unread || null)
        })}

        <div className="text-[.68rem] tracking-[.12em] uppercase text-white/40 px-3 py-2 mt-4">Settings</div>
        {Object.entries(SETTINGS).map(([k, st]) => navItem('settings-' + k, 'settings', st.label))}
        {navItem('departments', 'grid', 'Departments')}
        {navItem('users', 'people', 'User Management')}
        {navItem('security', 'shield', 'Change Password')}
      </div>

      <div className="pt-4 mt-auto border-t border-white/10">
        {navItem('logout', 'logout', 'Log Out')}
      </div>
    </aside>
  )

  const initials = (user?.name || user?.username || 'A').split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase()

  const titleMap: Record<string, string> = {
    dashboard: 'Dashboard',
    departments: 'Departments',
    users: 'User Management',
    security: 'Change Password',
  }

  const getTitle = () => {
    if (titleMap[currentView]) return titleMap[currentView]
    if (SCHEMAS[currentView]) return SCHEMAS[currentView].label
    if (currentView.startsWith('inbox-')) {
      const k = currentView.slice(6)
      return INBOXES[k]?.label || currentView
    }
    if (currentView.startsWith('settings-')) {
      const k = currentView.slice(9)
      return SETTINGS[k]?.label || currentView
    }
    return currentView
  }

  const breadcrumbMap: Record<string, string> = {
    dashboard: 'Overview',
    departments: 'Settings',
    users: 'Settings',
    security: 'Settings',
  }

  Object.keys(SCHEMAS).forEach((k) => { breadcrumbMap[k] = 'Content' })
  Object.keys(INBOXES).forEach((k) => { breadcrumbMap['inbox-' + k] = 'Submissions' })
  Object.keys(SETTINGS).forEach((k) => { breadcrumbMap['settings-' + k] = 'Settings' })

  return (
    <div className="min-h-screen bg-[#EEF2F4]">
      <div className="flex min-h-screen">
        {sidebarOpen && (
          <div className="fixed inset-0 bg-navy-900/50 z-55 lg:hidden" onClick={closeMobileSidebar} />
        )}

        <div className={clsx(
          'fixed lg:sticky top-0 left-0 h-screen z-60 lg:z-auto transition-transform duration-250',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}>
          {sidebar}
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <header className="bg-white border-b border-border h-[70px] px-[clamp(20px,3vw,40px)] flex items-center gap-4 sticky top-0 z-30">
            <button className="lg:hidden inline-grid place-items-center w-[42px] h-[42px] rounded-xl text-ink hover:bg-bg-alt" onClick={toggleSidebar} aria-label="Menu">
              <SvgIcon name="menu" className="[&_svg]:w-5 [&_svg]:h-5" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-[1.1rem] sm:text-[1.3rem] truncate">{getTitle()}</h1>
              {breadcrumbMap[currentView] && (
                <div className="text-slate-400 text-[.8rem] sm:text-[.85rem]">{breadcrumbMap[currentView]}</div>
              )}
            </div>
            <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <a href="/" target="_blank" className="text-teal-600 font-semibold text-[.8rem] sm:text-[.88rem] inline-flex gap-1 items-center">
                <SvgIcon name="share" className="[&_svg]:w-3.5 sm:[&_svg]:w-4 [&_svg]:h-3.5 sm:[&_svg]:h-4" />
                <span className="hidden xs:inline sm:inline">View Site</span>
              </a>
              <div className="relative pl-4 ml-1 border-l border-border" ref={chipRef}>
                <button
                  className="user-trigger flex items-center gap-2.5 py-1 pl-1 pr-2 rounded-pill hover:bg-bg-alt transition-colors"
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((p) => !p)}
                >
                  <span className="w-[38px] h-[38px] rounded-full bg-navy-900 text-white grid place-items-center font-display font-bold text-[.82rem] flex-none">{initials}</span>
                  <span className="hidden sm:block leading-tight text-left">
                    <b className="text-ink text-[.85rem] block">{user!.name}</b>
                    <span className="text-slate-500 text-[.72rem]">{user!.role}</span>
                  </span>
                  <SvgIcon name="arrow-down" className={clsx('[&_svg]:w-4 [&_svg]:h-4 text-slate-400 transition-transform duration-200', menuOpen && 'rotate-180')} />
                </button>

                <div className={clsx(
                  'absolute top-full right-0 mt-2.5 min-w-[200px] sm:min-w-[230px] bg-white border border-border rounded-md shadow-lg p-1.5 z-50 transition-all duration-150 right-0 sm:right-auto',
                  menuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1.5',
                )} role="menu">
                  <div className="flex items-center gap-2.5 px-2.5 pb-3 mb-1.5 border-b border-border">
                    <span className="w-[38px] h-[38px] rounded-full bg-navy-900 text-white grid place-items-center font-display font-bold text-[.82rem] flex-none">{initials}</span>
                    <div>
                      <b className="text-ink text-[.9rem] block">{user!.name}</b>
                      <span className="text-slate-500 text-[.78rem]">@{user!.username}</span>
                    </div>
                  </div>
                  <button
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded text-slate-700 font-semibold text-[.9rem] text-left hover:bg-bg-alt transition-colors"
                    role="menuitem"
                    onClick={() => { setMenuOpen(false); navigate('/admin/security') }}
                  >
                    <SvgIcon name="shield" className="[&_svg]:w-[18px] [&_svg]:h-[18px] text-slate-500 flex-none" />
                    <span>Change Password</span>
                  </button>
                  <button
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded text-danger font-semibold text-[.9rem] text-left hover:bg-danger-bg transition-colors"
                    role="menuitem"
                    onClick={() => { setMenuOpen(false); logout(); navigate('/admin/login') }}
                  >
                    <SvgIcon name="logout" className="[&_svg]:w-[18px] [&_svg]:h-[18px] text-danger flex-none" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          <div className="p-[clamp(20px,3vw,40px)] flex-1">
            <Outlet />
          </div>
        </div>
      </div>

      {drawerOpen && (
        <>
          <div className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-100" onClick={closeDrawer} />
          <aside className="fixed top-0 right-0 bottom-0 w-full max-w-[540px] bg-white z-101 flex flex-col shadow-lg animate-[drawerIn_0.28s_cubic-bezier(.2,.7,.2,1)_both]">
            <div className="flex items-center justify-between px-4 sm:px-7 py-4 sm:py-[22px] border-b border-border">
              <h2 className="text-[1.1rem] sm:text-[1.3rem]">{drawerTitle}</h2>
              <button className="w-[34px] h-[34px] rounded-[9px] grid place-items-center text-slate-500 border border-border bg-white hover:text-teal-600 hover:border-teal-500 transition-all" onClick={closeDrawer} aria-label="Close">
                <SvgIcon name="close" className="[&_svg]:w-4 [&_svg]:h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 sm:px-7 py-4 sm:py-6" ref={drawerContentRef} />
            {drawerSaveCb && (
              <div className="flex justify-end gap-3 px-4 sm:px-7 py-3 sm:py-[18px] border-t border-border">
                <button className="inline-flex items-center justify-center gap-[.55em] font-body font-semibold leading-none whitespace-nowrap rounded-pill transition-all duration-[180ms] py-[.82em] px-[1.5em] text-[.95rem] bg-transparent text-ink border border-border-strong hover:border-navy-900" onClick={closeDrawer}>Cancel</button>
                <button className="inline-flex items-center justify-center gap-[.55em] font-body font-semibold leading-none whitespace-nowrap rounded-pill transition-all duration-[180ms] py-[.82em] px-[1.5em] text-[.95rem] bg-teal-600 text-white shadow-[0_6px_18px_rgba(14,115,115,.28)] hover:bg-teal-700 hover:-translate-y-0.5 active:translate-y-px" onClick={drawerSaveCb}>Save</button>
              </div>
            )}
          </aside>
        </>
      )}

      <style>{`
        @keyframes drawerIn { from { transform: translateX(100%) } to { transform: none } }
        @keyframes toastIn { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }
      `}</style>
    </div>
  )
}
