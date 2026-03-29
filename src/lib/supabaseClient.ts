import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Wir erstellen den Client IMMER. 
// Wenn die Daten fehlen, meckert er erst beim Laden der Daten im Browser,
// aber er bringt den Build in Vercel nicht mehr zum Absturz.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
)