'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import useLogout from '@/app/logout/page';
import { useEffect } from 'react';
import { homeLinks } from '@/app/dashboard/navLinksHome';

export default function TopBar({ links = [] }: { links?: { name: string; href: string }[] }) { //specifying that links should be an array and which attributes it needs to have 
  const pathname = usePathname(); // for highlighting inactive/active
  const logout = useLogout();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token && links[0].name != 'this_is_home') {
      router.push('/log-in');
    }
  }, [router]);

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
        
        {!(pathname.endsWith('/') || pathname.endsWith("/log-in")) && (
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
