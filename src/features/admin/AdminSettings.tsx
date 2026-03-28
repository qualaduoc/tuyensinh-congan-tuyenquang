"use client";
import React, { useState, useEffect } from 'react';
import { Settings, Save, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    nhapLieu: true,
    dangKy: true
  });

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem('cand_public_settings');
    if (s) {
      setSettings(JSON.parse(s));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('cand_public_settings', JSON.stringify(settings));
    // Simulate DB save API call event
    window.dispatchEvent(new Event('cand_settings_updated'));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px] animate-in fade-in duration-500">
      
      <div className="bg-[#1e293b] text-white p-4 sm:p-5 shadow-sm border-b border-slate-600 flex items-center gap-3">
        <div className="bg-slate-700 p-2 rounded-full border border-slate-500">
          <Settings size={20} className="text-yellow-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wide">Cài Đặt Hệ Thống</h2>
          <p className="text-sm font-semibold text-slate-300">Bật/Tắt các tính năng công khai trên Trang chủ</p>
        </div>
      </div>

      <div className="p-6 max-w-3xl mx-auto space-y-8 mt-4">
        
        {/* Helper info */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg flex gap-3 text-blue-800">
          <ShieldAlert className="shrink-0" />
          <p className="text-sm">
            <strong className="block">Bảo mật hệ thống:</strong>
            Khi Khầy TẮT tính năng nào ở đây, tính năng đó sẽ bị ẩn hoàn toàn ngoài Trang Chủ để tránh người lạ truy cập nộp/sửa hồ sơ ngoài thời gian quy định.
          </p>
        </div>

        {/* Toggles */}
        <div className="space-y-6">
          <div className={`p-5 rounded-2xl border-2 transition-all flex items-center justify-between ${settings.nhapLieu ? 'border-green-500 bg-green-50' : 'border-slate-300 bg-slate-50'}`}>
            <div>
              <h3 className="text-lg font-bold text-slate-800">SỐ LIỆU DÀNH CHO CÁN BỘ NHẬP LIỆU</h3>
              <p className="text-sm text-slate-600">Form nhập liệu nội bộ dành cho Cán bộ Xã/Phường.</p>
            </div>
            <button 
              onClick={() => setSettings({...settings, nhapLieu: !settings.nhapLieu})}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:ring-offset-2 ${settings.nhapLieu ? 'bg-green-600' : 'bg-slate-400'}`}
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${settings.nhapLieu ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className={`p-5 rounded-2xl border-2 transition-all flex items-center justify-between ${settings.dangKy ? 'border-green-500 bg-green-50' : 'border-slate-300 bg-slate-50'}`}>
            <div>
              <h3 className="text-lg font-bold text-slate-800">ĐĂNG KÝ TUYỂN SINH ONLINE</h3>
              <p className="text-sm text-slate-600">Form Đăng ký và In phiếu dành cho Thí sinh tự do hoặc nghĩa vụ.</p>
            </div>
            <button 
              onClick={() => setSettings({...settings, dangKy: !settings.dangKy})}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:ring-offset-2 ${settings.dangKy ? 'bg-green-600' : 'bg-slate-400'}`}
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${settings.dangKy ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-8 border-t border-slate-200 flex items-center justify-end gap-4">
          {isSaved && (
            <span className="flex items-center text-green-600 font-bold animate-in fade-in slide-in-from-right-4">
              <CheckCircle2 className="w-5 h-5 mr-1" /> Đã cập nhật thành công!
            </span>
          )}
          <button 
            onClick={handleSave}
            className="px-8 py-3 bg-[#8B0000] text-yellow-300 font-bold rounded-xl shadow-lg hover:bg-[#A30000] transition-all flex items-center gap-2"
          >
            <Save className="w-5 h-5" /> LƯU CÚA HÌNH
          </button>
        </div>
      </div>

    </div>
  );
}
