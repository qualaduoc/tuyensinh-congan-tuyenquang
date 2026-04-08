import React from 'react';
import { Lock, FileText, Download } from 'lucide-react';
import HomeContent from '@/components/layout/HomeContent';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans text-slate-900 pb-12 flex flex-col">
      {/* Header VNeID Style: Đỏ thẫm viền Vàng */}
      <header className="bg-gradient-to-r from-[#8B0000] via-[#CD0000] to-[#8B0000] text-white shadow-2xl md:sticky md:top-0 z-50 border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 relative">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            {/* Điểm nhấn logo góc - cực to và quyền lực */}
            <div className="flex items-center flex-col md:flex-row gap-3">
              <img src="https://gianhang.skypecmb.com/Logo%20B%E1%BB%99%20C%C3%B4ng%20An.png" alt="Logo Bộ Công An" className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
              <div>
                <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 uppercase drop-shadow-md tracking-wide">
                  HỆ THỐNG QUẢN LÝ SỐ LIỆU TUYỂN SINH CÔNG AN
                </h1>
                <p className="text-yellow-100/90 text-sm md:text-base font-semibold mt-1">Đội tổ chức biên chế đào tạo Phòng TCCB - Công an Tỉnh Tuyên Quang - 2026</p>
              </div>
            </div>

            {/* Nút đăng nhập Quản Trị - Màu đỏ tối (Deep Maroon) bo viền vàng */}
            <Link 
              href="/admin"
              className="px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-bold transition-all bg-[#5B0000] text-yellow-300 border-2 border-yellow-500/50 hover:bg-[#A30000] hover:text-yellow-200 hover:border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.2)] whitespace-nowrap"
            >
              <Lock className="w-4 h-4" /> TRANG QUẢN TRỊ
            </Link>
          </div>
        </div>
      </header>
      
      {/* Nền xanh viền nhạt mô phỏng VNeID body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:py-10">
        <HomeContent />
      </main>

      {/* Footer Mobile/Desktop */}
      <footer className="w-full text-center py-6 mt-8 border-t border-slate-300 text-slate-500 text-xs md:text-sm font-semibold relative overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-red-600 to-yellow-400"></div>
        <p>Bản quyền © 2026 thuộc về Đội tổ chức biên chế đào tạo Phòng TCCB - Công an Tỉnh Tuyên Quang.</p>
      </footer>
    </div>
  );
}
