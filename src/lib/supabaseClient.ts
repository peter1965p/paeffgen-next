import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

// 1. Der fertige Client (für einfachen Import)
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

// 2. Die Funktion (falls dein Code "createClient()" aufrufen will)
export const createClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}