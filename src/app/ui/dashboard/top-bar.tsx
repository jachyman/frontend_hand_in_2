'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function TopBar({ links = [] }: { links?: { name: string; href: string }[] }) {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
     
        <div className="text-white text-lg font-bold">Fitness Center</div>
        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-800 hover:text-white',
                {
                  'bg-gray-800 text-white': pathname === link.href,
                  'text-gray-400': pathname !== link.href,
                }
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
