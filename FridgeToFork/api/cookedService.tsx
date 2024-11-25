// api/recipeService.ts
import apiClient from './apiClient';




export const getIngredientsByRecipeId = async (id: number) => {
  try {
    const response = await apiClient.get('/cooked/getIngredientsByRecipeID', {
      headers: {
        "Content-Type": "application/json",
      },
      params: { id },
    });
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching ingredients by recipe ID:', error)
    throw error;
  }
}

export async function add_recipe(xref_id: string, token: string): Promise<boolean> {
  try {
    const response = await fetch("http://localhost:8080/api/cooked/addRecipe", {
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