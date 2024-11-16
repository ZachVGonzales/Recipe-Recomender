package org.example.recipeappbackend.entity;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

public class Recipe {
    private long id;
    private String name;
    private long minutes;
    private List<String> instructions;
    private List<String> ingredients;

    public Recipe(int id, String name, int minutes, String instructions, String ingredients) {
        this.id = id;
        this.name = name;
        this.minutes = minutes;
        this.instructions = parseJson(instructions);
        this.ingredients = parseJson(ingredients);
    }

    public long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public long getMinutes() {return minutes;}
    public List<String> getIngredients() {
        return ingredients;
    }
    public List<String> getInstructions() {
        return instructions;
    }

    public void setId(long id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setMinutes(long minutes) {this.minutes = minutes;}
    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }
    public void setInstructions(List<String> instructions) {
        this.instructions = instructions;
    }

    @Override
    public String toString() {
        return String.format("id: %d, name: %s, ingredients: %s", id, name, ingredients);
    }

    private List<String> parseJson(String ingredientsJson) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(ingredientsJson, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            e.printStackTrace();
            return List.of(); // Return an empty list if parsing fails
        }
    }

}
