import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAdmin, INBOXES } from '@contexts/AdminContext'
import { SvgIcon } from '@utils/icon'

export function AdminInbox() {
  const location = useLocation()
  const view = location.pathname.replace('/admin/', '').split('/')[0] || ''
  const inboxKey = view.startsWith('inbox-') ? view.slice(6) : ''
  const { getCollection, updateItem, removeItem, openDrawer } = useAdmin()
  const [, setRefresh] = useState(0)

  if (!inboxKey || !INBOXES[inboxKey]) {
    return <div className="p-10 text-center text-slate-500">Inbox not found</div>
  }

  const ib = INBOXES[inboxKey]
  const items = (getCollection(ib.collection) as Array<Record<string, unknown>>).filter(Boolean)

  const openDetail = (it: Record<string, unknown>) => {
    if (it.status === 'new') {
      updateItem(ib.collection, String(it.id), { status: 'read' })
      setRefresh((p) => p + 1)
    }
    let rows = ib.fields.map((f) => {
      const v = it[f] as string
      if (!v) return ''
      return `<div class="d-row" style="display:grid;grid-template-columns:150px 1fr;gap:12px;font-size:.92rem"><b style="color:var(--slate-500);font-weight:600">${labelize(f)}</b><span>${esc(v)}</span></div>`
    }).join('')
    rows += `<div class="d-row" style="display:grid;grid-template-columns:150px 1fr;gap:12px;font-size:.92rem"><b style="color:var(--slate-500);font-weight:600">Submitted</b><span>${fmtDate(String(it.submittedAt))}</span></div>`
    const container = document.createElement('div')
    container.className = 'detail-list'
    container.style.cssText = 'display:flex;flex-direction:column;gap:10px'
    container.innerHTML = rows
    openDrawer(`${ib.label.replace(/s$/, '')} Detail`, container as unknown as React.ReactNode)
  }

  const handleDelete = (it: Record<string, unknown>) => {
    if (confirm('Delete this submission?')) {
      removeItem(ib.collection, String(it.id))
      setRefresh((p) => p + 1)
      showToast('Deleted', 'success')
    }
  }

  return (
    <div className="bg-white rounded-lg border border-border">
      <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-border flex-wrap">
        <div>
          <h2 className="text-[1.2rem]">{ib.label}</h2>
          <div className="text-slate-500 text-[.88rem] mt-0.5">Submitted through the public website forms.</div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left text-[.68rem] sm:text-[.72rem] tracking-[.06em] uppercase text-slate-400 font-bold px-3 sm:px-6 py-3">From</th>
              <th className="text-left text-[.68rem] sm:text-[.72rem] tracking-[.06em] uppercase text-slate-400 font-bold px-3 sm:px-6 py-3">Detail</th>
              <th className="text-left text-[.68rem] sm:text-[.72rem] tracking-[.06em] uppercase text-slate-400 font-bold px-3 sm:px-6 py-3">Date</th>
              <th className="text-left text-[.68rem] sm:text-[.72rem] tracking-[.06em] uppercase text-slate-400 font-bold px-3 sm:px-6 py-3">Status</th>
              <th className="text-right text-[.68rem] sm:text-[.72rem] tracking-[.06em] uppercase text-slate-400 font-bold px-3 sm:px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-slate-500">No {ib.label.toLowerCase()} yet.</td>
              </tr>
            ) : items.map((it, idx) => (
              <tr key={String(it.id || idx)} className="hover:bg-[#f9fbfc]">
                <td className="px-3 sm:px-6 py-3 border-t border-border">
                  <div className="font-semibold text-ink text-[.85rem] sm:text-[.92rem]">{String(it.name || '—')}</div>
                  <div className="text-slate-500 text-[.78rem] sm:text-[.84rem]">{String(it.email || it.phone || '')}</div>
                </td>
                <td className="px-3 sm:px-6 py-3 border-t border-border text-[.85rem] sm:text-[.92rem] text-slate-700">
                  {String(it.department || it.role || it.message || '').slice(0, 40)}
                </td>
                <td className="px-3 sm:px-6 py-3 border-t border-border text-[.85rem] sm:text-[.92rem] text-slate-600">
                  {fmtDate(String(it.submittedAt))}
                </td>
                <td className="px-3 sm:px-6 py-3 border-t border-border">
                  {it.status === 'new' ? (
                    <span className="inline-flex text-[.7rem] sm:text-[.74rem] font-bold px-2 py-[3px] rounded-pill bg-success-bg text-success">New</span>
                  ) : (
                    <span className="inline-flex text-[.7rem] sm:text-[.74rem] font-bold px-2 py-[3px] rounded-pill bg-bg-alt text-slate-500">Read</span>
                  )}
                </td>
                <td className="px-3 sm:px-6 py-3 border-t border-border">
                  <div className="flex gap-1.5 justify-end">
                    <button className="w-[34px] h-[34px] rounded-[9px] grid place-items-center text-slate-500 border border-border bg-white hover:text-teal-600 hover:border-teal-500 transition-all" onClick={() => openDetail(it)} title="View">
                      <SvgIcon name="eye" className="[&_svg]:w-4 [&_svg]:h-4" />
                    </button>
                    <button className="w-[34px] h-[34px] rounded-[9px] grid place-items-center text-slate-500 border border-border bg-white hover:text-danger hover:border-danger transition-all" onClick={() => handleDelete(it)} title="Delete">
                      <SvgIcon name="trash" className="[&_svg]:w-4 [&_svg]:h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function labelize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/([A-Z])/g, ' $1')
}

function fmtDate(iso?: string): string {
  if (!iso) return '—'
  try { return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) } catch { return iso }
}

function esc(s: string): string {
  return String(s ?? '').replace(/[&<>"']/g, (c) => {
    const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
    return map[c] || c
  })
}

let toastTimer: ReturnType<typeof setTimeout>

function showToast(msg: string, type: string) {
  const existing = document.querySelector('.admin-toast-wrap')
  if (existing) existing.remove()
  const wrap = document.createElement('div')
  wrap.className = 'admin-toast-wrap'
  wrap.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:10px;align-items:center'
  const t = document.createElement('div')
  t.style.cssText = `background:${type === 'success' ? '#1F8A5B' : '#0A2A3D'};color:#fff;padding:13px 20px;border-radius:999px;box-shadow:0 20px 50px rgba(10,42,61,.12);font-weight:600;font-size:.9rem;display:flex;align-items:center;gap:10px;animation:toastIn .3s ease`
  t.innerHTML = msg
  wrap.appendChild(t)
  document.body.appendChild(wrap)
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(() => wrap.remove(), 300) }, 3000)
}
