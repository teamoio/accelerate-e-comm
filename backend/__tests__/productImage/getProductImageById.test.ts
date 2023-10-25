const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { Product } from "../../entities/product";
import { ProductImage } from "../../entities/productImage";

const productRepo = AppDataSource.getRepository(Product);
const productImageRepo = AppDataSource.getRepository(ProductImage);

describe(" Get a product image by id", () => {
  it("should get a product image by id successfully", async () => {
    const mockProduct = {
      id: 2,
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

    const mockProductImage = {
      id: 1,
      product: 2,
      imageUrl: "http://test.com/image.jpg",
    };

    jest
      .spyOn(productRepo, "findOne")
      .mockResolvedValueOnce(mockProduct as any);
    jest
      .spyOn(productImageRepo, "findOne")
      .mockResolvedValueOnce(mockProductImage as any);

    const res = await request(app)
      .get("/api/product-image/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.message).toEqual("Product image fetched successfully!");
    expect(res.body.productImage).toEqual(mockProductImage);
  });

  it("should return an error if the product image is not found", async () => {
    const mockProduct = {
      id: 2,
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
    jest.spyOn(productImageRepo, "findOne").mockResolvedValueOnce(null);

    const res = await request(app)
      .get("/api/product-image/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(res.body.message).toEqual("Product image not found!");
  });
});
