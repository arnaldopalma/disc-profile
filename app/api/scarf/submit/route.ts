import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { calculateScarfScores, rankScarf } from '@/lib/scarf-data'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, answers } = body

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

    return NextResponse.json({ id: data.id })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
