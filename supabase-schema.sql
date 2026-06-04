-- Run this in the Supabase SQL Editor to create the database table

CREATE TABLE IF NOT EXISTS responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  natural_answers JSONB NOT NULL,
  adapted_answers JSONB NOT NULL,
  natural_scores JSONB NOT NULL,
  adapted_scores JSONB NOT NULL,
  natural_profile TEXT NOT NULL,
  adapted_profile TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anyone can submit the test)
CREATE POLICY "Allow public inserts" ON responses
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow public reads by ID (for result sharing)
CREATE POLICY "Allow public reads by id" ON responses
  FOR SELECT TO anon
  USING (true);
