'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, LogOut, Settings } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <nav className="sticky top-0 z-50 bg-shedow-gray/80 backdrop-blur border-b border-shedow-blue/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-shedow-blue to-shedow-purple rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold">S</span>
            </div>
            <span className="text-lg font-bold">SHEDOW AI</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="hover:text-shedow-blue transition">
              Dashboard
            </Link>
            <Link href="/plugins" className="hover:text-shedow-blue transition">
              Plugins
            </Link>
            <Link href="/memory" className="hover:text-shedow-blue transition">
              Memory
            </Link>
            <Link href="/settings" className="hover:text-shedow-blue transition">
              Settings
            </Link>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {user && (
              <>
                <span className="text-sm text-gray-400">{user.email}</span>
                <button
                  onClick={logout}
                  className="p-2 hover:bg-shedow-gray rounded-lg transition"
                >
                  <LogOut size={20} />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2 pb-4">
            <Link href="/dashboard" className="block p-2 hover:bg-shedow-gray rounded">
              Dashboard
            </Link>
            <Link href="/plugins" className="block p-2 hover:bg-shedow-gray rounded">
              Plugins
            </Link>
            <Link href="/memory" className="block p-2 hover:bg-shedow-gray rounded">
              Memory
            </Link>
            <Link href="/settings" className="block p-2 hover:bg-shedow-gray rounded">
              Settings
            </Link>
            <button
              onClick={logout}
              className="w-full text-left p-2 hover:bg-shedow-gray rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
