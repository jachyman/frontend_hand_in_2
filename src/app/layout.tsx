"use client";

import '@/app/ui/global.css';
import TopBar from '@/app/ui/dashboard/top-bar';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/app/lib/api';
import { homeLinks } from '@/app/dashboard/navLinksHome';
import { managerLinks } from '@/app/dashboard/manager/nav-links-manager';
import { clientLinks } from '@/app/dashboard/client/nav-links-client';
import { trainerLinks } from '@/app/dashboard/trainer/nav-links-trainer';
import HomePage from './page';

interface Link {
  name: string;
  href: string;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<Link[]>(homeLinks); // Default to homeLinks
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{
    UserId: string;
    Name: string;
    Role: string;
    GroupId: string;
  } | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const fetchUserAndSetLinks = async () => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      setLinks(homeLinks);
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (currentUser?.Role === 'PersonalTrainer') {
        setLinks(trainerLinks);
        if (pathname === '/') router.replace('/dashboard/trainer');
      } else if (currentUser?.Role === 'Manager') {
        setLinks(managerLinks);
        if (pathname === '/') router.replace('/dashboard/manager');
      } else if (currentUser?.Role === 'Client') {
        setLinks(clientLinks);
        if (pathname === '/') router.replace('/dashboard/client');
      } else {
        setLinks(homeLinks);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setLinks(homeLinks);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAndSetLinks();

    const handleAuthChange = () => {
      fetchUserAndSetLinks();
    };

    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
    };
  }, [pathname]);

  if (loading) {
    return (
      <html lang="en">
        <body>
          <p>Loading...</p>
        </body>
      </html>
    );
  }

  if (pathname === '/log-in') {
    return (
      <html lang="en">
        <body className="flex flex-col h-screen">
          <TopBar links={homeLinks} /> {/* Render Home Links */}
          <main className="flex-grow overflow-y-auto bg-gray-100 p-6 md:p-12">{children}</main>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <TopBar links={links} />
        <main className="flex-grow overflow-y-auto bg-gray-100 p-6 md:p-12">
          {user ? children : <HomePage />}
        </main>
      </body>
    </html>
  );
}
