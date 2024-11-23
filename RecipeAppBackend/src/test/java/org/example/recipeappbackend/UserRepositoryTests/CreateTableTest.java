package org.example.recipeappbackend.UserRepositoryTests;

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

import static org.junit.jupiter.api.Assertions.*;

@Transactional
public class CreateTableTest {

    private Connection connection;
    private JdbcTemplate jdbcTemplate;
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private UserRepository userRepository;

    @BeforeEach
    public void setUp() throws SQLException {
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
    }

    @Test
    public void testTableDNE() throws NoSuchAlgorithmException {
        // Execute method for testing
        String hash = userRepository.getUserHash("username", "password");
        boolean created = userRepository.createUserTable("username", "password");

        boolean checkCreated = jdbcTemplate.queryForRowSet("SELECT name FROM sqlite_master WHERE type='table' AND name='user_" + hash + "'").next();

        // Assert method works as expected
        assertEquals(created, checkCreated);
    }

    @Test
    public void testTableExists() throws NoSuchAlgorithmException {
        // Init DB
        String hash = userRepository.getUserHash("username", "password");
        jdbcTemplate.execute(String.format("CREATE TABLE IF NOT EXISTS user_%s (id INTEGER, row_type INTEGER, xref_idx INTEGER);", hash));

        boolean created = userRepository.createUserTable("username", "password");

        // Assert statements
        assertFalse(created);
    }

    @AfterEach
    public void tearDown() throws SQLException {
        // Rollback the transaction to clean up test data
        connection.rollback();

        // Close the connection after the test
        connection.close();
    }
}