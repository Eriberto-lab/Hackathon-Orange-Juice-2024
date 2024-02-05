// import { knexConfig } from "../knexfile";
// import knex from "knex";
// import supertest from "supertest";
// import  app  from "../src/server";
const { knexConfig } = require("../knexfile");
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/server");

const testServer = supertest(app);
const db = knex(knexConfig);

beforeAll(async () => {
  await db.migrate.latest();

  console.log("BeforeAll foi chamado");
});

afterAll(async () => {
  await db.migrate.rollback();
  await db.destroy();
});

module.exports = { testServer, db };
