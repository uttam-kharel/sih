import { useRef, useEffect, useCallback, useState } from 'react'
import { useAdmin } from '@contexts/AdminContext'

export function AdminDepartments() {
  const { getCollection, saveItem } = useAdmin()
  const [depts, setDepts] = useState<string[]>(() => [...(getCollection<string>('departments') || [])])
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!editorRef.current) return
    editorRef.current.querySelectorAll('[data-le-del]').forEach((btn) => {
      btn.addEventListener('click', () => { (btn as HTMLElement).closest('.le-row')?.remove() })
    })
  })

  const save = useCallback(() => {
    if (!editorRef.current) return
    const inputs = editorRef.current.querySelectorAll<HTMLInputElement>('input')
    const vals = Array.from(inputs).map((i) => i.value.trim()).filter(Boolean)
    if (!vals.length) { showToast('Add at least one department', 'error'); return }
    saveItem('departments', vals)
    setDepts(vals)
    showToast('Departments saved', 'success')
  }, [saveItem])

  const addRow = useCallback(() => {
    if (!editorRef.current) return
    const wrap = document.createElement('div')
    wrap.className = 'le-row'
    wrap.style.cssText = 'display:flex;gap:8px'
    wrap.innerHTML =
      '<input class="input" value="" style="flex:1">' +
      '<button type="button" class="w-[34px] h-[34px] rounded-[9px] grid place-items-center text-slate-500 border border-border bg-white hover:text-danger hover:border-danger transition-all" data-le-del>' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>' +
      '</button>'
    wrap.querySelector('[data-le-del]')?.addEventListener('click', () => { wrap.remove() })
    editorRef.current.appendChild(wrap)
    wrap.querySelector('input')?.focus()
  }, [])

  return (
    <div className="bg-white rounded-lg border border-border">
      <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-border flex-wrap">
        <div>
          <h2 className="text-[1.2rem]">Departments</h2>
          <div className="text-slate-500 text-[.88rem] mt-0.5">Powers the department dropdowns on Contact &amp; Careers and the filters on the Doctors page.</div>
        </div>
        <button className="inline-flex items-center justify-center gap-[.55em] font-body font-semibold leading-none whitespace-nowrap rounded-pill transition-all duration-[180ms] py-[.58em] px-[1.05em] text-[.85rem] bg-teal-600 text-white shadow-[0_6px_18px_rgba(14,115,115,.28)] hover:bg-teal-700 hover:-translate-y-0.5 active:translate-y-px" onClick={save}>
          Save Changes
        </button>
      </div>
      <div className="p-6">
        <div className="list-editor" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} ref={editorRef}>
          {depts.map((d, i) => (
            <div key={i} className="le-row" style={{ display: 'flex', gap: '8px' }}>
              <input className="input" defaultValue={d} style={{ flex: 1 }} />
              <button type="button" className="w-[34px] h-[34px] rounded-[9px] grid place-items-center text-slate-500 border border-border bg-white hover:text-danger hover:border-danger transition-all" data-le-del>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style={{ width: 16, height: 16 }}>
                  <path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M10 11v6" /><path d="M14 11v6" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="inline-flex items-center justify-center gap-[.55em] font-body font-semibold leading-none whitespace-nowrap rounded-pill transition-all duration-[180ms] py-[.58em] px-[1.05em] text-[.85rem] bg-transparent text-ink border border-border-strong hover:border-navy-900 mt-3" onClick={addRow}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style={{ width: 15, height: 15 }}><path d="M12 5v14M5 12h14" /></svg>
          Add Department
        </button>
      </div>
    </div>
  )
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
