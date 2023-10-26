const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { User } from "../../entities/user";

const userRepo = AppDataSource.getRepository(User);

describe("Create User", () => {
  it("should create a user", async () => {
    const user = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      password: "testPassword",
      status: "active",
      is_admin: true,
      adresses: [],
      payments: [],
      orders: [],
      catalogs: [],
      catalogUserGroups: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(userRepo, "findOne").mockResolvedValueOnce(null);
    jest.spyOn(userRepo, "save").mockResolvedValueOnce(user as any);

    const res = await request(app)
      .post("/api/user")
      .send(user)
      .set("Accept", "application/json");
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("User created successfully!");
    const parsedUser = JSON.parse(JSON.stringify(user));
    expect(res.body.user).toEqual(parsedUser);
  });

  it("should return an error if the user email already exists", async () => {
    const existingUserByEmail = {
      name: "Test User",
      email: "test@example.com",
      password: "testPassword",
      status: "active",
      is_admin: true,
    };
    const user = {
      name: "Test User different",
      email: "test@example.com",
      password: "testPassword",
      status: "active",
      is_admin: true,
    };

    jest
      .spyOn(userRepo, "findOne")
      .mockResolvedValueOnce(existingUserByEmail as any);
    jest.spyOn(userRepo, "save").mockResolvedValueOnce(user as any);

    const res = await request(app)
      .post("/api/user")
      .send(user)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.message).toEqual("User with this email already exists.");
  });

  it("should return an error if the user name already exists", async () => {
    const existingUserByName = {
      name: "Test User",
      email: "test@example.com",
      password: "testPassword",
      status: "active",
      is_admin: true,
    };

    const user = {
      name: "Test User",
      email: "test2@example.com",
      password: "testPassword",
      status: "active",
      is_admin: true,
    };

    jest
      .spyOn(userRepo, "findOne")
      .mockResolvedValueOnce(existingUserByName as any);
    jest.spyOn(userRepo, "save").mockResolvedValueOnce(user as any);

    const res = await request(app)
      .post("/api/user")
      .send(user)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.message).toEqual("User with this name already exists.");
  });

  it("should return an error if any required fields are missing", async () => {
    const user = {
      email: "test@example.com",
      password: "testPassword",
      status: "active",
      is_admin: true,
    };

    const res = await request(app)
      .post("/api/user")
      .send(user)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.message).toEqual(
      "Missing required fields. Please provide all necessary user details."
    );
  });
});
