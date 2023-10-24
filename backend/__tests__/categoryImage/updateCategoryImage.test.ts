const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { CategoryImage } from "../../entities/categoryImage";
import { Category } from "../../entities/category";

const categoryImageRepo = AppDataSource.getRepository(CategoryImage);
const categoryRepo = AppDataSource.getRepository(Category);

describe("Update a category image", () => {
  it("should update a category image", async () => {
    const categoryImage = {
      id: 1,
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
      .spyOn(categoryImageRepo, "findOne")
      .mockResolvedValueOnce(categoryImage as any);
    jest
      .spyOn(categoryRepo, "findOne")
      .mockResolvedValueOnce(categoryExists as any);
    jest
      .spyOn(categoryImageRepo, "save")
      .mockResolvedValueOnce(categoryImage as any);

    const res = await request(app)
      .put("/api/category-image/:id")
      .send(categoryImage)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.message).toEqual("Category image updated successfully!");
    const parsedCategoryImage = JSON.parse(JSON.stringify(categoryImage));
    expect(res.body.categoryImage).toEqual(parsedCategoryImage);
  });

  it("should return an error if the category image does not exist", async () => {
    const categoryImage = {
      id: 1,
      imageUrl: "testImageUrl",
      categoryId: 1,
    };

    jest.spyOn(categoryImageRepo, "findOne").mockResolvedValueOnce(null);

    const res = await request(app)
      .put("/api/category-image/:id")
      .send(categoryImage)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(res.body.message).toEqual(
      "Category image not found for the provided ID."
    );
  });

  it("should return an error if the category does not exist", async () => {
    const categoryImage = {
      id: 1,
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
      .spyOn(categoryImageRepo, "findOne")
      .mockResolvedValueOnce(categoryImage as any);
    jest.spyOn(categoryRepo, "findOne").mockResolvedValueOnce(null);

    const res = await request(app)
      .put("/api/category-image/:id")
      .send(categoryImage)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(res.body.message).toEqual(
      "Category not found for the provided categoryId."
    );
  });

  it("should return an error if imageUrl is not provided", async () => {
    const categoryImage = {
      id: 1,
      imageUrl: "",
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
      .spyOn(categoryImageRepo, "findOne")
      .mockResolvedValueOnce(categoryImage as any);
    jest
      .spyOn(categoryRepo, "findOne")
      .mockResolvedValueOnce(categoryExists as any);

    const res = await request(app)
      .put("/api/category-image/:id")
      .send(categoryImage)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.message).toEqual(
      "Both imageUrl and categoryId are required for updating the category image."
    );
  });

  it("should return an error if categoryId is not provided", async () => {
    const categoryImage = {
      id: 1,
      imageUrl: "testImageUrl",
      categoryId: "",
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
      .spyOn(categoryImageRepo, "findOne")
      .mockResolvedValueOnce(categoryImage as any);
    jest
      .spyOn(categoryRepo, "findOne")
      .mockResolvedValueOnce(categoryExists as any);

    const res = await request(app)
      .put("/api/category-image/:id")
      .send(categoryImage)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
    expect(res.body.message).toEqual(
      "Both imageUrl and categoryId are required for updating the category image."
    );
  });
});
