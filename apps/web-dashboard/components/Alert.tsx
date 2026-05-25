'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'

type AlertType = 'success' | 'error' | 'info' | 'warning'

interface AlertProps {
  type: AlertType
  message: string
  onClose?: () => void
}

export function Alert({ type, message, onClose }: AlertProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  const colors = {
    success: 'bg-green-500/10 border-green-500/30 text-green-400',
    error: 'bg-red-500/10 border-red-500/30 text-red-400',
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
  }

  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    info: <AlertCircle size={20} />,
    warning: <AlertCircle size={20} />,
  }

  return (
    <div className={`border rounded-lg p-4 flex items-center gap-3 ${colors[type]}`}>
      {icons[type]}
      <span className="flex-1">{message}</span>
      <button
        onClick={handleClose}
        className="text-lg leading-none hover:opacity-70 transition"
      >
        ×
      </button>
    </div>
  )
}
