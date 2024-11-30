'use client';

import { useEffect, useState } from 'react';
import AddUserForm from '@/app/ui/dashboard/add-user-form';
import { getClients } from '@/app/lib/api';

interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
}

export default function AddUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getClients();
        const transformedUsers = data.map((user: any) => ({
          id: user.userId.toString(),
          name: user.firstName,
          surname: user.lastName,
          email: user.email, 
        }));
        setUsers(transformedUsers);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Add the new user to the existing list
  const handleUserAdded = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]); 
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      {/* Add User Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <AddUserForm onUserAdded={handleUserAdded} />
      </div>
    </div>
  );
}
