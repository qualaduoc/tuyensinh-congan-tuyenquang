"use client";

import React, { useState } from 'react';
import { ShieldCheck, User, Key, KeyRound, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { loginAdmin } from './actions';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginAdmin(username, password);

      if (result.success) {
        sessionStorage.setItem('is_admin_logged_in', 'true');
        onLoginSuccess();
      } else {
        setError(result.error || 'Đăng nhập thất bại.');
      }
    } catch (err) {
      setError('Lỗi kết nối, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E293B] to-[#0F172A] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-[24px] shadow-[0_20px_50px_rgba(250,204,21,0.15)] overflow-hidden border border-yellow-500/20 relative">
        <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-red-600 via-yellow-400 to-red-600"></div>
        <div className="bg-gradient-to-b from-[#8B0000] to-[#5B0000] px-6 py-10 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-yellow-500/20 blur-[50px] rounded-full"></div>
          
          <ShieldCheck className="relative w-16 h-16 text-yellow-400 mx-auto mb-4 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
          <h2 className="relative text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 uppercase tracking-wide">
            Đăng nhập quản trị
          </h2>
          <p className="relative text-red-200 text-xs mt-3 font-semibold">Công an Tỉnh Tuyên Quang - Tuyển sinh 2026</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm font-semibold border-l-4 border-red-600 shadow-sm text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tên đăng nhập</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-red-700 focus:bg-white focus:shadow-[0_0_0_4px_rgba(220,38,38,0.1)] outline-none transition-all text-slate-800 font-bold"
                placeholder="Nhập tên đăng nhập..."
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mật khẩu</label>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="password" required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-red-700 focus:bg-white focus:shadow-[0_0_0_4px_rgba(220,38,38,0.1)] outline-none transition-all text-slate-800 font-bold tracking-widest"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-4 text-red-900 bg-gradient-to-r from-yellow-400 to-yellow-500 font-black tracking-widest rounded-xl flex items-center justify-center gap-3 hover:from-yellow-300 hover:to-yellow-400 transition-all shadow-lg shadow-yellow-500/30 active:scale-95 border border-yellow-200 disabled:opacity-50"
          >
            {loading ? (
              <><Loader2 className="w-6 h-6 animate-spin" /> ĐANG XÁC THỰC...</>
            ) : (
              <><KeyRound className="w-6 h-6" /> ĐĂNG NHẬP</>
            )}
          </button>
          
          <div className="text-center pt-4">
            <Link href="/" className="text-sm font-semibold text-slate-400 hover:text-red-700 transition-colors">
              &larr; Quay về trang nhập liệu
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
