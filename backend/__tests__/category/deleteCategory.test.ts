const request = require("supertest");
import app from "../../app";
import { DeleteResult } from "typeorm";
import { AppDataSource } from "../../database/dbConnect";
import { Category } from "../../entities/category";

const categoryRepo = AppDataSource.getRepository(Category);

describe("Delete category by ID", () => {
  it("should delete a category when a valid ID is provided", async () => {
    const categoryId = 1;
    const category = {
      id: categoryId,
      name: "category 1",
      description: "category 1 description",
      is_active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      images: [],
      products: [],
    };

    jest.spyOn(categoryRepo, "findOneBy").mockResolvedValueOnce(category);
    jest
      .spyOn(categoryRepo, "delete")
      .mockResolvedValueOnce({ affected: 1 } as DeleteResult);

    const res = await request(app)
      .delete(`/api/category/${categoryId}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.message).toEqual("Category deleted successfully!");
    expect(res.body.category).toEqual({ affected: 1 });
  });

  it("should return a 404 error if the category to delete is not found", async () => {
    const categoryId = 100;
    jest.spyOn(categoryRepo, "findOneBy").mockResolvedValueOnce(null);
    jest.spyOn(categoryRepo, "delete").mockResolvedValueOnce(null as any);

    const res = await request(app)
      .delete(`/api/category/${categoryId}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(res.body.message).toEqual("Category not found!");
  });

  it("should return an error if deleting the category fails", async () => {
    const categoryId = 1;
    const error = {};

    const category = {
      id: categoryId,
      name: "category 1",
      description: "category 1 description",
      is_active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      images: [],
      products: [],
    };

    jest.spyOn(categoryRepo, "findOneBy").mockResolvedValueOnce(category);
    jest.spyOn(categoryRepo, "delete").mockRejectedValueOnce(error);

    const res = await request(app)
      .delete(`/api/category/${categoryId}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.message).toEqual("Category deletion failed!");
    expect(res.body.error).toEqual(error);
  });
});
