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

    @GetMapping("/search")
    public List<Recipe> searchRecipes(@RequestParam String name) {
        List<Recipe> searchedRecipes = recipeRepository.searchRecipes(name);
        System.out.println(searchedRecipes);
        return searchedRecipes;
    }

    @GetMapping("/list")
    public List<Recipe> listRecipes() {
        List<Recipe> searchedRecipes = recipeRepository.listRecipes();
        System.out.println(searchedRecipes);
        return searchedRecipes;
    }
}