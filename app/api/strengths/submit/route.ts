import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import {
  calculateStrengthScores,
  getTop5,
  getDomainScores,
} from '@/lib/strengths-data'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, answers } = body

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

    return NextResponse.json({ id: data.id })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
