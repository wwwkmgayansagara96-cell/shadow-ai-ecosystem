'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
    try {
      const { signup } = useAuth.getState()
      await signup(email, password, username)
      router.push('/dashboard')
    } catch (err) {
      setError('Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-shedow-dark">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block w-12 h-12 bg-gradient-to-r from-shedow-blue to-shedow-purple rounded-lg flex items-center justify-center mb-4">
            <span className="text-xl font-bold">S</span>
          </div>
          <h1 className="text-2xl font-bold">SHEDOW AI</h1>
          <p className="text-gray-400 mt-2">Create Your Account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-shedow-gray border border-shedow-blue/20 rounded-lg focus:outline-none focus:border-shedow-blue transition"
              placeholder="johndoe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-shedow-gray border border-shedow-blue/20 rounded-lg focus:outline-none focus:border-shedow-blue transition"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-shedow-gray border border-shedow-blue/20 rounded-lg focus:outline-none focus:border-shedow-blue transition"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-shedow-gray border border-shedow-blue/20 rounded-lg focus:outline-none focus:border-shedow-blue transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-gradient-to-r from-shedow-blue to-shedow-purple rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-shedow-blue hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}
