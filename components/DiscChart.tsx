'use client'

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import { DISC_COLORS, DISC_LABELS } from '@/lib/disc-data'

interface DiscScores {
  D: number
  I: number
  S: number
  C: number
}

interface Props {
  naturalScores: DiscScores
  adaptedScores: DiscScores
}

export default function DiscChart({ naturalScores, adaptedScores }: Props) {
  const data = (['D', 'I', 'S', 'C'] as const).map((type) => ({
    type: DISC_LABELS[type],
    Natural: Math.round((naturalScores[type] / 40) * 100),
    Adaptado: Math.round((adaptedScores[type] / 40) * 100),
  }))

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={320}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="type" tick={{ fontSize: 13, fontWeight: 600 }} />
          <Radar
            name="Natural"
            dataKey="Natural"
            stroke="#6366F1"
            fill="#6366F1"
            fillOpacity={0.3}
          />
          <Radar
            name="Adaptado"
            dataKey="Adaptado"
            stroke="#F59E0B"
            fill="#F59E0B"
            fillOpacity={0.2}
          />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {(['D', 'I', 'S', 'C'] as const).map((type) => {
          const natPct = Math.round((naturalScores[type] / 40) * 100)
          const adpPct = Math.round((adaptedScores[type] / 40) * 100)
          return (
            <div
              key={type}
              className="rounded-xl border p-3"
              style={{ borderColor: DISC_COLORS[type] + '60' }}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="font-bold text-sm"
                  style={{ color: DISC_COLORS[type] }}
                >
                  {type} — {DISC_LABELS[type]}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-16">Natural</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${natPct}%`,
                        backgroundColor: DISC_COLORS[type],
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold w-10 text-right">{natPct}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-16">Adaptado</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all opacity-70"
                      style={{
                        width: `${adpPct}%`,
                        backgroundColor: DISC_COLORS[type],
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold w-10 text-right">{adpPct}%</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
