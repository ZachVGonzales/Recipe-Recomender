import apiClient from './apiClient';


apiClient.interceptors.response.use(
  response => response,
  error => {
    // Log detailed error information
    if (error.response) {
      // The request was made, and the server responded with a status code
      console.error("Error Data:", error.response.data);
      console.error("Error Status:", error.response.status);
      console.error("Error Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error("Error Request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error Message:", error.message);
    }
    return Promise.reject(error);
  }
);


export async function login(username: string, password: string): Promise<string | null> {
  try {
    const response = await fetch("http://localhost:8080/api/login/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ username, password }).toString(),
    });

    if (response.ok) {
      return await response.text();
    } else {
      console.error("Signup failed:", await response.text());
      return null;
    }
  } catch (error) {
    console.error("Error during signup:", error);
    return null;
  }
}



export async function signup(username: string, password: string): Promise<string | null> {
  try {
    const response = await fetch("http://localhost:8080/api/login/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ username, password }).toString(),
    });

    if (response.ok) {
      return await response.text();
    } else {
      console.error("Signup failed:", await response.text());
      return null;
    }
  } catch (error) {
    console.error("Error during signup:", error);
    return null;
  }
}