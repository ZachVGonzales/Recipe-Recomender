package org.example.recipeappbackend.entity;

import org.springframework.beans.factory.annotation.Autowired;
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
}
