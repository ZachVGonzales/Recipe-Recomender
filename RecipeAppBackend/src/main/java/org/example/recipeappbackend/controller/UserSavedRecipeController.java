package org.example.recipeappbackend.controller;

import org.example.recipeappbackend.entity.Ingredient;
import org.example.recipeappbackend.entity.Recipe;
import org.example.recipeappbackend.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user_recipes")
public class UserSavedRecipeController {
    @Autowired
    private UserRepository UserRepository;

    @GetMapping("/list")
    public List<Recipe> listIngredients(@RequestParam String token) {
        System.out.println("listing for " + token);
        List<Recipe> recipes = UserRepository.listRecipes(token);
        System.out.println(recipes);
        return recipes;
    }

}
