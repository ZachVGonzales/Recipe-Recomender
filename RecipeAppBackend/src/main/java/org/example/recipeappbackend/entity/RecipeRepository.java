package org.example.recipeappbackend.entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
    import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public class RecipeRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

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
}
