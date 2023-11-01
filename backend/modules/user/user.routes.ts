import express from "express";
const router = express.Router();

import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  signup,
  login,
  logout,
} from "./user.controller";

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
