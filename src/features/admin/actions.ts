"use server";

import { supabaseAdmin } from '@/utils/supabaseServer';
import bcrypt from 'bcryptjs';

export async function loginAdmin(username: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Truy vấn bảng admin_users bằng Service Role Key (bypass RLS)
    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .select('id, username, password_hash')
      .eq('username', username)
      .single();

    if (error || !data) {
      return { success: false, error: 'Tài khoản không tồn tại.' };
    }

    // So sánh mật khẩu nhập vào với hash trong DB
    const isMatch = await bcrypt.compare(password, data.password_hash);

    if (!isMatch) {
      return { success: false, error: 'Mật khẩu không chính xác.' };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Login error:', err);
    return { success: false, error: 'Có lỗi hệ thống, vui lòng thử lại.' };
  }
}

// Hàm tiện ích: tạo hash mật khẩu (dùng khi cần insert tay vào DB)
export async function hashPassword(plainPassword: string): Promise<string> {
  return bcrypt.hash(plainPassword, 10);
}
