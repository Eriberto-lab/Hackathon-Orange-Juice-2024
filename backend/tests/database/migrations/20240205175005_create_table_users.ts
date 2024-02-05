import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.string("id", 36).primary().notNullable();
    table.string("name", 100).notNullable();
    table.string("lastName", 100).notNullable();
    table.string("iconUrl").defaultTo(null);
    table.string("email", 100).notNullable().unique();
    table.string("country", 100).defaultTo(null);
    table.string("password", 100).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.boolean("isGoogleLogin").notNullable().defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
