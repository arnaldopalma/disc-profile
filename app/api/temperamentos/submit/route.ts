import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import {
  calculateTempScores,
  rankTemperaments,
  TEMPERAMENTS,
  TEMP_TOTAL,
} from '@/lib/temperaments-data'
import { sendGenericResultEmail } from '@/lib/email-generic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, answers } = body

    if (!name || !email || !answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 })
    }

    const scores = calculateTempScores(answers)
    const ranking = rankTemperaments(scores)

    const { data, error } = await supabase
      .from('temperaments_responses')
      .insert({
        name,
        email,
        phone: phone ?? null,
        answers,
        scores,
        ranking,
      })
      .select('id')
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Erro ao salvar resultado' }, { status: 500 })
    }

    const dom = TEMPERAMENTS[ranking[0]]
    const sec = TEMPERAMENTS[ranking[1]]
    sendGenericResultEmail({
      to: email,
      subject: `Seu temperamento: ${dom.full} com ${sec.full}`,
      name,
      badge: 'Resultado · Temperamentos',
      heading: 'Seu temperamento, do dominante ao menor',
      rows: ranking.map((t) => {
        const m = TEMPERAMENTS[t]
        return {
          label: m.label,
          sub: m.disc,
          value: `${scores[t]}/${TEMP_TOTAL} · ${Math.round((scores[t] / TEMP_TOTAL) * 100)}%`,
          color: m.color,
        }
      }),
      resultPath: 'resultado-temperamentos',
      resultId: data.id,
      testName: 'de Temperamentos',
    }).catch((err) => console.error('Email error:', err))

    return NextResponse.json({ id: data.id })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
