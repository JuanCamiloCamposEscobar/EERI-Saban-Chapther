import { createClient } from '@supabase/supabase-js';

// Esto le dice a Vite: "Busca en el archivo .env una variable llamada VITE_..."
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

