'use client';

import { table } from "console";

export default function ExcercisesList({
    exercises = [],
  }: {
    exercises?: { exerciseId: number, name: string; description: string, sets?: number, repetitions?: number, time?: string}[];
    }) {
    
    return (
        <table style={styles.table}>
            <thead>
                <tr>
                    <th style={{ border: '2px solid black', padding: '8px', width: '30%' }}>Name</th>
                    <th style={{ border: '2px solid black', padding: '8px', width: '50%' }}>Description</th>
                    <th style={{ border: '2px solid black', padding: '8px', width: '10%' }}>Sets</th>
                    <th style={{ border: '2px solid black', padding: '8px', width: '10%' }}>Reps/Time</th>
                </tr>
            </thead>
            <tbody>
            {exercises.map((exercise) => (
                <tr key={exercise.exerciseId}>
                    <td style={styles.cell}>{exercise.name}</td>
                    <td style={styles.cell}>{exercise.description}</td>
                    <td style={styles.cell}>{exercise.sets}</td>
                    <td style={styles.cell}>
                        {exercise.repetitions !== 0 ? exercise.repetitions : exercise.time || 'ERR'}</td>
                </tr>
            ))} 
            </tbody>
        </table>
        )
}
    
const styles = {
    table: {
        width: '1002'
    },
    cell: {
        border: '1px solid black',
    }
}