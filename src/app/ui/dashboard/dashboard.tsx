"use client";

import { useEffect, useState } from "react";
import UserList from "@/app/ui/dashboard/users-listing";
import Search from "@/app/ui/search";

interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
}

interface DashboardProps {
  fetchData: (token: string) => Promise<User[]>; // Allow fetchData to accept a token
  description?: string;
}

export default function Dashboard({ fetchData, description }: DashboardProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [paginatedUsers, setPaginatedUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No token found. Please log in first.");
        }

        const data = await fetchData(token); // Pass the token to fetchData
        setUsers(data);
        setFilteredUsers(data); // Initialize filtered users
        setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
        setPaginatedUsers(data.slice(0, ITEMS_PER_PAGE));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [fetchData]);

  // Handle filtering
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.surname.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
    setCurrentPage(1); // Reset to page 1 when query changes
  }, [query, users]);

  // Handle pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedUsers(filteredUsers.slice(startIndex, endIndex));
  }, [currentPage, filteredUsers]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
      {description && <p className="mb-6">{description}</p>}

      {/* Search Bar */}
      <div className="mb-4">
        <Search placeholder="Search users..." handleSearch={(term) => setQuery(term)} />
      </div>

      {/* User List */}
      {paginatedUsers.length > 0 ? (
        <>
          <UserList users={paginatedUsers} />

          {/* Pagination Controls */}
          <div className="flex items-center justify-center mt-4 space-x-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
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
                currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
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
