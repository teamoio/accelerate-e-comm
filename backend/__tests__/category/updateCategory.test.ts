const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { Category } from "../../entities/category";

const categoryRepo = AppDataSource.getRepository(Category);

describe("Update category by ID", () => {
  it("should update a category when a valid ID and data are provided", async () => {
    const categoryId = 1;
    const updatedCategoryData = {
      name: "Updated category name",
      description: "Updated category description",
      is_active: false,
    };

    const categoryToUpdate = {
      id: categoryId,
      name: "category 1",
      description: "category 1 description",
      is_active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      images: [],
      products: [],
    };

    jest
      .spyOn(categoryRepo, "findOneBy")
      .mockResolvedValueOnce(categoryToUpdate);
    jest
      .spyOn(categoryRepo, "save")
      .mockResolvedValueOnce({ ...categoryToUpdate, ...updatedCategoryData });

    const res = await request(app)
      .put(`/api/category/${categoryId}`)
      .send(updatedCategoryData)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    const parsedCategory = JSON.parse(
      JSON.stringify({ ...categoryToUpdate, ...updatedCategoryData })
    );
    expect(res.body.message).toEqual("Category updated successfully!");
    expect(res.body.category).toEqual(parsedCategory);
  });

  it("should return a 404 error if the category to update is not found", async () => {
    const categoryId = 100;
    const updatedCategoryData = {
      name: "Updated category name",
      description: "Updated category description",
      is_active: false,
    };

    jest.spyOn(categoryRepo, "findOneBy").mockResolvedValueOnce(null);

    const res = await request(app)
      .put(`/api/category/${categoryId}`)
      .send(updatedCategoryData)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(res.body.message).toEqual("Category not found!");
  });

  it("should return an error if updating the category fails", async () => {
    const categoryId = 1;
    const updatedCategoryData = {
      name: "Updated category name",
      description: "Updated category description",
      is_active: false,
    };
    const error = {};

    const categoryToUpdate = {
      id: categoryId,
      name: "category 1",
      description: "category 1 description",
      is_active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      images: [],
      products: [],
    };

    jest
      .spyOn(categoryRepo, "findOneBy")
      .mockResolvedValueOnce(categoryToUpdate);
    jest.spyOn(categoryRepo, "save").mockRejectedValueOnce(error);

    const res = await request(app)
      .put(`/api/category/${categoryId}`)
      .send(updatedCategoryData)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.message).toEqual("Category update failed!");
    expect(res.body.error).toEqual(error);
  });
});
