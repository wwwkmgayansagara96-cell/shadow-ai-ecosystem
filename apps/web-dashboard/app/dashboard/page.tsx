'use client'

import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Navbar } from '@/components/Navbar'
import { ProtectedLayout } from '@/components/ProtectedLayout'
import { Card, CardHeader } from '@/components/Card'
import { AIUsageChart } from '@/components/AIUsageChart'
import { DeviceControl } from '@/components/DeviceControl'
import { PluginManager } from '@/components/PluginManager'
import { Brain, Zap, Radio } from 'lucide-react'

export default function Dashboard() {
  const { checkAuth } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <ProtectedLayout>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-shedow-dark to-shedow-gray">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-shedow-blue to-shedow-purple bg-clip-text text-transparent">
              SHEDOW AI Control Panel
            </h1>
            <p className="text-gray-400 mt-2">Monitor and manage your AI ecosystem</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">AI Requests Today</p>
                  <p className="text-3xl font-bold mt-2">1,234</p>
                </div>
                <Brain className="text-shedow-blue" size={32} />
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Offline Processing</p>
                  <p className="text-3xl font-bold mt-2">67%</p>
                </div>
                <Zap className="text-shedow-green" size={32} />
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Plugins</p>
                  <p className="text-3xl font-bold mt-2">12/15</p>
                </div>
                <Radio className="text-shedow-purple" size={32} />
              </div>
            </Card>
          </div>

          {/* Charts and Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <AIUsageChart />
            <DeviceControl />
          </div>

          {/* Plugin Manager */}
          <PluginManager />
        </div>
      </main>
    </ProtectedLayout>
  )
}
