"use client";
// change the code
import React from "react";
import { useRouter } from "next/navigation"; 

const AddUserManager = () => {
  const router = useRouter(); 

  const users = [
    "John Doe",
    "Jane Smith",
    "Emily Johnson",
    "Michael Brown",
  ]; 

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Sidebar */}
      <div style={{ width: "20%", backgroundColor: "#333", color: "#fff", padding: "20px" }}>
        <h2 style={{ color: "#fff" }}>Add User - Manager</h2>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div
          style={{
            backgroundColor: "#d3d3d3",
            padding: "10px 20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ color: "#000" }}>Users</h3>
          <div style={{ display: "flex", gap: "20px" }}>
            <a
              href="#"
              style={{ textDecoration: "none", color: "#000", cursor: "pointer" }}
              onClick={() => router.push("/users-dashboard")} // Redirect to Users Dashboard
            >
              Users
            </a>
            <a href="#" style={{ textDecoration: "none", color: "#000" }}>
              Profile
            </a>
          </div>
        </div>

        {/* Main Body */}
        <div style={{ flex: 1, padding: "20px", backgroundColor: "#fff" }}>
          <h4 style={{ marginBottom: "10px", color: "#000" }}>Users:</h4>
          <div
            style={{
              backgroundColor: "#e0e0e0",
              padding: "20px",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            {users.length > 0 ? (
              <ul style={{ margin: 0, padding: 0, listStyle: "none", color: "#000" }}>
                {users.map((user, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "10px",
                      color: "#000",
                    }}
                  >
                    {user}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "#000" }}>No users found</p>
            )}
          </div>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#d3d3d3",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              color: "#000", 
            }}
            onClick={() => alert("Add a new user clicked")} 
          >
            Add a new user
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserManager;
