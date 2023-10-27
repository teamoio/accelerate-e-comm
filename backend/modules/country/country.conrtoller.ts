import { AppDataSource } from "../../database/dbConnect";
import { Country } from "../../entities/country";

const countryRepo = AppDataSource.getRepository(Country);

export const createCountry = async (req: any, res: any) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({
        message:
          "Missing required fields. Please provide all necessary country details.",
      });
    }
    const existingCountry = await countryRepo.findOne({
      where: [{ name: name }, { code: code }],
    });

    if (existingCountry) {
      if (existingCountry.name === name) {
        return res.status(400).json({
          message: "Country with this name already exists.",
        });
      } else if (existingCountry.code === code) {
        return res.status(400).json({
          message: "Country with this code already exists.",
        });
      }
    }
    const country: Country = new Country();
    country.name = name;
    country.code = code;

    const result = await countryRepo.save(country);
    return res.status(200).json({
      message: "Country created successfully!",
      country: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Country creation failed!",
      error: error,
    });
  }
};

export const getAllCountries = async (req: any, res: any) => {
  try {
    const countries = await countryRepo.find();

    if (!countries || countries.length === 0) {
      return res.status(404).json({
        message: "Countries not found!",
      });
    }

    return res.status(200).json({
      message: "Countries fetched successfully!",
      countries: countries,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Countries fetching failed!",
      error: error,
    });
  }
};

export const getCountryById = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const country = await countryRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!country) {
      return res.status(404).json({
        message: "Country not found!",
      });
    }

    return res.status(200).json({
      message: "Country fetched successfully!",
      country: country,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Country fetching failed!",
      error: error,
    });
  }
};

export const updateCountry = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, code } = req.body;

    const country = await countryRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!country) {
      return res.status(404).json({
        message: "Country not found!",
      });
    }

    country.name = name;
    country.code = code;

    const result = await countryRepo.save(country);

    return res.status(200).json({
      message: "Country updated successfully!",
      country: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Country updating failed!",
      error: error,
    });
  }
};

export const deleteCountry = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const country = await countryRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!country) {
      return res.status(404).json({
        message: "Country not found!",
      });
    }

    await countryRepo.remove(country);

    return res.status(200).json({
      message: "Country deleted successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Country deleting failed!",
      error: error,
    });
  }
};
