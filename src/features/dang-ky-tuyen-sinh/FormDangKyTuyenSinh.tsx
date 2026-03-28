"use client";
import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { UNITS } from '@/constants';
import UnitSearchSelect from '@/components/ui/UnitSearchSelect';

const FormDangKyTuyenSinh = () => {
  const [view, setView] = useState<'form' | 'success'>('form');
  const [registrations, setRegistrations] = useState<any[]>([]);

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

  // Initial Form State
  const initialForm = {
    id: Date.now(),
    createDate: new Date().toISOString(),
    fullName: '',
    dob: '',
    cccd: '',
    gender: 'Nam',
    candidateType: 'HSPT',
    method: 'Phương thức 2 và Phương thức 3',
    uniChoice: 'Học viện An ninh nhân dân (T01) - ANH',
    collegeChoice: 'Trường CĐ An ninh nhân dân I (T08) - ANN',
    combinations: 'C03 - Toán, Ngữ văn, Lịch sử',
    academic: {
      l10: { academic: 'Tốt', conduct: 'Tốt', m1: '', m2: '', m3: '' },
      l11: { academic: 'Tốt', conduct: 'Tốt', m1: '', m2: '', m3: '' },
      l12: { academic: 'Tốt', conduct: 'Tốt', m1: '', m2: '', m3: '' },
    },
    gradYear: '2026',
    officerRating2025: 'Không',
    priorityType: 'Không',
    priorityArea: 'Không',
    achievements: 'Không',
    bcaExam: 'CA1 (Vật lí)',
    physicalTest: {
      batXa: false,
      xaDon: false,
      chay100m: false,
      chay800m: false,
      chay1500m: false
    },
    height: '',
    weight: '',
    familyRep: '',
    city: 'Tuyên Quang',
    unit: ''
  };

  const [formData, setFormData] = useState<any>(initialForm);

  useEffect(() => {
    const saved = localStorage.getItem('cand_public_registrations');
    if (saved) {
      setRegistrations(JSON.parse(saved));
    }
  }, []);

  const saveToLocal = (data: any[]) => {
    localStorage.setItem('cand_public_registrations', JSON.stringify(data));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.unit) {
      alert("Vui lòng chọn Nơi đăng ký (Công an Xã/Phường)!");
      return;
    }
    
    let updated;
    const finalForm = { ...formData, id: formData.id || Date.now(), createDate: new Date().toISOString() };
    if (registrations.find(r => r.id === formData.id)) {
      updated = registrations.map(r => r.id === formData.id ? finalForm : r);
    } else {
      updated = [...registrations, finalForm];
    }
    setRegistrations(updated);
    saveToLocal(updated);
    
    // Switch to success view instead of print
    setView('success');
  };

  // Handle dynamic subjects based on combination (auto-fill headers logically)
  const [subjects, setSubjects] = useState({m1: 'Môn 1', m2: 'Môn 2', m3: 'Môn 3'});
  useEffect(() => {
    const combo = formData.combinations || '';
    // Backward compatibility if it just says 'C03'
    const match = DANH_SACH_TO_HOP.find(t => t.label === combo || t.id === combo || combo.startsWith(t.id));
    if (match) {
      setSubjects({m1: match.subjects[0], m2: match.subjects[1], m3: match.subjects[2]});
    } else {
      setSubjects({m1: 'Môn 1', m2: 'Môn 2', m3: 'Môn 3'});
    }
  }, [formData.combinations]);

  return (
    <div className="bg-slate-50 text-slate-900 font-sans rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px]">
      
      {/* Title block instead of full navbar */}
      <div className="bg-[#5B0000] text-yellow-300 p-4 sm:p-5 shadow-sm border-b border-yellow-500/30 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide">VIẾT PHIẾU ĐĂNG KÝ SƠ TUYỂN ONLINE</h2>
          <p className="text-sm font-semibold text-yellow-100/80 mt-1">Dành cho Thí sinh tự do hoặc Công an nghĩa vụ xuất ngũ/tại ngũ</p>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Form View */}
        {view === 'form' && (
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-in fade-in duration-500">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 sm:p-8 space-y-6 sm:space-y-8">
              {/* Box Chọn Đơn Vị */}
              <div className="bg-red-50 p-5 rounded-2xl border-2 border-red-200">
                <label className="block text-sm font-bold text-slate-700 mb-3">📌 Nơi đăng ký sơ tuyển (Công an Xã/Phường) <span className="text-red-500">*</span></label>
                <div className="bg-white rounded-xl shadow-[0_0_0_2px_rgba(220,38,38,0.1)]">
                  <UnitSearchSelect
                    units={UNITS}
                  value={formData.unit}
                  onChange={(val) => setFormData({...formData, unit: val})}
                />
                </div>
              </div>

              {/* Section 1: Basic Info */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-[#8B0000] border-b border-red-100 pb-2 flex items-center gap-2">
                  <span className="bg-[#8B0000] text-yellow-300 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full text-[10px] sm:text-xs">01</span>
                  Thông tin cá nhân
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">1. Họ và tên <span className="text-red-500">*</span></label>
                    <input type="text" required placeholder="NGUYỄN VĂN A" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] outline-none uppercase font-semibold" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value.toUpperCase()})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">2. Ngày sinh <span className="text-red-500">*</span></label>
                    <input type="date" required className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] outline-none" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">3. Số CCCD <span className="text-red-500">*</span></label>
                    <input type="text" required maxLength={12} placeholder="Nhập đủ 12 số CCCD" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] outline-none block" value={formData.cccd} onChange={(e) => setFormData({...formData, cccd: e.target.value.replace(/[^0-9]/g, '')})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">4. Giới tính</label>
                    <select className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] outline-none" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Registration details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#8B0000] border-b border-red-100 pb-2 flex items-center gap-2">
                  <span className="bg-[#8B0000] text-yellow-300 w-6 h-6 flex items-center justify-center rounded-full text-xs">02</span>
                  Nguyện vọng xét tuyển
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">5. Đối tượng</label>
                    <select className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8B0000]" value={formData.candidateType} onChange={(e) => setFormData({...formData, candidateType: e.target.value})}>
                      <option>HSPT</option>
                      <option>CSNV tại ngũ</option>
                      <option>CSNV xuất ngũ</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">6. Phương thức dự tuyển</label>
                    <select className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8B0000]" value={formData.method} onChange={(e) => setFormData({...formData, method: e.target.value})}>
                      {DANH_SACH_PHUONG_THUC.map(pt => <option key={pt} value={pt}>{pt}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">7. Đăng ký xét tuyển Đại học</label>
                    <select className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8B0000]" value={formData.uniChoice} onChange={(e) => setFormData({...formData, uniChoice: e.target.value})}>
                      {DANH_SACH_DAI_HOC.map(truong => <option key={truong} value={truong}>{truong}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">8. Đăng ký xét tuyển Trung cấp</label>
                    <select className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8B0000]" value={formData.collegeChoice} onChange={(e) => setFormData({...formData, collegeChoice: e.target.value})}>
                      {DANH_SACH_TRUNG_CAP.map(truong => <option key={truong} value={truong}>{truong}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700">9. Tổ hợp đăng ký xét tuyển</label>
                    <select className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8B0000]" value={formData.combinations} onChange={(e) => setFormData({...formData, combinations: e.target.value})}>
                      {DANH_SACH_TO_HOP.map(tohop => <option key={tohop.id} value={tohop.label}>{tohop.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Scores */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-[#8B0000] border-b border-red-100 pb-2 flex items-center gap-2">
                  <span className="bg-[#8B0000] text-yellow-300 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full text-[10px] sm:text-xs">03</span>
                  Kết quả học tập
                </h3>
                <div className="overflow-x-auto pb-2">
                  <div className="min-w-[600px]">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-red-50 text-[#8B0000]">
                          <th className="p-2 border border-red-100 whitespace-nowrap">Năm học</th>
                          <th className="p-2 border border-red-100 whitespace-nowrap">Học lực</th>
                          <th className="p-2 border border-red-100 whitespace-nowrap">Hạnh kiểm</th>
                          <th className="p-2 border border-red-100 whitespace-nowrap font-bold bg-yellow-50">{subjects.m1}</th>
                          <th className="p-2 border border-red-100 whitespace-nowrap font-bold bg-yellow-50">{subjects.m2}</th>
                          <th className="p-2 border border-red-100 whitespace-nowrap font-bold bg-yellow-50">{subjects.m3}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {['l10', 'l11', 'l12'].map((grade) => (
                          <tr key={grade}>
                            <td className="p-2 border border-slate-200 font-medium text-center whitespace-nowrap bg-slate-50/50 text-slate-600">{grade === 'l12' ? 'Lớp 12 (Kì 1)' : `Lớp ${grade.slice(1)}`}</td>
                            <td className="p-1 sm:p-2 border border-slate-200 hover:bg-slate-50 transition-colors">
                              <select className="w-full text-center outline-none bg-transparent cursor-pointer" value={formData.academic[grade as keyof typeof formData.academic].academic} onChange={(e) => setFormData({...formData, academic: {...formData.academic, [grade]: {...formData.academic[grade as keyof typeof formData.academic], academic: e.target.value}}})}>
                                <option>Tốt</option><option>Khá</option><option>Trung bình</option>
                              </select>
                            </td>
                            <td className="p-1 sm:p-2 border border-slate-200 hover:bg-slate-50 transition-colors">
                              <select className="w-full text-center outline-none bg-transparent cursor-pointer" value={formData.academic[grade as keyof typeof formData.academic].conduct} onChange={(e) => setFormData({...formData, academic: {...formData.academic, [grade]: {...formData.academic[grade as keyof typeof formData.academic], conduct: e.target.value}}})}>
                                <option>Tốt</option><option>Khá</option>
                              </select>
                            </td>
                            <td className="p-1 sm:p-2 border border-slate-200 bg-yellow-50/30">
                              <input type="number" step="0.1" min="0" max="10" placeholder="0.0" className="w-full text-center outline-none bg-transparent font-bold text-[#8B0000]" value={formData.academic[grade as keyof typeof formData.academic].m1} onChange={(e) => setFormData({...formData, academic: {...formData.academic, [grade]: {...formData.academic[grade as keyof typeof formData.academic], m1: e.target.value}}})} />
                            </td>
                            <td className="p-1 sm:p-2 border border-slate-200 bg-yellow-50/30">
                              <input type="number" step="0.1" min="0" max="10" placeholder="0.0" className="w-full text-center outline-none bg-transparent font-bold text-[#8B0000]" value={formData.academic[grade as keyof typeof formData.academic].m2} onChange={(e) => setFormData({...formData, academic: {...formData.academic, [grade]: {...formData.academic[grade as keyof typeof formData.academic], m2: e.target.value}}})} />
                            </td>
                            <td className="p-1 sm:p-2 border border-slate-200 bg-yellow-50/30">
                              <input type="number" step="0.1" min="0" max="10" placeholder="0.0" className="w-full text-center outline-none bg-transparent font-bold text-[#8B0000]" value={formData.academic[grade as keyof typeof formData.academic].m3} onChange={(e) => setFormData({...formData, academic: {...formData.academic, [grade]: {...formData.academic[grade as keyof typeof formData.academic], m3: e.target.value}}})} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 pt-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">11. Năm ĐK tốt nghiệp</label>
                    <input type="number" className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8B0000]" value={formData.gradYear} onChange={(e) => setFormData({...formData, gradYear: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">12. Phân loại CB 2025</label>
                    <input type="text" placeholder="Ghi rảnh rỗi hoặc Không" className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8B0000]" value={formData.officerRating2025} onChange={(e) => setFormData({...formData, officerRating2025: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">13. Đối tượng ưu tiên</label>
                    <input type="text" placeholder="Không có thì ghi: Không" className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8B0000]" value={formData.priorityType} onChange={(e) => setFormData({...formData, priorityType: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">14. Khu vực ưu tiên</label>
                    <input type="text" placeholder="KV1, KV2, KV3..." className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8B0000]" value={formData.priorityArea} onChange={(e) => setFormData({...formData, priorityArea: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">15. Giải đạt được</label>
                    <input type="text" placeholder="Nếu không có đổi thành: Không" className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8B0000]" value={formData.achievements} onChange={(e) => setFormData({...formData, achievements: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">16. Đăng ký bài thi BCA</label>
                    <select 
                      className="w-full p-2.5 border border-slate-300 rounded-lg outline-none bg-red-50 text-[#8B0000] font-bold focus:ring-2 focus:ring-[#8B0000]"
                      value={formData.bcaExam}
                      onChange={(e) => setFormData({...formData, bcaExam: e.target.value})}
                    >
                      {DANH_SACH_BAI_BCA.map(bai => <option key={bai} value={bai}>{bai}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Physical Test */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-[#8B0000] border-b border-red-100 pb-2 flex items-center gap-2">
                  <span className="bg-[#8B0000] text-yellow-300 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full text-[10px] sm:text-xs">04</span>
                  Kiểm tra thể lực & Sức khỏe
                </h3>
                <div className="grid grid-cols-2 justify-items-start gap-3 sm:gap-4 max-w-lg">
                   <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className={`w-5 h-5 flex items-center justify-center rounded border transition-colors ${formData.physicalTest.batXa ? 'bg-[#8B0000] border-[#8B0000]' : 'bg-white border-slate-300 group-hover:border-[#8B0000]'}`}>
                      {formData.physicalTest.batXa && <div className="w-3 h-3 bg-yellow-300 rounded-sm" />}
                    </div>
                    <input type="checkbox" className="hidden" checked={formData.physicalTest.batXa} onChange={(e) => setFormData({...formData, physicalTest: {...formData.physicalTest, batXa: e.target.checked}})} />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-[#8B0000] transition-colors">Bật xa tại chỗ</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                     <div className={`w-5 h-5 flex items-center justify-center rounded border transition-colors ${formData.physicalTest.xaDon ? 'bg-[#8B0000] border-[#8B0000]' : 'bg-white border-slate-300 group-hover:border-[#8B0000]'}`}>
                      {formData.physicalTest.xaDon && <div className="w-3 h-3 bg-yellow-300 rounded-sm" />}
                    </div>
                    <input type="checkbox" className="hidden" checked={formData.physicalTest.xaDon} onChange={(e) => setFormData({...formData, physicalTest: {...formData.physicalTest, xaDon: e.target.checked}})} />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-[#8B0000] transition-colors">Co tay xà đơn</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                     <div className={`w-5 h-5 flex items-center justify-center rounded border transition-colors ${formData.physicalTest.chay100m ? 'bg-[#8B0000] border-[#8B0000]' : 'bg-white border-slate-300 group-hover:border-[#8B0000]'}`}>
                      {formData.physicalTest.chay100m && <div className="w-3 h-3 bg-yellow-300 rounded-sm" />}
                    </div>
                    <input type="checkbox" className="hidden" checked={formData.physicalTest.chay100m} onChange={(e) => setFormData({...formData, physicalTest: {...formData.physicalTest, chay100m: e.target.checked}})} />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-[#8B0000] transition-colors">Chạy 100m</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                     <div className={`w-5 h-5 flex items-center justify-center rounded border transition-colors ${formData.physicalTest.chay800m ? 'bg-[#8B0000] border-[#8B0000]' : 'bg-white border-slate-300 group-hover:border-[#8B0000]'}`}>
                      {formData.physicalTest.chay800m && <div className="w-3 h-3 bg-yellow-300 rounded-sm" />}
                    </div>
                    <input type="checkbox" className="hidden" checked={formData.physicalTest.chay800m} onChange={(e) => setFormData({...formData, physicalTest: {...formData.physicalTest, chay800m: e.target.checked}})} />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-[#8B0000] transition-colors">Chạy 800m</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                     <div className={`w-5 h-5 flex items-center justify-center rounded border transition-colors ${formData.physicalTest.chay1500m ? 'bg-[#8B0000] border-[#8B0000]' : 'bg-white border-slate-300 group-hover:border-[#8B0000]'}`}>
                      {formData.physicalTest.chay1500m && <div className="w-3 h-3 bg-yellow-300 rounded-sm" />}
                    </div>
                    <input type="checkbox" className="hidden" checked={formData.physicalTest.chay1500m} onChange={(e) => setFormData({...formData, physicalTest: {...formData.physicalTest, chay1500m: e.target.checked}})} />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-[#8B0000] transition-colors">Chạy 1500m</span>
                  </label>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-slate-100">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Chiều cao (cm)</label>
                    <input type="number" placeholder="Ví dụ: 170" className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8B0000]" value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Cân nặng (kg)</label>
                    <input type="number" placeholder="Ví dụ: 65" className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8B0000]" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-[#8B0000]">Tên người đại diện Đại gia đình ghi trên Phiếu</label>
                    <input type="text" placeholder="Họ và tên Phụ huynh/Người giám hộ" required className="w-full p-2.5 border border-yellow-400 bg-yellow-50 rounded-lg outline-none focus:ring-2 focus:ring-[#8B0000]" value={formData.familyRep} onChange={(e) => setFormData({...formData, familyRep: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Nơi lập phiếu</label>
                    <input type="text" className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8B0000]" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                  </div>
                </div>
              </div>

              <div className="pt-6 sm:pt-4 flex flex-col sm:flex-row justify-end gap-3 sm:space-x-4 border-t border-slate-200 mt-6 pt-6">
                <button 
                  type="button" onClick={() => setFormData({...initialForm, id: Date.now()})}
                  className="w-full sm:w-auto px-6 py-3 border border-slate-300 font-bold text-slate-600 rounded-xl hover:bg-slate-100 transition-colors order-2 sm:order-1"
                >
                  Nhập lại từ đầu
                </button>
                <button 
                  type="submit"
                  className="w-full sm:w-auto px-10 py-3 bg-[#8B0000] font-bold text-yellow-300 rounded-xl hover:bg-[#A30000] shadow-[0_4px_10px_rgba(139,0,0,0.3)] transition-all flex items-center justify-center space-x-2 order-1 sm:order-2"
                >
                  <Send size={20} /> <span className="text-lg">Gửi Đơn Đăng Ký</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Success View */}
        {view === 'success' && (
          <div className="max-w-2xl mx-auto mt-8 mb-12 bg-green-50 p-8 sm:p-12 rounded-3xl border border-green-200 text-center shadow-sm animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-green-800 uppercase mb-4 tracking-wide">Đăng Ký Thành Công!</h2>
            <p className="text-green-700 font-medium text-lg leading-relaxed mb-8">
              Hồ sơ đăng ký sơ tuyển của Thí sinh <strong className="uppercase">{formData.fullName}</strong> đã được gửi lên hệ thống. Ban Quản trị sẽ tiếp nhận, đối chiếu và lưu vào danh sách.
            </p>
            <button 
              onClick={() => {
                setView('form');
                setFormData({...initialForm, id: Date.now()});
              }}
              className="px-8 py-3 bg-green-700 text-white font-bold rounded-xl shadow-md hover:bg-green-800 transition-all flex items-center justify-center mx-auto hover:shadow-lg hover:-translate-y-1"
            >
              Tiếp Tục Đăng Ký Người Khác
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default FormDangKyTuyenSinh;
