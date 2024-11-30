import { useState } from 'react';
import { addUser } from '@/app/lib/api';
import { redirect } from 'next/navigation' ;

export default function AddUserForm({ onUserAdded }: { onUserAdded: (user: any) => void }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [personalTrainerId, setPersonalTrainerId] = useState(0); // Default value
  const [accountType, setAccountType] = useState('PersonalTrainer'); // Default value
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    

    try {
      const newUser = await addUser({
        firstName,
        lastName,
        email,
        password,
        accountType,
      });

      // Notify the parent component about the new user
      onUserAdded({
        id: newUser.userId.toString(), 
        name: newUser.firstName,
        surname: newUser.lastName,
        email: newUser.email,
      });

      // Reset form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPersonalTrainerId(0);
      setAccountType('PersonalTrainer');
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
      <div>
        <label className="block text-sm font-medium text-gray-700">Personal Trainer ID</label>
        <input
          type="number"
          value={personalTrainerId}
          onChange={(e) => setPersonalTrainerId(Number(e.target.value))}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Account Type</label>
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="PersonalTrainer">Personal Trainer</option>
          <option value="Client">Client</option>
        </select>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        //onSubmit={redirect('/dashboard/manager/')}
        className={`mt-2 w-full px-4 py-2 text-white rounded ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Adding...' : 'Add User'}
      </button>
    </form>
  );
}
