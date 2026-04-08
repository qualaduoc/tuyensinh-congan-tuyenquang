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

export async function getOnlineRegistrations() {
  try {
    const { data, error } = await supabaseAdmin
      .from('online_registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      return { success: false, data: [] };
    }

    // Transform snake_case to camelCase
    const mappedData = data.map((item: any) => ({
      id: item.id,
      createDate: item.created_at,
      fullName: item.full_name,
      dob: item.dob,
      cccd: item.cccd,
      gender: item.gender,
      address: item.address,
      ethnicity: item.ethnicity,
      candidateType: item.candidate_type,
      method: item.method,
      uniChoice: item.uni_choice,
      collegeChoice: item.college_choice,
      combinations: item.combinations,
      academic: item.academic,
      gradYear: item.grad_year,
      officerRating2025: item.officer_rating_2025,
      priorityType: item.priority_type,
      priorityArea: item.priority_area,
      achievements: item.achievements,
      bcaExam: item.bca_exam,
      physicalTest: item.physical_test,
      height: item.height,
      weight: item.weight,
      familyRep: item.family_rep,
      city: item.city,
      unit: item.unit
    }));

    return { success: true, data: mappedData };
  } catch (err) {
    return { success: false, data: [] };
  }
}

export async function deleteOnlineRegistration(id: string) {
  try {
    const { error } = await supabaseAdmin
      .from('online_registrations')
      .delete()
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: 'System error' };
  }
}

export async function updateOnlineRegistration(id: string, formData: any) {
  try {
    const { data, error } = await supabaseAdmin
      .from('online_registrations')
      .update({
          full_name: formData.fullName,
          dob: formData.dob || null,
          cccd: formData.cccd,
          gender: formData.gender,
          address: formData.address,
          ethnicity: formData.ethnicity,
          candidate_type: formData.candidateType,
          method: formData.method,
          uni_choice: formData.uniChoice,
          college_choice: formData.collegeChoice,
          combinations: formData.combinations,
          academic: formData.academic,
          grad_year: formData.gradYear,
          officer_rating_2025: formData.officerRating2025,
          priority_type: formData.priorityType,
          priority_area: formData.priorityArea,
          achievements: formData.achievements,
          bca_exam: formData.bcaExam,
          physical_test: formData.physicalTest,
          height: formData.height,
          weight: formData.weight,
          family_rep: formData.familyRep,
          city: formData.city,
          unit: formData.unit
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(error);
      return { success: false, error: 'Database error' };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: 'System error' };
  }
}
