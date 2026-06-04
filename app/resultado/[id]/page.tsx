import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import {
  PROFILE_DESCRIPTIONS,
  COMMUNICATION_TIPS,
  DISC_COLORS,
  DISC_LABELS,
  scoreToPercent,
} from '@/lib/disc-data'
import type { DiscType } from '@/lib/disc-data'
import DiscChart from '@/components/DiscChart'

export default async function ResultadoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) notFound()

  const natProfile = PROFILE_DESCRIPTIONS[data.natural_profile] ?? PROFILE_DESCRIPTIONS[data.natural_profile.split('_')[0]]
  const adpProfile = PROFILE_DESCRIPTIONS[data.adapted_profile] ?? PROFILE_DESCRIPTIONS[data.adapted_profile.split('_')[0]]

  const primaryType = data.natural_profile.split('_')[0] as DiscType
  const primaryColor = DISC_COLORS[primaryType]

  const createdAt = new Date(data.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-gray-400">{createdAt}</p>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">
                Perfil DISC de {data.name}
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">{data.email}</p>
            </div>
            <Link
              href="/teste"
              className="shrink-0 text-sm text-indigo-600 hover:underline font-medium"
            >
              Fazer novamente
            </Link>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">Seus resultados</h2>
          <DiscChart
            naturalScores={data.natural_scores}
            adaptedScores={data.adapted_scores}
          />
        </div>

        {/* Natural Profile */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg"
              style={{ backgroundColor: primaryColor }}
            >
              {data.natural_profile.replace(/_/g, '+')}
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Perfil Natural</p>
              <h2 className="text-xl font-bold text-gray-900">{natProfile?.title ?? data.natural_profile}</h2>
              {natProfile?.label && (
                <span className="text-sm text-gray-500">"{natProfile.label}"</span>
              )}
            </div>
          </div>

          {natProfile && (
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>{natProfile.summary}</p>
              <details className="group">
                <summary className="cursor-pointer text-indigo-600 font-medium list-none flex items-center gap-1">
                  <span className="group-open:hidden">+ Ver mais detalhes</span>
                  <span className="hidden group-open:inline">- Menos detalhes</span>
                </summary>
                <div className="mt-3 space-y-3 pl-3 border-l-2 border-gray-100">
                  <div>
                    <span className="font-semibold text-gray-800">Relacionamento: </span>
                    {natProfile.relating}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Habilidades: </span>
                    {natProfile.skills}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Motivação: </span>
                    {natProfile.motivation}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Sub-traços: </span>
                    {natProfile.subtraits}
                  </div>
                </div>
              </details>
            </div>
          )}
        </div>

        {/* Adapted Profile */}
        {data.adapted_profile !== data.natural_profile && (
          <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Perfil Adaptado (trabalho/pressão)</p>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                {adpProfile?.title ?? data.adapted_profile}
              </h2>
              {adpProfile?.label && (
                <span className="text-sm text-gray-500">"{adpProfile.label}"</span>
              )}
            </div>
            {adpProfile && <p className="text-sm text-gray-700 leading-relaxed">{adpProfile.summary}</p>}
          </div>
        )}

        {/* Communication Tips */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-gray-900">Como se comunicar com cada perfil</h2>
          <p className="text-sm text-gray-500">
            Adaptar sua comunicação ao estilo do outro é uma marca de um comunicador eficaz.
          </p>
          <div className="grid gap-4">
            {(['D', 'I', 'S', 'C'] as DiscType[]).map((type) => (
              <div key={type} className="rounded-xl border p-4" style={{ borderColor: DISC_COLORS[type] + '40' }}>
                <div
                  className="font-bold text-sm mb-2"
                  style={{ color: DISC_COLORS[type] }}
                >
                  Ao falar com um {DISC_LABELS[type]}
                </div>
                <ul className="space-y-1">
                  {COMMUNICATION_TIPS[type].map((tip, i) => (
                    <li key={i} className="text-sm text-gray-600 flex gap-2">
                      <span className="text-gray-300 shrink-0">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-gray-800">Compartilhe seu perfil</p>
          <p className="text-sm text-gray-500">Guarde ou envie este link para consultar depois</p>
          <div className="bg-white border rounded-xl px-4 py-3 text-sm text-gray-600 font-mono break-all">
            {typeof window !== 'undefined' ? window.location.href : `https://seusite.com/resultado/${id}`}
          </div>
        </div>
      </div>
    </div>
  )
}
