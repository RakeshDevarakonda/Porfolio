import { CheckCircle2, Info, X } from 'lucide-react'

export interface ToastMessage {
  id: string
  title: string
  type?: 'success' | 'info'
}

interface ToastProps {
  toasts: ToastMessage[]
  onDismiss: (id: string) => void
}

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-card toast-card--${toast.type || 'success'}`}>
          {toast.type === 'info' ? <Info size={16} /> : <CheckCircle2 size={16} />}
          <span>{toast.title}</span>
          <button onClick={() => onDismiss(toast.id)} aria-label="Close notification">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
