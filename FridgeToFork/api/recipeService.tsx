const API_SEARCH_NAMES = "http://localhost:8080/api/recipes/search/name";
const API_SEARCH_INGREDIENTS = "http://localhost:8080/api/recipes/search/ingredients";
const API_LIST = "http://localhost:8080/api/recipes/list"

export const fetchRecipes = async () => {
  try {
    const response = (await fetch(API_LIST)).json();
    return response;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const searchRecipesName = async (query: string) => {
  try {
    const response = (await fetch(API_SEARCH_NAMES)).json();
    return response;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

export const searchRecipesIngredients = async (query: string) => {
  try {
    const response = (await fetch(API_SEARCH_INGREDIENTS)).json();
    return response;
  } catch (error) {
    console.error('Ingredient Search Error:', error);
    throw error;
  }
}
