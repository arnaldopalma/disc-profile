-- Execute no SQL Editor do Supabase para criar a tabela do Teste de Temperamentos

CREATE TABLE IF NOT EXISTS temperaments_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  answers JSONB NOT NULL,   -- { "<indice da linha>": "<temperamento escolhido>" }
  scores JSONB NOT NULL,    -- { sanguineo, colerico, melancolico, fleumatico }
  ranking JSONB NOT NULL    -- ["temperamento1", ...] do maior para o menor
);

ALTER TABLE temperaments_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON temperaments_responses
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public reads by id" ON temperaments_responses
  FOR SELECT TO anon
  USING (true);
