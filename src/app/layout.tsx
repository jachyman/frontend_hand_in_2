"use client";

import '@/app/ui/global.css';
import TopBar from '@/app/ui/dashboard/top-bar';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/app/lib/api';
import { homeLinks } from '@/app/dashboard/navLinksHome';
import { managerLinks } from '@/app/dashboard/manager/nav-links-manager';
import { clientLinks } from '@/app/dashboard/client/nav-links-client';
import { trainerLinks } from '@/app/dashboard/trainer/nav-links-trainer';

interface Link {
  name: string;
  href: string;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<Link[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndSetLinks = async () => {
      try {
        const currentUser = await getCurrentUser();

        // Set links based on the user's role
        if (currentUser.Role === 'PersonalTrainer') {
          setLinks(trainerLinks);
        } else if (currentUser.Role === 'Manager') {
          setLinks(managerLinks);
        } else if (currentUser.Role === 'Client') {
          setLinks(clientLinks);
        } else {
          setLinks(homeLinks); 
        }
      } catch (error) {
        console.error('Error fetching user or setting links:', error);
        setLinks(homeLinks); 
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndSetLinks();
  }, []);

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <TopBar links={links} /> {/* Render TopBar once here */}
        <main className="flex-grow overflow-y-auto bg-gray-100 p-6 md:p-12">
          {children}
        </main>
      </body>
    </html>
  );
}
