// api/recipeService.ts
import apiClient from './apiClient';


export async function add_ingredient(xref_id: string, token: string): Promise<boolean> {
  try {
    const response = await fetch("http://localhost:8080/api/add_ingredient/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ xref_id, token }).toString(),
    });

    if (response.ok) {
      return true;
    } else {
      console.error("Login failed:", await response.text());
      return false;
    }
  } catch (error) {
    console.error("Error during login:", error);
    return false;
  }
}


export async function deleteUserIngredient(token: string, id: number) {
  try {
    const response = await apiClient.post('/user_ingredients/delete', null, {
      params: { token, id },
    });
    console.log(response.status)
    return response.data
  } catch (error) {
    console.error("error deleting ingredient:", error);
  }
}


export async function listUserIngredients(token: string) {
  try {
    const response = await apiClient.get('/user_ingredients/list', {
      headers: {
        "Content-Type": "application/json",
      },
      params: { token },
    });
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching user ingredients !!!!:', error);
    throw error;
  }
} 

