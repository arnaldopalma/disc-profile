import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { calculateTempScores, rankTemperaments } from '@/lib/temperaments-data'

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

    return NextResponse.json({ id: data.id })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
