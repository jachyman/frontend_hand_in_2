"use client"; // This marks the component as a client component

import { useParams } from "next/navigation"; // Correct hook for dynamic route params
import { useEffect, useState } from "react";
import { getUserById } from "@/app/lib/api"; // Adjust the path based on your structure

export default function UserDetails() {
  const { id } = useParams(); // Use useParams to get the dynamic route parameter
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const data = await getUserById(Number(id));
        setUser(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      {user ? (
        <div className="bg-white shadow-md p-6 rounded-lg">
          <p><strong>ID:</strong> {user.userId}</p>
          <p><strong>Name:</strong> {user.firstName}</p>
          <p><strong>Surname:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Account Type:</strong> {user.accountType}</p>
          <p><strong>Personal Trainer ID:</strong> {user.personalTrainerId}</p>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
}
