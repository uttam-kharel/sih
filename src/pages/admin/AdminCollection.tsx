import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAdmin, SCHEMAS, iconSelect } from '@contexts/AdminContext'
import { SvgIcon } from '@utils/icon'

export function AdminCollection() {
  const location = useLocation()
  const collectionKey = location.pathname.replace('/admin/', '').split('/')[0] || ''
  const { getCollection, addItem, updateItem, removeItem, moveItem, openDrawer, closeDrawer } = useAdmin()
  const [, setRefresh] = useState(0)

  if (!collectionKey || !SCHEMAS[collectionKey]) {
    return <div className="p-10 text-center text-slate-500">Collection not found</div>
  }

  const sc = SCHEMAS[collectionKey]
  const items = getCollection(sc.collection) as Array<Record<string, unknown>>

  const cellHtml = (col: { type: string; field: string; sub?: string; label?: string }, it: Record<string, unknown>) => {
    const v = it[col.field]
    if (col.type === 'thumb') {
      const src = assetSrc(String(v || ''))
      return <img className="w-[46px] h-[46px] min-w-[46px] rounded-xl object-cover bg-bg-alt border border-border" src={src || undefined} alt="" />
    }
    if (col.type === 'icon') {
      return <div className="w-10 h-10 rounded-[14px] grid place-items-center bg-cyan-100 text-teal-600"><SvgIcon name={String(v || 'plus')} className="[&_svg]:w-5 [&_svg]:h-5" /></div>
    }
    if (col.type === 'title') {
      return <div><div className="font-semibold text-ink text-[.92rem]">{String(v || '—')}</div>{col.sub ? <div className="text-slate-500 text-[.84rem]">{String(it[col.sub] || '')}</div> : null}</div>
    }
    if (col.type === 'pill') {
      return <span className="inline-flex text-[.74rem] font-bold px-2.5 py-[3px] rounded-pill bg-cyan-100 text-teal-700">{String(v || '')}</span>
    }
    if (col.type === 'flag') {
      return v ? <span className="inline-flex text-[.74rem] font-bold px-2.5 py-[3px] rounded-pill bg-cyan-300 text-navy-900">{col.label || 'Featured'}</span> : <span className="text-slate-400">—</span>
    }
    return <span className="text-[.92rem] text-slate-700">{String(v || '—')}</span>
  }

  const openForm = (id?: string) => {
    const item = id ? items.find((x) => x.id === id) || {} : {}
    const draft = { ...item }

    const fieldHtml = (f: typeof sc.fields[0]) => {
      const val = draft[f.name]
      const fid = 'f_' + f.name

      if (f.type === 'toggle') {
        return `<div class="toggle-row" style="margin-bottom:18px"><span>${esc(f.label)}</span><label class="switch"><input type="checkbox" data-field="${f.name}" ${val ? 'checked' : ''}><span class="track"></span></label></div>`
      }
      if (f.type === 'image') {
        return `<div class="field" style="margin-bottom:18px"><label>${esc(f.label)}</label><div class="img-field"><img class="img-preview" id="prev_${f.name}" src="${esc(assetSrc(String(val || '')))}" alt=""><div class="dropzone" data-img="${f.name}"><div>Click to upload</div><small>JPG/PNG, auto-optimized</small></div><input type="file" accept="image/*" hidden data-imgfile="${f.name}"></div></div>`
      }
      if (f.type === 'list') {
        const items2 = Array.isArray(val) ? (val as string[]) : []
        const rows = items2.map((v) => leRow(v)).join('')
        return `<div class="field" style="margin-bottom:18px"><label>${esc(f.label)}</label><div class="list-editor" data-list="${f.name}">${rows}</div><button type="button" class="btn btn-ghost btn-sm" data-list-add="${f.name}" style="margin-top:8px">+ Add item</button></div>`
      }
      if (f.type === 'textarea') {
        return `<div class="field" style="margin-bottom:18px"><label for="${fid}">${esc(f.label)}</label><textarea class="textarea" id="${fid}" data-field="${f.name}" placeholder="${esc(f.placeholder || '')}">${esc(String(val || ''))}</textarea></div>`
      }
      if (f.type === 'select') {
        const opts = (typeof f.options === 'function' ? f.options() : f.options) || iconSelect
        const optHtml = opts.map((o) => `<option value="${esc(o.value)}"${o.value === val ? ' selected' : ''}>${esc(o.label)}</option>`).join('')
        return `<div class="field" style="margin-bottom:18px"><label for="${fid}">${esc(f.label)}</label><select class="select" id="${fid}" data-field="${f.name}">${optHtml}</select></div>`
      }
      const type = f.type === 'date' ? 'date' : 'text'
      return `<div class="field" style="margin-bottom:18px"><label for="${fid}">${esc(f.label)}${f.required ? ' *' : ''}</label><input class="input" type="${type}" id="${fid}" data-field="${f.name}" value="${esc(String(val || ''))}" placeholder="${esc(f.placeholder || '')}"></div>`
    }

    const html = sc.fields.map(fieldHtml).join('')
    const container = document.createElement('div')
    container.innerHTML = html

    // Wire field listeners
    container.querySelectorAll('[data-field]').forEach((el) => {
      const ev = (el as HTMLInputElement).type === 'checkbox' ? 'change' : 'input'
      el.addEventListener(ev, () => {
        const inp = el as HTMLInputElement
        ;(draft as Record<string, unknown>)[inp.dataset.field || ''] = inp.type === 'checkbox' ? inp.checked : inp.value
      })
    })

    // Image handling
    container.querySelectorAll('[data-img]').forEach((dz) => {
      const name = (dz as HTMLElement).dataset.img || ''
      const file = container.querySelector<HTMLInputElement>(`[data-imgfile="${name}"]`)
      if (file) {
        dz.addEventListener('click', () => file.click())
        ;['dragover', 'dragenter'].forEach((e) => dz.addEventListener(e, (ev) => { ev.preventDefault(); dz.classList.add('drag') }))
          ;['dragleave', 'drop'].forEach((e) => dz.addEventListener(e, (ev) => { ev.preventDefault(); dz.classList.remove('drag') }))
          dz.addEventListener('drop', (ev) => { ev.preventDefault(); const f = (ev as DragEvent).dataTransfer?.files?.[0]; if (f) handleImage(f, name, container) })
        file.addEventListener('change', () => { if (file.files?.[0]) handleImage(file.files[0], name, container) })
      }
    })

    // List editor
    container.querySelectorAll('[data-list-add]').forEach((b) => {
      b.addEventListener('click', () => {
        const wrap = container.querySelector(`[data-list="${(b as HTMLElement).dataset.listAdd}"]`)
        if (wrap) {
          wrap.insertAdjacentHTML('beforeend', leRow(''))
          wireListRow(wrap.lastElementChild as HTMLElement, (b as HTMLElement).dataset.listAdd || '', container)
          syncList((b as HTMLElement).dataset.listAdd || '', container, draft)
        }
      })
    })
    container.querySelectorAll('[data-list]').forEach((wrap) => {
      wrap.querySelectorAll('.le-row').forEach((r) => wireListRow(r as HTMLElement, (wrap as HTMLElement).dataset.list || '', container))
    })

    const saveForm = () => {
      if (id) {
        updateItem(sc.collection, id, { ...draft })
      } else {
        addItem(sc.collection, { ...draft })
      }
      closeDrawer()
      setRefresh((p) => p + 1)
      showToast(id ? `${sc.singular} updated` : `${sc.singular} added`, 'success')
    }

    openDrawer(id ? `Edit ${sc.singular}` : `Add ${sc.singular}`, container as unknown as React.ReactNode, saveForm)
  }

  const handleDelete = (id: string) => {
    if (confirm(`Delete this ${sc.singular.toLowerCase()}? This cannot be undone.`)) {
      removeItem(sc.collection, id)
      setRefresh((p) => p + 1)
      showToast(`${sc.singular} deleted`, 'success')
    }
  }

  const handleMove = (id: string, dir: number) => {
    moveItem(sc.collection, id, dir)
    setRefresh((p) => p + 1)
  }

  return (
    <div className="bg-white rounded-lg border border-border">
      <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-border flex-wrap">
        <div>
          <h2 className="text-[1.2rem]">{sc.label}</h2>
          <div className="text-slate-500 text-[.88rem] mt-0.5">{sc.desc}</div>
        </div>
        <button className="inline-flex items-center justify-center gap-[.55em] font-body font-semibold leading-none whitespace-nowrap rounded-pill transition-all duration-[180ms] py-[.58em] px-[1.05em] text-[.85rem] bg-teal-600 text-white shadow-[0_6px_18px_rgba(14,115,115,.28)] hover:bg-teal-700 hover:-translate-y-0.5 active:translate-y-px" onClick={() => openForm()}>
          <SvgIcon name="plus" className="[&_svg]:w-[15px] [&_svg]:h-[15px]" />
          Add {sc.singular}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {sc.columns.map((col, i) => (
                <th key={i} className="text-left text-[.68rem] sm:text-[.72rem] tracking-[.06em] uppercase text-slate-400 font-bold px-3 sm:px-6 py-3">{col.type === 'flag' ? col.label : ''}</th>
              ))}
              <th className="text-right text-[.68rem] sm:text-[.72rem] tracking-[.06em] uppercase text-slate-400 font-bold px-3 sm:px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={sc.columns.length + 1} className="text-center py-12 text-slate-500">No {sc.label.toLowerCase()} yet.</td>
              </tr>
            ) : items.map((it, idx) => (
              <tr key={String(it.id)} className="hover:bg-[#f9fbfc]">
                {sc.columns.map((col, ci) => (
                  <td key={ci} className="px-3 sm:px-6 py-3 border-t border-border align-middle">{cellHtml(col, it)}</td>
                ))}
                <td className="px-3 sm:px-6 py-3 border-t border-border">
                  <div className="flex gap-1.5 justify-end">
                    <button className="w-[34px] h-[34px] rounded-[9px] grid place-items-center text-slate-500 border border-border bg-white hover:text-teal-600 hover:border-teal-500 transition-all disabled:opacity-35 disabled:cursor-not-allowed" disabled={idx === 0} onClick={() => handleMove(String(it.id), -1)} title="Move up">
                      <SvgIcon name="arrow-up" className="[&_svg]:w-4 [&_svg]:h-4" />
                    </button>
                    <button className="w-[34px] h-[34px] rounded-[9px] grid place-items-center text-slate-500 border border-border bg-white hover:text-teal-600 hover:border-teal-500 transition-all disabled:opacity-35 disabled:cursor-not-allowed" disabled={idx === items.length - 1} onClick={() => handleMove(String(it.id), 1)} title="Move down">
                      <SvgIcon name="arrow-down" className="[&_svg]:w-4 [&_svg]:h-4" />
                    </button>
                    <button className="w-[34px] h-[34px] rounded-[9px] grid place-items-center text-slate-500 border border-border bg-white hover:text-teal-600 hover:border-teal-500 transition-all" onClick={() => openForm(String(it.id))} title="Edit">
                      <SvgIcon name="edit" className="[&_svg]:w-4 [&_svg]:h-4" />
                    </button>
                    <button className="w-[34px] h-[34px] rounded-[9px] grid place-items-center text-slate-500 border border-border bg-white hover:text-danger hover:border-danger transition-all" onClick={() => handleDelete(String(it.id))} title="Delete">
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

function leRow(v: string) {
  return `<div class="le-row" style="display:flex;gap:8px;margin-bottom:8px"><input class="input" value="${esc(v)}" style="flex:1"><button type="button" class="w-[34px] h-[34px] rounded-[9px] grid place-items-center text-slate-500 border border-border bg-white hover:text-danger hover:border-danger transition-all" data-le-del><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/></svg></button></div>`
}

function wireListRow(row: HTMLElement, listName: string, root: HTMLElement, draft?: Record<string, unknown>) {
  const inp = row.querySelector('input')
  if (inp) inp.addEventListener('input', () => syncList(listName, root, draft))
  const del = row.querySelector('[data-le-del]')
  if (del) del.addEventListener('click', () => { row.remove(); syncList(listName, root, draft) })
}

function syncList(listName: string, root: HTMLElement, draft?: Record<string, unknown>) {
  const wrap = root.querySelector(`[data-list="${listName}"]`)
  if (wrap && draft) {
    const vals = Array.from(wrap.querySelectorAll('input')).map((i) => i.value.trim()).filter(Boolean)
    draft[listName] = vals
  }
}

function handleImage(file: File, name: string, root: HTMLElement) {
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      let w = img.width, h = img.height
      const max = 900
      if (w > max || h > max) { const r = Math.min(max / w, max / h); w = Math.round(w * r); h = Math.round(h * r) }
      const cv = document.createElement('canvas'); cv.width = w; cv.height = h
      const ctx = cv.getContext('2d')
      if (ctx) ctx.drawImage(img, 0, 0, w, h)
      const data = cv.toDataURL('image/jpeg', 0.82)
      const preview = root.querySelector<HTMLImageElement>(`#prev_${name}`)
      if (preview) preview.src = data
      // Store data in the form's draft via the field
      const field = root.querySelector<HTMLInputElement>(`[data-field="${name}"]`)
      if (field) field.value = data
    }
    img.src = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

function esc(s: string): string {
  return String(s ?? '').replace(/[&<>"']/g, (c) => {
    const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
    return map[c] || c
  })
}

function assetSrc(v: string): string {
  if (!v) return ''
  if (/^(data:|https?:|\/|\.\.\/)/.test(v)) return v
  if (v.indexOf('assets/') === 0) return '/' + v
  return v
}

let toastTimer: ReturnType<typeof setTimeout>

function showToast(msg: string, type: string) {
  const existing = document.querySelector('.admin-toast-wrap')
  if (existing) existing.remove()
  const wrap = document.createElement('div')
  wrap.className = 'admin-toast-wrap'
  wrap.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:10px;align-items:center'
  const t = document.createElement('div')
  t.className = `admin-toast ${type}`
  t.style.cssText = `background:${type === 'success' ? '#1F8A5B' : '#0A2A3D'};color:#fff;padding:13px 20px;border-radius:999px;box-shadow:0 20px 50px rgba(10,42,61,.12);font-weight:600;font-size:.9rem;display:flex;align-items:center;gap:10px;animation:toastIn .3s ease`
  t.innerHTML = msg
  wrap.appendChild(t)
  document.body.appendChild(wrap)
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(() => wrap.remove(), 300) }, 3000)
}
