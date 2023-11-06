const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { User } from "../../entities/user";

const userRepo = AppDataSource.getRepository(User);

describe("Update User", () => {
  it("should update a user", async () => {
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

    const updatedUser = {
      id: 1,
      name: "Updated Test User",
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
    jest.spyOn(userRepo, "save").mockResolvedValueOnce(updatedUser as any);

    const res = await request(app)
      .put("/api/user/1")
      .send(updatedUser)
      .set("Accept", "application/json");

    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("User updated successfully!");
    const parsedUser = JSON.parse(JSON.stringify(updatedUser));
    expect(res.body.user).toEqual(parsedUser);
  });

  it("should return an error if the user does not exist", async () => {
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

    jest.spyOn(userRepo, "findOne").mockResolvedValueOnce(null as any);
    jest.spyOn(userRepo, "save").mockResolvedValueOnce(user as any);

    const res = await request(app)
      .put("/api/user/1")
      .send(user)
      .set("Accept", "application/json");

    expect(res.status).toEqual(404);
    expect(res.body.message).toEqual("User not found!");
  });

  it("should return an error if the request fails", async () => {
    const res = await request(app)
      .put("/api/user/abc")
      .set("Accept", "application/json");

    expect(res.status).toEqual(400);
    expect(res.body.message).toEqual("User update failed!");
  });
});
