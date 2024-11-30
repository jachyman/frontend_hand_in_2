import React from "react";

interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
}

interface UserListProps {
  users: User[]; // Array of users to display
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl mx-auto border border-gray-200">
      {/* Table */}
      <div className="overflow-y-auto max-h-100">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-4 px-6 text-sm font-bold text-gray-600 uppercase tracking-wider">
                User ID
              </th>
              <th className="py-4 px-6 text-sm font-bold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="py-4 px-6 text-sm font-bold text-gray-600 uppercase tracking-wider">
                Surname
              </th>
              <th className="py-4 px-6 text-sm font-bold text-gray-600 uppercase tracking-wider">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`hover:bg-blue-50 transition duration-150 ease-in-out ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-4 px-6 text-sm text-gray-700 font-medium">
                  {user.id}
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">{user.name}</td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  {user.surname}
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
