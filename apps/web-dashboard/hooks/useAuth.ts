'use client'

import { create } from 'zustand'
import { api } from '@/lib/api'
import Cookies from 'js-cookie'

interface User {
  id: string
  email: string
  username: string
}

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, username: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token, user } = response.data
      
      Cookies.set('token', token, { expires: 7 })
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      set({ user, token, isAuthenticated: true })
    } catch (error) {
      throw new Error('Login failed')
    }
  },

  signup: async (email: string, password: string, username: string) => {
    try {
      const response = await api.post('/auth/signup', { email, password, username })
      const { token, user } = response.data
      
      Cookies.set('token', token, { expires: 7 })
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      set({ user, token, isAuthenticated: true })
    } catch (error) {
      throw new Error('Signup failed')
    }
  },

  logout: () => {
    Cookies.remove('token')
    delete api.defaults.headers.common['Authorization']
    set({ user: null, token: null, isAuthenticated: false })
  },

  checkAuth: async () => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        set({ isLoading: false })
        return
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const response = await api.get('/user/profile')
      
      set({ 
        user: response.data, 
        token, 
        isAuthenticated: true,
        isLoading: false
      })
    } catch (error) {
      Cookies.remove('token')
      set({ isLoading: false })
    }
  },
}))
