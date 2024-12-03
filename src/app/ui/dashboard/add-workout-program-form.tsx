import { useState } from 'react';
import { addWorkoutProgram } from '@/app/lib/api';

interface AddUserFormProps {
  onWorkoutProgramAdded: (user: any) => void;
  clientId: string; // Accept the role as a prop
  personalTrainerId: string; // Accept personalTrainerId as a prop
}

export default function AddWorkoutProgramForm({
  onWorkoutProgramAdded,
  clientId,
  personalTrainerId,
}: AddUserFormProps) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  let newWorkoutProgram

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Use role and personalTrainerId in the API call
      newWorkoutProgram = await addWorkoutProgram({
        name,
        description,
        exercises,
        personalTrainerId: Number(personalTrainerId), 
        clientId: Number(clientId),
      });
      //console.log(newWorkoutProgram)
      
      /*
      // Notify the parent component about the new user
      onWorkoutProgramAdded({
        workoutProgramId: newWorkoutProgram.userId.toString(),
        groupId: newWorkoutProgram.groupId.toString(),
        name: newWorkoutProgram.name,
        description: newWorkoutProgram.description,
        exercises: newWorkoutProgram.exercises,
        accountType: newWorkoutProgram.accountType,
        personalTrainerId: newWorkoutProgram.personalTrainerId,
      });
      */

      // Reset form fields
      setName('');
      setDescription('');
    } catch (err) {
      setError('Failed to add workout program.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className={`mt-2 w-full px-4 py-2 text-white rounded ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Adding...' : 'Add Workout Program'}
      </button>
    </form>
  );
}
