"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { UNITS } from '@/constants';
import { Calendar, Download, Trash2, Printer } from 'lucide-react';
import { supabase } from '@/utils/supabaseClient';
import * as XLSX from 'xlsx';

export default function BangThongKe() {
  const [entries, setEntries] = useState<any[]>([]);
  const [filterType, setFilterType] = useState<'day' | 'week' | 'month'>('day');
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  // Load Data
  useEffect(() => {
    fetchData();
  }, [filterType, filterDate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let query = supabase.from('daily_reports').select('*');

      const dateObj = new Date(filterDate);
      
      if (filterType === 'day') {
        query = query.eq('report_date', filterDate);
      } else if (filterType === 'month') {
        const startOfMonth = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1).toISOString().split('T')[0];
        const endOfMonth = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).toISOString().split('T')[0];
        query = query.gte('report_date', startOfMonth).lte('report_date', endOfMonth);
      } else if (filterType === 'week') {
        const day = dateObj.getDay() || 7;  
        const startOfWeek = new Date(dateObj);
        startOfWeek.setDate(startOfWeek.getDate() - day + 1);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);

        query = query
          .gte('report_date', startOfWeek.toISOString().split('T')[0])
          .lte('report_date', endOfWeek.toISOString().split('T')[0]);
      }

      const { data, error } = await query;
      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const summaryData = useMemo(() => {
    return UNITS.map(unit => {
      const unitEntries = entries.filter(e => e.unit_name === unit);
      return {
        unit,
        vb2: unitEntries.reduce((sum, e) => sum + (e.vb2 || 0), 0),
        dai_hoc: unitEntries.reduce((sum, e) => sum + (e.dai_hoc || 0), 0),
        trung_cap: unitEntries.reduce((sum, e) => sum + (e.trung_cap || 0), 0),
        lookupSent: unitEntries.reduce((sum, e) => sum + (e.lookup_sent || 0), 0),
        run100: unitEntries.reduce((sum, e) => sum + (e.run100 || 0), 0),
        run800: unitEntries.reduce((sum, e) => sum + (e.run800 || 0), 0),
        run1500: unitEntries.reduce((sum, e) => sum + (e.run1500 || 0), 0),
        pullUp: unitEntries.reduce((sum, e) => sum + (e.pull_up || 0), 0),
        longJump: unitEntries.reduce((sum, e) => sum + (e.long_jump || 0), 0),
        phones: [...new Set(unitEntries.map(e => e.officer_phone).filter(p => p))]
      };
    });
  }, [entries]);

  const totalAll = useMemo(() => {
    return summaryData.reduce((acc, row) => ({
      vb2: acc.vb2 + row.vb2,
      dai_hoc: acc.dai_hoc + row.dai_hoc,
      trung_cap: acc.trung_cap + row.trung_cap,
      lookupSent: acc.lookupSent + row.lookupSent,
      run100: acc.run100 + row.run100,
      run800: acc.run800 + row.run800,
      run1500: acc.run1500 + row.run1500,
      pullUp: acc.pullUp + row.pullUp,
      longJump: acc.longJump + row.longJump,
    }), { vb2: 0, dai_hoc: 0, trung_cap: 0, lookupSent: 0, run100: 0, run800: 0, run1500: 0, pullUp: 0, longJump: 0 });
  }, [summaryData]);

  const handleExportExcel = () => {
    const wsData = [
      ["BÁO CÁO TUYỂN SINH CÔNG AN TỈNH TUYÊN QUANG"],
      [`Bộ lọc: ${filterType === 'day' ? 'Ngày' : filterType === 'week' ? 'Tuần' : 'Tháng'} - Thời điểm: ${filterDate}`],
      [],
      ["Đơn vị", "Văn Bằng 2", "Đại Học", "Trung Cấp", "Đã gửi tra cứu", "Chạy 100m", "Chạy 800m", "Chạy 1.500m", "Co tay xà đơn", "Bật xa", "SĐT CÁN BỘ"],
      ...summaryData.map(row => [
        row.unit, row.vb2, row.dai_hoc, row.trung_cap, row.lookupSent, row.run100, row.run800, row.run1500, row.pullUp, row.longJump, row.phones.join(', ')
      ]),
      ["TỔNG CỘNG TOÀN TỈNH", totalAll.vb2, totalAll.dai_hoc, totalAll.trung_cap, totalAll.lookupSent, totalAll.run100, totalAll.run800, totalAll.run1500, totalAll.pullUp, totalAll.longJump, ""]
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "BaoCao");
    XLSX.writeFile(wb, `BaoCao_TuyenSinh_${filterDate}.xlsx`);
  };

  return (
    <section className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Filters - Đổi style cho VNeID layout */}
      <div className="bg-white p-5 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-2 border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-5 no-print relative overflow-hidden">
        <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 left-0"></div>
        
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="p-3 bg-red-50 text-red-900 border-2 border-red-200 rounded-xl text-sm font-black tracking-widest outline-none focus:border-red-600 transition-all cursor-pointer shadow-sm w-full md:w-auto"
          >
            <option value="day">XEM MỘT NGÀY</option>
            <option value="week">XEM MỘT TUẦN</option>
            <option value="month">XEM CẢ THÁNG</option>
          </select>

          <div className="relative w-full md:w-auto">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-700" />
            <input 
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="pl-12 pr-4 py-3 bg-white text-slate-800 border-2 border-slate-200 rounded-xl text-sm font-black outline-none focus:border-red-600 transition-all cursor-pointer shadow-sm w-full md:w-auto tracking-widest"
            />
          </div>
          
          {loading && <span className="text-yellow-600 font-bold text-sm animate-pulse bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-200 uppercase tracking-widest hidden md:block">Đang nạp dữ liệu...</span>}
        </div>
        
        <div className="flex flex-wrap md:flex-nowrap gap-3 w-full lg:w-auto mt-2 lg:mt-0">
          <button 
            onClick={handleExportExcel}
            className="w-full md:w-auto px-5 py-3 text-sm font-black text-green-800 bg-gradient-to-r from-green-300 to-green-400 hover:brightness-110 rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wide shadow-md border border-green-500"
          >
            <Download className="w-5 h-5" /> Tải báo cáo (.XLSX)
          </button>
          
          <button 
            onClick={() => window.print()}
            className="w-full md:w-auto px-5 py-3 text-sm font-black text-slate-700 bg-white hover:bg-slate-100 border-2 border-slate-300 rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wide shadow-sm"
          >
            <Printer className="w-5 h-5" /> In Tổng Hợp
          </button>
        </div>
      </div>

      {/* Main Report Table */}
      <div className="print-area bg-white rounded-none lg:rounded-2xl shadow-xl border-2 border-slate-300 overflow-hidden overflow-x-auto">
        {/* Tiêu đề chỉ hiện khi in */}
        <div className="hidden print:block text-center pt-6 pb-3 px-4">
          <p className="text-[10pt] font-bold uppercase">CÔNG AN TỈNH TUYÊN QUANG</p>
          <p className="text-[9pt] font-bold">PHÒNG TỔ CHỨC CÁN BỘ</p>
          <h1 className="text-[14pt] font-bold uppercase mt-3">BÁO CÁO SỐ LIỆU TUYỂN SINH CÔNG AN NĂM 2026</h1>
          <p className="text-[9pt] italic mt-1">
            {filterType === 'day' ? `Ngày ${filterDate}` : filterType === 'week' ? `Tuần chứa ngày ${filterDate}` : `Tháng ${new Date(filterDate).getMonth() + 1}/${new Date(filterDate).getFullYear()}`}
          </p>
        </div>

        <table className="print-table w-full border-collapse text-xs">
          <thead>
            <tr className="bg-gradient-to-t from-[#8B0000] to-[#A30000] text-yellow-300 uppercase tracking-widest font-black text-[11px]">
              <th rowSpan={3} className="border border-red-900/50 p-3 text-left">STT</th>
              <th rowSpan={3} className="border border-red-900/50 p-3 text-left">Đơn vị</th>
              <th colSpan={3} className="border border-red-900/50 p-2 text-center">Số lượng đăng ký</th>
              <th rowSpan={3} className="border border-red-900/50 p-2 text-center bg-[#5B0000] !text-white">Tra cứu</th>
              <th colSpan={5} className="border border-red-900/50 p-2 text-center">Kiểm tra vận động</th>
              <th rowSpan={3} className="border border-red-900/50 p-2 text-center">SĐT</th>
            </tr>
            <tr className="bg-[#A30000] text-white font-black text-[10px] tracking-widest">
              <th rowSpan={2} className="border border-red-900/50 p-2 text-center text-blue-200">VB2</th>
              <th colSpan={2} className="border border-red-900/50 p-2 text-center bg-[#8B0000]">Tuyển mới</th>
              <th rowSpan={2} className="border border-red-900/50 p-2 text-center">100m</th>
              <th rowSpan={2} className="border border-red-900/50 p-2 text-center">800m</th>
              <th rowSpan={2} className="border border-red-900/50 p-2 text-center">1500m</th>
              <th rowSpan={2} className="border border-red-900/50 p-2 text-center">Xà đơn</th>
              <th rowSpan={2} className="border border-red-900/50 p-2 text-center">Bật xa</th>
            </tr>
            <tr className="bg-[#8B0000] text-white font-black text-[10px] tracking-widest">
              <th className="border border-red-900/50 p-2 text-center text-yellow-300">ĐH</th>
              <th className="border border-red-900/50 p-2 text-center text-orange-300">TC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-red-900/5">
            {summaryData.map((row, idx) => (
              <tr key={idx} className={`hover:bg-red-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                <td className="border px-2 py-2.5 text-center text-slate-400 font-medium">{idx + 1}</td>
                <td className="border px-3 py-2.5 font-bold text-slate-800 whitespace-nowrap">{row.unit}</td>
                <td className="border px-2 py-2.5 text-center font-black text-blue-700">{row.vb2 || ''}</td>
                <td className="border px-2 py-2.5 text-center font-black text-[#A30000]">{row.dai_hoc || ''}</td>
                <td className="border px-2 py-2.5 text-center font-black text-amber-600">{row.trung_cap || ''}</td>
                <td className="border px-2 py-2.5 text-center text-slate-500 font-semibold bg-[#FAFAFA]">{row.lookupSent || ''}</td>
                <td className="border px-2 py-2.5 text-center text-slate-600">{row.run100 || ''}</td>
                <td className="border px-2 py-2.5 text-center text-slate-600">{row.run800 || ''}</td>
                <td className="border px-2 py-2.5 text-center text-slate-600">{row.run1500 || ''}</td>
                <td className="border px-2 py-2.5 text-center text-slate-600">{row.pullUp || ''}</td>
                <td className="border px-2 py-2.5 text-center text-slate-600">{row.longJump || ''}</td>
                <td className="border px-2 py-2.5 text-center text-[10px] text-slate-500 font-bold">
                  {row.phones.join(', ')}
                </td>
              </tr>
            ))}
            {/* Totals Row */}
            <tr className="bg-gradient-to-r from-yellow-300 to-yellow-500 font-black text-red-900 border-t-4 border-[#A30000]">
              <td className="border px-2 py-4" colSpan={2}>
                <span className="uppercase text-sm tracking-widest">Tổng cộng toàn tỉnh</span>
              </td>
              <td className="border px-2 py-4 text-center text-lg text-blue-900">{totalAll.vb2}</td>
              <td className="border px-2 py-4 text-center text-lg text-[#8B0000]">{totalAll.dai_hoc}</td>
              <td className="border px-2 py-4 text-center text-lg text-orange-900">{totalAll.trung_cap}</td>
              <td className="border px-2 py-4 text-center text-lg">{totalAll.lookupSent}</td>
              <td className="border px-2 py-4 text-center">{totalAll.run100}</td>
              <td className="border px-2 py-4 text-center">{totalAll.run800}</td>
              <td className="border px-2 py-4 text-center">{totalAll.run1500}</td>
              <td className="border px-2 py-4 text-center">{totalAll.pullUp}</td>
              <td className="border px-2 py-4 text-center">{totalAll.longJump}</td>
              <td className="border px-2 py-4 text-center text-red-900/30">---</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Print Styles - Tối ưu cho cả khổ dọc và ngang */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          /* Ẩn tất cả UI không cần khi in */
          .no-print, header, footer, nav { display: none !important; }
          
          /* Reset toàn bộ trang */
          html, body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Khổ giấy A4 - margin nhỏ nhất */
          @page {
            size: A4 landscape;
            margin: 8mm;
          }
          
          /* Bảng phải chiếm 100% và góc vuông */
          .print-area {
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            overflow: visible !important;
            width: 100% !important;
          }

          /* Table co giãn vừa khổ giấy */
          .print-table {
            width: 100% !important;
            table-layout: fixed !important;
            border-collapse: collapse !important;
            font-size: 7pt !important;
            border: 2px solid black !important;
          }

          /* Định cỡ cột cho vừa vặn */
          .print-table th:first-child { width: 4% !important; }   /* STT */
          .print-table th:nth-child(2) { width: 22% !important; } /* Đơn vị */
          .print-table th:nth-child(3),
          .print-table th:nth-child(4),
          .print-table th:nth-child(5),
          .print-table th:nth-child(6),
          .print-table th:nth-child(7),
          .print-table th:nth-child(8),
          .print-table th:nth-child(9),
          .print-table th:nth-child(10),
          .print-table th:nth-child(11) { width: 5.5% !important; } /* Số liệu */
          .print-table th:last-child { width: 11% !important; }    /* SĐT */

          /* Ô bảng: viền đen rõ, padding nhỏ gọn */
          .print-table th,
          .print-table td {
            border: 1px solid black !important;
            padding: 3px 4px !important;
            font-size: 7pt !important;
            color: black !important;
            background: white !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            white-space: normal !important;
          }

          /* Header bảng: nền xám nhạt cho dễ đọc khi in trắng đen */
          .print-table thead th {
            background: #e5e5e5 !important;
            color: black !important;
            font-weight: bold !important;
            text-transform: uppercase !important;
            font-size: 6.5pt !important;
            text-align: center !important;
          }

          /* Dòng tổng cộng */
          .print-table tbody tr:last-child td {
            background: #f5f5f5 !important;
            font-weight: bold !important;
            font-size: 8pt !important;
            border-top: 2px solid black !important;
          }

          /* Dòng xen kẽ giữ nguyên trắng khi in */
          .print-table tbody tr { background: white !important; }

          /* Không cắt dòng giữa chừng */
          thead { display: table-header-group !important; }
          tr { page-break-inside: avoid !important; }

          /* Tiêu đề in */
          .print-area h1 { font-size: 14pt !important; margin-bottom: 2px !important; }
          .print-area p { font-size: 9pt !important; }

          /* Bo góc = 0 toàn bộ */
          * { border-radius: 0 !important; }
        }
      `}} />
    </section>
  );
}
