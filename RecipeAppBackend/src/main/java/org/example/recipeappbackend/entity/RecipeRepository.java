package org.example.recipeappbackend.entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;


import java.lang.reflect.Array;
import java.util.*;
import java.util.stream.Collectors;

@Repository
public class RecipeRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<Recipe> searchRecipes(String keyword) {
        String sql = "SELECT id, name, minutes, instructions, ingredient_names FROM recipes WHERE name LIKE ? LIMIT 100";
        return jdbcTemplate.query(sql, new Object[]{"%" + keyword + "%"},
                (rs, rowNum) -> new Recipe(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getInt("minutes"),
                        rs.getString("instructions"),
                        rs.getString("ingredient_names")
                ));
    }

    public List<Recipe> listRecipes() {
        String sql = "SELECT id, name, minutes, instructions, ingredient_names FROM recipes LIMIT 100";
        return jdbcTemplate.query(sql, new Object[]{},
                (rs, rowNum) -> new Recipe(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getInt("minutes"),
                        rs.getString("instructions"),
                        rs.getString("ingredient_names")
                ));
    }

    public Recipe getRecipeByID(Integer id) {
        String sql = "SELECT id, name, minutes, instructions, ingredient_names FROM recipes WHERE id = ? LIMIT 1";
        return jdbcTemplate.queryForObject(sql, new Object[]{id},
                (rs, rowNum) -> new Recipe(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getInt("minutes"),
                        rs.getString("instructions"),
                        rs.getString("ingredient_names")
                ));
    }

    public List<Recipe> generateRecipes(String token) {
        // SQL Query to compute top recipes with match ratios
        String sql = String.format("""
            WITH unpacked_ingredients AS (
                SELECT 
                    recipes.id AS recipe_id,
                    json_each.value AS ingredient_id
                FROM recipes, json_each(recipes.ingredient_ids)
            ),
            matched_ingredients AS (
                SELECT 
                    unpacked_ingredients.recipe_id,
                    COUNT(user_%s.xref_id) AS found_ingredients
                FROM unpacked_ingredients
                LEFT JOIN user_%s ON unpacked_ingredients.ingredient_id = user_%s.xref_id AND user_%s.row_type = 0
                GROUP BY unpacked_ingredients.recipe_id
            ),
            ingredient_counts AS (
                SELECT 
                    recipes.id AS recipe_id,
                    json_array_length(recipes.ingredient_ids) AS total_ingredients
                FROM recipes
            )
            SELECT 
                recipes.id AS recipe_id,
                COALESCE(matched_ingredients.found_ingredients, 0) AS found_ingredients,
                ingredient_counts.total_ingredients,
                CAST(COALESCE(matched_ingredients.found_ingredients, 0) AS FLOAT) / ingredient_counts.total_ingredients AS match_ratio
            FROM recipes
            LEFT JOIN matched_ingredients ON recipes.id = matched_ingredients.recipe_id
            LEFT JOIN ingredient_counts ON recipes.id = ingredient_counts.recipe_id
            ORDER BY match_ratio DESC
            LIMIT 100;
        """, token, token, token, token);

        // Fetch the top recipes with match ratios into a Map<Integer, String>
        Map<Integer, Double> recipeMatchRatios = jdbcTemplate.query(sql, rs -> {
            Map<Integer, Double> resultMap = new HashMap<>(); // LinkedHashMap preserves order
            while (rs.next()) {
                int recipeId = rs.getInt("recipe_id");
                double matchRatio = rs.getDouble("match_ratio");
                resultMap.put(recipeId, matchRatio); // Store ratio as string
            }
            return resultMap;
        });

        System.out.println("MAP: \n" + recipeMatchRatios);

        // get just the recipe ids so can preform a search on recipe_db
        List<Integer> ids = new ArrayList<>(recipeMatchRatios.keySet());
        System.out.println("Recipe IDs: " + ids);
        System.out.println("Number of Recipe IDs: " + ids.size());

        String query = "SELECT id, name, minutes, instructions, ingredient_names FROM recipes WHERE id IN (:ids)";
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("ids", ids);

        List<Recipe> recipeList = namedParameterJdbcTemplate.query(query, parameters,
                (rs, rowNum) -> new Recipe(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getInt("minutes"),
                        rs.getString("instructions"),
                        rs.getString("ingredient_names")
                ));

        System.out.println("Recipe List: " + recipeList);

        // Combine recipes and ratios into list of Maps where each
        // Map contains the ratio and recipe objects
        List<Recipe> ratioAndRecipes = new ArrayList<>();
        for (Recipe recipe : recipeList) {
            int id = recipe.getId();
            double foundRatio = recipeMatchRatios.get(id);
            recipe.setRatio(foundRatio);
            ratioAndRecipes.add(recipe);
        }

        ratioAndRecipes.sort((recipe1, recipe2) -> Double.compare(recipe2.getRatio(), recipe1.getRatio()));
        System.out.println(ratioAndRecipes);

        return ratioAndRecipes;
    }
}
