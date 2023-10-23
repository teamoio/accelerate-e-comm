const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { Category } from "../../entities/category";

const categoryRepo = AppDataSource.getRepository(Category);

describe("Get category by ID", () => {
  it("should return a category when a valid ID is provided", async () => {
    const category = {
      id: 1,
      name: "category 1",
      description: "category 1 description",
      is_active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      images: [],
      products: [],
    };

    jest.spyOn(categoryRepo, "findOneBy").mockResolvedValueOnce(category);

    const res = await request(app)
      .get("/api/category/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.message).toEqual("Category fetched successfully!");

    const parsedCategory = JSON.parse(JSON.stringify(category));
    expect(res.body.category).toEqual(parsedCategory);
  });

  it("should return a 404 error if an invalid ID is provided", async () => {
    const categoryId = 100;
    jest.spyOn(categoryRepo, "findOneBy").mockResolvedValueOnce(null);

    const res = await request(app)
      .get(`/api/category/${categoryId}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(res.body.message).toEqual("Category not found!");
  });

  it("should return an error if fetching category fails", async () => {
    const categoryId = 1;
    const error = {};

    jest.spyOn(categoryRepo, "findOneBy").mockRejectedValueOnce(error);

    const res = await request(app)
      .get(`/api/category/${categoryId}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.message).toEqual("Category fetched failed!");
  });
});
