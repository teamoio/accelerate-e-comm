import express from "express";
const router = express.Router();
import {
  createCategoryImage,
  getCategoryImages,
  getCategoryImageById,
  updateCategoryImage,
  deleteCategoryImage,
} from "./categoryImage.controller";

router.post("/", createCategoryImage);
router.get("/", getCategoryImages);
router.get("/:id", getCategoryImageById);
router.put("/:id", updateCategoryImage);
router.delete("/:id", deleteCategoryImage);

export default router;
