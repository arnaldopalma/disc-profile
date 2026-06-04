import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import {
  STRENGTH_BY_ID,
  DOMAINS,
  DOMAIN_ORDER,
  TOTAL_POINTS,
} from '@/lib/strengths-data'
import type { StrengthDomain } from '@/lib/strengths-data'

export default async function ResultadoFortesPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data, error } = await supabase
    .from('strengths_responses')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) notFound()

  const top5: string[] = data.top5 ?? []
  const domainScores: Record<StrengthDomain, number> = data.domain_scores ?? {
    execucao: 0,
    influencia: 0,
    relacionamento: 0,
    estrategico: 0,
  }

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
                Pontos Fortes de {data.name}
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">{data.email}</p>
            </div>
            <Link
              href="/pontos-fortes"
              className="shrink-0 text-sm text-blue-600 hover:underline font-medium"
            >
              Fazer novamente
            </Link>
          </div>
        </div>

        {/* Top 5 */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
          <div>
            <h2 className="font-bold text-gray-900">Seus 5 talentos dominantes</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Estes são os pontos fortes que mais aparecem nas suas escolhas. Invista neles.
            </p>
          </div>
          <div className="space-y-3">
            {top5.map((sid, i) => {
              const s = STRENGTH_BY_ID[sid]
              if (!s) return null
              const dm = DOMAINS[s.domain]
              return (
                <div
                  key={sid}
                  className="rounded-xl border p-4 flex gap-4"
                  style={{ borderColor: dm.color + '40' }}
                >
                  <div
                    className="w-9 h-9 shrink-0 rounded-lg flex items-center justify-center text-white font-black"
                    style={{ backgroundColor: dm.color }}
                  >
                    {i + 1}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900">{s.name}</span>
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: dm.color + '1A', color: dm.color }}
                      >
                        {dm.short}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.description}</p>
                    {s.apply && (
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <span className="font-semibold text-emerald-700">Como aplicar: </span>
                        {s.apply}
                      </p>
                    )}
                    {s.watch && (
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <span className="font-semibold text-amber-700">Ponto de atenção: </span>
                        {s.watch}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Domínios */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
          <div>
            <h2 className="font-bold text-gray-900">Distribuição por domínio</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Quanto cada um dos quatro domínios de talento pesa no seu perfil.
            </p>
          </div>
          <div className="space-y-3">
            {DOMAIN_ORDER.map((d) => {
              const dm = DOMAINS[d]
              const value = domainScores[d] ?? 0
              const pct = Math.round((value / TOTAL_POINTS) * 100)
              return (
                <div key={d}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{dm.label}</span>
                    <span className="font-bold" style={{ color: dm.color }}>{pct}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: dm.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Share */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-gray-800">Compartilhe seu resultado</p>
          <p className="text-sm text-gray-500">Guarde ou envie este link para consultar depois</p>
          <div className="bg-white border rounded-xl px-4 py-3 text-sm text-gray-600 font-mono break-all">
            {`https://consciencia-autoconhecimento.vercel.app/resultado-fortes/${id}`}
          </div>
          <div>
            <Link href="/" className="text-sm text-blue-600 hover:underline font-medium">
              ← Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
