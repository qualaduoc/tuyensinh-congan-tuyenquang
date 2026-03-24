import { createClient } from '@supabase/supabase-js';

// Vui lòng điền biến môi trường NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY vào file .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vvdexample.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'example-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
