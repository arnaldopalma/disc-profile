-- Execute no SQL Editor do Supabase para criar a tabela do Teste de Pontos Fortes

CREATE TABLE IF NOT EXISTS strengths_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  answers JSONB NOT NULL,        -- { "<indice do par>": "<id do talento escolhido>" }
  scores JSONB NOT NULL,         -- { "<id do talento>": <pontos> }
  top5 JSONB NOT NULL,           -- ["id1", "id2", ...] os 5 talentos dominantes
  domain_scores JSONB NOT NULL   -- { execucao, influencia, relacionamento, estrategico }
);

ALTER TABLE strengths_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON strengths_responses
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public reads by id" ON strengths_responses
  FOR SELECT TO anon
  USING (true);
