'use client'

import { ReactNode } from 'react'

interface CardProps {
  className?: string
  children: ReactNode
}

export function Card({ className = '', children }: CardProps) {
  return (
    <div className={`bg-shedow-gray border border-shedow-blue/20 rounded-lg p-6 ${className}`}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  description?: string
}

export function CardHeader({ title, description }: CardHeaderProps) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-shedow-blue">{title}</h3>
      {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
    </div>
  )
}
