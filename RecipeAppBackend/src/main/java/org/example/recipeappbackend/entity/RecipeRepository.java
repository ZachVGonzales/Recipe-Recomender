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
        String sql = "SELECT id, name, minutes, description, instructions, ingredients FROM recipe WHERE name LIKE ? LIMIT 100";
        return jdbcTemplate.query(sql, new Object[]{"%" + keyword + "%"},
                (rs, rowNum) -> new Recipe(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getInt("minutes"),
                        rs.getString("description"),
                        rs.getString("instructions"),
                        rs.getString("ingredients")
                ));
    }

    public List<Recipe> listRecipes() {
        String sql = "SELECT id, name, minutes, description, instructions, ingredients FROM recipe LIMIT 100";
        return jdbcTemplate.query(sql, new Object[]{},
                (rs, rowNum) -> new Recipe(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getInt("minutes"),
                        rs.getString("description"),
                        rs.getString("instructions"),
                        rs.getString("ingredients")
                ));
    }
}
