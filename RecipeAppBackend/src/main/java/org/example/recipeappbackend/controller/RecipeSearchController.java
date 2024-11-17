package org.example.recipeappbackend.controller;

import org.example.recipeappbackend.entity.Recipe;
import org.example.recipeappbackend.entity.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
public class RecipeSearchController {

    @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping("/search_name")
    public List<Recipe> searchRecipesName(@RequestParam String name) {
        List<Recipe> searchedRecipes = recipeRepository.searchRecipes(name);
        System.out.println(searchedRecipes);
        return searchedRecipes;
    }

    @GetMapping("/search_ingredients")
    public List<Recipe> searchRecipesIngredients(@RequestParam String ingredients) {
        List<Recipe> searchedRecipes = recipeRepository.searchRecipes(ingredients);
        System.out.println(searchedRecipes);
        return searchedRecipes;
    }

    @GetMapping("/list")
    public List<Recipe> listRecipes() {
        List<Recipe> searchedRecipes = recipeRepository.listRecipes();
        System.out.println(searchedRecipes);
        return searchedRecipes;
    }

    @GetMapping("/getByID/{id}")
    public Recipe getRecipeById(@PathVariable int id) {
        Recipe recipe = recipeRepository.getRecipeByID(id);
        System.out.println(recipe);
        return recipe;
    }

    @GetMapping("/generateUserIngredientSearch")
    public List<Recipe> generateUserIngredientSearch(@RequestParam String token) {
        List<Recipe> generatedRecipes = recipeRepository.generateRecipes(token);
        System.out.println(generatedRecipes);
        return generatedRecipes;
    }
}
