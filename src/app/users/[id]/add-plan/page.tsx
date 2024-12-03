'use client'

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/app/lib/api';
import AddWorkoutProgramForm from '@/app/ui/dashboard/add-workout-program-form';


export default function AddPlanPage() {
    const params = useParams(); // Get dynamic route params
    const router = useRouter();
    const { id } = params;

    const [currentUser, setCurrentUser] = useState<{ UserId: string; Name: string; Role: string; GroupId: string } | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCurrent = async () => {
          try {
            const current = await getCurrentUser();
            setCurrentUser(current); 
          } catch (err: any) {
            setError(err.message);
          }
        };
        fetchCurrent(); 
    }, []);
    
    const handlePlanAdded = () => {
        console.log("Plan added");
    };

    if (typeof id !== 'string') {
        return
    }

  return (
    <div>
          <h1>Create a Plan for User ID: {id}</h1>
          <AddWorkoutProgramForm
              onWorkoutProgramAdded={handlePlanAdded}
              clientId={typeof id !== 'string' ? 'no client id' : id}
              personalTrainerId={typeof currentUser?.UserId !== 'string' ? 'no trainer id' : currentUser.UserId} />
    </div>
  );
}