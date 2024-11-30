import { redirect } from 'next/navigation';

export default function ClientDashboard() {
  return (
    redirect('/dashboard/client/workout-plans')
  );
}
