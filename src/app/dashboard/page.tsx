import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // Example: Direct managers to the manager dashboard. Adjust logic as needed.
  redirect('/dashboard/manager');
}
