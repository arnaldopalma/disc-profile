import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { SCARF_DOMAINS, SCARF_ORDER, SCARF_TOTAL } from '@/lib/scarf-data'
import type { ScarfDomain, ScarfScores } from '@/lib/scarf-data'

export default async function ResultadoScarfPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data, error } = await supabase
    .from('scarf_responses')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) notFound()

  const scores: ScarfScores = data.scores ?? {
    status: 0, certeza: 0, autonomia: 0, relacionamento: 0, justica: 0,
  }
  const ranking: ScarfDomain[] =
    data.ranking ?? [...SCARF_ORDER].sort((a, b) => scores[b] - scores[a])

  const top = ranking[0]
  const bottom = ranking[ranking.length - 1]

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
              <h1 className="text-2xl font-bold text-gray-900 mt-1">Perfil SCARF de {data.name}</h1>
              <p className="text-gray-500 text-sm mt-0.5">{data.email}</p>
            </div>
            <Link href="/scarf" className="shrink-0 text-sm text-blue-600 hover:underline font-medium">
              Fazer novamente
            </Link>
          </div>
        </div>

        {/* Ranking bars */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
          <div>
            <h2 className="font-bold text-gray-900">Seus domínios SCARF</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Do que mais te afeta ao que menos te afeta. Não há resultado bom ou ruim — são suas
              preferências atuais.
            </p>
          </div>
          <div className="space-y-3">
            {ranking.map((d) => {
              const meta = SCARF_DOMAINS[d]
              const value = scores[d] ?? 0
              const pct = Math.round((value / SCARF_TOTAL) * 100)
              return (
                <div key={d}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">
                      {meta.label} <span className="text-gray-400 font-normal">· {meta.summary}</span>
                    </span>
                    <span className="font-bold" style={{ color: meta.color }}>{value}/{SCARF_TOTAL}</span>
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

        {/* Maior domínio */}
        <DomainCard domain={top} kind="maior" />

        {/* Menor domínio */}
        <DomainCard domain={bottom} kind="menor" />

        {/* Reflexões */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-3">
          <h2 className="font-bold text-gray-900">Algumas reflexões</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex gap-2"><span className="text-gray-300">•</span>Como estes resultados podem explicar as suas escolhas — carreira, amigos, interesses e hobbies?</li>
            <li className="flex gap-2"><span className="text-gray-300">•</span>Como explicam suas interações sociais? Ex.: se sua Justiça é alta, como isso explica suas reações quando sente que alguém não está sendo justo com você?</li>
            <li className="flex gap-2"><span className="text-gray-300">•</span>Busque ajustar o seu ambiente para receber mais recompensas do que ameaças no seu domínio dominante.</li>
          </ul>
        </div>

        {/* Share */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-gray-800">Compartilhe seu resultado</p>
          <div className="bg-white border rounded-xl px-4 py-3 text-sm text-gray-600 font-mono break-all">
            {`https://consciencia-autoconhecimento.vercel.app/resultado-scarf/${id}`}
          </div>
          <Link href="/" className="text-sm text-blue-600 hover:underline font-medium">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}

function DomainCard({ domain, kind }: { domain: ScarfDomain; kind: 'maior' | 'menor' }) {
  const meta = SCARF_DOMAINS[domain]
  const isTop = kind === 'maior'
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-3">
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg"
          style={{ backgroundColor: meta.color }}
        >
          {meta.label[0]}
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
            {isTop ? 'Seu maior domínio' : 'Seu menor domínio'}
          </p>
          <h2 className="text-xl font-bold text-gray-900">{meta.label}</h2>
        </div>
      </div>
      {isTop ? (
        <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
          {meta.description.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="text-sm rounded-lg p-3 mt-2" style={{ backgroundColor: meta.color + '12', color: meta.color }}>
            <strong>Dica:</strong> {meta.tip}
          </p>
        </div>
      ) : (
        <p className="text-sm text-gray-700 leading-relaxed">
          Esta é a área que menos te afeta — onde suas reações tendem a ser mais atenuadas diante de
          experiências positivas e negativas. Isso não significa que você desvaloriza {meta.label.toLowerCase()};
          apenas que tem menos gatilhos ativados por ela.
        </p>
      )}
    </div>
  )
}
