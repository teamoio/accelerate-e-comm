const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { ProductImage } from "../../entities/productImage";

const productImageRepo = AppDataSource.getRepository(ProductImage);

describe("delete a product image", () => {
  it("should delete a product image successfully", async () => {
    const mockProductImage = {
      id: 1,
      product: {
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
      },
      imageUrl: "http://test.com/image.jpg",
    };

    jest
      .spyOn(productImageRepo, "findOne")
      .mockResolvedValueOnce(mockProductImage as any);
    jest
      .spyOn(productImageRepo, "remove")
      .mockResolvedValueOnce(mockProductImage as any);

    const res = await request(app)
      .delete("/api/product-image/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.message).toEqual("Product image deleted successfully!");
  });

  it("should return an error if the product image is not found", async () => {
    jest.spyOn(productImageRepo, "findOne").mockResolvedValueOnce(null as any);

    const res = await request(app)
      .delete("/api/product-image/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(res.body.message).toEqual("Product image not found!");
  });
});
