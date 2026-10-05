'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './CartProvider';

const links = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/cart', label: 'Cart' },
  { href: '/checkout', label: 'Checkout' },
];

export default function Navigation() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <Link href="/" className="brand">🍋 NextLemonade</Link>
        <div className="nav-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? 'nav-link active' : 'nav-link'}
            >
              {link.label}
              {link.href === '/cart' && itemCount > 0 ? ` (${itemCount})` : ''}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
