package org.example.recipeappbackend.controller;

import org.example.recipeappbackend.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/add_ingredient")
public class IngredientAddController {

    @Autowired
    private UserRepository UserRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addIngredient(@RequestParam String xref_id, @RequestParam String token) {
        int int_id = Integer.parseInt(xref_id);
        boolean added = UserRepository.addItem(0, int_id, token);
        if (added) {
            return ResponseEntity.ok("Ingredient added");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ingredient not added");
        }
    }
}
