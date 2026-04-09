"use server";

import { supabaseAdmin } from '@/utils/supabaseServer';

export async function submitOnlineRegistration(formData: any) {
  try {
    // 1. Kiểm tra trùng lặp CCCD
    if (formData.cccd) {
      const { data: existingRecord, error: checkError } = await supabaseAdmin
        .from('online_registrations')
        .select('unit')
        .eq('cccd', formData.cccd)
        .maybeSingle(); // maybeSingle returns null if 0 rows, object if 1 row

      if (checkError) {
        console.error('Check CCCD error:', checkError);
      }

      if (existingRecord) {
        return { 
          success: false, 
          error: `Số CCCD này đã được đăng ký tại đơn vị: ${existingRecord.unit || 'khác'}. Khầy và Thí sinh vui lòng kiểm tra lại để tránh gửi trùng lặp!` 
        };
      }
    }

    // 2. Thực hiện thêm mới vào database
    const { data, error } = await supabaseAdmin
      .from('online_registrations')
      .insert([
        {
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
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return { success: false, error: 'Lỗi lưu vào cơ sở dữ liệu' };
    }

    return { success: true, data };
  } catch (err) {
    console.error('System error:', err);
    return { success: false, error: 'Lỗi hệ thống' };
  }
}
