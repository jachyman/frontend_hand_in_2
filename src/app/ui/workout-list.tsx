'use client';

import { useState, useEffect } from 'react';


export default function WorkoutList({
    workouts = [],
  }: {
    workouts?: { exerciseId: number, groupId: number, workoutProgramId: string; name: string; description: string, repetitions: string,  time: string, personalTrainerId: number}[];
    }) {
    
    const [selectedWorkout, setSelectedWorkout] = useState(workouts[0]); // Default to the first workout
    const [hoveredWorkoutId, setHoveredWorkoutId] = useState<string | null>(null); // Track the hovered workout
    
    return (
        <div style={styles.halves}>
            
            <section>
            {/* left side workout list */}
            <div>
                {workouts.map((workout) => (
                    <div
                        key={workout.workoutProgramId}
                        onClick={() => setSelectedWorkout(workout)}
                        onMouseOver={() => setHoveredWorkoutId(workout.workoutProgramId)}
                        onMouseOut={() => setHoveredWorkoutId(null)}
                        style={{
                            backgroundColor:
                                hoveredWorkoutId === workout.workoutProgramId ? 'lightblue' : 'white',
                        }}
                    >
                        <h3>{workout.name}</h3>
                    </div>
            ))}
                </div>
            </section>

            <section>
            <div>
                {selectedWorkout ? (
                <>
                    <h2>Name: {selectedWorkout.name}</h2>
                    {/*
                    <p>Excercise ID: {selectedWorkout.exerciseId}</p>
                    <p>Group ID: {selectedWorkout.groupId}</p> 
                    <p>Workout Program ID: {selectedWorkout.workoutProgramId}</p>
                    */}
                    <p>Description: {selectedWorkout.description}</p>
                    <p>Repetitions: {selectedWorkout.repetitions}</p>
                    <p>Time: {selectedWorkout.time}</p>
                    <p>Personal Trainer ID: {selectedWorkout.personalTrainerId}</p>
                </>
                ) : (
                <p>Select a workout to see details.</p>
                )}
                </div>
            </section>
      </div>
    );
}
  
const styles = {

    halves: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        backgroundColor: 'silver',  
    },
  };