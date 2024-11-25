import {jwtDecode} from 'jwt-decode'; // Install jwt-decode library

type JwtPayload = {
  Role: string; // Add other fields if needed
};

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
