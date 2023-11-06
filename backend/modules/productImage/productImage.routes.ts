import express from "express";
const router = express.Router();

import {
  createProductImage,
  getProductImages,
  getProductImageById,
  updateProductImage,
  deleteProductImage,
} from "./productImage.controller";

router.post("/", createProductImage);
router.get("/", getProductImages);
router.get("/:id", getProductImageById);
router.put("/:id", updateProductImage);
router.delete("/:id", deleteProductImage);

export default router;
