import {
  createExample,
  deleteExample,
  getExample,
  getExamplePostman,
  getExamples,
  updateExample,
} from "./example.controller";
import express from "express";
const router = express.Router();
router.get("/", getExamples);
router.get("/:id", getExample);
router.post("/", createExample);
router.put("/:id", updateExample);
router.delete("/:id", deleteExample);
router.get("/postman", getExamplePostman);

export default router;
