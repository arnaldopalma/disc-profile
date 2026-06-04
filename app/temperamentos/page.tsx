'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TEMP_ROWS, TEMPERAMENT_ORDER } from '@/lib/temperaments-data'
import type { Temperament } from '@/lib/temperaments-data'

type Step = 'identify' | 'testing' | 'submitting'

function shuffled<T>(arr: T[], seed: number): T[] {
  const out = [...arr]
  let s = seed + 1
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280
    const j = Math.floor((s / 233280) * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export default function TemperamentosPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('identify')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Temperament>>({})
  const [error, setError] = useState('')

  const total = TEMP_ROWS.length

  // ordem das 4 opções embaralhada por linha (estável)
  const orders = useMemo<Temperament[][]>(
    () => TEMP_ROWS.map((_, i) => shuffled(TEMPERAMENT_ORDER, i * 5 + 2)),
    []
  )

  function handleIdentifySubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Preencha todos os campos.')
      return
    }
    setError('')
    setStep('testing')
  }

  async function submit(finalAnswers: Record<string, Temperament>) {
    setStep('submitting')
    try {
      const res = await fetch('/api/temperamentos/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, answers: finalAnswers }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push(`/resultado-temperamentos/${data.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar. Tente novamente.')
      setStep('testing')
    }
  }

  function choose(t: Temperament) {
    const next = { ...answers, [String(index)]: t }
    setAnswers(next)
    if (index + 1 >= total) {
      submit(next)
    } else {
      setIndex(index + 1)
    }
  }

  if (step === 'identify') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border p-8 w-full max-w-md space-y-6">
          <div>
            <Link href="/" className="text-sm text-blue-600 hover:underline">← Início</Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">Teste de Temperamentos</h1>
            <p className="text-gray-500 mt-1">
              Em cada linha, escolha a palavra que <strong>mais combina com você</strong>. São 40 linhas
              (20 de forças e 20 de fraquezas). Responda com sinceridade — não há temperamento melhor ou pior.
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
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seu e-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seu telefone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Começar o teste
            </button>
            <p className="text-center text-xs text-gray-400">{total} linhas · cerca de 8 minutos</p>
          </form>
        </div>
      </div>
    )
  }

  if (step === 'submitting') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600 font-medium">Apurando seu temperamento...</p>
        </div>
      </div>
    )
  }

  const rowData = TEMP_ROWS[index]
  const order = orders[index]
  const progress = Math.round((index / total) * 100)

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>
              {index + 1} de {total} · {rowData.kind === 'forca' ? 'Forças' : 'Fraquezas'}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="text-center text-sm font-medium text-blue-600 uppercase tracking-wide">
          Qual palavra mais combina com você?
        </p>

        <div className="grid grid-cols-2 gap-3">
          {order.map((t) => (
            <button
              key={t}
              onClick={() => choose(t)}
              className="group bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 shadow-sm px-4 py-6 text-center transition-all"
            >
              <span className="text-lg font-medium text-gray-800 group-hover:text-blue-900">
                {rowData.words[t]}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => index > 0 && setIndex(index - 1)}
            disabled={index === 0}
            className="text-sm text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Voltar
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <span className="text-xs text-gray-400">Escolha uma palavra para avançar</span>
        </div>
      </div>
    </div>
  )
}
