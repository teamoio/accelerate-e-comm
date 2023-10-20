const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { Category } from "../../entities/category";

const categoryRepo = AppDataSource.getRepository(Category);

describe("Create a category", () => {
  it("should create a category", async () => {
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

    jest.spyOn(categoryRepo, "save").mockResolvedValueOnce(category);

    const res = await request(app)
      .post("/api/category")
      .send(category)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.message).toEqual("Category created successfully!");

    const parsedCategory = JSON.parse(JSON.stringify(category));
    expect(res.body.category).toEqual(parsedCategory);
  });

  it("should return an error if creating category fails", async () => {
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
    const error = {};

    jest.spyOn(categoryRepo, "save").mockRejectedValueOnce(error);

    const res = await request(app)
      .post("/api/category")
      .send(category)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.message).toEqual("Category created failed!");
    expect(res.body.error).toEqual(error);
  });
});
