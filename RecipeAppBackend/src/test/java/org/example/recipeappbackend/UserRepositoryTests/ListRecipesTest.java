package org.example.recipeappbackend.UserRepositoryTests;

import org.example.recipeappbackend.entity.Ingredient;
import org.example.recipeappbackend.entity.Recipe;
import org.example.recipeappbackend.entity.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterEach;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@Transactional
public class ListRecipesTest {

    private Connection connection;
    private JdbcTemplate jdbcTemplate;
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private UserRepository userRepository;
    private String userHash;

    @BeforeEach
    public void setUp() throws SQLException, NoSuchAlgorithmException {
        // Open a new connection to an SQLite in-memory database
        connection = DriverManager.getConnection("jdbc:sqlite::memory:");
        connection.setAutoCommit(false);

        // Initialize JdbcTemplate and NamedParameterJdbcTemplate
        jdbcTemplate = new JdbcTemplate(new SingleConnectionDataSource(connection, true));
        namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(jdbcTemplate);

        // Initialize RecipeRepository and inject dependencies
        userRepository = new UserRepository();
        userRepository.jdbcTemplate = jdbcTemplate; // Inject JdbcTemplate
        userRepository.namedParameterJdbcTemplate = namedParameterJdbcTemplate; // Inject NamedParameterJdbcTemplate
        userHash = userRepository.getUserHash("username", "password");

        jdbcTemplate.update(String.format("CREATE TABLE IF NOT EXISTS user_%s (id INTEGER PRIMARY KEY AUTOINCREMENT, row_type INTEGER NOT NULL, xref_id INTEGER NOT NULL);", userHash));
        jdbcTemplate.update("CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY, name TEXT NOT NULL, minutes INTEGER NOT NULL, instructions TEXT NOT NULL, ingredient_ids TEXT NOT NULL, ingredient_names TEXT NOT NULL);");
    }

    @Test
    public void testListRecipeSmall() {
        // Init DB
        jdbcTemplate.update("INSERT INTO recipes (id, name, minutes, instructions, ingredient_ids, ingredient_names) VALUES (123456789, 'Cake 1', 30, '[\"Step 1\", \"Step 2\"]', '[1, 2]', '[\"Flour\", \"Sugar\"]');");
        jdbcTemplate.update("INSERT INTO recipes (id, name, minutes, instructions, ingredient_ids, ingredient_names) VALUES (123456790, 'Cake 2', 40, '[\"Step A\", \"Step B\"]', '[1, 2]', '[\"Butter\", \"Eggs\"]');");
        jdbcTemplate.update("INSERT INTO recipes (id, name, minutes, instructions, ingredient_ids, ingredient_names) VALUES (123456791, 'not that', 40, '[\"Step A\", \"Step B\"]', '[1, 2]', '[\"Butter\", \"Eggs\"]');");
        jdbcTemplate.update(String.format("INSERT INTO user_%s (id, row_type, xref_id) VALUES (0, 1, 123456789);", userHash));
        jdbcTemplate.update(String.format("INSERT INTO user_%s (id, row_type, xref_id) VALUES (1, 1, 123456790);", userHash));
        jdbcTemplate.update(String.format("INSERT INTO user_%s (id, row_type, xref_id) VALUES (2, 0, 123456789);", userHash));

        // Execute method for testing
        List<Recipe> recipes = userRepository.listRecipes(userHash);

        // Assert method works as expected
        assertNotNull(recipes);
        assertEquals(2, recipes.size());
        assertEquals("Cake 1", recipes.get(0).getName());
        assertEquals("Cake 2", recipes.get(1).getName());
        assertEquals(123456789, recipes.get(0).getId());
        assertEquals(123456790, recipes.get(1).getId());
    }

    @Test
    public void testListRecipeEmpty() throws NoSuchAlgorithmException {
        // Init DB
        // Nothing here bc empty

        // Execute method being tested
        List<Recipe> recipes = userRepository.listRecipes(userHash);

        // Assert statements
        assertNotNull(recipes);
        assertEquals(0, recipes.size());
    }

    @AfterEach
    public void tearDown() throws SQLException {
        // Rollback the transaction to clean up test data
        connection.rollback();

        // Close the connection after the test
        connection.close();
    }
}