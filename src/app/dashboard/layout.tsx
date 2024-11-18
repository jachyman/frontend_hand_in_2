import TopBar from '@/app/ui/dashboard/top-bar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  links: { name: string; href: string }[];
}

export default function DashboardLayout({ children, links }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      {/* Pass links to TopBar */}
      <TopBar links={links} />
      <main className="flex-grow overflow-y-auto bg-gray-100 p-6 md:p-12">
        {children}
      </main>
    </div>
  );
}
