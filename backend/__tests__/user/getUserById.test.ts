const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { User } from "../../entities/user";

const userRepo = AppDataSource.getRepository(User);

describe("Get User By Id", () => {
  it("should return a user", async () => {
    const user = {
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
    };

    jest.spyOn(userRepo, "findOne").mockResolvedValueOnce(user as any);

    const res = await request(app)
      .get("/api/user/1")
      .set("Accept", "application/json");

    const parsedUser = JSON.parse(JSON.stringify(user));
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("User fetched successfully!");
    expect(res.body.user).toEqual(parsedUser);
  });

  it("should return an error if no user is found", async () => {
    jest.spyOn(userRepo, "findOne").mockResolvedValueOnce(null as any);

    const res = await request(app)
      .get("/api/user/1")
      .set("Accept", "application/json");

    expect(res.status).toEqual(404);
    expect(res.body.message).toEqual("User not found!");
  });

  it("should return an error if something goes wrong", async () => {
    const res = await request(app)
      .get("/api/user/abc")
      .set("Accept", "application/json");

    expect(res.status).toEqual(400);
    expect(res.body.message).toEqual("User fetch failed!");
  });
});
