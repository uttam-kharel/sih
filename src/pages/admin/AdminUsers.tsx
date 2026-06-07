import { useState } from 'react'
import { useAdmin, ROLES } from '@contexts/AdminContext'
import { SvgIcon } from '@utils/icon'
import type { User } from '@contexts/AdminContext'

export function AdminUsers() {
  const { users, saveUsers, currentUser, openDrawer, closeDrawer } = useAdmin()
  const [, setRefresh] = useState(0)
  const me = currentUser()

  const formUser = (u?: User) => {
    const isNew = !u
    const draft: Record<string, string | undefined> = u ? { ...u } : { name: '', username: '', email: '', role: 'Editor', status: 'active' }

    const container = document.createElement('div')
    const roleOpts = ROLES.map((r) => `<option value="${r}"${draft.role === r ? ' selected' : ''}>${r}</option>`).join('')

    container.innerHTML =
      '<div class="field"><label>Full Name *</label><input class="input" data-u="name" value="' + esc(draft.name || '') + '" placeholder="e.g. Jane Doe"></div>' +
      '<div class="field"><label>Username *</label><input class="input" data-u="username" value="' + esc(draft.username || '') + '" placeholder="e.g. jane"></div>' +
      '<div class="field"><label>Email</label><input class="input" type="email" data-u="email" value="' + esc(draft.email || '') + '" placeholder="jane@shubham.intl"></div>' +
      '<div class="field"><label>Role</label><select class="select" data-u="role">' + roleOpts + '</select></div>' +
      '<div class="field"><label>' + (isNew ? 'Password *' : 'Password (leave blank to keep current)') + '</label><input class="input" type="text" data-u="password" value="" placeholder="' + (isNew ? 'At least 4 characters' : '••••••••') + '"></div>' +
      '<div class="toggle-row" style="margin-bottom:18px"><span>Active — can sign in</span><label class="switch"><input type="checkbox" data-u="status" ' + (draft.status !== 'inactive' ? 'checked' : '') + '><span class="track"></span></label></div>' +
      '<div class="login-err" id="userErr" style="color:var(--danger);font-size:.86rem;margin-top:12px;min-height:1.2em"></div>'

    container.querySelectorAll('[data-u]').forEach((el) => {
      const ev = (el as HTMLInputElement).type === 'checkbox' ? 'change' : 'input'
      el.addEventListener(ev, () => {
        const inp = el as HTMLInputElement
        if (inp.dataset.u === 'status') {
          draft.status = inp.checked ? 'active' : 'inactive'
        } else if (inp.dataset.u === 'password') {
          draft._newPass = inp.value
        } else {
          draft[inp.dataset.u || ''] = inp.value
        }
      })
    })

    openDrawer(isNew ? 'Add User' : 'Edit User', container as unknown as React.ReactNode, () => {
      const errEl = document.getElementById('userErr')
      if (errEl) errEl.textContent = ''

      const existing = JSON.parse(localStorage.getItem('shubham_admin_users') || '[]') as User[]

      if (!String(draft.name || '').trim()) { if (errEl) errEl.textContent = 'Name is required.'; return }
      if (!String(draft.username || '').trim()) { if (errEl) errEl.textContent = 'Username is required.'; return }
      const uname = String(draft.username || '').trim().toLowerCase()
      const clash = existing.filter((x) => x.id !== u?.id && x.username.toLowerCase() === uname).length
      if (clash) { if (errEl) errEl.textContent = 'That username is already taken.'; return }
      if (isNew && (!draft._newPass || draft._newPass.length < 4)) { if (errEl) errEl.textContent = 'Password must be at least 4 characters.'; return }
      if (!isNew && draft._newPass && draft._newPass.length < 4) { if (errEl) errEl.textContent = 'Password must be at least 4 characters.'; return }

      if (isNew) {
        existing.unshift({ id: 'u' + Date.now().toString(36), name: String(draft.name || ''), username: String(draft.username || ''), email: String(draft.email || ''), role: String(draft.role || 'Editor'), password: String(draft._newPass || ''), status: String(draft.status || 'active') })
      } else {
        existing.forEach((x) => {
          if (x.id === u!.id) {
            x.name = String(draft.name || ''); x.username = String(draft.username || ''); x.email = String(draft.email || ''); x.role = String(draft.role || ''); x.status = String(draft.status || 'active')
            if (draft._newPass) x.password = String(draft._newPass)
          }
        })
      }
      localStorage.setItem('shubham_admin_users', JSON.stringify(existing))
      closeDrawer()
      saveUsers(existing)
      setRefresh((p) => p + 1)
      showToast(isNew ? 'User added' : 'User updated', 'success')
    })
  }

  const removeUser = (u: User) => {
    if (me?.id === u.id) { showToast('You cannot delete the account you are signed in with.', 'error'); return }
    if (confirm(`Delete user "${u.name}"?`)) {
      saveUsers(users.filter((x) => x.id !== u.id))
      setRefresh((p) => p + 1)
      showToast('User deleted', 'success')
    }
  }

  return (
    <div className="bg-white rounded-lg border border-border">
      <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-border flex-wrap">
        <div>
          <h2 className="text-[1.2rem]">User Management</h2>
          <div className="text-slate-500 text-[.88rem] mt-0.5">Admin accounts that can sign in and manage the website.</div>
        </div>
        <button className="inline-flex items-center justify-center gap-[.55em] font-body font-semibold leading-none whitespace-nowrap rounded-pill transition-all duration-[180ms] py-[.58em] px-[1.05em] text-[.85rem] bg-teal-600 text-white shadow-[0_6px_18px_rgba(14,115,115,.28)] hover:bg-teal-700 hover:-translate-y-0.5 active:translate-y-px" onClick={() => formUser()}>
          <SvgIcon name="plus" className="[&_svg]:w-[15px] [&_svg]:h-[15px]" />
          Add User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left text-[.68rem] sm:text-[.72rem] tracking-[.06em] uppercase text-slate-400 font-bold px-3 sm:px-6 py-3">User</th>
              <th className="text-left text-[.68rem] sm:text-[.72rem] tracking-[.06em] uppercase text-slate-400 font-bold px-3 sm:px-6 py-3">Role</th>
              <th className="text-left text-[.68rem] sm:text-[.72rem] tracking-[.06em] uppercase text-slate-400 font-bold px-3 sm:px-6 py-3">Status</th>
              <th className="text-right text-[.68rem] sm:text-[.72rem] tracking-[.06em] uppercase text-slate-400 font-bold px-3 sm:px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-slate-500">No users yet.</td>
              </tr>
            ) : users.map((u) => (
              <tr key={u.id} className="hover:bg-[#f9fbfc]">
                <td className="px-3 sm:px-6 py-3 border-t border-border">
                  <div className="font-semibold text-ink text-[.85rem] sm:text-[.92rem]">
                    {u.name}
                    {me?.id === u.id && <span className="inline-flex text-[.7rem] sm:text-[.74rem] font-bold px-2 py-[3px] rounded-pill bg-cyan-100 text-teal-700 ml-1">You</span>}
                  </div>
                  <div className="text-slate-500 text-[.78rem] sm:text-[.84rem]">@{u.username}{u.email ? ' · ' + u.email : ''}</div>
                </td>
                <td className="px-3 sm:px-6 py-3 border-t border-border">
                  <span className="inline-flex text-[.7rem] sm:text-[.74rem] font-bold px-2 py-[3px] rounded-pill bg-cyan-100 text-teal-700">{u.role}</span>
                </td>
                <td className="px-3 sm:px-6 py-3 border-t border-border">
                  {u.status === 'active' ? (
                    <span className="inline-flex text-[.7rem] sm:text-[.74rem] font-bold px-2 py-[3px] rounded-pill bg-success-bg text-success">Active</span>
                  ) : (
                    <span className="inline-flex text-[.7rem] sm:text-[.74rem] font-bold px-2 py-[3px] rounded-pill bg-bg-alt text-slate-500">Inactive</span>
                  )}
                </td>
                <td className="px-3 sm:px-6 py-3 border-t border-border">
                  <div className="flex gap-1.5 justify-end">
                    <button className="w-[34px] h-[34px] rounded-[9px] grid place-items-center text-slate-500 border border-border bg-white hover:text-teal-600 hover:border-teal-500 transition-all" onClick={() => formUser(u)} title="Edit">
                      <SvgIcon name="edit" className="[&_svg]:w-4 [&_svg]:h-4" />
                    </button>
                    <button className="w-[34px] h-[34px] rounded-[9px] grid place-items-center text-slate-500 border border-border bg-white hover:text-danger hover:border-danger transition-all" onClick={() => removeUser(u)} title="Delete" disabled={users.length === 1}>
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
