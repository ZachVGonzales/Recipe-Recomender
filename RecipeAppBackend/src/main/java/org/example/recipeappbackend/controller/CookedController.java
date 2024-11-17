package org.example.recipeappbackend.controller;

import org.example.recipeappbackend.entity.Ingredient;
import org.example.recipeappbackend.entity.IngredientRepository;
import org.example.recipeappbackend.entity.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/cooked")
public class CookedController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @GetMapping("/getIngredientsByRecipeID")
    public List<Ingredient> getIngrByID(@RequestParam int id) {
        List<Integer> ingredientIds = recipeRepository.getIngredientIds(id);

        System.out.println(ingredientIds);

        List<Ingredient> ingredients = new ArrayList<>();
        for (Integer ingredientId : ingredientIds) {
            Ingredient ingredient = ingredientRepository.getIngredientByID(ingredientId);
            ingredients.add(ingredient);
        }

        System.out.println(ingredients);

        return ingredients;
    }
}
