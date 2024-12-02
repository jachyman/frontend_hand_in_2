'use client';

import { useState, useEffect } from 'react';
import ExcercisesList from './dashboard/excersice-list';


export default function WorkoutList({
    workouts = [],
  }: {
    workouts?: { groupId: number, workoutProgramId: string; name: string; description: string, exercises: [], personalTrainerId: number}[];
    }) {
    
    const [selectedWorkout, setSelectedWorkout] = useState(workouts[0]); // Default to the first workout
    const [hoveredWorkoutId, setHoveredWorkoutId] = useState<string | null>(null); // Track the hovered workout
    
    return (
        <div style={styles.container}>
            
            {/* left side workout list */}
            <div style={styles.firstQuarter}>
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
 
            {/* right side excercises list */}
            <div style={styles.threeQuartes}>
                <ExcercisesList exercises={selectedWorkout?.exercises || []} />
            </div>
      </div>
    );
}
  
const styles = {
    container: {
        display: 'flex'
    },
    firstQuarter: {
        flex: '1',
        backgroundColor: 'silver',  
    },
    threeQuartes: {
        flex: '3',
    }
  };