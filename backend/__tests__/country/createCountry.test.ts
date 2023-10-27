const request = require("supertest");
import app from "../../app";
import { AppDataSource } from "../../database/dbConnect";
import { Country } from "../../entities/country";

const countryRepo = AppDataSource.getRepository(Country);

describe("Create Country", () => {
  it("should create a country", async () => {
    const country = {
      id: 1,
      name: "Test Country",
      code: 123,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(countryRepo, "findOne").mockResolvedValueOnce(null);
    jest.spyOn(countryRepo, "save").mockResolvedValueOnce(country as any);

    const res = await request(app)
      .post("/api/country")
      .send(country)
      .set("Accept", "application/json");
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Country created successfully!");
    const parsedCountry = JSON.parse(JSON.stringify(country));
    expect(res.body.country).toEqual(parsedCountry);
  });

  it("should return an error if the country code already exists", async () => {
    const existingCountryByCode = {
      name: "Test Country",
      code: "TC",
    };
    const country = {
      name: "Test Country different",
      code: "TC",
    };

    jest
      .spyOn(countryRepo, "findOne")
      .mockResolvedValueOnce(existingCountryByCode as any);
    jest.spyOn(countryRepo, "save").mockResolvedValueOnce(country as any);

    const res = await request(app)
      .post("/api/country")
      .send(country)
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
    expect(res.body.message).toEqual("Country with this code already exists.");
  });

  it("should return an error if the country name already exists", async () => {
    const existingCountryByName = {
      name: "Test Country",
      code: "TC",
    };
    const country = {
      name: "Test Country",
      code: "TC different",
    };

    jest
      .spyOn(countryRepo, "findOne")
      .mockResolvedValueOnce(existingCountryByName as any);
    jest.spyOn(countryRepo, "save").mockResolvedValueOnce(country as any);

    const res = await request(app)
      .post("/api/country")
      .send(country)
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
    expect(res.body.message).toEqual("Country with this name already exists.");
  });
});
