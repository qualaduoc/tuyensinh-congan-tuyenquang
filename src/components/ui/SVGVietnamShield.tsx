import React from 'react';

export default function SVGVietnamShield({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" />
        </radialGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Nền Khiên */}
      <path d="M50 5 L90 20 L90 50 C90 75 70 90 50 95 C30 90 10 75 10 50 L10 20 Z" fill="url(#grad1)" stroke="#facc15" strokeWidth="3" filter="url(#glow)"/>
      <path d="M50 10 L83 23 L83 50 C83 70 66 83 50 88 C34 83 17 70 17 50 L17 23 Z" fill="none" stroke="#fef08a" strokeWidth="1" strokeDasharray="3,3" />
      
      {/* Sao Vàng */}
      <polygon points="50,25 58,42 75,45 62,58 66,75 50,65 34,75 38,58 25,45 42,42" fill="#facc15" />
      
      {/* Viền bánh răng */}
      <path d="M40 70 A15 15 0 0 0 60 70" fill="none" stroke="#facc15" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="#fef08a" strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}
