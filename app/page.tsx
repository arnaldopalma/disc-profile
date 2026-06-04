import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-3xl w-full text-center space-y-10">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500">
            Consciência &amp; Autoconhecimento
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Conheça a si mesmo
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Dois testes complementares para entender como você se comporta e onde estão seus
            talentos naturais. Não existe perfil bom ou ruim — só o seu.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 text-left">
          {/* Teste DISC */}
          <div className="rounded-2xl border shadow-sm p-6 flex flex-col gap-4 bg-white">
            <div className="flex gap-2 text-2xl font-black tracking-tight">
              <span className="text-red-500">D</span>
              <span className="text-amber-500">I</span>
              <span className="text-emerald-500">S</span>
              <span className="text-blue-500">C</span>
            </div>
            <div className="space-y-1 flex-1">
              <h2 className="text-xl font-bold text-gray-900">Perfil DISC</h2>
              <p className="text-sm text-gray-600">
                Descubra seu estilo comportamental — Dominante, Influente, Estável ou Conforme —
                no natural e no trabalho.
              </p>
            </div>
            <Link
              href="/teste"
              className="inline-block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Fazer o teste DISC
            </Link>
            <p className="text-xs text-gray-400 text-center">~10 minutos · resultado imediato</p>
          </div>

          {/* Teste Pontos Fortes */}
          <div className="rounded-2xl border shadow-sm p-6 flex flex-col gap-4 bg-white">
            <div className="flex gap-1.5">
              <span className="w-6 h-6 rounded-md" style={{ backgroundColor: '#7C3AED' }} />
              <span className="w-6 h-6 rounded-md" style={{ backgroundColor: '#F59E0B' }} />
              <span className="w-6 h-6 rounded-md" style={{ backgroundColor: '#10B981' }} />
              <span className="w-6 h-6 rounded-md" style={{ backgroundColor: '#3B82F6' }} />
            </div>
            <div className="space-y-1 flex-1">
              <h2 className="text-xl font-bold text-gray-900">Pontos Fortes</h2>
              <p className="text-sm text-gray-600">
                Identifique seus 5 talentos dominantes entre 34, inspirado no modelo de forças de
                Clifton (Gallup).
              </p>
            </div>
            <Link
              href="/pontos-fortes"
              className="inline-block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Fazer o teste de Pontos Fortes
            </Link>
            <p className="text-xs text-gray-400 text-center">~10 minutos · resultado imediato</p>
          </div>
        </div>

        <p className="text-sm text-gray-400">
          Quanto mais você usa seus pontos fortes no dia a dia, mais engajado e realizado você fica.
        </p>
      </div>
    </main>
  )
}
