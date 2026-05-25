'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const { isAuthenticated, isLoading, checkAuth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-shedow-dark">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-shedow-blue/30 border-t-shedow-blue rounded-full"></div>
        </div>
      </div>
    )
  }

  return null
}
