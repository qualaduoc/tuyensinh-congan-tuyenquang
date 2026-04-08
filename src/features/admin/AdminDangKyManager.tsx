"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { 
  List, 
  BarChart3, 
  Printer, 
  Search, 
  Trash2, 
  Save, 
  FileText,
  ChevronLeft
} from 'lucide-react';
import { UNITS } from '@/constants';
import UnitSearchSelect from '@/components/ui/UnitSearchSelect';

const AdminDangKyManager = () => {
  const [view, setView] = useState('dashboard'); // dashboard, form, report, print
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [selectedReg, setSelectedReg] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Constants
  const DANH_SACH_PHUONG_THUC = [
    "Phương thức 1 (Tuyển thẳng)",
    "Phương thức 2 (Chứng chỉ NNQT + BCA)",
    "Phương thức 3 (Thi THPT + BCA)",
    "Phương thức 2 và Phương thức 3"
  ];

  const DANH_SACH_DAI_HOC = [
    "Không đăng ký",
    "Học viện An ninh nhân dân (T01) - ANH",
    "Học viện Cảnh sát nhân dân (T02) - CSH",
    "Học viện Chính trị CAND (T03) - HCA",
    "Trường ĐH An ninh nhân dân (T04) - ANS",
    "Trường ĐH Cảnh sát nhân dân (T05) - CSS",
    "Trường ĐH Phòng cháy chữa cháy (T06) - PCH",
    "Học viện Kỹ thuật và Công nghệ an ninh (T07) - KTH",
    "Học viện Quốc tế (B06) - AIS"
  ];

  const DANH_SACH_TRUNG_CAP = [
    "Không đăng ký",
    "Trường CĐ An ninh nhân dân I (T08) - ANN",
    "Trường CĐ Cảnh sát nhân dân I (T09) - CS1",
    "Trường CĐ Cảnh sát nhân dân II (T10) - CS2"
  ];

  const DANH_SACH_TO_HOP = [
    { id: "A00", label: "A00 - Toán, Vật lí, Hóa học", subjects: ["Toán", "Vật lí", "Hóa học"] },
    { id: "A01", label: "A01 - Toán, Vật lí, Ngôn ngữ Anh", subjects: ["Toán", "Vật lí", "Ngôn ngữ Anh"] },
    { id: "B00", label: "B00 - Toán, Hóa học, Sinh học", subjects: ["Toán", "Hóa học", "Sinh học"] },
    { id: "B08", label: "B08 - Toán, Sinh học, Ngôn ngữ Anh", subjects: ["Toán", "Sinh học", "Ngôn ngữ Anh"] },
    { id: "C00", label: "C00 - Ngữ văn, Lịch sử, Địa lí", subjects: ["Ngữ văn", "Lịch sử", "Địa lí"] },
    { id: "C03", label: "C03 - Toán, Ngữ văn, Lịch sử", subjects: ["Toán", "Ngữ văn", "Lịch sử"] },
    { id: "D01", label: "D01 - Toán, Ngữ văn, Ngôn ngữ Anh", subjects: ["Toán", "Ngữ văn", "Ngôn ngữ Anh"] },
    { id: "D04", label: "D04 - Toán, Ngữ Văn, Ngôn ngữ Trung Quốc", subjects: ["Toán", "Ngữ Văn", "Ngôn ngữ Trung Quốc"] },
    { id: "D07", label: "D07 - Toán, Hóa học, Ngôn ngữ Anh", subjects: ["Toán", "Hóa học", "Ngôn ngữ Anh"] },
    { id: "D09", label: "D09 - Toán, Lịch sử, Ngôn ngữ Anh", subjects: ["Toán", "Lịch sử", "Ngôn ngữ Anh"] },
    { id: "D10", label: "D10 - Toán, Địa lí, Ngôn ngữ Anh", subjects: ["Toán", "Địa lí", "Ngôn ngữ Anh"] },
    { id: "X26", label: "X26 - Toán, Ngôn ngữ Anh, Tin học", subjects: ["Toán", "Ngôn ngữ Anh", "Tin học"] },
    { id: "X27", label: "X27 - Toán, Ngôn ngữ Anh, Công nghệ công nghiệp", subjects: ["Toán", "Ngôn ngữ Anh", "Công nghệ công nghiệp"] },
    { id: "X28", label: "X28 - Toán, Ngôn ngữ Anh, Công nghệ nông nghiệp", subjects: ["Toán", "Ngôn ngữ Anh", "Công nghệ nông nghiệp"] },
    { id: "X02", label: "X02 - Toán, Ngữ văn, Tin học", subjects: ["Toán", "Ngữ văn", "Tin học"] },
    { id: "X03", label: "X03 - Toán, Ngữ văn, Công nghệ công nghiệp", subjects: ["Toán", "Ngữ văn", "Công nghệ công nghiệp"] },
    { id: "X04", label: "X04 - Toán, Ngữ văn, Công nghệ nông nghiệp", subjects: ["Toán", "Ngữ văn", "Công nghệ nông nghiệp"] },
  ];

  const DANH_SACH_BAI_BCA = [
    "Không đăng ký",
    "CA1 (Vật lí)",
    "CA2 (Hóa học)",
    "CA3 (Sinh học)",
    "CA4 (Địa lí)"
  ];

  const DANH_SACH_DAN_TOC = [
    "Kinh", "Tày", "Thái", "Mường", "Khmer", "Hoa", "Nùng", "H'Mông", "Dao", "Gia Rai", 
    "Ê Đê", "Ba Na", "Sán Chay", "Chăm", "Cơ Ho", "Xơ Đăng", "Sán Dìu", "Hrê", "Ra Glai", 
    "Mnông", "Thổ", "Xtiêng", "Khơ Mú", "Bru - Vân Kiều", "Giáy", "Cơ Tu", "Giẻ - Triêng", 
    "Ta Ôi", "Mạ", "Co", "Chơ Ro", "Hà Nhì", "Xinh Mun", "Chu Ru", "Lào", "Kháng", "La Chí", 
    "Phù Lá", "La Hủ", "La Ha", "Pà Thẻn", "Lự", "Ngái", "Chứt", "Lô Lô", "Mảng", "Cơ Lao", 
    "Bố Y", "Cống", "Si La", "Pu Péo", "Rơ Măm", "Brâu", "Ơ Đu"
  ];

  const [formData, setFormData] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(true);

  const fetchRegistrations = async () => {
    setIsLoading(true);
    try {
      const { getOnlineRegistrations } = await import('./actions');
      const response = await getOnlineRegistrations();
      if (response && response.success) {
        setRegistrations(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [view]); // reload on view change to catch new submits

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { updateOnlineRegistration } = await import('./actions');
      const response = await updateOnlineRegistration(formData.id, formData);
      if (response && response.success) {
        alert('Cập nhật thành công!');
        setView('dashboard');
        setFormData(null);
        await fetchRegistrations();
      } else {
        alert(response?.error || 'Có lỗi xảy ra!');
      }
    } catch (err) {
      alert('Lỗi kết nối máy chủ!');
    }
  };

  const deleteReg = async (id: string | number) => {
    if (confirm('Khầy Admin có chắc muốn xóa bản ghi này khỏi hệ thống?')) {
      try {
        const { deleteOnlineRegistration } = await import('./actions');
        const response = await deleteOnlineRegistration(id.toString());
        if (response && response.success) {
          await fetchRegistrations();
        } else {
          alert(response?.error || 'Không thể xóa bản ghi!');
        }
      } catch (err) {
        alert('Lỗi kết nối máy chủ!');
      }
    }
  };

  const handlePrint = (reg: any) => {
    setSelectedReg(reg);
    setView('print');
    setTimeout(() => window.print(), 500);
  };

  const filteredData = useMemo(() => {
    return registrations.filter(r => {
      const SearchLower = searchTerm.toLowerCase();
      const matchesSearch = r.fullName.toLowerCase().includes(SearchLower) 
        || r.cccd.includes(searchTerm)
        || (r.combinations && r.combinations.toLowerCase().includes(SearchLower))
        || (r.unit && r.unit.toLowerCase().includes(SearchLower))
        || (r.bcaExam && r.bcaExam.toLowerCase().includes(SearchLower))
        || (r.method && r.method.toLowerCase().includes(SearchLower))
        || (r.candidateType && r.candidateType.toLowerCase().includes(SearchLower))
        || (r.uniChoice && r.uniChoice.toLowerCase().includes(SearchLower))
        || (r.collegeChoice && r.collegeChoice.toLowerCase().includes(SearchLower))
        || (r.academic?.l12?.academic && r.academic.l12.academic.toLowerCase().includes(SearchLower))
        || (r.academic?.l12?.conduct && r.academic.l12.conduct.toLowerCase().includes(SearchLower));
      return matchesSearch;
    });
  }, [registrations, searchTerm]);

  const stats = useMemo(() => {
    const totals = {
      total: registrations.length,
      male: registrations.filter(r => r.gender === 'Nam').length,
      female: registrations.filter(r => r.gender === 'Nữ').length,
      byCombination: {} as Record<string, number>,
      byBcaExam: {} as Record<string, number>,
      byUnit: {} as Record<string, number>,
      byMethod: {} as Record<string, number>,
      byCandidateType: {} as Record<string, number>,
      byUniChoice: {} as Record<string, number>,
      byCollegeChoice: {} as Record<string, number>,
      byAcademic: {} as Record<string, number>,
      byConduct: {} as Record<string, number>
    };

    registrations.forEach(r => {
      totals.byCandidateType[r.candidateType || 'Chưa rõ'] = (totals.byCandidateType[r.candidateType || 'Chưa rõ'] || 0) + 1;
      
      const mainCombo = r.combinations ? r.combinations.split(' - ')[0] : 'Chưa chọn';
      totals.byCombination[mainCombo] = (totals.byCombination[mainCombo] || 0) + 1;
      
      const unitKey = r.unit || 'Chưa chọn';
      totals.byUnit[unitKey] = (totals.byUnit[unitKey] || 0) + 1;
      
      const bcaKey = r.bcaExam || 'Không ĐK';
      totals.byBcaExam[bcaKey] = (totals.byBcaExam[bcaKey] || 0) + 1;
      
      const methodKey = r.method || 'Chưa chọn';
      totals.byMethod[methodKey] = (totals.byMethod[methodKey] || 0) + 1;
      
      const uniKey = r.uniChoice || 'Không ĐK';
      totals.byUniChoice[uniKey] = (totals.byUniChoice[uniKey] || 0) + 1;
      
      const colKey = r.collegeChoice || 'Không ĐK';
      totals.byCollegeChoice[colKey] = (totals.byCollegeChoice[colKey] || 0) + 1;
      
      const acadKey = r.academic?.l12?.academic || 'Chưa rõ';
      totals.byAcademic[acadKey] = (totals.byAcademic[acadKey] || 0) + 1;
      
      const condKey = r.academic?.l12?.conduct || 'Chưa rõ';
      totals.byConduct[condKey] = (totals.byConduct[condKey] || 0) + 1;
    });

    return totals;
  }, [registrations]);

  // Handle dynamic subjects based on combination
  const [subjects, setSubjects] = useState({m1: 'Môn 1', m2: 'Môn 2', m3: 'Môn 3'});
  useEffect(() => {
    if(!formData) return;
    const combo = formData.combinations || '';
    const match = DANH_SACH_TO_HOP.find(t => t.label === combo || t.id === combo || combo.startsWith(t.id));
    if (match) {
      setSubjects({m1: match.subjects[0], m2: match.subjects[1], m3: match.subjects[2]});
    } else {
      setSubjects({m1: 'Môn 1', m2: 'Môn 2', m3: 'Môn 3'}); 
    }
  }, [formData?.combinations]);

  return (
    <div className="bg-slate-50 text-slate-900 font-sans print:bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px]">
      {/* Navigation */}
      <nav className="bg-[#1e293b] text-white p-3 sm:p-4 shadow-md print:hidden w-full border-b border-slate-600">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-slate-700 p-1.5 sm:p-2 rounded-full border border-slate-500">
              <List size={20} className="sm:w-6 sm:h-6 text-yellow-400" />
            </div>
            <div>
              <h1 className="font-bold text-base sm:text-lg leading-tight uppercase">HỒ SƠ ĐĂNG KÝ ONLINE</h1>
              <p className="text-[10px] sm:text-xs text-slate-300">Quản lý, chỉnh sửa & thống kê</p>
            </div>
          </div>
          <div className="flex space-x-1 sm:space-x-2">
            <button 
              onClick={() => { setView('dashboard'); setSelectedReg(null); }}
              className={`p-2 sm:px-4 sm:py-2 rounded-lg flex items-center space-x-2 transition ${view === 'dashboard' ? 'bg-slate-700 text-yellow-400' : 'hover:bg-slate-700 text-slate-200'}`}
              title="Danh sách"
            >
              <List size={18} /> <span className="hidden md:inline">Danh sách hồ sơ</span>
            </button>
            <button 
              onClick={() => setView('report')}
              className={`p-2 sm:px-4 sm:py-2 rounded-lg flex items-center space-x-2 transition ${view === 'report' ? 'bg-slate-700 text-yellow-400' : 'hover:bg-slate-700 text-slate-200'}`}
              title="Thống kê"
            >
              <BarChart3 size={18} /> <span className="hidden md:inline">Thống kê đăng ký</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="p-4 sm:p-6 print:p-0">
        
        {/* Dashboard View */}
        {view === 'dashboard' && (
          <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Danh sách thí sinh đăng ký online</h2>
              <div className="relative group w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-700 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Tìm tên hoặc CCCD..." 
                  className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl w-full sm:w-80 focus:ring-2 focus:ring-slate-400 focus:outline-none shadow-sm transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left whitespace-nowrap">
                  <thead className="bg-[#f8fafc] border-b border-slate-200">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-slate-700 text-sm sm:text-base">Họ và tên</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-slate-700 text-sm sm:text-base">Ngày sinh</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-slate-700 text-sm sm:text-base">Giới tính</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-slate-700 text-sm sm:text-base hidden sm:table-cell">Khối ĐK</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-slate-700 text-sm sm:text-base hidden md:table-cell">Nơi ĐK</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-slate-700 text-right text-sm sm:text-base">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic">
                          Đang tải dữ liệu...
                        </td>
                      </tr>
                    ) : filteredData.length > 0 ? filteredData.map((reg) => (
                      <tr key={reg.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-slate-900 text-sm sm:text-base">{reg.fullName}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-600 text-sm sm:text-base">{reg.dob ? new Date(reg.dob).toLocaleDateString('vi-VN') : ''}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${reg.gender === 'Nam' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                            {reg.gender}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-600 truncate max-w-[150px] sm:max-w-[200px] hidden sm:table-cell">
                          {reg.combinations}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-600 truncate max-w-[150px] hidden md:table-cell font-medium text-xs">
                          {reg.unit || 'Chưa nhập'}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-right space-x-1 sm:space-x-2">
                          <button 
                            onClick={() => handlePrint(reg)}
                            className="p-1.5 sm:p-2 text-slate-400 hover:text-[#8B0000] hover:bg-red-100 rounded-lg transition-all"
                            title="In phiếu"
                          >
                            <Printer size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                          <button 
                            onClick={() => { setFormData(reg); setView('form'); }}
                            className="p-1.5 sm:p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-100 rounded-lg transition-all"
                            title="Sửa thông tin"
                          >
                            <FileText size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                          <button 
                            onClick={() => deleteReg(reg.id)}
                            className="p-1.5 sm:p-2 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all"
                            title="Xóa bản ghi"
                          >
                            <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic">
                          Hệ thống hiện chưa có hồ sơ đăng ký online nào.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Report View */}
        {view === 'report' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-slate-800">Thống kê hồ sơ đăng ký online</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-slate-700">
                <p className="text-sm font-bold text-slate-500 uppercase">Tổng hồ sơ Online</p>
                <p className="text-3xl font-black text-slate-900 mt-1">{stats.total}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-pink-500">
                <p className="text-sm font-bold text-slate-500 uppercase">Thí sinh Nữ</p>
                <p className="text-3xl font-black text-slate-900 mt-1">{stats.female}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-blue-600">
                <p className="text-sm font-bold text-slate-500 uppercase">Thí sinh Nam</p>
                <p className="text-3xl font-black text-slate-900 mt-1">{stats.male}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
                <p className="text-sm font-bold text-slate-500 uppercase">Học sinh PT</p>
                <p className="text-3xl font-black text-slate-900 mt-1">{stats.byCandidateType['Học sinh phổ thông'] || 0}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
              {/* Thống kê các hạng mục */}
              {[
                { title: 'Khối ĐK (Bài thi BCA)', data: stats.byBcaExam, theme: 'hover:border-indigo-500 hover:bg-indigo-50 group-hover:text-indigo-700', badge: 'group-hover:bg-indigo-600' },
                { title: 'Nơi ĐK', data: stats.byUnit, theme: 'hover:border-emerald-500 hover:bg-emerald-50 group-hover:text-emerald-800', badge: 'group-hover:bg-emerald-600' },
                { title: 'Phương thức dự tuyển', data: stats.byMethod, theme: 'hover:border-amber-500 hover:bg-amber-50 group-hover:text-amber-800', badge: 'group-hover:bg-amber-500' },
                { title: 'Đối tượng', data: stats.byCandidateType, theme: 'hover:border-orange-500 hover:bg-orange-50 group-hover:text-orange-800', badge: 'group-hover:bg-orange-500' },
                { title: 'Đăng ký xét tuyển Đại học', data: stats.byUniChoice, theme: 'hover:border-rose-500 hover:bg-rose-50 group-hover:text-rose-800', badge: 'group-hover:bg-rose-600' },
                { title: 'Đăng ký xét tuyển Trung cấp', data: stats.byCollegeChoice, theme: 'hover:border-cyan-500 hover:bg-cyan-50 group-hover:text-cyan-800', badge: 'group-hover:bg-cyan-600' },
                { title: 'Tổ hợp đăng ký xét tuyển', data: stats.byCombination, theme: 'hover:border-blue-500 hover:bg-blue-50 group-hover:text-blue-700', badge: 'group-hover:bg-blue-600' },
                { title: 'Xếp loại học lực', data: stats.byAcademic, theme: 'hover:border-violet-500 hover:bg-violet-50 group-hover:text-violet-800', badge: 'group-hover:bg-violet-600' },
                { title: 'Xếp loại hạnh kiểm', data: stats.byConduct, theme: 'hover:border-fuchsia-500 hover:bg-fuchsia-50 group-hover:text-fuchsia-800', badge: 'group-hover:bg-fuchsia-600' },
              ].map((section, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="bg-slate-50 border-b border-slate-200 p-4">
                    <h3 className="font-bold text-slate-800">{section.title}</h3>
                  </div>
                  <div className="p-4 flex-1 space-y-2 max-h-[300px] overflow-y-auto">
                    {Object.entries(section.data).sort((a,b) => b[1] - a[1]).map(([key, count]) => (
                      <button 
                        key={key}
                        onClick={() => { setSearchTerm(key.includes('Chưa') || key.includes('Không') ? '' : key); setView('dashboard'); }}
                        className={`w-full flex justify-between items-center p-3 rounded-xl border border-slate-200 transition-all text-left group ${section.theme}`}
                      >
                        <span className="font-medium text-slate-700 text-sm truncate pr-4 transition-colors">{key}</span>
                        <span className={`bg-slate-100 text-slate-800 font-black px-2 py-1 flex-shrink-0 rounded-lg text-sm transition-colors group-hover:text-white ${section.badge}`}>{count}</span>
                      </button>
                    ))}
                    {Object.keys(section.data).length === 0 && <p className="text-slate-500 text-sm text-center py-4">Chưa có dữ liệu</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Form View */}
        {view === 'form' && formData && (
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-in slide-in-from-bottom duration-500">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button type="button" onClick={() => setView('dashboard')} className="p-1.5 sm:p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-600">
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </button>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                Sửa hồ sơ: {formData.fullName}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 sm:p-8 space-y-6 sm:space-y-8">
              {/* Vùng sửa được copy từ Form gốc và điều chỉnh class */}
              {/* Box Chọn Đơn Vị */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-300">
                <label className="block text-sm font-bold text-slate-700 mb-3">Nơi đăng ký sơ tuyển (Công an Xã/Phường)</label>
                <div className="bg-white rounded-xl shadow-[0_0_0_2px_rgba(203,213,225,0.2)]">
                  <UnitSearchSelect
                    units={UNITS}
                  value={formData.unit || ''}
                  onChange={(val) => setFormData({...formData, unit: val})}
                />
                </div>
              </div>

               {/* Section 1: Basic Info */}
               <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 border-b pb-2 flex items-center gap-2">
                  <span className="bg-slate-100 text-slate-700 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full text-[10px] sm:text-xs">01</span>
                  Thông tin cá nhân
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">1. Họ và tên</label>
                    <input type="text" required className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value.toUpperCase()})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">2. Ngày sinh</label>
                    <input type="date" required className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">3. Số CCCD</label>
                    <input type="text" required maxLength={12} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none" value={formData.cccd} onChange={(e) => setFormData({...formData, cccd: e.target.value.replace(/[^0-9]/g, '')})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">4. Giới tính</label>
                    <select className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                      <option value="Nam">Nam</option><option value="Nữ">Nữ</option>
                    </select>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700">5. Nơi thường trú <span className="font-normal italic text-slate-500">(Địa chỉ theo CCCD)</span></label>
                    <input type="text" required className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none" value={formData.address || ''} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">6. Dân tộc</label>
                    <UnitSearchSelect
                      units={DANH_SACH_DAN_TOC}
                      value={formData.ethnicity || ''}
                      onChange={(val) => setFormData({...formData, ethnicity: val})}
                      placeholder="-- Chọn Dân tộc --"
                      searchPlaceholder="Gõ chữ cái đầu (VD: Ki...)"
                      emptyText="Không tìm thấy tên dân tộc"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Registration details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800 border-b pb-2 flex items-center gap-2">
                  <span className="bg-slate-100 text-slate-700 w-6 h-6 flex items-center justify-center rounded-full text-xs">02</span>
                  Nguyện vọng xét tuyển
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">7. Đối tượng</label>
                    <select className="w-full p-2 border border-slate-300 rounded-lg outline-none" value={formData.candidateType} onChange={(e) => setFormData({...formData, candidateType: e.target.value})}>
                      <option>Học sinh phổ thông</option><option>CSNV tại ngũ</option><option>CSNV xuất ngũ</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">6. Phương thức dự tuyển</label>
                    <select className="w-full p-2 border border-slate-300 rounded-lg outline-none" value={formData.method} onChange={(e) => setFormData({...formData, method: e.target.value})}>
                      {DANH_SACH_PHUONG_THUC.map(pt => <option key={pt} value={pt}>{pt}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">7. Đăng ký ĐH</label>
                    <select className="w-full p-2 border border-slate-300 rounded-lg outline-none" value={formData.uniChoice} onChange={(e) => setFormData({...formData, uniChoice: e.target.value})}>
                      {DANH_SACH_DAI_HOC.map(truong => <option key={truong} value={truong}>{truong}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700">9. Tổ hợp đăng ký</label>
                    <select className="w-full p-2 sm:p-2.5 text-sm sm:text-base border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.combinations} onChange={(e) => setFormData({...formData, combinations: e.target.value})}>
                      {DANH_SACH_TO_HOP.map(tohop => <option key={tohop.id} value={tohop.label}>{tohop.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>

               {/* Section 3: Scores */}
               <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 border-b pb-2 flex items-center gap-2">
                  <span className="bg-slate-100 text-slate-700 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full text-[10px] sm:text-xs">03</span>
                  Kết quả học tập
                </h3>
                <div className="overflow-x-auto pb-2">
                  <div className="min-w-[600px]">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-700">
                          <th className="p-2 border border-slate-200 whitespace-nowrap">Năm học</th>
                          <th className="p-2 border border-slate-200 whitespace-nowrap">Học lực</th>
                          <th className="p-2 border border-slate-200 whitespace-nowrap">Hạnh kiểm</th>
                          <th className="p-2 border border-slate-200 whitespace-nowrap font-bold bg-slate-50">{subjects.m1}</th>
                          <th className="p-2 border border-slate-200 whitespace-nowrap font-bold bg-slate-50">{subjects.m2}</th>
                          <th className="p-2 border border-slate-200 whitespace-nowrap font-bold bg-slate-50">{subjects.m3}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {['l10', 'l11', 'l12'].map((grade) => (
                          <tr key={grade}>
                            <td className="p-2 border border-slate-200 font-medium text-center whitespace-nowrap bg-slate-50/50 text-slate-600">{grade === 'l12' ? 'Lớp 12 (Kì 1)' : `Lớp ${grade.slice(1)}`}</td>
                            <td className="p-1 sm:p-2 border border-slate-200">
                              <select className="w-full text-center outline-none bg-transparent" value={formData.academic[grade as keyof typeof formData.academic].academic} onChange={(e) => setFormData({...formData, academic: {...formData.academic, [grade]: {...formData.academic[grade as keyof typeof formData.academic], academic: e.target.value}}})}>
                                <option>Tốt</option><option>Khá</option><option>Trung bình</option>
                              </select>
                            </td>
                            <td className="p-1 sm:p-2 border border-slate-200">
                              <select className="w-full text-center outline-none bg-transparent" value={formData.academic[grade as keyof typeof formData.academic].conduct} onChange={(e) => setFormData({...formData, academic: {...formData.academic, [grade]: {...formData.academic[grade as keyof typeof formData.academic], conduct: e.target.value}}})}>
                                <option>Tốt</option><option>Khá</option>
                              </select>
                            </td>
                            <td className="p-1 sm:p-2 border border-slate-200">
                              <input type="number" step="0.1" min="0" max="10" placeholder="0.0" className="w-full text-center outline-none bg-transparent" value={formData.academic[grade as keyof typeof formData.academic].m1} onChange={(e) => setFormData({...formData, academic: {...formData.academic, [grade]: {...formData.academic[grade as keyof typeof formData.academic], m1: e.target.value}}})} />
                            </td>
                            <td className="p-1 sm:p-2 border border-slate-200">
                              <input type="number" step="0.1" min="0" max="10" placeholder="0.0" className="w-full text-center outline-none bg-transparent" value={formData.academic[grade as keyof typeof formData.academic].m2} onChange={(e) => setFormData({...formData, academic: {...formData.academic, [grade]: {...formData.academic[grade as keyof typeof formData.academic], m2: e.target.value}}})} />
                            </td>
                            <td className="p-1 sm:p-2 border border-slate-200">
                              <input type="number" step="0.1" min="0" max="10" placeholder="0.0" className="w-full text-center outline-none bg-transparent" value={formData.academic[grade as keyof typeof formData.academic].m3} onChange={(e) => setFormData({...formData, academic: {...formData.academic, [grade]: {...formData.academic[grade as keyof typeof formData.academic], m3: e.target.value}}})} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="pt-6 sm:pt-4 flex flex-col sm:flex-row justify-end gap-3 sm:space-x-4 border-t border-slate-200 pt-6">
                <button type="button" onClick={() => setView('dashboard')} className="px-6 py-2.5 border border-slate-300 font-bold text-slate-600 rounded-xl hover:bg-slate-100 transition-colors">Hủy</button>
                <button type="submit" className="px-8 py-2.5 bg-indigo-600 font-bold text-white rounded-xl hover:bg-indigo-700 transition-all flex items-center space-x-2">
                  <Save size={18} /> <span>Cập Nhật Thông Tin</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Print View - EXACT Layout with max dimensions to prevent edge clipping */}
        {view === 'print' && selectedReg && (
          <div className="overflow-x-auto bg-slate-200 print:bg-white p-2 sm:p-8 rounded-xl print:p-0">
             <div className="bg-white p-6 sm:p-10 text-black font-serif leading-relaxed w-[21cm] min-w-[21cm] mx-auto print:p-0 print:m-0 print:shadow-none shadow-xl border border-slate-100 box-border print:w-full print:min-w-0 print:max-w-none print:border-none">
              {/* Header */}
              <div className="flex justify-between items-start mb-6 text-[15px]">
                <div className="text-center font-bold">
                  CÔNG AN TỈNH TUYÊN QUANG<br/>
                  <span className="border-b border-black inline-block pb-0.5">CÔNG AN PHƯỜNG .....</span>
                </div>
                <div className="text-center">
                  <div className="font-bold">CỘNG HỌA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                  <div className="font-bold border-b border-black inline-block pb-0.5">Độc lập - Tự do - Hạnh phúc</div>
                </div>
              </div>

              <div className="text-center mb-8 relative">
                <div className="absolute top-0 right-0 w-8 h-8 border border-black float-right" title="Mã nhảy" />
                <h2 className="font-bold text-[17px] uppercase mb-1">PHIẾU ĐĂNG KÝ SƠ TUYỂN</h2>
                <h3 className="font-bold text-[15px] uppercase">VÀO CÁC TRƯỜNG ĐẠI HỌC, TRUNG CẤP CAND NĂM {selectedReg.gradYear || 2026}</h3>
              </div>

              {/* Tóm tắt như public, em bỏ bớt HTML để sạch code */}
              <div className="space-y-3 text-[15px]">
                <div className="flex">
                  <p className="w-[60%]"><span className="font-normal">1. Họ và tên:</span> <span className="font-bold uppercase bg-yellow-100 print:bg-transparent">{selectedReg.fullName}</span></p>
                  <p className="w-[40%]"><span className="font-normal">2. Ngày sinh:</span> <span className="font-bold bg-yellow-100 print:bg-transparent">{selectedReg.dob ? new Date(selectedReg.dob).toLocaleDateString('vi-VN') : ''}</span></p>
                </div>
                
                <div className="flex">
                  <p className="w-[60%]"><span className="font-normal">3. Số CCCD:</span> <span className="font-bold bg-yellow-100 print:bg-transparent">{selectedReg.cccd}</span></p>
                  <p className="w-[40%]"><span className="font-normal">4. Giới tính:</span> <span className="font-bold bg-yellow-100 print:bg-transparent">{selectedReg.gender}</span></p>
                </div>

                <p><span className="font-normal">5. Đối tượng (<span className="italic">Học sinh phổ thông, CSNV tại ngũ, CSNV xuất ngũ</span>):</span> <span className="font-bold bg-yellow-100 print:bg-transparent">{selectedReg.candidateType}</span></p>
                <p><span className="font-normal">6. Phương thức dự tuyển:</span> <span className="font-bold bg-yellow-100 print:bg-transparent">{selectedReg.method}</span></p>
                <p><span className="font-normal">7. Đăng ký xét tuyển đại học:</span> <span className="font-bold bg-yellow-100 print:bg-transparent">{selectedReg.uniChoice}</span></p>
                <p><span className="font-normal">8. Đăng ký xét tuyển trung cấp:</span> <span className="font-bold bg-yellow-100 print:bg-transparent">{selectedReg.collegeChoice}</span></p>
                <p><span className="font-normal">9. Tổ hợp đăng ký xét tuyển:</span> <span className="font-bold bg-yellow-100 print:bg-transparent">{selectedReg.combinations}</span></p>

                <div className="pt-2">
                  <p className="font-normal mb-2">10. <strong>Học lực/Hạnh kiểm:</strong></p>
                  <table className="w-full border-collapse border border-black text-center text-[14px]">
                    <tbody>
                      <tr>
                        <td rowSpan={2} className="border border-black p-1 w-[25%]">Học lực /Hạnh kiểm<br/>cả năm (Khá/Tốt)</td>
                        <td colSpan={3} className="border border-black p-1">Lớp 10</td>
                        <td colSpan={3} className="border border-black p-1">Lớp 11</td>
                        <td colSpan={3} className="border border-black p-1">Lớp 12 (Kì 1)</td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="border border-black p-1 font-bold bg-yellow-50 print:bg-transparent">{selectedReg.academic.l10.academic}/ {selectedReg.academic.l10.conduct}</td>
                        <td colSpan={3} className="border border-black p-1 font-bold bg-yellow-50 print:bg-transparent">{selectedReg.academic.l11.academic}/ {selectedReg.academic.l11.conduct}</td>
                        <td colSpan={3} className="border border-black p-1 font-bold bg-yellow-50 print:bg-transparent">{selectedReg.academic.l12.academic}/ {selectedReg.academic.l12.conduct}</td>
                      </tr>
                      <tr>
                        <td rowSpan={2} className="border border-black p-1 w-[25%] font-medium">Điểm tổng kết từng<br/>môn đăng ký xét<br/>tuyển:</td>
                        <td className="border border-black p-1 min-w-[30px]">M1</td>
                        <td className="border border-black p-1 min-w-[30px]">M2</td>
                        <td className="border border-black p-1 min-w-[30px]">M3</td>
                        <td className="border border-black p-1 min-w-[30px]">M1</td>
                        <td className="border border-black p-1 min-w-[30px]">M2</td>
                        <td className="border border-black p-1 min-w-[30px]">M3</td>
                        <td className="border border-black p-1 min-w-[30px]">M1</td>
                        <td className="border border-black p-1 min-w-[30px]">M2</td>
                        <td className="border border-black p-1 min-w-[30px]">M3</td>
                      </tr>
                      <tr className="bg-yellow-100 print:bg-transparent font-bold">
                        <td className="border border-black p-1">{selectedReg.academic.l10.m1}</td>
                        <td className="border border-black p-1">{selectedReg.academic.l10.m2}</td>
                        <td className="border border-black p-1">{selectedReg.academic.l10.m3}</td>
                        <td className="border border-black p-1">{selectedReg.academic.l11.m1}</td>
                        <td className="border border-black p-1">{selectedReg.academic.l11.m2}</td>
                        <td className="border border-black p-1">{selectedReg.academic.l11.m3}</td>
                        <td className="border border-black p-1">{selectedReg.academic.l12.m1}</td>
                        <td className="border border-black p-1">{selectedReg.academic.l12.m2}</td>
                        <td className="border border-black p-1">{selectedReg.academic.l12.m3}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="pt-2">
                  <p><span className="font-normal">11. Năm tốt nghiệp THPT:</span> <span className="font-bold bg-yellow-100 print:bg-transparent">{selectedReg.gradYear}</span></p>
                  <p><span className="font-normal">12. Phân loại cán bộ năm 2025 (đối với CSNV tại ngũ):</span> <span className="font-bold bg-yellow-100 print:bg-transparent">{selectedReg.officerRating2025}</span></p>
                  <p><span className="font-normal">13. Đối tượng ưu tiên:</span> <span className="font-bold bg-yellow-100 print:bg-transparent">{selectedReg.priorityType}</span></p>
                  <p><span className="font-normal">14. Khu vực ưu tiên:</span> <span className="font-bold bg-yellow-100 print:bg-transparent">{selectedReg.priorityArea}</span></p>
                  <p><span className="font-normal">15. Giải đạt được:</span> <span className="font-bold bg-yellow-100 print:bg-transparent">{selectedReg.achievements}</span></p>
                  <p><span className="font-normal">16. Đăng ký bài thi BCA:</span> <span className="font-bold bg-yellow-100 print:bg-transparent">{selectedReg.bcaExam}</span></p>
                </div>
                
                <div className="pt-2">
                  <p className="font-normal mb-1">17. Đăng ký kiểm tra thể lực (<span className="italic">đánh dấu X vào ô tương ứng</span>):</p>
                  <div className="grid grid-cols-5 border border-black text-[13px] text-center font-bold items-center">
                    <div className="border-r border-b border-black p-1">Bật xa tại chỗ<br/><span className="font-normal text-[12px]">(nam,nữ)</span></div>
                    <div className="border-r border-b border-black p-1">Co tay xà đơn<br/><span className="font-normal text-[12px]">(nam)</span></div>
                    <div className="border-r border-b border-black p-1">Chạy 100m<br/><span className="font-normal text-[12px]">(nam,nữ)</span></div>
                    <div className="border-r border-b border-black p-1">Chạy 800m<br/><span className="font-normal text-[12px]">(nữ)</span></div>
                    <div className="border-b border-black p-1">Chạy 1500m<br/><span className="font-normal text-[12px]">(nam)</span></div>

                    <div className="border-r border-black font-bold h-8 flex items-center justify-center bg-yellow-50 print:bg-transparent">{selectedReg.physicalTest.batXa ? 'X' : ''}</div>
                    <div className="border-r border-black font-bold h-8 flex items-center justify-center bg-yellow-50 print:bg-transparent">{selectedReg.physicalTest.xaDon ? 'X' : ''}</div>
                    <div className="border-r border-black font-bold h-8 flex items-center justify-center bg-yellow-50 print:bg-transparent">{selectedReg.physicalTest.chay100m ? 'X' : ''}</div>
                    <div className="border-r border-black font-bold h-8 flex items-center justify-center bg-yellow-50 print:bg-transparent">{selectedReg.physicalTest.chay800m ? 'X' : ''}</div>
                    <div className="font-bold h-8 flex items-center justify-center bg-yellow-50 print:bg-transparent">{selectedReg.physicalTest.chay1500m ? 'X' : ''}</div>
                  </div>
                </div>

                <div className="pt-2 flex gap-12">
                  <p><span className="font-normal">19: Kết quả kiểm tra chiều cao cân nặng:</span></p>
                </div>
                <div className="flex gap-20 pl-4">
                  <p>Chiều cao: <span className="font-bold bg-yellow-100 print:bg-transparent">{selectedReg.height || '...........'}</span> cm;</p>
                  <p>Cân nặng: <span className="font-bold bg-yellow-100 print:bg-transparent">{selectedReg.weight || '...........'}</span> kg.</p>
                </div>

                <div className="pt-3 flex justify-between text-center text-[15px]">
                  <div className="space-y-24 pt-6 w-1/2">
                    <div className="font-bold uppercase">ĐẠI DIỆN GIA ĐÌNH THÍ SINH</div>
                    <div className="font-bold bg-yellow-100 print:bg-transparent max-w-[200px] mx-auto">{selectedReg.familyRep}</div>
                  </div>
                  <div className="space-y-24 w-1/2">
                    <div>
                      <div className="italic mb-1">{selectedReg.city}, ngày {new Date().getDate()} tháng {new Date().getMonth() + 1} năm <span className="font-bold bg-yellow-100 print:bg-transparent">2026</span></div>
                      <div className="font-bold uppercase">THÍ SINH ĐĂNG KÝ</div>
                    </div>
                    <div className="font-bold uppercase bg-yellow-100 print:bg-transparent max-w-[200px] mx-auto">{selectedReg.fullName}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {view === 'print' && (
        <button 
          onClick={() => setView('dashboard')}
          className="fixed bottom-6 right-6 bg-slate-800 text-white p-4 rounded-full shadow-2xl print:hidden hover:scale-110 transition-transform"
        >
           <ChevronLeft size={24} />
        </button>
      )}

      {/* Global Print Layout Hacks */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 10mm; }
          body, html {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
            height: auto !important;
          }
          /* Hide anything that is not the print container */
          header, footer, nav, button, .no-print, .print\\:hidden { display: none !important; }
        }
      `}} />
    </div>
  );
};

export default AdminDangKyManager;
