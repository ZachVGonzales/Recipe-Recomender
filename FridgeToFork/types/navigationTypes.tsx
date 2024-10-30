// navigationTypes.ts
export type RootStackParamList = {
  find_recipes: undefined;           // The main recipe list screen
  recipe_details: { recipe: RecipeItem };  // Recipe details screen, expects a RecipeItem
};

// Define RecipeItem here or import it if already defined
export interface RecipeItem {
  id: number;
  name: string;
  minutes: number;
  description: string;
  instructions: string[];
  ingredients: string[];
}