import {jwtDecode} from 'jwt-decode'; // Install jwt-decode library
import { User } from './definitions';

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
  const decoded: JwtPayload = jwtDecode(data.jwt);
  console.log('Decoded:', decoded);
  if (!decoded.Role) {
    throw new Error('Role not found in the JWT.');
  }

  return { token: data.jwt, role: decoded.Role };
}
