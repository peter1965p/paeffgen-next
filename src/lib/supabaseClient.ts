import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Wichtig: Wir deklarieren die Variable ohne sofortige Zuweisung
let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null;

export const createClient = () => {
  // Falls wir auf dem Server sind (Build-Time), erstellen wir immer einen neuen (oder leeren) Client
  if (typeof window === 'undefined') {
    return createSupabaseClient(supabaseUrl, supabaseAnonKey);
  }

  // Im Browser nutzen wir das Singleton-Pattern gegen die "Gold-Meldungen"
  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    });
  }
  
  return supabaseInstance;
}

export const supabase = createClient();