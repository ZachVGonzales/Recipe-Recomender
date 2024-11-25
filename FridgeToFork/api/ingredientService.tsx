// api/recipeService.ts
import apiClient from './apiClient';




export const fetchIngredient = async () => {
  try {
    const response = await apiClient.get('/ingredients/list');
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    throw error;
  }
};

export const searchIngredientName = async (query: string) => {
  try {
    const response = await apiClient.get(`/ingredients/search_name?name=${query}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};