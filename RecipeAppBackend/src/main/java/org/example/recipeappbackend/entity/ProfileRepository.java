package org.example.recipeappbackend.entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;

@Repository
public class ProfileRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public boolean addProfile(String token, String name, String email, String birthday, String favoriteFood){

        String insertQuery = "INSERT INTO profiles (token, name, birthday, email, food) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(insertQuery, token, name, birthday, email, favoriteFood);
        return true;

    }


    public Map<String, String> getProfile(String token) {
        String sql = "SELECT name, birthday, email, food FROM profiles WHERE token = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{token},
                (rs, rowNum) -> Map.of(
                        "name", rs.getString("name"),
                        "birthday", rs.getString("birthday"),
                        "email", rs.getString("email"),
                        "food", rs.getString("food")
                ));
    }



}
