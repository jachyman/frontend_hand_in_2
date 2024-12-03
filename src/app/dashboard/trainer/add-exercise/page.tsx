"use client";
import { useEffect, useState } from "react";
import { getWorkoutProgramsTrainer, addExerciseToWorkoutProgram } from "@/app/lib/api";

interface Exercise {
  name: string;
  description: string;
  sets: number;
  repetitions: number | 0; 
  time: string | ""; 
}

interface WorkoutProgram {
  workoutProgramId: number;
  name: string;
}

export default function AddExercise() {
  const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null);
  const [exercise, setExercise] = useState<Exercise>({
    name: "",
    description: "",
    sets: 1,
    repetitions: 0,
    time: "", 
  });
  const [inputMode, setInputMode] = useState<"Repetitions" | "Time">("Repetitions");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  useEffect(() => {
    const fetchWorkoutPrograms = async () => {
      try {
        const data = await getWorkoutProgramsTrainer();
        setWorkoutPrograms(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      }
    };
    fetchWorkoutPrograms();
  }, []);

  // add exercise
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProgramId) {
      setError("Please select a workout program.");
      return;
    }

    if (inputMode === "Repetitions" && exercise.repetitions === null) {
      setError("Please enter repetitions.");
      return;
    }

    if (inputMode === "Time" && (exercise.time === null || exercise.time.trim() === "")) {
      setError("Please enter time.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await addExerciseToWorkoutProgram(selectedProgramId, exercise);
      setSuccess("Exercise added successfully!");
      setExercise({
        name: "",
        description: "",
        sets: 1,
        repetitions: 0,
        time: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add exercise.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Add New Exercise</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      
      <div className="mb-4">
        <label htmlFor="workoutProgram" className="block text-sm font-medium">
          Select Workout Program
        </label>
        <select
          id="workoutProgram"
          className="w-full p-2 border rounded"
          value={selectedProgramId || ""}
          onChange={(e) => setSelectedProgramId(Number(e.target.value))}
        >
          <option value="">Select a workout program</option>
          {workoutPrograms.map((program) => (
            <option key={program.workoutProgramId} value={program.workoutProgramId}>
              {program.name}
            </option>
          ))}
        </select>
      </div>

      {/* Form to add a new exercise */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="exerciseName" className="block text-sm font-medium">
            Exercise Name
          </label>
          <input
            type="text"
            id="exerciseName"
            className="w-full p-2 border rounded"
            value={exercise.name}
            onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="exerciseDescription" className="block text-sm font-medium">
            Exercise Description
          </label>
          <textarea
            id="exerciseDescription"
            className="w-full p-2 border rounded"
            value={exercise.description}
            onChange={(e) =>
              setExercise({ ...exercise, description: e.target.value })
            }
            required
          />
        </div>

<div>
  <label htmlFor="sets" className="block text-sm font-medium">
    Sets
  </label>
  <input
    type="number"
    id="sets"
    className="w-full p-2 border rounded"
    value={exercise.sets !== null ? exercise.sets : ""} 
    onChange={(e) => {
      const value = e.target.value;
      setExercise({ 
        ...exercise, 
        sets: value === "" ? 1 : Number(value) 
      });
    }}
    min={1}
    required
  />
</div>


        <div>
          <label htmlFor="inputMode" className="block text-sm font-medium">
            Input Mode
          </label>
          <select
            id="inputMode"
            className="w-full p-2 border rounded"
            value={inputMode}
            onChange={(e) => {
              const mode = e.target.value as "Repetitions" | "Time";
              setInputMode(mode);

              if (mode === "Repetitions") {
                setExercise({ ...exercise, repetitions: 1, time: "" });
              } else {
                setExercise({ ...exercise, repetitions: 0, time: "" });
              }
            }}
          >
            <option value="Repetitions">Repetitions</option>
            <option value="Time">Time</option>
          </select>
        </div>

        {inputMode === "Repetitions" ? (
          <div>
            <label htmlFor="repetitions" className="block text-sm font-medium">
              Repetitions
            </label>
            <input
              type="number"
              id="repetitions"
              className="w-full p-2 border rounded"
              value={exercise.repetitions || ""}
              onChange={(e) =>
                setExercise({ ...exercise, repetitions: Number(e.target.value) })
              }
              min={1}
              required
            />
          </div>
        ) : (
          <div>
            <label htmlFor="time" className="block text-sm font-medium">
              Time
            </label>
            <input
              type="text"
              id="time"
              className="w-full p-2 border rounded"
              value={exercise.time || ""}
              onChange={(e) => setExercise({ ...exercise, time: e.target.value })}
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Adding Exercise..." : "Add Exercise"}
        </button>
      </form>
    </div>
  );
}
