"use client";
import React, { useState } from 'react';
import { Database, FileText, Settings } from 'lucide-react';
import BangThongKe from '@/features/report/BangThongKe';
import AdminDangKyManager from '@/features/admin/AdminDangKyManager';
import AdminSettings from '@/features/admin/AdminSettings';

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState<'nhap-lieu' | 'dang-ky' | 'settings'>('nhap-lieu');

  return (
    <div className="w-full">
      {/* Tab Selection */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 print:hidden no-print">
        <button
          onClick={() => setActiveTab('nhap-lieu')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-lg transition-all shadow-md ${
            activeTab === 'nhap-lieu'
              ? 'bg-[#1e293b] text-yellow-400 ring-2 ring-slate-400'
              : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-[#1e293b] border border-slate-200'
          }`}
        >
          <Database className="w-5 h-5" />
          SỐ LIỆU DO CÁN BỘ NHẬP
        </button>
        
        <button
          onClick={() => setActiveTab('dang-ky')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-lg transition-all shadow-md ${
            activeTab === 'dang-ky'
              ? 'bg-[#1e293b] text-yellow-400 ring-2 ring-slate-400'
              : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-[#1e293b] border border-slate-200'
          }`}
        >
          <FileText className="w-5 h-5" />
          QUẢN LÝ ĐĂNG KÝ ONLINE
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-lg transition-all shadow-md ${
            activeTab === 'settings'
              ? 'bg-[#1e293b] text-yellow-400 ring-2 ring-slate-400'
              : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-[#1e293b] border border-slate-200'
          }`}
        >
          <Settings className="w-5 h-5" />
          CÀI ĐẶT
        </button>
      </div>

      <div className="w-full">
        {activeTab === 'nhap-lieu' && <BangThongKe />}
        {activeTab === 'dang-ky' && <AdminDangKyManager />}
        {activeTab === 'settings' && <AdminSettings />}
      </div>
    </div>
  );
}
