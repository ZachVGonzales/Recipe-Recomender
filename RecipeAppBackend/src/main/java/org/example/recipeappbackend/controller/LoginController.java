package org.example.recipeappbackend.controller;

import org.example.recipeappbackend.entity.ProfileRepository;
import org.example.recipeappbackend.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;


@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestParam String username, @RequestParam String password, @RequestParam String name, @RequestParam String email, @RequestParam String favoriteFood, @RequestParam String birthday) {
        try {
            String userHash = userRepository.getUserHash(username, password);
            if (userRepository.userTableExists(userHash)) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
            } else {
                boolean created = userRepository.createUserTable(username, password);
                String userName = "user_" + userHash;
                boolean made = profileRepository.addProfile(userName, name, birthday, email, favoriteFood);

                if (created && made) {
                    return ResponseEntity.ok(userHash);
                } else {
                    return ResponseEntity.status(HttpStatus.CONFLICT).body("User creation failed");
                }
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during signup: " + e.getMessage());
        }
    }



    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        try {
            String userHash = userRepository.getUserHash(username, password);
            System.out.println(userHash);
            if (userRepository.userTableExists(userHash)) {
                return ResponseEntity.ok(userHash);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during login: " + e.getMessage());
        }
    }
}
