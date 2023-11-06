const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { Product } from "../../entities/product";

const productRepo = AppDataSource.getRepository(Product);

describe("Delete a product", () => {
  it("should delete a product successfully", async () => {
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

    jest
      .spyOn(productRepo, "findOne")
      .mockResolvedValueOnce(mockProduct as any);
    jest.spyOn(productRepo, "remove").mockResolvedValueOnce({} as any);

    const res = await request(app)
      .delete(`/api/product/${mockProduct.id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.message).toEqual("Product deleted successfully!");
  });

  it("should return an error if the product to delete is not found", async () => {
    const productId = 1;

    jest.spyOn(productRepo, "findOne").mockResolvedValueOnce(null);

    const res = await request(app)
      .delete(`/api/product/${productId}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(res.body.message).toEqual("Product not found!");
  });

  it("should return an error if there is a problem deleting the product", async () => {
    const errorMessage = "Error deleting product";

    jest
      .spyOn(productRepo, "findOne")
      .mockRejectedValueOnce(new Error(errorMessage));

    const res = await request(app)
      .delete(`/api/product/1`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.message).toEqual("Product deletion failed!");
  });
});
