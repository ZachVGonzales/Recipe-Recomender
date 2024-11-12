package org.example.recipeappbackend.entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class IngredientRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Ingredient> searchIngredients(String keyword) {
        String sql = "SELECT id, name FROM ingredients WHERE name LIKE ? LIMIT 100";
        return jdbcTemplate.query(sql, new Object[]{"%" + keyword + "%"},
                (rs, rowNum) -> new Ingredient(
                        rs.getInt("id"),
                        rs.getString("name")
                ));
    }

    public List<Ingredient> listIngredients() {
        String sql = "SELECT id, name FROM ingredients LIMIT 100";
        return jdbcTemplate.query(sql, new Object[]{},
                (rs, rowNum) -> new Ingredient(
                        rs.getInt("id"),
                        rs.getString("name")
                ));
    }

    public Ingredient getIngredientByID(Integer id) {
        String sql = "SELECT id, name FROM ingredients WHERE id = ? LIMIT 1";
        return jdbcTemplate.queryForObject(sql, new Object[]{id},
                (rs, rowNum) -> new Ingredient(
                        rs.getInt("id"),
                        rs.getString("name")
                ));
    }
}
