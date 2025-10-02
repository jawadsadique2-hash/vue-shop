import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY // or service_role key if needed for server
export const supabase = createClient(supabaseUrl, supabaseKey)
