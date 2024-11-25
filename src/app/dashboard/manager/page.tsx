'use client';

import { useEffect, useState } from "react";
import { getUsers } from "@/app/lib/api";
import { User } from "@/app/lib/definitions";

export default function ManagerDashboard() {
  const [users, setUsers] = useState<User[]>([]); // User[] means an array of User objects
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(); // Fetch the users
        setUsers(data); // Update the state with fetched users
      } catch (err) {
        const error = err as Error; 
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchUsers();
  }, []); // empty dependency array ensures this runs only once


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Manager Dashboard</h1>
      <p className="mb-6">Below is the list of users.</p>

      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                <th className="border border-gray-300 px-4 py-2 text-left">First Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Last Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Account Type</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.userId} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.firstName}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.lastName}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.accountType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
