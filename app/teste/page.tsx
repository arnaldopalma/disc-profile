'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CHARACTERISTICS } from '@/lib/disc-data'

type Step = 'identify' | 'natural' | 'adapted' | 'submitting'

const RATING_LABELS = ['', 'Não sou eu', 'Pouco eu', 'Bastante eu', 'Exatamente eu']

export default function TestePage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('identify')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [naturalAnswers, setNaturalAnswers] = useState<Record<string, number>>({})
  const [adaptedAnswers, setAdaptedAnswers] = useState<Record<string, number>>({})
  const [error, setError] = useState('')

  const allNaturalFilled = CHARACTERISTICS.every((c) => naturalAnswers[c.name] != null)
  const allAdaptedFilled = CHARACTERISTICS.every((c) => adaptedAnswers[c.name] != null)

  function handleIdentifySubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Preencha todos os campos.')
      return
    }
    setError('')
    setStep('natural')
  }

  async function handleSubmit() {
    if (!allAdaptedFilled) {
      setError('Avalie todas as características antes de continuar.')
      return
    }
    setStep('submitting')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, naturalAnswers, adaptedAnswers }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push(`/resultado/${data.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar. Tente novamente.')
      setStep('adapted')
    }
  }

  if (step === 'identify') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border p-8 w-full max-w-md space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bem-vindo ao teste DISC</h1>
            <p className="text-gray-500 mt-1">
              Não existe uma personalidade boa e outra ruim — elas são complementares.
            </p>
          </div>
          <form onSubmit={handleIdentifySubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seu nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome completo"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seu e-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Começar o teste
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (step === 'submitting') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600 font-medium">Calculando seu perfil...</p>
        </div>
      </div>
    )
  }

  const isNatural = step === 'natural'
  const answers = isNatural ? naturalAnswers : adaptedAnswers
  const setAnswers = isNatural ? setNaturalAnswers : setAdaptedAnswers
  const filledCount = Object.keys(answers).length
  const progress = Math.round((filledCount / CHARACTERISTICS.length) * 100)
  const canContinue = isNatural ? allNaturalFilled : allAdaptedFilled

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-sm font-medium text-indigo-600 uppercase tracking-wide">
                {isNatural ? 'Parte 1 de 2' : 'Parte 2 de 2'}
              </span>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                {isNatural
                  ? 'Como você se vê — seu comportamento natural'
                  : 'Como você age no trabalho — seu comportamento adaptado'}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Pontue de 1 a 4: onde <strong>4 = exatamente você</strong> e <strong>1 = não é você</strong>.
                Não responda o que gostaria de ser, mas o que você realmente é.
              </p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>{filledCount}/{CHARACTERISTICS.length} avaliadas</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-indigo-500 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          {CHARACTERISTICS.map((char) => {
            const val = answers[char.name]
            return (
              <div
                key={char.name}
                className="bg-white rounded-xl border shadow-sm px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <span className="font-medium text-gray-800 min-w-[160px]">{char.name}</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((v) => (
                    <button
                      key={v}
                      onClick={() => setAnswers((prev) => ({ ...prev, [char.name]: v }))}
                      title={RATING_LABELS[v]}
                      className={`w-10 h-10 rounded-lg font-bold text-sm transition-all border-2 ${
                        val === v
                          ? 'bg-indigo-600 text-white border-indigo-600 scale-110'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="sticky bottom-6">
          <div className="bg-white border rounded-2xl shadow-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {!error && !canContinue && (
              <p className="text-gray-400 text-sm">
                Faltam {CHARACTERISTICS.length - filledCount} características para avaliar
              </p>
            )}
            {canContinue && <p className="text-emerald-600 text-sm font-medium">Todas avaliadas!</p>}
            <button
              onClick={() => {
                if (!canContinue) {
                  setError('Avalie todas as características antes de continuar.')
                  return
                }
                setError('')
                if (isNatural) {
                  setStep('adapted')
                } else {
                  handleSubmit()
                }
              }}
              disabled={!canContinue}
              className="ml-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              {isNatural ? 'Próxima parte →' : 'Ver meu resultado →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
