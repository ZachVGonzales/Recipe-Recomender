package org.example.recipeappbackend.UserRepositoryTests;

import org.example.recipeappbackend.entity.Ingredient;
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
public class ListIngredientsTest {

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
        jdbcTemplate.update("CREATE TABLE IF NOT EXISTS ingredients (id INTEGER PRIMARY KEY, name TEXT NOT NULL);");
    }

    @Test
    public void testListIngrSmall() throws NoSuchAlgorithmException {
        // Init DB
        jdbcTemplate.update("INSERT INTO ingredients VALUES (123456789, 'ingr1');");
        jdbcTemplate.update("INSERT INTO ingredients VALUES (123456790, 'ingr2');");
        jdbcTemplate.update("INSERT INTO ingredients VALUES (123456791, 'ingr3');");
        jdbcTemplate.update(String.format("INSERT INTO user_%s (id, row_type, xref_id) VALUES (0, 0, 123456789);", userHash));
        jdbcTemplate.update(String.format("INSERT INTO user_%s (id, row_type, xref_id) VALUES (1, 0, 123456790);", userHash));
        jdbcTemplate.update(String.format("INSERT INTO user_%s (id, row_type, xref_id) VALUES (2, 1, 123456789);", userHash));

        // Execute method for testing
        List<Ingredient> ingredients = userRepository.listIngredients(userHash);

        // Assert method works as expected
        assertNotNull(ingredients);
        assertEquals(2, ingredients.size());
        assertEquals("ingr1", ingredients.get(0).getName());
        assertEquals("ingr2", ingredients.get(1).getName());
        assertEquals(123456789, ingredients.get(0).getId());
        assertEquals(123456790, ingredients.get(1).getId());
    }

    @Test
    public void testListIngrEmpty() throws NoSuchAlgorithmException {
        // Init DB
        // Nothing here bc empty

        // Execute method being tested
        List<Ingredient> ingredients = userRepository.listIngredients(userHash);

        // Assert statements
        assertNotNull(ingredients);
        assertEquals(0, ingredients.size());
    }

    @AfterEach
    public void tearDown() throws SQLException {
        // Rollback the transaction to clean up test data
        connection.rollback();

        // Close the connection after the test
        connection.close();
    }
}