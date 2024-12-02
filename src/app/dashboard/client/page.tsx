'use client';

import { getWorkoutPrograms, getCurrentUser } from "@/app/lib/api"
import { useState, useEffect } from 'react';
import WorkoutList from "@/app/ui/workout-list";

export default function ClientDashboard() {
 
    const [user, setUser] = useState<{ UserId: string; Name: string; Role: string; GroupId: string } | null>(null);
    const [error, setError] = useState('');
    const [workoutPlans, setWorkoutPlans] = useState<any[]>([]); // Flexible array

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
        const fetchData = async () => {
            // Fetch workout plans
            const workoutData = await getWorkoutPrograms();
            setWorkoutPlans(workoutData);
        };
        fetchData();
    }, []); // Run once on component mount

    if(!user) <p>Loading...</p>
    return (
        
        <div>
            <h1 className="text-2xl font-bold mb-4">Welcome back {user?.Name}</h1>
            <p className="mb-6">Here you can see all your workout plans and exercises.</p>
            <WorkoutList workouts={workoutPlans} />
        </div>
    );
}