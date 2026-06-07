import { useRef, useEffect, useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useAdmin, SETTINGS } from '@contexts/AdminContext'
import { useSiteData } from '@contexts/SiteContext'

export function AdminSettings() {
  const location = useLocation()
  const view = location.pathname.replace('/admin/', '').split('/')[0] || ''
  const settingsKey = view.startsWith('settings-') ? view.slice(9) : ''
  const siteData = useSiteData()
  const { saveItem } = useAdmin()
  const formRef = useRef<HTMLDivElement>(null)
  const draftRef = useRef<Record<string, unknown>>({})

  const sc = SETTINGS[settingsKey]
  const siteDataAny = siteData as unknown as Record<string, unknown>
  const objData = useMemo(() => {
    return sc ? (siteDataAny[sc.object] as Record<string, unknown> || {}) : {}
  }, [sc, siteDataAny])

  const rebuildForm = useCallback(() => {
    if (!formRef.current || !sc) return
    const draft = { ...objData }
    draftRef.current = draft
    formRef.current.innerHTML = sc.fields.map((f) => fieldHtml(f, draft[f.name])).join('')
    wireFields(formRef.current, draft)
  }, [objData, sc])

  useEffect(() => {
    rebuildForm()
  }, [rebuildForm])

  const save = useCallback(() => {
    if (!sc) return
    saveItem(sc.object, { ...draftRef.current })
    showToast(`${sc.label} saved`, 'success')
  }, [saveItem, sc])

  const notFound = useMemo(() => {
    if (!sc || !objData) return true
    return false
  }, [sc, objData])

  if (notFound) {
    return <div className="p-10 text-center text-slate-500">Settings not found</div>
  }

  return (
    <div className="bg-white rounded-lg border border-border">
      <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-border flex-wrap">
        <div>
          <h2 className="text-[1.2rem]">{sc!.label}</h2>
          <div className="text-slate-500 text-[.88rem] mt-0.5">Changes appear instantly on the public website.</div>
        </div>
        <button className="inline-flex items-center justify-center gap-[.55em] font-body font-semibold leading-none whitespace-nowrap rounded-pill transition-all duration-[180ms] py-[.58em] px-[1.05em] text-[.85rem] bg-teal-600 text-white shadow-[0_6px_18px_rgba(14,115,115,.28)] hover:bg-teal-700 hover:-translate-y-0.5 active:translate-y-px" onClick={save}>
          Save Changes
        </button>
      </div>
      <div className="p-6" ref={formRef} />
    </div>
  )
}

function fieldHtml(f: { name: string; label: string; type: string; placeholder?: string; options?: Array<{ value: string; label: string }> | (() => Array<{ value: string; label: string }>) }, val: unknown) {
  const fid = 'sf_' + f.name
  if (f.type === 'toggle') {
    return `<div class="toggle-row" style="margin-bottom:18px"><span>${esc(f.label)}</span><label class="switch"><input type="checkbox" data-field="${f.name}" ${val ? 'checked' : ''}><span class="track"></span></label></div>`
  }
  if (f.type === 'image') {
    return `<div class="field" style="margin-bottom:18px"><label>${esc(f.label)}</label><div class="img-field"><img class="img-preview" id="prev_${f.name}" src="${esc(assetSrc(String(val || '')))}" alt=""><div class="dropzone" data-img="${f.name}"><div>Click to upload</div><small>JPG/PNG, auto-optimized</small></div><input type="file" accept="image/*" hidden data-imgfile="${f.name}"></div></div>`
  }
  if (f.type === 'textarea') {
    return `<div class="field" style="margin-bottom:18px"><label for="${fid}">${esc(f.label)}</label><textarea class="textarea" id="${fid}" data-field="${f.name}" placeholder="${esc(f.placeholder || '')}">${esc(String(val || ''))}</textarea></div>`
  }
  if (f.type === 'select') {
    const opts = (typeof f.options === 'function' ? f.options() : f.options) || []
    const optHtml = opts.map((o) => `<option value="${esc(o.value)}"${o.value === val ? ' selected' : ''}>${esc(o.label)}</option>`).join('')
    return `<div class="field" style="margin-bottom:18px"><label for="${fid}">${esc(f.label)}</label><select class="select" id="${fid}" data-field="${f.name}">${optHtml}</select></div>`
  }
  return `<div class="field" style="margin-bottom:18px"><label for="${fid}">${esc(f.label)}</label><input class="input" type="text" id="${fid}" data-field="${f.name}" value="${esc(String(val || ''))}" placeholder="${esc(f.placeholder || '')}"></div>`
}

function wireFields(root: HTMLElement, draft: Record<string, unknown>) {
  root.querySelectorAll('[data-field]').forEach((el) => {
    const ev = (el as HTMLInputElement).type === 'checkbox' ? 'change' : 'input'
    el.addEventListener(ev, () => {
      const inp = el as HTMLInputElement
      draft[inp.dataset.field || ''] = inp.type === 'checkbox' ? inp.checked : inp.value
    })
  })
  root.querySelectorAll('[data-img]').forEach((dz) => {
    const name = (dz as HTMLElement).dataset.img || ''
    const file = root.querySelector<HTMLInputElement>(`[data-imgfile="${name}"]`)
    if (file) {
      dz.addEventListener('click', () => file.click())
      ;['dragover', 'dragenter'].forEach((e) => dz.addEventListener(e, (ev) => { ev.preventDefault(); dz.classList.add('drag') }))
      ;['dragleave', 'drop'].forEach((e) => dz.addEventListener(e, (ev) => { ev.preventDefault(); dz.classList.remove('drag') }))
      dz.addEventListener('drop', (ev) => { ev.preventDefault(); const f = (ev as DragEvent).dataTransfer?.files?.[0]; if (f) handleImage(f, name, root, draft) })
      file.addEventListener('change', () => { if (file.files?.[0]) handleImage(file.files[0], name, root, draft) })
    }
  })
}

function handleImage(file: File, name: string, root: HTMLElement, draft: Record<string, unknown>) {
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
      draft[name] = data
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
  t.style.cssText = `background:${type === 'success' ? '#1F8A5B' : '#0A2A3D'};color:#fff;padding:13px 20px;border-radius:999px;box-shadow:0 20px 50px rgba(10,42,61,.12);font-weight:600;font-size:.9rem;display:flex;align-items:center;gap:10px;animation:toastIn .3s ease`
  t.innerHTML = msg
  wrap.appendChild(t)
  document.body.appendChild(wrap)
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(() => wrap.remove(), 300) }, 3000)
}
