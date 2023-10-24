const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { CategoryImage } from "../../entities/categoryImage";

const categoryImageRepo = AppDataSource.getRepository(CategoryImage);

describe("Get Category Images", () => {
  it("should return all category images", async () => {
    const mockCategoryImages = [
      // Mock category images data as needed
      { id: 1, imageUrl: "image1.jpg", category: { id: 1, name: "Category1" } },
      { id: 2, imageUrl: "image2.jpg", category: { id: 2, name: "Category2" } },
    ];

    jest
      .spyOn(categoryImageRepo, "find")
      .mockResolvedValueOnce(mockCategoryImages as any);

    const res = await request(app).get("/api/category-image"); // Replace with the actual endpoint
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Category images retrieved successfully!");
    expect(res.body.categoryImages).toEqual(mockCategoryImages);
  });

  it("should return 404 if no category images found", async () => {
    jest.spyOn(categoryImageRepo, "find").mockResolvedValueOnce([]);

    const res = await request(app).get("/api/category-image"); // Replace with the actual endpoint
    expect(res.status).toEqual(404);
    expect(res.body.message).toEqual("Category images not found!");
  });

  it("should return 500 if an error occurs", async () => {
    const error = new Error("Internal server error");
    jest.spyOn(categoryImageRepo, "find").mockRejectedValueOnce(error);

    const res = await request(app).get("/api/category-image"); // Replace with the actual endpoint
    expect(res.status).toEqual(500);
    expect(res.body.message).toEqual("Error in retrieving category images");
  });
});
