import { createClient } from '@supabase/supabase-js';

// Client dùng Service Role Key - CHỈ ĐƯỢC DÙNG TRÊN SERVER (Server Actions, API Routes)
// Không bao giờ import file này ở phía Client ("use client")
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
