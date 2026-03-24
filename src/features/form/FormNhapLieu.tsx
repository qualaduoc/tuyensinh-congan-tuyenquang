"use client";

import React, { useState } from 'react';
import { 
  PlusCircle, 
  AlertCircle,
  CheckCircle2,
  Info,
  Phone,
  ShieldCheck,
  Send,
  ShieldAlert
} from 'lucide-react';
import { UNITS, FITNESS_FIELDS } from '@/constants';
import { supabase } from '@/utils/supabaseClient';
import UnitSearchSelect from '@/components/ui/UnitSearchSelect';

export default function FormNhapLieu() {
  const [formData, setFormData] = useState({
    unit: '',
    regDate: new Date().toISOString().split('T')[0],
    vb2: 0,
    dai_hoc: 0,
    trung_cap: 0,
    lookupSent: 0,
    run100: 0,
    run1500: 0,
    pullUp: 0,
    longJump: 0,
    officerPhone: ''
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    const numValue = value === '' ? 0 : parseInt(value, 10);
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.unit) {
      setMessage({ type: 'error', text: 'Thiếu thông tin Đơn vị báo cáo.' });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('daily_reports')
        .upsert({
          unit_name: formData.unit,
          report_date: formData.regDate,
          vb2: formData.vb2,
          dai_hoc: formData.dai_hoc,
          trung_cap: formData.trung_cap,
          lookup_sent: formData.lookupSent,
          run100: formData.run100,
          run1500: formData.run1500,
          pull_up: formData.pullUp,
          long_jump: formData.longJump,
          officer_phone: formData.officerPhone,
          updated_at: new Date()
        }, {
           onConflict: 'unit_name, report_date'
        });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Đã gửi báo cáo thành công!' });
      
      setFormData({
        ...formData,
        vb2: 0, dai_hoc: 0, trung_cap: 0, lookupSent: 0,
        run100: 0, run1500: 0, pullUp: 0, longJump: 0,
      });

      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      console.error(err);
      setMessage({ type: 'error', text: 'Có lỗi xảy ra: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
      {/* Form Side - Giao diện thẻ cứng */}
      <section className="lg:col-span-2 bg-white rounded-3xl shadow-lg border-2 border-slate-300 overflow-hidden relative">
        <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600"></div>
        
        <div className="bg-[#FAF8F5] px-6 py-5 border-b-2 border-slate-300 flex items-center justify-between">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A30000] to-red-700 flex items-center gap-2 tracking-tight">
            <ShieldCheck className="w-6 h-6 text-yellow-500 drop-shadow-sm" />
            PHIẾU CÁN BỘ NHẬP LIỆU
          </h2>
        </div>

        {message && (
          <div className={`mx-6 mt-6 p-4 rounded-xl flex items-center gap-3 shadow-md animate-bounce-short border-2 font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-500' : 'bg-red-50 text-red-700 border-red-500'}`}>
            {message.type === 'success' ? <CheckCircle2 className="w-6 h-6 shrink-0" /> : <AlertCircle className="w-6 h-6 shrink-0" />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border-2 border-slate-300">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Chọn đơn vị</label>
              <UnitSearchSelect
                units={UNITS}
                value={formData.unit}
                onChange={(val) => setFormData({...formData, unit: val})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Ngày báo cáo</label>
              <input 
                type="date" required
                value={formData.regDate}
                onChange={(e) => setFormData({...formData, regDate: e.target.value})}
                className="w-full p-4 bg-white border-2 border-slate-300 rounded-xl focus:border-red-600 focus:shadow-[0_0_0_4px_rgba(220,38,38,0.1)] outline-none transition-all text-slate-900 font-bold"
              />
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-xs font-black text-[#A30000] uppercase tracking-widest flex items-center gap-4">
              <div className="h-[2px] w-6 bg-red-600/30"></div>
              Số lượng thí sinh đăng ký
              <div className="h-[2px] flex-1 bg-red-600/10"></div>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-300 relative overflow-hidden group hover:border-blue-500 transition-colors">
                <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                <label className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-wider pl-4">Văn Bằng 2</label>
                <input 
                  type="number" min="0" required
                  value={formData.vb2 === 0 ? '' : formData.vb2}
                  onChange={(e) => handleInputChange('vb2', e.target.value)}
                  className="w-full pl-4 p-3 text-2xl font-black text-slate-800 bg-white rounded-xl border-2 border-slate-300 focus:border-blue-500 outline-none shadow-sm"
                  placeholder="0"
                />
              </div>

              <div className="bg-red-50 p-5 rounded-2xl border-2 border-red-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
                <label className="block text-xs font-black text-red-800 mb-3 uppercase tracking-wider pl-4">Đại Học Mới</label>
                <input 
                  type="number" min="0" required
                  value={formData.dai_hoc === 0 ? '' : formData.dai_hoc}
                  onChange={(e) => handleInputChange('dai_hoc', e.target.value)}
                  className="w-full pl-4 p-3 text-2xl font-black text-red-700 bg-white rounded-xl border-2 border-red-300 focus:border-red-500 outline-none shadow-sm"
                  placeholder="0"
                />
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-300 relative overflow-hidden group hover:border-amber-500 transition-colors">
                <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
                <label className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-wider pl-4">Trung Cấp Mới</label>
                <input 
                  type="number" min="0" required
                  value={formData.trung_cap === 0 ? '' : formData.trung_cap}
                  onChange={(e) => handleInputChange('trung_cap', e.target.value)}
                  className="w-full pl-4 p-3 text-2xl font-black text-slate-800 bg-white rounded-xl border-2 border-slate-300 focus:border-amber-500 outline-none shadow-sm"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-xs font-black text-[#A30000] uppercase tracking-widest flex items-center gap-4">
              <div className="h-[2px] w-6 bg-red-600/30"></div>
              Kiểm tra vận động (Chỉ cho Đại học)
              <div className="h-[2px] flex-1 bg-red-600/10"></div>
            </h3>
            
            {formData.dai_hoc === 0 && (
              <div className="flex items-center gap-3 p-4 bg-orange-50 text-orange-800 rounded-xl text-sm font-semibold border-2 border-orange-300">
                <Info className="w-5 h-5 shrink-0 text-orange-500" />
                Nhập số lượng thí sinh Đại học trước để mở phần kiểm tra vận động.
              </div>
            )}

            <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-300 ${formData.dai_hoc === 0 ? 'opacity-30 pointer-events-none grayscale' : ''}`}>
              {FITNESS_FIELDS.map(field => (
                <div key={field.id} className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-300 shadow-sm relative">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">{field.label}</label>
                  <input 
                    type="number" min="0" max={formData.dai_hoc}
                    value={(formData as any)[field.id] === 0 ? '' : (formData as any)[field.id]}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className={`w-full p-2.5 text-xl font-bold text-center rounded-xl border-2 outline-none focus:shadow-[0_0_0_3px_rgba(250,204,21,0.3)] transition-all ${((formData as any)[field.id] || 0) > formData.dai_hoc ? 'border-red-600 bg-red-100 text-red-900' : 'border-slate-300 focus:border-yellow-500 bg-white text-slate-800'}`}
                    placeholder="0"
                  />
                  {((formData as any)[field.id] || 0) > formData.dai_hoc && (
                    <div className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shadow-sm animate-pulse">!</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-red-50 p-6 rounded-2xl border-2 border-red-300">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-red-900 uppercase tracking-widest">Đã Gửi Tra Cứu</label>
              <input 
                type="number" min="0" required
                value={formData.lookupSent === 0 ? '' : formData.lookupSent}
                onChange={(e) => handleInputChange('lookupSent', e.target.value)}
                className="w-full p-3.5 text-lg font-bold border-2 border-red-300 rounded-xl focus:border-red-600 outline-none bg-white text-red-900"
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-red-900 uppercase tracking-widest">SĐT Cán bộ phụ trách</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
                <input 
                  type="tel" required
                  value={formData.officerPhone}
                  onChange={(e) => setFormData({...formData, officerPhone: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 text-lg font-bold border-2 border-red-300 rounded-xl focus:border-red-600 outline-none bg-white text-red-900 placeholder:text-red-300/50"
                  placeholder="09xx.xxx.xxx"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-gradient-to-r from-yellow-500 to-yellow-400 disabled:opacity-50 text-red-900 font-black tracking-widest rounded-2xl hover:brightness-110 shadow-[0_15px_30px_rgba(250,204,21,0.4)] transition-all active:scale-95 flex items-center justify-center gap-3 border-2 border-yellow-200 text-lg uppercase"
          >
            <Send className={`w-6 h-6 ${loading ? 'animate-bounce' : ''}`} /> 
            {loading ? 'ĐANG GỬI...' : 'GỬI BÁO CÁO'}
          </button>
        </form>
      </section>

      {/* Sidebar - Hướng dẫn sử dụng */}
      <aside className="space-y-6 hidden lg:block">
        <div className="bg-gradient-to-b from-[#A30000] to-[rgb(117,0,0)] p-8 rounded-3xl shadow-xl border-2 border-red-800 text-white relative overflow-hidden">
          <ShieldAlert className="absolute -bottom-8 -right-8 w-48 h-48 text-yellow-500 opacity-10" />
          
          <h3 className="font-black text-yellow-400 mb-6 uppercase tracking-widest text-lg drop-shadow-md border-b-2 border-white/30 pb-4">
            Hướng Dẫn Sử Dụng
          </h3>
          <ul className="text-sm font-medium space-y-5 relative z-10 text-red-100">
            <li className="flex gap-4 items-start">
              <span className="bg-yellow-400 text-red-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-md">1</span>
              <div>Chọn đúng <strong>Đơn vị</strong> (Xã/Phường) và <strong>Ngày báo cáo</strong> trước khi nhập số liệu.</div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="bg-yellow-400 text-red-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-md">2</span>
              <div>Nếu gửi nhầm số liệu, có thể <strong>gửi lại</strong> trong cùng ngày để ghi đè dữ liệu cũ.</div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="bg-yellow-400 text-red-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-md">3</span>
              <div>Chỉ thí sinh <strong>Đại học</strong> mới cần nhập phần kiểm tra vận động.</div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
