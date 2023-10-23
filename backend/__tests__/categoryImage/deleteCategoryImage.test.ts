const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { CategoryImage } from "../../entities/categoryImage";

const categoryImageRepo = AppDataSource.getRepository(CategoryImage);

describe("Delete a category image", () => {
  it("should delete a category image", async () => {
    const categoryImage = {
      id: 1,
      imageUrl: "testImageUrl",
      categoryId: 1,
    };

    jest
      .spyOn(categoryImageRepo, "findOne")
      .mockResolvedValueOnce(categoryImage as any);
    jest
      .spyOn(categoryImageRepo, "remove")
      .mockResolvedValueOnce(categoryImage as any);

    const res = await request(app)
      .delete("/api/category-image/1")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.message).toEqual("Category image deleted successfully!");
  });

  it("should return an error if the category image does not exist", async () => {
    jest.spyOn(categoryImageRepo, "findOne").mockResolvedValueOnce(null);

    const res = await request(app)
      .delete("/api/category-image/1")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(res.body.message).toEqual(
      "Category image not found for the provided ID."
    );
  });

  it("should return an error if there is an error in deleting the category image", async () => {
    const categoryImage = {
      id: 1,
      imageUrl: "testImageUrl",
      categoryId: 1,
    };

    jest
      .spyOn(categoryImageRepo, "findOne")
      .mockResolvedValueOnce(categoryImage as any);
    jest
      .spyOn(categoryImageRepo, "remove")
      .mockRejectedValueOnce(new Error("Mocked error"));

    const res = await request(app)
      .delete("/api/category-image/1")
      .expect("Content-Type", /json/)
      .expect(500);

    expect(res.body.message).toEqual("Error in deleting category image.");
  });
});
