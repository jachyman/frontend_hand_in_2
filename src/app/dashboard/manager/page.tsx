import DashboardLayout from '@/app/dashboard/layout';
import { managerLinks } from '@/app/dashboard/manager/nav-links-manager';

export default function ManagerDashboard() {
  return (
    <DashboardLayout links={managerLinks}>
      <h1 className="text-2xl font-bold">Welcome, Manager</h1>
      <p>this is a dashboard for a manager</p>
    </DashboardLayout>
  );
}
