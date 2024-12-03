'use client';

import { useEffect, useState } from "react";
import { getUsers } from "@/app/lib/api";
import UserList from "@/app/ui/dashboard/users-listing";
import { generatePagination } from "@/app/lib/utils";
import Search from '@/app/ui/search';

interface UserListUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  accountType:string;
}

export default function ManagerDashboard() {
  const [users, setUsers] = useState<UserListUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserListUser[]>([]);
  const [paginatedUsers, setPaginatedUsers] = useState<UserListUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState(''); 

  const ITEM_PER_PAGE = 10;

  // Fetch users and initialize state
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        const transformedUsers = data.map((user: any) => ({
          id: user.userId.toString(),
          name: user.firstName,
          surname: user.lastName,
          email: user.email,
          accountType: user.accountType,
        }));
        setUsers(transformedUsers); // Set all users
        setFilteredUsers(transformedUsers); // Initialize filtered users
        setTotalPages(Math.ceil(transformedUsers.length / ITEM_PER_PAGE));
        setPaginatedUsers(transformedUsers.slice(0, ITEM_PER_PAGE));
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on the search query
  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.surname.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
    setTotalPages(Math.ceil(filtered.length / ITEM_PER_PAGE));
    setCurrentPage(1); // Reset to page 1 when the query changes
  }, [query, users]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEM_PER_PAGE;
    const endIndex = startIndex + ITEM_PER_PAGE;
    setPaginatedUsers(filteredUsers.slice(startIndex, endIndex));
  }, [currentPage, filteredUsers]);

  const handleSearch = (term: string) => {
    setQuery(term);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Manager Dashboard</h1>
      <p className="mb-6">Below is the list of users.</p>

      {/* Search Bar */}
      <div className="mb-4">
        <Search placeholder="Search users..." handleSearch={handleSearch} />
      </div>


      {paginatedUsers.length > 0 ? (
        <>
          <UserList users={paginatedUsers} />


          <div className="flex items-center justify-center mt-4 space-x-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
              }`}
            >
              &larr; Previous
            </button>

            <select
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="px-4 py-2 border rounded bg-white text-gray-700"
            >
              {Array.from({ length: totalPages }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  Page {index + 1}
                </option>
              ))}
            </select>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
              }`}
            >
              Next &rarr;
            </button>
          </div>
        </>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
