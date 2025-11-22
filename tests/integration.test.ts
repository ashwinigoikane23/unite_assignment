import setup from "./setup";
import request from "supertest";
import { createApp } from "../src/app";

let cleanup: any;
let app: any;

beforeAll(async () => {
  if (!process.env.MONGO_URI) {
    console.warn(
      "MONGO_URI not set; falling back to default mongodb://localhost:27017/unite_test"
    );
    process.env.MONGO_URI = "mongodb://localhost:27017/unite_test";
  }
  cleanup = await setup();
  app = await createApp();
});

afterAll(async () => {
  await cleanup();
});

describe("Auth and Leads integration (using real Mongo)", () => {
  let token: string;
  test("register user", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "Password123!",
      role: "manager",
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("email", "testuser@example.com");
  });

  test("login user", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "testuser@example.com",
      password: "Password123!",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  test("create lead", async () => {
    const res = await request(app)
      .post("/leads")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Lead A",
        phone: "9999000001",
        email: "leadA@example.com",
      });
    expect([201, 200]).toContain(res.status);
    expect(res.body).toHaveProperty("phone", "9999000001");
  });

  test("prevent duplicate lead", async () => {
    const res = await request(app)
      .post("/leads")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Lead A Duplicate",
        phone: "9999000001",
        email: "dup@example.com",
      });
    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("message");
  });

  test("list leads (manager)", async () => {
    const res = await request(app)
      .get("/leads")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBeTruthy();
    const found = res.body.data.find((l: any) => l.phone === "9999000001");
    expect(found).toBeTruthy();
  });
});
