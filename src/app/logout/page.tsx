'use client';

import { useRouter } from 'next/navigation';

export default function useLogout() {
  const router = useRouter();

  const logout = () => {
    // Clear the auth token from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    window.dispatchEvent(new Event('storage'));
    router.push('/');
  };  

  return logout;
}
