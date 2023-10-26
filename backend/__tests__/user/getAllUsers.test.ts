const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { User } from "../../entities/user";

const userRepo = AppDataSource.getRepository(User);

describe("Get All Users", () => {
  it("should return all users", async () => {
    const users = [
      {
        id: 1,
        name: "Test User",
        email: "test@test.com",
        password: "testPassword",
        status: "active",
        is_admin: true,
        addresses: [],
        payments: [],
        orders: [],
        catalogs: [],
        catalogUserGroups: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Test User 2",
        email: "test2@test.com",
        password: "testPassword",
        status: "active",
        is_admin: true,
        addresses: [],
        payments: [],
        orders: [],
        catalogs: [],
        catalogUserGroups: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(userRepo, "find").mockResolvedValueOnce(users as any);

    const res = await request(app)
      .get("/api/user")
      .set("Accept", "application/json");

    const parsedUsers = JSON.parse(JSON.stringify(users));
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Users fetched successfully!");
    expect(res.body.users).toEqual(parsedUsers);
  });

  it("should return an error if no users are found", async () => {
    jest.spyOn(userRepo, "find").mockResolvedValueOnce([] as any);

    const res = await request(app)
      .get("/api/user")
      .set("Accept", "application/json");

    expect(res.status).toEqual(404);
    expect(res.body.message).toEqual("No users found!");
  });

  it("should return an error if the request fails", async () => {
    jest.spyOn(userRepo, "find").mockRejectedValueOnce({} as any);

    const res = await request(app)
      .get("/api/user")
      .set("Accept", "application/json");

    expect(res.status).toEqual(400);
    expect(res.body.message).toEqual("Users fetch failed!");
  });
});
