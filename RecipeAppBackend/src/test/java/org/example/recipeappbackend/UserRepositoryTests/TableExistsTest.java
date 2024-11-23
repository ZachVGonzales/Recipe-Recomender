package org.example.recipeappbackend.UserRepositoryTests;

import org.example.recipeappbackend.entity.UserRepository;
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

import static org.junit.jupiter.api.Assertions.*;

@Transactional
public class TableExistsTest {

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
    public void testTableExistsSimple() throws SQLException {
        // Init DB
        jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS user_tbl1 (id INTEGER, row_type INTEGER, xref_idx INTEGER);");

        // Execute method for testing
        boolean found = userRepository.userTableExists("tbl1");
        boolean notFound = userRepository.userTableExists("tbl2");

        // Assert method works as expected
        assertTrue(found);
        assertFalse(notFound);
    }

    @Test
    public void testTableExistsComplex() throws SQLException {
        // Init DB
        jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS user_tbl1 (id INTEGER, row_type INTEGER, xref_idx INTEGER);");
        jdbcTemplate.execute("INSERT INTO user_tbl1 VALUES (1, 1, 1);");
        jdbcTemplate.execute("INSERT INTO user_tbl1 VALUES (2, 2, 2);");

        // call test method
        boolean found = userRepository.userTableExists("tbl1");
        boolean notFound = userRepository.userTableExists("tbl2");

        // Assert statements
        assertTrue(found);
        assertFalse(notFound);
    }

    @AfterEach
    public void tearDown() throws SQLException {
        // Rollback the transaction to clean up test data
        connection.rollback();

        // Close the connection after the test
        connection.close();
    }
}