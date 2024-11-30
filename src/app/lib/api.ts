import {jwtDecode} from 'jwt-decode'; // Install jwt-decode library
import { number } from 'zod';
import { useEffect } from "react"
//import { cookies } from 'next/headers'
import { useState } from 'react';

type JwtPayload = {
  Role: string; // Add other fields if needed
};

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

  localStorage.setItem('userId', JSON.stringify(userId));
  //console.log('UserId:', userId);

  return { token: data.jwt, role: decoded.Role };
}

export async function getWorkoutPrograms(UserId: number): Promise<any[]> {

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