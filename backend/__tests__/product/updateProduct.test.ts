const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { Product } from "../../entities/product";
import { Category } from "../../entities/category";

const productRepo = AppDataSource.getRepository(Product);
const categoryRepo = AppDataSource.getRepository(Category);

describe("Update a product", () => {
  it("should update a product successfully", async () => {
    const mockProduct = {
      id: 1,
      name: "Test Product",
      description: "Test Description",
      quantity: 10,
      price: 100,
      status: "Available",
      is_active: true,
      category: {
        id: 1,
        name: "Test Category",
        description: "Test Category Description",
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        images: [],
        products: [],
      },
    };

    const updatedProduct = {
      name: "Updated Product",
      description: "Updated Description",
      quantity: 20,
      price: 200,
      status: "Out of Stock",
      is_active: false,
      category: 2,
    };

    jest
      .spyOn(productRepo, "findOne")
      .mockResolvedValueOnce(mockProduct as any);
    jest
      .spyOn(categoryRepo, "findOne")
      .mockResolvedValueOnce(updatedProduct.category as any);
    jest
      .spyOn(productRepo, "save")
      .mockResolvedValueOnce(updatedProduct as any);

    const res = await request(app)
      .put(`/api/product/${mockProduct.id}`)
      .send(updatedProduct)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.message).toEqual("Product updated successfully");
    expect(res.body.product).toEqual(updatedProduct);
  });

  it("should return an error if the product to update is not found", async () => {
    const productId = 1;
    const updatedProduct = {
      name: "Updated Product",
      description: "Updated Description",
      quantity: 20,
      price: 200,
      status: "Out of Stock",
      is_active: false,
      category: 2,
    };

    jest.spyOn(productRepo, "findOne").mockResolvedValueOnce(null);

    const res = await request(app)
      .put(`/api/product/${productId}`)
      .send(updatedProduct)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(res.body.message).toEqual("Product not found!");
  });

  it("should return an error if the category for the product update is not found", async () => {
    const mockProduct = {
      id: 1,
      name: "Test Product",
      description: "Test Description",
      quantity: 10,
      price: 100,
      status: "Available",
      is_active: true,
      category: 1,
    };

    const updatedProduct = {
      name: "Updated Product",
      description: "Updated Description",
      quantity: 20,
      price: 200,
      status: "Out of Stock",
      is_active: false,
      category: 2,
    };

    jest
      .spyOn(productRepo, "findOne")
      .mockResolvedValueOnce(mockProduct as any);
    jest.spyOn(categoryRepo, "findOne").mockResolvedValueOnce(null);

    const res = await request(app)
      .put(`/api/product/${mockProduct.id}`)
      .send(updatedProduct)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(res.body.message).toEqual("Category not found!");
  });

  it("should return an error if there is a problem updating the product", async () => {
    const errorMessage = "Error updating product";

    jest
      .spyOn(productRepo, "findOne")
      .mockRejectedValueOnce(new Error(errorMessage));

    const res = await request(app)
      .put(`/api/product/1`)
      .send({})
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.message).toEqual("Product update failed!");
  });
});
