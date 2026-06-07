import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '@contexts/AdminContext'
import { SvgIcon } from '@utils/icon'

export function AdminLogin() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAdmin()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(username, password)) {
      navigate('/admin/dashboard')
    } else {
      setError('Invalid username or password.')
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-6 bg-[radial-gradient(120%_90%_at_80%_0%,#134B63,#0A2A3D)]">
      <form className="bg-white rounded-xl shadow-lg w-full max-w-[420px] p-6 sm:p-8 md:p-11" onSubmit={handleSubmit}>
        <div className="flex items-center gap-3 mb-[26px]">
          <SvgIcon name="logo" className="[&_svg]:w-11 [&_svg]:h-11 flex-none" />
          <b className="font-display text-[1.15rem] text-ink">Shubham Admin</b>
        </div>
        <h1 className="text-[1.5rem] mb-1.5">Welcome back</h1>
        <p className="text-slate-500 text-[.92rem] mb-[26px]">Sign in to manage your website content.</p>

        <div className="block mb-[18px]">
          <label className="block font-semibold text-[.86rem] text-slate-700 mb-[7px]">Username</label>
          <input
            className="w-full bg-[#F1F4F6] border-2 border-transparent rounded-md p-[.8em_1em] text-ink placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-teal-500 transition-colors"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="block mb-[18px]">
          <label className="block font-semibold text-[.86rem] text-slate-700 mb-[7px]">Password</label>
          <input
            className="w-full bg-[#F1F4F6] border-2 border-transparent rounded-md p-[.8em_1em] text-ink placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-teal-500 transition-colors"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            autoFocus
            required
          />
        </div>

        <button type="submit" className="inline-flex items-center justify-center gap-[.55em] font-body font-semibold leading-none whitespace-nowrap rounded-pill transition-all duration-[180ms] py-[1.05em] px-[1.9em] text-[1rem] w-full bg-navy-900 text-white hover:bg-navy-800 hover:-translate-y-0.5 active:translate-y-px">
          Sign In
        </button>

        {error && <div className="text-danger text-[.86rem] mt-2.5">{error}</div>}
        <div className="bg-cyan-50 rounded-md p-3 text-[.82rem] text-teal-700 mt-[18px] text-center">
          Demo credentials — password: <b>shubham</b>
        </div>
      </form>
    </div>
  )
}
