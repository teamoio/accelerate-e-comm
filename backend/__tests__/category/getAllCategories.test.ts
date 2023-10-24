const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { Category } from "../../entities/category";

const categoryRepo = AppDataSource.getRepository(Category);

describe("Get all the categories available", () => {
  it("should return all categories", async () => {
    const categories: Category[] = [
      {
        id: 1,
        name: "category 1",
        description: "category 1 description",
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        images: [],
        products: [],
      },
      {
        id: 2,
        name: "category 2",
        description: "category 2 description",
        is_active: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        images: [],
        products: [],
      },
    ];
    jest.spyOn(categoryRepo, "find").mockResolvedValueOnce(categories);

    const res = await request(app)
      .get("/api/category")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.message).toEqual("Categories fetched successfully!");

    const parsedCategories = JSON.parse(JSON.stringify(categories));
    expect(res.body.categories).toEqual(parsedCategories);
  });

  it("should return an error if fetching categories fails", async () => {
    const error = {};

    jest.spyOn(categoryRepo, "find").mockRejectedValueOnce(error);

    const res = await request(app)
      .get("/api/category")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.message).toEqual("Categories fetched failed!");
    expect(res.body.error).toEqual(error);
  });
});
