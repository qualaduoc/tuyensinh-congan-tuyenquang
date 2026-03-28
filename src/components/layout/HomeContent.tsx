"use client";
import React, { useState, useEffect } from 'react';
import { FileText, UserPlus, Lock } from 'lucide-react';
import FormNhapLieu from '@/features/form/FormNhapLieu';
import FormDangKyTuyenSinh from '@/features/dang-ky-tuyen-sinh/FormDangKyTuyenSinh';

export default function HomeContent() {
  const [activeTab, setActiveTab] = useState<'nhap-lieu' | 'dang-ky'>('nhap-lieu');
  const [settings, setSettings] = useState({ nhapLieu: true, dangKy: true });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read from localStorage on mount and listen to changes
    const fetchSettings = () => {
      const s = localStorage.getItem('cand_public_settings');
      if (s) {
        const parsed = JSON.parse(s);
        setSettings(parsed);
        // Automatically switch tab if the current one is disabled
        if (!parsed.nhapLieu && parsed.dangKy) {
          setActiveTab('dang-ky');
        } else if (!parsed.dangKy && parsed.nhapLieu) {
          setActiveTab('nhap-lieu');
        }
      }
    };
    
    fetchSettings();
    setMounted(true);
    
    // Listen for custom event if modified in same tab, or storage event if across tabs
    window.addEventListener('cand_settings_updated', fetchSettings);
    window.addEventListener('storage', fetchSettings);
    
    return () => {
      window.removeEventListener('cand_settings_updated', fetchSettings);
      window.removeEventListener('storage', fetchSettings);
    };
  }, []);

  if (!mounted) {
    return <div className="text-center py-20 animate-pulse font-bold text-slate-400">Đang tải biểu mẫu...</div>;
  }

  const bothDisabled = !settings.nhapLieu && !settings.dangKy;

  return (
    <div className="w-full">
      {bothDisabled ? (
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-white border border-slate-200 rounded-3xl shadow-xl">
          <div className="bg-red-50 p-4 rounded-full mb-4 ring-8 ring-red-50/50">
             <Lock className="w-16 h-16 text-slate-500" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#8B0000] uppercase pt-2">HỆ THỐNG ĐANG BẢO TRÌ HOẶC ĐÃ ĐÓNG</h2>
          <p className="mt-4 text-slate-600 max-w-lg text-lg">
            Hiện tại các chức năng nhập liệu bộ và đăng ký tuyển sinh trực tuyến đều đã được khóa bởi Ban Quản trị. Vui lòng quay lại sau!
          </p>
        </div>
      ) : (
        <>
          {/* Tab Selection */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 print:hidden no-print">
            {settings.nhapLieu && (
              <button
                onClick={() => setActiveTab('nhap-lieu')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-lg transition-all shadow-md ${
                  activeTab === 'nhap-lieu'
                    ? 'bg-[#8B0000] text-yellow-300 ring-2 ring-yellow-400'
                    : 'bg-white text-slate-700 hover:bg-red-50 hover:text-[#8B0000] border border-slate-200'
                }`}
              >
                <FileText className="w-5 h-5" />
                PHIẾU CÁN BỘ NHẬP LIỆU
              </button>
            )}
            
            {settings.dangKy && (
              <button
                onClick={() => setActiveTab('dang-ky')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-lg transition-all shadow-md ${
                  activeTab === 'dang-ky'
                    ? 'bg-[#8B0000] text-yellow-300 ring-2 ring-yellow-400'
                    : 'bg-white text-slate-700 hover:bg-red-50 hover:text-[#8B0000] border border-slate-200'
                }`}
              >
                <UserPlus className="w-5 h-5" />
                ĐĂNG KÝ TUYỂN SINH
              </button>
            )}
          </div>

          <div className="w-full">
            {activeTab === 'nhap-lieu' && settings.nhapLieu && <FormNhapLieu />}
            {activeTab === 'dang-ky' && settings.dangKy && <FormDangKyTuyenSinh />}
          </div>
        </>
      )}
    </div>
  );
}
