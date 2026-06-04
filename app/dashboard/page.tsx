'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from 'recharts'
import { DISC_COLORS, DISC_LABELS, scoreToPercent } from '@/lib/disc-data'
import type { DiscType } from '@/lib/disc-data'

interface Result {
  id: string
  name: string
  email: string
  created_at: string
  natural_scores: Record<string, number>
  adapted_scores: Record<string, number>
  natural_profile: string
  adapted_profile: string
}

export default function DashboardPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [authError, setAuthError] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setAuthError('')
    try {
      const res = await fetch('/api/results', {
        headers: { 'x-dashboard-password': password },
      })
      if (res.status === 401) {
        setAuthError('Senha incorreta.')
        return
      }
      const data = await res.json()
      setResults(data.results)
      setAuthenticated(true)
    } catch {
      setAuthError('Erro ao conectar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border shadow-sm p-8 w-full max-w-sm space-y-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard DISC</h1>
            <p className="text-gray-500 text-sm mt-1">Área restrita — informe a senha de acesso</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha do dashboard"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {authError && <p className="text-red-500 text-sm">{authError}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {loading ? 'Carregando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  const filtered = results.filter(
    (r) =>
      r.name.toLowerCase().includes(filter.toLowerCase()) ||
      r.email.toLowerCase().includes(filter.toLowerCase()) ||
      r.natural_profile.toLowerCase().includes(filter.toLowerCase())
  )

  // D/I/S/C presence counts (a profile C_D_S counts for D, S and C)
  const typeCounts: Record<string, number> = { D: 0, I: 0, S: 0, C: 0 }
  for (const r of results) {
    for (const t of r.natural_profile.split('_')) {
      if (t in typeCounts) typeCounts[t]++
    }
  }

  // Profile distribution (top profiles by frequency)
  const profileCounts: Record<string, number> = {}
  for (const r of results) {
    profileCounts[r.natural_profile] = (profileCounts[r.natural_profile] || 0) + 1
  }
  const profileChartData = Object.entries(profileCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([profile, count]) => ({
      profile,
      count,
      color: DISC_COLORS[(profile.split('_')[0] as DiscType)] || '#6366F1',
    }))

  // Average D/I/S/C scores across all results
  const avgScores = (['D', 'I', 'S', 'C'] as DiscType[]).map((type) => ({
    label: DISC_LABELS[type],
    type,
    Média: results.length
      ? Math.round(
          results.reduce((sum, r) => sum + scoreToPercent(r.natural_scores[type] || 0), 0) /
            results.length
        )
      : 0,
  }))

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard DISC</h1>
            <p className="text-gray-500 text-sm">{results.length} respostas registradas</p>
          </div>
          <Link href="/" className="text-sm text-indigo-600 hover:underline">← Home</Link>
        </div>

        {/* D/I/S/C count cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(['D', 'I', 'S', 'C'] as DiscType[]).map((type) => (
            <div
              key={type}
              className="bg-white rounded-xl border shadow-sm p-4"
              style={{ borderLeftColor: DISC_COLORS[type], borderLeftWidth: 4 }}
            >
              <div className="text-2xl font-black" style={{ color: DISC_COLORS[type] }}>
                {typeCounts[type] || 0}
              </div>
              <div className="text-sm font-medium text-gray-700 mt-0.5">{DISC_LABELS[type]}</div>
              <div className="text-xs text-gray-400">
                {results.length > 0
                  ? Math.round(((typeCounts[type] || 0) / results.length) * 100)
                  : 0}% do total
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Average D/I/S/C bar chart */}
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-1">Médias do grupo</h2>
            <p className="text-xs text-gray-400 mb-4">Pontuação média por dimensão (perfil natural)</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={avgScores} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} tickLine={false} />
                <YAxis
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  width={38}
                />
                <Tooltip formatter={(v) => `${v}%`} cursor={{ fill: '#f9fafb' }} />
                <Bar dataKey="Média" radius={[6, 6, 0, 0]}>
                  {avgScores.map((entry) => (
                    <Cell key={entry.type} fill={DISC_COLORS[entry.type]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Profile distribution */}
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-1">Perfis mais frequentes</h2>
            <p className="text-xs text-gray-400 mb-4">Distribuição dos perfis naturais</p>
            {profileChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={profileChartData} barSize={32} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis
                    type="category"
                    dataKey="profile"
                    tick={{ fontSize: 12, fontWeight: 600 }}
                    tickLine={false}
                    width={55}
                  />
                  <Tooltip formatter={(v) => `${v} ${Number(v) !== 1 ? 'pessoas' : 'pessoa'}`} cursor={{ fill: '#f9fafb' }} />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                    {profileChartData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
                Nenhum dado ainda
              </div>
            )}
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl border shadow-sm p-4">
          <input
            type="text"
            placeholder="Filtrar por nome, e-mail ou perfil..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Nome</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">E-mail</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Perfil Natural</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Perfil Adaptado</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">D / I / S / C</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Data</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Ver</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((r) => {
                  const s = r.natural_scores as Record<string, number>
                  return (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">{r.name}</td>
                      <td className="px-4 py-3 text-gray-500">{r.email}</td>
                      <td className="px-4 py-3"><ProfileBadge profile={r.natural_profile} /></td>
                      <td className="px-4 py-3"><ProfileBadge profile={r.adapted_profile} /></td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 flex-wrap">
                          {(['D', 'I', 'S', 'C'] as DiscType[]).map((t) => (
                            <span
                              key={t}
                              className="text-xs font-semibold px-1.5 py-0.5 rounded"
                              style={{ backgroundColor: DISC_COLORS[t] + '20', color: DISC_COLORS[t] }}
                            >
                              {t}:{scoreToPercent(s[t] || 0)}%
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                        {new Date(r.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/resultado/${r.id}`} className="text-indigo-600 hover:underline text-xs font-medium">
                          Ver →
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400">Nenhum resultado encontrado.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileBadge({ profile }: { profile: string }) {
  const types = profile.split('_') as DiscType[]
  const primaryColor = DISC_COLORS[types[0]] || '#6366F1'
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold"
      style={{ backgroundColor: primaryColor + '20', color: primaryColor }}
    >
      {profile}
    </span>
  )
}
