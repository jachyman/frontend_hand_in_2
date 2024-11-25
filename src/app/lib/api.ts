export async function login(email: string, password: string): Promise<string> {
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
  
    if (data.jwt) {
      return data.jwt;
    } else {
      throw new Error('JWT token not found in the response.');
    }
  }
  