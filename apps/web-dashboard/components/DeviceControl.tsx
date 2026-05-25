'use client'

import { useState } from 'react'
import { Zap, Power, Volume2 } from 'lucide-react'
import { Card, CardHeader } from '@/components/Card'
import { api } from '@/lib/api'

export function DeviceControl() {
  const [devices, setDevices] = useState([
    { id: 1, name: 'Living Room Lights', status: 'on', type: 'light' },
    { id: 2, name: 'Kitchen Speaker', status: 'off', type: 'speaker' },
    { id: 3, name: 'Bedroom AC', status: 'on', type: 'climate' },
  ])

  const toggleDevice = async (id: number) => {
    const device = devices.find(d => d.id === id)
    if (!device) return

    try {
      await api.post('/ai/device-control', {
        deviceId: id,
        command: device.status === 'on' ? 'off' : 'on'
      })

      setDevices(devices.map(d => 
        d.id === id ? { ...d, status: d.status === 'on' ? 'off' : 'on' } : d
      ))
    } catch (error) {
      console.error('Failed to control device:', error)
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'light':
        return <Zap size={20} />
      case 'speaker':
        return <Volume2 size={20} />
      default:
        return <Power size={20} />
    }
  }

  return (
    <Card>
      <CardHeader title="Device Control" description="Manage connected IoT devices" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {devices.map(device => (
          <div
            key={device.id}
            className="bg-shedow-dark p-4 rounded-lg border border-shedow-blue/10 hover:border-shedow-blue/30 transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  device.status === 'on' 
                    ? 'bg-shedow-green/20 text-shedow-green' 
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {getIcon(device.type)}
                </div>
                <div>
                  <p className="font-medium">{device.name}</p>
                  <p className="text-xs text-gray-400">{device.status.toUpperCase()}</p>
                </div>
              </div>
              <button
                onClick={() => toggleDevice(device.id)}
                className={`px-3 py-1 rounded-lg font-medium text-sm transition ${
                  device.status === 'on'
                    ? 'bg-shedow-green/20 text-shedow-green hover:bg-shedow-green/30'
                    : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                }`}
              >
                {device.status === 'on' ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
