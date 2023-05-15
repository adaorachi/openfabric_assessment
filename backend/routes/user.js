import express from "express";
import { createUser, logInUser } from "../controllers/user.js";
const router = express.Router();

router.post("/sign-up", createUser);
router.post("/login", logInUser);

export default router;
