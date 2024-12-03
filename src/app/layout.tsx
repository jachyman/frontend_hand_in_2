"use client";

import '@/app/ui/global.css';
import TopBar from '@/app/ui/dashboard/top-bar';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { homeLinks } from '@/app/dashboard/navLinksHome';
import { managerLinks } from '@/app/dashboard/manager/nav-links-manager';
import { clientLinks } from '@/app/dashboard/client/nav-links-client';
import { trainerLinks } from '@/app/dashboard/trainer/nav-links-trainer';
import { getCurrentUser } from '@/app/lib/api';

interface Link {
  name: string;
  href: string;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<Link[]>(homeLinks); // Default to homeLinks
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const pathname = usePathname(); 

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const currentUser = await getCurrentUser();
        setCurrentUserRole(currentUser.Role);
      } catch (err) {
        console.error("Error fetching user role:", err);
        setCurrentUserRole(null); // Default to null if error occurs
      }
    };

    fetchUserRole();
  }, []); // Only run once

  useEffect(() => {
    // Dynamically determine top bar links based on pathname and user role
    const determineLinks = () => {
      if (pathname === '/' || pathname === '/log-in') {
        setLinks(homeLinks);
      } else if (pathname.startsWith('/dashboard/manager')) {
        setLinks(managerLinks);
      } else if (pathname.startsWith('/dashboard/trainer')) {
        setLinks(trainerLinks);
      } else if (pathname.startsWith('/dashboard/client')) {
        setLinks(clientLinks);
      } else if (pathname.startsWith('/users/') && currentUserRole) {
        if (currentUserRole === 'Manager') {
          setLinks(managerLinks);
        } else if (currentUserRole === 'PersonalTrainer') {
          setLinks(trainerLinks);
        } else if (currentUserRole === 'Client') {
          setLinks(clientLinks);
        } else {
          setLinks(homeLinks); 
        }
      } else {
        setLinks(homeLinks); // Default fallback
      }
    };

    determineLinks();
  }, [pathname, currentUserRole]); // Re-run whenever pathname or role changes

  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <TopBar links={links} />

        <main className="flex-grow overflow-y-auto bg-gray-100 p-6 md:p-12">
          {children}
        </main>
      </body>
    </html>
  );
}
