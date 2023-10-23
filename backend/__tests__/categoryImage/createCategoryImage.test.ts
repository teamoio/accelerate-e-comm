const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { Category } from "../../entities/category";
import { CategoryImage } from "../../entities/categoryImage";

const categoryRepo = AppDataSource.getRepository(Category);
const categoryImageRepo = AppDataSource.getRepository(CategoryImage);

describe("Create a category image", () => {
  it("should create a category image", async () => {
    const categoryImage = {
      imageUrl: "testImageUrl",
      categoryId: 1,
    };

    const categoryExists = {
      id: 1,
      name: "category 1",
      description: "category 1 description",
      is_active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      images: [],
      products: [],
    };

    jest
      .spyOn(categoryRepo, "findOne")
      .mockResolvedValueOnce(categoryExists as any);
    jest
      .spyOn(categoryImageRepo, "save")
      .mockResolvedValueOnce(categoryImage as any);

    const res = await request(app)
      .post("/api/category-image")
      .send(categoryImage)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.message).toEqual("Category image created successfully!");
    expect(res.body.categoryImage).toEqual(categoryImage);
  });

  it("should return an error if the category does not exist", async () => {
    const categoryImage = {
      imageUrl: "testImageUrl",
      categoryId: 1,
    };

    jest.spyOn(categoryRepo, "findOne").mockResolvedValueOnce(null);

    const res = await request(app)
      .post("/api/category-image")
      .send(categoryImage)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(res.body.message).toEqual("Category not found!");
  });
});
