import sqlite3
import csv
import json
import sys
import ast
import pickle
import pandas as pd


if __name__ == "__main__":
  # connect to the database
  conn = sqlite3.connect("./database/recipe.db")
  recipe_cursor = conn.cursor()
  ingredient_cursor = conn.cursor()

  # create the recipe and ingredient tables
  recipe_cursor.execute("""CREATE TABLE IF NOT EXISTS recipes (
                        id INTEGER PRIMARY KEY, 
                        name TEXT NOT NULL, 
                        minutes INTEGER NOT NULL,
                        instructions TEXT NOT NULL,
                        ingredient_ids TEXT NOT NULL,
                        ingredient_names TEXT NOT NULL)
                        """)
  ingredient_cursor.execute("""CREATE TABLE IF NOT EXISTS ingredients (
                            id INTEGER PRIMARY KEY,
                            name TEXT NOT NULL)""")

  # open the distributed database files
  with open("./database/ingr_map.pkl", "rb") as pkl_file:
    ingr_df = pickle.load(pkl_file)
  
  PP_df = pd.read_csv("./database/PP_recipes.csv")
  raw_df = pd.read_csv("./database/RAW_recipes.csv")

  # iterate through the raw database and extract extra info from corellated datasets
  # create ingredients / recipes tables for new database within itteration
  skip_count = 0
  no_skip_count = 0
  for _, raw_row in raw_df.iterrows():
    recipe_id = int(raw_row["id"])
    recipe_name = raw_row["name"]
    recipe_minutes = raw_row["minutes"]
    instructions = ast.literal_eval(raw_row["steps"])

    # get ingredient ids from the coresponding recipe in the PP dataset
    filtered_PP_df = PP_df[PP_df["id"] == recipe_id]
    if filtered_PP_df.empty:
      print(f"could not match id {recipe_id}, name {recipe_name}, skipping...")
      skip_count += 1
      continue
    else:
      print(f"not skipping !!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      no_skip_count += 1
      ingredient_ids = json.loads(filtered_PP_df.iloc[0]["ingredient_ids"])
    ingredient_names = []
    
    # loop through ingredient ids and build upon ingredients table if necessary
    for ingredient_id in ingredient_ids:
      ingredient_name = ingr_df[ingr_df["id"] == ingredient_id].iloc[0]["raw_ingr"]
      ingredient_names.append(ingredient_name)
      ingredient_cursor.execute("INSERT OR IGNORE INTO ingredients (id, name) VALUES (?, ?)", (ingredient_id, ingredient_name))
      conn.commit()
    
    recipe_cursor.execute("INSERT OR IGNORE INTO recipes (id, name, minutes, instructions, ingredient_ids, ingredient_names) VALUES (?, ?, ?, ?, ?, ?)",
                          (recipe_id, recipe_name, recipe_minutes, json.dumps(instructions), json.dumps(ingredient_ids), json.dumps(ingredient_names)))
    conn.commit()
  
  print(f"skip count = {skip_count}, no skip count = {no_skip_count}")