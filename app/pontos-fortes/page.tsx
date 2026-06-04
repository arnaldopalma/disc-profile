'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TEST_PAIRS } from '@/lib/strengths-data'

type Step = 'identify' | 'testing' | 'submitting'

export default function PontosFortesPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('identify')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [error, setError] = useState('')

  const total = TEST_PAIRS.length

  function handleIdentifySubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Preencha todos os campos.')
      return
    }
    setError('')
    setStep('testing')
  }

  async function submit(finalAnswers: Record<string, string>) {
    setStep('submitting')
    try {
      const res = await fetch('/api/strengths/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, answers: finalAnswers }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push(`/resultado-fortes/${data.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar. Tente novamente.')
      setStep('testing')
    }
  }

  function choose(chosenId: string) {
    const next = { ...answers, [String(index)]: chosenId }
    setAnswers(next)
    if (index + 1 >= total) {
      submit(next)
    } else {
      setIndex(index + 1)
    }
  }

  function goBack() {
    if (index === 0) return
    setIndex(index - 1)
  }

  if (step === 'identify') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border p-8 w-full max-w-md space-y-6">
          <div>
            <Link href="/" className="text-sm text-indigo-600 hover:underline">← Início</Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">Teste de Pontos Fortes</h1>
            <p className="text-gray-500 mt-1">
              Em cada tela você verá duas frases. Escolha, sem pensar demais, a que mais combina com
              você. Ao final, mostramos seus 5 talentos dominantes.
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
            <p className="text-center text-xs text-gray-400">{total} comparações · cerca de 10 minutos</p>
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
          <p className="text-gray-600 font-medium">Apurando seus talentos...</p>
        </div>
      </div>
    )
  }

  const pair = TEST_PAIRS[index]
  const progress = Math.round((index / total) * 100)

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{index + 1} de {total}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="text-center text-sm font-medium text-indigo-600 uppercase tracking-wide">
          O que mais combina com você?
        </p>

        <div className="grid gap-4">
          {[pair.a, pair.b].map((item) => (
            <button
              key={item.id}
              onClick={() => choose(item.id)}
              className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 shadow-sm px-6 py-6 text-left transition-all"
            >
              <span className="text-lg text-gray-800 group-hover:text-indigo-900 leading-relaxed">
                {item.text}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={goBack}
            disabled={index === 0}
            className="text-sm text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Voltar
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <span className="text-xs text-gray-400">Escolha uma das duas para avançar</span>
        </div>
      </div>
    </div>
  )
}
