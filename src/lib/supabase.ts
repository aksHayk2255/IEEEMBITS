import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const hasValidSupabaseUrl = Boolean(
  supabaseUrl &&
    !supabaseUrl.includes('...') &&
    /^https:\/\/[^/]+\.supabase\.co$/.test(supabaseUrl),
);

export const isSupabaseConfigured = Boolean(hasValidSupabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null;
