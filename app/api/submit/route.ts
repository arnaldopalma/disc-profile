import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { calculateScores, determineProfile } from '@/lib/disc-data'
import { sendResultEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, naturalAnswers, adaptedAnswers } = body

    if (!name || !email || !naturalAnswers || !adaptedAnswers) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 })
    }

    const naturalScores = calculateScores(naturalAnswers)
    const adaptedScores = calculateScores(adaptedAnswers)
    const naturalProfile = determineProfile(naturalScores)
    const adaptedProfile = determineProfile(adaptedScores)

    const { data, error } = await supabase
      .from('responses')
      .insert({
        name,
        email,
        natural_answers: naturalAnswers,
        adapted_answers: adaptedAnswers,
        natural_scores: naturalScores,
        adapted_scores: adaptedScores,
        natural_profile: naturalProfile,
        adapted_profile: adaptedProfile,
      })
      .select('id')
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Erro ao salvar resultado' }, { status: 500 })
    }

    sendResultEmail({
      name,
      email,
      naturalProfile,
      adaptedProfile,
      naturalScores,
      resultId: data.id,
    }).catch((err) => console.error('Email error:', err))

    return NextResponse.json({ id: data.id })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
