import express from "express";
const router = express.Router();

import { createUser } from "./user.controller";

router.post("/", createUser);

export default router;
