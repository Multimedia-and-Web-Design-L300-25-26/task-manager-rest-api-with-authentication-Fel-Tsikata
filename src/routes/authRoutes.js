import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/register
// router.post("/register", async (req, res) => {
//   // - Validate input
//   // - Check if user exists
//   // - Hash password
//   // - Save user
//   // - Return user (without password)
// });
router.post("/register", registerUser);
// POST /api/auth/login
// router.post("/login", async (req, res) => {
//   // - Find user
//   // - Compare password
//   // - Generate JWT
//   // - Return token
// })
router.post("/login", loginUser);

export default router;