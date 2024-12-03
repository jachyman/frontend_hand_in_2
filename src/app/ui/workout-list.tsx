'use client';

import { useState, CSSProperties } from 'react';
import ExcercisesList from './dashboard/excersice-list';

export default function WorkoutList({
  workouts = [],
}: {
  workouts?: {
    groupId: number;
    workoutProgramId: string;
    name: string;
    description: string;
    exercises: [];
    personalTrainerId: number;
  }[];
}) {
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null); // Track the selected workout ID
  const [hoveredWorkoutId, setHoveredWorkoutId] = useState<string | null>(null); // Track the hovered workout

  const handleWorkoutClick = (workoutId: string) => {
    if (selectedWorkout === workoutId) {
      setSelectedWorkout(null); // Unselect if clicked again
    } else {
      setSelectedWorkout(workoutId); // Select the clicked workout
    }
  };

  const getSelectedWorkout = () => {
    return workouts.find((workout) => workout.workoutProgramId === selectedWorkout);
  };

  return (
    <div style={styles.container}>
      {/* Left side workout list */}
      <div style={styles.firstQuarter as CSSProperties}>
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <div
              key={workout.workoutProgramId}
              onClick={() => handleWorkoutClick(workout.workoutProgramId)}
              onMouseOver={() => setHoveredWorkoutId(workout.workoutProgramId)}
              onMouseOut={() => setHoveredWorkoutId(null)}
              style={{
                backgroundColor:
                  hoveredWorkoutId === workout.workoutProgramId
                    ? 'lightblue'
                    : selectedWorkout === workout.workoutProgramId
                    ? 'lightgreen'
                    : 'white',
                cursor: 'pointer',
                padding: '10px',
                marginBottom: '5px',
                border: '1px solid gray',
              }}
            >
              <h3>{workout.name}</h3>
            </div>
          ))
        ) : (
          <p style={{ padding: '20px', textAlign: 'center' }}>
            No workout plans assigned to this personal trainer
          </p>
        )}
      </div>

      {/* Right side exercise list */}
      <div style={styles.threeQuarters as CSSProperties}>
        {selectedWorkout ? (
          <ExcercisesList exercises={getSelectedWorkout()?.exercises || []} />
        ) : (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p>Select a workout to see the exercises</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
  },
  firstQuarter: {
    flex: '1',
    backgroundColor: 'silver',
    padding: '10px',
    overflowY: 'auto',
  },
  threeQuarters: {
    flex: '3',
    backgroundColor: '#f9f9f9',
    padding: '10px',
  },
};
