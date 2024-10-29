package org.example.recipeappbackend.config;

import org.springframework.data.relational.core.dialect.Dialect;
import org.springframework.data.relational.core.dialect.MySqlDialect;

public class SQLiteDialect extends MySqlDialect {

    // Use any custom configurations you need for SQLite here.
    public static Dialect INSTANCE = new SQLiteDialect();
}
