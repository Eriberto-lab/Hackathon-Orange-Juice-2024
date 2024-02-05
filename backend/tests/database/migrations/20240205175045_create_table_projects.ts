import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("projects", function (table) {
    table.string("id", 36).notNullable().primary();
    table.string("title", 100).notNullable();
    table.string("tags", 255).notNullable();
    table.string("link", 255).notNullable();
    table.text("description").notNullable();
    table.string("imgUrl", 255).collate("utf8mb4_unicode_ci");
    table.string("idUser", 36).notNullable().references("id").inTable("users");
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());
    table.index("idUser", "fk_user_project");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("projects");
}
