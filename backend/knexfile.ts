import { Knex } from "knex";
import path from "path";

const directory = path.resolve(__dirname, "./tests/database/migrations");

export const knexConfig: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: "database.sqlite",
  },
  migrations: {
    tableName: "knex_migrations",
    directory,
  },
  useNullAsDefault: true,

  pool: {
    min: 2,
    max: 100,
  },
};
