import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { calculateScarfScores, rankScarf, SCARF_DOMAINS, SCARF_TOTAL } from '@/lib/scarf-data'
import { sendGenericResultEmail } from '@/lib/email-generic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, answers } = body

    if (!name || !email || !answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 })
    }

    const scores = calculateScarfScores(answers)
    const ranking = rankScarf(scores)

    const { data, error } = await supabase
      .from('scarf_responses')
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

    const topDomain = SCARF_DOMAINS[ranking[0]]
    sendGenericResultEmail({
      to: email,
      subject: `Seu perfil SCARF: ${topDomain.label} é o que mais te move`,
      name,
      badge: 'Resultado · SCARF',
      heading: 'Seus domínios, do que mais ao que menos te afeta',
      rows: ranking.map((d) => {
        const m = SCARF_DOMAINS[d]
        return {
          label: m.label,
          sub: m.summary,
          value: `${scores[d]}/${SCARF_TOTAL}`,
          color: m.color,
        }
      }),
      resultPath: 'resultado-scarf',
      resultId: data.id,
      testName: 'SCARF',
    }).catch((err) => console.error('Email error:', err))

    return NextResponse.json({ id: data.id })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
