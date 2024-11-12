package org.example.recipeappbackend.entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;

@Service
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Hash credentials to create a unique identifier for each user
    public String getUserHash(String username, String password) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        String input = username + ":" + password;
        byte[] hash = digest.digest(input.getBytes(StandardCharsets.UTF_8));
        StringBuilder hexString = new StringBuilder(2 * hash.length);
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }

    // Check if a user's table exists
    public boolean userTableExists(String userHash) {
        String checkTableSQL = "SELECT name FROM sqlite_master WHERE type='table' AND name='user_" + userHash + "'";
        return jdbcTemplate.queryForRowSet(checkTableSQL).next();
    }

    // Create a new table for the user if it doesn't already exist
    public boolean createUserTable(String username, String password) throws NoSuchAlgorithmException {
        String userHash = getUserHash(username, password);
        System.out.println(userHash);
        if (userTableExists(userHash)) {
            return false; // Table already exists, so user is already registered
        }
        String createTableSQL = "CREATE TABLE user_" + userHash + " (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "row_type INTEGER, " +
                "xref_id INTEGER)";
        jdbcTemplate.execute(createTableSQL);
        return true;
    }

    public boolean addItem(int type, int xref_id, String token) {
        if (userTableExists(token)) {
            System.out.println("User table exists");
            if (itemExists(type, xref_id, token)) {
                System.out.println("Item already exists");
                return false;
            } else {
                System.out.println("Adding new item");
                String insertQuery = "INSERT INTO user_" + token + " (row_type, xref_id) VALUES (?,?)";
                jdbcTemplate.update(insertQuery, type, xref_id);
                return true;
            }
        } else {
            return false;
        }
    }

    private boolean itemExists(int type, int xref_id, String token) {
        String query = "SELECT COUNT(*) FROM user_" + token +
                " WHERE row_type=" + type + " AND xref_id=" + xref_id;
        try {
            Integer count = jdbcTemplate.queryForObject(query, new Object[]{xref_id}, Integer.class);
            return count != null && count > 0;
        } catch (Exception e) {
            return false;
        }
    }
}
