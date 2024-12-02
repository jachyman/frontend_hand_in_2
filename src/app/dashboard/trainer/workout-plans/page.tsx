'use client';

import { getWorkoutPrograms, getWorkoutProgramsTrainer } from "@/app/lib/api"
import { useState, useEffect } from 'react';
import WorkoutList from "@/app/ui/workout-list";

export default function workoutPlans() {

    const [workoutPlans, setWorkoutPlans] = useState<any[]>([]); // Flexible array
    
    useEffect(() => {
        const fetchData = async () => {
            // Fetch workout plans
            const workoutData = await getWorkoutProgramsTrainer();
            setWorkoutPlans(workoutData);
        };
        fetchData();
    }, []); // Run once on component mount

    return (
        <div>
            <WorkoutList workouts={workoutPlans} />
        </div>
    );
}