-- Execute no SQL Editor do Supabase para criar a tabela do Teste SCARF

CREATE TABLE IF NOT EXISTS scarf_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  answers JSONB NOT NULL,   -- { "<indice da pergunta>": "<dominio escolhido>" }
  scores JSONB NOT NULL,    -- { status, certeza, autonomia, relacionamento, justica }
  ranking JSONB NOT NULL    -- ["dominio1", ...] do maior para o menor
);

ALTER TABLE scarf_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON scarf_responses
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public reads by id" ON scarf_responses
  FOR SELECT TO anon
  USING (true);
