'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/app/lib/api';
import { User } from '../../lib/definitions';
import { homeLinks } from '@/app/dashboard/navLinksHome';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    personalTrainerId: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  //const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {};
  const handleSubmit = (e: any) => {
    e.preventDefault();

    setError('');
    
    // Normally, here you would send the form data to your server for processing.
    console.log('Form Data Submitted:', formData);
    
    // Clear the form after submission
    setFormData({ firstName: '', lastName: '', personalTrainerId: '', email: '', password: '' });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
    
      <form onSubmit={handleSubmit} className="space-y-3">
        <h1 className="text-2xl">Sign up</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          {isLoading ? 'Signing up...' : 'Sign up'}
        </button>
        </form>
      </div>
  );
}
