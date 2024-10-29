import sqlite3
import csv
import json
import sys
import ast


if __name__ == "__main__":
  conn = sqlite3.connect("./database/recipe.db")
  cursor = conn.cursor()
  cursor.execute("""CREATE TABLE IF NOT EXISTS recipe (
                 id INTEGER PRIMARY KEY, 
                 name TEXT NOT NULL, 
                 minutes INTEGER NOT NULL,
                 description TEXT NOT NULL,
                 instructions TEXT NOT NULL,
                 ingredients TEXT NOT NULL)
                 """)
  
  with open('./database/RAW_recipes.csv', 'r') as csv_file:
    csv_reader = csv.reader(csv_file)
    header = next(csv_reader)

    id_index = header.index("id")
    name_index = header.index("name")
    minute_index = header.index("minutes")
    description_index = header.index("description")
    instructions_index = header.index("steps")
    ingredients_index = header.index("ingredients")

    

    for row in csv_reader:
      try:
        instructions = ast.literal_eval(row[instructions_index])
      except Exception as e:
        print(f"exception: {e}, Failed to load instructions", file=sys.stderr)
        instructions = ["Failed to load instructions"]
      
      try:
        ingredients = ast.literal_eval(row[ingredients_index])
      except Exception as e:
        print(f"exception: {e}, Failed to load igredients", file=sys.stderr)
        ingredients = ["Failed to load igredients"]

      cursor.execute('INSERT INTO recipe (id, name, minutes, description, instructions, ingredients) VALUES (?, ?, ?, ?, ?, ?)', 
                     (row[id_index], row[name_index], row[minute_index], row[description_index], json.dumps(instructions), json.dumps(ingredients)))

  conn.commit()
  conn.close()  