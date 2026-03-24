"use client";

import React, { useState, useEffect } from 'react';
import AdminLogin from '@/features/admin/AdminLogin';
import BangThongKe from '@/features/report/BangThongKe';
import { LogOut, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import SVGVietnamShield from '@/components/ui/SVGVietnamShield';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check auth status from session storage on mount
    const authStatus = sessionStorage.getItem('is_admin_logged_in');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('is_admin_logged_in');
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center font-bold text-slate-500 animate-pulse text-xl">Đang tải...</div>;
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans text-slate-900 pb-12 flex flex-col">
      {/* Admin Header - Đỏ thẫm viền vàng y hệt Home */}
      <header className="bg-gradient-to-r from-[#8B0000] via-[#CD0000] to-[#8B0000] text-white shadow-2xl sticky top-0 z-50 border-b-4 border-yellow-400 no-print">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 relative">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="flex items-center flex-col md:flex-row gap-3">
               <SVGVietnamShield className="w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
              <div>
                <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 uppercase drop-shadow-md tracking-wide">
                  Trang quản trị số liệu tuyển sinh
                </h1>
                <p className="text-yellow-100/90 text-xs md:text-sm font-bold mt-1">Công an Tỉnh Tuyên Quang - 2026</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center bg-[#5B0000]/50 rounded-full p-1.5 border border-yellow-500/30">
              <Link 
                href="/"
                className="px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold transition-all text-yellow-100 hover:bg-[#8B0000] hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" /> Trang nhập liệu
              </Link>
              <button 
                onClick={handleLogout}
                className="px-6 py-2 rounded-full flex items-center gap-2 text-sm font-bold transition-all bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 hover:brightness-110 shadow-lg ml-2 border border-yellow-300 active:scale-95 uppercase tracking-wider"
              >
                <LogOut className="w-4 h-4" /> Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <BangThongKe />
      </main>
      
      {/* Footer Mobile/Desktop */}
      <footer className="w-full text-center py-6 mt-8 border-t border-slate-300 text-slate-500 text-xs md:text-sm font-semibold relative overflow-hidden bg-white no-print">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-red-600 to-yellow-400"></div>
        <p>Bản quyền © 2026 thuộc về Công An Tỉnh Tuyên Quang.</p>
        <p className="mt-1 opacity-70">Phát triển và bảo mật bởi Tổ Phát Triển Ứng Dụng Khởi sắc.</p>
      </footer>
    </div>
  );
}
