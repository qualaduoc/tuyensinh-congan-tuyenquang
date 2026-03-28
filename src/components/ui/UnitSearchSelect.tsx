"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';

interface UnitSearchSelectProps {
  units: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
}

export default function UnitSearchSelect({ 
  units, 
  value, 
  onChange,
  placeholder = '-- Chọn đơn vị báo cáo --',
  searchPlaceholder = 'Gõ tên để tìm...',
  emptyText = 'Không tìm thấy kết quả nào'
}: UnitSearchSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lọc danh sách theo từ khóa tìm kiếm (không phân biệt hoa thường, bỏ dấu)
  const filtered = units.filter(unit =>
    unit.toLowerCase().includes(search.toLowerCase())
  );

  // Click ra ngoài thì đóng dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (unit: string) => {
    onChange(unit);
    setIsOpen(false);
    setSearch('');
  };

  const handleClear = () => {
    onChange('');
    setSearch('');
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div ref={wrapperRef} className="relative">
      {/* Nút hiển thị giá trị đã chọn */}
      {!isOpen ? (
        <button
          type="button"
          onClick={handleOpen}
          className="w-full p-4 bg-white border-2 border-slate-300 rounded-xl text-left font-semibold flex items-center justify-between gap-2 hover:border-red-400 transition-colors"
        >
          <span className={value ? 'text-slate-800' : 'text-slate-400'}>
            {value || placeholder}
          </span>
          <div className="flex items-center gap-1">
            {value && (
              <span
                onClick={(e) => { e.stopPropagation(); handleClear(); }}
                className="p-1 hover:bg-red-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-red-500" />
              </span>
            )}
            <ChevronDown className="w-5 h-5 text-slate-400" />
          </div>
        </button>
      ) : (
        /* Ô tìm kiếm khi mở */
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 p-4 bg-white border-2 border-red-500 rounded-xl outline-none font-semibold text-slate-800 shadow-[0_0_0_4px_rgba(220,38,38,0.1)]"
            placeholder={searchPlaceholder}
            autoComplete="off"
          />
        </div>
      )}

      {/* Dropdown danh sách */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white border-2 border-slate-300 rounded-xl shadow-2xl max-h-64 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-slate-400 font-semibold text-sm">
              {emptyText}
            </div>
          ) : (
            filtered.map((unit, idx) => (
              <button
                key={unit}
                type="button"
                onClick={() => handleSelect(unit)}
                className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors flex items-center gap-2
                  ${unit === value ? 'bg-red-50 text-red-700 border-l-4 border-red-600' : 'text-slate-700 hover:bg-yellow-50 hover:text-red-800 border-l-4 border-transparent'}
                  ${idx !== filtered.length - 1 ? 'border-b border-slate-100' : ''}
                `}
              >
                {/* Highlight từ khóa tìm kiếm */}
                {search ? highlightMatch(unit, search) : unit}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// Hàm highlight phần text khớp với từ khóa
function highlightMatch(text: string, query: string) {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const startIdx = lowerText.indexOf(lowerQuery);

  if (startIdx === -1) return text;

  const before = text.slice(0, startIdx);
  const match = text.slice(startIdx, startIdx + query.length);
  const after = text.slice(startIdx + query.length);

  return (
    <span>
      {before}
      <span className="bg-yellow-200 text-red-800 font-black rounded px-0.5">{match}</span>
      {after}
    </span>
  );
}
