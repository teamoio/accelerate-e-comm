const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { Product } from "../../entities/product";
import { Category } from "../../entities/category";

const productRepo = AppDataSource.getRepository(Product);
const categoryRepo = AppDataSource.getRepository(Category);

describe("Get all products", () => {
  it("should get all products", async () => {
    const products = [
      {
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
      },
      {
        id: 2,
        name: "product 2",
        description: "product 2 description",
        quantity: 10,
        price: 100,
        status: "active",
        is_active: true,
        category: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(productRepo, "find").mockResolvedValueOnce(products as any);

    const res = await request(app).get("/api/product");

    const parsedProducts = JSON.parse(JSON.stringify(products));
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Products fetched successfully!");
    expect(res.body.products).toEqual(parsedProducts);
  });

  it("should return a 404 if there are no products", async () => {
    jest.spyOn(productRepo, "find").mockResolvedValueOnce([]);

    const res = await request(app).get("/api/product");
    console.log("response body", res.body);
    expect(res.status).toEqual(404);
    expect(res.body.message).toEqual("No products found!");
  });

  it("should return a 400 if an error occurs", async () => {
    const error = new Error("Internal server error");
    jest.spyOn(productRepo, "find").mockRejectedValueOnce(error);

    const res = await request(app).get("/api/product");
    expect(res.status).toEqual(400);
    expect(res.body.message).toEqual("Products fetch failed!");
  });
});
