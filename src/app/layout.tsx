"use client";

import '@/app/ui/global.css';
import TopBar from '@/app/ui/dashboard/top-bar';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { homeLinks } from '@/app/dashboard/navLinksHome';
import { managerLinks } from '@/app/dashboard/manager/nav-links-manager';
import { clientLinks } from '@/app/dashboard/client/nav-links-client';
import { trainerLinks } from '@/app/dashboard/trainer/nav-links-trainer';

interface Link {
  name: string;
  href: string;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<Link[]>(homeLinks); // Default to homeLinks
  const pathname = usePathname(); // Current route
  const [staticRendered, setStaticRendered] = useState(true);

  useEffect(() => {
    // Dynamically determine top bar links based on pathname
    const determineLinks = () => {
      if (pathname === '/' || pathname === '/log-in') {
        setLinks(homeLinks);
      } else if (pathname.startsWith('/dashboard/manager')) {
        setLinks(managerLinks);
      } else if (pathname.startsWith('/dashboard/trainer')) {
        setLinks(trainerLinks);
      } else if (pathname.startsWith('/dashboard/client')) {
        setLinks(clientLinks);
      } else {
        setLinks(homeLinks); // Default fallback
      }
    };

    determineLinks();
    setStaticRendered(true); // Ensure layout renders immediately
  }, [pathname]);

  // Render HTML and BODY tags while ensuring partial rendering
  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <TopBar links={links} />

        <main className="flex-grow overflow-y-auto bg-gray-100 p-6 md:p-12">
          {staticRendered ? children : <p>Loading...</p>}
        </main>
      </body>
    </html>
  );
}
