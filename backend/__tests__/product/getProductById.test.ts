const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { Product } from "../../entities/product";
import { Category } from "../../entities/category";

const productRepo = AppDataSource.getRepository(Product);
const categoryRepo = AppDataSource.getRepository(Category);

describe("Get product by ID", () => {
  it("should get a product by ID", async () => {
    const product = {
      id: 1,
      name: "product 1",
      description: "product 1 description",
      quantity: 10,
      price: 100,
      status: "active",
      is_active: true,
      category: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(productRepo, "findOne").mockResolvedValueOnce(product as any);

    const res = await request(app).get("/api/product/1");

    const parsedProduct = JSON.parse(JSON.stringify(product));
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Product retrieved successfully!");
    expect(res.body.product).toEqual(parsedProduct);
  });

  it("should return a 404 if the product does not exist", async () => {
    jest.spyOn(productRepo, "findOne").mockResolvedValueOnce(null);

    const res = await request(app).get("/api/product/1");
    expect(res.status).toEqual(404);
    expect(res.body.message).toEqual("Product not found!");
  });

  it("should return a 400 if an error occurs", async () => {
    const error = new Error("Internal server error");
    jest.spyOn(productRepo, "findOne").mockRejectedValueOnce(error);

    const res = await request(app).get("/api/product/1");
    expect(res.status).toEqual(400);
    expect(res.body.message).toEqual("Product fetch failed!");
  });
});
