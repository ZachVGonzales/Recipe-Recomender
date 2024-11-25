import sqlite3
import csv
import json
import sys
import ast
import pickle
import pandas as pd


if __name__ == "__main__":
  # connect to the database
  conn = sqlite3.connect("./database/recipe_V2.db")
  recipe_cursor = conn.cursor()
  ingredient_cursor = conn.cursor()

  # create the recipe and ingredient tables
  recipe_cursor.execute("""CREATE TABLE IF NOT EXISTS recipes (
                        id INTEGER PRIMARY KEY, 
                        name TEXT NOT NULL, 
                        instructions TEXT NOT NULL,
                        ingredient_ids TEXT NOT NULL,
                        ingredient_values TEXT NOT NULL)
                        """)
  ingredient_cursor.execute("""CREATE TABLE IF NOT EXISTS ingredients (
                            id INTEGER PRIMARY KEY,
                            name TEXT NOT NULL)""")

  recipe_id = 0
  ingredient_id = 0
  recipe_df = pd.read_csv("./database/RecipeNLG_dataset.csv")
  
  # iterate through the complete database and insert into tables
  # as neccessary
  for _, row in recipe_df.iterrows():
    recipe_name = row["title"]
    print(recipe_id, recipe_name)
    instructions = json.loads(row["directions"])
    ingredient_values = json.loads(row["ingredients"])
    ingredient_names = json.loads(row["NER"])
    ingredient_ids = []
    
    for ingredient_name in ingredient_names:
      ingredient_cursor.execute("SELECT id FROM ingredients WHERE name = ?", (ingredient_name,))
      fetch_result = ingredient_cursor.fetchone()
      if fetch_result:
        ingredient_ids.append(fetch_result[0])
      else:
        ingredient_cursor.execute("INSERT INTO ingredients (id, name) VALUES (?, ?)", (ingredient_id, ingredient_name))
        conn.commit()
        ingredient_ids.append(ingredient_id)
        ingredient_id += 1
    
    recipe_cursor.execute("INSERT INTO recipes (id, name, instructions, ingredient_ids, ingredient_values) VALUES (?, ?, ?, ?, ?)", 
                          (recipe_id, recipe_name, json.dumps(instructions), json.dumps(ingredient_ids), json.dumps(ingredient_values)))
    conn.commit()
    recipe_id += 1