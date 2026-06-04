import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import {
  calculateStrengthScores,
  getTop5,
  getDomainScores,
  STRENGTH_BY_ID,
  DOMAINS,
} from '@/lib/strengths-data'
import { sendGenericResultEmail } from '@/lib/email-generic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, answers } = body

    if (!name || !email || !answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 })
    }

    const scores = calculateStrengthScores(answers)
    const top5 = getTop5(scores)
    const domainScores = getDomainScores(scores)

    const { data, error } = await supabase
      .from('strengths_responses')
      .insert({
        name,
        email,
        phone: phone ?? null,
        answers,
        scores,
        top5,
        domain_scores: domainScores,
      })
      .select('id')
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Erro ao salvar resultado' }, { status: 500 })
    }

    sendGenericResultEmail({
      to: email,
      subject: 'Seus 5 pontos fortes dominantes',
      name,
      badge: 'Resultado · Pontos Fortes',
      heading: 'Seus 5 talentos dominantes',
      rows: top5.map((sid, i) => {
        const s = STRENGTH_BY_ID[sid]
        return {
          label: `${i + 1}. ${s?.name ?? sid}`,
          sub: s ? DOMAINS[s.domain].short : undefined,
          color: s ? DOMAINS[s.domain].color : '#1d4ed8',
        }
      }),
      resultPath: 'resultado-fortes',
      resultId: data.id,
      testName: 'de Pontos Fortes',
    }).catch((err) => console.error('Email error:', err))

    return NextResponse.json({ id: data.id })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
