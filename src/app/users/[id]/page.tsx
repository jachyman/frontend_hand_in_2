"use client"; 

import { useParams } from "next/navigation"; 
import { useEffect, useState } from "react";
import { getUserById, getCurrentUser, getWorkoutProgramsById } from "@/app/lib/api"; 
import { managerLinks } from '@/app/dashboard/manager/nav-links-manager';
import { trainerLinks } from '@/app/dashboard/trainer/nav-links-trainer';
import WorkoutList from "@/app/ui/workout-list";
import { useRouter } from 'next/navigation';


interface Link {
    name: string;
    href: string;
  }

export default function UserDetails() {
  const { id } = useParams(); // for dynamic routing
  const [user, setUser] = useState<any>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState<{ UserId: string; Name: string; Role: string; GroupId: string } | null>(null);

  const [currentUserWorkoutProgram, setcurrentUserWorkoutProgram] = useState<any[]>([])

  const router = useRouter();

  const handleAddWorkoutPlanClick = () => {
    // Navigate to the desired page
    router.push(`/users/${id}/add-plan`);
  };

  // get current user
  useEffect(() => {
    const fetchCurrent = async () => {
      try {
        const current = await getCurrentUser();
        if (current.Role === "Trainer") {
            setLinks(trainerLinks);
          } else if (current.Role === "Manager") {
            setLinks(managerLinks);
          } 
        setCurrentUser(current); 
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchCurrent(); 
  }, []);

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

  useEffect(() => {
    if (!id) return;

    const fetchUserWorkoutPrograms = async () => {
      try {
        const data = await getWorkoutProgramsById(Number(id));
        setcurrentUserWorkoutProgram(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserWorkoutPrograms();
  }, [id]);


  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>Error: {error}</p>;
  if(!currentUser) return <p>Loading...</p>
  if(!currentUserWorkoutProgram) return <p>Loading...</p>
  
  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      {user ? (
        <div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <p><strong>ID:</strong> {user.userId}</p>
            <p><strong>Name:</strong> {user.firstName}</p>
            <p><strong>Surname:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Account Type:</strong> {user.accountType}</p>
            <p><strong>Personal Trainer ID:</strong> {user.personalTrainerId}</p>
          </div>

          <div className="flex justify-between items-center mt-5 mb-4">
            <h1 className="mt-5 text-2xl font-bold mb-4">{user.firstName}'s workout plans:</h1>
            {currentUser.Role !== "Manager" && (
              <button
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                onClick={handleAddWorkoutPlanClick}>
                Add New Workout Plan
              </button> 
            )}
          </div>
          <WorkoutList workouts={currentUserWorkoutProgram} />
        </div>
      ) : (
        <p>No user data found.</p>
      )}

    </div>
  );
}
