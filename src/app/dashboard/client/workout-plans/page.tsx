'use client';

import { getWorkoutPrograms } from "@/app/lib/api"
import { useState, useEffect } from 'react';

export default function workoutPlans() {

    const [workoutPlans, setWorkoutPlans] = useState<any[]>([]); // Flexible array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userIdString = localStorage.getItem('userId'); // Retrieve from localStorage
                if (userIdString) {
                    const parsedUserId = JSON.parse(userIdString);
                    // Fetch workout plans
                    const workoutData = await getWorkoutPrograms(parsedUserId);
                    setWorkoutPlans(workoutData);
                }
            } catch (err) {
                const error = err as Error;
                //setError(error.message);
            }
        };
        fetchData();
    }, []); // Run once on component mount   

    return (
        <div>
            {workoutPlans.map((plan) => (
                <div key={plan.workoutProgramId}>
                    <h3>Name: {plan.name}</h3>
                    <p>Description: {plan.description}</p>
                </div>
            ))}
        </div>
    );
}