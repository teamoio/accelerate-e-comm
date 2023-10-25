const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { ProductImage } from "../../entities/productImage";

const productImageRepo = AppDataSource.getRepository(ProductImage);

describe("Get all product images", () => {
  it("should get all product images successfully", async () => {
    const mockProductImages = [
      {
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
      },
      {
        id: 2,
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
      },
    ];

    jest
      .spyOn(productImageRepo, "find")
      .mockResolvedValueOnce(mockProductImages as any);

    const res = await request(app)
      .get("/api/product-image")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    const parsedProductImages = JSON.parse(JSON.stringify(mockProductImages));
    expect(res.body.message).toEqual("Product images fetched successfully!");
    expect(res.body.productImages).toEqual(parsedProductImages);
  });

  it("should return an error if no product images are found", async () => {
    jest.spyOn(productImageRepo, "find").mockResolvedValueOnce([] as any);

    const res = await request(app)
      .get("/api/product-image")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(res.body.message).toEqual("Product images not found!");
  });
});
