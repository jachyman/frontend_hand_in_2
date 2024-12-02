import {jwtDecode} from 'jwt-decode'; // Install jwt-decode library
import { User } from './definitions';
import { number } from 'zod';
import { useEffect } from "react"
//import { cookies } from 'next/headers'
import { useState } from 'react';

type JwtPayload = {
  UserId: string;
  Name:string;
  Role: string;
  GroupId: string;
};

export async function getCurrentUser(): Promise<{
  UserId: string;
  Name: string;
  Role: string;
  GroupId: string;
}> {
  // Ensure this only runs on the client
  if (typeof window === "undefined") {
    throw new Error("getCurrentUser must only be called on the client side.");
  }

  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No token found. Please log in first.");
  }

  // Decode the JWT to extract user details
  const decoded: JwtPayload = jwtDecode(token);
  console.log("Decoded:", decoded);

  if (!decoded.Role) {
    throw new Error("Role not found in the JWT.");
  }

  return {
    UserId: decoded.UserId,
    Name: decoded.Name,
    Role: decoded.Role,
    GroupId: decoded.GroupId,
  };
}
export async function getUsers():Promise<any[]> {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('No token found. Please log in first.');
    }

  const response = await fetch('https://swafe24fitness.azurewebsites.net/api/Users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }

  // Parse and return the JSON response
  const data = await response.json();
  return data; //list of users
}


export async function addExerciseToWorkoutProgram(
  selectedProgramId:number,
  newExercise: {
  name: string;
  description: string;
  sets: Number;
  repetitions: Number;
  time: string;
}){

  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No token found. Please log in first.');
  }

  const response = await fetch(`https://swafe24fitness.azurewebsites.net/api/Exercises/Program/${selectedProgramId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(newExercise),
  });

  if (!response.ok) {
    throw new Error(`Failed to add exercise to a workout program: ${response.statusText}`);
  }

  return response.json();
}


export async function getClients(): Promise<any[]> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error("No token found. Please log in first.");
  }

  const response = await fetch("https://swafe24fitness.azurewebsites.net/api/Users/Clients", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch clients: ${response.statusText}`);
  }

  const data = await response.json();
  return data; // List of clients
}


export async function addUser(newUser: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  personalTrainerId: Number;
  accountType: string;
}) {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No token found. Please log in first.');
  }

  const response = await fetch('https://swafe24fitness.azurewebsites.net/api/Users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(newUser), // Correct structure for the payload
  });

  if (!response.ok) {
    throw new Error(`Failed to add user: ${response.statusText}`);
  }

  return response.json();
}

export async function getUserById(id: number): Promise<any> {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No token found. Please log in first.");
  }

  const response = await fetch(
    `https://swafe24fitness.azurewebsites.net/api/Users/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }

  // Parse and return the JSON response
  const data = await response.json();
  return data; // Return the user data
}


export async function login(email: string, password: string): Promise<{ token: string; role: string }> {
  const response = await fetch('https://swafe24fitness.azurewebsites.net/api/Users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to login. Please check your credentials.');
  }

  const data = await response.json();

  if (!data.jwt) {
    throw new Error('JWT token not found in the response.');
  }

  //decode the JWT to extract the role
  /*
  const decoded: JwtPayload = jwtDecode(data.jwt);
  console.log('Decoded:', decoded);
  if (!decoded.Role) {
    throw new Error('Role not found in the JWT.');
  }
  */

  const decoded: JwtPayload & { UserId?: string; Role?: string } = jwtDecode(data.jwt); // Add type for custom fields
  console.log('Decoded:', decoded);

  if (!decoded.Role) {
      throw new Error('Role not found in the JWT.');
  }

  const userId = decoded.UserId; // Retrieve the UserId
  if (!userId) {
      throw new Error('UserId not found in the JWT.');
  }

  //localStorage.setItem('userId', JSON.stringify(userId));
  //console.log('UserId:', userId);

  return { token: data.jwt, role: decoded.Role };
}

export async function getWorkoutProgramsById(UserId: number): Promise<any[]> {

  const token = localStorage.getItem('authToken');
  if (!token) {
      throw new Error('No token found. Please log in first.');
  }

  const response = await fetch('https://swafe24fitness.azurewebsites.net/api/WorkoutPrograms/client/' + UserId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch workout programs: ${response.statusText}`);
  }

  // Parse and return the JSON response
  const data = await response.json();
  return data; //list of users
}

export async function getWorkoutPrograms(): Promise<any[]> {

  const token = localStorage.getItem('authToken');
  if (!token) {
      throw new Error('No token found. Please log in first.');
  }

  const response = await fetch('https://swafe24fitness.azurewebsites.net/api/WorkoutPrograms', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch workout programs: ${response.statusText}`);
  }

  // Parse and return the JSON response
  const data = await response.json();
  return data; //list of users
}

export async function getWorkoutProgramsTrainer(): Promise<any[]> {
  const token = localStorage.getItem('authToken');
  if (!token) {
      throw new Error('No token found. Please log in first.');
  }

  const response = await fetch('https://swafe24fitness.azurewebsites.net/api/WorkoutPrograms/trainer', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch workout programs: ${response.statusText}`);
  }

  // Parse and return the JSON response
  const data = await response.json();
  return data; //list of users
}