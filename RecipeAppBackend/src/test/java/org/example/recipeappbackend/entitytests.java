package org.example.recipeappbackend;

import org.example.recipeappbackend.entity.Ingredient;
import org.example.recipeappbackend.entity.Recipe;
import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;

public class entitytests {
    @Test
    public void testingredient(){
        Ingredient addinging = new Ingredient(5 , "tomatoes");
        assertEquals(5 , addinging.getId());
        assertEquals("tomatoes", addinging.getName());
        assertEquals("id: 5, name: tomatoes" , addinging.toString());

        addinging.setId(20);
        addinging.setName("cucumber");

        assertEquals(20 , addinging.getId());
        assertEquals("cucumber", addinging.getName());
        assertEquals("id: 20, name: cucumber" , addinging.toString());

    }

    

}
