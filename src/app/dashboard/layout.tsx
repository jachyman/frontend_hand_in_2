"use client";
import TopBar from '@/app/ui/dashboard/top-bar';
import { usePathname } from 'next/navigation';
import { managerLinks } from '@/app/dashboard/manager/nav-links-manager';
import { clientLinks } from '@/app/dashboard/clients/nav-links-client';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Determine user role and provide the right links dynamically
  const userLinks = getUserLinks(); // Custom function to fetch links based on role

  return (
    <div className="flex flex-col h-screen">
      <TopBar links={userLinks} /> 
      <main className="flex-grow overflow-y-auto bg-gray-100 p-6 md:p-12">
        {children}
      </main>
    </div>
  );
}


function getUserLinks() {
  const pathname = usePathname(); // Get current route
  if (pathname.startsWith('/dashboard/manager')) {
    return managerLinks; // Import these from `nav-links-manager`
  } 
  if(pathname.startsWith('/dashboard/client')){
    return clientLinks;
  }
  // do the same for client, personal trainer etc... 
  return [];
}
