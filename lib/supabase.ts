import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

export function getSupabase() {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) throw new Error('Supabase env vars not set')
    _client = createClient(url, key)
  }
  return _client
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return getSupabase()[prop as keyof SupabaseClient]
  },
})

export interface TestResponse {
  id: string
  name: string
  email: string
  created_at: string
  natural_answers: Record<string, number>
  adapted_answers: Record<string, number>
  natural_scores: { D: number; I: number; S: number; C: number }
  adapted_scores: { D: number; I: number; S: number; C: number }
  natural_profile: string
  adapted_profile: string
}
