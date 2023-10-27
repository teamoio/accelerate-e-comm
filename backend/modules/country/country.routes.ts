import express from "express";
const router = express.Router();

import {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
} from "./country.conrtoller";

router.post("/", createCountry);
router.get("/", getAllCountries);
router.get("/:id", getCountryById);
router.put("/:id", updateCountry);
router.delete("/:id", deleteCountry);

export default router;
