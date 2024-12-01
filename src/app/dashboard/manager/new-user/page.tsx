'use client';

import { useEffect, useMemo, useState } from 'react';
import AddUserForm from '@/app/ui/dashboard/add-user-form';
import { getUsers, getCurrentUser } from '@/app/lib/api';

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
  const [user, setUser] =  useState<{ UserId: string; Name: string; Role: string; GroupId: string } | null>(null);

  
  // get current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser); // Save the user data in state
      } catch (err: any) {
        setError(err.message); // Handle any errors
      }
    };

    fetchUser(); // Call the function when the component mounts
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
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

  // Memoized role and personalTrainerId
  const role = useMemo(() => user?.Role || '', [user]);
  const personalTrainerId = useMemo(() => user?.UserId || '', [user]);
  
  // Add the new user to the existing list
  const handleUserAdded = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]); 
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if(!user) return <p>Loading...</p>

  return (
    <div className="p-6">
      {/* Add User Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
         <AddUserForm onUserAdded={handleUserAdded} role = {role}  personalTrainerId={personalTrainerId} />
      </div>
    </div>
  );
}
