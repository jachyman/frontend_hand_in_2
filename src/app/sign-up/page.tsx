'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/app/lib/api';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { token, role } = await login(email, password);

      // Save the JWT token in localStorage 
      localStorage.setItem('authToken', token);

      // Redirect based on the user's role
      if (role === 'Manager') {
        router.push('/dashboard/manager');
      } else if (role === 'Client') {
        router.push('/dashboard/client');
      } else if( role === 'PersonalTrainer') {
        router.push('/dashboard/trainer')
      }
       else {
        throw new Error('Unknown role');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h1 className="text-2xl">Sign up</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
}
