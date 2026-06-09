import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { env } from './env';

dotenv.config();

const SUPABASE_URL = env.supabaseUrl || '';
const SUPABASE_KEY = env.supabaseKey || '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Supabase URL e Key devem ser definidos nas variáveis de ambiente.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);