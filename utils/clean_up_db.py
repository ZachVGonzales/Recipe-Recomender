import spacy
import sqlite3


def extract_nouns(text):
  doc = nlp(text)
  # Filter out words that are not nouns
  nouns = [token.text for token in doc if token.pos_ == "NOUN"]
  print(nouns)
  return " ".join(nouns)


if __name__ == "__main__":
  # Load the spaCy English model
  nlp = spacy.load("en_core_web_sm")

  # connect to DB
  conn = sqlite3.connect("../RecipeAppBackend/database/recipe_V2.db")
  cursor = conn.cursor()

  cursor.execute("SELECT id, name FROM ingredients")
  rows = cursor.fetchall()

  updated_rows = [(row[0], extract_nouns(row[1])) for row in rows]
  for id, cleaned_name in updated_rows:
    cursor.execute("UPDATE ingredients SET name = ? WHERE id = ?", (cleaned_name, id))
  conn.commit()
  conn.close()
