"use client";

import React from "react";
import { useRouter } from "next/navigation"; 

const ManagerDashboard = () => {
  const router = useRouter(); 
  const managerEmail = "manager@example.com"; 

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Sidebar */}
      <div style={{ width: "20%", backgroundColor: "#333", color: "#fff", padding: "20px" }}>
        <h2>Manager dashboard</h2>
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
          <h3>
            Hello, <span style={{ fontWeight: "normal" }}>*manager name*</span>
          </h3>
          <div style={{ display: "flex", gap: "20px" }}>
            <a
              href="#"
              style={{ textDecoration: "none", color: "#000", cursor: "pointer" }}
              onClick={() => router.push("/manager/users")} // Redirect to Users page
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
          <div>
            <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>
              Email:
            </label>
            <p style={{ fontSize: "16px", color: "#555", margin: "0" }}>{managerEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
