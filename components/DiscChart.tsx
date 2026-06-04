'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  ReferenceLine,
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
    label: DISC_LABELS[type],
    Natural: Math.round((naturalScores[type] / 40) * 100),
    Adaptado: Math.round((adaptedScores[type] / 40) * 100),
    color: DISC_COLORS[type],
  }))

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 13, fontWeight: 600 }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <ReferenceLine y={50} stroke="#e5e7eb" strokeDasharray="4 4" />
          <Tooltip
            formatter={(value) => `${value}%`}
            contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 13 }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Natural"
            stroke="#6366F1"
            strokeWidth={2.5}
            dot={{ r: 5, fill: '#6366F1' }}
            activeDot={{ r: 7 }}
          />
          <Line
            type="monotone"
            dataKey="Adaptado"
            stroke="#F59E0B"
            strokeWidth={2.5}
            strokeDasharray="6 3"
            dot={{ r: 5, fill: '#F59E0B' }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {(['D', 'I', 'S', 'C'] as const).map((type) => {
          const natPct = Math.round((naturalScores[type] / 40) * 100)
          const adpPct = Math.round((adaptedScores[type] / 40) * 100)
          const diff = adpPct - natPct
          return (
            <div
              key={type}
              className="rounded-xl border p-3"
              style={{ borderColor: DISC_COLORS[type] + '60' }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm" style={{ color: DISC_COLORS[type] }}>
                  {type} — {DISC_LABELS[type]}
                </span>
                {diff !== 0 && (
                  <span className={`text-xs font-semibold ${diff > 0 ? 'text-emerald-500' : 'text-red-400'}`}>
                    {diff > 0 ? '+' : ''}{diff}%
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-16">Natural</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${natPct}%`, backgroundColor: DISC_COLORS[type] }}
                    />
                  </div>
                  <span className="text-xs font-semibold w-10 text-right">{natPct}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-16">Adaptado</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full opacity-70"
                      style={{ width: `${adpPct}%`, backgroundColor: DISC_COLORS[type] }}
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
