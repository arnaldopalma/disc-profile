import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-3">
          <div className="flex justify-center gap-3 text-4xl font-black tracking-tight">
            <span className="text-red-500">D</span>
            <span className="text-amber-500">I</span>
            <span className="text-emerald-500">S</span>
            <span className="text-blue-500">C</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Perfil de Personalidade</h1>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            Descubra seu estilo comportamental. Não existe uma personalidade boa e outra ruim —
            elas são complementares entre si.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-left">
          {[
            { letter: 'D', color: 'bg-red-50 border-red-200', label: 'Dominante', desc: 'Determinado, direto e orientado a resultados' },
            { letter: 'I', color: 'bg-amber-50 border-amber-200', label: 'Influente', desc: 'Comunicativo, entusiasmado e sociável' },
            { letter: 'S', color: 'bg-emerald-50 border-emerald-200', label: 'Estável', desc: 'Paciente, confiável e colaborativo' },
            { letter: 'C', color: 'bg-blue-50 border-blue-200', label: 'Conforme', desc: 'Analítico, preciso e sistemático' },
          ].map(({ letter, color, label, desc }) => (
            <div key={letter} className={`rounded-xl border p-4 ${color}`}>
              <div className="font-bold text-lg">{letter} — {label}</div>
              <div className="text-sm text-gray-600 mt-1">{desc}</div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <Link
            href="/teste"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-10 py-4 rounded-2xl text-lg transition-colors shadow-sm"
          >
            Fazer o teste agora
          </Link>
          <p className="text-sm text-gray-400">Leva cerca de 10 minutos · Resultado imediato</p>
        </div>
      </div>
    </main>
  )
}
