import { useState } from 'react'
import { useAdmin } from '@contexts/AdminContext'

export function AdminSecurity() {
  const { user, users, saveUsers } = useAdmin()
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [error, setError] = useState('')

  const usingDefault = user?.password === 'shubham'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!user) { setError('Session expired — please sign in again.'); return }
    if (currentPw !== user.password) { setError('Current password is incorrect.'); return }
    if (newPw.length < 4) { setError('New password must be at least 4 characters.'); return }
    if (newPw !== confirmPw) { setError('New passwords do not match.'); return }
    if (newPw === currentPw) { setError('New password must be different from the current one.'); return }

    saveUsers(users.map((u) => u.id === user.id ? { ...u, password: newPw } : u))
    setCurrentPw('')
    setNewPw('')
    setConfirmPw('')
    setError('')
    showToast('Password updated successfully', 'success')
  }

  return (
    <div className="bg-white rounded-lg border border-border w-full max-w-[560px]">
      <div className="px-6 py-5 border-b border-border">
        <h2 className="text-[1.2rem]">Change Password</h2>
        <div className="text-slate-500 text-[.88rem]">Update the password for <b>{user?.name || 'your account'}</b> ({user?.username}).</div>
      </div>

      <form className="p-6" onSubmit={handleSubmit}>
        {usingDefault && (
          <div className="bg-cyan-50 rounded-md p-3 text-[.82rem] text-teal-700 mb-[18px] text-left">
            You are using the default password <b>shubham</b>. Set your own below.
          </div>
        )}

        <div className="mb-[18px]">
          <label className="block font-semibold text-[.86rem] text-slate-700 mb-[7px]">Current Password</label>
          <input
            className="w-full bg-[#F1F4F6] border-2 border-transparent rounded-md p-[.8em_1em] text-ink placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-teal-500 transition-colors"
            type="password"
            placeholder="Enter current password"
            value={currentPw}
            onChange={(e) => setCurrentPw(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <div className="mb-[18px]">
          <label className="block font-semibold text-[.86rem] text-slate-700 mb-[7px]">New Password</label>
          <input
            className="w-full bg-[#F1F4F6] border-2 border-transparent rounded-md p-[.8em_1em] text-ink placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-teal-500 transition-colors"
            type="password"
            placeholder="At least 4 characters"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        <div className="mb-[26px]">
          <label className="block font-semibold text-[.86rem] text-slate-700 mb-[7px]">Confirm New Password</label>
          <input
            className="w-full bg-[#F1F4F6] border-2 border-transparent rounded-md p-[.8em_1em] text-ink placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-teal-500 transition-colors"
            type="password"
            placeholder="Re-enter new password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        {error && <div className="text-danger text-[.86rem] mb-3">{error}</div>}

        <button type="submit" className="inline-flex items-center justify-center gap-[.55em] font-body font-semibold leading-none whitespace-nowrap rounded-pill transition-all duration-[180ms] py-[.82em] px-[1.5em] text-[.95rem] bg-teal-600 text-white shadow-[0_6px_18px_rgba(14,115,115,.28)] hover:bg-teal-700 hover:-translate-y-0.5 active:translate-y-px">
          Update Password
        </button>
      </form>
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
