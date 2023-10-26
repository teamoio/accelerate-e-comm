const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { User } from "../../entities/user";

const userRepo = AppDataSource.getRepository(User);

describe("Delete User", () => {
  it("should delete a user", async () => {
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
    jest.spyOn(userRepo, "remove").mockResolvedValueOnce(user as any);

    const res = await request(app)
      .delete("/api/user/1")
      .set("Accept", "application/json");

    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("User deleted successfully!");
  });

  it("should return an error if the user does not exist", async () => {
    jest.spyOn(userRepo, "findOne").mockResolvedValueOnce(null as any);

    const res = await request(app)
      .delete("/api/user/1")
      .set("Accept", "application/json");

    expect(res.status).toEqual(404);
    expect(res.body.message).toEqual("User not found!");
  });
});
