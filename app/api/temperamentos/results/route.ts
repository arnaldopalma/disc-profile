import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const password = request.headers.get('x-dashboard-password')
  if (password !== process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('temperaments_responses')
    .select('id, name, email, phone, created_at, scores, ranking')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: 'Erro ao buscar resultados' }, { status: 500 })
  }

  return NextResponse.json({ results: data })
}
