import './globals.css';
import type { Metadata } from 'next';
import { CartProvider } from '@/components/CartProvider';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'NextLemonade',
  description: 'A lemonade stand shop built with Next.js.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navigation />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
