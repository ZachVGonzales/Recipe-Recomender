

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
      console.error("Login failed:", await response.text());
      return null;
    }
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
}



export async function signup(username: string, password: string, name: string, email: string, favoriteFood: string, birthday: string): Promise<string | null> {
  try {
    const response = await fetch("http://localhost:8080/api/login/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ username, password, name, email, favoriteFood, birthday}).toString(),
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