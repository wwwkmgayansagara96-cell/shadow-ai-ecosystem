'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardHeader } from '@/components/Card'
import { api } from '@/lib/api'

interface UsageData {
  time: string
  offline: number
  cloud: number
  plugin: number
}

export function AIUsageChart() {
  const [data, setData] = useState<UsageData[]>([
    { time: '00:00', offline: 45, cloud: 20, plugin: 35 },
    { time: '04:00', offline: 55, cloud: 25, plugin: 30 },
    { time: '08:00', offline: 35, cloud: 40, plugin: 45 },
    { time: '12:00', offline: 50, cloud: 60, plugin: 40 },
    { time: '16:00', offline: 40, cloud: 70, plugin: 50 },
    { time: '20:00', offline: 60, cloud: 50, plugin: 45 },
  ])

  return (
    <Card>
      <CardHeader 
        title="AI Usage Statistics" 
        description="Offline vs Cloud AI requests over time"
      />
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="time" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #00d4ff' }}
          />
          <Line type="monotone" dataKey="offline" stroke="#00d4ff" strokeWidth={2} />
          <Line type="monotone" dataKey="cloud" stroke="#a855f7" strokeWidth={2} />
          <Line type="monotone" dataKey="plugin" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
