import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lemonade Stand',
  description: 'A simple lemonade stand simulator built with Next.js.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
