package org.example.recipeappbackend.controller;

import org.example.recipeappbackend.entity.Ingredient;
import org.example.recipeappbackend.entity.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientSearchController {

    @Autowired
    private IngredientRepository IngredientRepository;

    @GetMapping("/search_name")
    public List<Ingredient> searchIngredientsName(@RequestParam String name) {
        List<Ingredient> searchedIngredients = IngredientRepository.searchIngredients(name);
        System.out.println(searchedIngredients);
        return searchedIngredients;
    }

    @GetMapping("/list")
    public List<Ingredient> listIngredients() {
        List<Ingredient> searchedIngredients = IngredientRepository.listIngredients();
        System.out.println(searchedIngredients);
        return searchedIngredients;
    }

    @GetMapping("/getByID/{id}")
    public Ingredient getIngredientById(@PathVariable int id) {
        Ingredient ingredient = IngredientRepository.getIngredientByID(id);
        System.out.println(ingredient);
        return ingredient;
    }
}
