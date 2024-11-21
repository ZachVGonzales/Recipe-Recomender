package org.example.recipeappbackend.controller;

import org.example.recipeappbackend.entity.Ingredient;
import org.example.recipeappbackend.entity.IngredientRepository;
import org.example.recipeappbackend.entity.RecipeRepository;
import org.example.recipeappbackend.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.example.recipeappbackend.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/cooked")
public class CookedController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private org.example.recipeappbackend.entity.UserRepository UserRepository;

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
    @PostMapping("/addRecipe")
    public ResponseEntity<String> addRecipe(@RequestParam String xref_id, @RequestParam String token) {
        System.out.println("ASLKD;JFLKASJD;FKLJLKJSDLK;FJALSKDJFKL");
        int int_id = Integer.parseInt(xref_id);
        boolean added = UserRepository.addItem(1, int_id, token);
        if (added) {
            return ResponseEntity.ok("Recipe added");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Recipe not added");
        }
    }
}