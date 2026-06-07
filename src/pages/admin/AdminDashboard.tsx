import { useNavigate } from 'react-router-dom'
import { SvgIcon } from '@utils/icon'
import { useAdmin, INBOXES } from '@contexts/AdminContext'

export function AdminDashboard() {
  const { getCollection } = useAdmin()
  const navigate = useNavigate()

  const statCards = [
    { k: 'doctors', ic: 'people', l: 'Doctors' },
    { k: 'services', ic: 'stethoscope', l: 'Services' },
    { k: 'jobs', ic: 'briefcase', l: 'Open Roles' },
    { k: 'insights', ic: 'chart', l: 'Articles' },
  ].map((x) => {
    const count = getCollection(x.k).length
    return (
      <div key={x.k} className="bg-white rounded-lg p-[22px] border border-border flex gap-4 items-center min-w-0">
        <div className="w-[48px] h-[48px] rounded-[14px] grid place-items-center bg-cyan-100 text-teal-600 flex-none">
          <SvgIcon name={x.ic} className="[&_svg]:w-6 [&_svg]:h-6" />
        </div>
        <div>
          <div className="font-display font-bold text-[1.7rem] text-ink leading-none">{count}</div>
          <div className="text-slate-500 text-[.85rem] mt-1">{x.l}</div>
        </div>
      </div>
    )
  })

  const inboxRows = Object.entries(INBOXES).map(([k, ib]) => {
    const arr = getCollection(ib.collection) as Array<Record<string, unknown>>
    const unread = arr.filter((x) => x.status === 'new').length
    return (
      <tr key={k}>
        <td className="px-3 sm:px-6 py-3 border-t border-border"><div className="font-semibold text-ink text-[.85rem] sm:text-[.92rem]">{ib.label}</div></td>
        <td className="px-3 sm:px-6 py-3 border-t border-border text-slate-600 text-[.85rem] sm:text-[.92rem]">{arr.length} total</td>
        <td className="px-3 sm:px-6 py-3 border-t border-border">{unread ? <span className="inline-flex text-[.7rem] sm:text-[.74rem] font-bold px-2 py-[3px] rounded-pill bg-success-bg text-success">{unread} new</span> : <span className="inline-flex text-[.7rem] sm:text-[.74rem] font-bold px-2 py-[3px] rounded-pill bg-bg-alt text-slate-500">all read</span>}</td>
        <td className="px-3 sm:px-6 py-3 border-t border-border text-right">
          <button className="w-[34px] h-[34px] rounded-[9px] grid place-items-center text-slate-500 border border-border bg-white hover:text-teal-600 hover:border-teal-500 transition-all" onClick={() => navigate('/admin/inbox-' + k)}>
            <SvgIcon name="arrow" className="[&_svg]:w-4 [&_svg]:h-4" />
          </button>
        </td>
      </tr>
    )
  })

  const recent: Array<{ kind: string; item: Record<string, unknown> }> = []
  Object.entries(INBOXES).forEach(([, ib]) => {
    ;(getCollection(ib.collection) as Array<Record<string, unknown>>).forEach((x) => recent.push({ kind: ib.label, item: x }))
  })
  recent.sort((a, b) => String(b.item.submittedAt || '').localeCompare(String(a.item.submittedAt || '')))
  const recentItems = recent.slice(0, 5)

  return (
    <div>          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-[18px] mb-5 sm:mb-7">
        {statCards}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
        <div className="bg-white rounded-lg border border-border">
          <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-border flex-wrap">
            <h2 className="text-[1.2rem]">Submission Inboxes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>{inboxRows}</tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-border">
          <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-border flex-wrap">
            <h2 className="text-[1.2rem]">Recent Activity</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {recentItems.length === 0 ? (
                  <tr><td colSpan={3} className="text-center py-12 text-slate-500">No submissions yet.</td></tr>
                ) : recentItems.map((r, i) => (
                  <tr key={i}>
                    <td className="px-3 sm:px-6 py-3 border-t border-border">
                      <div className="font-semibold text-ink text-[.85rem] sm:text-[.92rem]">{String(r.item.name || '—')}</div>
                      <div className="text-slate-500 text-[.78rem] sm:text-[.84rem]">{r.kind}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 border-t border-border text-[.85rem] sm:text-[.92rem] text-slate-600">{fmtDate(String(r.item.submittedAt))}</td>
                    <td className="px-3 sm:px-6 py-3 border-t border-border">
                      {r.item.status === 'new' ? <span className="inline-flex text-[.7rem] sm:text-[.74rem] font-bold px-2 py-[3px] rounded-pill bg-success-bg text-success">New</span> : <span className="inline-flex text-[.7rem] sm:text-[.74rem] font-bold px-2 py-[3px] rounded-pill bg-bg-alt text-slate-500">Read</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function fmtDate(iso?: string): string {
  if (!iso) return '—'
  try { return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) } catch { return iso }
}
