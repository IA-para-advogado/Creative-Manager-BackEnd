import 'dotenv/config';

export const env = {
  port:           Number(process.env.PORT) || 3000,
  nodeEnv:        process.env.NODE_ENV             || 'development',
  supabaseUrl:    process.env.SUPABASE_URL         || '',
  supabaseKey:    process.env.SUPABASE_SERVICE_KEY || '',
  frontendUrl:    process.env.FRONTEND_URL         || 'http://localhost:5173',
};