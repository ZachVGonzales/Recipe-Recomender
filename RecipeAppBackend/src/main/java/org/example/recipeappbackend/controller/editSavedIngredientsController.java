package org.example.recipeappbackend.controller;

import org.example.recipeappbackend.entity.Ingredient;
import org.example.recipeappbackend.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user_ingredients")
public class editSavedIngredientsController {

    @Autowired
    private UserRepository UserRepository;

    @GetMapping("/list")
    public List<Ingredient> listIngredients(@RequestParam String token) {
        System.out.println("listing for " + token);
        List<Ingredient> ingredients = UserRepository.listIngredients(token);
        System.out.println(ingredients);
        return ingredients;
    }

    @PostMapping("/delete")
    public String deleteIngredient(@RequestParam String token, @RequestParam Integer id) {
        System.out.println("deleting " + id);
        boolean deleted = UserRepository.deleteIngredient(token, id);
        System.out.println(deleted);
        return deleted ? "Deleted" : "Not Deleted";
    }
}
