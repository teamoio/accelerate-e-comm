const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { Product } from "../../entities/product";
import { Category } from "../../entities/category";

const productRepo = AppDataSource.getRepository(Product);
const categoryRepo = AppDataSource.getRepository(Category);

describe("Create a product", () => {
  it("should create a product", async () => {
    const product = {
      name: "product 1",
      description: "product 1 description",
      quantity: 10,
      price: 100,
      status: "active",
      is_active: true,
      category: 1,
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
    jest.spyOn(productRepo, "save").mockResolvedValueOnce(product as any);

    const res = await request(app)
      .post("/api/product")
      .send(product)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.message).toEqual("Product created successfully!");
    const parsedProduct = JSON.parse(JSON.stringify(product));
    expect(res.body.product).toEqual(parsedProduct);
  });

  it("should return an error if the category does not exist", async () => {
    const product = {
      name: "product 1",
      description: "product 1 description",
      quantity: 10,
      price: 100,
      status: "active",
      is_active: true,
      category: 1,
    };

    jest.spyOn(categoryRepo, "findOne").mockResolvedValueOnce(null);

    const res = await request(app)
      .post("/api/product")
      .send(product)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(res.body.message).toEqual("Category not found!");
  });
  it("should return an error if any required fields are missing", async () => {
    const product = {
      description: "Test Description",
      quantity: 10,
      price: 100,
      status: "Available",
      is_active: true,
      category: 1,
    };

    const res = await request(app)
      .post("/api/product")
      .send(product)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.message).toEqual(
      "Missing required fields. Please provide all necessary product details."
    );
  });
});
