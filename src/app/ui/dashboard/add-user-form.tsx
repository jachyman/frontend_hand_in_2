import { useState } from 'react';
import { addUser } from '@/app/lib/api';

interface AddUserFormProps {
  onUserAdded: (user: any) => void;
  role: string; // Accept the role as a prop
  personalTrainerId: string; // Accept personalTrainerId as a prop
}

export default function AddUserForm({
  onUserAdded,
  role,
  personalTrainerId,
}: AddUserFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Automatically set accountType based on role
  const accountType = role === 'PersonalTrainer' ? 'Client' : 'PersonalTrainer';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Use role and personalTrainerId in the API call
      const newUser = await addUser({
        firstName,
        lastName,
        email,
        password,
        personalTrainerId: Number(personalTrainerId), 
        accountType,
      });

      // Notify the parent component about the new user
      onUserAdded({
        id: newUser.userId.toString(),
        name: newUser.firstName,
        surname: newUser.lastName,
        email: newUser.email,
        accountType: newUser.accountType,
        personalTrainerId: newUser.personalTrainerId,
      });

      // Reset form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Failed to add user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        {loading ? 'Adding...' : 'Add User'}
      </button>
    </form>
  );
}
