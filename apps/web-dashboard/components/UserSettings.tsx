'use client'

import { useForm } from 'react-hook-form'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/lib/api'
import { useState } from 'react'
import { Alert } from '@/components/Alert'

interface UserProfile {
  email: string
  username: string
  preferences: {
    preferOffline: boolean
    language: string
    ttsVoice: string
    ttsPitch: number
  }
}

export function UserSettings() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data: any) => {
    try {
      await api.put('/user/preferences', data)
      setAlert({ type: 'success', message: 'Settings updated successfully!' })
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to update settings' })
    }
  }

  return (
    <div className="space-y-6">
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="bg-shedow-gray border border-shedow-blue/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-shedow-blue mb-4">AI Preferences</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Prefer Offline AI</label>
            <input
              type="checkbox"
              {...register('preferOffline')}
              className="w-4 h-4 rounded"
            />
            <span className="ml-2 text-sm text-gray-400">Use local AI when possible</span>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <select
              {...register('language')}
              className="w-full px-4 py-2 bg-shedow-dark border border-shedow-blue/20 rounded-lg focus:outline-none focus:border-shedow-blue"
            >
              <option value="en-US">English (US)</option>
              <option value="es-ES">Español</option>
              <option value="fr-FR">Français</option>
              <option value="de-DE">Deutsch</option>
              <option value="ja-JP">日本語</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">TTS Voice</label>
            <select
              {...register('ttsVoice')}
              className="w-full px-4 py-2 bg-shedow-dark border border-shedow-blue/20 rounded-lg focus:outline-none focus:border-shedow-blue"
            >
              <option value="jarvis">JARVIS (Default)</option>
              <option value="alexa">Alexa Style</option>
              <option value="google">Google Style</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Voice Pitch ({0.85})</label>
            <input
              type="range"
              {...register('ttsPitch')}
              min="0.5"
              max="1.5"
              step="0.1"
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-shedow-blue text-black rounded-lg font-medium hover:bg-shedow-blue/90 transition"
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  )
}
