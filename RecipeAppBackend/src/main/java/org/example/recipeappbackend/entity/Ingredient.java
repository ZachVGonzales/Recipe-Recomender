package org.example.recipeappbackend.entity;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

public class Ingredient {
    private long id;
    private String name;

    public Ingredient(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public long getId() {
        return id;
    }
    public String getName() {
        return name;
    }

    public void setId(long id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return String.format("id: %d, name: %s", id, name);
    }

    private List<String> parseJson(String ingredientsJson) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(ingredientsJson, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            e.printStackTrace();
            return List.of("hello"); // Return an empty list if parsing fails
        }
    }

}
