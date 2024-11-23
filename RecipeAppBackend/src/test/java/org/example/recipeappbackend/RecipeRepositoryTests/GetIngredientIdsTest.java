package org.example.recipeappbackend.RecipeRepositoryTests;

import org.example.recipeappbackend.entity.Recipe;
import org.example.recipeappbackend.entity.RecipeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterEach;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@Transactional
public class GetIngredientIdsTest {

    private Connection connection;
    private JdbcTemplate jdbcTemplate;
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private RecipeRepository recipeRepository;

    @BeforeEach
    public void setUp() throws SQLException {
        // Open a new connection to an SQLite in-memory database
        connection = DriverManager.getConnection("jdbc:sqlite::memory:");
        connection.setAutoCommit(false);

        // Initialize JdbcTemplate and NamedParameterJdbcTemplate
        jdbcTemplate = new JdbcTemplate(new SingleConnectionDataSource(connection, true));
        namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(jdbcTemplate);

        // Initialize RecipeRepository and inject dependencies
        recipeRepository = new RecipeRepository();
        recipeRepository.jdbcTemplate = jdbcTemplate; // Inject JdbcTemplate
        recipeRepository.namedParameterJdbcTemplate = namedParameterJdbcTemplate; // Inject NamedParameterJdbcTemplate

        // Set up test schema
        jdbcTemplate.update("CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY, name TEXT NOT NULL, minutes INTEGER NOT NULL, instructions TEXT NOT NULL, ingredient_ids TEXT NOT NULL, ingredient_names TEXT NOT NULL);");
    }

    @Test
    public void testGetIngrIDsSmall() throws SQLException {
        jdbcTemplate.update("INSERT INTO recipes (id, name, minutes, instructions, ingredient_ids, ingredient_names) VALUES (123456789, 'Cake 1', 30, '[\"Step 1\", \"Step 2\"]', '[1, 2]', '[\"Flour\", \"Sugar\"]');");
        jdbcTemplate.update("INSERT INTO recipes (id, name, minutes, instructions, ingredient_ids, ingredient_names) VALUES (123456790, 'Cake 2', 40, '[\"Step A\", \"Step B\"]', '[1, 2]', '[\"Butter\", \"Eggs\"]');");
        jdbcTemplate.update("INSERT INTO recipes (id, name, minutes, instructions, ingredient_ids, ingredient_names) VALUES (123456791, 'not that', 40, '[\"Step A\", \"Step B\"]', '[1, 2]', '[\"Butter\", \"Eggs\"]');");

        List<Integer> ingredientIDs = recipeRepository.getIngredientIds(123456789);

        assertNotNull(ingredientIDs);
        assertEquals(2, ingredientIDs.size());
        assertEquals(1, ingredientIDs.get(0));
        assertEquals(2, ingredientIDs.get(1));
    }

    @Test
    public void testGetIngrIDsLarge() throws SQLException {
        // Init DB
        for (int i = 0; i < 100000; i++) {
            jdbcTemplate.update(String.format("INSERT INTO recipes (id, name, minutes, instructions, ingredient_ids, ingredient_names) VALUES (123456789 + %d, 'Cake %d', 30, '[\"Step 1\", \"Step 2\"]', '[1, %d]', '[\"Flour\", \"Sugar\"]');", i, i, i));
        }

        // call test method
        List<Integer> ingredientIds = recipeRepository.getIngredientIds(123457789);

        // Assert statements
        assertNotNull(ingredientIds);
        assertEquals(2, ingredientIds.size());
        assertEquals(1, ingredientIds.get(0));
        assertEquals(1000, ingredientIds.get(1));
    }

    @Test
    public void testGetIngrIdsInvalid() throws SQLException {
        // Init DB
        for (int i = 0; i < 200; i++) {
            jdbcTemplate.update(String.format("INSERT INTO recipes (id, name, minutes, instructions, ingredient_ids, ingredient_names) VALUES (123456789 + %d, 'Cake %d', 30, '[\"Step 1\", \"Step 2\"]', '[1, 2]', '[\"Flour\", \"Sugar\"]');", i, i));
        }

        // call test method
        List<Integer> ingredientIds = recipeRepository.getIngredientIds(123456788);

        // Assert statements
        assertNull(ingredientIds);
    }

    @AfterEach
    public void tearDown() throws SQLException {
        // Rollback the transaction to clean up test data
        connection.rollback();

        // Close the connection after the test
        connection.close();
    }
}