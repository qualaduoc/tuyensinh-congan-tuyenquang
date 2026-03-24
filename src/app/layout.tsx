import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quản Lý SLL Tuyển Sinh - Công An Tuyên Quang',
  description: 'Hệ thống nhập liệu và báo cáo phòng TCCB - 2026',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
