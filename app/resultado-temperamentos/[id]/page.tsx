import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import {
  TEMPERAMENTS,
  TEMPERAMENT_ORDER,
  BLENDS,
  ORIGEM,
  blendKey,
  TEMP_TOTAL,
} from '@/lib/temperaments-data'
import type { Temperament, TempScores } from '@/lib/temperaments-data'

export default async function ResultadoTemperamentosPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data, error } = await supabase
    .from('temperaments_responses')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) notFound()

  const scores: TempScores = data.scores ?? {
    sanguineo: 0, colerico: 0, melancolico: 0, fleumatico: 0,
  }
  const ranking: Temperament[] =
    data.ranking ?? [...TEMPERAMENT_ORDER].sort((a, b) => scores[b] - scores[a])

  const dominant = ranking[0]
  const secondary = ranking[1]
  const blend = BLENDS[blendKey(dominant, secondary)]
  const dom = TEMPERAMENTS[dominant]

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
                Temperamento de {data.name}
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">{data.email}</p>
            </div>
            <Link href="/temperamentos" className="shrink-0 text-sm text-indigo-600 hover:underline font-medium">
              Fazer novamente
            </Link>
          </div>
        </div>

        {/* Dominante + secundário */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="px-3 py-1.5 rounded-xl text-white font-bold"
              style={{ backgroundColor: TEMPERAMENTS[dominant].color }}
            >
              {TEMPERAMENTS[dominant].full}
            </span>
            <span className="text-gray-400">+</span>
            <span
              className="px-3 py-1.5 rounded-xl text-white font-bold"
              style={{ backgroundColor: TEMPERAMENTS[secondary].color }}
            >
              {TEMPERAMENTS[secondary].full}
            </span>
          </div>

          {/* Barras */}
          <div className="space-y-3">
            {ranking.map((t) => {
              const meta = TEMPERAMENTS[t]
              const value = scores[t] ?? 0
              const pct = Math.round((value / TEMP_TOTAL) * 100)
              return (
                <div key={t}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">
                      {meta.label} <span className="text-gray-400 font-normal">{meta.disc}</span>
                    </span>
                    <span className="font-bold" style={{ color: meta.color }}>{value}/{TEMP_TOTAL} · {pct}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: meta.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Combinação */}
        {blend && (
          <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-3">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Sua combinação</p>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">{blend.title}</h2>
            </div>
            <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
              {blend.text.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        )}

        {/* Características do dominante */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
              Seu temperamento dominante
            </p>
            <h2 className="text-xl font-bold text-gray-900 mt-0.5">{dom.full}</h2>
            <p className="text-sm text-gray-500">{dom.summary}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <CharBlock title="Emoções" items={dom.emocoes} color={dom.color} />
            <CharBlock title="No trabalho" items={dom.profissional} color={dom.color} />
            <CharBlock title="Na família" items={dom.familia} color={dom.color} />
            <CharBlock title="Como amigo" items={dom.amigo} color={dom.color} />
          </div>
        </div>

        {/* Origem */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-2 text-sm text-gray-600 leading-relaxed">
          <h2 className="font-bold text-gray-900 text-base">Sobre os temperamentos</h2>
          <p>{ORIGEM.texto}</p>
          <p className="italic">{ORIGEM.lahaye}</p>
          <p>{ORIGEM.nota}</p>
        </div>

        {/* Share */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-gray-800">Compartilhe seu resultado</p>
          <div className="bg-white border rounded-xl px-4 py-3 text-sm text-gray-600 font-mono break-all">
            {`https://disc-profile-sigma.vercel.app/resultado-temperamentos/${id}`}
          </div>
          <Link href="/" className="text-sm text-indigo-600 hover:underline font-medium">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}

function CharBlock({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div className="rounded-xl border p-4" style={{ borderColor: color + '40' }}>
      <div className="font-bold text-sm mb-2" style={{ color }}>{title}</div>
      <ul className="space-y-1">
        {items.map((it, i) => (
          <li key={i} className="text-sm text-gray-600 flex gap-2">
            <span className="text-gray-300 shrink-0">•</span>{it}
          </li>
        ))}
      </ul>
    </div>
  )
}
