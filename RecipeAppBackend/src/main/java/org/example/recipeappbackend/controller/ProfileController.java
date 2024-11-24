package org.example.recipeappbackend.controller;

import org.example.recipeappbackend.entity.ProfileRepository;
import org.example.recipeappbackend.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private ProfileRepository profileRepository;


//    @GetMapping("/getProfile")
//    public Map<String, String> getProfile(@RequestParam String token){
//        Map<String, String> profiles = profileRepository.getProfile(token);
//        System.out.println(profiles);
//        return profiles;
//    }


    @GetMapping("/getProfile")
    public ResponseEntity<?> getProfile(@RequestParam String token) {
        try {
            String hash = "user_" + token;
            Map<String, String> profiles = profileRepository.getProfile(hash);
            System.out.println("Fetched profiles: " + profiles);
            return ResponseEntity.ok(profiles);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profile not found for token: " + token);
        }
    }


}
