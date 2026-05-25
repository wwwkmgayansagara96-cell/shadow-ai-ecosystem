'use client'

import { useState, useEffect } from 'react'
import { Trash2, Plus } from 'lucide-react'
import { Card, CardHeader } from '@/components/Card'
import { api } from '@/lib/api'

interface Plugin {
  id: string
  name: string
  version: string
  enabled: boolean
  keywords: string[]
}

export function PluginManager() {
  const [plugins, setPlugins] = useState<Plugin[]>([])
  const [loading, setLoading] = useState(true)
  const [newPluginUrl, setNewPluginUrl] = useState('')

  useEffect(() => {
    fetchPlugins()
  }, [])

  const fetchPlugins = async () => {
    try {
      setLoading(true)
      const response = await api.get('/plugins')
      setPlugins(response.data.plugins)
    } catch (error) {
      console.error('Failed to fetch plugins:', error)
    } finally {
      setLoading(false)
    }
  }

  const installPlugin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPluginUrl) return

    try {
      const response = await api.post('/plugins/install', {
        url: newPluginUrl
      })
      setNewPluginUrl('')
      fetchPlugins()
    } catch (error) {
      console.error('Failed to install plugin:', error)
    }
  }

  const togglePlugin = async (id: string) => {
    const plugin = plugins.find(p => p.id === id)
    if (!plugin) return

    try {
      await api.post(`/plugins/${id}/toggle`, {
        enabled: !plugin.enabled
      })
      setPlugins(plugins.map(p =>
        p.id === id ? { ...p, enabled: !p.enabled } : p
      ))
    } catch (error) {
      console.error('Failed to toggle plugin:', error)
    }
  }

  const uninstallPlugin = async (id: string) => {
    try {
      await api.delete(`/plugins/${id}`)
      setPlugins(plugins.filter(p => p.id !== id))
    } catch (error) {
      console.error('Failed to uninstall plugin:', error)
    }
  }

  return (
    <Card>
      <CardHeader title="Plugins" description="Install and manage SHEDOW skills" />
      
      {/* Install New Plugin */}
      <form onSubmit={installPlugin} className="mb-6 flex gap-2">
        <input
          type="url"
          placeholder="Plugin URL (e.g., https://plugins.shedow.ai/my-plugin.jar)"
          value={newPluginUrl}
          onChange={(e) => setNewPluginUrl(e.target.value)}
          className="flex-1 px-4 py-2 bg-shedow-dark border border-shedow-blue/20 rounded-lg focus:outline-none focus:border-shedow-blue"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-shedow-blue text-black rounded-lg font-medium hover:bg-shedow-blue/90 transition flex items-center gap-2"
        >
          <Plus size={20} /> Install
        </button>
      </form>

      {/* Plugin List */}
      {loading ? (
        <div className="text-center text-gray-400">Loading plugins...</div>
      ) : (
        <div className="space-y-3">
          {plugins.map(plugin => (
            <div
              key={plugin.id}
              className="bg-shedow-dark p-4 rounded-lg border border-shedow-blue/10 flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${plugin.enabled ? 'bg-shedow-green' : 'bg-gray-500'}`}></div>
                  <div>
                    <p className="font-medium">{plugin.name}</p>
                    <p className="text-xs text-gray-400">v{plugin.version}</p>
                  </div>
                </div>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {plugin.keywords.map(kw => (
                    <span
                      key={kw}
                      className="text-xs bg-shedow-blue/10 text-shedow-blue px-2 py-1 rounded"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => togglePlugin(plugin.id)}
                  className={`px-3 py-1 rounded text-sm font-medium transition ${
                    plugin.enabled
                      ? 'bg-shedow-green/20 text-shedow-green'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {plugin.enabled ? 'ON' : 'OFF'}
                </button>
                <button
                  onClick={() => uninstallPlugin(plugin.id)}
                  className="p-2 hover:bg-red-500/20 text-red-400 rounded transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
