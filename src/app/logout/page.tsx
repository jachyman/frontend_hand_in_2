'use client';

import { useRouter } from 'next/navigation';

export default function useLogout() {
  const router = useRouter();

  const logout = () => {
    // Clear the auth token from localStorage
    localStorage.removeItem('authToken');

    // Redirect to the login page
    router.push('/dashboard/log-in');
  };

  return logout;
}
