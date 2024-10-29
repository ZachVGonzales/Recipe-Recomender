import apiClient from './apiClient';

const API_SEARCH = "http://localhost:8080/api/recipes/search";
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

export const searchRecipes = async (query: string) => {
  try {
    const response = (await fetch(API_SEARCH)).json();
    return response;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};
