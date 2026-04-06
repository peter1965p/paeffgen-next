import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Wir deklarieren eine Variable außerhalb, um die Instanz zu "parken"
let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null;

export const createClient = () => {
  // Wenn schon eine Instanz existiert, gib genau die zurück!
  if (supabaseInstance) return supabaseInstance;

  // Ansonsten: Erstelle sie EINMALIG
  supabaseInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });
  
  return supabaseInstance;
}

// Für einfachen Import als Konstante
export const supabase = createClient();