import express from "express";
import * as AuthController from "./auth.controller";
import validate from "@/middleware/validate";
import { registerSchema, loginSchema } from "./auth.validator";

const router = express.Router();

router.post("/login", validate(loginSchema), AuthController.Login);
router.post("/register", validate(registerSchema), AuthController.Register);

export default router;