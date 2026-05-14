import { createClient } from '@supabase/supabase-js';

// We fall back to empty strings so the app doesn't crash if env vars are missing,
// but Supabase won't work until these are provided.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
