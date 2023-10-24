const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { CategoryImage } from "../../entities/categoryImage";

const categoryImageRepo = AppDataSource.getRepository(CategoryImage);

describe("Get Category Image by ID", () => {
  it("should return a category image for a valid ID", async () => {
    const mockCategoryImage = {
      id: 1,
      imageUrl: "testImageUrl",
      category: { id: 1, name: "Test Category" },
    };

    jest
      .spyOn(categoryImageRepo, "findOne")
      .mockResolvedValueOnce(mockCategoryImage as any);

    const res = await request(app).get("/api/category-image/:id");
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Category image retrieved successfully!");
    expect(res.body.categoryImage).toEqual(mockCategoryImage);
  });

  it("should return 404 if no category image found for the ID", async () => {
    jest.spyOn(categoryImageRepo, "findOne").mockResolvedValueOnce(null);

    const res = await request(app).get("/api/category-image/:id");
    expect(res.status).toEqual(404);
    expect(res.body.message).toEqual("Category image not found!");
  });

  it("should return 500 if an error occurs", async () => {
    const error = new Error("Internal server error");
    jest.spyOn(categoryImageRepo, "findOne").mockRejectedValueOnce(error);

    const res = await request(app).get("/api/category-image/:id");
    expect(res.status).toEqual(500);
    expect(res.body.message).toEqual("Error in retrieving category image");
  });
});
