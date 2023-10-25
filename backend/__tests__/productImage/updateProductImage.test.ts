const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { Product } from "../../entities/product";
import { ProductImage } from "../../entities/productImage";

const productRepo = AppDataSource.getRepository(Product);
const productImageRepo = AppDataSource.getRepository(ProductImage);

describe("Update a product image", () => {
  it("should update a product image successfully", async () => {
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

    const mockUpdatedProductImage = {
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
    jest
      .spyOn(productImageRepo, "save")
      .mockResolvedValueOnce(mockUpdatedProductImage as any);

    const res = await request(app)
      .put("/api/product-image/1")
      .send(mockProductImage)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.message).toEqual("Product image updated successfully!");
    expect(res.body.productImage).toEqual(mockUpdatedProductImage);
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

    const mockProductImage = {
      id: 1,
      product: 2,
      imageUrl: "http://test.com/image.jpg",
    };

    jest
      .spyOn(productRepo, "findOne")
      .mockResolvedValueOnce(mockProduct as any);
    jest.spyOn(productImageRepo, "findOne").mockResolvedValueOnce(null as any);

    const res = await request(app)
      .put("/api/product-image/1")
      .send(mockProductImage)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(res.body.message).toEqual("Product image not found!");
  });

  it("should return an error if the product to add the image to is not found", async () => {
    const mockProductImage = {
      id: 1,
      product: 1,
      imageUrl: "http://test.com/image.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(productImageRepo, "findOne")
      .mockResolvedValueOnce(mockProductImage as any);
    jest.spyOn(productRepo, "findOne").mockResolvedValueOnce(null);

    const res = await request(app)
      .put("/api/product-image/1")
      .send(mockProductImage)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(res.body.message).toEqual("Product not found!");
  });

  it("should return an error if the product image update fails", async () => {
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
    jest.spyOn(productImageRepo, "save").mockRejectedValueOnce(null);

    const res = await request(app)
      .put("/api/product-image/1")
      .send(mockProductImage)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.message).toEqual("Product image update failed!");
  });
});
