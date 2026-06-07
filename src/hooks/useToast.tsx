import { useState, useCallback } from 'react'

export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: number; msg: string; type?: string }>>([])

  const toast = useCallback((msg: string, type?: string) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, msg, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const ToastContainer = (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2.5 items-center">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={clsx(
            'bg-navy-900 text-white px-5 py-3 rounded-pill shadow-lg font-semibold text-[.9rem] flex items-center gap-2.5 animate-[toastIn_0.3s_ease]',
            t.type === 'success' && '!bg-success',
            t.type === 'danger' && '!bg-danger',
          )}
        >
          {t.type === 'success' && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" className="w-5 h-5 flex-none"><circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/></svg>
          )}
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  )

  return { toast, ToastContainer }
}

function clsx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
