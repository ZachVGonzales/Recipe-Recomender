// api/recipeService.ts
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