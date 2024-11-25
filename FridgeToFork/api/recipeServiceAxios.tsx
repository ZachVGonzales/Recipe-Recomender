// api/recipeService.ts
import apiClient from './apiClient';

export const fetchRecipes = async () => {
  try {
    const response = await apiClient.get('/recipes/list');
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const searchRecipesName = async (query: string) => {
  try {
    const response = await apiClient.get(`/recipes/search_name?name=${query}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

export const searchRecipesIngredients = async (query: string) => {
  try {
    const response = await apiClient.get(`/recipes/search_ingredients?ingredients=${query}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

export async function generateUserIngredientSearch(token: string) {
  try {
    const response = await apiClient.get('/recipes/generateUserIngredientSearch', {
      headers: {
        "Content-Type": "application/json",
      },
      params: { token },
    });
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching generated recipe result', error);
    throw error;
  }
}