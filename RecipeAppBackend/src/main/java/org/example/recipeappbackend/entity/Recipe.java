package org.example.recipeappbackend.entity;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

public class Recipe {
    private int id;
    private String name;
    private int minutes;
    private List<String> instructions;
    private List<String> ingredients;
    private Double ratio;

    public Recipe(int id, String name, int minutes, String instructions, String ingredients) {
        this.id = id;
        this.name = name;
        this.minutes = minutes;
        this.instructions = parseJson(instructions);
        this.ingredients = parseJson(ingredients);
        this.ratio = 0.0;
    }

    public Recipe(int id, String name, int minutes, String instructions, String ingredients, Double ratio) {
        this.id = id;
        this.name = name;
        this.minutes = minutes;
        this.instructions = parseJson(instructions);
        this.ingredients = parseJson(ingredients);
        this.ratio = ratio;
    }

    public int getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public int getMinutes() {return minutes;}
    public List<String> getIngredients() {
        return ingredients;
    }
    public List<String> getInstructions() {
        return instructions;
    }
    public Double getRatio() {
        return ratio;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setMinutes(int minutes) {this.minutes = minutes;}
    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }
    public void setInstructions(List<String> instructions) {
        this.instructions = instructions;
    }
    public void setRatio(Double ratio) {
        this.ratio = ratio;
    }

    @Override
    public String toString() {
        return String.format("id: %d, name: %s, ingredients: %s, match %,.7f", id, name, ingredients, ratio);
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
