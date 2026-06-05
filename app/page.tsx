import Link from 'next/link'

interface TestCard {
  href: string
  title: string
  desc: string
  cta: string
  swatch: React.ReactNode
}

const TESTS: TestCard[] = [
  {
    href: '/teste',
    title: 'Perfil DISC',
    desc: 'Seu estilo comportamental — Dominante, Influente, Estável ou Conforme — no natural e no trabalho.',
    cta: 'Fazer o teste DISC',
    swatch: (
      <div className="flex gap-2 text-2xl font-black tracking-tight">
        <span className="text-red-500">D</span>
        <span className="text-amber-500">I</span>
        <span className="text-emerald-500">S</span>
        <span className="text-blue-500">C</span>
      </div>
    ),
  },
  {
    href: '/pontos-fortes',
    title: 'Pontos Fortes',
    desc: 'Seus 5 talentos dominantes entre 34, inspirado no modelo de forças de Clifton (Gallup).',
    cta: 'Fazer o teste de Pontos Fortes',
    swatch: (
      <div className="flex gap-1.5">
        {['#7C3AED', '#F59E0B', '#10B981', '#3B82F6'].map((c) => (
          <span key={c} className="w-6 h-6 rounded-md" style={{ backgroundColor: c }} />
        ))}
      </div>
    ),
  },
  {
    href: '/scarf',
    title: 'SCARF',
    desc: 'Quais domínios sociais mais te movem: Status, Certeza, Autonomia, Relacionamento e Justiça.',
    cta: 'Fazer o teste SCARF',
    swatch: (
      <div className="flex gap-1 text-sm font-black">
        <span style={{ color: '#E11D48' }}>S</span>
        <span style={{ color: '#2563EB' }}>C</span>
        <span style={{ color: '#7C3AED' }}>A</span>
        <span style={{ color: '#059669' }}>R</span>
        <span style={{ color: '#D97706' }}>F</span>
      </div>
    ),
  },
  {
    href: '/temperamentos',
    title: 'Temperamentos',
    desc: 'O modelo clássico dos 4 temperamentos: Sanguíneo, Colérico, Melancólico e Fleumático.',
    cta: 'Fazer o teste de Temperamentos',
    swatch: (
      <div className="flex gap-1.5">
        {['#F59E0B', '#EF4444', '#3B82F6', '#10B981'].map((c) => (
          <span key={c} className="w-6 h-6 rounded-full" style={{ backgroundColor: c }} />
        ))}
      </div>
    ),
  },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-end px-4 sm:px-6 py-4">
        <a
          href="https://www.falandosobrecorridaderua.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors"
        >
          Livro →
        </a>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-16">
      <div className="max-w-3xl w-full text-center space-y-10">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
            Consciência &amp; Autoconhecimento
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Conheça a si mesmo</h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            Quatro testes complementares para entender como você se comporta, onde estão seus
            talentos e o que mais te move. Não existe perfil bom ou ruim — só o seu.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 text-left">
          {TESTS.map((t) => (
            <div key={t.href} className="rounded-2xl border shadow-sm p-6 flex flex-col gap-4 bg-white">
              {t.swatch}
              <div className="space-y-1 flex-1">
                <h2 className="text-xl font-bold text-gray-900">{t.title}</h2>
                <p className="text-sm text-gray-600">{t.desc}</p>
              </div>
              <Link
                href={t.href}
                className="inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>

        <a
          href="https://www.falandosobrecorridaderua.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl bg-blue-900 hover:bg-blue-950 text-white p-6 text-left transition-colors"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
            Método 3C · Pilar 1: Consciência
          </span>
          <p className="text-lg font-bold mt-1">
            Estes testes fazem parte do Método 3C de Arnaldo Palma
          </p>
          <p className="text-sm text-blue-100 mt-1">
            Conheça o livro &ldquo;Falando Sobre Corrida de Rua&rdquo; — autoconhecimento,
            congruência e consistência aplicados ao corpo e à carreira. →
          </p>
        </a>
      </div>
      </main>
      <footer className="text-center py-6">
        <Link href="/dashboard" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
          Dashboard
        </Link>
      </footer>
    </div>
  )
}
